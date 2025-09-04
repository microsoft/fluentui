// NOTE (React 17,18):
// - exposes JSX namespace in React <19
// - this bare import wont enhance global scope with JSX namespace as it doesn't exists in React >=19.
//   - In React 19 it causes no harm so can live as is
import 'react/jsx-dev-runtime';

// NOTE (React 19):
// - exposes JSX namespace in React >=19
// - JSX export doesn't exists in React <=17. To make our runtime compatible across various React major versions we need to expose JSX namespace to type checker
//   - In React 17 it causes tsc to fail, thus we need to turn checker off

// @ts-ignore
export type { JSX } from 'react/jsx-dev-runtime'
