import { getComponentInfo } from '@fluentui/react-docs';

/**
 * Make fixtures for these things as well, if helpful.
 *
 * Components
 *   Class
 *   Function Declaration
 *   Function Expression
 *     Typing formats
 *       none
 *       inline
 *       interface
 *       type
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

describe('getFunctionalComponent', () => {
  it('creates an untyped functional component', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionalDeclariationComponent.tsx');
    expect(componentInfo.displayName).toEqual('FunctionalComponent');
  });
});

describe('getFunctionalComponentNoProps', () => {
  it('creates an untyped functional component with no props argument', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionalDeclariationComponentNoProps.tsx');
    expect(componentInfo.displayName).toEqual('FunctionalComponentNoProps');
  });
});

describe('getFunctionalComponentPropsAny', () => {
  it('creates an untyped functional component with props as any', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionalDeclariationComponentPropsAny.tsx');
    expect(componentInfo.displayName).toEqual('FunctionalComponentPropsAny');
  });
});

describe('getFunctionalComponentPropsInline', () => {
  it('creates an untyped functional component with props as Inline', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionalDeclariationComponentPropsInline.tsx');
    expect(componentInfo.displayName).toEqual('FunctionalComponentPropsInline');
  });
});

describe('getFunctionalComponentPropsType', () => {
  it('creates an untyped functional component with props as Type', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionalDeclariationComponentPropsType.tsx');
    expect(componentInfo.displayName).toEqual('FunctionalComponentPropsType');
  });
});

describe('getFunctionalComponentPropsInterface', () => {
  it('creates an untyped functional component with props as Interface', () => {
    const componentInfo = getComponentInfo('./test/fixtures/FunctionalDeclariationComponentPropsInterface.tsx');
    expect(componentInfo.displayName).toEqual('FunctionalComponentPropsInterface');
  });
});
