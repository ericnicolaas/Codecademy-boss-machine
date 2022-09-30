const express = require('express');
const apiRouter = express.Router();
const {
	createMeeting,
	getAllFromDatabase,
	getFromDatabaseById,
	addToDatabase,
	updateInstanceInDatabase,
	deleteFromDatabasebyId,
	deleteAllFromDatabase
} = require('./db');

apiRouter.route('/minions')
	.get((req, res) => {

	})
	.post((req, res) => {

	});

apiRouter.route('/minions/:minionId')
	.get((req, res) => {

	})
	.put((req, res) => {

	})
	.delete((req, res) => {

	});

apiRouter.route('/ideas')
	.get((req, res) => {

	})
	.post((req, res) => {

	});

apiRouter.route('/ideas/:ideaId')
	.get((req, res) => {

	})
	.put((req, res) => {

	})
	.delete((req, res) => {

	});

apiRouter.route('/meetings')
	.get((req, res) => {

	})
	.post((req, res) => {

	})
	.delete((req, res) => {

	});

module.exports = apiRouter;
