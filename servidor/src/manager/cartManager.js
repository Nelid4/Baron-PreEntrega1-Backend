import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const cartsFilePath = join(__dirname, '../data/carts.json');

const readCarts = () => {
    const data = readFileSync(cartsFilePath, 'utf-8');
    return JSON.parse(data);
};

const writeCarts = (carts) => {
    writeFileSync(cartsFilePath, JSON.stringify(carts, null, 2));
};

class CartManager {

    static getById(id) {
        const carts = readCarts();
        return carts.find(c => c.id === id);
    }

    static create() {
        const carts = readCarts();
        const newCart = {
            id: (carts.length ? parseInt(carts[carts.length - 1].id) + 1 : 1).toString(),
            products: []
        };
        carts.push(newCart);
        writeCarts(carts);
        return newCart;
    }

    static addProductToCart(cartId, productId) {
        const carts = readCarts();
        const cart = carts.find(c => c.id === cartId);

        if (!cart) {
            return null;
        }

        const cartProduct = cart.products.find(p => p.product === productId);

        if (cartProduct) {
            cartProduct.quantity += 1;
        } else {
            cart.products.push({ product: productId, quantity: 1 });
        }

        writeCarts(carts);
        return cart;
    }
}

export default CartManager;
