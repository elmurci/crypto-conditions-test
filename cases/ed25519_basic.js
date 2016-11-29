/*jslint node: true*/
"use strict";

const sender = require('../util/sender'),
      receiver = require('../util/receiver'),
      validator = require('../util/validator')

function start(receiver_public_key, receiver_private_key, message) {
  // Create condition - Sender
  const condition = sender.createCondition(receiver_public_key)

  // Fullfill condition - Receiver
  const fulfillment = receiver.fulfillCondition(receiver_public_key, receiver_private_key, message)

  // Validator
  validator.validate(condition, fulfillment, message)
}

module.exports = {
  start
}
