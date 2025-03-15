import { useState } from "react";

const UploadImages = ({ name, id, value, placeholder, setImage }) => {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const uploadImage = async() => {};
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        Upload Image
      </label>
      <input
        type="file"
        name={name}
        id={id}
        onChange={uploadImage}
        className="add-product-InputCSS"
      />
      {
        loading && (
            <div style={{marginTop:"8px"}} className="text-sm text-blue-600">Product loading...</div>
        )
      }
      {
        url && (
            <div style={{marginTop:"8px"}} className="text-sm text-gray-600">
                <p>Image Uploaded successfully!</p>
                <img src={url} alt="upload-imge" />
            </div>
        )
      }
    </div>
  );
};

export default UploadImages;
