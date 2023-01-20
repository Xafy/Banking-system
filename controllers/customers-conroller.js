const customers = require('../models/customers');
const Customer = require('../models/customers');


const createCustomer = async (req, res, next)=>{
    const createdCustomer = new Customer({
        name: req.body.name,
        email: req.body.email,
        balance: req.body.balance
    })

    const result = await createdCustomer.save();

    res.render("create-customer", {title:"Create Customer"});
}

const getCustomers = async (req, res, next)=>{
    try {
        const customers = await Customer.find().exec();
        res.render('customers', {
                title : 'Customers',
                customers : customers
        })
    } catch (err){
        res.json({message : `Error fetching customers , ERROR => /n /t ${err}`})
    }
    // res.json({customers});
}

const getCustomerById = async (req, res, next)=>{
    const id = req.params.id;
    try {
        const user = await Customer.findById(id);
        const users = await Customer.find().exec()
        if (user){
            res.render('customer', {title: `${user.name} page`, user: user, users: users});
        } else {
            res.redirect('/');
        }
    } catch (err){
        res.send('An error occurd').redirect('/')
    }
}

exports.createCustomer = createCustomer;
exports.getCustomers = getCustomers;
exports.getCustomerById = getCustomerById;