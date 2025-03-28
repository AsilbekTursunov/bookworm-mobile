import connectDB from '@/lib/server/connect';
import bcrypt from 'bcryptjs';
import User from '@/lib/models/user';
import { generateToken } from '@/lib/utils/token';
export async function POST(req: Request) {
  try {
    const { email, username, password } = await req.json()

    await connectDB()

    const existUser = await User.findOne({ email })
    if (existUser) return new Response(JSON.stringify({ message: 'User already exists' }), { status: 400 })

    const exitUsername = await User.findOne({ username });
    if (exitUsername) return new Response(JSON.stringify({ message: 'This username already taken by users' }), { status: 400 })

    const profileImage = `https://api.dicebear.com/7.x/avataaars/png?seed=${username}`;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword, username, profileImage });
    const token = generateToken(`${user._id}`, email);

    return new Response(JSON.stringify({
      token,
      user: { id: user._id, email: user.email, username: user.username, image: user.profileImage, createdAt: user.createdAt },
    }), { status: 201 })
  } catch (error) {

  }
}