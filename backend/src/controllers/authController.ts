import { Request, Response } from 'express';

import { authSchemas } from '@/schemas';
import { authService } from '@/services';
import { logger } from '@/utils';
import { generateToken } from '@/utils/jwt';

export async function register(req: Request, res: Response): Promise<any> {
  try {
    const body: authSchemas.RegisterSchema = req.body;
    const emailExists = await authService.findUser(body.email);
    if (emailExists)
      return res.status(409).json({ msg: 'Email already exists' });
    const user = await authService.createUser(body);
    res.status(201).json({ msg: 'User created', data: user });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ msg: 'Internal server error' });
  }
}

export async function login(req: Request, res: Response): Promise<any> {
  try {
    const { email, password }: authSchemas.LoginSchema = req.body;
    const user = await authService.findUser(email);
    if (!user) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const isValidPassword = await authService.isPasswordValid(email, password);
    if (!isValidPassword) {
      return res.status(401).json({ msg: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.status(200).json({
      msg: 'Login successful',
      token
    });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
}
