const mongoose = require("mongoose");
const { Product, JobApplicants } = require("../../models");

const createProduct = async (data) => {
  const product = await new Product(data).save();
  return product;
};

const applyForJob = async (data) => {
  const product = await new JobApplicants(data).save();
  return product;
};

const deleteProductById = async (ProductId) => {
  const id = mongoose.Types.ObjectId(ProductId);
  return await Product.deleteOne({ _id: id });
};

const updateProduct = async (ProductId, data) => {
  const id = mongoose.Types.ObjectId(ProductId);
  return await Product.updateOne({ _id: id }, { $set: data });
};

const getProductById=async(ProductId)=>{
    const id = mongoose.Types.ObjectId(ProductId); 
    return await Product.findById(id)
}

const getAllProduct = async (queryBuilder, condition) => {
    let [Products, total] = await Promise.all([
        Product.find(queryBuilder.getFindQuery(condition))
            .select(queryBuilder.getSelectFields())
            .sort(queryBuilder.getSortQuery()),    
        Product.countDocuments(queryBuilder.getFindQuery(condition)),
    ]);
    return { Products, total };
};

module.exports = {
  createProduct,
  deleteProductById,
  updateProduct,
  getAllProduct,
  getProductById,
  applyForJob
};
