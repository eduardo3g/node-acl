import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import ProductRepository from '../repositories/ProductRepository';

class ProductController {
  public async create(request: Request, response: Response): Promise<Response> {
    const productRepository = getCustomRepository(ProductRepository);

    const { name, description } = request.body;

    const productExists = await productRepository.findOne({ name });

    if (productExists) {
      return response
        .status(400)
        .json({ error: `The product "${name}" already exists.` });
    }

    const product = productRepository.create({
      name,
      description,
    });

    await productRepository.save(product);

    return response.json(product);
  }

  public async index(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const products = await productRepository.find();

    return response.json(products);
  }

  public async show(request: Request, response: Response) {
    const productRepository = getCustomRepository(ProductRepository);

    const { id } = request.params;

    const product = await productRepository.findOne(id);

    return response.json(product);
  }
}

export default new ProductController();
