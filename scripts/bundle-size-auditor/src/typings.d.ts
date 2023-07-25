declare module 'parallel-webpack' {
  export async function run(configPath: string, options: {}, doneCallback?: () => void): void;
}
