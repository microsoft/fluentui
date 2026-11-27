// @ts-check
const { RuleTester } = require('@typescript-eslint/rule-tester');
const path = require('path');
const rule = require('./index');

const fixtureRoot = path.resolve(__dirname, './fixtures/basic');

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      project: path.join(fixtureRoot, 'tsconfig.json'),
      tsconfigRootDir: fixtureRoot,
    },
  },
});

const filename = 'src/component.tsx';

/** Shared prelude: a props type with design props (`size`, `appearance`) next to DOM props. */
const prelude = `
  import type * as React from 'react';
  import { slot } from './slot';

  type Props = React.HTMLAttributes<HTMLDivElement> & {
    size?: 'small' | 'large';
    appearance?: 'filled' | 'outline';
  };
  declare const props: Props;
  declare const ref: React.Ref<HTMLDivElement>;
`;

ruleTester.run('no-custom-props-in-intrinsic-slot', rule, {
  valid: [
    {
      name: 'design props destructured before the spread',
      filename,
      code: `${prelude}
        const { size, appearance, ...rest } = props;
        slot.always({ ref, ...rest }, { elementType: 'div' });
      `,
    },
    {
      name: 'component element type is not checked',
      filename,
      code: `${prelude}
        declare const Custom: React.FC<Props>;
        slot.always({ ...props }, { elementType: Custom });
      `,
    },
    {
      name: 'no spread',
      filename,
      code: `${prelude}
        slot.always({ ref, role: 'group' }, { elementType: 'div' });
      `,
    },
    {
      name: 'data-* attributes, aria-* attributes and "as" are allowed',
      filename,
      code: `${prelude}
        declare const rest: { 'data-foo'?: string; 'aria-label'?: string; as?: 'div' };
        slot.always({ ...rest }, { elementType: 'div' });
      `,
    },
    {
      name: 'a key set after the spread overrides the spread value',
      filename,
      code: `${prelude}
        declare const rest: React.HTMLAttributes<HTMLDivElement> & { size?: string };
        slot.always({ ...rest, size: undefined }, { elementType: 'div' });
      `,
    },
    {
      name: 'props typed as never are ignored',
      filename,
      code: `${prelude}
        declare const rest: React.HTMLAttributes<HTMLDivElement> & { size?: never };
        slot.always({ ...rest }, { elementType: 'div' });
      `,
    },
    {
      name: 'a prop valid on one of several tags is allowed',
      filename,
      code: `${prelude}
        declare const rest: React.ButtonHTMLAttributes<HTMLButtonElement>;
        declare const elementType: 'a' | 'button';
        slot.always({ ...rest }, { elementType });
      `,
    },
    {
      name: 'value that is not an object literal is not checked',
      filename,
      code: `${prelude}
        slot.always(props, { elementType: 'div' });
      `,
    },
    {
      name: 'a prop valid on the tag that "as" selects is allowed',
      filename,
      code: `${prelude}
        declare const rest: { as: 'a'; href: string };
        slot.always({ ...rest }, { elementType: 'div' });
      `,
    },
    {
      name: 'an optional "as" keeps the base tag and adds the alternate tag',
      filename,
      code: `${prelude}
        declare const rest: React.HTMLAttributes<HTMLElement> & { as?: 'a'; href?: string };
        slot.always({ ...rest }, { elementType: 'div' });
      `,
    },
    {
      name: 'an explicit "as" key selects the tag',
      filename,
      code: `${prelude}
        declare const rest: React.AnchorHTMLAttributes<HTMLAnchorElement>;
        slot.always({ ...rest, as: 'a' as const }, { elementType: 'div' });
      `,
    },
    {
      name: '"as" that can be a component is not checked',
      filename,
      code: `${prelude}
        declare const rest: Props & { as?: 'a' | React.ComponentType };
        slot.always({ ...rest }, { elementType: 'div' });
      `,
    },
    {
      name: 'an "as" from defaultProps selects the tag unless a later value overrides it',
      filename,
      code: `${prelude}
        declare const rest: { href?: string };
        slot.always({ ...rest }, { elementType: 'div', defaultProps: { as: 'a' } });
      `,
    },
    {
      name: 'an optional "as" in a spread keeps the defaultProps "as" possible',
      filename,
      code: `${prelude}
        declare const rest: { as?: 'span'; href?: string };
        slot.always({ ...rest }, { elementType: 'div', defaultProps: { as: 'a' } });
      `,
    },
    {
      name: 'a computed string-literal "as" key selects the tag',
      filename,
      code: `${prelude}
        declare const rest: { href?: string };
        slot.always({ ...rest, ['as']: 'a' }, { elementType: 'div' });
      `,
    },
  ],
  invalid: [
    {
      name: 'design props spread into slot.always',
      filename,
      code: `${prelude}
        slot.always({ ref, ...props }, { elementType: 'div' });
      `,
      errors: [
        {
          messageId: 'customProps',
          data: { names: '`appearance`, `size`', tags: 'div', verb: 'are', pronoun: 'them' },
        },
      ],
    },
    {
      name: 'a prop that was not destructured',
      filename,
      code: `${prelude}
        const { size, ...rest } = props;
        slot.always({ ...rest }, { elementType: 'div' });
      `,
      errors: [{ messageId: 'customProps', data: { names: '`appearance`', tags: 'div', verb: 'is', pronoun: 'it' } }],
    },
    {
      name: 'slot.optional is checked too',
      filename,
      code: `${prelude}
        slot.optional({ ...props }, { elementType: 'span' });
      `,
      errors: [{ messageId: 'customProps' }],
    },
    {
      name: 'a prop valid on no tag of a union is reported',
      filename,
      code: `${prelude}
        declare const rest: React.HTMLAttributes<HTMLElement> & { disabledFocusable?: boolean };
        declare const elementType: 'a' | 'button';
        slot.always({ ...rest }, { elementType });
      `,
      errors: [
        {
          messageId: 'customProps',
          data: { names: '`disabledFocusable`', tags: 'a> | <button', verb: 'is', pronoun: 'it' },
        },
      ],
    },
    {
      name: 'a prop valid on neither the base tag nor the "as" tag is reported',
      filename,
      code: `${prelude}
        declare const rest: React.HTMLAttributes<HTMLElement> & { as?: 'a'; href?: string; size?: string };
        slot.always({ ...rest }, { elementType: 'div' });
      `,
      errors: [{ messageId: 'customProps', data: { names: '`size`', tags: 'div> | <a', verb: 'is', pronoun: 'it' } }],
    },
    {
      name: 'an explicit "as" after the spread replaces a component "as" from the spread',
      filename,
      code: `${prelude}
        declare const rest: Props & { as?: React.ComponentType };
        slot.always({ ...rest, as: 'div' }, { elementType: 'div' });
      `,
      errors: [
        {
          messageId: 'customProps',
          data: { names: '`appearance`, `size`', tags: 'div', verb: 'are', pronoun: 'them' },
        },
      ],
    },
    {
      name: 'a required "as" in the value replaces the defaultProps "as"',
      filename,
      code: `${prelude}
        declare const rest: { as: 'div'; href?: string };
        slot.always({ ...rest }, { elementType: 'div', defaultProps: { as: 'a' } });
      `,
      errors: [{ messageId: 'customProps', data: { names: '`href`', tags: 'div', verb: 'is', pronoun: 'it' } }],
    },
    {
      name: 'a computed "as" key after the spread replaces a component "as" from the spread',
      filename,
      code: `${prelude}
        declare const rest: Props & { as?: React.ComponentType };
        slot.always({ ...rest, [\`as\`]: 'div' }, { elementType: 'div' });
      `,
      errors: [
        {
          messageId: 'customProps',
          data: { names: '`appearance`, `size`', tags: 'div', verb: 'are', pronoun: 'them' },
        },
      ],
    },
  ],
});
