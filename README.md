# noteful-api

## Description

Works with [https://github.com/asktami/noteful-react-client](https://github.com/asktami/noteful-react-client).

An Express app with CRUD endpoints that retrieves data from a json or PostgreSQL datasource.

    - SQL migration scripts to create the Noteful database with tables for folders and notes including relationships and CASCADES
        - a folder is a 'parent' record to child 'note' records

    - Note and Folder service objects for the new tables designed above

    - Routers to perform CRUD operations for Notes and Folders

    - An Express server for the Noteful API with the endpoints /notes and /folders

## Boilerplate Info

See [https://github.com/asktami/bookmarks-server](https://github.com/asktami/bookmarks-server) for info on how this repo was created.
