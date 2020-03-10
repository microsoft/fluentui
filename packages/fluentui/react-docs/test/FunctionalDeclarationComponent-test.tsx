import { getComponentInfo, fluentuiSchema } from '@fluentui/react-docs';

describe('getFunctionalComponent', () => {
  it('creates an untyped functional component', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponent.tsx', null, fluentuiSchema);
    }).toThrow();
  });

  it('creates an untyped functional component with no props argument', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentNoProps.tsx', null, fluentuiSchema);
    }).toThrow();
  });

  it('creates an untyped functional component with props as any', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsAny.tsx', null, fluentuiSchema);
    }).toThrow();
  });

  it('creates an untyped functional component with props as Inline', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsInline.tsx', null, fluentuiSchema);
    }).toThrow();
  });

  it('creates an untyped functional component with props as Type', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsType.tsx', null, fluentuiSchema);
    }).toThrow();
  });

  it('creates an untyped functional component with props as Interface', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsInterface.tsx', null, fluentuiSchema);
    }).toThrow();
  });

  it('creates an untyped functional component with props as an imported Type', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsTypeImported.tsx', null, fluentuiSchema);
    }).toThrow();
  });

  it('creates an untyped functional component with props as an imported Interface', () => {
    expect(() => {
      getComponentInfo('./test/fixtures/imports/FunctionalDeclariationComponentPropsInterfaceImported.tsx', null, fluentuiSchema);
    }).toThrow();
  });
});
