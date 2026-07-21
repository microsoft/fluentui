import * as babel from '@babel/core';
import * as prettier from 'prettier';
import { sliceStorySource } from './sliceStory';

const filename = 'Example.stories.tsx';

/** Slices `source` to `targetStory` using the real babel instance. */
function slice(source: string, targetStory: string): string {
  const result = sliceStorySource(babel, source, { targetStory, filename });
  if (result === null) {
    throw new Error(`sliceStorySource returned null for target "${targetStory}"`);
  }
  return result;
}

/**
 * Formats sliced output the same way the downstream pipeline does. Doubles as a
 * syntax guard: prettier throws on invalid output (e.g. `const args = {} = {}`).
 */
function format(code: string): string {
  return prettier.format(code, { parser: 'babel-ts' });
}

describe('sliceStorySource', () => {
  describe('CSF3 render function with non-plain args parameter', () => {
    it('unwraps a defaulted args parameter into a valid `const args` declaration', () => {
      const source = [
        `import * as React from 'react';`,
        `import { Button } from '@fluentui/react-button';`,
        ``,
        `const meta = { title: 'Button', component: Button };`,
        `export default meta;`,
        ``,
        `export const WithDefault = {`,
        `  render: (args = { appearance: 'outline' }) => <Button {...args} />,`,
        `};`,
      ].join('\n');

      const sliced = slice(source, 'WithDefault');

      // Regression: raw AssignmentPattern id produced `const args = {…} = {…}`,
      // invalid syntax that prettier would reject.
      expect(format(sliced)).toMatchInlineSnapshot(`
        "import * as React from \\"react\\";
        import { Button } from \\"@fluentui/react-button\\";
        export const WithDefault = () => {
          const args = { appearance: \\"outline\\" };
          return <Button {...args} />;
        };
        "
      `);
    });

    it('unwraps a rest args parameter into a valid `const args` declaration', () => {
      const source = [
        `import * as React from 'react';`,
        `import { Button } from '@fluentui/react-button';`,
        ``,
        `const meta = { title: 'Button', component: Button };`,
        `export default meta;`,
        ``,
        `export const WithRest = {`,
        `  render: (...args) => <Button {...args} />,`,
        `};`,
      ].join('\n');

      const sliced = slice(source, 'WithRest');

      expect(format(sliced)).toMatchInlineSnapshot(`
        "import * as React from \\"react\\";
        import { Button } from \\"@fluentui/react-button\\";
        export const WithRest = () => {
          const args = {};
          return <Button {...args} />;
        };
        "
      `);
    });

    it('prefers merged meta/story args over the render param default', () => {
      const source = [
        `import * as React from 'react';`,
        `import { Button } from '@fluentui/react-button';`,
        ``,
        `const meta = { title: 'Button', component: Button, args: { appearance: 'primary' } };`,
        `export default meta;`,
        ``,
        `export const Overrides = {`,
        `  args: { children: 'Hi' },`,
        `  render: (args = { appearance: 'outline' }) => <Button {...args} />,`,
        `};`,
      ].join('\n');

      const sliced = slice(source, 'Overrides');

      expect(format(sliced)).toMatchInlineSnapshot(`
        "import * as React from \\"react\\";
        import { Button } from \\"@fluentui/react-button\\";
        export const Overrides = () => {
          const args = { appearance: \\"primary\\", children: \\"Hi\\" };
          return <Button {...args} />;
        };
        "
      `);
    });
  });

  describe('module-level member assignment pruning', () => {
    it('keeps non-CSF member assignments on reachable helpers (e.g. `Card.displayName`)', () => {
      const source = [
        `import * as React from 'react';`,
        ``,
        `const Card = props => <div {...props} />;`,
        `Card.displayName = 'Card';`,
        ``,
        `const meta = { title: 'Card', component: Card };`,
        `export default meta;`,
        ``,
        `export const Basic = () => <Card>hi</Card>;`,
      ].join('\n');

      const sliced = slice(source, 'Basic');

      // Regression: over-broad matcher removed any `Identifier.x = …`, dropping
      // helper setup needed to render the example.
      expect(sliced).toContain(`Card.displayName = 'Card'`);
    });

    it('keeps member assignments on non-component (lowercase) identifiers', () => {
      const source = [
        `import * as React from 'react';`,
        `import { Button } from '@fluentui/react-button';`,
        ``,
        `const config = {};`,
        `config.foo = 'bar';`,
        ``,
        `const meta = { title: 'Button', component: Button };`,
        `export default meta;`,
        ``,
        `export const Basic = () => <Button title={config.foo}>hi</Button>;`,
      ].join('\n');

      const sliced = slice(source, 'Basic');

      expect(sliced).toContain(`config.foo = 'bar'`);
    });

    it('still removes CSF2 story annotation assignments on the target story', () => {
      const source = [
        `import * as React from 'react';`,
        `import { Button } from '@fluentui/react-button';`,
        ``,
        `const meta = { title: 'Button', component: Button };`,
        `export default meta;`,
        ``,
        `export const Basic = () => <Button>hi</Button>;`,
        `Basic.parameters = { layout: 'centered' };`,
        `Basic.args = { appearance: 'primary' };`,
      ].join('\n');

      const sliced = slice(source, 'Basic');

      expect(sliced).not.toContain('Basic.parameters');
      expect(sliced).not.toContain('Basic.args');
    });
  });
});
