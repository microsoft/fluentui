import { loaderBehavior } from '@fluentui/accessibility';

describe('LoaderBehavior.ts', () => {
  test('do NOT add aria-labelledby, when aria-label was set already', () => {
    const props = { labelId: 'label-id', 'aria-label': 'any loading string' };
    const expectedResult = loaderBehavior(props);
    expect(expectedResult.attributes.root['aria-labelledby']).toEqual(undefined);
  });

  test('do NOT add aria-labelledby, when aria-labelled was set already', () => {
    const props = { labelId: 'label-id', 'aria-labelledby': 'id' };
    const expectedResult = loaderBehavior(props);
    expect(expectedResult.attributes.root['aria-labelledby']).toEqual(undefined);
  });

  test('do NOT add aria-labelledby, when there is no tabIndex specified', () => {
    const props = { labelId: 'label-id' };
    const expectedResult = loaderBehavior(props);
    expect(expectedResult.attributes.root['aria-labelledby']).toEqual(undefined);
  });

  test('add aria-labelledby, when there is tabIndex=0 specified', () => {
    const props = { labelId: 'label-id', tabIndex: 0 };
    const expectedResult = loaderBehavior(props);
    expect(expectedResult.attributes.root['aria-labelledby']).toEqual('label-id');
  });

  test('add aria-labelledby, when there is tabIndex=-1 specified', () => {
    const props = { labelId: 'label-id', tabIndex: -1 };
    const expectedResult = loaderBehavior(props);
    expect(expectedResult.attributes.root['aria-labelledby']).toEqual('label-id');
  });
});
