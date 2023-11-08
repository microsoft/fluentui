type PackageDependencies = { [dependencyName: string]: string };

function matchAll(str: string, re: RegExp) {
  const regexp = new RegExp(re, 'g');
  let match: RegExpExecArray | null = null;
  const matches: RegExpExecArray[] = [];

  while ((match = regexp.exec(str))) {
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
  const matches = matchAll(fileContent, /from ['"](.*?)['"];/g);

  const dependenciesInCode = Array.from(matches).reduce((dependencies, match) => {
    if (!match[1].startsWith('react/')) {
      const dependency = parsePackageName(match[1]).name;

      if (!dependencies.hasOwnProperty(dependency)) {
        dependencies[dependency] = optionalDependencies[dependency] ?? 'latest';
      }
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
