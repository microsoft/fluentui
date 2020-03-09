import { getComponentInfo, fluentuiMiddleware } from '@fluentui/react-docs';

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
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponent.tsx', null, fluentuiMiddleware);
    }).toThrow();
  });

  it('creates an untyped functional component with no props argument', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentNoProps.tsx', null, fluentuiMiddleware);
    }).toThrow();
  });

  it('creates an untyped functional component with props as any', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsAny.tsx', null, fluentuiMiddleware);
    }).toThrow();
  });

  it('creates an untyped functional component with props as Inline', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsInline.tsx', null, fluentuiMiddleware);
    }).toThrow();
  });

  it('creates an untyped functional component with props as Type', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsType.tsx', null, fluentuiMiddleware);
    }).toThrow();
  });

  it('creates an untyped functional component with props as Interface', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsInterface.tsx', null, fluentuiMiddleware);
    }).toThrow();
  });

  it('creates an untyped functional component with props as an imported Type', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsTypeImported.tsx', null, fluentuiMiddleware);
    }).toThrow();
  });

  it('creates an untyped functional component with props as an imported Interface', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsInterfaceImported.tsx', null, fluentuiMiddleware);
    }).toThrow();
  });
});
