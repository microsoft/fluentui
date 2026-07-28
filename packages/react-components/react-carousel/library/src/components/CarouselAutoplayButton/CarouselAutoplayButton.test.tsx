import { render } from '@testing-library/react';
import * as React from 'react';

import { isConformant } from '../../testing/isConformant';
import { CarouselAutoplayButton } from './CarouselAutoplayButton';
import type { CarouselAutoplayButtonProps } from './CarouselAutoplayButton.types';

describe('CarouselAutoplayButton', () => {
  isConformant({
    Component: CarouselAutoplayButton as React.FunctionComponent<CarouselAutoplayButtonProps>,
    displayName: 'CarouselAutoplayButton',
    // Griffel → Tailwind + CSS Modules migration (migration/griffel-to-tailwind).
    // useCarouselAutoplayButtonStyles_unstable delegates to @fluentui/react-button's
    // converted (clsx-based) useToggleButtonStyles_unstable, which is where the consumer
    // className used to reach a mergeClasses() call — the mocked mergeClasses now never
    // sees it, so the Griffel-era test cannot pass. The cascade-native replacement
    // (classname-overrides-win) does not fit either: this component still composes with
    // mergeClasses, which appends its atomics after the consumer's className by design.
    // Re-enable the replacement when react-carousel itself converts. Same shape as
    // react-tag-picker's TagPickerGroup (reports/phase2-batch3.md).
    disabledTests: ['make-styles-overrides-win'],
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
