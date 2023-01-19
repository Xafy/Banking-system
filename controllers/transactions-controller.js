const Transaction = require('../models/transaction')
const Customer = require('../models/customers')

const cashTransaction = async (req, res, next) => {
    const {from, to, amount} = req.body

    try {
        const sender = await Customer.findOne({'name' : `${from}`})
        console.log(sender);
        const senderBalance = Number(sender.balance) - Number(amount)
        const updateSender = await Customer.updateOne({name : from}, {balance : senderBalance})
        console.log(updateSender)
        if (updateSender.modifiedCount !== 1){
            res.status(500).send('Could not update sender information')
        }

        const receiver = await Customer.findOne({name : `${to}`})
        console.log(receiver)
        const receiverBalance = Number(receiver.balance) + Number(amount)
        const updateReceiver = await Customer.updateOne({name : to}, {balance : receiverBalance})
        if (updateReceiver.modifiedCount !== 1){
            res.status(500).send('Could not update Receiver information')
            console.log(updateReceiver)
        }

        const transaction = new Transaction({
            from,
            to,
            amount        
        })
        await transaction.save()

        res.redirect('/transactions')
        // res.render('customer', {title:'h', transaction: transaction});
        // res.status(200).json({transaction : {transaction} , message : 'transaction saved'})

    } catch (error) {
        console.log(error);
        res.status(500).send('An Error occured');
    }
}   

const getTransactions = async (req, res, next) =>{
    const transactions = await Transaction.find({}).sort({date : -1})
    res.render("transactions", {title : 'transactions', transactions : transactions})
}

exports.cashTransaction = cashTransaction;
exports.getTransactions = getTransactions;