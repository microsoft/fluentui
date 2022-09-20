const path = require('path');
const fs = require('fs');
const ts = require('typescript');
const { ComponentDoc, FileParser, withCompilerOptions } = require('react-docgen-typescript');

let program = null;
let parser = null;

/**
 * Creates a cached TS Program.
 */
function createTsProgram(componentPath, tsconfigDir) {
  if (true) {
    // !program) {
    // Calling parse() from react-docgen-typescript would create a new ts.Program for every component,
    // which can take multiple seconds in a large project. For better performance, we create a single
    // ts.Program per package and pass it to parseWithProgramProvider().

    const tsconfigPath = ts.findConfigFile(tsconfigDir ?? componentPath, fs.existsSync);

    if (!tsconfigPath) {
      throw new Error('Cannot find tsconfig.json');
    }

    const compilerOptions = getCompilerOptions(tsconfigPath);

    // To reduce the number of files parsed, only list the index file as the entry point.
    // This should work okay because it would be strange if a component being conformance tested
    // was not also referenced from some file eventually imported by the index file.
    const rootFile = path.join(path.dirname(path.dirname(componentPath)), 'src', 'index.ts');

    if (!fs.existsSync(rootFile)) {
      console.log(componentPath, rootFile);
      throw new Error(`Index file does not exist at expected path ${rootFile}`);
    }

    program = ts.createProgram([rootFile], compilerOptions);
  }

  if (!program.getSourceFile(componentPath)) {
    // See earlier comment for why it's handled this way (can reconsider if it becomes a problem)
    throw new Error(`Component file "${componentPath}" does not appear to be referenced from the project index file`);
  }

  return program;
}

function getCompilerOptions(tsconfigPath) {
  const basePath = path.dirname(tsconfigPath);
  const { config, error } = ts.readConfigFile(tsconfigPath, filename => fs.readFileSync(filename, 'utf8'));

  if (error !== undefined) {
    const errorText =
      `Cannot load custom tsconfig.json from provided path: ${tsconfigPath}, ` +
      `with error code: ${error.code}, message: ${error.messageText}`;
    throw new Error(errorText);
  }

  const { options, errors } = ts.parseJsonConfigFileContent(config, ts.sys, basePath, {}, tsconfigPath);

  if (errors && errors.length) {
    throw errors[0];
  }

  return options;
}

function getComponentDoc(componentPath, program) {
  if (!parser) {
    parser = withCompilerOptions(program.getCompilerOptions(), {
      // Props need to be filtered since react-docgen shows all the props including inherited
      // native props or React built-in props. (Check for both @types/react and react/index.d.ts
      // because there may be some variation in which format is used.)
      propFilter: prop => !/@types[\\/]react[\\/]|\breact[\\/]index\.d\.ts$/.test(prop.parent?.fileName || ''),
    });
  }

  if (!program.getSourceFile(componentPath)) {
    // See earlier comment for why it's handled this way (can reconsider if it becomes a problem)
    throw new Error(`Component file "${componentPath}" does not appear to be referenced from the project index file`);
  }

  return parser.parseWithProgramProvider(componentPath, () => program);
}

const createResolvedType = values => {
  return values.map(v => ({
    name: 'literal',
    value: v,
    label: `${v}`,
  }));
};

const createPropType = (type, propName) => {
  if (type === 'boolean' || type === 'boolean | undefined') {
    return {
      types: [{ name: 'boolean', keyword: true }],
      resolvedType: createResolvedType([true, false]),
    };
  } else if (type === 'number' || type === 'number | undefined') {
    return {
      types: [{ name: 'number', keyword: true }],
    };
  } else if (type.indexOf('Record') >= 0 || type.indexOf('=>') >= 0) {
    return {};
  } else if (type.indexOf('Shorthand') >= 0) {
    return { types: [{ name: 'string', keyword: true }] };
  } else if (type.indexOf('|') >= 0) {
    const values = type
      .split('|')
      .map(t => t.trim().replaceAll('"', ''))
      .filter(t => t !== 'undefined');
    if (propName === 'as') {
      values.unshift('');
    }
    return {
      types: values.map(t => ({
        name: 'literal',
        value: t.trim().replaceAll('"', ''),
      })),
      resolvedType: createResolvedType(values),
    };
  } else {
    return { types: [{ name: 'boolean', keyword: true }] };
  }
};

const componentPaths = [
  'react-button/src/Button.tsx',
  'react-button/src/CompoundButton.ts',
  'react-button/src/MenuButton.ts',
  'react-button/src/SplitButton.ts',
  'react-button/src/ToggleButton.ts',

  'react-menu/src/Menu.ts',
  'react-menu/src/MenuItem.ts',
  'react-menu/src/MenuList.ts',
  'react-menu/src/MenuGroup.ts',
  'react-menu/src/MenuDivider.ts',
  'react-menu/src/MenuPopover.ts',
  'react-menu/src/MenuTrigger.ts',

  'react-link/src/Link.ts',
  'react-text/src/Text.ts',
].map(cp => `../../packages/react-components/${cp}`);
const tsconfigDir = './';
const all = [];

componentPaths.map(componentPath => {
  console.log(componentPath);
  if (!fs.existsSync(componentPath)) {
    throw new Error(`Path ${componentPath} does not exist`);
  }

  const tsProgram = createTsProgram(componentPath, tsconfigDir);

  const components = getComponentDoc(componentPath, tsProgram);
  // components.map(c => c.displayName === "Menu" && console.log(JSON.stringify(components)));

  const result = components
    .filter(c => !c.displayName.startsWith('use') && !c.displayName.startsWith('render'))
    .map(c => ({
      constructorName: c.displayName,
      componentClassName: c.displayName,
      displayName: c.displayName,
      implementsCreateShorthand: false,
      filename: 'N/A',
      filenameWithoutExt: 'N/A',
      docblock: {
        description: c.description,
        tags: [
          {
            description: c.description,
            title: c.description,
          },
        ],
      },
      apiPath: 'N/A',
      isChild: false,
      isParent: true,
      parentDisplayName: 'N/A',
      repoPath: 'N/A',
      subcomponentName: 'N/A',
      subcomponents: [],
      type: 'component',
      props: Object.keys(c.props)
        .filter(p => p !== 'icon')
        .map(propName => ({
          defaultValue: c.props[propName].defaultValue?.value.replaceAll("'", '').split(/\r?\n/)[0] || '',
          description: `${propName} property`,
          name: propName,
          required: false,
          tags: [],
          ...createPropType(c.props[propName].type?.name, propName),
        })),
    }));

  all.push(...result);
});

fs.writeFile('./componentsv9.json', JSON.stringify(all, 2, '  '), err => {
  if (err) {
    console.error(err);
  }
  // file written successfully
});
console.log('Done.');
