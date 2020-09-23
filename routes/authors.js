const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// get all authors
router.get('/', (req, res) => {
    res.render('authors/index')
})

// get author
router.get('/new', (req, res) => {
    res.render('authors/new', {
        author: new Author()
    })
})

// create new author
router.post('/', (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    author.save((err, newAuthor) => {
        if (err) {
            res.render('authors/new', {
                author: author,
                errorMessage: 'Error Creating Author'
            })
        } else {
            res.redirect(`authors/$(newAuthor)`)
            res.redirect(`authors`)
        }
    })
})

module.exports = router
