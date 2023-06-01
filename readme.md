# Tiny cassandra orm for node.js

## this orm was introduced as a solution that i faced during my internship project developement.

## documentation:


| Method      | Description                                            | Example                                                                                                  |
|-------------|--------------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| create      | Adds data to the table.                                | `await orm.create({ name: 'John', age: 25 });`                                                           |
| findBy      | Finds records in the table based on given conditions.   | `await orm.findBy({ name: 'John', age: 25 });`                                                           |
| findById    | Finds a record in the table by its ID.                  | `await orm.findById(1);`                                                                                  |
| deleteById  | Deletes a record from the table by its ID.              | `await orm.deleteById(1);`                                                                                |
| updateWith  | Updates a record in the table based on given condition. | `await orm.updateWith({ id: 1 }, { name: 'John Doe' });`                                                 |
| close       | Closes the connection to the Cassandra cluster.         | `await orm.close();`                                                                                      |

## i'm bit lazy i let chatGPT to write this documentation ;) ##