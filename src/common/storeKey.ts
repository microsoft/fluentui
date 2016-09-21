
export interface IStoreKey<T> {
  name: string;
}

export const storeKey = <T>(name: string) => ({ name }) as IStoreKey<T>;
