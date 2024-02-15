import { Injectable } from '@nestjs/common';
import { generate } from 'generate-password';
import { UserRepository } from 'repository';
import { User } from 'model';
import { AuthService } from 'service/auth';
import { CreateUserRequest, RegisterUserRequest } from 'interface/apiRequest';
import { ApplicationError } from 'shared/error';
import { UserPaginationRequest } from 'shared/value_object/pagination_request';
import { PaginationResponse } from 'shared/value_object/pagination_response';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
  ) {}

  public async getById(id: number): Promise<User> {
    const user = await this.userRepository.getById(id);

    if (!user) {
      throw new UserNotFoundError();
    }

    return user;
  }

  public async getByEmail(email: string): Promise<User> {
    const user = await this.userRepository.getByEmail(email);

    if (!user) {
      throw new UserNotFoundByEmailError();
    }

    return user;
  }

  public async ensureUserNotExistByEmail(email: string): Promise<void> {
    const userExists = await this.userRepository.checkUserExistsByEmail(email);

    if (userExists) {
      throw new UserAlreadyExistsError();
    }
  }

  public async registerUser(body: RegisterUserRequest): Promise<User> {
    let user = new User(
      body.email,
      body.firstName,
      body.lastName,
      body.password,
    );

    await this.ensureUserNotExistByEmail(user.email);

    user = await this.userRepository.insertUser(user);

    return user;
  }

  public generatePassword(): string {
    return generate({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
      strict: true,
    });
  }

  public async createUser(body: CreateUserRequest): Promise<User> {
    await this.ensureUserNotExistByEmail(body.email);

    let user = new User(
      body.email,
      body.firstName,
      body.lastName,
      body.password,
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
}

export class UserNotFoundError extends ApplicationError {}
export class UserAlreadyExistsError extends ApplicationError {}
export class UserNotFoundByEmailError extends ApplicationError {}
