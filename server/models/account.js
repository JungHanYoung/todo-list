const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema

const Account = new Schema({
    username: String,
    password: String,
    created: { type: Date, default: Date.now }
})

module.exports = mongoose.model('account', Account)