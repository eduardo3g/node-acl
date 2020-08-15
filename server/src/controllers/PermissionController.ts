import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import PermissionRepository from '../repositories/PermissionRepository';

class PermissionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const permissionRepository = getCustomRepository(PermissionRepository);

    const { name, description } = request.body;

    const permissionExists = await permissionRepository.findOne({ name });

    if (permissionExists) {
      return response
        .status(400)
        .json({ error: `The permission "${name}" already exists.` });
    }

    const permission = permissionRepository.create({
      name,
      description,
    });

    await permissionRepository.save(permission);

    return response.json(permission);
  }
}

export default new PermissionController();
