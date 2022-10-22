const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const tmp = require('tmp');

function setup() {
  const scriptPath = path.join(__dirname, 'normalize-import');
  const distFolder = tmp.dirSync({ prefix: 'distOutput_' });
  const nestedFolder = tmp.dirSync({ dir: distFolder.name });

  const files = {
    relativeImports: {
      f1: tmp.fileSync({ dir: distFolder.name, postfix: '.d.ts' }),
      f2: tmp.fileSync({ dir: nestedFolder.name, postfix: '.d.ts' }),
    },
    absoluteImports: {
      f1: tmp.fileSync({ dir: distFolder.name, postfix: '.d.ts' }),
      f2: tmp.fileSync({ dir: nestedFolder.name, postfix: '.d.ts' }),
    },
  };

  Object.values(files.relativeImports).forEach(tmpFile => {
    fs.writeFileSync(tmpFile.name, getFileContent({ relativeImport: true }));
  });
  Object.values(files.absoluteImports).forEach(tmpFile => {
    fs.writeFileSync(tmpFile.name, getFileContent({ relativeImport: false }));
  });

  return { distFolder, files, scriptPath };
}

/**
 *
 * @param {{relativeImport:boolean;scope?:string}} options
 */
function getFileContent(options) {
  const { scope, relativeImport } = { scope: '@fluentui', ...options };
  const importPath = relativeImport ? `../../../../pkg-name/src` : `${scope}/react-utilities`;

  return `import * as React from 'react';
/**
 * Define a styled FooBar, using the 'useFooBar' hook.
 * {@docCategory FooBar }
 */
export declare const FooBar: React.ForwardRefExoticComponent<import("${importPath}").ComponentProps>;
`;
}

describe(`normalize-import`, () => {
  afterEach(() => {
    tmp.setGracefulCleanup();
  });

  it(`should throw error if --output is missing`, () => {
    const utils = setup();

    expect(() => execSync(`node ${utils.scriptPath}`, { stdio: 'pipe' })).toThrowError('--output is missing');
  });

  it(`should throw error if provided --output is not a valid directory`, () => {
    const utils = setup();

    expect(() => execSync(`node ${utils.scriptPath} --output some/nonexistent/path`, { stdio: 'pipe' })).toThrowError(
      /some[/\\]nonexistent[\\/]path doesn't exist/,
    );
  });

  it(`should replace all relative path import to scoped/absolute path in all files within directory`, () => {
    const utils = setup();

    let content = fs.readFileSync(utils.files.relativeImports.f1.name, 'utf8');
    let contentNested = fs.readFileSync(utils.files.relativeImports.f2.name, 'utf8');

    expect(content).toContain('import("../../../../pkg-name/src")');
    expect(contentNested).toContain('import("../../../../pkg-name/src")');

    execSync(`node ${utils.scriptPath} --output ${utils.distFolder.name}`);

    content = fs.readFileSync(utils.files.relativeImports.f1.name, 'utf8');
    contentNested = fs.readFileSync(utils.files.relativeImports.f2.name, 'utf8');

    expect(content).not.toContain('import("../../../../pkg-name/src")');
    expect(content).toContain('import("@fluentui/pkg-name")');
    expect(contentNested).not.toContain('import("../../../../pkg-name/src")');
    expect(contentNested).toContain('import("@fluentui/pkg-name")');
  });
});
