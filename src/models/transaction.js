const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const transactionSchema = new Schema({
    from : {type : String, required : true},
    to : {type : String, required : true},
    amount : {type: Number, required : true},
    date : {type : Date, default: mongoose.now(), required : true}
})

module.exports = mongoose.model('Transaction', transactionSchema)