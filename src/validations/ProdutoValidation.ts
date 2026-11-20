import { BadRequestError } from '../errors/HttpError';
import { parsePositiveInt } from './common';
import { ListProdutosFilters, ListProdutosInput } from './interfaces/ProdutoInput';

const isEmpty = (value: unknown): boolean => value === undefined || value === '';

export class ProdutoValidation {
  public validateId(id: unknown): number {
    return parsePositiveInt(id, 'Produto inválido');
  }

  public validateListFilters({
    categoriaId,
    fornecedorId,
    ativo,
  }: ListProdutosInput): ListProdutosFilters {
    const filters: ListProdutosFilters = {};

    if (!isEmpty(categoriaId)) {
      filters.categoriaId = parsePositiveInt(categoriaId, 'Categoria inválida');
    }
    if (!isEmpty(fornecedorId)) {
      filters.fornecedorId = parsePositiveInt(fornecedorId, 'Fornecedor inválido');
    }
    if (!isEmpty(ativo)) filters.ativo = this.ativo(ativo);

    return filters;
  }

  private ativo(value: unknown): boolean {
    if (value === 'true') return true;
    if (value === 'false') return false;
    throw new BadRequestError('Filtro ativo deve ser true ou false');
  }
}
