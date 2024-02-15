import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';
import { Filter } from 'shared/value_object/pagination_request';

export function applyFilters<T extends ObjectLiteral>(
  query: SelectQueryBuilder<T>,
  filters: Array<Filter<string>>,
): SelectQueryBuilder<T> {
  return filters.reduce((query, filter, i) => {
    return i === 0
      ? query.where(`${filter.key} = :value`, { value: filter.value })
      : query.andWhere(`${filter.key} = :value`, { value: filter.value });
  }, query);
}
