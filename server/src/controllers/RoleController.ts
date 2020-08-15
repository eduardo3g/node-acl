import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';

import RoleRepository from '../repositories/RoleRepository';
import PermissionRepository from '../repositories/PermissionRepository';

class RoleController {
  public async create(request: Request, response: Response): Promise<Response> {
    const roleRepository = getCustomRepository(RoleRepository);
    const permissionRepository = getCustomRepository(PermissionRepository);

    const { name, description, permissions } = request.body;

    const roleExists = await roleRepository.findOne({ name });

    if (roleExists) {
      return response
        .status(400)
        .json({ error: `The role "${name}" already exists.` });
    }

    const existingPermissions = await permissionRepository.findByIds(
      permissions,
    );

    const role = roleRepository.create({
      name,
      description,
      permission: existingPermissions,
    });

    await roleRepository.save(role);

    return response.json(role);
  }
}

export default new RoleController();
