import fs from 'fs-extra';
import { join } from 'path';
import { getFixturesDir, remove } from './paths.js';
import { RandomTree } from '../../src/shared/tree/RandomTree.js';
import { RandomSelectorTreeNode, selectorTreeCreator } from '../../src/shared/tree/RandomSelectorTreeNode.js';
import glob from 'glob';

type BuildTreeFixture = (name: string, options: { [key: string]: string }) => void;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TreeJsonReplacer = (key: string, value: any) => any;
type DefaultFixture = 'xs_1' | 'xs_2' | 's_1' | 's_2' | 'm_1' | 'm_2' | 'l_1' | 'l_2' | 'xl_1' | 'xl_2';
type DefaultFixtureOptions = {
  [fixtureName in DefaultFixture]: {
    [option: string]: string;
  };
};

const defaultFixtures = ['xs_1', 'xs_2', 's_1', 's_2', 'm_1', 'm_2', 'l_1', 'l_2', 'xl_1', 'xl_2'];
const defaultFixtureOptions: DefaultFixtureOptions = {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  xs_1: {
    minBreadth: '1',
    maxBreadth: '3',
    minDepth: '1',
    maxDepth: '3',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  xs_2: {
    minBreadth: '1',
    maxBreadth: '3',
    minDepth: '1',
    maxDepth: '3',
    seed: '4212021',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  s_1: {
    minBreadth: '2',
    maxBreadth: '5',
    minDepth: '2',
    maxDepth: '5',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  s_2: {
    minBreadth: '2',
    maxBreadth: '5',
    minDepth: '2',
    maxDepth: '5',
    seed: '4212021',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  m_1: {
    minBreadth: '3',
    maxBreadth: '8',
    minDepth: '3',
    maxDepth: '8',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  m_2: {
    minBreadth: '3',
    maxBreadth: '8',
    minDepth: '3',
    maxDepth: '8',
    seed: '4212021',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  l_1: {
    minBreadth: '5',
    maxBreadth: '15',
    minDepth: '4',
    maxDepth: '15',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  l_2: {
    minBreadth: '5',
    maxBreadth: '15',
    minDepth: '4',
    maxDepth: '15',
    seed: '4212021',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  xl_1: {
    minBreadth: '10',
    maxBreadth: '20',
    minDepth: '10',
    maxDepth: '20',
  },
  // eslint-disable-next-line @typescript-eslint/naming-convention
  xl_2: {
    minBreadth: '10',
    maxBreadth: '20',
    minDepth: '10',
    maxDepth: '20',
    seed: '4212021',
  },
};

export const reservedNames = ['xs_', 's_', 'm_', 'l_', 'xl_'];
export const isReservedName = (name: string): boolean => {
  return reservedNames.some(reservedName => {
    return name.startsWith(reservedName);
  });
};

const treeJsonReplace: TreeJsonReplacer = (key, value) => {
  if (key === 'parent') {
    return undefined;
  }

  return value;
};

export const cleanFixtures = () => {
  const files = glob.sync(join(getFixturesDir(), '**', '*.js'));
  files.forEach(file => remove(file));
};

export const buildTreeFixture: BuildTreeFixture = (name, options) => {
  const selectors = [] as string[];
  const treeBuilder = new RandomTree<RandomSelectorTreeNode>(options);
  const tree = treeBuilder.build(selectorTreeCreator(selectors));

  const jsonTree = JSON.stringify(tree, treeJsonReplace, 2);

  const data = {
    tree: JSON.parse(jsonTree),
    selectors,
  };

  const js = `export default ${JSON.stringify(data, null, 2)};`;

  fs.writeFileSync(join(getFixturesDir(), `${name}.js`), js, { encoding: 'utf8' });
};

export const buildDefaultFixtures = () => {
  const fixtures = defaultFixtures.map(f => {
    return {
      name: f as DefaultFixture,
      path: join(getFixturesDir(), `${f}.js`),
    };
  });

  const missingFixtures = [] as DefaultFixture[];
  fixtures.forEach(f => {
    if (!fs.existsSync(f.path)) {
      missingFixtures.push(f.name);
    }
  });

  if (missingFixtures.length === 0) {
    return;
  }

  console.log(`Missing fixtures: ${missingFixtures}.`);
  console.log('Generating...');

  missingFixtures.forEach(missingFixture => {
    console.log(`Generating fixture ${missingFixture}...`);
    buildTreeFixture(missingFixture, defaultFixtureOptions[missingFixture]);
    console.log(`Done!`);
  });

  console.log('All default fixtures generated!');
};
