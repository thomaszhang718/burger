/*
Here is where you setup a model for how to interface with the database.
*/

//Require the ORM object
var orm = require('../config/orm.js');

//This creates burger specific functions
var burger = {
	//This uses the ORM selectAll function and passes in the burgers table into the parameters of the orm function
	selectAll: function(cb) {
		orm.selectAll('burgers', function(res){
			cb(res);
		});
	},
	//This uses the ORM insertOne function and passes in the burgers table, the column names, and the values for those columns into the parameters of the orm function
	//cols and vals are arrays
	insertOne: function(cols, vals, cb) {
		orm.insertOne('burgers', cols, vals, function(res){
			cb(res);
		});
	},
	//This uses the ORM updateOne function and passes in the burgers table, values to update for each column, and where the update happens into the parameters of the orm function
	updateOne: function(objColVals, condition, cb) {
		orm.updateOne('burgers', objColVals, condition, function(res){
			cb(res);
		});
	}
};

//This exports the burger object for use in our controller
module.exports = burger;