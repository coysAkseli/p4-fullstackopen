const { test, after } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')
const blog = require('../models/blog')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('app returns correct amount of blog posts', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, 2)
})

test(`identifier property is called 'id', not '_id'`, async () => {
    const testBlog = new blog({ title: 'title', author: 'author', url: 'url', likes: 99})
    const savedBlog = await testBlog.save()
    const jsonBlog = savedBlog.toJSON()
    assert.strictEqual(jsonBlog.hasOwnProperty('id'), true, 'blog HAS id property')
    assert.strictEqual(jsonBlog.hasOwnProperty('_id'), false, 'blog does NOT have _id property')    
    await blog.findByIdAndDelete(savedBlog._id)
})

test('HHTP POST request creates a new blog post', async () => {
    const response = await api.get('/api/blogs')
    const lengthBeforePost = response.body.length

    const testBlogPost = new blog({ title: 'tittttle', author: 'authorrr', url: 'urlll', likes: 999})
    const savedNewBlog = await testBlogPost.save()
    
    const res = await api.get('/api/blogs')
    const lengthAfterPost = res.body.length

    assert.strictEqual(lengthAfterPost-lengthBeforePost, 1)

    await blog.findByIdAndDelete(savedNewBlog._id)
})

test('likes are set to 0 if \'likes\' property is missing', async () => {
    const testLikesBlog = new blog({title: 'titleLikesTest', author: 'authorLikesTesties', url: 'urlLikesTest' })
    const savedLikesTest = await testLikesBlog.save()
    
    assert.strictEqual(savedLikesTest.likes, 0)
    await blog.findByIdAndDelete(savedLikesTest._id)
})

after(async () => {
    await mongoose.connection.close()
})