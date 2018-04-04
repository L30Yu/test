'use strict';

/**
 * Module dependencies
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  path = require('path'),
  config = require(path.resolve('./config/config')),
  chalk = require('chalk');

/**
 * Game Schema
 */
var GameSchema = new Schema({
    // -- Create your schema here
});

mongoose.model('Game', GameSchema);
