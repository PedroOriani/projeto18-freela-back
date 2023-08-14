import Joi from 'joi'

export const productSchema = Joi.object({
    image: Joi.string().uri().required(),
    title: Joi.string().max(24).required(),
    model: Joi.string().max(35).required(),
    description: Joi.string().max(170).required(),
    price: Joi.number().positive().precision(2).required(),
    quantity: Joi.number().required()
})