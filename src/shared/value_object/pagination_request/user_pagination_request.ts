import { PaginationRequest } from './pagination_request';
import { UserListOrderBy } from 'interface/apiRequest';

export enum UserFilterColumns {}

export class UserPaginationRequest extends PaginationRequest<UserListOrderBy> {
  protected get columnsToFilter() {
    return Object.values(UserFilterColumns);
  }
}
