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
    assert.strictEqual(response.body.length, 8)
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

test('response 400 if title is missing', async () => {
    const titleMissing = { author: 'author', url: 'testurl', likes: 0 }
    const response = await api
        .post('/api/blogs')
        .send(titleMissing)

    assert.strictEqual(response.status, 400)
})

test('response 400 if url is missing', async () => {
    const urlMissing = { title: 'title', author: 'author', likes: 0 }
    const response = await api
        .post('/api/blogs')
        .send(urlMissing)

    assert.strictEqual(response.status, 400)
})

test('deleting resource', async () => {
    const postToDelete = new blog({ title:'idk', author:'authhhor', url:'urll', likes: 99})
    const savedPostToDelete = await postToDelete.save()

    const id = savedPostToDelete._id.toString()

    await api
        .delete(`/api/blogs/${savedPostToDelete.id}`)
        .expect(204)

    const response = await blog.findById(id)

    assert.strictEqual(response, null)      
})

test('updating resource', async () => {
    const postTestUpdate = new blog({ title:'blabbla', author:'yes', url:'urlssl', likes: 0})
    const savedPostTestUpdate = await postTestUpdate.save()

    const updatedBlog = { title:'blabbla', author:'yes', url:'urlssl', likes: 5}

    const response = await api
        .put(`/api/blogs/${savedPostTestUpdate.id}`)
        .send(updatedBlog)

    assert.strictEqual(response.status, 200)
    await blog.findByIdAndDelete(savedPostTestUpdate._id)

})

after(async () => {
    await mongoose.connection.close()
})