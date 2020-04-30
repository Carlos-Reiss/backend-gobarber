import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '../config/auth';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticaded(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  /* validação do token */
  const authenticaded = request.headers.authorization;

  if (!authenticaded) {
    throw new Error('JWT token is missing');
  }

  const [, token] = authenticaded.split(' ');

  try {
    const decoded = verify(token, auth.secret);

    const { sub } = decoded as TokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('invalid JWT Token');
  }
}
