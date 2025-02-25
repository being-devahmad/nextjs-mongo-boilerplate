import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
// import jwt from "jsonwebtoken";
import dbConnect from '@/lib/db';
import User from '@/models/User';

export async function POST(req: NextRequest) {
  await dbConnect();
  const { name, email, password, role } = await req.json();

  console.log(name, email, password);

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Email and password are required' },
      { status: 400 },
    );
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: role || 'user', // Default role is 'user'
  });

  console.log('user---->', user);

  return NextResponse.json(
    { message: 'User created successfully' },
    { status: 201 },
  );
}
