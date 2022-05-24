const express = require("express")
const mongoose = require("mongoose")
const Association = require("./association")
const User = require('./user')
const Content = require('./content')
const Quizze = require("./quizze")
const Advancedcontent = require("./advancedcontent")
const nodemailer = require('nodemailer')
const bodyParser = require("body-parser")
const bcrypt = require('bcrypt')
const cors = require('cors');
const app = express();
app.use(express.json())

app.use(cors());
mongoose.connect('mongodb+srv://admin:abdou@cluster0.ukgwq.mongodb.net/usersproject?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected')
    })
    .catch((err) => {
        console.log(err.message)

    })

app.get('/association', async (req, res) => {
    try {
        await Association.find({})
            .then(result => {
                res.json(result)
            })
    }
    catch (err) {
        console.log(err)
    }

})
app.post('/usersignin', async (req, res) => {
    // console.log(req.body)
    try {
        await User.find({ username: req.body.username })
            .then(async result => {
                if (result.length !== 0) {
                    const test = await bcrypt.compare(req.body.password, result[0].password);
                    if (test) {
                        res.send(result)
                    }
                    else {
                        res.send('')
                    }
                } else {
                    res.send('')
                }
            })
    }
    catch (err) {
        console.log(err)
    }

})


app.post('/associationsignin', async (req, res) => {
    console.log(req.body)
    // res.json(req.query);
    try {
        await Association.find({ username: req.body.username, password: req.body.password })
            .then(result => {
                res.send(result)
            })
    }
    catch (err) {
        console.log("err")
    }

})

app.post('/adduser', async (req, res) => {
    console.log(req.body)
    try {
        await User.find({ username: req.body.username })
            .then(async (result) => {
                if (result.length === 0) {
                    const salt = await bcrypt.genSalt()
                    const hashedpw = await bcrypt.hash(req.body.password, salt)
                    let new_user = new User({
                        username: req.body.username,
                        password: hashedpw,
                        level: "0"
                    })
                    await new_user.save()
                    res.send(new_user);
                } else {
                    res.send('إسم المستخدم تم استعماله , حاول تغييره')
                }
            })
    } catch (err) {
        console.log(err)
    }
})





app.post('/contentbylevel', async (req, res) => {
    try {
        await Content.find({ level: req.body.level })
            .then(result => {
                res.send(result)
            })
    }
    catch (err) {
        console.log(err)
    }
})




app.post('/contentbytitle', async (req, res) => {
    try {
        await Content.find({ title: req.body.title })
            .then(result => {
                res.send(result)
            })
    }
    catch (err) {
        console.log(err)
    }
})


app.post('/quizze', async (req, res) => {
    try {
        await Quizze.find({ level: req.body.level })
            .then(result => {
                res.send(result)
            })
    }
    catch (err) {
        console.log(err)
    }
})




app.put('/modifylevel', async (req, res) => {
    try {
        await User.updateOne({ username: req.body.username }, { level: req.body.level })
            .then(
                res.send('saved')
            )
    }
    catch (err) {
        console.log(err)
    }
})


app.get('/advancedcontent', async (req, res) => {
    try {
        await Advancedcontent.find({})
            .then(result => {
                res.send(result)
            })
    }
    catch (err) {
        console.log(err)
    }
})


app.post('/advancedcontentbytitle', async (req, res) => {
    try {
        await Advancedcontent.find({ title: req.body.title })
            .then(result => {
                res.send(result)
            })
    }
    catch (err) {
        console.log(err)
    }
})

app.post('/contactform', (req, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'minhajelmuslim@gmail.com',
            pass: 'minhajpr2022'
        }
    })
    const mailOptions = {
        from: req.body.email,
        to: 'minhajelmuslim@gmail.com',
        subject: `email sent from ${req.body.email} :${req.body.subject}`,
        text: req.body.message
    }
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        } else {
            console.log('Email sent: ' + info.response)
            res.send('success')
        }
    })
})



app.post('/deleteuser', checkpassword, async (req, res) => {
    try {
        await User.deleteOne({ username: req.body.username })
            .then(
                res.send('deleted')
            )
    }
    catch (err) {
        console.log(err)
    }
})


app.patch('/modifyuser', checkpassword, async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedpw = await bcrypt.hash(req.body.newpassword, salt)
        await User.updateOne({ username: req.body.username }, { password: hashedpw })
            .then(
                res.send('password changed')
            )
    }
    catch (err) {
        console.log(err)
    }
})

app.patch('/modifyassociation', async (req, res) => {
    try {
        await Association.updateOne({ username: req.body.username }, {
            ar_name: req.body.ar_name, phone: req.body.phone, sunday: req.body.sunday,
            monday: req.body.monday, tuesday: req.body.tuesday, wednesday: req.body.wednesday, thursday: req.body.thursday, friday: req.body.friday, saturday: req.body.saturday
        })
            .then(
                res.send('saved')
            )
    }
    catch (err) {
        console.log(err)
    }
})

async function checkpassword(req, res, next) {
    try {
        await User.findOne({ username: req.body.username })
            .then(
                async result => {
                    if (result !== null) {
                        const test = await bcrypt.compare(req.body.password, result.password)
                        if (test) {
                            next();
                        } else {
                            res.send('falseinfo')
                        }
                    } else { res.send('falseinfo') }
                })
    }
    catch (err) {
        console.log(err)
    }

}

app.listen(3001, () =>
    console.log("running...")
)

