module.exports = {
	PORT: process.env.PORT || 8000,
	NODE_ENV: process.env.NODE_ENV || 'test',
	API_TOKEN: process.env.API_TOKEN || 'dummy-api-token',
	TEST_DB_URL:
		process.env.TEST_DB_URL || 'postgresql://twill@localhost/note-test',
	DB_URL: process.env.DB_URL || 'postgresql://twill@localhost/note'
};
