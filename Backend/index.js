const express = require("express")
const mongoose = require("mongoose")
const Association = require("./association")
const User = require('./user')
const Content = require('./content')
const Quizze = require("./quizze")
const bodyParser = require("body-parser")
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
        await User.find({ username: req.body.username, password: req.body.password })
            .then(result => {
                res.send(result)
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
                    let new_user = new User({
                        username: req.body.username,
                        password: req.body.password,
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

app.listen(3001, () =>
    console.log("running...")
)

