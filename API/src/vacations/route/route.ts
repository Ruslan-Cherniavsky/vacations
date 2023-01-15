const express = require('express')
const router = express.Router()

import {
    postVacation,
    getVacations,
    deleteVacation,
    likeVacation,
    unlikeVacation,
    filteredVacation,
    likedCheack,
    userData,
    updateVacation
} from '../hendlers/index'



//----GET---
router.get('/', getVacations)


//----USER ---

router.post('/follow/:id', likeVacation)

router.delete('/follow/:id', unlikeVacation)

router.get('/follow/', likedCheack)

router.get('/filtered/', filteredVacation)

router.get('/userData/', userData)


//----ADMIN ---

router.post('/', postVacation)

router.delete('/:id', deleteVacation)

router.post('/updatevacation/:id', updateVacation)



export default router;

