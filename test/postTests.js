import supertest from 'supertest';
const request = supertest("https://jsonplaceholder.typicode.com");

import { expect } from 'chai';


describe("POST Tests", () => {
	let jsonBody = {
		'title': 'optio molestias id quia eum!!!!!',
		'body': 'quo et expedita modi cum officia vel magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error????',
		'userId': 3,
	};

	it("make a post call to create a new record and verify the response", async() => {
		await request
			.post("/posts")
			.set('Content-Type', 'application/json')
			.send(jsonBody)
			.then((response) => {
				expect(response.statusCode).to.equal(201);
				expect(response.body.userId).to.equal(3);
				expect(response.body.title).to.equal(jsonBody.title);
				expect(response.body.body).to.equal(jsonBody.body);
			});

		/*
		*******
		Should also verify that the new entry was created, but this API only makes created data
		*******
		await request
		    .get("/posts/" + response.body.id)
		    .then((response) => {
		        expect(response.statusCode).to.equal(200);
		        expect(response.body.userId).to.equal(response.body.id);
		        expect(response.body.title).to.equal(jsonBody.title);
		        expect(response.body.body).to.equal(jsonBody.body);
		    });

		*/
	});

	it("verify the POST response schema", async() => {
		await request
			.post('/posts')
			.set('Content-Type', 'application/json')
			.send(jsonBody)
			.then((response) => {
				expect(response.statusCode).to.equal(201);
				expect(response.body).to.have.all.keys('body', 'id', 'title', 'userId');
			});
	});
});