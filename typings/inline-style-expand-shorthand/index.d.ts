declare module 'inline-style-expand-shorthand' {
  export function expand(style: Object): Object;
  export function expandWithMerge(style: Object): Object;
  export function expandProperty(property: string, value: number | string | null): Object;
}
