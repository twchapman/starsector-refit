declare module 'zustand' {
  function create<T>(fn: (set: any, get: any) => T): <U = T>(selector?: (state: T) => U) => U;
  export default create;
}
