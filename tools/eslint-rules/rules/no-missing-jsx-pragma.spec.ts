import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './no-missing-jsx-pragma';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true } },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
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
    {
      options: [{ runtime: 'classic' }],
      code: `
    /** @jsx createElement */
    import { createElement } from './some/local/factory';
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
    // =====================================================================================
    // using slot.* apis via direct JSX rendering - anti-pattern in v9 framework composition
    // =====================================================================================
    {
      options: [{ runtime: 'automatic' }],
      code: `
    import { slot, getIntrinsicElementProps } from '@fluentui/react-utilities';

    export const factory = (props: {}) => {
      const SlotComponent = slot.always(getIntrinsicElementProps('span', {}),{ elementType: 'span' })
      const InlineCmp = () => <div>inline</div>

      return {SlotComponent,InlineCmp}
    };
    `,
    },
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
  ],
  invalid: [
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
    // =====================================================================================
    // using slot.* apis via direct JSX rendering - anti-pattern in v9 framework composition
    // =====================================================================================
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
