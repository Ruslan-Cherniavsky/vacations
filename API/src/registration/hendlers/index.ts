import { getConnection } from '../../data_base/data_base';
import md5 from "md5";

async function postRegistration(req, res, next) {
    console.log(req.body)
    await addUser(req.body)
    return res.status(200).json({ message: "NEW USER REGISTERED!!!" });
}

async function addUser(payload) {
    const role = "user"
    const { userName, firstName, lastName, password } = payload
    const query = addUersQuery();
    const [result] = await getConnection().execute(query, [userName, firstName, lastName, role, md5(password),]);
    console.log("******************DATA USER ADDET TO DB**********************")
    return result;
}

const addUersQuery = () => {
    return `INSERT INTO vc.users (user_name, first_name, last_name, role,  password) VALUES (?, ?, ?, ?, ?);
    `;
};

export { postRegistration }


