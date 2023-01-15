import { getConnection } from '../../data_base/data_base';
import jwt from "jsonwebtoken";

//--------------------------------------POST VACAION-----------[ID auto incremental in DB]----------------------

async function postVacation(req, res, next) {
    console.log(req.body)
    await postVacationHandler(req.body)
    return res.status(200).json({ message: "POSTED!!!" });
}

async function postVacationHandler(payload) {
    const { destination, description, picture, date_start, date_end, price } = payload
    const query = postVacationQuery();
    const [result] = await getConnection().execute(query, [destination, description, picture, date_start, date_end, price]);
    console.log("******************VACAION ADDET TO DB**********************")
    return result;
}

const postVacationQuery = () => {
    return `INSERT INTO vc.vacations (destination, description, picture, date_start, date_end, price) VALUES (?, ?, ?, ?, ?, ?);
    `;
};

//--------------------------------------GET ALL VACAIONS----------------------------------

async function getVacations(req, res, next) {
    const result = await getVacationsHandler()
    if (!result) throw new Error("Data not found!")
    return res.status(200).json(result);
}

async function getVacationsHandler() {
    const query = getInputsQuery();
    const [result] = await getConnection().execute(query);
    console.log(result)
    console.log("******************VACAIONS FATCHED FROM DB**********************")
    return result;
}

const getInputsQuery = () => {
    return `SELECT * FROM vc.vacations ORDER BY time_created DESC`;
};

//------------------------------------ LIKE VACATION-------------------------------------------------

async function likeVacation(req, res) {

    const token = req?.headers?.authorization;
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.userData = userDecoded?.data;
        }
    });
    console.log("************* req.user *************")
    console.log(req.userData);
    console.log("************* req.user *************")

    const results = await likeVacationHandler(req.userData.userId, req.params.id);
    res.json({ message: "LIKED VACATION ADDET TO DB", products: results });
}

async function likeVacationHandler(userId, vacationId) {
    const query = likeVacationQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [userId, vacationId]);
    console.log("******************LIKED VACATION ADDET TO DB**********************")
    return result;
}

const likeVacationQuery = () => {
    return `INSERT INTO vc.followed_vacations (user_id, vacation_id) VALUES (?, ?);
    `;
};

//------------------------------------UNLIKE VACATION--------------------------------------------------

async function unlikeVacation(req, res) {

    const token = req?.headers?.authorization;
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.userData = userDecoded?.data;
        }
    });
    console.log("************* req.user *************")
    console.log(req.userData);
    console.log("************* req.user *************")

    const results = await FollowVacation(req.params.id);
    res.json({ message: "LIKED VACATION DELETED FROM DB", products: results });
}

async function FollowVacation(id) {
    const query = deleteFollowVacationQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [id]);
    console.log("******************LIKED VACATION DELETED FROM DB**********************")
    return result;
}

const deleteFollowVacationQuery = () => {
    return `DELETE FROM vc.followed_vacations WHERE (vacation_id = ?);`;
};

//--------------------------------------GET LIKED VACATIOS----------------------------------

async function filteredVacation(req, res, next) {
    const token = req?.headers?.authorization;
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.userData = userDecoded?.data;
        }
    });
    console.log("++++++++++++ req.user ++++++++++++")
    console.log(req.userData);
    console.log("++++++++++++ req.user ++++++++++++")


    const result = await getfilteredVacation(req.userData.userId)
    return res.status(200).json(result);
}

async function getfilteredVacation(userId) {
    const query = filteredVacationQuery();
    const [result] = await getConnection().execute(query, [userId]);
    console.log(result)
    console.log("******************DATA FATCHED FROM DB**********************")
    return result;
}

const filteredVacationQuery = () => {
    return `SELECT vc.vacations.id, destination, description, picture, date_start, date_end, price FROM vc.vacations
    LEFT JOIN vc.followed_vacations
    ON followed_vacations.vacation_id = vc.vacations.id
    WHERE (vc.followed_vacations.user_id = ?) ORDER BY time_created DESC;
    `;
};

// ---------old sheeta ------

`SELECT vc.vacations.id, destination, description, picture, date_start, date_end, price FROM vc.users
    LEFT JOIN vc.followed_vacations
   ON followed_vacations.user_id = vc.users.id
   LEFT JOIN vc.vacations 
   ON vc.vacations.id = vc.followed_vacations.vacation_id
   WHERE vc.users.user_name = ?
    `
//---------------------------CHEACK LIKED VACATIONS----[liked vacation id's by current user id]-----------------------

async function likedCheack(req, res) {
    const token = req?.headers?.authorization;
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.userData = userDecoded?.data;
        }
    });
    console.log("XXXXXXXXXXXX req.user XXXXXXXXXXXX")
    console.log(req.userData);
    console.log("XXXXXXXXXXXX req.user XXXXXXXXXXXX")

    const result = await likedHandleCheack(req.userData.userId)
    return res.status(200).json(result);
}

async function likedHandleCheack(userId) {
    const query = likedCheackQuery();
    const [result] = await getConnection().execute(query, [userId]);
    console.log(result)
    console.log("******************DATA FATCHED FROM DB**********************")
    return result;
}

const likedCheackQuery = () => {
    return `SELECT vacation_id FROM vc.vacations
    LEFT JOIN vc.followed_vacations
    ON followed_vacations.vacation_id = vc.vacations.id
    WHERE vc.followed_vacations.user_id = ?;
    `;
};

//-----------------------------------GET USER DATA ---[React cheak - Role, user_name, id]---------------------------------

async function userData(req, res, next) {
    const token = req?.headers?.authorization;
    if (token === null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
        if (err) {
            return res.sendStatus(403)
        } else {
            req.userData = userDecoded?.data;
        }
    });
    console.log("=(^.^)= =(^.^)= =(^.^)=req.user =(^.^)= =(^.^)= =(^.^)=")
    console.log(req.userData);
    console.log("=(^.^)= =(^.^)= =(^.^)=req.user =(^.^)= =(^.^)= =(^.^)=")

    const result = req.userData
    return res.status(200).json(result);
}

//-------------------------------------+++++++++-----ADMIN------+++++++--------------------------------------------

//---------------------------DELETE-----[Vacation ID from REACT component props to params]-------------------------

async function deleteVacation(req, res) {
    try {
        const results = await deleteVacationHandler(req.params.id);
        if (!results) throw new Error("target not found!")
        res.json({ message: "DELETED!!!", products: results });
    } catch (err) {
        return console.log(err);
    }
}

async function deleteVacationHandler(id) {
    const query = deleteVacationQuery();
    console.log(query);
    const [result] = await getConnection().execute(query, [id]);
    console.log("******************VACATION DELETED FROM DB**********************")
    return result;
}

const deleteVacationQuery = () => {
    return `DELETE FROM vc.vacations WHERE (id = ?);`;
};

//-------------------------------------UPDATE VACATION-----------------------------

async function updateVacation(req, res, next) {
    console.log(req.body)
    const vacationId = req.params.id
    await updateVacationHandler(req.body, vacationId)
    return res.status(200).json({ message: "UPDATED!!!" });
}

async function updateVacationHandler(payload, id) {
    const { destination, description, picture, date_start, date_end, price } = payload
    const query = updateVacationQuery();
    const [result] = await getConnection().execute(query, [id, destination, description, picture, date_start, date_end, price]);
    console.log("******************VACATION UPDATED TO DB**********************")
    return result;
}

const updateVacationQuery = () => {
    return `REPLACE INTO vc.vacations (id, destination, description, picture, date_start, date_end, price) VALUES (?,?,?,?,?,?,?) 
    `
};

//-------------------------------------UPDATE OLD & BAD SHEETA-----------------------------

// const updateVacationQuery = (id, destination, description, picture, date_start, date_end, price) => {
//     return `UPDATE vc.vacations SET destination = 
//     ${destination}' , description = 
//     '${description}', picture = 
//     '${picture}', date_start = 
//     '${date_start}', date_end = 
//     '${date_end}', price = '${price}' 
//     WHERE id = '${id}'
//     `
// };

export {
    postVacation,
    getVacations,
    deleteVacation,
    likeVacation,
    unlikeVacation,
    filteredVacation,
    likedCheack,
    userData,
    updateVacation,
}