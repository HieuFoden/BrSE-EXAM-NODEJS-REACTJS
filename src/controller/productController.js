import productService from '../service/productService';

const showProduct = async (req, res) => {


    try {
        let data = await productService.getAllProducts();

        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //ERROR MESSAGE
            EC: '-1', //error code
            DT: '' //data
        });
    }
};

module.exports = {
    showProduct
};
// dev