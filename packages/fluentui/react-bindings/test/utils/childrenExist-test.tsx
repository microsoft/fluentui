import { childrenExist } from '@fluentui/react-bindings';
import * as React from 'react';

describe('childrenExist', () => {
  test('returns false when no children are passed', () => {
    const { props } = <div />;
    expect(childrenExist(props.children)).toBe(false);
  });
  test('returns true with text child', () => {
    const { props } = <div>text</div>;
    expect(childrenExist(props.children)).toBe(true);
  });
  test('returns true with empty child element', () => {
    const { props } = (
      <div>
        <p />
      </div>
    );
    expect(childrenExist(props.children)).toBe(true);
  });
  test('returns true with child element', () => {
    const { props } = (
      <div>
        <p>text</p>
      </div>
    );
    expect(childrenExist(props.children)).toBe(true);
  });
  test('returns false for null expression', () => {
    const { props } = <div>{null}</div>;
    expect(childrenExist(props.children)).toBe(false);
  });
  test('returns false for void 0 expression', () => {
    const { props } = <div>{void 0}</div>; // eslint-disable-line no-void
    expect(childrenExist(props.children)).toBe(false);
  });
  test('returns false for NaN expression', () => {
    const { props } = <div>{NaN}</div>;
    expect(childrenExist(props.children)).toBe(false);
  });
  test('returns false for undefined expression', () => {
    const { props } = <div>{undefined}</div>;
    expect(childrenExist(props.children)).toBe(false);
  });
});
