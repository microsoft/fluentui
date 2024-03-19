// Why is this manual type declaration needed?
// - modules(projects) written in TS not having enabled `checkJS:true` wont infer types from .js files, thus the API will have `any` type.
// This errors in strict ts check mode.

export declare function getDependencies(packageName: string): Promise<{
  dependencies: Dependency[];
  devDependencies: Dependency[];
  all: Dependency[];
  projectGraph: import('@nx/devkit').ProjectGraph;
  getProjectPackageJsonInfo: (
    project: string,
    projectGraph: import('@nx/devkit').ProjectGraph,
  ) => import('./types').PackageJson & { absoluteRootPath: string };
}>;

type Dependency = {
  name: string;
  isTopLevel: boolean;
  dependencyType: 'dependencies' | 'devDependencies' | 'optionalDependencies' | null;
};
