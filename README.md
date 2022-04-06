# Seeder for Directus

## Introduction
Seeder for Directus is a simple package using knexjs and the directus API to seed directus with (dummy) data.

## Installation

1. Install Seeder for Directus with the following command
   ```
   npm install directus-seeder
   ```

2. Install knexjs with the following command
   ```
   npm install knex --save
   ```

   Then add one of the following (adding a --save) flag:
   ```
   $ npm install pg
   $ npm install pg-native
   $ npm install @vscode/sqlite3 # required for sqlite
   $ npm install better-sqlite3
   $ npm install mysql
   $ npm install mysql2
   $ npm install oracledb
   $ npm install tedious
   ```

3. Create a knexfile.js by using the following command
   ```
   knex init
   ```
   The knexfile.js will contain the configuration of your database.  
   For more information visit the [offical knexjs documentation](https://knexjs.org/).

## Usage
### Create seed file
You can now create a new seed file with the following command
   ```
   knex seed:make seed_name
   ```
By default, the seed file will be created in the /seeds directory.
You can set a different directory in the knexfile.js file.

---
### Seedfile structure

In your seedfile, you can use the seed function to insert data into the database.  
Your seed function should look like this:
   ```js
const { seed } = require('directus-seeder');

   await seed(knex, directus, 'items', items, {
        clearTableEntries: true,
        fileRoot: __dirname
    })
   ```
The seed function will take the following parameters:
* **knex:** knexjs instance
* **directus:** authenticated directus instance
* **table:** table name
* **data:** data to be inserted
* **options:** options

---
Your authenticated directus instance should look like this:
   ```js
const { Directus } = require('@directus/sdk');

const directus = new Directus('http://localhost:8055', {
    auth: {
        staticToken: 'STATIC_TOKEN',
    },
});
   ```
If you want to use email and password. You should remove the staticToken above and use the following line.
   ```js
await directus.auth.login({ email, password })
   ```

---
Your data should be an array of objects, using the json format:
   ```js
const items = [
   {
      "id": 1,
      "name": "Item 1",
      "description": "This is the first item",
      "image": "file:./images/item1.jpg",
   },
   {
      "id": 2,
      "name": "Item 2",
      "description": "This is the second item",
      "image": "file:./images/item1.jpg",
   },
];
   ```
Use `file:./relative/path/to/file` to handle files.    
The file will be uploaded via the directus api
and the correct file id will be added into the database entry.

---
The options object has the following entries:
* clearTableEntries: If true, the table will be cleared before inserting the data.
* fileRoot: The directory of your current seed file. It is very important to set this otherwise the file could not be found

---
### Execute the seed file

You can run the seed file with the following command
   ```
   knex seed:run --specific=seed_name.js
   ```
or you can run all the seeds in alphabetical order with the following command
   ```
   knex seed:run
   ```

## Example
Here is an example of a seed file.
   ```js
const { seed } = require('directus-seeder');
const { Directus } = require('@directus/sdk');

exports.seed = async function (knex) {
    const items = [
        {
            "id": 1,
            "name": "Item 1",
            "description": "This is the first item",
        },
        {
            "id": 2,
            "name": "Item 2",
            "description": "This is the second item",
        },
    ];
    
    const directus = new Directus('http://localhost:8055', {
        auth: {
            staticToken: 'STATIC_TOKEN',
        },
    });

     // If you want to use email and password. You should remove the staticToken above and use the following line.
     // await directus.auth.login({ email, password })
    
   
    await seed(knex, directus, 'items', items, {
        clearTableEntries: true,
        fileRoot: __dirname
    })
};
   ```
