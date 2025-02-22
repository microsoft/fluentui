import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, addProjectConfiguration, writeJson, joinPathFragments, offsetFromRoot } from '@nx/devkit';

import generator from './index';

describe('react-component generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  describe(`assertions`, () => {
    it(`should throw error if one wants to add component to non v9 package`, async () => {
      createLibrary(tree, 'react-old', { tags: ['v8'], version: '8.123.4' });
      try {
        await generator(tree, { project: 'react-old', name: 'MyOne' });
      } catch (err) {
        expect(err).toMatchInlineSnapshot(`[Error: this generator works only with v9 packages. "react-old" is not!]`);
      }
    });

    it(`should throw error if component already exists`, async () => {
      createLibrary(tree, 'react-one');
      await generator(tree, { project: 'react-one', name: 'MyOne' });

      try {
        await generator(tree, { project: 'react-one', name: 'MyOne' });
      } catch (err) {
        expect(err).toMatchInlineSnapshot(`[Error: The component "MyOne" already exists]`);
      }
    });
  });

  describe(`component`, () => {
    shouldCreateComponent('old');
    shouldCreateComponent('split');

    shouldUpdateBarrelFile('old');
    shouldUpdateBarrelFile('split');

    function shouldCreateComponent(type: 'old' | 'split') {
      it(`should create component - ${type}`, async () => {
        if (type === 'old') {
          createLibrary(tree, 'react-one');
        }
        if (type === 'split') {
          createSplitProject(tree, 'react-one');
        }

        await generator(tree, { project: 'react-one', name: 'MyOne' });

        const projectSourceRootPath =
          type === 'old'
            ? 'packages/react-components/react-one/src'
            : 'packages/react-components/react-one/library/src';
        const componentRootPath = `${projectSourceRootPath}/components/MyOne`;

        const rootOffset = offsetFromRoot(componentRootPath);

        expect(tree.read(joinPathFragments(projectSourceRootPath, 'MyOne.ts'), 'utf-8')).toMatchInlineSnapshot(`
      "export {
        myOneClassNames,
        MyOne,
        renderMyOne_unstable,
        useMyOne_unstable,
        useMyOneStyles_unstable,
      } from './components/MyOne/index';
      export type { MyOneProps, MyOneState } from './components/MyOne/index';
      "
    `);

        expect(tree.children(componentRootPath)).toMatchInlineSnapshot(`
      Array [
        "MyOne.test.tsx",
        "MyOne.tsx",
        "MyOne.types.ts",
        "index.ts",
        "renderMyOne.tsx",
        "useMyOne.ts",
        "useMyOneStyles.styles.ts",
      ]
    `);

        expect(tree.read(joinPathFragments(componentRootPath, 'index.ts'), 'utf-8')).toMatchInlineSnapshot(`
          "export { MyOne } from './MyOne';
          export type { MyOneProps, MyOneState } from './MyOne.types';
          export { renderMyOne_unstable } from './renderMyOne';
          export { useMyOne_unstable } from './useMyOne';
          export {
            myOneClassNames,
            useMyOneStyles_unstable,
          } from './useMyOneStyles.styles';
          "
        `);

        expect(tree.read(joinPathFragments(componentRootPath, 'MyOne.tsx'), 'utf-8')).toMatchInlineSnapshot(`
      "import * as React from 'react';
      import type { ForwardRefComponent } from '@fluentui/react-utilities';
      import { useMyOne_unstable } from './useMyOne';
      import { renderMyOne_unstable } from './renderMyOne';
      import { useMyOneStyles_unstable } from './useMyOneStyles.styles';
      import type { MyOneProps } from './MyOne.types';

      /**
       * MyOne component - TODO: add more docs
       */
      export const MyOne: ForwardRefComponent<MyOneProps> = React.forwardRef(
        (props, ref) => {
          const state = useMyOne_unstable(props, ref);

          useMyOneStyles_unstable(state);

          /**
           * @see https://github.com/microsoft/fluentui/blob/master/docs/react-v9/contributing/rfcs/react-components/convergence/custom-styling.md
           *
           * TODO: 💡 once package will become stable (PR which will be part of promoting PREVIEW package to STABLE),
           *      - uncomment this line
           *      - update types {@link file://./${rootOffset}packages/react-components/react-shared-contexts/library/src/CustomStyleHooksContext/CustomStyleHooksContext.ts#CustomStyleHooksContextValue}
           *      - verify that custom global style override works for your component
           */
          // useCustomStyleHook_unstable('useMyOneStyles_unstable')(state);

          return renderMyOne_unstable(state);
        }
      );

      MyOne.displayName = 'MyOne';
      "
    `);

        expect(tree.read(joinPathFragments(componentRootPath, 'useMyOneStyles.styles.ts'), 'utf-8'))
          .toMatchInlineSnapshot(`
      "import { makeStyles, mergeClasses } from '@griffel/react';
      import type { SlotClassNames } from '@fluentui/react-utilities';
      import type { MyOneSlots, MyOneState } from './MyOne.types';

      export const myOneClassNames: SlotClassNames<MyOneSlots> = {
        root: 'fui-MyOne',
        // TODO: add class names for all slots on MyOneSlots.
        // Should be of the form \`<slotName>: 'fui-MyOne__<slotName>\`
      };

      /**
       * Styles for the root slot
       */
      const useStyles = makeStyles({
        root: {
          // TODO Add default styles for the root element
        },

        // TODO add additional classes for different states and/or slots
      });

      /**
       * Apply styling to the MyOne slots based on the state
       */
      export const useMyOneStyles_unstable = (state: MyOneState): MyOneState => {
        'use no memo';

        const styles = useStyles();
        state.root.className = mergeClasses(
          myOneClassNames.root,
          styles.root,
          state.root.className
        );

        // TODO Add class names to slots, for example:
        // state.mySlot.className = mergeClasses(styles.mySlot, state.mySlot.className);

        return state;
      };
      "
    `);
      });
    }

    function shouldUpdateBarrelFile(type: 'old' | 'split') {
      it(`should update barrel file - ${type}`, async () => {
        if (type === 'old') {
          createLibrary(tree, 'react-one');
        }
        if (type === 'split') {
          createSplitProject(tree, 'react-one');
        }

        await generator(tree, { project: 'react-one', name: 'MyOne' });

        const projectSourceRootPath =
          type === 'old'
            ? 'packages/react-components/react-one/src'
            : 'packages/react-components/react-one/library/src';
        const barrelPath = joinPathFragments(projectSourceRootPath, 'index.ts');

        expect(tree.read(barrelPath, 'utf-8')).toMatchInlineSnapshot(`
      "export {
        myOneClassNames,
        MyOne,
        renderMyOne_unstable,
        useMyOne_unstable,
        useMyOneStyles_unstable,
      } from './MyOne';
      export type { MyOneProps, MyOneState } from './MyOne';
      "
    `);

        await generator(tree, { project: 'react-one', name: 'MyTwo' });

        expect(tree.read(barrelPath, 'utf-8')).toMatchInlineSnapshot(`
      "export {
        myOneClassNames,
        MyOne,
        renderMyOne_unstable,
        useMyOne_unstable,
        useMyOneStyles_unstable,
      } from './MyOne';
      export type { MyOneProps, MyOneState } from './MyOne';
      export {
        myTwoClassNames,
        MyTwo,
        renderMyTwo_unstable,
        useMyTwo_unstable,
        useMyTwoStyles_unstable,
      } from './MyTwo';
      export type { MyTwoProps, MyTwoState } from './MyTwo';
      "
    `);
      });
    }
  });

  describe(`stories`, () => {
    it(`should remove stories/.gitkeep - old`, async () => {
      const { metadata } = createLibrary(tree, 'react-one');
      const gitkeepPath = joinPathFragments(joinPathFragments(metadata.paths.root, 'stories'), '.gitkeep');
      expect(tree.exists(gitkeepPath)).toBe(true);

      await generator(tree, { project: 'react-one', name: 'MyOne' });

      expect(tree.exists(gitkeepPath)).toBe(false);
    });

    shouldCreateComponentStoryFiles('old');
    shouldCreateComponentStoryFiles('split');

    shouldCreateComponentStoryForPackagePhase('stable', 'old');
    shouldCreateComponentStoryForPackagePhase('stable', 'split');

    shouldCreateComponentStoryForPackagePhase('preview', 'old');
    shouldCreateComponentStoryForPackagePhase('preview', 'split');

    shouldCreateComponentStoryForPackagePhase('compat', 'old');
    shouldCreateComponentStoryForPackagePhase('compat', 'split');

    function shouldCreateComponentStoryFiles(type: 'old' | 'split') {
      it(`should create component story files - ${type}`, async () => {
        if (type === 'old') {
          createLibrary(tree, 'react-one');
        }
        if (type === 'split') {
          createSplitProject(tree, 'react-one');
        }

        const componentStoryRootPath =
          type === 'old'
            ? 'packages/react-components/react-one/stories/MyOne'
            : 'packages/react-components/react-one/stories/src/MyOne';
        await generator(tree, { project: 'react-one', name: 'MyOne' });

        expect(tree.children(componentStoryRootPath)).toMatchInlineSnapshot(`
      Array [
        "MyOneBestPractices.md",
        "MyOneDefault.stories.tsx",
        "MyOneDescription.md",
        "index.stories.tsx",
      ]
    `);
      });
    }

    function shouldCreateComponentStoryForPackagePhase(phase: 'stable' | 'preview' | 'compat', type: 'old' | 'split') {
      const packageFolderName = {
        stable: 'react-one',
        preview: 'react-one-preview',
        compat: 'react-one-compat',
      };
      const titlePrefix = {
        stable: '',
        preview: 'Preview ',
        compat: 'Compat ',
      };
      const tags = {
        stable: [],
        preview: [],
        compat: ['compat'],
      };

      it(`should create component story for ${phase.toUpperCase()} package - ${type}`, async () => {
        if (type === 'old') {
          createLibrary(tree, packageFolderName[phase], { tags: tags[phase] });
        }
        if (type === 'split') {
          createSplitProject(tree, packageFolderName[phase], { tags: tags[phase] });
        }

        const componentStoryRootPath =
          type === 'old'
            ? `packages/react-components/${packageFolderName[phase]}/stories/MyOne`
            : `packages/react-components/${packageFolderName[phase]}/stories/src/MyOne`;

        await generator(tree, { project: packageFolderName[phase], name: 'MyOne' });

        expect(tree.read(joinPathFragments(componentStoryRootPath, 'index.stories.tsx'), 'utf-8'))
          .toMatchInlineSnapshot(`
      "import { MyOne } from '@proj/${packageFolderName[phase]}';

      import descriptionMd from './MyOneDescription.md';
      import bestPracticesMd from './MyOneBestPractices.md';

      export { Default } from './MyOneDefault.stories';

      export default {
        title: '${titlePrefix[phase]}Components/MyOne',
        component: MyOne,
        parameters: {
          docs: {
            description: {
              component: [descriptionMd, bestPracticesMd].join('\\\\n'),
            },
          },
        },
      };
      "
    `);
      });
    }
  });
});

function createSplitProject(
  tree: Tree,
  name: string,
  options: Partial<{ root: string; version: string; tags: string[] }> = {},
) {
  // library
  createLibrary(tree, name, { ...options, root: `packages/react-components/${name}/library` });

  // stories
  createLibrary(tree, name + '-stories', { ...options, root: `packages/react-components/${name}/stories` });
}

function createLibrary(
  tree: Tree,
  name: string,
  options: Partial<{ root: string; version: string; tags: string[] }> = {},
) {
  const _options = {
    version: '9.0.0',
    tags: ['vNext', ...(options.tags ?? [])],
    ...options,
  };
  const root = _options.root ?? `packages/react-components/${name}`;
  const projectName = name;
  const npmProjectName = '@proj/' + projectName;

  const sourceRoot = `${root}/src`;
  addProjectConfiguration(tree, projectName, { root, tags: _options.tags, sourceRoot });
  writeJson(tree, joinPathFragments(root, 'package.json'), {
    name: npmProjectName,
    version: _options.version,
  });
  tree.write(joinPathFragments(root, 'stories/.gitkeep'), '');
  tree.write(joinPathFragments(sourceRoot, 'index.ts'), 'export {}');

  const metadata = {
    projectConfiguration: { name: projectName, root, tags: _options.tags, sourceRoot },
    paths: { root, sourceRoot },
  };

  return { tree, metadata };
}
