import jwt from "jsonwebtoken";
export default function verifyToken(req, res, next) {
  const token = req?.headers?.authorization;

  if (token === null) return res.sendStatus(401)
  
  jwt.verify(token, process.env.SECRET, (err, userDecoded) => {
    if (err) {
      return next({ ...err, status: 401 });
    } else {
      req.userData = userDecoded?.data;
      console.log("#################### req.user ######################");
      console.log(req.userData);
      console.log("#################### req.user ######################");
      return next();
    }
  });
}
