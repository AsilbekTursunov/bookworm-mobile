import jwt from 'jsonwebtoken';

export const JWT_SECRET_KEY = 'J5M6kQivk9LUSUyhr6Q27LeX5xlCIzmNCa81mM'

export function generateToken(userId: string, email: string) {
  const accessToken = jwt.sign({ userId, email }, JWT_SECRET_KEY, {
    expiresIn: "14D",
  });
  return accessToken;
} 