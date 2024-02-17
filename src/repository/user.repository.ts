import { EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';

import { UserEntity } from 'entity/user.entity';
import { User } from 'model';
import { Result } from 'shared/util/util';
import { UserPaginationRequest } from 'shared/value_object/pagination_request';
import {
  applyFilters,
  applyPaginationParams,
  ListWithTotal,
} from 'shared/util/typeorm';
import { UpdateUserRequest } from 'interface/apiRequest';

@Injectable()
export class UserRepository {
  constructor(private manager: EntityManager) {}

  public async getAllUsers(
    paginationRequest: UserPaginationRequest,
  ): Promise<ListWithTotal<User>> {
    let userEntitiesQuery = this.manager.createQueryBuilder(UserEntity, 'user');
    userEntitiesQuery = applyFilters(
      userEntitiesQuery,
      paginationRequest.filters,
    );

    const total = await userEntitiesQuery.getCount();

    userEntitiesQuery = applyPaginationParams(
      userEntitiesQuery,
      paginationRequest,
    );
    const userEntities = await userEntitiesQuery.getMany();

    return {
      list: userEntities.map((userEntity) =>
        this.convertToModel(userEntity),
      ) as Array<User>,
      total,
    };
  }

  public async getById(id: number): Promise<Result<User>> {
    const userEntity = await this.manager
      .createQueryBuilder(UserEntity, 'user')
      .where('user.id = :id', { id })
      .getOne();

    return this.convertToModel(userEntity);
  }

  public async update(id: number, body: UpdateUserRequest): Promise<User> {
    await this.manager
      .createQueryBuilder()
      .update(UserEntity)
      .set({
        firstName: body.firstName,
        lastName: body.lastName,
      })
      .where({ id })
      .execute();

    return (await this.getById(id)) as User;
  }

  public async delete(userId: number): Promise<void> {
    await this.manager
      .createQueryBuilder()
      .delete()
      .from(UserEntity, 'user')
      .where('id = :userId', { userId })
      .execute();
  }

  public async getByEmail(email: string): Promise<Result<User>> {
    const userEntity = await this.manager
      .createQueryBuilder(UserEntity, 'user')
      .where('user.email = :email', { email })
      .getOne();

    return this.convertToModel(userEntity);
  }

  public async checkUserExistsByEmail(email: string): Promise<boolean> {
    const count = await this.manager
      .createQueryBuilder(UserEntity, 'user')
      .where({ email })
      .getCount();

    return count > 0;
  }

  public async insertUser(user: User): Promise<User> {
    const { raw } = await this.manager
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values({
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        password: user.password,
      })
      .execute();

    return (await this.getById(raw[0].id)) as User;
  }

  public convertToModel(userEntity?: UserEntity): Result<User> {
    if (userEntity) {
      return new User(
        userEntity.email,
        userEntity.firstName,
        userEntity.lastName,
        userEntity.password,
        userEntity.id,
      );
    }
  }
}
