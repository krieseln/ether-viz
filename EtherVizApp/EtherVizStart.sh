#!/bin/bash

# start geth client
geth --syncmode "light" --testnet -rpc --rpcapi  "admin,eth,miner,net,personal,web3" --rpccorsdomain "*" --ipcpath /tmp/geth --"allow-insecure-unlock" --unlock '0x49a3e37d06e7590db7318572253ce38293a3c4b5' --password password.prv

# client in docker node:
# geth --rpc --rpcport 8545 --rpcaddr "0.0.0.0" --port 30403 --networkid 22 \
#	 --datadir="./node" --ipcpath=/tmp/geth --rpccorsdomain "*" --nodiscover --rpcapi  "admin,eth,miner,net,personal,web3" \
# -rpc --rpcapi  "admin,eth,miner,net,personal,web3"

# attach geth client to http
geth attach /tmp/geth

