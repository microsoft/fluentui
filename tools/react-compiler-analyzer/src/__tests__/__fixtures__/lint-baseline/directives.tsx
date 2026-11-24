import * as React from 'react';

export function Zero() { 'use no memo'; return null; }
export function OptIn() { "use memo"; return <span />; }
export function Rejected({ value }: { value: { count: number } }) {
  'use no memo';
  value.count++;
  return <span>{value.count}</span>;
}
export function Conflict() { 'use memo'; 'use no memo'; return null; }
export function Duplicate() { "use no memo"; "use no memo"; return null; }
export function Justified() {
  'use no memo'; // justified: measured consumer constraint
  return <span />;
}
export function JustifiedOptIn() {
  "use memo"; /* justified: consumer migration */
  return null;
}
export function ordinary() { 'use no memo'; return 1; }
export const Wrapped = React.memo(function Wrapped() { 'use no memo'; return <span />; });
export const Forwarded = React.forwardRef(function Forwarded(_props, ref) {
  "use no memo";
  return <span ref={ref} />;
});
export function Outer() {
  'use no memo';
  function Inner() { 'use no memo'; return null; }
  return <Inner />;
}
const unicode = 'é😀';
export function Unicode() { "use no memo"; return <span>{unicode}😀</span>; }
export function Overload(value: string): React.ReactNode;
export function Overload(value: string) { 'use no memo'; return <span>{value}</span>; }
