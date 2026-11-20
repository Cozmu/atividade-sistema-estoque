import { Router } from 'express';
import { CategoriaController } from '../controllers/Categoria.controller';
import { CategoriaService } from '../services/Categoria.service';
import Categoria from '../database/models/Categoria.model';
import { CategoriaValidation } from '../validations/CategoriaValidation';

const categoriaRouter = Router();

const categoriaService = new CategoriaService(Categoria, new CategoriaValidation());
const categoriaController = new CategoriaController(categoriaService);

categoriaRouter.get('/categorias', categoriaController.list);
categoriaRouter.get('/categorias/:id', categoriaController.findById);

export default categoriaRouter;
