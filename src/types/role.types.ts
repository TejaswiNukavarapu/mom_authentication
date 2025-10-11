import type { Types } from "mongoose";

export interface IPermission {
  permissionId: Types.ObjectId;
  status:"Read"|"Write"|"None";
}

export interface IRole extends Document {
  roleId:string;
  roleName:string;
  permissions:IPermission[];
}
