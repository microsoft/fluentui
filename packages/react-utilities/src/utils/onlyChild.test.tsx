import * as React from 'react';
import { onlyChild } from './onlyChild';

describe('onlyChild', () => {
  const child: React.ReactElement = <div>This is a valid React element</div>;

  it('returns the child if a valid element is sent as the child', () => {
    expect(onlyChild(child)).toBe(child);
  });

  it('returns the child of the fragment if a React fragment with a single child is sent as the child', () => {
    const fragment = <>{child}</>;
    expect(onlyChild(fragment)).toBe(child);
  });

  it('throws an error if a React fragment with multiple children is sent as the child', () => {
    const fragment = (
      <>
        {child}
        {child}
        {child}
      </>
    );
    expect(() => onlyChild(fragment)).toThrow();
  });

  it('throws an error if a non-valid element is sent as the child', () => {
    const nonValid = () => child;
    expect(() => onlyChild(nonValid)).toThrow();
  });
});
