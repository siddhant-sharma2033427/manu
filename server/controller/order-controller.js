import Orders from '../models/Orders.js';

export const placeOrder = async (req, res) => {
    try {
        const { userId, quantity,productId } = req.body;
        let ss = [{productId,quantity}]
        console.log(req.body);
        //creating new order
        const newOrder = new Orders({
            user: userId,
            product: [
                {
                    productId:req.body.productId,
                    quantity: quantity,
                    status:"Pending"
                },
            ],
        })
        // const newOrder = Orders.create({
        //     user:userId,
        //     product:{$push:{
        //         {
        //             productId:req.body.productId,
        //             quantity:req.body.quantity,
        //             state:"Pending",
        //         },
        //     },}
        // })
        const savedOrder = await newOrder.save()
        res.status(200).json(savedOrder);
    } catch (error) {
        return res.status(500).json({ msg: 'error while placing order placeOrder order-controller',"error":error });
    }
}

export const getOrders = async (req,res)=>{
    try{

        const orders = await Orders.find({user:req.params.userId});
        if(orders){
            return res.json(orders);
        }
    }catch(error){
        return res.status(500).json({ msg: 'error while fetching the order getOrders order-controller' });
    }
}