import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './no-missing-jsx-pragma';

const ruleTester = new RuleTester({
  parser: '@typescript-eslint/parser',
  parserOptions: { ecmaFeatures: { jsx: true } },
});

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
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
    {
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
  ],
  invalid: [
    {
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

      errors: [{ messageId: 'missingPragma' }],
    },
    {
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
  ],
});
