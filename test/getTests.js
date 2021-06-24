import supertest from 'supertest';
const request = supertest("https://jsonplaceholder.typicode.com");

import { expect } from 'chai';


describe("GET Tests", () => {

	it("retrieve all posts and verify the status code is 200", async() => {
		await request
			.get("/posts")
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).to.equal(200);
				expect(response.body.length).to.equal(100);
			});
	});

	it("verify the GET response schema", async() => {
		await request
			.get('/posts')
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).to.equal(200);
				response.body.every(i => expect(i).to.have.all.keys('body', 'id', 'title', 'userId'));
			});
	});

	it("get all records for userId 1 and verify the status code is 200", async() => {
		await request
			.get("/posts?userId=1")
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).to.equal(200);
				expect(response.body.length).to.equal(10);
				response.body.every(i => expect(i.userId).to.equal(1));
			});
	});

	it("get record with id 4 and verify only one record was returned", async() => {
		await request
			.get("/posts/4")
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).to.equal(200);
				expect(response.body.id).to.equal(4);
				expect(response.body).to.not.be.an('array');
			});
	});

	it("verify the correct status code for a record not found (404)", async() => {
		await request
			.get("/posts/560")
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).to.equal(404);
			});
	});
});