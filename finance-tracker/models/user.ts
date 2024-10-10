import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  type:{
    type: String,
    enum: ['income', 'expense'],
    required: true
  },
  amount: {
    type: Number, required: true
  },
  date: {
    type: Date, default: Date.now
  }
})
const userSchema = new mongoose.Schema({
  initialBalance: {
    type: Number, required: true
  },
  currentBalance : {
    type: Number, required: true
  },
  transactions: [transactionSchema],
})
export const User = mongoose.model('User', userSchema)