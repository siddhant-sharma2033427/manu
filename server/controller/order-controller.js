import Orders from '../models/Orders.js';

export const placeOrder = async (req, res) => {
    try {
        const { userId, productId, quantityNo } = req.body;
        const exists = Orders.find({user:userId});
        if(!exists){
        const newOrder = Orders.create({
            user: userId,
            products: {
                product: productId,
                quantity: quantityNo
            }
        });
        return res.status(201).json(newOrder);
    }else{
        return res.status(200).json({"msg":"user already exists"});
    }
    } catch (error) {
        return res.status(500).json({ msg: 'error while Placing the order placeOrder order-controller' });
    }
}
export const getOrders = async (req, res) => {
    try {

        const orders = await Orders.find({ user: req.params.userId });
        if (orders) {
            return res.json(orders);
        }
        else{
            return res.json({"success":false});
        }
    } catch (error) {
        return res.status(500).json({ msg: 'error while fetching the order getOrders order-controller' });
    }
}

export const deleteOrder = async (req, res) => {
    // https://www.youtube.com/watch?v=N2vaL3Oz--E&t=766s
    try {
        const { userId, _Id } = req.body;
        // const exists = await  Orders.findOne({"products":{$elemMatch:{"product":{$eq:productId}}}})
        // const dele = await Orders.updateOne({"products":{$elemMatch:{"_id":{$eq:productId}}},{$pull:{}}})
        const dele = await Orders.updateOne({ user: userId }, { $pull: { products: { _id: { $eq: _Id } } } })
        return res.status(200).json({ "success": true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'error while fetching the order getOrders order-controller', "error": error });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const { userId, productId, quantityNo } = req.body;
        const result = await Orders.updateOne({ user: userId }, { $push: { products: { product: productId, quantity: quantityNo } } })
        if (result === 0) {
            return res.status(500).json({ "msg": "Product not found", "success": true });
        }
        return res.status(200).json({ "success": true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'error while fetching the order getOrders order-controller', "error": error });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { userId, Id, newstatus } = req.body;
        const result = await Orders.updateOne(
            { user: userId, 'products._id': Id },
            { $set: { 'products.$[element].status': newstatus } },
            { arrayFilters: [{ 'element._id': Id }] }
        );
        if (result === 0) {
            return res.status(500).json({ "msg": "Product not found", "success": false });
        }
        return res.status(200).json({ "success": true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'error while fetching the order getOrders order-controller', "error": error });
    }
}