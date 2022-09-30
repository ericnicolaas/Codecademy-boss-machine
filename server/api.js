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

const checkMillionDollarIdea = require('./checkMillionDollarIdea');

apiRouter.route('/minions')
	.get((req, res) => {
		res.send(getAllFromDatabase('minions'))
	})
	.post((req, res) => {
		const minion = addToDatabase('minions', req.body);
		res.status(201).send(minion);
	});

apiRouter.param('minionId', (req, res, next, id) => {
	if (!isNaN(id)) {
		const minion = getFromDatabaseById('minions', id);
		if (minion) {
			req.minion = minion;
			return next();
		}
	}

	const err = new Error('No such minion');
	err.status = 404;
	next(err);
});

apiRouter.route('/minions/:minionId')
	.get((req, res) => {
		res.send(req.minion)
	})
	.put((req, res) => {
		const data = req.body;
		if (!data.id) {
			data.id = req.minion.id;
		}

		const minion = updateInstanceInDatabase('minions', data);

		if (!minion) {
			const err = new Error('Invalid data');
			err.status = 400;
			return next(err);
		}

		res.send(minion);
	})
	.delete((req, res, next) => {
		const deleted = deleteFromDatabasebyId('minions', req.minion.id);
		if (!deleted) {
			const err = new Error('Unable to delete minion');
			err.status = 404;
			return next(err);
		}

		res.status(204).send();
	});

apiRouter.route('/minions/:minionId/work')
	.get((req, res) => {
		const minionWork = getAllFromDatabase('work').filter(work => work.minionId === req.minion.id);
		res.send(minionWork)
	})
	.post((req, res) => {
		const workData = { ...req.body, minionId: req.minion.id };
		const work = addToDatabase('work', workData);
		res.status(201).send(work);
	});


apiRouter.param('workId', (req, res, next, id) => {
	if (!isNaN(id)) {
		const work = getFromDatabaseById('work', id);
		if (work) {
			req.work = work;
			return next();
		}
	}

	const err = new Error('No such work');
	err.status = 404;
	next(err);
});

apiRouter.route('/minions/:minionId/work/:workId')
	.put((req, res, next) => {
		const workData = {
			...req.body,
			minionId: req.minion.id,
			id: req.work.id
		};

		const work = getFromDatabaseById('work', req.work.id);

		if (work.minionId === req.minion.id) {
			const updatedWork = updateInstanceInDatabase('work', workData);
			if (updatedWork) {
				return res.send(updatedWork);
			}
		}

		res.status(400).send('Invalid data');
	})
	.delete((req, res, next) => {
		const deleted = deleteFromDatabasebyId('work', req.work.id);
		if (!deleted) {
			const err = new Error('Unable to delete work');
			err.status = 404;
			return next(err);
		}

		res.status(204).send();
	});

/**
 * Ideas
 */

apiRouter.route('/ideas')
	.get((req, res) => {
		res.send(getAllFromDatabase('ideas'))
	})
	.post(checkMillionDollarIdea, (req, res) => {
		const idea = addToDatabase('ideas', req.body);
		res.status(201).send(idea);
	});

apiRouter.param('ideaId', (req, res, next, id) => {
	if (!isNaN(id)) {
		const idea = getFromDatabaseById('ideas', id);
		if (idea) {
			req.idea = idea;
			return next();
		}
	}

	const err = new Error('No such idea');
	err.status = 404;
	next(err);
});

apiRouter.route('/ideas/:ideaId')
	.get((req, res) => {
		res.send(req.idea)
	})
	.put(checkMillionDollarIdea, (req, res) => {
		const data = req.body;
		if (!data.id) {
			data.id = req.idea.id;
		}

		const idea = updateInstanceInDatabase('ideas', data);

		if (!idea) {
			const err = new Error('Invalid data');
			err.status = 400;
			return next(err);
		}

		res.send(idea);
	})
	.delete((req, res) => {
		const deleted = deleteFromDatabasebyId('ideas', req.idea.id);
		if (!deleted) {
			const err = new Error('Unable to delete idea');
			err.status = 404;
			return next(err);
		}

		res.status(204).send();
	});

apiRouter.route('/meetings')
	.get((req, res) => {
		res.send(getAllFromDatabase('meetings'))
	})
	.post((req, res) => {
		const meeting = addToDatabase('meetings', createMeeting());
		res.status(201).send(meeting);
	})
	.delete((req, res) => {
		deleteAllFromDatabase('meetings');
		res.status(204).send();
	});

module.exports = apiRouter;
