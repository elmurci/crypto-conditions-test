/*jslint node: true*/
"use strict";

const inquirer = require('inquirer'),
      nacl = require('ed25519'),
      ed25519_basic = require('./cases/basic'),
      ed25519_basic_subcondition = require('./cases/basicWithSubcondition')

var questions = [
  {
    type: 'list',
    name: 'type',
    choices: ['1 - Ed25519 (basic)', '2 - Ed25519 (subcondition)'],
    message: 'Crypto condition simulation type',
    default: 0,
    filter: function (val) {
      return val.substring(0,1);
    },
  },
  {
    type: 'input',
    name: 'receiverSeed',
    message: 'Receiver Seed (to generate PubKey)',
    default: '833fe62409237b9d62ec77587520911e9a759cec1d19755b7da901b96dca3d42'
  }
];

inquirer.prompt(questions).then(function (answers) {

  const receiverSeedBuffer = new Buffer(answers.receiverSeed, 'hex'),
        receiverKeypair = nacl.MakeKeypair(receiverSeedBuffer),
        message = new Buffer('{ "value": 12.99 }')

  console.log('\n');

  switch (answers.type) {
    case '1':
      ed25519_basic.start(receiverKeypair.publicKey, receiverSeedBuffer, message)
      break;
    case '2':
      ed25519_basic_subcondition.start(receiverKeypair.publicKey, receiverSeedBuffer, new Buffer(message))
      break;
  }


});

// inquirer.prompt(['1 - Ed25519 (basic), 2 - Ed25519 (subcondition)']).then(function (answers) {
//     // Use user feedback for... whatever!!
//     console.log(answers);
// });
