import * as z from 'zod'

export const user = z.object({
    name:z.string(),
    email:z.email(),
    contactNumber:z.string() , 
    photo:z.string().optional() ,
    refreshToken:z.string().optional() , 
    password:z.string().optional() ,
    // isActive:z.string(),
    Status:z.enum(['Active','InActive']),
    clusterId:z.string().optional(),
    storeId:z.string().optional(),
    roleId:z.string().optional(),
    //
    passwordResetToken:z.number().optional(),
    // passwordResetTokenExpires:z.string().optional(),
    // passwordChangedAt:z.string()
    
})

export type UserInput = z.infer<typeof user>