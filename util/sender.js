/*jslint node: true*/
'use strict';

const colors = require('colors/safe'),
      cc = require('five-bells-condition')

function createCondition (pubKey) {

  const sender_fulfillment = new cc.Ed25519()

  // Set public_key
  sender_fulfillment.setPublicKey(new Buffer(pubKey, 'hex'))

  // Condition
  const condition = sender_fulfillment.getConditionUri()

  console.log(colors.green.bold('SENDER') + '\n');
  console.log(colors.grey.italic('The condition is that the private key associated with the passed public key has to sign the message.') + '\n')
  console.log(colors.green('Condition: ' + condition) + '\n')

  return condition

}

function createWithSubcondition (pubKey, message) {

  const sender_fulfillment = new cc.Ed25519()

  // Set public_key
  sender_fulfillment.setPublicKey(new Buffer(pubKey, 'hex'))

  const prefix = new cc.PrefixSha256()
  prefix.setPrefix(message)
  prefix.setSubfulfillment(sender_fulfillment)

  // Condition
  const condition = prefix.getConditionUri()

  console.log(colors.green.bold('SENDER') + '\n');
  console.log(colors.grey.italic('By using a subcondition we embed the message as part of the condition.') + '\n')
  console.log(colors.green('Condition: ' + condition) + '\n')

  return condition

}

module.exports = {
  createCondition,
  createWithSubcondition
}
