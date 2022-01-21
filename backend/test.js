const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const Blog = require('./models/Blog')

logger.info('connecting to', config.MONGODB_URI)

mongoose
	.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'BlogList' })
	.then(() => logger.info('connected to MongoDB'))
	.catch(error => logger.error('error connecting to MongoDB:', error.message))


const program = async () => {
    const blogs = await Blog.find({})
    console.log(blogs)
}

program()
