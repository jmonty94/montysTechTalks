const router = require('express').Router();
const apiController = require('./apiContoller');
const { User } = require('./../models');


router.get('/', (req,res) => {
    res.render('homepage')
});

module.exports = router;