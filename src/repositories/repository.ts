export interface Repository<T, K> {
  findAll(): Promise<T[]>;
  find(id: K): Promise<T | null>;
  create(entity: T): Promise<T>;
  save(entity: T): Promise<T>;
  update(id: K, entity: Partial<T>): Promise<T>;
  delete(id: K): Promise<T>;
}
