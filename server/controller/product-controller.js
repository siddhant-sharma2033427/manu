import Products from '../models/Products.js'

export const getAllProducts = async (req,res) =>{
    try{
        const products = await Products.find();
        return res.json(products)
    }catch(error){
        return  res.status(500).json({ msg: 'error occures user controller addUser',success:false })
    }
}

export const addProduct = async (req,res)=>{
    try {
        const exists = await Products.findOne({productName:req.body.productName});
        if(exists){
            return res.status(200).json({ msg: 'Product already exists' });
        }
        const newProduct = await  Products.create({
            productName:req.body.productName,
            image:req.body.image
        })
        res.status(200).json({"product":newProduct});
    } catch (error) {
        return  res.status(500).json({ msg: 'error occures user controller addUser',success:false })
    }
}