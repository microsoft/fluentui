import { getComponentInfo, fluentuiSchema } from '@fluentui/react-docs';

describe('getReactCreateElement', () => {
  it('throws when created with react.createElement', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/ReactCreateElement.tsx', null, fluentuiSchema);
    }).toThrow();
  });
});
