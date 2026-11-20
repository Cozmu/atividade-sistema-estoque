import { BadRequestError } from '../errors/HttpError';

export function parsePositiveInt(value: unknown, message: string): number {
  const number = typeof value === 'string' ? Number(value) : NaN;
  if (!Number.isInteger(number) || number <= 0) throw new BadRequestError(message);

  return number;
}
