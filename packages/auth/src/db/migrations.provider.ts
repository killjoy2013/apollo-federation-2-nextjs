import { Init1661891044260 } from './migrations/1661891044260-Init';
import { Procedures1661891105976 } from './migrations/1661891105976-sp_assign_right_to_role';
import { Seed1661891474681 } from './migrations/1661891474681-Seed';
import { AddRoleRights1661891561650 } from './migrations/1661891561650-AddRoleRight';

export const MigrationsProvider = [
  Init1661891044260,
  Procedures1661891105976,
  Seed1661891474681,
  AddRoleRights1661891561650,
];
