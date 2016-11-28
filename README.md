# Crypto Conditions Quick (and dirty!) Test

## Purpose

To understand and validate with an example one of the use cases of Crypto Conditions.

## Simple use case

A receiver shares a crypto condition with a receiver which tries to fulfill successfully.

## How to run it

Just do `npm start` and answer the prompt questions

## TODO

**Do the rest of the cases apart from Ed25519**

## CC as Curried Functions

* **preimageSha256**(hash)(preimage)()
* **rsaSha256**(pubkey)(signature)(message)
* **ed25519**(pubkey)(signature)(message)
* **prefixSha256**(subcondition, prefix)(fulfillment)(message)
* **thresholdSha256**(subconditions, threshold)(subfulfillments)(message)
