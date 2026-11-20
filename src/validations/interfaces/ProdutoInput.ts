export interface ListProdutosInput {
  categoriaId?: unknown;
  fornecedorId?: unknown;
  ativo?: unknown;
}

export interface ListProdutosFilters {
  categoriaId?: number;
  fornecedorId?: number;
  ativo?: boolean;
}
