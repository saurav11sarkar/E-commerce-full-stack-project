import catchAsycn from "../../utils/catchAsycn";
import sendResponse from "../../utils/sendresponse";
import { productsService } from "./product.service";

const createProduct = catchAsycn(async (req, res) => {
  const result = await productsService.createProduct(req.body);
  sendResponse(res, 201, "Products create succeffully", result);
});

const getAllproduct = catchAsycn(async (req, res) => {
  const result = await productsService.getAllproduct(req.query);
  sendResponse(res, 200, "Get All Product", result);
});

const singleProduct = catchAsycn(async (req, res) => {
  const result = await productsService.singleProduct(req.params.id);
  sendResponse(res, 200, "Get single id succeffully", result);
});

const updateProduct = catchAsycn(async (req, res) => {
  const result = await productsService.updateProduct(req.params.id, req.body);
  sendResponse(res, 200, "product is updated successfully", result);
});

const deletedProduct = catchAsycn(async (req, res) => {
  const result = await productsService.deletedProduct(req.params.id);
  sendResponse(res, 203, "product deleted is successfully", result);
});

const reletedProduct = catchAsycn(async (req, res) => {
  const result = await productsService.reletedProduct(req.params.id);
  sendResponse(res, 200, "This releted product", result);
});

export const productController = {
  createProduct,
  getAllproduct,
  singleProduct,
  updateProduct,
  deletedProduct,
  reletedProduct,
};
