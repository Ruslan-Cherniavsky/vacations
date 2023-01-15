import jwt from "jsonwebtoken";
export function signToken(obj: { userName: string, userId: any, role: any }) {
  const token = jwt.sign({ data: { ...obj, password: null } }, process.env.SECRET || "mySecretForApplication1234567",
    { expiresIn: "10h" }
  );

  return token;
}
