import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { TeachingPopoverCarouselCard } from './TeachingPopoverCarouselCard';
import { resetIdsForTests } from '@fluentui/react-utilities';
import { mockTeachingPopoverCarouselContext } from '../../testing/mockTeachingPopoverCarouselContext';

describe('TeachingPopoverCarouselCard', () => {
  isConformant({
    Component: TeachingPopoverCarouselCard,
    displayName: 'TeachingPopoverCarouselCard',
    requiredProps: { value: 'test' },
  });

  beforeEach(() => {
    resetIdsForTests();
    mockTeachingPopoverCarouselContext({});
  });

  it('renders a default state', () => {
    const result = render(
      <TeachingPopoverCarouselCard value="test">Default TeachingPopoverCarouselCard</TeachingPopoverCarouselCard>,
    );
    expect(result.container).toMatchSnapshot();
  });
});
