# noteful-api

An Express server app with CRUD endpoints that retrieves data from a json or PostgreSQL datasource.

Works with [https://github.com/asktami/noteful-react-client](https://github.com/asktami/noteful-react-client).

- SQL migration scripts to create the Noteful database with tables for folders and notes including relationships and CASCADES

- A folder is a _parent_ record to child _note_ records

- Note and Folder service objects for the note and folder tables

- Routers to perform CRUD operations for Notes and Folders

- An Express server for the Noteful API with the endpoints /notes and /folders

## Boilerplate Info

See [https://github.com/asktami/bookmarks-server](https://github.com/asktami/bookmarks-server) for info on how I create my Express APIs.
