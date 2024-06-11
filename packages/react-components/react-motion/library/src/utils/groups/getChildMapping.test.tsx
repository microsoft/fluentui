import * as React from 'react';
import { getChildMapping } from './getChildMapping';
import { render } from '@testing-library/react';

const TestComponent: React.FC<{
  children: React.ReactNode;
  onMapping: (mapping: ReturnType<typeof getChildMapping>) => void;
}> = props => {
  React.useEffect(() => {
    props.onMapping(getChildMapping(props.children));
  });

  return null;
};

describe('getChildMapping', () => {
  it('should return an object mapping key to child', () => {
    const onMapping = jest.fn();

    render(
      <TestComponent onMapping={onMapping}>
        <div>Hello</div>
        <div>World</div>
      </TestComponent>,
    );

    expect(onMapping).toHaveBeenCalledTimes(1);
    expect(onMapping.mock.calls[0]).toMatchInlineSnapshot(`
      Array [
        Object {
          ".0": Object {
            "appear": false,
            "element": <div>
              Hello
            </div>,
            "unmountOnExit": true,
            "visible": true,
          },
          ".1": Object {
            "appear": false,
            "element": <div>
              World
            </div>,
            "unmountOnExit": true,
            "visible": true,
          },
        },
      ]
    `);
  });

  it('should return an empty object if children is nullable', () => {
    expect(getChildMapping(null)).toEqual({});
    expect(getChildMapping(undefined)).toEqual({});
  });
});
