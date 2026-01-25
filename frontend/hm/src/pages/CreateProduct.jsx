import React from "react";
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
      images: [""],
      user_id: FIXED_USER_ID,
    },
  });

  const onSubmit = async (data) => {
    console.log("form ka data---?", data)
    try {
      let res = await axiosInstance.post("product/create", data , {
        withCredentials: true,
      });
      if(res){
        alert('product created')
        reset()
      }
    } catch (error) {
      console.log("error in cp api->", error);
    }
  };

  const selectedSizes = watch("sizes", []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-start justify-center py-10">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create Product
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Product name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Product Name
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter product name"
              {...register("productName", {
                required: "Product name is required",
              })}
            />
            {errors.productName && (
              <p className="mt-1 text-sm text-red-500">
                {errors.productName.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows={4}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your product"
              {...register("description", {
                required: "Description is required",
              })}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price (nested object) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Currency
              </label>
              <select
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register("currency", {
                  required: "Currency is required",
                })}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
              {errors.price?.currency && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.price.currency.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter price"
                {...register("amount", {
                  required: "Price amount is required",
                  min: { value: 0, message: "Price must be positive" },
                })}
              />
              {errors.price?.amount && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.price.amount.message}
                </p>
              )}
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register("category", {
                required: "Category is required",
              })}
            >
              <option value="MENS">MENS</option>
              <option value="WOMENS">WOMENS</option>
              <option value="KIDS">KIDS</option>
            </select>
            {errors.category && (
              <p className="mt-1 text-sm text-red-500">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Sizes (enum array) */}
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">
              Sizes
            </span>
            <div className="grid grid-cols-3 gap-2">
              {[ "S", "M", "L", "XL", "XXL"].map((size) => (
                <label
                  key={size}
                  className="flex items-center space-x-2 text-sm"
                >
                  <input
                    type="checkbox"
                    value={size}
                    className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    {...register("sizes")}
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
            {errors.sizes && (
              <p className="mt-1 text-sm text-red-500">
                Select at least one size
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              Selected: {selectedSizes?.join(", ") || "None"}
            </p>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Colors (comma separated)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. red, blue, black"
              {...register("colors.0", {
                required: "At least one color is required",
              })}
              onBlur={(e) => {
                // Split comma separated colors into array for submit
                const value = e.target.value;
                const colors = value
                  .split(",")
                  .map((c) => c.trim())
                  .filter(Boolean);
                // keep first as string display; actual array created in onSubmit
              }}
            />
            {errors.colors?.[0] && (
              <p className="mt-1 text-sm text-red-500">
                {errors.colors[0].message}
              </p>
            )}
            <p className="mt-1 text-xs text-gray-500">
              You can also later map this to a tags/chips UI.
            </p>
          </div>

          {/* Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URLs (comma separated)
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g. https://..., https://..."
              {...register("images.0", {
                required: "At least one image URL is required",
              })}
            />
            {errors.images?.[0] && (
              <p className="mt-1 text-sm text-red-500">
                {errors.images[0].message}
              </p>
            )}
          </div>

          {/* Hidden user_id */}
          <input
            type="hidden"
            value={FIXED_USER_ID}
            {...register("user_id", { required: true })}
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          >
            {isSubmitting ? "Creating product..." : "Create Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;