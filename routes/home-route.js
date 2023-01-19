const express = require('express')

const router = express.Router();

const customerController = require('../../controllers/customers-conroller');
const transactionsController = require('../../controllers/transactions-controller');

router.get('/', customerController.getCustomers )

module.exports = router;