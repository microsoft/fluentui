import * as React from 'react';
import { render } from '@testing-library/react';
import { isConformant } from '../../testing/isConformant';
import { CarouselCard } from './CarouselCard';

describe('CarouselCard', () => {
  beforeEach(() => {
    // IntersectionObserver isn't available in test environment
    const mockIntersectionObserver = jest.fn();
    mockIntersectionObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null,
    });
    window.IntersectionObserver = mockIntersectionObserver;
  });

  isConformant({
    Component: CarouselCard,
    displayName: 'CarouselCard',
    requiredProps: {
      value: 'test-0',
    },
  });

  // TODO add more tests here, and create visual regression tests in /apps/vr-tests

  it('renders a default state', () => {
    const result = render(<CarouselCard value="test-0">Default CarouselCard</CarouselCard>);
    expect(result.container).toMatchSnapshot();
  });
});
