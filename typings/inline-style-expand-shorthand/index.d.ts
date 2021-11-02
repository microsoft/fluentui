// Type definitions for inline-style-expand-shorthand 1.2.0
// Project: https://github.com/robinweser/inline-style-expand-shorthand
// Definitions by:
// Definitions: N/A
// TypeScript Version: 3.1

declare module 'inline-style-expand-shorthand' {
  export function expand(style: Object): Object;
  export function expandWithMerge(style: Object): Object;
  export function expandProperty(property: string, value: number | string | null): Object;
}
