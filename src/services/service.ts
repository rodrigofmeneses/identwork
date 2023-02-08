export interface Service<T, K> {
  findAll(): Promise<T[]>;
  find(id: K): Promise<T | null>;
  create(entity: T): Promise<T>;
  update(id: K, entity: T): Promise<T>;
  delete(id: K): Promise<T>;
}
