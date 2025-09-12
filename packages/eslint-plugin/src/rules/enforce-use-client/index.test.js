// @ts-check
const { RuleTester } = require('@typescript-eslint/rule-tester');
const rule = require('./index');

const ruleTester = new RuleTester({
  languageOptions: {
    parserOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      ecmaFeatures: { jsx: true },
    },
  },
});

// Test cases for different types of client-side features
const testCases = {
  basicReactHooks: {
    useState: `import * as React from 'react';
      export const Counter: React.FC = () => {
        const [count] = React.useState(0);
        return <button>Count: {count}</button>;
      }`,
    useEffect: `import * as React from 'react';
      export const Counter: React.FC = () => {
        React.useEffect(() => {
          console.log('effect');
        }, []);
        return <button>Count: 0</button>;
      }`,
    useRef: `import * as React from 'react';
      export const WithRef = () => {
        const r = React.useRef(null);
        return <div ref={r}/>;
      };`,
  },
  browserApis: {
    basicWindowAccess: `export const getWindowHeight = () => {
        return window.innerHeight;
      };`,
    documentAccess: `export const getElementById = (id: string) => {
        return document.getElementById(id);
      };`,
    multipleApis: `export const getPageInfo = () => {
        return {
          height: window.innerHeight,
          title: document.title,
          url: location.href
        };
      };`,
  },
  eventHandlers: {
    singleHandler: `export const Button = () => {
        return <button onClick={() => alert('clicked')}>Click me</button>;
      };`,
    multipleHandlers: `export const InputField = () => {
        return (
          <input
            onChange={() => console.log('changed')}
            onFocus={() => console.log('focused')}
            onBlur={() => console.log('blurred')}
          />
        );
      };`,
  },
  reactApis: {
    createContext: `import * as React from 'react';
      export const MyContext = React.createContext('default');`,
    forwardRef: `import * as React from 'react';
      export const MyComponent = React.forwardRef((props, ref) => (
        <div ref={ref}>{props.children}</div>
      ));`,
    memo: `import * as React from 'react';
      export const MyMemoComponent = React.memo(({ value }) => (
        <div>{value}</div>
      ));`,
  },
  customHooks: {
    basicCustomHook: `export const useCustomHook = () => {
        return { data: 'test' };
      };`,
  },
  serverSafe: {
    useId: `import * as React from 'react';
      export const WithId = () => {
        const id = React.useId();
        return <div id={id}>Content</div>;
      };`,
    serverComponent: `export const ServerComponent = () => {
        return <div>Server safe content</div>;
      };`,
    serverUtils: `export const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
      };`,
  },
};

ruleTester.run('enforce-use-client', rule, {
  valid: [
    // =============================================================================
    // SERVER-SAFE CASES - No directive needed
    // =============================================================================
    {
      name: 'Server component without client features',
      code: testCases.serverSafe.serverComponent,
    },
    {
      name: 'Server-safe useId hook',
      code: testCases.serverSafe.useId,
    },
    {
      name: 'Utility functions without client features',
      code: testCases.serverSafe.serverUtils,
    },

    // =============================================================================
    // CLIENT-SIDE FEATURES - With correct directive
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
      name: 'Window access with "use client" directive',
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
      name: 'Event handler with "use client" directive',
      code: `"use client";\n${testCases.eventHandlers.singleHandler}`,
    },
    {
      name: 'Multiple event handlers with "use client" directive',
      code: `"use client";\n${testCases.eventHandlers.multipleHandlers}`,
    },
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
    {
      name: 'Custom hook with "use client" directive',
      code: `"use client";\n${testCases.customHooks.basicCustomHook}`,
    },
  ],

  invalid: [
    // =============================================================================
    // MISSING DIRECTIVE - Should error and auto-fix
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
      name: 'Event handler without "use client" directive',
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
    {
      name: 'Custom hook without "use client" directive',
      code: testCases.customHooks.basicCustomHook,
      errors: [{ messageId: 'missingUseClient' }],
      output: `"use client";\n${testCases.customHooks.basicCustomHook}`,
    },

    // =============================================================================
    // UNNECESSARY DIRECTIVE - Should error and remove
    // =============================================================================
    {
      name: 'Unnecessary "use client" directive on server component',
      code: `"use client";\n${testCases.serverSafe.serverComponent}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.serverSafe.serverComponent,
    },
    {
      name: 'Unnecessary "use client" directive on server utility',
      code: `"use client";\n${testCases.serverSafe.serverUtils}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.serverSafe.serverUtils,
    },
    {
      name: 'Unnecessary "use client" directive with server-safe useId',
      code: `"use client";\n${testCases.serverSafe.useId}`,
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: testCases.serverSafe.useId,
    },

    // =============================================================================
    // EDGE CASES
    // =============================================================================
    {
      name: 'Empty file with unnecessary "use client" directive',
      code: '"use client";',
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: '',
    },
    {
      name: 'Only comments after unnecessary "use client" directive',
      code: '"use client";\n// Just a comment\n/* Another comment */',
      errors: [{ messageId: 'unnecessaryUseClient' }],
      output: '// Just a comment\n/* Another comment */',
    },
  ],
});