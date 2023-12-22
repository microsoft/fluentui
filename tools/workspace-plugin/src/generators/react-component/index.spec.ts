import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import { Tree, addProjectConfiguration, writeJson, joinPathFragments, updateProjectConfiguration } from '@nx/devkit';

import generator from './index';

describe('react-component generator', () => {
  let tree: Tree;
  let metadata: ReturnType<typeof createLibrary>['metadata'];

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
    metadata = createLibrary(tree, 'react-one').metadata;
  });

  describe(`assertions`, () => {
    it(`should throw error if one wants to add component to non v9 package`, async () => {
      createLibrary(tree, 'react-old', { tags: ['v8'], version: '8.123.4' });
      try {
        await generator(tree, { project: '@proj/react-old', name: 'MyOne' });
      } catch (err) {
        expect(err).toMatchInlineSnapshot(
          `[Error: this generator works only with v9 packages. "@proj/react-old" is not!]`,
        );
      }
    });

    it(`should throw error if component already exists`, async () => {
      await generator(tree, { project: '@proj/react-one', name: 'MyOne' });

      try {
        await generator(tree, { project: '@proj/react-one', name: 'MyOne' });
      } catch (err) {
        expect(err).toMatchInlineSnapshot(`[Error: The component "MyOne" already exists]`);
      }
    });
  });

  it('should create component', async () => {
    await generator(tree, { project: '@proj/react-one', name: 'MyOne' });

    const projectSourceRootPath = 'packages/react-components/react-one/src';
    const componentRootPath = `${projectSourceRootPath}/components/MyOne`;

    expect(tree.read(joinPathFragments(projectSourceRootPath, 'MyOne.ts'), 'utf-8')).toMatchInlineSnapshot(`
      "export * from './components/MyOne/index';
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

    expect(tree.read(joinPathFragments(componentRootPath, 'MyOne.tsx'), 'utf-8')).toMatchInlineSnapshot(`
      "import * as React from 'react';
      import type { ForwardRefComponent } from '@fluentui/react-utilities';
      import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
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
          // TODO update types in packages/react-components/react-shared-contexts/src/CustomStyleHooksContext/CustomStyleHooksContext.ts
          // https://github.com/microsoft/fluentui/blob/master/rfcs/react-components/convergence/custom-styling.md
          useCustomStyleHook_unstable('useMyOneStyles_unstable')(state);
          return renderMyOne_unstable(state);
        }
      );

      MyOne.displayName = 'MyOne';
      "
    `);

    expect(tree.read(joinPathFragments(componentRootPath, 'useMyOneStyles.styles.ts'), 'utf-8')).toMatchInlineSnapshot(`
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

  it(`should update barrel file`, async () => {
    await generator(tree, { project: '@proj/react-one', name: 'MyOne' });

    const projectSourceRootPath = 'packages/react-components/react-one/src';
    const barrelPath = joinPathFragments(projectSourceRootPath, 'index.ts');

    expect(tree.read(barrelPath, 'utf-8')).toMatchInlineSnapshot(`
      "export * from './MyOne';
      "
    `);

    await generator(tree, { project: '@proj/react-one', name: 'MyTwo' });

    expect(tree.read(barrelPath, 'utf-8')).toMatchInlineSnapshot(`
      "export * from './MyOne';
      export * from './MyTwo';
      "
    `);
  });

  describe(`stories`, () => {
    it(`should remove stories/.gitkeep`, async () => {
      const gitkeepPath = joinPathFragments(metadata.paths.storiesRoot, '.gitkeep');
      expect(tree.exists(gitkeepPath)).toBe(true);

      await generator(tree, { project: '@proj/react-one', name: 'MyOne' });

      expect(tree.exists(gitkeepPath)).toBe(false);
    });

    it('should create component story files', async () => {
      const componentStoryRootPath = 'packages/react-components/react-one/stories/MyOne';
      await generator(tree, { project: '@proj/react-one', name: 'MyOne' });

      expect(tree.children(componentStoryRootPath)).toMatchInlineSnapshot(`
      Array [
        "MyOneBestPractices.md",
        "MyOneDefault.stories.tsx",
        "MyOneDescription.md",
        "index.stories.tsx",
      ]
    `);
    });

    it('should create component story for STABLE package', async () => {
      const componentStoryRootPath = 'packages/react-components/react-one/stories/MyOne';
      await generator(tree, { project: '@proj/react-one', name: 'MyOne' });

      expect(tree.read(joinPathFragments(componentStoryRootPath, 'index.stories.tsx'), 'utf-8')).toMatchInlineSnapshot(`
      "import { MyOne } from '@proj/react-one';

      import descriptionMd from './MyOneDescription.md';
      import bestPracticesMd from './MyOneBestPractices.md';

      export { Default } from './MyOneDefault.stories';

      export default {
        title: 'Components/MyOne',
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

    it('should create component story for PREVIEW package', async () => {
      createLibrary(tree, 'react-one-preview');

      const componentStoryRootPath = 'packages/react-components/react-one-preview/stories/MyOne';

      await generator(tree, { project: '@proj/react-one-preview', name: 'MyOne' });

      expect(tree.read(joinPathFragments(componentStoryRootPath, 'index.stories.tsx'), 'utf-8')).toMatchInlineSnapshot(`
      "import { MyOne } from '@proj/react-one-preview';

      import descriptionMd from './MyOneDescription.md';
      import bestPracticesMd from './MyOneBestPractices.md';

      export { Default } from './MyOneDefault.stories';

      export default {
        title: 'Preview Components/MyOne',
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

    it('should create component story for COMPAT package', async () => {
      createLibrary(tree, 'react-one-compat', { tags: ['compat'] });

      const componentStoryRootPath = 'packages/react-components/react-one-compat/stories/MyOne';

      await generator(tree, { project: '@proj/react-one-compat', name: 'MyOne' });

      expect(tree.read(joinPathFragments(componentStoryRootPath, 'index.stories.tsx'), 'utf-8')).toMatchInlineSnapshot(`
      "import { MyOne } from '@proj/react-one-compat';

      import descriptionMd from './MyOneDescription.md';
      import bestPracticesMd from './MyOneBestPractices.md';

      export { Default } from './MyOneDefault.stories';

      export default {
        title: 'Compat Components/MyOne',
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
  });
});

function createLibrary(tree: Tree, name: string, options: Partial<{ version: string; tags: string[] }> = {}) {
  const _options = { version: '9.0.0', tags: ['vNext', ...(options.tags ?? [])], ...options };
  const projectName = '@proj/' + name;
  const root = `packages/react-components/${name}`;
  const sourceRoot = `${root}/src`;
  addProjectConfiguration(tree, projectName, { root, tags: _options.tags, sourceRoot });
  writeJson(tree, joinPathFragments(root, 'package.json'), {
    name: projectName,
    version: _options.version,
  });
  tree.write(joinPathFragments(root, 'stories/.gitkeep'), '');
  tree.write(joinPathFragments(sourceRoot, 'index.ts'), 'export {}');

  const metadata = {
    projectConfiguration: { name: projectName, root, tags: _options.tags, sourceRoot },
    paths: { root, sourceRoot, storiesRoot: joinPathFragments(root, 'stories') },
  };

  return { tree, metadata };
}
