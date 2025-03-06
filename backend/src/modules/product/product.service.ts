import QueryBuilder from "../../builder/queryBuilder";
import Review from "../review/review.model";
import { IProduct } from "./product.interface";
import Product from "./product.model";

const createProduct = async (payload: IProduct) => {
  const result = await Product.create(payload);
  const reviews = await Review.find({ productId: result._id });
  if (reviews.length > 0) {
    const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalRating / reviews.length;
    result.rating = averageRating;
    await result.save();
  }
  return result;
};

const getAllproduct = async (query: Record<string, unknown>) => {
  const queryBuilderAll = new QueryBuilder(Product, query)
    .search(["name", "description"])
    .filter()
    .sort()
    .limitFields();

  await queryBuilderAll.paginate();
  const { query: result, totalProducts, totalPages } = queryBuilderAll.build();
  const products = await result;

  return { products, totalProducts, totalPages };
};

const singleProduct = async (id: string) => {
  const result = await Product.findById(id).populate(
    "author",
    "email username"
  );
  if (!result) throw new Error("Product is not found");
  const reviews = await Review.find({ id }).populate(
    "userId",
    "username email"
  );
  return { result, reviews };
};

const updateProduct = async (id: string, payload: Partial<IProduct>) => {
  const result = await Product.findByIdAndUpdate(id, payload, { new: true });
  if (!result) throw new Error("Not updated the product");
  return result;
};

export const productsService = {
  createProduct,
  getAllproduct,
  singleProduct,
  updateProduct,
};
