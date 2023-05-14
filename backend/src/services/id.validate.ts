import { BadRequestException } from '@nestjs/common';
import { Types } from 'mongoose';

export function validId(id: string) {
  const validObjectId = Types.ObjectId.isValid(id);

  if (!validObjectId) {
    throw new BadRequestException('Invalid ObjectId');
  }
}
