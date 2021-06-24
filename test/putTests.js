import supertest from 'supertest';
const request = supertest("https://jsonplaceholder.typicode.com");

import { expect } from 'chai';


describe("PUT Tests", () => {
	let jsonBody = {
		'title': 'ipsum lorem eum!!!!!',
		'body': 'magni\ndoloribus qui repudiandae\nvero nisi sit\nquos veniam quod sed accusamus veritatis error????',
		'userId': 3,
	};

	it("make a PUT call to update a record and verify the response", async() => {
		await request
			.put("/posts/2")
			.set('Content-Type', 'application/json')
			.send(jsonBody)
			.then((response) => {
				expect(response.statusCode).to.equal(200);
				expect(response.body.userId).to.equal(3);
				expect(response.body.title).to.equal(jsonBody.title);
				expect(response.body.body).to.equal(jsonBody.body);
			});

		/*
		*******
		Should also verify that the new entry was updated, but this API only mocks data changes
		*******
		await request
		    .get("/posts/" + response.body.id)
		    .then((response) => {
		        expect(response.statusCode).to.equal(200);
		        expect(response.body.userId).to.equal(response.body.id);
		        expect(response.body.title).to.equal(jsonBody.title);
		        expect(response.body.body).to.equal(jsonBody.body);
		    })

		*/
	});

	it("verify the PUT response schema", async() => {
		await request
			.put('/posts/2')
			.set('Content-Type', 'application/json')
			.send(jsonBody)
			.then((response) => {
				expect(response.statusCode).to.equal(200);
				expect(response.body).to.have.all.keys('body', 'id', 'title', 'userId');
			});
	});

	it("verify the PUT response correctly returns a 404", async() => {
		await request
			.put('/posts')
			.set('Content-Type', 'application/json')
			.send(jsonBody)
			.then((response) => {
				expect(response.statusCode).to.equal(404);
			});
	});
});
