import TryCatch from "../utils/TryCatch.js";
import ApiError from "../Error/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { role } from "../schemas/role.schema.js";
import Roles from "../models/roles.js";

class RoleController {
  
  createRole = TryCatch(async (req, res) => {
    const parsed = role.parse(req.body);
    console.log(parsed)
    const existingRole = await Roles.findOne({ roleName: parsed.roleName });
    if (existingRole) {
      throw new ApiError("Role name already exists", 409, false);
    }

    

    const newRole = await Roles.create(parsed);

    
    const populatedRole = await newRole.populate({
      path: "permissions.permissionId",
      select: "permissionName service active", 
    });

    res
      .status(201)
      .json(new ApiResponse("Role created successfully", 201, populatedRole));
  });


  getAllRoles = TryCatch(async (req, res) => {
    const roles = await Roles.find().populate({
      path: "permissions.permissionId",
      select: "permissionName service active", 
    });

    res.json(new ApiResponse("Roles fetched successfully", 200, roles));
  });

  
  getRoleById = TryCatch(async (req, res) => {
    const { id } = req.params;

    const roleData = await Roles.findById(id).populate({
      path: "permissions.permissionId",
      select: "permissionName service active",
    });

    if (!roleData) {
      throw new ApiError("Role not found", 404, false);
    }

    res.json(new ApiResponse("Role fetched successfully", 200, roleData));
  });

  
  updateRole = TryCatch(async (req, res) => {
    const { id } = req.params;
    const parsed = role.partial().parse(req.body);

    const updatedRole = await Roles.findByIdAndUpdate(id, parsed, {
      new: true,
      runValidators: true,
    }).populate({
      path: "permissions.permissionId",
      select: "permissionName service active",
    });

    if (!updatedRole) {
      throw new ApiError("Role not found", 404, false);
    }

    res.json(new ApiResponse("Role updated successfully", 200, updatedRole));
  });

  
  deleteRole = TryCatch(async (req, res) => {
    const { id } = req.params;

    const deletedRole = await Roles.findByIdAndDelete(id);
    if (!deletedRole) {
      throw new ApiError("Role not found", 404, false);
    }

    res.json(new ApiResponse("Role deleted successfully", 200, deletedRole));
  });
}

export default RoleController;