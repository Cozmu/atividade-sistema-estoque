import { Request, Response } from 'express';
import { CategoriaService } from '../services/Categoria.service';

export class CategoriaController {
  constructor(private readonly _categoriaService: CategoriaService) {}

  public list = async (_req: Request, res: Response): Promise<void> => {
    const result = await this._categoriaService.list();
    res.status(200).json(result);
  };

  public findById = async (req: Request<{ id: string }>, res: Response): Promise<void> => {
    const result = await this._categoriaService.findById(req.params.id);
    res.status(200).json(result);
  };
}
