import { RuleTester } from '@typescript-eslint/rule-tester';
import { rule, RULE_NAME } from './enforce-use-client';

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
  },
});

const testCases = {
  componentWithoutClientFeatures: `import * as React from 'react';
    export const Counter: React.FC = () => {
      return <button>Count: 0</button>;
    }
  `,
  componentWithState: `import * as React from 'react';
    export const Counter: React.FC = () => {
      const [count] = React.useState(0);
      return <button>Count: {count}</button>;
    }
  `,
  componentWithStateAndCallback: `import * as React from 'react';
    export const Counter: React.FC = () => {
      const [count, setCount] = React.useState(0);
      return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
    }
  `,
  componentWithEffect: `import * as React from 'react';
    export const Counter: React.FC = () => {
      React.useEffect(() => {
        const element = document.getElementById('counter');
        console.log(element);
      }, []);

      return <button id="counter">Count: 0</button>;
    }
  `,
  componentWithCustomHook: `import * as React from 'react';
    import { useComponentState_unstable } from './useComponentState';

    export const Counter: React.FC = (props) => {
      const state = useComponentState_unstable(props);
      return <button {...state} />;
    }
  `,
  customHook: `export const useCounterState_unstable = (props: { count: number }) => {
      const rootRef = React.useRef<HTMLButtonElement>(null);

      return {
        components: {
          root: 'button'
        },
        root: {
          ref: rootRef
        }
      };
    }
  `,
  utilityFunctions: `export const clamp = (value: number, min: number, max: number) => {
      return Math.min(Math.max(value, min), max);
    }
  `,
  utilityFunctionsWithClientFeatures: `export const dispatchCustomEvent = (eventName: string, detail: any) => {
      const event = new CustomEvent(eventName, { detail });
      document.dispatchEvent(event);
    }
  `,
  context: `import * as React from 'react';
const CounterContext = React.createContext<{ count: number, setCount: (count: number) => void }>({ count: 0, setCount: () => {} });

    export const CounterContextProvider: React.FC = ({ children }) => {
      const [count, setCount] = React.useState(0);
      return (
        <CounterContext.Provider value={{ count, setCount }}>
          {children}
        </CounterContext.Provider>
      );
    };

    export const useCounterContext = () => {
      const context = React.useContext(CounterContext);
      if (!context) {
        throw new Error('useCounterContext must be used within a CounterContextProvider');
      }
      return context;
    };
  `,
  makeStyles: `import { makeStyles } from '@griffel/react';
    export const useStyles = makeStyles({
      root: {
        backgroundColor: 'red',
      },
    });
  `,
  defaultExportComponentWithState: `import * as React from 'react';
    export default function Counter() {
      const [count] = React.useState(0);
      return <span>{count}</span>;
    }
  `,
  multipleComponentsMixed: `import * as React from 'react';
    export const StaticLabel = () => <div>Label</div>;
    export const DynamicCounter = () => { const [c] = React.useState(0); return <div>{c}</div>; };
  `,
  forwardRefComponent: `import * as React from 'react';
    export const FancyInput = React.forwardRef<HTMLInputElement, {}>((props, ref) => {
      const [value, setValue] = React.useState('');
      return <input ref={ref as any} value={value} onChange={e => setValue(e.target.value)} />;
    });
  `,
  memoComponent: `import * as React from 'react';
    const Inner = () => { const [v] = React.useState(0); return <div>{v}</div>; };
    export const Memoed = React.memo(Inner);
  `,
  destructuredHooksComponent: `import React, { useState, useEffect } from 'react';
    export const Timer = () => { const [n, setN] = useState(0); useEffect(()=>{ const id=setInterval(()=>setN(x=>x+1),1000); return ()=>clearInterval(id); },[]); return <span>{n}</span>; };
  `,
  componentWithRefOnly: `import * as React from 'react';
    export const WithRef = () => { const r = React.useRef<HTMLDivElement>(null); return <div ref={r}/>; };
  `,
  domAccessInComponentNoHooks: `import * as React from 'react';
    export const WidthReader = () => { const w = window.innerWidth; return <div>{w}</div>; };
  `,
  leadingCommentThenDirective: `// eslint-disable no-explicit-any
    "use client";
    import * as React from 'react';
    export const Lead = () => { const [x] = React.useState(0); return <span>{x}</span>; };
  `,
  directiveNotFirstStatement: `import * as React from 'react';
    "use client";
    export const Late = () => { const [x] = React.useState(0); return <span>{x}</span>; };
  `,
  directiveInCommentOnly: `// "use client"
    import * as React from 'react';
    export const Fake = () => { const [x] = React.useState(0); return <span>{x}</span>; };
  `,
  barrelReexport: `export { Counter } from './Counter';`,
  aliasImportedHookComponent: `import { useState as useSt } from 'react';
    export const AliasCounter = () => { const [n] = useSt(0); return <div>{n}</div>; };
  `,
  customHookUsingContext: `import * as React from 'react';
    const Ctx = React.createContext(0);
    export const useValue = () => { return React.useContext(Ctx); };
  `,
  customHookCallsAnother: `import * as React from 'react';
    export const useInner = () => { const r = React.useRef(null); return r; };
    export const useOuter = () => { const inner = useInner(); return inner; };
  `,
  // Additional edge case scenarios
  emptyFile: ``,
  onlyComments: `// This file only contains comments
    /* Multi-line comment */
  `,
  nestedComponents: `import * as React from 'react';
    export const Parent = () => {
      const Child = () => { const [x] = React.useState(0); return <div>{x}</div>; };
      return <div><Child /></div>;
    };
  `,
  conditionalHookUsage: `import * as React from 'react';
    export const ConditionalHooks = ({ condition }: { condition: boolean }) => {
      if (condition) {
        const [state] = React.useState(0);
        return <div>{state}</div>;
      }
      return <div>No hooks</div>;
    };
  `,
  deepNestedJSX: `import * as React from 'react';
    export const DeepNested = () => {
      const [value] = React.useState(0);
      const getValue = () => {
        return (() => {
          return <div><span>Deep JSX: {value}</span></div>;
        })();
      };
      return getValue();
    };
  `,
  mixedImports: `import React, { useState, useCallback } from 'react';
    import { makeStyles } from '@griffel/react';
    export const Mixed = () => {
      const [count] = useState(0);
      const handleClick = useCallback(() => {}, []);
      return <button onClick={handleClick}>{count}</button>;
    };
  `,
  windowObjectAccess: `export const WindowAccess = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      return <div>Size: {width}x{height}</div>;
    };
  `,
  eventHandlerInline: `import * as React from 'react';
    export const InlineHandler = () => {
      return <button onClick={(e) => console.log(e)}>Click me</button>;
    };
  `,
  genericComponent: `import * as React from 'react';
    export const GenericComponent = <T,>(props: { value: T }) => {
      const [state] = React.useState<T | null>(null);
      return <div>{String(props.value)}</div>;
    };
  `,
  higherOrderComponent: `import * as React from 'react';
    export const withState = <P extends object>(Component: React.ComponentType<P>) => {
      return (props: P) => {
        const [loading, setLoading] = React.useState(false);
        return <Component {...props} loading={loading} />;
      };
    };
  `,
  reactImportVariants: `import { createElement } from 'react';
    import { useEffect as useEff } from 'react';
    export const ImportVariants = () => {
      useEff(() => {}, []);
      return createElement('div', null, 'Hello');
    };
  `,
  componentWithExplicitJSXType: `import * as React from 'react';
    export const TypedComponent = (): JSXElement => {
      const [count] = React.useState(0);
      return <div>{count}</div>;
    };
  `,
  componentWithReactElementType: `import * as React from 'react';
    export const ReactElementComponent = (): ReactElement => {
      return <span>Hello</span>;
    };
  `,
  componentWithUnionType: `import * as React from 'react';
    export const UnionTypeComponent = (): JSXElement | null => {
      const [show] = React.useState(true);
      return show ? <div>Content</div> : null;
    };
  `,
};

ruleTester.run(RULE_NAME, rule, {
  valid: [
    {
      name: 'Component with no client-side features',
      code: testCases.componentWithoutClientFeatures,
    },
    {
      name: 'Component with client-side features (state) and "use client" directive',
      code: `"use client";\n${testCases.componentWithState}`,
    },
    {
      name: 'Component with state + callback and "use client" directive',
      code: `"use client";\n${testCases.componentWithStateAndCallback}`,
    },
    {
      name: 'Component with effect and "use client" directive',
      code: `"use client";\n${testCases.componentWithEffect}`,
    },
    {
      name: 'Component with custom hook and "use client" directive',
      code: `"use client";\n${testCases.componentWithCustomHook}`,
    },
    {
      name: 'Custom hook with client features and "use client" directive',
      code: `"use client";\nimport * as React from 'react';\n${testCases.customHook}`,
    },
    {
      name: 'Utility functions without client features (no directive needed)',
      code: testCases.utilityFunctions,
    },
    {
      name: 'Utility functions with client features and "use client" directive',
      code: `"use client";\n${testCases.utilityFunctionsWithClientFeatures}`,
    },
    {
      name: 'Context provider with client features and "use client" directive',
      code: `"use client";\n${testCases.context}`,
    },
    {
      name: 'makeStyles usage without client features (no directive needed)',
      code: testCases.makeStyles,
    },
    {
      name: 'Default export component with state and directive',
      code: `"use client";\n${testCases.defaultExportComponentWithState}`,
    },
    {
      name: 'Multiple components mixed with directive',
      code: `"use client";\n${testCases.multipleComponentsMixed}`,
    },
    {
      name: 'forwardRef component with directive',
      code: `"use client";\n${testCases.forwardRefComponent}`,
    },
    {
      name: 'memo component with directive',
      code: `"use client";\n${testCases.memoComponent}`,
    },
    {
      name: 'Destructured imported hooks with directive',
      code: `"use client";\n${testCases.destructuredHooksComponent}`,
    },
    {
      name: 'Component with only useRef and directive',
      code: `"use client";\n${testCases.componentWithRefOnly}`,
    },
    {
      name: 'Component using DOM API only with directive',
      code: `"use client";\n${testCases.domAccessInComponentNoHooks}`,
    },
    {
      name: 'Leading comment then directive',
      code: testCases.leadingCommentThenDirective,
    },
    {
      name: 'Barrel re-export only (no directive needed)',
      code: testCases.barrelReexport,
    },
    {
      name: 'Alias imported hook with directive',
      code: `"use client";\n${testCases.aliasImportedHookComponent}`,
    },
    {
      name: 'Custom hook using context with directive',
      code: `"use client";\n${testCases.customHookUsingContext}`,
    },
    {
      name: 'Custom hook calling another hook with directive',
      code: `"use client";\n${testCases.customHookCallsAnother}`,
    },
    {
      name: 'Empty file (no directive needed)',
      code: testCases.emptyFile,
    },
    {
      name: 'File with only comments (no directive needed)',
      code: testCases.onlyComments,
    },
    {
      name: 'Nested components with directive',
      code: `"use client";\n${testCases.nestedComponents}`,
    },
    {
      name: 'Mixed imports with directive',
      code: `"use client";\n${testCases.mixedImports}`,
    },
    {
      name: 'Window object access with directive',
      code: `"use client";\n${testCases.windowObjectAccess}`,
    },
    {
      name: 'Event handler inline with directive',
      code: `"use client";\n${testCases.eventHandlerInline}`,
    },
    {
      name: 'Generic component with directive',
      code: `"use client";\n${testCases.genericComponent}`,
    },
    {
      name: 'Higher order component with directive',
      code: `"use client";\n${testCases.higherOrderComponent}`,
    },
    {
      name: 'React import variants with directive',
      code: `"use client";\n${testCases.reactImportVariants}`,
    },
    {
      name: 'Component with explicit JSX type annotation and directive',
      code: `"use client";\n${testCases.componentWithExplicitJSXType}`,
    },
    {
      name: 'Component with ReactElement type annotation and directive',
      code: `"use client";\n${testCases.componentWithReactElementType}`,
    },
    {
      name: 'Component with union type annotation and directive',
      code: `"use client";\n${testCases.componentWithUnionType}`,
    },
    {
      name: 'Component with ReactElement type annotation only (no client features)',
      code: testCases.componentWithReactElementType,
    },
  ],
  invalid: [
    {
      name: "Component with client-side features (state) and no 'use client' directive",
      code: testCases.componentWithState,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentWithState}`,
    },
    {
      name: "Component with state + callback and no 'use client' directive",
      code: testCases.componentWithStateAndCallback,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentWithStateAndCallback}`,
    },
    {
      name: "Component with effect and no 'use client' directive",
      code: testCases.componentWithEffect,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentWithEffect}`,
    },
    {
      name: "Component with custom hook and no 'use client' directive",
      code: testCases.componentWithCustomHook,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentWithCustomHook}`,
    },
    {
      name: "Custom hook with client features and no 'use client' directive",
      code: `import * as React from 'react';\n${testCases.customHook}`,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nimport * as React from 'react';\n${testCases.customHook}`,
    },
    {
      name: "Utility functions with client features and no 'use client' directive",
      code: testCases.utilityFunctionsWithClientFeatures,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.utilityFunctionsWithClientFeatures}`,
    },
    {
      name: "Context provider with client features and no 'use client' directive",
      code: testCases.context,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.context}`,
    },
    {
      name: "Default export component with state and no 'use client' directive",
      code: testCases.defaultExportComponentWithState,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.defaultExportComponentWithState}`,
    },
    {
      name: 'Multiple components mixed (one dynamic) no directive',
      code: testCases.multipleComponentsMixed,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.multipleComponentsMixed}`,
    },
    {
      name: 'forwardRef component no directive',
      code: testCases.forwardRefComponent,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.forwardRefComponent}`,
    },
    {
      name: 'memo component no directive',
      code: testCases.memoComponent,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.memoComponent}`,
    },
    {
      name: 'Destructured imported hooks no directive',
      code: testCases.destructuredHooksComponent,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.destructuredHooksComponent}`,
    },
    {
      name: 'Component with only useRef no directive',
      code: testCases.componentWithRefOnly,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentWithRefOnly}`,
    },
    {
      name: 'DOM API usage in component no directive',
      code: testCases.domAccessInComponentNoHooks,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nimport * as React from 'react';\n    export const WidthReader = () => { const w = window.innerWidth; return <div>{w}</div>; };\n  `,
    },
    {
      name: 'Directive not first statement',
      code: testCases.directiveNotFirstStatement,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nimport * as React from 'react';\n    \n    export const Late = () => { const [x] = React.useState(0); return <span>{x}</span>; };\n  `,
    },
    {
      name: 'Directive appears only in comment',
      code: testCases.directiveInCommentOnly,
      errors: [{ messageId: 'missingUseClient' }],
      output: `// "use client"\n    "use client";\nimport * as React from 'react';\n    export const Fake = () => { const [x] = React.useState(0); return <span>{x}</span>; };\n  `,
    },
    {
      name: 'Alias imported hook no directive',
      code: testCases.aliasImportedHookComponent,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.aliasImportedHookComponent}`,
    },
    {
      name: 'Custom hook using context no directive',
      code: testCases.customHookUsingContext,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.customHookUsingContext}`,
    },
    {
      name: 'Custom hook calling another custom hook no directive',
      code: testCases.customHookCallsAnother,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nimport * as React from 'react';\n    export const useInner = () => { const r = React.useRef(null); return r; };\n    export const useOuter = () => { const inner = useInner(); return inner; };\n  `,
    },
    {
      name: 'Nested components no directive',
      code: testCases.nestedComponents,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.nestedComponents}`,
    },
    {
      name: 'Conditional hook usage no directive',
      code: testCases.conditionalHookUsage,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.conditionalHookUsage}`,
    },
    {
      name: 'Deep nested JSX no directive',
      code: testCases.deepNestedJSX,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nimport * as React from 'react';\n    export const DeepNested = () => {\n      const [value] = React.useState(0);\n      const getValue = () => {\n        return (() => {\n          return <div><span>Deep JSX: {value}</span></div>;\n        })();\n      };\n      return getValue();\n    };\n  `,
    },
    {
      name: 'Mixed imports no directive',
      code: testCases.mixedImports,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nimport React, { useState, useCallback } from 'react';\n    import { makeStyles } from '@griffel/react';\n    export const Mixed = () => {\n      const [count] = useState(0);\n      const handleClick = useCallback(() => {}, []);\n      return <button onClick={handleClick}>{count}</button>;\n    };\n  `,
    },
    {
      name: 'Window object access no directive',
      code: testCases.windowObjectAccess,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nexport const WindowAccess = () => {\n      const width = window.innerWidth;\n      const height = window.innerHeight;\n      return <div>Size: {width}x{height}</div>;\n    };\n  `,
    },
    {
      name: 'Event handler inline no directive',
      code: testCases.eventHandlerInline,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nimport * as React from 'react';\n    export const InlineHandler = () => {\n      return <button onClick={(e) => console.log(e)}>Click me</button>;\n    };\n  `,
    },
    {
      name: 'Generic component no directive',
      code: testCases.genericComponent,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nimport * as React from 'react';\n    export const GenericComponent = <T,>(props: { value: T }) => {\n      const [state] = React.useState<T | null>(null);\n      return <div>{String(props.value)}</div>;\n    };\n  `,
    },
    {
      name: 'Higher order component no directive',
      code: testCases.higherOrderComponent,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nimport * as React from 'react';\n    export const withState = <P extends object>(Component: React.ComponentType<P>) => {\n      return (props: P) => {\n        const [loading, setLoading] = React.useState(false);\n        return <Component {...props} loading={loading} />;\n      };\n    };\n  `,
    },
    {
      name: 'React import variants no directive',
      code: testCases.reactImportVariants,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.reactImportVariants}`,
    },
    {
      name: 'Component with explicit JSX type annotation no directive',
      code: testCases.componentWithExplicitJSXType,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentWithExplicitJSXType}`,
    },
    {
      name: 'Component with union type annotation no directive',
      code: testCases.componentWithUnionType,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentWithUnionType}`,
    },
  ],
});
