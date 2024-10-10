import {Router} from 'express'
import { addTransaction, createUser, deleteUser, getTransactions } from '../controller/transaction'

export const router = Router()

router.post('/set-balance/:userId', addTransaction )
router.get('/:userId', getTransactions )
router.post('/createUser', createUser)
router.delete('/:userId', deleteUser)