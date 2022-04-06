# Seeder for Directus

## Introduction
Seeder for Directus is a simple package using knexjs and the directus API to seed directus with (dummy) data.

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
           "image": "file:./images/item1.jpg",
        },
        {
            "id": 2,
            "name": "Item 2",
            "description": "This is the second item",
            "image": "file:./images/item2.jpg",
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

## Installation

1. Install Seeder for Directus with the following command
   ```
   npm install directus-seeder
   ```

2. Install knexjs with the following command
   ```
   npm install knex --save
   ```

   Then add one of the following (adding a `--save`) flag:
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

3. Create a `knexfile.js` by using the following command
   ```
   knex init
   ```
   The `knexfile.js` will contain the configuration of your database.  
   For more information visit the [offical knexjs documentation](https://knexjs.org/).

## Create a seed file
You can create a new seed file with the following command
   ```
   knex seed:make seed_name
   ```
By default, the seed file will be created in the `/seeds` directory.
You can set a different directory in the `knexfile.js` file.

## Execute the seed file

You can run the seed file with the following command
   ```
   knex seed:run --specific=seed_name.js
   ```
or you can run all the seeds in alphabetical order with the following command
   ```
   knex seed:run
   ```

## Seed file structure

In the seed file, you will use the seed function to insert data into the database
and upload images via the directus API.  
The seed function should be called like this:
   ```js
const { seed } = require('directus-seeder');

   await seed(knex, directus, 'table_name', entries, {
        clearTableEntries: true,
        fileRoot: __dirname
    })
   ```

The seed function will take the following parameters:
* **knex** `Knex`: instance of knexjs
* **directus** `IDirectus<TypeMap>`: authenticated directus instance
* **tableName** `string`: table name
* **entries** `object[]`: data to be inserted
* **options** `object`: options

### options
You can set the following options:
* **clearTableEntries `boolean`**: If true, the table will be cleared before inserting the data.
* **fileRoot** `string`:   By default, the directory in which the seed command is executed is used to compile the file path.
* If you want to use a different directory, you can set the fileRoot option.



### directus instance
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

### entries
This argument should be an array of objects using the json format:
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
Use `file:./path/to/file` to handle files. The path should be relative to the directory
in which the seed command is executed. If you set the fileRoot option, the path should be relative to the fileRoot.
The file will be uploaded via the directus api and the correct file id will be added into the database entry.

