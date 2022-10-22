import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import product from '../Model/ProductModel.js';
import { isAdmin, isAuth } from '../utils.js';

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
    const products = await product.find({});
    res.send(products);
})
)

productRouter.get('/seed', expressAsyncHandler(async (req, res) => {
    // await product.deleteMany();
    const createdProducts = await product.insertMany(data.products);
    res.send({
        createdProducts
    })
})
);

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    const productDetail = await product.findById(req.params.id);
    if (productDetail) {
        res.send(productDetail);
    }
    else {
        res.status(404).send({ message: "Product Not Found" })
    }
})
);

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productCreate = new product({
        name: "Sample name" + Date.now(),
        category: "Sample Category",
        image: "/images/p1.jpg",
        price: "0",
        brand: "Sample Brand",
        rating: "0",
        numReviews: "0",
        description: "Sample description",
        countInStock: 0
    });
    const productCreated = await productCreate.save();
    res.send({ message: "product created successfully", product: productCreated })
}));

productRouter.put(`/:id`, isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const productId = req.params.id;
    const productUpdate = await product.findById(productId);
    if (productUpdate) {
        productUpdate.name = req.body.name;
        productUpdate.price = req.body.price;
        productUpdate.image = req.body.image;
        productUpdate.category = req.body.category;
        productUpdate.brand = req.body.brand;
        productUpdate.countInStock = req.body.countInStock;
        productUpdate.description = req.body.description;
        const updatedProduct = await productUpdate.save();
        res.send({ message: 'Product Updated Successfully', 'product': updatedProduct })
    } else {
        res.status(404).send({ message: "Product not found" })
    }

}));

productRouter.delete(`/:id`, isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
    const deleteProduct = product.findById(req.params.id);
    if (deleteProduct) {
        const deletedProduct = await deleteProduct.deleteOne();
        res.send({ 'message': 'Deleted Successfully', product: deletedProduct });
    } else {
        res.status(404).send({ 'message': "Product not found" });
    }
}));

export default productRouter;