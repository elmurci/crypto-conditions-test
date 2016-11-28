/*jslint node: true*/
'use strict';

const colors = require('colors/safe'),
      cc = require('five-bells-condition')

function validate (condition, fulfillment, message) {

  console.log(colors.green.bold('VALIDATOR'));
  console.log(colors.magenta('Result: ' + cc.validateFulfillment(fulfillment, condition, new Buffer(message))) + '\n');

}

module.exports = {
  validate
}
