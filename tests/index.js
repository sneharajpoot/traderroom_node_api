const express = require('express')
const app = express()
require('../index.js');

const runTest = () => {

    require('./copy.test.js');



}

runTest();