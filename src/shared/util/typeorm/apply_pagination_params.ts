import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { PaginationRequest } from 'shared/value_object/pagination_request';

export function applyPaginationParams<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  paginationRequest: PaginationRequest<any>,
): SelectQueryBuilder<T> {
  if (paginationRequest.orderBy) {
    query = query.orderBy(paginationRequest.orderBy, paginationRequest.order);
  }

  const offset = (+paginationRequest.page - 1) * +paginationRequest.rowsPerPage;

  return query.limit(+paginationRequest.rowsPerPage).offset(offset);
}
