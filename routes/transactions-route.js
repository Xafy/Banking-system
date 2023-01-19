const express = require('express')

const router = express.Router();

const transactionController = require('../../controllers/transactions-controller')

router.get('/', transactionController.getTransactions)

router.post('/', transactionController.cashTransaction)

module.exports = router;