// Type definitions for lerna 7.0.0

// NOTE: types taken from @see https://github.com/lerna/lerna/blob/main/libs/core/src/lib/project-graph-with-packages.ts
// ISSUE: https://github.com/lerna/lerna/issues/3851

declare module 'lerna/utils' {
  import type { ProjectFileMap, ProjectGraph, ProjectGraphDependency, ProjectGraphProjectNode } from '@nx/devkit';

  interface RawManifest {
    name: string;
    version: string;
    description?: string;
    private?: boolean;
    bin?: Record<string, string> | string;
    scripts?: Record<string, string>;
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
    optionalDependencies?: Record<string, string>;
    peerDependencies?: Record<string, string>;
    publishConfig?: Record<'directory' | 'registry' | 'tag', string>;
    workspaces?: string[];
    nx?: Record<string, unknown>;
    gitHead?: string;
    lerna?: RawManifestLernaConfig;
  }

  interface RawManifestLernaConfig {
    command?: {
      publish?: {
        directory?: string;
        assets?: AssetDefinition[];
      };
    };
  }
  type AssetDefinition = string | { from: string; to: string };

  interface Package extends Omit<RawManifest, 'lerna' | 'nx' | 'gitHead' | 'workspaces'> {
    /**
     * Map-like retrieval of arbitrary values from package.json
     */
    get(key: string): unknown;
    binLocation: string;

    resolved: Record<string, unknown>;
    /**
     * path to package.json
     */
    manifestLocation: string;
    location: string;
    lernaConfig: RawManifest['lerna'] | undefined;
  }

  type ExtendedNpaResult = {
    workspaceSpec?: string;
    workspaceAlias?: string;
  };

  interface ProjectGraphProjectNodeWithPackage extends ProjectGraphProjectNode {
    package: Package | null;
  }
  interface ProjectGraphWorkspacePackageDependency extends ProjectGraphDependency {
    targetVersionMatchesDependencyRequirement: boolean;
    targetResolvedNpaResult: ExtendedNpaResult;
    dependencyCollection: 'dependencies' | 'devDependencies' | 'optionalDependencies'; // lerna doesn't manage peer dependencies
  }
  export interface ProjectGraphWithPackages extends ProjectGraph {
    nodes: Record<string, ProjectGraphProjectNodeWithPackage>;
    localPackageDependencies: Record<string, ProjectGraphWorkspacePackageDependency[]>;
  }

  export function detectProjects(): Promise<{
    projectGraph: ProjectGraphWithPackages;
    projectFileMap: ProjectFileMap;
  }>;
}
