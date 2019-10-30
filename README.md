# noteful-api

An Express server app with CRUD endpoints that retrieves data from a json or PostgreSQL datasource.

Works with [https://github.com/asktami/noteful-react-client](https://github.com/asktami/noteful-react-client).

- SQL migration scripts to create the Noteful database with tables for folders and notes including relationships and CASCADES

- A folder is a _parent_ record to child _note_ records

- Note and Folder service objects for the note and folder tables

- Routers to perform CRUD operations for Notes and Folders

- An Express server for the Noteful API with the endpoints /notes and /folders

## Install On Your Computer

1. Clone this repo
2. In Terminal, change to the directory on your computer that contains this repo
3. Install dependencies: `npm install`
4. Create the `noteful` PostgreSQL databases:

   - `createdb noteful`
   - `createdb noteful-test`

5. Create the database user: `createuser noteful`

6. Grant privileges to the new user in psql:

   - `GRANT ALL PRIVILEGES ON DATABASE noteful TO noteful`
   - `GRANT ALL PRIVILEGES ON DATABASE "noteful-test" TO noteful`

7. Environment:

   - Prepare environment file: `cp example.env .env`
   - Replace values in `.env` with your custom values.
   - Bootstrap development database: `npm run migrate`
   - Bootstrap test database: `npm run migrate:test`

8. Create development and test database tables:
   - `npm run migrate`
   - `npm run migrate:test`

### Configure Postgres

For tests involving time to run properly, your Postgres database must be configured to run in the UTC timezone.

1. Locate the `postgresql.conf` file for your Postgres installation.
   - OS X, Homebrew: `/usr/local/var/postgres/postgresql.conf`
2. Uncomment the `timezone` line and set it to `UTC` as follows:

```
# - Locale and Formatting -

datestyle = 'iso, mdy'
#intervalstyle = 'postgres'
timezone = 'UTC'
#timezone_abbreviations = 'Default'     # Select the set of available time zone
```

## Sample Data

- To seed the development database:

```
psql -U postgres -d noteful -f ./seeds/seed.folder.sql
psql -U postgres -d noteful -f ./seeds/seed.note.sql
```

- To seed the test database:

```
psql -U postgres -d noteful-test -f ./seeds/seed.folder.sql
psql -U postgres -d noteful-test -f ./seeds/seed.note.sql
```

- To clear seed data:

```
psql -U noteful -d noteful -a -f seeds/trunc.noteful_tables.sql.sql
psql -U noteful -d noteful-test -a -f seeds/trunc.noteful_tables.sql.sql
```

## Scripts

- Start application for development: `npm run dev`
- Run tests: `npm test`

## Boilerplate Info

This project was bootstrapped with [Express Boilerplate with Routes, Winston and UUID](https://github.com/asktami/express-boilerplate-routes).

See [https://github.com/asktami/bookmarks-server](https://github.com/asktami/bookmarks-server) for info on how I created my Express APIs.
