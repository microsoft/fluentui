type PackageDependencies = { [dependencyName: string]: string };

const IMPORT_PATH_REGEX = /from ['"](.*?)['"];/g;

function matchAll(str: string, re: RegExp) {
  let match: RegExpExecArray | null = null;
  const matches: RegExpExecArray[] = [];

  while ((match = re.exec(str))) {
    matches.push(match);
  }

  return matches;
}

/**
 *
 * @param fileContent - code
 * @param requiredDependencies - dependencies that will always be included in package.json
 * @param optionalDependencies - whose versions will override those found in the code
 * @returns - Map of dependencies and their versions to include in package.json
 */
export const getDependencies = (
  fileContent: string,
  requiredDependencies: PackageDependencies,
  optionalDependencies: PackageDependencies,
) => {
  const importPaths = matchAll(fileContent, IMPORT_PATH_REGEX);

  const dependenciesInCode = importPaths.reduce((dependencies, match) => {
    const importPath = match[1];
    const isReactPath = importPath.startsWith('react/');
    const isRelativeImportPath = importPath.startsWith('.');

    if (isReactPath || isRelativeImportPath) {
      return dependencies;
    }

    const dependency = parsePackageName(importPath).name;

    if (!dependencies.hasOwnProperty(dependency)) {
      dependencies[dependency] = optionalDependencies[dependency] ?? 'latest';
    }

    return dependencies;
  }, {} as PackageDependencies);

  return { ...dependenciesInCode, ...requiredDependencies };
};

// Parsed a scoped package name into name, version, and path.
const RE_SCOPED = /^(@[^\/]+\/[^@\/]+)(?:@([^\/]+))?(\/.*)?$/;
// Parsed a non-scoped package name into name, version, path
const RE_NON_SCOPED = /^([^@\/]+)(?:@([^\/]+))?(\/.*)?$/;

function parsePackageName(input: string) {
  const m = RE_SCOPED.exec(input) || RE_NON_SCOPED.exec(input);

  if (!m) {
    throw new Error(`[parse-package-name] invalid package name: ${input}`);
  }

  return {
    name: m[1] || '',
    version: m[2] || 'latest',
    path: m[3] || '',
  };
}
