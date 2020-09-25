const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')

const Book = require('../models/book')
const Author = require('../models/author')

const uploadPath = path.join('public', Book.coverImageBasePath)

const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif']
const upload = multer({
    dest: uploadPath,
    fileFilter: (req, file, callback) => {
        callback(null, imageMimeTypes.includes(file.mimetype))
    }
})

// get all books
router.get('/', async (req, res) => {
    try {
        let query = Book.find()
        if(req.query.title != null && req.query.title != ''){
            query = query.regex('title', new RegExp(req.query.title, 'i'))
        }
        
        if(req.query.publishBefore != null && req.query.publishBefore != ''){
            query = query.lte('publishBefore', req.query.publishBefore)
        }
        
        if(req.query.publishAfter != null && req.query.publishAfter != ''){
            query = query.gte('publishAfter', req.query.publishAfter)
        }
        
        const books = await query.exec()
        res.render('books/index', {
            books: books,
            searchOptions: req.Query
        })
    } catch (err) {
        res.redirect('/')
    }
})

// get book
router.get('/new', async (req, res) => {
    renderNewPage(res, new Book())
})

// create new book  
router.post('/', upload.single('cover'), async (req, res) => {
    const filename = req.file != null ? req.file.filename : null
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishDate: req.body.publishDate,
        pageCount: req.body.pageCount,
        coverImageName: filename,
        description: req.body.description
    })

    try {
        const newBook = await book.save()
        //res.redirect(`books/${newBook.id}`)
        res.redirect('books')
    } catch (err) {
        if (book.coverImageName != null) {
            removeCoverImage(book.coverImageName)
        }
        renderNewPage(res, newBook, true, err)
    }
})

async function removeCoverImage(ImageName) {
    fs.unlink(path.join(uploadPath, ImageName), err => {
        if (err) console.log(err)
    })
}

async function renderNewPage(res, book, hasError = false, error = null) {
    try {
        const authors = await Author.find({})
        const params = {
            authors: authors,
            book: book
        }
        if (hasError) params.errorMessage = `Error Creating Book ${error}`
        res.render('books/new', params)
    } catch (err) {
        console.log(err)
        res.redirect('/books')
    }
}

module.exports = router
