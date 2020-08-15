import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import RoleRepository from '../repositories/RoleRepository';

class RoleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const roleRepository = getCustomRepository(RoleRepository);

    const { name, description } = request.body;

    const roleExists = await roleRepository.findOne({ name });

    if (roleExists) {
      return response
        .status(400)
        .json({ error: `The role "${name}" already exists.` });
    }

    const role = roleRepository.create({
      name,
      description,
    });

    await roleRepository.save(role);

    return response.json(role);
  }
}

export default new RoleController();
