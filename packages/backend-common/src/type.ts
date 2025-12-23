import {z} from 'zod';

export const SignupSchema=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string().min(5)
})
export const SigninSchema=z.object({
    email:z.string().email(),
    password:z.string().min(6)
})

export const RoomSchema=z.object({
    roomId:z.string().max(10).min(3)
})