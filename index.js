/*jslint node: true*/
"use strict";

const cc = require("five-bells-condition"),
      colors = require('colors/safe');

const private_key = new Buffer('833fe62409237b9d62ec77587520911e9a759cec1d19755b7da901b96dca3d42', 'hex')
const public_key = new Buffer('ec172b93ad5e563bf4932c70e1245034c35467ef2efd4d64ebf819683467e2bf', 'hex')
const other_public_key = new Buffer('ec172b93ad5e563bf4932c70e1245034c35467ef2efd4d64ebf819683467e2b1', 'hex')
const message = "{value: 10.12, from: 'bob', to: 'alice'}"
// Generate condition
const sender_fulfillment = new cc.Ed25519()
const bad_fulfillment = new cc.Ed25519()

sender_fulfillment.setPublicKey(new Buffer(public_key, 'hex'))
bad_fulfillment.setPublicKey(new Buffer(other_public_key, 'hex'))

const condition = sender_fulfillment.getConditionUri()
const bad_condition = bad_fulfillment.getConditionUri()

console.log(colors.green.bold('SENDER') + '\n');
console.log(colors.grey.italic('The condition is that the private key associated with the passed public key has to sign the message.') + '\n')
console.log(colors.green('Condition: ' + condition) + '\n')

console.log(colors.grey.italic('(sender shares the condition with receiver)') + '\n');

// Receiver
const receiver_fulfillment = new cc.Ed25519()
console.log(colors.blue.bold('RECEIVER') + '\n');
console.log(colors.grey.italic('Receives the transaction and signs a message with his/her private key to fulfill the condition.') + '\n')
console.log(colors.grey.italic('The content of the message is not part of the condition. If we want to add this to the condition, we need to use a prefix to embeded it into the condition (sub condition).') + '\n')

receiver_fulfillment.sign(new Buffer(message), private_key)

console.log(colors.blue('Fulfillment URI:' + receiver_fulfillment.serializeUri()) + '\n')
console.log(cc.fromFulfillmentUri(receiver_fulfillment))

console.log('\n' +colors.magenta.bold('RESULT: ' + cc.validateFulfillment(receiver_fulfillment, condition, new Buffer(message))) + '\n');

console.log(colors.yellow('bye!') + '\n');
