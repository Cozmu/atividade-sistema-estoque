import { col, Includeable, ModelStatic, Op } from 'sequelize';
import Produto from '../database/models/Produto.model';
import { NotFoundError } from '../errors/HttpError';
import { ProdutoValidation } from '../validations/ProdutoValidation';
import { ListProdutosInput } from '../validations/interfaces/ProdutoInput';

const INCLUDE_RESUMO: Includeable[] = [
  { association: 'categoria', attributes: ['id', 'nome'] },
  { association: 'fornecedor', attributes: ['id', 'nome'] },
];

export class ProdutoService {
  constructor(
    private _Produto: ModelStatic<Produto>,
    private _produtoValidation: ProdutoValidation,
  ) {}

  public async list(query: ListProdutosInput): Promise<Produto[]> {
    const filters = this._produtoValidation.validateListFilters(query);

    return this._Produto.findAll({
      where: { ...filters },
      include: INCLUDE_RESUMO,
      order: [['nome', 'ASC']],
    });
  }

  public async listEstoqueBaixo(): Promise<Produto[]> {
    return this._Produto.findAll({
      where: { ativo: true, qntAtual: { [Op.lte]: col('Produto.estoque_minimo') } },
      include: INCLUDE_RESUMO,
      order: [['nome', 'ASC']],
    });
  }

  public async findById(id: unknown): Promise<Produto> {
    const produtoId = this._produtoValidation.validateId(id);
    const produto = await this._Produto.findByPk(produtoId, {
      include: ['categoria', 'fornecedor'],
    });
    if (!produto) throw new NotFoundError('Produto não encontrado');

    return produto;
  }
}
