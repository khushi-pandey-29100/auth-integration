import { axiosInstance } from "../config/axiosInstance";


export const fetchProductsByCategory = async (category) => {
const { data } = await axiosInstance.get("/product/all", {
params: category ? { category } : {},
});
return data.products;
};