import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { useTeachingPopoverCarouselFooter } from './useTeachingPopoverCarouselFooter';

describe('useTeachingPopoverCarouselFooter', () => {
  it('does not forward slot props to the root slot', () => {
    const { result } = renderHook(() =>
      useTeachingPopoverCarouselFooter({ next: 'Next', previous: 'Previous' }, React.createRef()),
    );

    expect(result.current.root).not.toHaveProperty('next');
    expect(result.current.root).not.toHaveProperty('previous');
  });
});
