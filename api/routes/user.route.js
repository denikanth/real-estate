import express from 'express'
import { deleteUser, test, updateUser } from '../controllers/user.controller.js'
import { verfiyToken } from '../utils/verifyUser.js'
const router=express.Router()

router.get('/test',test)//these are the subroutes of api/user api route
router.post('/update/:id',verfiyToken,updateUser)
router.delete('/delete/:id',verfiyToken,deleteUser)

export default router