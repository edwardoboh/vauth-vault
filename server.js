require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const db = require('./db')
const Web3 = require('web3')
const contract = require('truffle-contract')
const fs = require('fs')
// const artifacts = require('./build/contracts/Vauth.json')
const artifacts = fs.readFileSync('./build/contracts/Vauth.json')
const contract_address = process.env.CONTRACT
const account_address = process.env.ACCOUNT

db(mongoose)

if(typeof web3 !== 'undefined'){
    var web3 = new Web3(web3.currentProvider)
}else{
    var web3 = new Web3(new Web3.providers.HttpProvider('https://api.s0.b.hmny.io'))
}

const vauth = contract(JSON.parse(artifacts))
vauth.setProvider(web3.currentProvider)
vauth.at(contract_address).then((contract_pointer) => {
    // Routes for webpages
    app.use(express.static(__dirname + '/views'));
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    // app.use(routes)
    app.use(require('./routes')({contract_pointer, account_address}))
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
