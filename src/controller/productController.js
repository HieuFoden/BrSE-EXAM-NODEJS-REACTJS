import productService from '../service/productService';

const showProduct = async (req, res) => {

    try {
        // console.log('cookie : ', req.cookies);

        if (req.query.page && req.query.limit) {

            let page = req.query.page;
            let limit = req.query.limit;
            // console.log('>>> check data : page = ', page, ' limit = ', limit);
            let data = await productService.getProductWithPagination(+page, +limit); // bi loi string -> convert ve number
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });
        } else {
            let data = await productService.getAllProducts();
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            });

        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EM: 'error from server', //ERROR MESSAGE
            EC: '-1', //error code
            DT: '' //data
        });
    }
};


const showDetailProduct = async (req, res) => {

    try {
        let id = req.params.id;
        let data = await productService.getDetailProduct(id);
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
    showProduct, showDetailProduct
};