import { getComponentInfo } from '@fluentui/react-docs';

/**
 * Make fixtures for these things as well, if helpful.
 *
 * Typing formats
 *  none
 *  inline
 *  interface
 *  type
 * Components
 *   Class
 *   Function Declaration
 *   Function Expression
 * Props
 *   built-in types (boolean, string, number, null, undefined, void, array, function, object, Map, Set)
 *   resolves function signatures
 *   resolves types defined in the same file (eg anmimation: AnimationType, where it is defined in the file itself)
 *   resolves imported types
 *   includes docblocks for props
 * Component Docblock
 *   description
 *   tags
 * Finds default exports
 * Finds named exports
 */

describe('getComponentWithInlineType', () => {
  it('creates an inline typed component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/imports/ClassComponentPropsInline.tsx');

    expect(componentInfo.displayName).toEqual('ClassComponentPropsInline');
  });
});

describe('getComponentWithInterface', () => {
  it('creates an Interface typed component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/imports/ClassComponentPropsInterface.tsx');
    expect(componentInfo.displayName).toEqual('ClassComponentPropsInterface');
  });
});

describe('getComponentWithType', () => {
  it('creates an Type typed component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/imports/ClassComponentPropsType.tsx');
    expect(componentInfo.displayName).toEqual('ClassComponentPropsType');
  });
});

describe('getComponentWithEmptyProps', () => {
  it('creates an Empty typed component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/imports/ClassComponentPropsEmpty.tsx');
    expect(componentInfo.displayName).toEqual('ClassComponentPropsEmpty');
  });
});

describe('getComponentWithDisplayNameStatic', () => {
  it('creates an Empty typed component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/imports/ClassComponentDisplayNameStatic.tsx');
    expect(componentInfo.displayName).toEqual('ClassComponentDisplayNameStaticDefinition');
  });
});
