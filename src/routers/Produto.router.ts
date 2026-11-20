import { Router } from 'express';
import { ProdutoController } from '../controllers/Produto.controller';
import { ProdutoService } from '../services/Produto.service';
import Produto from '../database/models/Produto.model';
import { ProdutoValidation } from '../validations/ProdutoValidation';

const produtoRouter = Router();

const produtoService = new ProdutoService(Produto, new ProdutoValidation());
const produtoController = new ProdutoController(produtoService);

produtoRouter.get('/produtos', produtoController.list);
produtoRouter.get('/produtos/estoque-baixo', produtoController.listEstoqueBaixo);
produtoRouter.get('/produtos/:id', produtoController.findById);

export default produtoRouter;
