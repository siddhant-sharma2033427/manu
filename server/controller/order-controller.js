import Orders from '../models/Orders.js';

export const placeOrder = async (req, res) => {
    try {
        // console.log(data);
        const { userId, productId, quantityNo, TotalPrice } = req.body;
        const newOrder = Orders.create({
            user: userId,
            products: {
                product: productId,
                quantity: quantityNo,
                totalPrice: TotalPrice,
            }
        });
        return res.status(201).json({"newOrder":newOrder,success:true});

    } catch (error) {
        // console.log(error);
        return res.status(500).json({ msg: 'error while Placing the order placeOrder order-controller', "error": error,success:false });
    }
}
export const getOrders = async (req, res) => {
    try {

        const orders = await Orders.find({ user: req.params.userId });
        if (orders) {
            return res.json(orders);
        }
        else {
            return res.json({ "success": false });
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
        const { userId, productId, quantityNo,TotalPrice } = req.body;
        const result = await Orders.updateOne({ user: userId }, { $push: { products: { product: productId, quantity: quantityNo,totalPrice:TotalPrice } } })
        if (result === 0) {
            return res.status(500).json({ "msg": "Product not found", "success": false });
        }
        return res.status(200).json({ "success": true });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'error while fetching the order getOrders order-controller', "error": error , "success": false});
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

export const findUserOrders = async (req, res) => {
    try {
        const userId = req.body.userId;
        // console.log(req.body);
        // Find user in the Orders schema based on userId
        const userOrders = await Orders.findOne({ user: userId });

        if (userOrders) {
            // User found, return the user orders
            return res.status(200).json({ message: 'User found', data: userOrders,success:true });
        } else {
            // User not found
            return res.status(404).json({ message: 'User not found',success:false });
        }
    } catch (error) {
        console.error('Error finding user orders:', error);
        return res.status(500).json({ message: 'Internal Server Error',success:false });
    }
}