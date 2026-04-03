import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { axiosInstance } from "../config/axiosInstance";

const FIXED_USER_ID = "693c09d6af8e541dc2e714c4";

const CreateProduct = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      productName: "",
      description: "",
      currency: "INR",
      amount: "",
      category: "KIDS",
      sizes: [],
      colors: [""],
      images: [],
      user_id: FIXED_USER_ID,
    },
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handlePreview = (files) => {
    if (files && files.length > 0) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewImages(fileArray);
    } else {
      setPreviewImages([]);
    }
  };

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("description", data.description);
      formData.append("currency", data.currency);
      formData.append("amount", data.amount);
      formData.append("category", data.category);
      formData.append("user_id", FIXED_USER_ID);

      // Sizes
      if (data.sizes) {
        data.sizes.forEach((size) => formData.append("sizes", size));
      }

      // Colors
      if (data.colors && data.colors.length > 0) {
        const colorsArray = data.colors[0]
          .split(",")
          .map((c) => c.trim())
          .filter(Boolean);
        colorsArray.forEach((color) => formData.append("colors", color));
      }

      // Images
      const files = data.images;
      if (!files || files.length === 0) {
        alert("Please select images");
        return;
      }
      for (let i = 0; i < files.length; i++) {
        formData.append("images", files[i]);
      }

      const res = await axiosInstance.post("product/create", formData, {
        withCredentials: true,
      });

      if (res) {
        alert("Product created successfully");
        reset();
        setPreviewImages([]);
      }
    } catch (error) {
      console.log("Error creating product:", error);
      alert("Failed to create product. Check console for details.");
    }
  };

  const selectedSizes = watch("sizes", []);

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-12 px-4">
      <div className="w-full max-w-5xl bg-white shadow-xl rounded-xl p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-wide">Create New Product</h1>
          <p className="text-gray-500 text-sm mt-1">
            Add a new product to your store catalogue
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

          {/* PRODUCT DETAILS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Product Information</h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Product Name</label>
                <input
                  type="text"
                  {...register("productName", { required: true })}
                  className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                  placeholder="Oversized Hoodie"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Category</label>
                <select
                  {...register("category", { required: true })}
                  className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="MENS">Mens</option>
                  <option value="WOMENS">Womens</option>
                  <option value="KIDS">Kids</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <label className="text-sm font-medium">Description</label>
              <textarea
                rows={4}
                {...register("description", { required: true })}
                className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                placeholder="Write product details..."
              />
            </div>
          </div>

          {/* PRICE */}
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Pricing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium">Currency</label>
                <select
                  {...register("currency")}
                  className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Price</label>
                <input
                  type="number"
                  {...register("amount", { required: true })}
                  className="mt-1 w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
                  placeholder="999"
                />
              </div>
            </div>
          </div>

          {/* SIZES */}
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Sizes</h2>
            <div className="flex gap-6">
              {["S","M","L","XL","XXL"].map((size) => (
                <label key={size} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    value={size}
                    {...register("sizes")}
                    className="accent-black"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* COLORS */}
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Colors</h2>
            <input
              type="text"
              {...register("colors.0", { required: true })}
              placeholder="red, black, blue"
              className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-black outline-none"
            />
          </div>

          {/* IMAGES */}
          <div>
            <h2 className="text-lg font-semibold mb-4 border-b pb-2">Product Images</h2>

            <label className="border-2 border-dashed rounded-lg flex flex-col items-center justify-center py-10 cursor-pointer hover:bg-gray-50 transition">
                {previewImages.length > 0 ? (
                <div className="text-sm text-gray-700">
                  {previewImages.join(", ")}
                </div>
              ) : (
                <p className="text-sm text-gray-500">Upload product images</p>
              )}
  
            
              <input
                type="file"
                multiple
                {...register("images", {
                  required: true,
                  onChange: (e) => handlePreview(e.target.files),
                })}
                className="hidden"
              />
            </label>

            {/* Preview Images */}
            {/* {previewImages.length > 0 && (
              <div className="mt-4 flex gap-4 flex-wrap">
                {previewImages.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`preview ${index}`}
                    className="w-24 h-24 object-cover rounded-lg border"
                  />
                ))}
              </div>
            )} */}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition font-medium"
          >
            {isSubmitting ? "Creating Product..." : "Create Product"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateProduct;