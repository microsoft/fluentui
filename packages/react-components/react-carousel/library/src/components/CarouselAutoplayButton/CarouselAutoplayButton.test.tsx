import { render } from '@testing-library/react';
import * as React from 'react';

import { isConformant } from '../../testing/isConformant';
import { CarouselAutoplayButton } from './CarouselAutoplayButton';
import { CarouselAutoplayButtonProps } from './CarouselAutoplayButton.types';

describe('CarouselAutoplayButton', () => {
  isConformant({
    Component: CarouselAutoplayButton as React.FunctionComponent<CarouselAutoplayButtonProps>,
    displayName: 'CarouselAutoplayButton',
    testOptions: {
      'has-static-classnames': [
        {
          props: {
            icon: 'Test Icon',
          },
        },
      ],
    },
  });

  it('renders a default state', () => {
    const result = render(<CarouselAutoplayButton />);

    expect(result.container).toMatchSnapshot();
  });

  it("applies 'aria-pressed' when is checked", () => {
    const { getByText } = render(<CarouselAutoplayButton checked>Hello world</CarouselAutoplayButton>);

    expect(getByText('Hello world')).toHaveAttribute('aria-pressed', 'true');
  });

  it('calls "onCheckedChange" when clicked', () => {
    const onCheckedChange = jest.fn();
    const { getByText } = render(
      <CarouselAutoplayButton checked onCheckedChange={onCheckedChange}>
        Hello world
      </CarouselAutoplayButton>,
    );

    getByText('Hello world').click();

    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'click' }),
      expect.objectContaining({ checked: false }),
    );
  });
});
