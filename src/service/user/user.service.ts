import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserRepository } from 'repository';
import { User } from 'model';
import { RegisterUserRequest } from 'interface/apiRequest';
import { ApplicationError } from 'shared/error';
import { UserPaginationRequest } from 'shared/value_object/pagination_request';
import { PaginationResponse } from 'shared/value_object/pagination_response';
import { Result } from 'shared/util/util';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async getById(id: number): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new UserNotFoundError('User not found');
    }

    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new UserNotFoundByEmailError('User with such email donesn`t exist');
    }

    return user;
  }

  public async ensureUserNotExistByEmail(email: string): Promise<void> {
    const userExists = await this.userRepository.checkUserExistsByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError('User already exist');
    }
  }

  public async registerUser(body: RegisterUserRequest): Promise<User> {
    await this.ensureUserNotExistByEmail(body.email);

    const hashedPassword = await bcrypt.hash(body.password, 10);

    let user = new User(
      body.email,
      body.firstName,
      body.lastName,
      hashedPassword,
    );

    user = await this.userRepository.insertUser(user);

    return user;
  }

  public async getAllUsers(
    paginationRequest: UserPaginationRequest,
  ): Promise<PaginationResponse<User>> {
    const userPaginationResponse =
      await this.userRepository.getAllUsers(paginationRequest);

    return new PaginationResponse<User>(
      paginationRequest.page,
      paginationRequest.rowsPerPage,
      userPaginationResponse.total,
      userPaginationResponse.list,
    );
  }

  public async validateUser(
    email: string,
    pass: string,
  ): Promise<Result<User>> {
    const user = await this.userRepository.getByEmail(email);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return null;
    }

    return user;
  }
}

export class UserNotFoundError extends ApplicationError {}
export class UserAlreadyExistsError extends ApplicationError {}
export class UserNotFoundByEmailError extends ApplicationError {}
