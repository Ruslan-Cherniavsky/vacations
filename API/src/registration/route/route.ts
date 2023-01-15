
const express = require('express')
const router = express.Router()

import {  postRegistration,  } from '../hendlers/index'

router.post('/', postRegistration)

export default router;

