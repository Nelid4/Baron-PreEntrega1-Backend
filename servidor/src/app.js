import express, { json, urlencoded } from 'express';
const app = express();
const PORT = 8080;

app.use(json());
app.use(urlencoded({extended:true}));

// Routes
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const server=app.listen(PORT, () => {
   console.log(`Servidor escuchando en el puerto ${PORT}`);
});