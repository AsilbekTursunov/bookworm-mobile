import User from "@/lib/models/user";
import connectDB from "@/lib/server/connect";
import { generateToken, JWT_SECRET_KEY } from "@/lib/utils/token";
import jwt from 'jsonwebtoken'

export async function GET(req: Request) {
  
  const authHeader = req.headers.get('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  } 
  const token = authHeader.split(' ')[1]; 

  await connectDB()
  
  try {

    const decoded = jwt.verify(token, JWT_SECRET_KEY); // Assume verifyToken is a function to verify the token 
    if (typeof decoded != 'object') {
      return new Response(JSON.stringify({ error: 'Invalid token payload' }), { status: 401 });
    }
    const email = decoded.email;

    const user = await User.findOne({ email }); // Assume findUserById is a function to fetch user data
    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }
    const newToken =  generateToken(`${user._id}`, email);

    return new Response(JSON.stringify({
      token:newToken,
      user: { id: user._id, email: user.email, username: user.username, image: user.profileImage },
    }), { status: 201 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), { status: 401 });
  }
}