export interface IPagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

export class IPaginationResult<T> {
  result: T;
  pagination: IPagination;
}
