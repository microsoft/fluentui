import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselNav } from './TeachingPopoverCarouselNav';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { mockTeachingPopoverCarouselContext } from '../../testing/mockTeachingPopoverCarouselContext';

jest.mock('../TeachingPopoverCarousel/TeachingPopoverCarouselContext');

describe('TeachingPopoverCarouselNav', () => {
  isConformant({
    Component: TeachingPopoverCarouselNav,
    displayName: 'TeachingPopoverCarouselNav',
  });

  beforeEach(() => {
    resetIdsForTests();
    mockTeachingPopoverCarouselContext({ totalPages: 2, currentPage: 0 });
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<TeachingPopoverCarouselNav>Default TeachingPopoverCarouselNav</TeachingPopoverCarouselNav>);
    expect(result.container).toMatchSnapshot();
  });
});
