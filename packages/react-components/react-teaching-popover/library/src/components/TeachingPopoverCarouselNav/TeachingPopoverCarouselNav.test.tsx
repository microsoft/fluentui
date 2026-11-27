import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselNav } from './TeachingPopoverCarouselNav';
import { TeachingPopoverCarouselNavButton } from '../TeachingPopoverCarouselNavButton/TeachingPopoverCarouselNavButton';

describe('TeachingPopoverCarouselNav', () => {
  isConformant({
    Component: TeachingPopoverCarouselNav,
    displayName: 'TeachingPopoverCarouselNav',
  });

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarouselNav>{() => <TeachingPopoverCarouselNavButton />}</TeachingPopoverCarouselNav>,
    );
    expect(result.container).toMatchSnapshot();
  });

  it('does not forward dangerouslySetInnerHTML to the root, which renders composed children', () => {
    const { container } = render(
      <TeachingPopoverCarouselNav dangerouslySetInnerHTML={{ __html: 'Injected' }}>
        {() => <TeachingPopoverCarouselNavButton />}
      </TeachingPopoverCarouselNav>,
    );

    expect((container.firstElementChild as HTMLElement).textContent).toBe('');
  });
});
