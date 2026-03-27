const Joi = require("joi");

module.exports.listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),

        image: Joi.object({
            url: Joi.string().allow("", null),
            filename: Joi.string().allow("", null)
        }),

        location: Joi.string().required(),
        price: Joi.number().required().min(0),
        country: Joi.string().required(),

        category: Joi.string()
            .valid(
                "Rooms",
                "Mountain",
                "Castle",
                "Beach",
                "Farm",
                "Arctic",
                "Camping",
                "Forest"
            )
            .required()

    }).required()
});

module.exports.rewiewSchema = Joi.object({
    review:Joi.object({
     comment:Joi.string().required(),
     ratings:Joi.number().required().min(1).max(5),
     createdAt:Joi.string()
    }).required()
})














