export interface Repository<T, K> {
  findAll(): Promise<K[]>;
  find(id: string): Promise<K | null>;
  create(entity: T): Promise<K>;
  save(entity: T): Promise<K>;
  update(id: string, entity: Partial<T>): Promise<K>;
  delete(id: string): Promise<K>;
}
