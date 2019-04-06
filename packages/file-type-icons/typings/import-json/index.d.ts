declare module '*.json' {
  // Disabling ts-lint because this is supposed to be able to load any json file
  // tslint:disable-next-line
  const value: any;
  export default value;
}