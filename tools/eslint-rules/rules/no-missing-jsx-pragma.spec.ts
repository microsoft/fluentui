import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './no-missing-jsx-pragma';

const ruleTester = new RuleTester({
  languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // no slot api used case
    {
      options: [{ runtime: 'automatic' }],
      code: `
    export const renderFoo = () => {
      return (
          <div>
            hello
          </div>
        );
    }
  `,
    },

    // no slot api used case
    {
      options: [{ runtime: 'classic' }],
      code: `
    export const renderFoo = () => {
      return (
          <div>
            hello
          </div>
        );
    }
  `,
    },

    // slot api used + valid pragma exist case
    {
      options: [{ runtime: 'automatic' }],
      code: `
  /** @jsxImportSource @fluentui/react-jsx-runtime */

  import { assertSlots } from '@fluentui/react-utilities';

  import type { FooState, FooContextValues, FooSlots  } from './Foo.types';

  export const renderFoo_unstable = (state: FooState, contextValues: FooContextValues) => {
    assertSlots<FooSlots>(state);

    return (
        <state.root>
          <state.button>
            hello
          </state.button>
        </state.root>
    );
  };
  `,
    },

    // slot api used + valid pragma exist case
    {
      options: [{ runtime: 'classic' }],
      code: `
    /** @jsx createElement */
    import { createElement } from '@fluentui/react-jsx-runtime';
    import { assertSlots } from '@fluentui/react-utilities';

    import type { FooState, FooContextValues, FooSlots  } from './Foo.types';

    export const renderFoo_unstable = (state: FooState, contextValues: FooContextValues) => {
      assertSlots<FooSlots>(state);

      return (
          <state.root>
            <state.button>
              hello
            </state.button>
          </state.root>
      );
    };
    `,
    },

    // slot api (.always) used in a non conformant way + valid pragma exist case
    {
      options: [{ runtime: 'automatic' }],
      code: `
    /** @jsxImportSource @fluentui/react-jsx-runtime */
    import { slot, getIntrinsicElementProps } from '@fluentui/react-utilities';

    export const Test = (props: {}) => {
      const SlotComponent = slot.always(getIntrinsicElementProps('span', {}),{ elementType: 'span' })

      return (
          <div>
            <SlotComponent/>
          </div>
      );
    };
    `,
    },

    // slot api (.optional) used in a non conformant way + valid pragma exist case
    {
      options: [{ runtime: 'automatic' }],
      code: `
    /** @jsxImportSource @fluentui/react-jsx-runtime */
    import { slot, getIntrinsicElementProps } from '@fluentui/react-utilities';

    export const Test = (props: {}) => {
      const SlotComponent = slot.optional(getIntrinsicElementProps('span', {}),{ elementType: 'span' })

      return (
          <div>
            <SlotComponent/>
          </div>
      );
    };
    `,
    },

    // slot api (both .optional,.always) used in a non conformant way + valid pragma exist case
    {
      options: [{ runtime: 'automatic' }],
      code: `
    /** @jsxImportSource @fluentui/react-jsx-runtime */
    import { slot, getIntrinsicElementProps } from '@fluentui/react-utilities';

    export const Test = (props: {}) => {
      const SlotComponent = slot.always(getIntrinsicElementProps('span', {}),{ elementType: 'span' })
      const SlotOptionalComponent = slot.optional(getIntrinsicElementProps('span', {}),{ elementType: 'span' })

      return (
          <div>
            <SlotComponent/>
            <SlotOptionalComponent/>
          </div>
      );
    };
    `,
    },

    // slot api (.always) used in a non conformant way + no direct JSX rendering + no pragma required case
    {
      options: [{ runtime: 'automatic' }],
      code: `
    import { slot, getIntrinsicElementProps } from '@fluentui/react-utilities';

    export const factory = (props: {}) => {
      const SlotComponent = slot.always(getIntrinsicElementProps('span', {}),{ elementType: 'span' })
      const InlineCmp = () => <div>inline</div>

      return { SlotComponent, InlineCmp };
    };
    `,
    },
  ],
  invalid: [
    // slot api used + missing pragma
    {
      options: [{ runtime: 'automatic' }],
      code: `
    import { assertSlots } from '@fluentui/react-utilities';
    import type { FooState, FooContextValues, FooSlots  } from './Foo.types';
    export const renderFoo_unstable = (state: FooState, contextValues: FooContextValues) => {
      assertSlots<FooSlots>(state);
      return (
          <state.root>
            <state.button>
              hello
            </state.button>
          </state.root>
      );
    };
    `,
      errors: [{ messageId: 'missingJsxImportSource' }],
    },

    // slot api used + missing pragma
    {
      options: [{ runtime: 'classic' }],
      code: `
    import { assertSlots } from '@fluentui/react-utilities';
    import type { FooState, FooContextValues, FooSlots  } from './Foo.types';
    export const renderFoo_unstable = (state: FooState, contextValues: FooContextValues) => {
      assertSlots<FooSlots>(state);
      return (
          <state.root>
            <state.button>
              hello
            </state.button>
          </state.root>
      );
    };
    `,
      errors: [{ messageId: 'missingJsxPragma' }],
    },

    // slot api used + pragma present + factory import missing
    {
      options: [{ runtime: 'classic' }],
      code: `
      /** @jsx createElement */
      import { assertSlots } from '@fluentui/react-utilities';
      import type { FooState, FooContextValues, FooSlots  } from './Foo.types';
      export const renderFoo_unstable = (state: FooState, contextValues: FooContextValues) => {
        assertSlots<FooSlots>(state);
        return (
            <state.root>
              <state.button>
                hello
              </state.button>
            </state.root>
        );
      };
      `,
      errors: [{ messageId: 'missingCreateElementFactoryImport' }],
    },

    // slot api used + pragma present + invalid pragma for automatic mode
    {
      options: [{ runtime: 'automatic' }],
      code: `
      /** @jsx createElement */
      import { assertSlots } from '@fluentui/react-utilities';
      import { createElement } from '@fluentui/react-jsx-runtime';
      import type { FooState, FooContextValues, FooSlots  } from './Foo.types';
      export const renderFoo_unstable = (state: FooState, contextValues: FooContextValues) => {
        assertSlots<FooSlots>(state);
        return (
            <state.root>
              <state.button>
                hello
              </state.button>
            </state.root>
        );
      };
      `,
      errors: [{ messageId: 'invalidJSXPragmaForAutomatic' }],
    },

    // slot api used + pragma present + invalid pragma for classic mode
    {
      options: [{ runtime: 'classic' }],
      code: `
      /** @jsxImportSource @fluentui/react-jsx-runtime */
      import { assertSlots } from '@fluentui/react-utilities';
      import type { FooState, FooContextValues, FooSlots  } from './Foo.types';
      export const renderFoo_unstable = (state: FooState, contextValues: FooContextValues) => {
        assertSlots<FooSlots>(state);
        return (
            <state.root>
              <state.button>
                hello
              </state.button>
            </state.root>
        );
      };
      `,
      errors: [{ messageId: 'invalidJSXPragmaForClassic' }],
    },

    // no slot api used for JSX rendering + pragma present + pragma should not be specified
    {
      options: [{ runtime: 'automatic' }],
      code: `
      /** @jsxImportSource @fluentui/react-jsx-runtime */
      import { assertSlots } from '@fluentui/react-utilities';
      import type { FooState, FooContextValues, FooSlots  } from './Foo.types';
      export const renderFoo_unstable = (state: FooState, contextValues: FooContextValues) => {
        assertSlots<FooSlots>(state);
        return (
            <div>hello</div>
        );
      };
      `,
      errors: [{ messageId: 'redundantPragma' }],
    },

    // no slot api used for JSX rendering + pragma present + pragma should not be specified
    {
      options: [{ runtime: 'classic' }],
      code: `
      /** @jsxImportSource @fluentui/react-jsx-runtime */
      import { assertSlots } from '@fluentui/react-utilities';
      import type { FooState, FooContextValues, FooSlots  } from './Foo.types';
      export const renderFoo_unstable = (state: FooState, contextValues: FooContextValues) => {
        assertSlots<FooSlots>(state);
        return (
            <div>hello</div>
        );
      };
      `,
      errors: [{ messageId: 'redundantPragma' }],
    },

    // slot api (.always) used in a non conformant way +  direct JSX rendering + pragma is missing
    {
      options: [{ runtime: 'automatic' }],
      code: `
    import { slot, getIntrinsicElementProps } from '@fluentui/react-utilities';

    export const Test = (props: {}) => {
      const SlotComponent = slot.always(getIntrinsicElementProps('span', {}),{ elementType: 'span' })

      return (
          <div>
            <SlotComponent/>
          </div>
      );
    };
    `,
      errors: [{ messageId: 'missingJsxImportSource' }],
    },

    // slot api (.optional) used in a non conformant way +  direct JSX rendering + pragma is missing
    {
      options: [{ runtime: 'automatic' }],
      code: `
    import { slot, getIntrinsicElementProps } from '@fluentui/react-utilities';

    export const Test = (props: {}) => {
      const SlotComponent = slot.optional(getIntrinsicElementProps('span', {}),{ elementType: 'span' })

      return (
          <div>
            <SlotComponent/>
          </div>
      );
    };
    `,
      errors: [{ messageId: 'missingJsxImportSource' }],
    },

    // slot api (.optional,.always) used in a non conformant way +  direct JSX rendering + pragma is missing
    {
      options: [{ runtime: 'automatic' }],
      code: `
    import { slot, getIntrinsicElementProps } from '@fluentui/react-utilities';

    export const Test = (props: {}) => {
      const SlotComponent = slot.always(getIntrinsicElementProps('span', {}),{ elementType: 'span' })
      const SlotOptionalComponent = slot.optional(getIntrinsicElementProps('span', {}),{ elementType: 'span' })

      return (
          <div>
            <SlotComponent/>
            <SlotOptionalComponent/>
          </div>
      );
    };
    `,
      errors: [{ messageId: 'missingJsxImportSource' }],
    },
  ],
});
