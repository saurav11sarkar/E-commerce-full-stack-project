import { useState } from "react";
import { useSelector } from "react-redux";
import TextInputs from "./TextInputs";
import SelectInput from "./SelectInput";
import UploadImages from "./UploadImages";

const categories = [
  { label: "Select Category", value: "" },
  { label: "Accessories", value: "accessories" },
  { label: "Dress", value: "dress" },
  { label: "Jewellery", value: "jewellery" },
  { label: "Cosmetics", value: "cosmetics" },
  { label: "Skill Care", value: "skill-care" },
];

const colors = [
  { label: "Select Color", value: "" },
  { label: "Black", value: "black" },
  { label: "Red", value: "red" },
  { label: "Gold", value: "gold" },
  { label: "Blue", value: "blue" },
  { label: "Silver", value: "silver" },
  { label: "Beige", value: "beige" },
  { label: "Green", value: "green" },
];

// const filters = {
//   //   categories: ["all", "accessories", "dress", "jewellery", "cosmetics"],
//   //   colors: ["all", "black", "red", "gold", "blue", "silver", "beige", "green"],
//   priceRanges: [
//     { label: "Under $50", min: 0, max: 50 },
//     { label: "$50 - $100", min: 50, max: 100 },
//     { label: "$100 - $200", min: 100, max: 200 },
//     { label: "$200 and above", min: 200, max: Infinity },
//   ],
// };

const AddProduct = () => {
  const { data: user } = useSelector((state) => state.auth);
  console.log(user);
  const [product, setProduct] = useState({
    name: "",
    category: "",
    color: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = () => {};
  return (
    <div style={{ margin: "32px auto" }} className="container">
      <h2 style={{ marginBottom: "24px" }} className="text-2xl font-bold">
        Add new products
      </h2>
      <form onSubmit={handleSubmit} style={{ margin: "16px 0" }}>
        <TextInputs
          label="Product Name"
          name="name"
          value={product.name}
          onChange={handleChange}
          type="text"
          placeholder="Product name"
        />
        <br />
        <SelectInput
          label="Category"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />
        <br />
        <SelectInput
          label="Color"
          name="color"
          value={product.color}
          onChange={handleChange}
          options={colors}
        />
        <br />
        <TextInputs
          label="Price"
          name="price"
          value={product.price}
          onChange={handleChange}
          type="number"
          placeholder="50"
        />
        <br />
        <UploadImages
          name="image"
          id="image"
          value={(e) => setImage(e.target.value)}
          placeholder="Upload Image"
          setImage={setImage}
        />
      </form>
    </div>
  );
};

export default AddProduct;
