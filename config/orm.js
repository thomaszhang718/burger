/*
Here is the O.R.M. where you write functions that takes inputs and conditions and turn them into database commands like SQL.
*/
var connection = require('../config/connection.js');

//This function is used to print the string of question marks corresponding to the number of values we are adding. This is used in the mySQL connection and not have to list all the values in the query string
function printQuestionMarks(num){
  var arr = [];

  for (var i=0; i<num; i++){
    arr.push('?')
  }

  return arr.toString();
}

//This function is used to format an object key value pairing and turn it into an SQL statement. In SQL we could set column1=value where some condition is true
function objToSql(ob){
  //column1=value, column2=value2,...
  var arr = [];

  for (var key in ob) {
    arr.push(key + '=' + ob[key]);
  }

  return arr.toString();
}

//This is the orm object which will contain all our functions
var orm = {

    //This function creates an SQL statement based on the tableInput parameter and selects everything from that table. We pass the result into our callback function to pass it up the chain in our app
    selectAll: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    //This function creates a new item into our SQL database. We specify the table, columns, and values in our parameters, then send the result with a callback function
    //vals is an array of values that we want to save to cols
    //cols are the columns we want to insert the values into
    insertOne: function(table, cols, vals, cb) {
      var queryString = 'INSERT INTO ' + table;

      //This creates our SQL query string from arrays to strings and makes it into code that SQL can read
      queryString = queryString + ' (';
      queryString = queryString + cols.toString();
      queryString = queryString + ') ';
      queryString = queryString + 'VALUES (';
      queryString = queryString + printQuestionMarks(vals.length);
      queryString = queryString + ') ';

      console.log(queryString)

      connection.query(queryString, vals, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    },

    //This function updates an item in our SQL database. We specify the table, the values updated, and the condition in our parameters, then send the result with a callback function
    //objColVals would be the columns and values that you want to update
    //an example of objColVals would be {name: panther, sleepy: true}
    updateOne: function(table, objColVals, condition, cb) {
      var queryString = 'UPDATE ' + table;

      //This creates our SQL query string from arrays to strings and makes it into code that SQL can read
      queryString = queryString + ' SET ';
      queryString = queryString + objToSql(objColVals);
      queryString = queryString + ' WHERE ';
      queryString = queryString + condition;

      console.log(queryString)
      connection.query(queryString, function(err, result) {
        if (err) throw err;
        cb(result);
      });
    }
};

//This exports the orm object for use in our models
module.exports = orm;