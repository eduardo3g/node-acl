import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';

import UserRepository from '../repositories/UserRepository';
import RoleRepository from '../repositories/RoleRepository';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);
    const roleRepository = getCustomRepository(RoleRepository);

    const { name, username, password, roles } = request.body;

    const userExists = await userRepository.findOne({ username });

    if (userExists) {
      return response
        .status(400)
        .json({ message: `The username "${username}" already exists.` });
    }

    const hashedPassword = await hash(password, 8);

    const existingRoles = await roleRepository.findByIds(roles);

    const user = userRepository.create({
      name,
      username,
      password: hashedPassword,
      roles: existingRoles,
    });

    await userRepository.save(user);

    delete user.password;

    return response.status(201).json(user);
  }
}

export default new UserController();
