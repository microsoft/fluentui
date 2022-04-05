import * as React from 'react';
import { mount } from 'enzyme';

/**
 * Validate that value(s) returned by a hook do not change in identity.
 * @param testDescription - Custom test description
 * @param useHook - Function to invoke the hook and return an array of return values which
 * should not change
 * @param useHookAgain - If you want to verify that the return value doesn't change when hook
 * parameters change, you can pass this second callback which calls the hook differently.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateHookValueNotChanged<TValues extends NonNullable<any>[]>(
  testDescription: string,
  useHook: () => TValues,
  useHookAgain?: () => TValues,
) {
  it(testDescription || 'returns the same value(s) each time', () => {
    let latestValues: TValues | undefined;
    let callCount = 0;

    const TestComponent: React.FunctionComponent = () => {
      callCount++;
      // eslint-disable-next-line react-hooks/rules-of-hooks
      latestValues = callCount === 1 ? useHook() : (useHookAgain || useHook)();
      return <div />;
    };

    const wrapper = mount(<TestComponent />);
    expect(callCount).toBe(1);
    const firstValues = latestValues;
    expect(firstValues).toBeDefined();
    latestValues = undefined;

    wrapper.setProps({});
    expect(callCount).toBe(2);
    expect(latestValues).toBeDefined();
    expect(latestValues).toHaveLength(firstValues!.length);

    for (let i = 0; i < latestValues!.length; i++) {
      try {
        expect(latestValues![i]).toBe(firstValues![i]);
      } catch (err) {
        // Make a more informative error message
        const valueText = latestValues![i].toString();
        expect('').toBe(`Identity of value at index ${i} has changed. This might help identify it:\n${valueText}`);
      }
    }
  });
}
