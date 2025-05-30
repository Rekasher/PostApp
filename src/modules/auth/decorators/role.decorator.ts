import { SetMetadata } from '@nestjs/common';
import { env } from '../../../config/configuration';
import { UserRole } from '../../../db/user-entities/user.entity';

export const Roles = (...roles: UserRole[]) =>
  SetMetadata(env.ROLES_KEY, roles);
