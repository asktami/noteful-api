require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');

const validateBearerToken = require('./validate-bearer-token');
const errorHandler = require('./error-handler');

const noteRouter = require('./note/note-router');
const folderRouter = require('./folder/folder-router');

const app = express();

/*
NOTE: changes made in response to Heroku changes to their https://cors-anywhere.herokuapp.com proxy in Dec 2020

TO HANDLE these CORS errors:

	(index):1 Access to fetch at 'http://localhost:8000/api/folders' from origin 'http://localhost:8001' has been blocked by CORS policy: Response to preflight request doesn't pass access control check: It does not have HTTP ok status.

	AND

	Request header field authorization is not allowed by Access-Control-Allow-Headers in preflight response.

ADDED
#4 with if ('OPTIONS' === req.method)...
*/

// 1.
// should allow CORS requests for all urls but not working
// app.use(cors());

// -------------------------------------------------------
// 2.
// ALTERNATIVE, include before other routes
// should allow CORS requests for these urls but not working

// app.use(
// 	cors({
// 		origin: [
// 			'http://localhost:8001',
// 			'https://noteful-app-asktami.vercel.app/',
// 		],
// 		credentials: true,
// 	})
// );

// -------------------------------------------------------
// 3.
// ALTERNATIVE, if don't use npm cors package
// but not working
// change * to:
// https://noteful-app-asktami.vercel.app/

// -------------------------------------------------------
// 4.
// THIS WORKS
// for CORS
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*');
// 	res.header(
// 		'Access-Control-Allow-Methods',
// 		'GET, POST, PATCH, PUT, DELETE, OPTIONS'
// 	);
// 	res.header(
// 		'Access-Control-Allow-Headers',
// 		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 	);

// 	// intercepts OPTIONS method
// 	if ('OPTIONS' === req.method) {
// 		res.header('Access-Control-Allow-Origin', '*');
// 		res.header(
// 			'Access-Control-Allow-Methods',
// 			'GET, POST, PATCH, PUT, DELETE, OPTIONS'
// 		);
// 		res.header(
// 			'Access-Control-Allow-Headers',
// 			'Origin, X-Requested-With, Content-Type, Accept, Authorization'
// 		);
// 		//respond with 200
// 		res.send(200);
// 	} else {
// 		//move on
// 		next();
// 	}
// });

// from CodeMentor
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	// res.header("Access-Control-Allow-Credentials: true")
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	// res.header("Access-Control-Max-Age", "1000")
	if (req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
		return res.status(200).json({});
	}
	next();
});

app.use(
	morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
		skip: () => NODE_ENV === 'test',
	})
);
app.use(helmet());
app.use(helmet.hidePoweredBy());
app.use(validateBearerToken); // to use a manually set TOKEN vs. JWT

app.use('/api/notes', noteRouter);
app.use('/api/folders', folderRouter);

app.get('/', (req, res) => {
	res.send('Hello, world!');
});

app.use(errorHandler);
module.exports = app;
