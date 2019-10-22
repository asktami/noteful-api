const knex = require('knex');
const app = require('./app');
const { PORT, DB_URL } = require('./config');

const db = knex({
	client: 'pg',
	connection: DB_URL
});

app.set('db', db);

console.log('NODE_ENV = ', process.env.NODE_ENV);
console.log('DB_URL = ', DB_URL);

// to DEBUG database connection
console.log('----------------');

const qry = db
	.select('*')
	.from(process.env.TEST_TABLE)
	.toQuery();

const conn = db.select('*').from(process.env.TEST_TABLE);

const rows = db
	.select('*')
	.from(process.env.TEST_TABLE)
	.then(result => {
		console.log('rows = ', result);
	});

console.log(qry);
console.log(conn.client.connectionSettings);

console.log('----------------');

app.listen(PORT, () => {
	console.log(`Server listening at http://localhost:${PORT}`);
});
