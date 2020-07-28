import { getUnhandledProps } from '@fluentui/react-bindings';

describe('getUnhandledProps', () => {
  test('leaves props that are not defined in handledProps', () => {
    expect(getUnhandledProps([], { 'data-leave-this': 'it is unhandled' })).toHaveProperty('data-leave-this');
  });

  test('removes props defined in handledProps', () => {
    expect(getUnhandledProps(['data-remove-me'], { 'data-remove-me': 'it is handled' })).not.toHaveProperty(
      'data-remove-me',
    );
  });
});
