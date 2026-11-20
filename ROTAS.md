# Rotas da API de Estoque

Sem autenticação. Erros respondem `{ "message": "..." }`.

Legenda: ✅ feita · ⬜ pendente

## Categorias

| Status | Método | Rota | O que faz |
|---|---|---|---|
| ✅ | GET | `/categorias` | Lista todas, ordenadas por nome |
| ✅ | GET | `/categorias/:id` | Busca uma (400 id inválido, 404 não encontrada) |
| ✅ | POST | `/categorias` | Cria. Body: `nome` (obrigatório, até 120), `descricao` (opcional, até 255) |
| ✅ | PUT | `/categorias/:id` | Substitui os dados (mesmo body do POST; sem `descricao` vira `null`) |
| ✅ | DELETE | `/categorias/:id` | Remove, responde 204 (409 se tiver produtos vinculados) |

## Fornecedores

| Status | Método | Rota | O que faz |
|---|---|---|---|
| ✅ | GET | `/fornecedores` | Lista todos, ordenados por nome |
| ✅ | GET | `/fornecedores/:id` | Busca um (400 id inválido, 404 não encontrado) |
| ✅ | POST | `/fornecedores` | Cria. Body: `nome` (até 120), `cnpj` (14 dígitos, com ou sem máscara), `telefone` (até 20), `email` (até 80). Todos obrigatórios. 409 se o CNPJ já existir |
| ✅ | PUT | `/fornecedores/:id` | Substitui os dados (mesmo body do POST; 409 se o CNPJ for de outro fornecedor) |
| ✅ | DELETE | `/fornecedores/:id` | Remove, responde 204 (409 se tiver produtos vinculados) |

## Produtos

| Status | Método | Rota | O que faz |
|---|---|---|---|
| ✅ | GET | `/produtos` | Lista com `categoria` e `fornecedor` resumidos (id, nome). Filtros combináveis: `?categoriaId=`, `?fornecedorId=`, `?ativo=true\|false` |
| ✅ | GET | `/produtos/estoque-baixo` | Produtos **ativos** com `qntAtual <= estoqueMinimo` |
| ✅ | GET | `/produtos/:id` | Detalhe com `categoria` e `fornecedor` completos |
| ⬜ | GET | `/produtos/:id/movimentacoes` | Histórico de movimentações do produto |
| ⬜ | POST | `/produtos` | Cria (`qntAtual` começa em 0; 409 se o código já existir) |
| ⬜ | PUT | `/produtos/:id` | Edita dados cadastrais (não altera `qntAtual`) |
| ⬜ | PATCH | `/produtos/:id/ativo` | Ativa/desativa (no lugar do DELETE) |

## Movimentações

| Status | Método | Rota | O que faz |
|---|---|---|---|
| ⬜ | GET | `/movimentacoes` | Lista. Filtros: `?produtoId=`, `?tipo=`, `?dataInicio=&dataFim=` |
| ⬜ | GET | `/movimentacoes/:id` | Detalhe com o `produto` |
| ⬜ | POST | `/movimentacoes` | Registra e atualiza `qntAtual` na mesma transaction |

Sem PUT/DELETE: movimentação é histórico; erro se corrige com um AJUSTE.

### Regras do POST `/movimentacoes`

| Tipo | Efeito em `qntAtual` |
|---|---|
| `ENTRADA` | soma `quantidade` |
| `SAIDA` | subtrai `quantidade` (400/409 se ficar negativo) |
| `AJUSTE` | passa a ser `quantidade` (contagem de inventário) |

## Ordem de rotas no router de produtos

`/produtos/estoque-baixo` precisa ser registrada **antes** de `/produtos/:id`, senão o Express trata `estoque-baixo` como `:id`.
