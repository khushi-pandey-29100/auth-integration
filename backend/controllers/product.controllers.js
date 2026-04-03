import { ProductModel } from "../models/product.model.js";
import { UserModel } from "../models/user.model.js";
import { sendFileToIK } from "../services/storage.js";


export const createProductController = async (req, res) => {
    try {
        let { productName, currency, amount, category, description, sizes, colors, images } = req.body;

        if (!productName || !currency || !amount || !category || !description || !colors || !sizes) {
            return res.status(400).json({
                message: "All fields are required",
            })
        }
        if(!req.files){
            return res.status(404).json({
                message:"images are required",
            })
        }
        let immageUrls = await Promise.all(
            req.files.map(
                async (elem)=> await sendFileToIK(elem.buffer,elem.originalname)
            )
        )
        let newProduct = await ProductModel.create({
            productName,
            price: {
                amount,
                currency,
            },
            category,
            description,
            sizes,
            colors,
            images:immageUrls.map((elem)=>elem.url),
            user_id: req.user._id,
        });

        if (!newProduct) {
            return res.status(400).json({
                message: "Product creation failed",
                error,
            })
        }

        await UserModel.findByIdAndUpdate(req.user._id,
            {
                $push: { products: newProduct._id }
            });

        return res.status(201).json({
            message: "product created",
            product: newProduct,
        });

    } catch (error) {
        console.log("error in create product", error);
        return res.status(500).json({
            message: "internal server error",
            error
        });
    }
};

export const getAllProductsController = async (req, res) => {
  try {
    const { category } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    const allproducts = await ProductModel.find(filter);

    return res.status(200).json({
      message: "All products fetched",
      products: allproducts,
    });

  } catch (error) {
    console.log("Error in fetching products", error);
    return res.status(500).json({
      message: "Internal server error",
      error,
    });
  }
};

export const getSingleProductController = async(req,res)=>{
    try {
        let product_id =req.params.product_id;

        if(!product_id){
            return res.status(401).json({
                message:"product id is required",
            })
        }

        let product = await ProductModel.findById(product_id);

        if(!product){
            return res.status(404).json({
                message:"product not found",
            })
        }
        return res.status(200).json({
            message:"product fetched successfully",
            product,
        })
    } catch (error) {
        console.log("Error in fetching products", error);
        return res.status(500).json({
            message: "internal server error",
            error,
        });
    }
}

export const updateProductController = async (req,res) =>{
    try {
        let product_id = req.params.product_id;

        if(!product_id){
            return res.status(401).json({
                message:"producct id is required",
            })
        }
        let { productName, currency, amount, category, description, sizes, colors, images } = req.body;

        if (!productName || !currency || !amount || !category || !description || !colors || !images || !sizes) {
            return res.status(401).json({
                message: "All fields are required",
            })
        }

        let updatedProduct = await ProductModel.findByIdAndUpdate(product_id,{
            productName,
            price: {
                amount,
                currency,
            },
            category,
            description,
            sizes,
            colors,
            images,
        },{
            new:true,
        })

        if(!updatedProduct){
            return res.status(400).json({
                message:"product updation failed",
            })
        }

        return res.status(200).json({
            message:"product updated successfully",
            product:updatedProduct,
        })

    } catch (error) {
        console.log("Error in fetching products", error);
        return res.status(500).json({
            message: "internal server error",
            error,
        });
    }
}

export const deleteProductController = async (req,res) =>{
    try {
        let product_id = req.params.product_id;
    
        if(!product_id){
            return res.status(401).json({
                message:"product id is required",
            })
        }
        let deletedProduct = await ProductModel.findByIdAndDelete(product_id);

        if(!deletedProduct){
            return res.status(400).json({
                message:"product deletion failed",
            })
        }
        return res.status(200).json({
            message:"product deleted successfully",
        })
    } catch (error) {
        console.log("error in single product", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}