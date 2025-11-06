import type { Document, Schema, Types } from "mongoose";
import type { RoleInput } from "../schemas/role.schema.js";

export interface IPermission extends Document, RoleInput {
  permissionId: string;
  status:"Read"|"Write"|"None";
}

export interface IRole extends Document {
  roleId:string;
  roleName:string;
  permissions:IPermission[];
}
