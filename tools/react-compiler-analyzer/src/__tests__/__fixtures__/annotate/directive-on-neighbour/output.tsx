export function NeedsAnnotation() {
  'use memo';
  return <span />;
}
export function AlreadyAnnotated() {
  'use memo';
  return <div />;
}
