const checkMillionDollarIdea = (req, res, next) => {
	const { numWeeks, weeklyRevenue } = req.body;

	if (isNaN(numWeeks) || isNaN(weeklyRevenue)) {
		res.status(400).send();
	} else if (numWeeks * weeklyRevenue < 1000000) {
		res.status(400).send('Idea not awesome enough');
	} else {
		next();
	}
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
