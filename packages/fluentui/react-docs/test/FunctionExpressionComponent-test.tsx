import { getComponentInfo } from '@fluentui/react-docs';

describe('getFunctionExpressionComponent', () => {
  it('creates an untyped function expression component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionExpressionComponent.tsx');
    expect(componentInfo.displayName).toEqual('FunctionExpression');
  });
});

describe('getFunctionExpressionComponentNoProps', () => {
  it('creates an untyped function expression component with no props argument', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionExpressionComponentNoProps.tsx');
    expect(componentInfo.displayName).toEqual('FunctionExpressionNoProps');
  });
});

describe('getFunctionExpressionComponentPropsInterface', () => {
  it('creates an untyped function expression component with props typed with an interface', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionExpressionComponentPropsInterface.tsx');
    expect(componentInfo.displayName).toEqual('FunctionExpressionPropsInterface');
  });
});

describe('getFunctionExpressionComponentPropsType', () => {
  it('creates an untyped function expression component with props typed with an Type', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionExpressionComponentPropsType.tsx');
    expect(componentInfo.displayName).toEqual('FunctionExpressionPropsType');
  });
});

describe('getFunctionExpressionComponentPropsInline', () => {
  it('creates an untyped function expression component with props typed Inline', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionExpressionComponentPropsInline.tsx');
    expect(componentInfo.displayName).toEqual('FunctionExpressionPropsInline');
  });
});
