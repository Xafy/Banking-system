const express = require('express')

const router = express.Router();

const customerController = require('../controllers/customers-conroller')

router.get('/create', (req, res)=>{
    res.render("create-customer", {title:"Create Customer"})
})

router.get('/:id', customerController.getCustomerById )

router.get('/', customerController.getCustomers )

router.post('/', customerController.createCustomer)



module.exports = router;