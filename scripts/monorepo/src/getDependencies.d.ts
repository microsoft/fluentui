// Why is this manual type declaration needed?
// - modules(projects) written in TS not having enabled `checkJS:true` wont infer types from .js files, thus the API will have `any` type.
// This errors in strict ts check mode.

/// <reference path="../../../typings/lerna/index.d.ts" />
export declare function getDependencies(packageName: string): Promise<{
  dependencies: Dependency[];
  devDependencies: Dependency[];
  all: Dependency[];
  projectGraph: import('lerna/utils').ProjectGraphWithPackages;
}>;

type Dependency = {
  name: string;
  isTopLevel: boolean;
  dependencyType: import('lerna/utils').ProjectGraphWorkspacePackageDependency['dependencyCollection'];
};
