import { ModelStatic } from 'sequelize';
import Categoria from '../database/models/Categoria.model';
import { NotFoundError } from '../errors/HttpError';
import { CategoriaValidation } from '../validations/CategoriaValidation';

export class CategoriaService {
  constructor(
    private _Categoria: ModelStatic<Categoria>,
    private _categoriaValidation: CategoriaValidation,
  ) {}

  public async list(): Promise<Categoria[]> {
    return this._Categoria.findAll({ order: [['nome', 'ASC']] });
  }

  public async findById(id: unknown): Promise<Categoria> {
    const categoriaId = this._categoriaValidation.validateId(id);
    const categoria = await this._Categoria.findByPk(categoriaId);
    if (!categoria) throw new NotFoundError('Categoria não encontrada');

    return categoria;
  }
}
