import * as customPropTypes from '@fluentui/react-proptypes';

describe('suggest prop type', () => {
  test('should throw error when non-array argument given', () => {
    expect(() => customPropTypes.suggest('foo' as any)).toThrowError(Error);
  });

  test('should return undefined when prop is valid', () => {
    const propType = customPropTypes.suggest(['foo', 'bar', 'baz']);
    expect(propType({ name: 'bar' }, 'name', 'FooComponent')).toBe(undefined);
  });

  test('should return Error with suggestions when prop is invalid', () => {
    const propType = customPropTypes.suggest(['foo', 'bar', 'baz']);
    const props = { name: 'bad', title: 'bat words' };

    const resultFooComponent = propType(props, 'name', 'FooComponent');
    expect(resultFooComponent).toBeInstanceOf(Error);
    expect(resultFooComponent.message).toBe(`Invalid prop \`name\` of value \`bad\` supplied to \`FooComponent\`.

Instead of \`bad\`, did you mean:
  - bar
  - baz
  - foo
`);

    const resultBarComponent = propType(props, 'title', 'BarComponent');
    expect(resultBarComponent).toBeInstanceOf(Error);
    expect(resultBarComponent.message).toBe(`Invalid prop \`title\` of value \`bat words\` supplied to \`BarComponent\`.

Instead of \`bat words\`, did you mean:
  - bar
  - baz
  - foo
`);
  });
});
