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

export const testCases = {
  // =============================================================================
  // BASIC REACT HOOKS - Core hooks that require client-side execution
  // =============================================================================
  basicReactHooks: {
    useState: `import * as React from 'react';
      export const Counter: React.FC = () => {
        const [count] = React.useState(0);
        return <button>Count: {count}</button>;
      }
    `,
    useEffect: `import * as React from 'react';
      export const Counter: React.FC = () => {
        React.useEffect(() => {
          const element = document.getElementById('counter');
          console.log(element);
        }, []);
        return <button id="counter">Count: 0</button>;
      }
    `,
    useRef: `import * as React from 'react';
      export const WithRef = () => {
        const r = React.useRef<HTMLDivElement>(null);
        return <div ref={r}/>;
      };
    `,
    useCallback: `import React, { useState, useCallback } from 'react';
      export const Mixed = () => {
        const [count] = useState(0);
        const handleClick = useCallback(() => {}, []);
        return <button onClick={handleClick}>{count}</button>;
      };
    `,
    useMemo: `import * as React from 'react';
      export const MemoComponent = () => {
        const [count] = React.useState(0);
        const doubled = React.useMemo(() => count * 2, [count]);
        return <div>{doubled}</div>;
      };
    `,
    useReducer: `import * as React from 'react';
      export const ReducerComponent = () => {
        const [state, dispatch] = React.useReducer(reducer, initialState);
        return <div>{state}</div>;
      };
    `,
    useContext: `import * as React from 'react';
      const Ctx = React.createContext(0);
      export const useValue = () => {
        return React.useContext(Ctx);
      };
    `,
  },

  // =============================================================================
  // ADVANCED REACT HOOKS - Specialized and React 19 hooks
  // =============================================================================
  advancedReactHooks: {
    useImperativeHandle: `import * as React from 'react';
      export const ImperativeComponent = React.forwardRef((props, ref) => {
        const inputRef = React.useRef();
        React.useImperativeHandle(ref, () => ({
          focus: () => inputRef.current.focus(),
        }));
        return <input ref={inputRef} />;
      });
    `,
    useSyncExternalStore: `import * as React from 'react';
      export const ExternalStoreComponent = () => {
        const value = React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
        return <div>{value}</div>;
      };
    `,
    useInsertionEffect: `import * as React from 'react';
      export const InsertionEffectComponent = () => {
        React.useInsertionEffect(() => {
          // Insert styles
        }, []);
        return <div>Styled</div>;
      };
    `,
    useDebugValue: `import * as React from 'react';
      export const useDebugComponent = () => {
        const [value] = React.useState(0);
        React.useDebugValue(value > 5 ? 'High' : 'Low');
        return value;
      };
    `,
    useTransition: `import * as React from 'react';
      export const TransitionComponent = () => {
        const [isPending, startTransition] = React.useTransition();
        const deferredValue = React.useDeferredValue(someValue);
        const handleClick = () => {
          React.startTransition(() => {
            // Some transition
          });
        };
        return <button onClick={handleClick}>Transition</button>;
      };
    `,
    useActionState: `import * as React from 'react';
      export const React19Component = () => {
        const [state, action] = React.useActionState(reducer, initialState);
        const [optimisticValue] = React.useOptimistic(state, updateFn);
        return <div>{optimisticValue}</div>;
      };
    `,
  },

  // =============================================================================
  // SERVER-SAFE HOOKS - Hooks that can run on server and don't need 'use client'
  // =============================================================================
  serverSafeHooks: {
    useIdAndUse: `import * as React from 'react';
      export const ServerSafeComponent = () => {
        const id = React.useId();
        const value = React.use(promise);
        return <div id={id}>{value}</div>;
      };
    `,
  },

  // =============================================================================
  // BROWSER APIS - Global objects that require client-side execution
  // =============================================================================
  browserApis: {
    basicWindowAccess: `export const WidthReader = () => {
      const w = window.innerWidth;
      return <div>{w}</div>;
    };`,
    documentAccess: `export const dispatchCustomEvent = (eventName: string, detail: any) => {
      const event = new CustomEvent(eventName, { detail });
      document.dispatchEvent(event);
    }`,
    multipleApis: `export const AdvancedBrowser = () => {
      const cookies = navigator.cookieEnabled;
      const storage = localStorage.getItem('key');
      const session = sessionStorage.setItem('key', 'value');
      const loc = location.href;
      const hist = history.pushState({}, '', '/new-url');
      return <div>{cookies ? 'enabled' : 'disabled'}</div>;
    };`,
    nestedAccess: `export const NestedBrowserAccess = () => {
      const userAgent = navigator.userAgent.toLowerCase();
      const protocol = window.location.protocol;
      const title = document.title.trim();
      return { userAgent, protocol, title };
    };`,
  },

  // =============================================================================
  // EVENT HANDLERS - JSX event attributes that require client-side execution
  // =============================================================================
  eventHandlers: {
    singleHandler: `import * as React from 'react';
      export const InlineHandler = () => {
        return <button onClick={(e) => console.log(e)}>Click me</button>;
      };
    `,
    multipleHandlers: `import * as React from 'react';
      export const MultiEventComponent = () => {
        return (
          <form onSubmit={() => {}} onReset={() => {}}>
            <input onChange={() => {}} onFocus={() => {}} onBlur={() => {}} />
            <button onMouseEnter={() => {}} onMouseLeave={() => {}} onKeyDown={() => {}}>
              Submit
            </button>
          </form>
        );
      };
    `,
  },

  // =============================================================================
  // REACT APIS - Context, forwardRef, memo, etc.
  // =============================================================================
  reactApis: {
    createContext: `import * as React from 'react';
      const CounterContext = React.createContext<{ count: number, setCount: (count: number) => void }>({ count: 0, setCount: () => {} });
      export const CounterContextProvider: React.FC = ({ children }) => {
        const [count, setCount] = React.useState(0);
        return (
          <CounterContext.Provider value={{ count, setCount }}>
            {children}
          </CounterContext.Provider>
        );
      };
    `,
    forwardRef: `import * as React from 'react';
      export const FancyInput = React.forwardRef<HTMLInputElement, {}>((props, ref) => {
        const [value, setValue] = React.useState('');
        return <input ref={ref as any} value={value} onChange={e => setValue(e.target.value)} />;
      });
    `,
    memo: `import * as React from 'react';
      const Inner = () => { const [v] = React.useState(0); return <div>{v}</div>; };
      export const Memoed = React.memo(Inner);
    `,
  },

  // =============================================================================
  // CUSTOM HOOKS - User-defined hooks that use client-side features
  // =============================================================================
  customHooks: {
    basicCustomHook: `export const useCounterState_unstable = (props: { count: number }) => {
      const rootRef = React.useRef<HTMLButtonElement>(null);
      return {
        components: { root: 'button' },
        root: { ref: rootRef }
      };
    }`,
    nestedCustomHook: `import * as React from 'react';
      export const useInner = () => { const r = React.useRef(null); return r; };
      export const useOuter = () => { const inner = useInner(); return inner; };
    `,
    customHookWithContext: `import * as React from 'react';
      export const useComponentState_unstable = (props) => {
        const state = React.useState(0);
        return state;
      };
    `,
  },

  // =============================================================================
  // PURE COMPONENTS - Components without client-side features
  // =============================================================================
  pureComponents: {
    basicComponent: `import * as React from 'react';
      export const Counter: React.FC = () => {
        return <button>Count: 0</button>;
      }
    `,
    withTypeAnnotations: `import * as React from 'react';
      export const ReactElementComponent = (): ReactElement => {
        return <span>Hello</span>;
      };
    `,
    defaultExport: `import * as React from 'react';
      export default function Counter() {
        return <span>Static content</span>;
      }
    `,
  },

  // =============================================================================
  // IMPORT VARIATIONS - Different ways to import React hooks
  // =============================================================================
  importVariations: {
    destructured: `import React, { useState, useEffect } from 'react';
      export const Timer = () => {
        const [n, setN] = useState(0);
        useEffect(()=>{
          const id=setInterval(()=>setN(x=>x+1),1000);
          return ()=>clearInterval(id);
        },[]);
        return <span>{n}</span>;
      };
    `,
    aliased: `import { useState as useSt } from 'react';
      export const AliasCounter = () => {
        const [n] = useSt(0);
        return <div>{n}</div>;
      };
    `,
    mixed: `import { createElement } from 'react';
      import { useEffect as useEff } from 'react';
      export const ImportVariants = () => {
        useEff(() => {}, []);
        return createElement('div', null, 'Hello');
      };
    `,
  },

  // =============================================================================
  // COMPONENT PATTERNS - HOCs, generics, nested components
  // =============================================================================
  componentPatterns: {
    higherOrderComponent: `import * as React from 'react';
      export const withState = <P extends object>(Component: React.ComponentType<P>) => {
        return (props: P) => {
          const [loading, setLoading] = React.useState(false);
          return <Component {...props} loading={loading} />;
        };
      };
    `,
    genericComponent: `import * as React from 'react';
      export const GenericComponent = <T,>(props: { value: T }) => {
        const [state] = React.useState<T | null>(null);
        return <div>{String(props.value)}</div>;
      };
    `,
    nestedComponent: `import * as React from 'react';
      export const Parent = () => {
        const Child = () => { const [x] = React.useState(0); return <div>{x}</div>; };
        return <div><Child /></div>;
      };
    `,
    conditionalHooks: `import * as React from 'react';
      export const ConditionalHooks = ({ condition }: { condition: boolean }) => {
        if (condition) {
          const [state] = React.useState(0);
          return <div>{state}</div>;
        }
        return <div>No hooks</div>;
      };
    `,
  },

  // =============================================================================
  // UTILITY FUNCTIONS - Non-component code
  // =============================================================================
  utilities: {
    pureFunctions: `export const clamp = (value: number, min: number, max: number) => {
      return Math.min(Math.max(value, min), max);
    }`,
    stylingUtilities: `import { makeStyles } from '@griffel/react';
      export const useStyles = makeStyles({
        root: { backgroundColor: 'red' },
      });
    `,
    barrelExports: `export { Counter } from './Counter';`,
  },

  // =============================================================================
  // EDGE CASES - Empty files, comments, directive positioning
  // =============================================================================
  edgeCases: {
    emptyFile: ``,
    commentsOnly: `// This file only contains comments
      /* Multi-line comment */
    `,
    leadingCommentThenDirective: `// eslint-disable no-explicit-any
      "use client";
      import * as React from 'react';
      export const Lead = () => { const [x] = React.useState(0); return <span>{x}</span>; };
    `,
    directiveNotFirst: `import * as React from 'react';
      "use client";
      export const Late = () => { const [x] = React.useState(0); return <span>{x}</span>; };
    `,
    directiveInComment: `// "use client"
      import * as React from 'react';
      export const Fake = () => { const [x] = React.useState(0); return <span>{x}</span>; };
    `,
  },
};

ruleTester.run(RULE_NAME, rule, {
  valid: [
    // =============================================================================
    // PURE COMPONENTS - No client-side features, no directive needed
    // =============================================================================
    {
      name: 'Pure component with no client-side features',
      code: testCases.pureComponents.basicComponent,
    },
    {
      name: 'Component with type annotations only (no client features)',
      code: testCases.pureComponents.withTypeAnnotations,
    },
    {
      name: 'Default export component without client features',
      code: testCases.pureComponents.defaultExport,
    },

    // =============================================================================
    // SERVER-SAFE HOOKS - Can run on server, no directive needed
    // =============================================================================
    {
      name: 'Server-safe hooks only (useId, use) - no directive needed',
      code: testCases.serverSafeHooks.useIdAndUse,
    },

    // =============================================================================
    // UTILITY FUNCTIONS - Non-component code without client features
    // =============================================================================
    {
      name: 'Pure utility functions - no directive needed',
      code: testCases.utilities.pureFunctions,
    },
    {
      name: 'Styling utilities (makeStyles) - no directive needed',
      code: testCases.utilities.stylingUtilities,
    },
    {
      name: 'Barrel re-exports - no directive needed',
      code: testCases.utilities.barrelExports,
    },

    // =============================================================================
    // EDGE CASES - Empty files and comments
    // =============================================================================
    {
      name: 'Empty file - no directive needed',
      code: testCases.edgeCases.emptyFile,
    },
    {
      name: 'File with only comments - no directive needed',
      code: testCases.edgeCases.commentsOnly,
    },
    {
      name: 'Leading comment then directive (correctly positioned)',
      code: testCases.edgeCases.leadingCommentThenDirective,
    },

    // =============================================================================
    // BASIC REACT HOOKS - With directive (correct usage)
    // =============================================================================
    {
      name: 'useState with "use client" directive',
      code: `"use client";\n${testCases.basicReactHooks.useState}`,
    },
    {
      name: 'useEffect with "use client" directive',
      code: `"use client";\n${testCases.basicReactHooks.useEffect}`,
    },
    {
      name: 'useRef with "use client" directive',
      code: `"use client";\n${testCases.basicReactHooks.useRef}`,
    },
    {
      name: 'useCallback with "use client" directive',
      code: `"use client";\n${testCases.basicReactHooks.useCallback}`,
    },
    {
      name: 'useMemo with "use client" directive',
      code: `"use client";\n${testCases.basicReactHooks.useMemo}`,
    },
    {
      name: 'useReducer with "use client" directive',
      code: `"use client";\n${testCases.basicReactHooks.useReducer}`,
    },
    {
      name: 'useContext with "use client" directive',
      code: `"use client";\n${testCases.basicReactHooks.useContext}`,
    },

    // =============================================================================
    // ADVANCED REACT HOOKS - With directive (correct usage)
    // =============================================================================
    {
      name: 'useImperativeHandle with "use client" directive',
      code: `"use client";\n${testCases.advancedReactHooks.useImperativeHandle}`,
    },
    {
      name: 'useSyncExternalStore with "use client" directive',
      code: `"use client";\n${testCases.advancedReactHooks.useSyncExternalStore}`,
    },
    {
      name: 'useInsertionEffect with "use client" directive',
      code: `"use client";\n${testCases.advancedReactHooks.useInsertionEffect}`,
    },
    {
      name: 'useDebugValue with "use client" directive',
      code: `"use client";\n${testCases.advancedReactHooks.useDebugValue}`,
    },
    {
      name: 'useTransition/useDeferredValue with "use client" directive',
      code: `"use client";\n${testCases.advancedReactHooks.useTransition}`,
    },
    {
      name: 'React 19 hooks (useActionState/useOptimistic) with "use client" directive',
      code: `"use client";\n${testCases.advancedReactHooks.useActionState}`,
    },

    // =============================================================================
    // BROWSER APIS - With directive (correct usage)
    // =============================================================================
    {
      name: 'Basic window access with "use client" directive',
      code: `"use client";\n${testCases.browserApis.basicWindowAccess}`,
    },
    {
      name: 'Document access with "use client" directive',
      code: `"use client";\n${testCases.browserApis.documentAccess}`,
    },
    {
      name: 'Multiple browser APIs with "use client" directive',
      code: `"use client";\n${testCases.browserApis.multipleApis}`,
    },
    {
      name: 'Nested browser API access with "use client" directive',
      code: `"use client";\n${testCases.browserApis.nestedAccess}`,
    },

    // =============================================================================
    // EVENT HANDLERS - With directive (correct usage)
    // =============================================================================
    {
      name: 'Single event handler with "use client" directive',
      code: `"use client";\n${testCases.eventHandlers.singleHandler}`,
    },
    {
      name: 'Multiple event handlers with "use client" directive',
      code: `"use client";\n${testCases.eventHandlers.multipleHandlers}`,
    },

    // =============================================================================
    // REACT APIS - With directive (correct usage)
    // =============================================================================
    {
      name: 'createContext with "use client" directive',
      code: `"use client";\n${testCases.reactApis.createContext}`,
    },
    {
      name: 'forwardRef with "use client" directive',
      code: `"use client";\n${testCases.reactApis.forwardRef}`,
    },
    {
      name: 'memo with "use client" directive',
      code: `"use client";\n${testCases.reactApis.memo}`,
    },

    // =============================================================================
    // CUSTOM HOOKS - With directive (correct usage)
    // =============================================================================
    {
      name: 'Basic custom hook with "use client" directive',
      code: `"use client";\nimport * as React from 'react';\n${testCases.customHooks.basicCustomHook}`,
    },
    {
      name: 'Nested custom hooks with "use client" directive',
      code: `"use client";\n${testCases.customHooks.nestedCustomHook}`,
    },
    {
      name: 'Custom hook with context with "use client" directive',
      code: `"use client";\n${testCases.customHooks.customHookWithContext}`,
    },

    // =============================================================================
    // IMPORT VARIATIONS - With directive (correct usage)
    // =============================================================================
    {
      name: 'Destructured imports with "use client" directive',
      code: `"use client";\n${testCases.importVariations.destructured}`,
    },
    {
      name: 'Aliased imports with "use client" directive',
      code: `"use client";\n${testCases.importVariations.aliased}`,
    },
    {
      name: 'Mixed imports with "use client" directive',
      code: `"use client";\n${testCases.importVariations.mixed}`,
    },

    // =============================================================================
    // COMPONENT PATTERNS - With directive (correct usage)
    // =============================================================================
    {
      name: 'Higher order component with "use client" directive',
      code: `"use client";\n${testCases.componentPatterns.higherOrderComponent}`,
    },
    {
      name: 'Generic component with "use client" directive',
      code: `"use client";\n${testCases.componentPatterns.genericComponent}`,
    },
    {
      name: 'Nested components with "use client" directive',
      code: `"use client";\n${testCases.componentPatterns.nestedComponent}`,
    },
    {
      name: 'Conditional hooks with "use client" directive',
      code: `"use client";\n${testCases.componentPatterns.conditionalHooks}`,
    },
  ],

  invalid: [
    // =============================================================================
    // BASIC REACT HOOKS - Missing directive (should error)
    // =============================================================================
    {
      name: 'useState without "use client" directive',
      code: testCases.basicReactHooks.useState,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.basicReactHooks.useState}`,
    },
    {
      name: 'useEffect without "use client" directive',
      code: testCases.basicReactHooks.useEffect,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.basicReactHooks.useEffect}`,
    },
    {
      name: 'useRef without "use client" directive',
      code: testCases.basicReactHooks.useRef,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.basicReactHooks.useRef}`,
    },
    {
      name: 'useCallback without "use client" directive',
      code: testCases.basicReactHooks.useCallback,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.basicReactHooks.useCallback}`,
    },
    {
      name: 'useMemo without "use client" directive',
      code: testCases.basicReactHooks.useMemo,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.basicReactHooks.useMemo}`,
    },
    {
      name: 'useReducer without "use client" directive',
      code: testCases.basicReactHooks.useReducer,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.basicReactHooks.useReducer}`,
    },
    {
      name: 'useContext without "use client" directive',
      code: testCases.basicReactHooks.useContext,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.basicReactHooks.useContext}`,
    },

    // =============================================================================
    // ADVANCED REACT HOOKS - Missing directive (should error)
    // =============================================================================
    {
      name: 'useImperativeHandle without "use client" directive',
      code: testCases.advancedReactHooks.useImperativeHandle,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.advancedReactHooks.useImperativeHandle}`,
    },
    {
      name: 'useSyncExternalStore without "use client" directive',
      code: testCases.advancedReactHooks.useSyncExternalStore,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.advancedReactHooks.useSyncExternalStore}`,
    },
    {
      name: 'useInsertionEffect without "use client" directive',
      code: testCases.advancedReactHooks.useInsertionEffect,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.advancedReactHooks.useInsertionEffect}`,
    },
    {
      name: 'useDebugValue without "use client" directive',
      code: testCases.advancedReactHooks.useDebugValue,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.advancedReactHooks.useDebugValue}`,
    },
    {
      name: 'useTransition/useDeferredValue without "use client" directive',
      code: testCases.advancedReactHooks.useTransition,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.advancedReactHooks.useTransition}`,
    },
    {
      name: 'React 19 hooks without "use client" directive',
      code: testCases.advancedReactHooks.useActionState,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.advancedReactHooks.useActionState}`,
    },

    // =============================================================================
    // BROWSER APIS - Missing directive (should error)
    // =============================================================================
    {
      name: 'Window access without "use client" directive',
      code: testCases.browserApis.basicWindowAccess,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.browserApis.basicWindowAccess}`,
    },
    {
      name: 'Document access without "use client" directive',
      code: testCases.browserApis.documentAccess,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.browserApis.documentAccess}`,
    },
    {
      name: 'Multiple browser APIs without "use client" directive',
      code: testCases.browserApis.multipleApis,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.browserApis.multipleApis}`,
    },
    {
      name: 'Nested browser API access without "use client" directive',
      code: testCases.browserApis.nestedAccess,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.browserApis.nestedAccess}`,
    },

    // =============================================================================
    // EVENT HANDLERS - Missing directive (should error)
    // =============================================================================
    {
      name: 'Single event handler without "use client" directive',
      code: testCases.eventHandlers.singleHandler,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.eventHandlers.singleHandler}`,
    },
    {
      name: 'Multiple event handlers without "use client" directive',
      code: testCases.eventHandlers.multipleHandlers,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.eventHandlers.multipleHandlers}`,
    },

    // =============================================================================
    // REACT APIS - Missing directive (should error)
    // =============================================================================
    {
      name: 'createContext without "use client" directive',
      code: testCases.reactApis.createContext,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.reactApis.createContext}`,
    },
    {
      name: 'forwardRef without "use client" directive',
      code: testCases.reactApis.forwardRef,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.reactApis.forwardRef}`,
    },
    {
      name: 'memo without "use client" directive',
      code: testCases.reactApis.memo,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.reactApis.memo}`,
    },

    // =============================================================================
    // CUSTOM HOOKS - Missing directive (should error)
    // =============================================================================
    {
      name: 'Basic custom hook without "use client" directive',
      code: `import * as React from 'react';\n${testCases.customHooks.basicCustomHook}`,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\nimport * as React from 'react';\n${testCases.customHooks.basicCustomHook}`,
    },
    {
      name: 'Nested custom hooks without "use client" directive',
      code: testCases.customHooks.nestedCustomHook,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.customHooks.nestedCustomHook}`,
    },
    {
      name: 'Custom hook with context without "use client" directive',
      code: testCases.customHooks.customHookWithContext,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.customHooks.customHookWithContext}`,
    },

    // =============================================================================
    // IMPORT VARIATIONS - Missing directive (should error)
    // =============================================================================
    {
      name: 'Destructured imports without "use client" directive',
      code: testCases.importVariations.destructured,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.importVariations.destructured}`,
    },
    {
      name: 'Aliased imports without "use client" directive',
      code: testCases.importVariations.aliased,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.importVariations.aliased}`,
    },
    {
      name: 'Mixed imports without "use client" directive',
      code: testCases.importVariations.mixed,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.importVariations.mixed}`,
    },

    // =============================================================================
    // COMPONENT PATTERNS - Missing directive (should error)
    // =============================================================================
    {
      name: 'Higher order component without "use client" directive',
      code: testCases.componentPatterns.higherOrderComponent,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentPatterns.higherOrderComponent}`,
    },
    {
      name: 'Generic component without "use client" directive',
      code: testCases.componentPatterns.genericComponent,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentPatterns.genericComponent}`,
    },
    {
      name: 'Nested components without "use client" directive',
      code: testCases.componentPatterns.nestedComponent,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentPatterns.nestedComponent}`,
    },
    {
      name: 'Conditional hooks without "use client" directive',
      code: testCases.componentPatterns.conditionalHooks,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.componentPatterns.conditionalHooks}`,
    },

    // =============================================================================
    // UNNECESSARY DIRECTIVE - Has directive but no client features (should error)
    // =============================================================================
    {
      name: 'Pure component with unnecessary "use client" directive',
      code: `"use client";\n${testCases.pureComponents.basicComponent}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.pureComponents.basicComponent,
    },
    {
      name: 'Component with type annotations has unnecessary "use client" directive',
      code: `"use client";\n${testCases.pureComponents.withTypeAnnotations}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.pureComponents.withTypeAnnotations,
    },
    {
      name: 'Pure utility functions with unnecessary "use client" directive',
      code: `"use client";\n${testCases.utilities.pureFunctions}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.utilities.pureFunctions,
    },
    {
      name: 'Styling utilities with unnecessary "use client" directive',
      code: `"use client";\n${testCases.utilities.stylingUtilities}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.utilities.stylingUtilities,
    },
    {
      name: 'Barrel exports with unnecessary "use client" directive',
      code: `"use client";\n${testCases.utilities.barrelExports}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.utilities.barrelExports,
    },
    {
      name: 'Empty file with unnecessary "use client" directive',
      code: `"use client";\n${testCases.edgeCases.emptyFile}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.edgeCases.emptyFile,
    },
    {
      name: 'File with only comments has unnecessary "use client" directive',
      code: `"use client";\n${testCases.edgeCases.commentsOnly}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.edgeCases.commentsOnly,
    },
    {
      name: 'Server-safe hooks with unnecessary "use client" directive',
      code: `"use client";\n${testCases.serverSafeHooks.useIdAndUse}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.serverSafeHooks.useIdAndUse,
    },
  ],
});
