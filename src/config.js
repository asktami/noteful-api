module.exports = {
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'test',
	API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
	TEST_DATABASE_URL:
		process.env.TEST_DATABASE_URL || 'postgresql://noteful@localhost/note-test',
	DATABASE_URL:
		process.env.DATABASE_URL || 'postgresql://noteful@localhost/note'
};
