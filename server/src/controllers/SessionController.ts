import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import UserRepository from '../repositories/UserRepository';

class SessionController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { username, password } = request.body;

    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(
      { username },
      { relations: ['roles'] },
    );

    if (!user) {
      return response
        .status(400)
        .json({ error: `THe user "${username}" was not found.` });
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      return response
        .status(400)
        .json({ error: 'Incorrect password or username.' });
    }

    const roles = user.roles.map(role => role.name);

    const token = sign({ roles }, 'e5036c188394f4f81a661fb325f21860', {
      subject: user.id,
      expiresIn: '1d',
    });

    return response.json({
      token,
      user,
    });
  }
}

export default new SessionController();
