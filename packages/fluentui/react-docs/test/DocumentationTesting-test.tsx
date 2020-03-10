import { getComponentInfo, fluentuiSchema } from '@fluentui/react-docs';

describe('Documents type annotation via JS docs', () => {
  it('generates docs for in-file interfaces', () => {
    const componentInfo = getComponentInfo('./test/fixtures/documentation/ClassComponentInterface.tsx', null, fluentuiSchema);

    //------------------------------------------------
    // Component level tests
    //------------------------------------------------
    expect(componentInfo.displayName).toEqual('ClassComponentInterface');
    expect(componentInfo.docblock.description).toEqual('Component docblock.');
    expect(componentInfo.docblock.tags.length).toEqual(2);
    expect(componentInfo.docblock.tags[0]).toEqual({ title: 'param', description: 'someTag Docblock', name: 'someTag', type: null });
    expect(componentInfo.docblock.tags[1]).toEqual({ title: 'param', description: 'someTag2 Docblock', name: 'someTag2', type: null });

    //------------------------------------------------
    // Component props level tests
    //------------------------------------------------
    expect(componentInfo.props[0].description).toEqual('prop optional imported description');
    expect(componentInfo.props[0].name).toEqual('someOptionalImportedProp');
    expect(componentInfo.props[0].required).toEqual(false);

    expect(componentInfo.props[1].description).toEqual('prop optional description');
    expect(componentInfo.props[1].name).toEqual('someOptionalProp');
    expect(componentInfo.props[1].required).toEqual(false);

    expect(componentInfo.props[2].description).toEqual('prop required imported description');
    expect(componentInfo.props[2].name).toEqual('someRequiredImportedProp');
    expect(componentInfo.props[2].required).toEqual(true);

    expect(componentInfo.props[3].description).toEqual('prop required description');
    expect(componentInfo.props[3].name).toEqual('someRequiredProp');
    expect(componentInfo.props[3].required).toEqual(true);
  });
});
