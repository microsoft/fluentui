import { getComponentInfo } from '@fluentui/react-docs';

describe('getReactCreateElement', () => {
  it('throws when created with react.createElement', () => {
    // const componentInfo = ;
    // expect(componentInfo.displayName).toEqual('ReactCreateElement');
    expect(() => {
      getComponentInfo('./test/fixtures/imports/ReactCreateElement.tsx');
    }).toThrow();
  });
});
