import { Router } from 'express';
const router = Router();
import CartManager from '../manager/cartManager.js';
import ProductManager from '../manager/productManager.js';

router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cart = CartManager.getById(cid);
    if (cart) {
        res.json(cart.products);
    } else {
        res.status(404).json({ error: 'No se encontró el carrito' });
    }
});

router.post('/', (req, res) => {
    const newCart = CartManager.create();
    res.status(201).json(newCart);
});

router.post('/:cid/product/:pid', (req, res) => {
    const { cid, pid } = req.params;
    const product = ProductManager.getById(pid);

    if (!product) {
        return res.status(404).json({ error: 'No se encontro el producto' });
    }

    const updatedCart = CartManager.addProductToCart(cid, pid);

    if (updatedCart) {
        res.status(200).json(updatedCart);
    } else {
        res.status(404).json({ error: 'No se encontró el carrito' });
    }
});

export default router;