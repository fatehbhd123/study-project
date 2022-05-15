const express = require("express")
const mongoose = require("mongoose")
const Association = require("./association")
const User = require('./user')
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
            .then(result => {
                if (result.length === 0) {
                    let new_user = new User({
                        username: req.body.username,
                        password: req.body.password,
                        level: "0"
                    })
                    res.send('Done')
                } else {
                    res.send('إسم المستخدم تم استعماله , حاول تغييره')
                }
            })
        await new_user.save()
        res.send('saved')
    } catch (err) {
        console.log(err)
    }
})
app.listen(3001, () =>
    console.log("running...")
)

