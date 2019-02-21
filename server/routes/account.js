const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const router = express.Router()

const Account = require('../models/account')

router.post('/signup', (req, res) => {

    const {
        username,
        password
    } = req.body

    // checking username format
    let usernameRegex = /^[a-z0-9]+$/

    if (!usernameRegex.test(username)) {
        return res.status(400).json({
            error: "BAD USERNAME",
            code: 1
        })
    }

    // checking password length
    if (password.length < 4 || typeof password !== 'string') {
        return res.status(400).json({
            error: "BAD PASSWORD",
            code: 2
        })
    }

    // checking user exist
    Account.findOne({ username }, (err, account) => {
        if (err) throw err;
        if (account) {
            return res.status(409).json({
                error: "USERNAME EXISTS",
                code: 3
            })
        }

        // CREATE ACCOUNT
        const newAccount = new Account({
            username,
            password
        })

        newAccount.password = bcrypt.hashSync(password, 8)

        // SAVE
        newAccount.save(err => {
            if (err) throw err
            return res.json({
                success: true
            })
        })
    })
})

router.post('/signin', (req, res) => {

    const {
        username,
        password
    } = req.body

    if (typeof password !== 'string') {
        return res.status(400).json({
            error: "LOGIN FAILED",
            code: 1
        })
    }

    Account.findOne({ username }, (err, account) => {
        if (err) throw err;
        if (!account) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            })
        }

        const validPassword = bcrypt.compareSync(password, account.password)

        if (!validPassword) {
            return res.status(401).json({
                error: "LOGIN FAILED",
                code: 1
            })
        }

        const token = jwt.sign({
            _id: account._id,
            username: account.username
        }, 'hello', {
                expiresIn: "1h"
            })

        return res.json({
            success: true,
            token
        })
    })
})

router.post('/info', (req, res) => {
    const { token } = req.body
    try {
        const userInfo = jwt.verify(token, 'hello')
        console.log(userInfo)
        if (userInfo.username === 'undefined' || userInfo._id === 'undefined') {
            return res.status(401).json({
                error: "not authentication",
                code: 1
            })
        }
        return res.json({
            success: true,
            username: userInfo.username
        })
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) {
            console.log('token is expired')
        }
        return res.status(401).json({
            error: "not authentication",
            code: 1
        })
    }

})

router.post('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) throw err;
    })
    res.json({
        success: true
    })
})

router.get('/search/:username', (req, res) => {
    const { username } = req.params
    var re = new RegExp('^' + username);
    Account.find({ username: { $regex: re } }, { _id: false, username: true })
        .limit(5)
        .sort({ username: 1 })
        .exec((err, accounts) => {
            if (err) throw err;
            res.json(accounts)
        })
})



module.exports = router