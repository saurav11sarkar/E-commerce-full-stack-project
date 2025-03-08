import { useState } from "react";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productApi";

const PostAReview = ({ isModelOpen, handleClose }) => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(0);

  const {} = useFetchProductByIdQuery(id, { skip: !id });

  const handleRatting = (star) => {
    setRating(star);
  };
  return (
    <div
      style={{ padding: "0 8px" }}
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 ${
        isModelOpen ? "block" : "hidden"
      }`}
    >
      <div
        style={{ padding: "24px" }}
        className="bg-white rounded-md shadow-lg w-96 max-w-md z-50"
      >
        <h2
          style={{ marginBottom: "16px" }}
          className="text-lg font-medium mb-4"
        >
          Post A Review
        </h2>
        <div style={{ marginBottom: "16px" }} className="flex items-center">
          {/* ratting */}
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              onClick={() => handleRatting(star)}
              key={star}
              className=" text-lg text-yellow-500 cursor-pointer"
            >
              {rating >= star ? (
                <i className="ri-star-fill"></i>
              ) : (
                <i className="ri-star-line"></i>
              )}
            </span>
          ))}
        </div>
        {/* <div>
          <textarea
            style={{ padding: "12px", marginBottom: "16px" }}
            className="w-full border rounded-md border-gray-200"
            placeholder="Write your review here"
          ></textarea>
        </div>
        <div>
          <button
            style={{ padding: "12px 24px" }}
            className="bg-primary text-white rounded-md"
          >
            Post Review
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default PostAReview;
