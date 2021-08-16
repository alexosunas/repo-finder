export default interface IService<T>{
    put(item: T): Promise<Record<string, any>>;
    get(item: Record<string, any>): Promise<T>;
    query(V: Record<string, any>, N:Record<string, any>, K:string): Promise<Array<T>>;
}