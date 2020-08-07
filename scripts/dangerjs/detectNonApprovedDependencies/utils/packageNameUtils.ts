export const getPackageName = (packageId: string): string => {
  return packageId.match(/^(.+)@[^@]+$/)?.[1] ?? '';
};

export const getPackageVersion = (packageId: string): string => {
  return packageId.match(/@([^@]+)$/)?.[1] ?? '';
};
