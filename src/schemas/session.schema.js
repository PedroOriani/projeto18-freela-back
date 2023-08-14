import Joi from "joi"

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    cpf: Joi.string().regex(/^\d{11}$/).required(),
    phone: Joi.string().regex(/^\d{10,11}$/).required(),
    city: Joi.string().required(),
    state: Joi.string().regex(/^[A-Z]{2}$/).uppercase().required()
})

export const signInSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
})