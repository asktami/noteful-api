# noteful-api

An Express server app with CRUD endpoints that retrieves data from a json or PostgreSQL datasource.

Works with [https://github.com/asktami/noteful-react-client](https://github.com/asktami/noteful-react-client).

- SQL migration scripts to create the Noteful database with tables for folders and notes including relationships and CASCADES

- A folder is a _parent_ record to child _note_ records

- Note and Folder service objects for the note and folder tables

- Routers to perform CRUD operations for Notes and Folders

- An Express server for the Noteful API with the endpoints /notes and /folders

## How to Install On Your Computer

1. Clone this repo
2. In Terminal, change to the directory on your computer that contains this repo
3. Run `npm install`
4. Create your `noteful` PostgreSQL databases:

```
createdb -U postgres noteful
createdb -U postgres noteful-test
```

5. Add records to the database:

```
npm run migrate

-- seed tables:
psql -U postgres -d noteful -f ./seeds/seed.folder.sql
psql -U postgres -d noteful -f ./seeds/seed.note.sql

-- seed test database tables:
psql -U postgres -d noteful-test -f ./seeds/seed.folder.sql
psql -U postgres -d noteful-test -f ./seeds/seed.note.sql

```

5. In Terminal, run `npm start`

---

## Express Boilerplate with Routes, Winston and UUID

This project was bootstrapped with [Express Boilerplate with Routes, Winston and UUID](https://github.com/asktami/express-boilerplate-routes).

## Boilerplate Info

See [https://github.com/asktami/bookmarks-server](https://github.com/asktami/bookmarks-server) for info on how I create my Express APIs.
