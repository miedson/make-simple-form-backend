export interface DatabaseAdapter {
  create<T>(data: T): Promise<void>;
  upsert<T>(
    id: string | number,
    data: Partial<T>,
    options?: object,
  ): Promise<T | null>;
  findById<T>(id: string | number): Promise<T | null>;
}
