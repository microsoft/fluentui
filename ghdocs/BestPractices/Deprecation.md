# Deprecation Guidelines

This guide outlines recommendations for deprecating API behavior, particularly related to component props.

An example PR following these steps can be found here:
**https://github.com/OfficeDev/office-ui-fabric-react/pull/4811**

## Deprecation Steps
1. Make sure snapshot tests exist covering existing props functionality as a reference check against deprecation changes.
    - Make sure the prop you're changing has representation in the snapshot output. Sometimes this may require getting the component under test into a certain state.
1. Keep the tests using deprecated props named in a file with deprecated suffix, such as `Persona.test.tsx` -> `Persona.deprecated.test.tsx`.
1. Copy the test's snapshot output (or ensure it's the same if regenerated.)
1. Modify existing tests to use new prop.
    - Snapshot output should be identical in most cases, particularly if props naming is the only thing changing.
1. Add new property to interface.
1. Optionally, temporarily comment out old prop to help find all uses throughout code base and change. Take care that as of writing some uses are not covered by TypeScript as part of build, such as some objects created in tests without type declaration and Screener tests in `apps/vr-tests`.
    - If you use VS Code, there is a task available to help aid called `Typescript (vr-tests) watch` which you can run via `Tasks -> Run Task`. You may have to rebuild occasionally to get the types reflected across packages correctly.
1. Move deprecated prop to end of interface, update comments with deprecation description and add @deprecated.
1. Update component as needed to support both deprecated and new props.
1. Make sure old and new tests pass.
1. Add call to warnDeprecations in constructor, like:

    ```tsx
    constructor(props: IPersonaCoinProps) {
      super(props);

      // 'primaryText' is deprecated and 'text' should be used instead
      this._warnDeprecations({ 'primaryText': 'text' });
    }
    ```
1. warnDeprecations will most likely cause deprecated tests to fail, requiring mocking of warnDeprecations. Please make note to clear mock at end of tests as shown below.

    ```tsx
    // Prevent warn deprecations from failing test
    const Utilities = require('@uifabric/utilities/lib/warn');

    describe('MyTests', () => {
      beforeAll(() => {
        Utilities.warnDeprecations = jest.fn().mockImplementation(() => { /** no impl **/ });
      });

      afterAll(() => {
        Utilities.warnDeprecations.mockClear();
      });

      // tests ...
    });
    ```


