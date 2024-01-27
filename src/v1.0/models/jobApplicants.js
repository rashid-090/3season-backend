const { ITEM_TYPE_COURSE } = require("../../config/constants");

module.exports = (mongoose, collectionName) => {
    const schema = mongoose.Schema(
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required:true
            },
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
        },
        {
            timestamps: true,
        }
    );

    return mongoose.model("JobApplicants", schema, collectionName);
};
