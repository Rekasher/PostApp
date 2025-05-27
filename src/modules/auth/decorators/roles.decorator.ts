import { env } from '../../../config/configuration';
import { SetMetadata } from '@nestjs/common';
import { Roles } from '../../../db/role-entities/role.entity';

export const ROLES_KEY = env.ROLES_KEY;
export const Role = (...roles: Roles[]) => SetMetadata(ROLES_KEY, roles);
