export function getEnv(name: string): string {
  const val = process.env[name];
  if (!val) {
    throw Error(`${name} env var not set`);
  }
  return val;
}
