import { Query, Model } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;
  public model: Model<T>;
  public totalProducts: number = 0;
  public totalPages: number = 0;

  constructor(model: Model<T>, query: Record<string, unknown>) {
    this.model = model;
    this.modelQuery = model.find();
    this.query = query;
  }

  async getTotalCount() {
    this.totalProducts = await this.model.countDocuments(this.modelQuery.getFilter());
    return this.totalProducts;
  }

  search(searchFields: string[]) {
    const searchTerm = this.query?.searchTerm as string;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchFields.map((field) => ({
          [field]: { $regex: searchTerm, $options: "i" },
        })),
      });
    }
    return this;
  }

  filter() {
    const filterFields: Record<string, any> = {};
    const { category, color, minPrice, maxPrice } = this.query;

    if (category && category !== "all") filterFields.category = category;
    if (color && color !== "all") filterFields.color = color;
    if (minPrice) filterFields.price = { ...filterFields.price, $gte: Number(minPrice) };
    if (maxPrice) filterFields.price = { ...filterFields.price, $lte: Number(maxPrice) };

    this.modelQuery = this.modelQuery.find(filterFields);
    return this;
  }

  sort() {
    const sortBy = (this.query.sortBy as string) || "createdAt";
    const sortOrder = this.query.sortOrder === "asc" ? 1 : -1;
    this.modelQuery = this.modelQuery.sort({ [sortBy]: sortOrder });
    return this;
  }

  async paginate() {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    await this.getTotalCount();
    this.totalPages = Math.ceil(this.totalProducts / limit);

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  limitFields() {
    if (this.query.fields) {
      const fields = (this.query.fields as string).split(",").join(" ");
      this.modelQuery = this.modelQuery.select(fields);
    }
    return this;
  }

  build() {
    return {
      query: this.modelQuery,
      totalProducts: this.totalProducts,
      totalPages: this.totalPages,
    };
  }
}

export default QueryBuilder;
