import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';

/* Rotas Apps */
import cliente from './routes/cliente.js';
import general from './routes/general.js';
import gerenciamento from './routes/gerenciamento.js';
import vendas from './routes/vendas.js';

/* Configuração */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* Rotas */
app.use('/cliente', cliente);
app.use('/general', general);
app.use('/gerenciamento', gerenciamento);
app.use('/vendas', vendas);

/* Mongoose Setup */
const PORT = process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console.log(`Servidor rodando na porta: ${PORT}`));
}).catch((error) => console.log(`Error: ${error}`));