import Joi from "joi"

export const signUpSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    CPF: Joi.string().length(11).required(),
    celphone: Joi.string().min(10).max(11).required(),
    city: Joi.string().required()

})