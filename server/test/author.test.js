/* eslint-disable */
const request = require('supertest');
const Author = require('../models/author.model');

const app = require('../index');

describe('Authors', () => {
    // before each test empty the author collection
    beforeEach(async () => {
        await Author.deleteMany({});
    });

    /**
     * Test /GET route
     */
    describe('/GET authors', () => {
        it('it should listing all authors', async () => {
            request(app)
                .get('/authors')
                .expect('Content-type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).to.be.a('object');
                    expect(response.body).toHaveProperty('authors');
                    expect(response.body.authors).toHaveProperty('length');
                    expect(response.body.authors.length).to.eql(0);
                })
        })
    });

    /**
     * Test /POST route
     */
    describe('/POST authors', () => {
        it('it should not post a author without a name', async () => {
            request(app)
                .post('/authors')
                .set('Accept', 'application/json')
                .send({
                    name: null
                })
                .expect('Content-type', /json/)
                .expect(500)
                .then(response => {
                    expect(response.body).to.be.a('object');
                    expect(response.body).toHaveProperty('message').eql('Error creating author');
                })
        })


        it('it should not post a author', async () => {
            request(app)
                .post('/authors')
                .set('Accept', 'application/json')
                .send({
                    name: 'Test Author'
                })
                .expect('Content-type', /json/)
                .expect(200)
                .then(response => {
                    expect(response.body).to.be.a('object');
                    expect(response.body).toHaveProperty('author');
                    expect(response.body.author).toHaveProperty('_id');
                    expect(response.body.author).toHaveProperty('name').eql('Test Author');
                })
        })
    });

    /**
     * Test /GET/authors/:id route
     */
    describe('/GET authors/:id', () => {
        it('it should get a author by the given id', async () => {
            const author = new Author({
                name: 'Test Author'
            });
            author.save((err, res) => {
                if (!err) {
                    request(app)
                        .get(`/authors/${res.author._id}`)
                        .expect('Content-type', /json/)
                        .expect(200)
                        .then(response => {
                            expect(response.body).to.be.a('object');
                            expect(response.body).toHaveProperty('author');
                            expect(response.body.author).toHaveProperty('_id').eql(res.author._id);
                            expect(response.body.author).toHaveProperty('name').eql('Test Author');
                        })
                }
            })
        })
    });

    /**
     * Test /PUT/authors/:id
     */
    describe('/PUT authors/:id', () => {
        it('it should update a author by the given id', async () => {
            const author = new Author({
                name: 'Test Author'
            });
            author.save((err, res) => {
                if (!err) {
                    request(app)
                        .put(`/authors/${res.author._id}`)
                        .set('Accept', 'application/json')
                        .send({
                            name: 'Updated Test Author'
                        })
                        .expect('Content-type', /json/)
                        .expect(200)
                        .then(response => {
                            expect(response.body).to.be.a('object');
                            expect(response.body).toHaveProperty('author');
                            expect(response.body.author).toHaveProperty('_id').eql(res.author._id);
                            expect(response.body.author).toHaveProperty('name').eql('Updated Test Author');
                        })
                }
            })
        })
    });

    /**
     * Test /DELETE/authors/:id
     */
    describe('/DELETE authors/:id', () => {
        it('it should delete a author by the given id', async () => {
            const author = new Author({
                name: 'Test Author'
            });
            author.save((err, res) => {
                if (!err) {
                    request(app)
                        .delete(`/authors/${res.author._id}`)
                        .expect('Content-type', /json/)
                        .expect(200)
                        .then(response => {
                            expect(response.body).to.be.a('object');
                            expect(response.body).toHaveProperty('author');
                            expect(response.body.author).toHaveProperty('_id').eql(res.author._id);
                            expect(response.body.author).toHaveProperty('name').eql('Test Author');
                        })
                }
            })
        })
    });
})