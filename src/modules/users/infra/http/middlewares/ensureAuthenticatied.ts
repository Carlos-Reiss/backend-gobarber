import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import auth from '@config/auth';
import AppError from '@shared/errors/AppError';

interface ITokenPayload {
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
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authenticaded.split(' ');

  try {
    const decoded = verify(token, auth.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new AppError('invalid JWT Token', 401);
  }
}
