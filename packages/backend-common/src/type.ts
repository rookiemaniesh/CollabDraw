import {z} from 'zod';

export const SignupSchema=z.object({
    name:z.string(),
    email:z.email(),
    password:z.string().min(5)
})
export const SigninSchema=z.object({
    email:z.email,
    password:z.string().min(6)
})