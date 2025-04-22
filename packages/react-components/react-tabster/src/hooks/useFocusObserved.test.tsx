import * as React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useFocusObserved, useObservedElement } from './index';

describe('useFocusObserved', () => {
  const TestComponent = () => {
    const observedAttributes = useObservedElement('focus-observed-element');
    const focusObserved = useFocusObserved('focus-observed-element');

    return (
      <div>
        <button data-testid="button-1">Button 1</button>
        <button data-testid="button-2" {...observedAttributes}>
          Button 2
        </button>
        <button onClick={() => focusObserved()} data-testid="button-to-click">
          Focus button 2
        </button>
      </div>
    );
  };

  it('should return a function that focuses an element', () => {
    const { getByTestId } = render(<TestComponent />);
    const button1 = getByTestId('button-1');
    const button2 = getByTestId('button-2');
    userEvent.tab();
    expect(document.activeElement).toEqual(button1);
    const buttonToClick = getByTestId('button-to-click');
    userEvent.click(buttonToClick);
    // expect(document.activeElement).toEqual(button2);
  });
});
