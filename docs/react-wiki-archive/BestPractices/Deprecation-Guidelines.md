This guide outlines recommendations for deprecating API behavior, particularly related to component props.

An example PR following these steps can be found here:
**https://github.com/microsoft/fluentui/pull/4811**

## Deprecation Steps

1. Ensure snapshot tests exist covering existing props functionality as a reference check against deprecation changes.
   - The props you're deprecating should have representation in the snapshot output. Sometimes this may require getting the component under test into a certain state.
1. Keep the tests using deprecated props named in a file with deprecated suffix, such as `PersonaCoin.test.tsx` -> `PersonaCoin.deprecated.test.tsx`.
1. Copy the test's snapshot output (or ensure it's the same if regenerated.)
1. Modify existing tests to use new prop.
   - Snapshot output should be identical in most cases, particularly if props naming is the only thing changing.
1. Add new property to interface.
1. Optionally, temporarily comment out old prop to help find all uses throughout code base and change. (Some usage will be caught by the deprecation lint rule, but not in all cases.)
1. Update components that consume property as needed to support both deprecated and new props.
   - Be sure to consider other components that both use and extend the modified interface. If a component needed a change, there's a good chance it will also need to continue supporting the deprecated prop and should also have deprecated tests.
1. Move deprecated prop to end of interface, update comments with deprecation description and add `@deprecated`.

   ```tsx
   /**
   * Primary text to display, usually the name of the person.
   * @deprecated Use 'text' instead.
   */
   primaryText?: string;
   ```

1. Make sure old and new tests pass.
1. Add call to `warnDeprecations` in constructor, like:

   ```tsx
   constructor(props: IPersonaCoinProps) {
     super(props);

     // 'primaryText' is deprecated and 'text' should be used instead
     warnDeprecations('PersonaCoin', props, { 'primaryText': 'text' });
   }
   ```

1. warnDeprecations will most likely cause deprecated tests to fail. Override the warning callback as follows:

   ```tsx
   // or @fluentui/utilities in 8+
   import { setWarningCallback } from '@uifabric/utilities';

   describe('PersonaCoint', () => {
     beforeAll(() => {
       // Prevent warn deprecations from failing test
       const noOp = () => undefined;
       setWarningCallback(noOp);
     });

     afterAll(() => {
       setWarningCallback();
     });

     // tests ...
   });
   ```
