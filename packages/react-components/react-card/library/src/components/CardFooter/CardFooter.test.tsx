import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { CardFooter } from './CardFooter';
import { isConformant } from '../../testing/isConformant';
import { useCardFooterBase_unstable } from './useCardFooter';

describe('CardFooter', () => {
  isConformant({
    Component: CardFooter,
    displayName: 'CardFooter',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            action: 'Test Action',
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<CardFooter action={'Action slot'}>Default CardFooter</CardFooter>);
    expect(result.container).toMatchSnapshot();
  });
});

describe('CardFooter DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(<CardFooter action={<button />} />);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});

describe('useCardFooterBase_unstable base hook', () => {
  it('does not forward slot props to the root slot', () => {
    const { result } = renderHook(() => useCardFooterBase_unstable({ action: <button /> }, React.createRef()));

    expect(result.current.root).not.toHaveProperty('action');
  });
});
