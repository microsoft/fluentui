import { getComponentInfo, fluentuiSchema } from '@fluentui/react-docs';

describe('getComponentWithInlineType', () => {
  it('creates an inline typed component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/imports/ClassComponentPropsInline.tsx', null, fluentuiSchema);

    expect(componentInfo.displayName).toEqual('ClassComponentPropsInline');
  });
});

describe('getComponentWithInterface', () => {
  it('creates an Interface typed component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/imports/ClassComponentPropsInterface.tsx', null, fluentuiSchema);
    expect(componentInfo.displayName).toEqual('ClassComponentPropsInterface');
  });
});

describe('getComponentWithType', () => {
  it('creates an Type typed component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/imports/ClassComponentPropsType.tsx', null, fluentuiSchema);
    expect(componentInfo.displayName).toEqual('ClassComponentPropsType');
  });
});

describe('getComponentWithEmptyProps', () => {
  it('creates an Empty typed component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/imports/ClassComponentPropsEmpty.tsx', null, fluentuiSchema);
    expect(componentInfo.displayName).toEqual('ClassComponentPropsEmpty');
  });
});

describe('getComponentWithDisplayNameStatic', () => {
  it('creates an Empty typed component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/imports/ClassComponentDisplayNameStatic.tsx', null, fluentuiSchema);
    expect(componentInfo.displayName).toEqual('ClassComponentDisplayNameStaticDefinition');
  });
});
