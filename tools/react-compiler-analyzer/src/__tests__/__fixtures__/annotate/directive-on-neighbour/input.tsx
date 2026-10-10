export function NeedsAnnotation() {
  return <span />;
}
export function AlreadyAnnotated() {
  'use memo';
  return <div />;
}
