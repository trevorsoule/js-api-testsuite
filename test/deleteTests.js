import supertest from 'supertest';
const request = supertest("https://jsonplaceholder.typicode.com");

import { expect } from 'chai';


describe("DELETE Tests", () => {

	it("make a delete call to remove a record and verify the response", async() => {
		await request
			.delete("/posts/1")
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).to.equal(200);
			});

		/*
		*******
		Should also verify that the new entry was deleted, but this API only mocks data changes
		*******
		await request
		    .get("/posts/1")
		    .then((response) => {
		        expect(response.statusCode).to.equal(404);
		    });

		*/
	});

	it("make a call and verify 404 error response", async() => {
		await request
			.delete("/posts/")
			.set('Content-Type', 'application/json')
			.then((response) => {
				expect(response.statusCode).to.equal(404);
			});
	});
});
