const express = require('express')
const router = express.Router()
const Author = require('../models/author')

// get all authors
router.get('/', async (req, res) => {
    try{
        const authors = await Author.find({})
        res.render('authors/index', { authors: authors })
    } catch {
        res.redirect('/')
    }
 })

// get author
router.get('/new', (req, res) => {
    res.render('authors/new', {
        author: new Author()
    })
})

// create new author
router.post('/', async (req, res) => {
    const author = new Author({
        name: req.body.name
    })
    try {
        const newAuthor = await author.save()
        //res.redirect(`authors/$(newAuthor.id )`)
        res.redirect(`authors`)
    } catch (err) {
        res.render('authors/new', {
            author: author,
            errorMessage: 'Error Creating Author'
        })
    }
})

module.exports = router
