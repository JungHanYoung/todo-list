const express = require('express')
const mongoose = require('mongoose')
const Memo = require('../models/memo')

const router = express.Router()

router.post('/', (req, res) => {

    // check login
    if (typeof req.session.loginInfo !== 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 1
        })
    }

    if (typeof req.body.contents && req.body.contents === "") {
        return res.status(400).json({
            error: "메모 내용이 없습니다.",
            code: 2
        })
    }

    const newMemo = new Memo({
        writer: req.session.loginInfo.username,
        contents: req.body.contents
    })

    newMemo.save(err => {
        if (err) throw err;
        return res.json({
            success: true
        })
    })
})

router.get('/', (req, res) => {
    Memo.find()
        .sort({ "_id": -1 })
        .limit(6)
        .exec((err, memos) => {
            if (err) throw err
            res.json(memos)
        })
})

router.delete('/:id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        })
    }

    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        })
    }

    Memo.findById(req.params.id, (err, memo) => {
        if (err) throw err;

        if (!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            })
        }

        if (memo.writer !== req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION FAILED",
                code: 4
            })
        }

        Memo.remove({ _id: req.params.id }, (err) => {
            if (err) throw err
            return res.json({
                success: true
            })
        })
    })
})

router.put('/:id', (req, res) => {

    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        })
    }

    if (typeof req.body.contents === 'undefined' && req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            error: 2
        })
    }

    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 3
        })
    }

    Memo.findById(req.params.id, (err, memo) => {
        if (err) throw err;

        if (!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 4
            })
        }

        // check writer
        if (memo.writer !== req.session.loginInfo.username) {
            return res.status(403).json({
                error: "PERMISSION DENIED",
                code: 5
            })
        }

        memo.contents = req.body.contents
        memo.date.edited = new Date()
        memo.is_edited = true

        memo.save((err, memo) => {
            if (err) throw err;
            return res.json({
                success: true,
                memo
            })
        })
    })

})

router.get('/:listType/:id', (req, res) => {
    const {
        listType,
        id
    } = req.params

    if (listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "LIST TYPE ERROR",
            code: 1
        })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        })
    }

    let objId = new mongoose.Types.ObjectId(id)

    if (listType === 'new') {
        Memo.find({ _id: { $gt: objId } })
            .sort({ "_id": -1 })
            .limit(6)
            .exec((err, memos) => {
                if (err) throw err;
                return res.json(memos)
            })
    } else {
        Memo.find({ _id: { $lt: objId } })
            .sort({ "_id": -1 })
            .limit(6)
            .exec((err, memos) => {
                if (err) throw err;
                return res.json(memos)
            })
    }
})

router.post('/star/:id', (req, res) => {

    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 1
        })
    }

    // check login status
    if (typeof req.session.loginInfo === 'undefined') {
        return res.status(403).json({
            error: "NOT LOGGED IN",
            code: 2
        })
    }

    Memo.findById(id, (err, memo) => {
        if (err) throw err;

        if (!memo) {
            return res.status(404).json({
                error: "NO RESOURCE",
                code: 3
            })
        }

        let index = memo.starred.indexOf(req.session.loginInfo.username);

        let hasStarred = (index === -1) ? false : true;

        if (!hasStarred) {
            memo.starred.push(req.session.loginInfo.username);
        } else {
            memo.starred.splice(index, 1)
        }

        memo.save(err => {
            if (err) throw err;
            res.json({
                success: true,
                'has_starred': !hasStarred,
                memo
            })
        })
    })
})

router.get('/:username', (req, res) => {
    Memo.find({ username: req.params.username })
        .sort({ "_id": -1 })
        .limit(6)
        .exec((err, memos) => {
            if (err) throw err;
            return res.json(memos)
        })
})

router.get('/:username/:listType/:id', (req, res) => {
    const {
        username,
        listType,
        id
    } = req.params

    if (listType !== 'old' && listType !== 'new') {
        return res.status(400).json({
            error: "INVALID LIST TYPE",
            code: 1
        })
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            error: "INVALID ID",
            code: 2
        })
    }

    let objId = new mongoose.Types.ObjectId(id)

    if (listType === 'old') {
        Memo.find({ writer: username, _id: { $gt: objId } })
            .sort({ _id: -1 })
            .limit(6)
            .exec((err, memos) => {
                if (err) throw err;
                res.json(memos)
            })
    } else {
        Memo.find({ writer: username, _id: { $lt: objId } })
            .sort({ _id: -1 })
            .limit(6)
            .exec((err, memos) => {
                if (err) throw err;
                res.json(memos)
            })

    }
})

module.exports = router