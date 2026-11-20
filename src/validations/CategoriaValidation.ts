import { parsePositiveInt } from './common';

export class CategoriaValidation {
  public validateId(id: unknown): number {
    return parsePositiveInt(id, 'Categoria inválida');
  }
}
