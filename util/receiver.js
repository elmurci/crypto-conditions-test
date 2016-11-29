/*jslint node: true*/
'use strict';

const colors = require('colors/safe'),
      cc = require('five-bells-condition');

function fulfillCondition (pubKey, seed, message) {

  const receiver_fulfillment = new cc.Ed25519()
  console.log(colors.blue.bold('RECEIVER') + '\n');
  console.log(colors.grey.italic('Receives the transaction and signs a message with his/her private key to fulfill the condition.') + '\n')
  console.log(colors.grey.italic('The content of the message is not part of the condition. If we want to add this to the condition, we need to use a prefix to embeded it into the condition (sub condition).') + '\n')

  receiver_fulfillment.sign(new Buffer(message), seed)

  const fulfillment = receiver_fulfillment.serializeUri()

  console.log(colors.blue('Fulfillment URI:' + fulfillment) + '\n')
  //console.log(cc.fromFulfillmentUri(fullfillment))

  return receiver_fulfillment.serializeUri()

}

function fulfillWithSubcondition (pubKey, seed, message) {

  const receiver_fulfillment = new cc.Ed25519()

  console.log(colors.blue.bold('RECEIVER') + '\n');
  console.log(colors.grey.italic('Receives the transaction and signs a message with his/her private key to fulfill the condition.') + '\n')
  console.log(colors.grey.italic('The content of the message IS part of the condition.') + '\n')

  receiver_fulfillment.setPublicKey(pubKey)

  const condition = receiver_fulfillment.getConditionUri()

  receiver_fulfillment.sign(message, seed)

  const prefix = new cc.PrefixSha256()
  prefix.setPrefix(message)
  prefix.setSubfulfillment(receiver_fulfillment)

  const fulfillment = prefix.serializeUri()

  const result = cc.validateFulfillment(receiver_fulfillment, condition, message)

  console.log(colors.blue('Fulfillment URI:' + fulfillment) + '\n')

  return fulfillment

}

module.exports = {
  fulfillCondition,
  fulfillWithSubcondition
}
