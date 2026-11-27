import * as React from 'react';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { CardPreview } from './CardPreview';
import { isConformant } from '../../testing/isConformant';
import { useCardPreviewBase_unstable } from './useCardPreview';

describe('CardPreview', () => {
  isConformant({
    Component: CardPreview,
    displayName: 'CardPreview',
    testOptions: {
      'has-static-classnames': [
        {
          props: { logo: 'Test Logo' },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<CardPreview logo={'Logo slot'}>Default CardPreview</CardPreview>);
    expect(result.container).toMatchSnapshot();
  });
});

describe('CardPreview DOM attributes', () => {
  it('does not render component props as DOM attributes', () => {
    const consoleError = jest.spyOn(console, 'error').mockImplementation(() => undefined);
    const { container } = render(<CardPreview logo={<img alt="" />} />);

    expect(consoleError).not.toHaveBeenCalled();
    consoleError.mockRestore();
    expect((container.firstElementChild as HTMLElement).getAttributeNames().sort()).toEqual(['class']);
  });
});

describe('useCardPreviewBase_unstable base hook', () => {
  it('does not forward slot props to the root slot', () => {
    const { result } = renderHook(() => useCardPreviewBase_unstable({ logo: <img alt="" /> }, React.createRef()));

    expect(result.current.root).not.toHaveProperty('logo');
  });
});
