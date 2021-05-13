const express = require('express');
const path = require('path');
require('dotenv').config()

const adminRouters = require('./routes/admin');
const shopRouters = require('./routes/shop');

// const mongoConnect = require('./util/database').mongoConnect;

const mongoose = require('mongoose')
const User = require('./models/User')

//--------------------Setups--------------------
const app = express();
app.use(express.urlencoded({extended:false}));

//app.set = allows us to set any values globally on our express application
app.set('view engine', 'ejs');
//views is set to default path of views but I am just implicitly showing
app.set('views','views');

//serve file statically
app.use(express.static(path.join(__dirname, 'public')))

//dummy auth
app.use((req, res, next) => {
    User.findById('609d4e7140fd9249a450e428').then(user => {
        req.user = user
        next()
    }).catch(err => console.log(err))

})

//--------------------Middleware--------------------
app.use('/admin',adminRouters);
app.use(shopRouters);



// catch all middleware
app.use((req,res,next)=>{
    res.render('404', {
        pageTitle: 'Page not found'
    });
});
//----------------End of Middleware-----------------

// mongoConnect(() => {
//     app.listen(5000, () => console.log('Server connected to port 5000'));

// })

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log("Connected to Database")
    User.findOne().then(user => {
        if(!user){
            const user = new User({
                username: 'Paku',
                email: 'paku@mail.com'
            })
            user.save()
        }
    })
    app.listen(5000, () => console.log('Server connected to port 5000'));

}).catch(err => console.log(err))

