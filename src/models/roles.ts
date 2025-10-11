import mongoose, { Schema, Types } from "mongoose";

const roleSchema = new Schema({
  roleId: {
    type: String,
    required :true,
    unique:true
  },
  roleName: {
    type: String,
    required: true,
    unique:true    
  },
  permissions: [
    {
      permissionId: {
        type:String,
        required: true, 
        // ref:Permissions
      },
      status: {
        type: String,
        enum: ["Read", "Write", "None"],
        default: "None",
        required: true,
      },
    },
  ],
});

const Roles = mongoose.model("Dashboard Roles", roleSchema);

export default Roles;
