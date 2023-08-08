import * as React from 'react';
import { useFocusFirstElement } from './useFocusFirstElement';
import { render } from '@testing-library/react';

const TestFocusFirstElement = (props: { open: boolean }) => {
  const ref = useFocusFirstElement(props.open);
  return (
    <div ref={ref as React.Ref<HTMLDivElement>}>
      <button data-testid="btn">first element</button>
    </div>
  );
};

describe('useFocusFirstElement', () => {
  it('should focus first element', () => {
    const result = render(<TestFocusFirstElement open />);
    expect(result.getByTestId('btn')).toHaveFocus();
  });
});
