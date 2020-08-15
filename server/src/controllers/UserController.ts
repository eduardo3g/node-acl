import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

class UserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const userRepository = getCustomRepository(UserRepository);

    const { name, username, password } = request.body;

    const userExists = await userRepository.findOne({ username });

    if (userExists) {
      return response
        .status(400)
        .json({ message: `The username "${username}" already exists.` });
    }

    const user = userRepository.create({
      name,
      username,
      password,
    });

    await userRepository.save(user);

    return response.status(201).json(user);
  }
}

export default UserController;
