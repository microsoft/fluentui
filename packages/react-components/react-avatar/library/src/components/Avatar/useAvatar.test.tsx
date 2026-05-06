import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { useAvatar_unstable } from './useAvatar';

describe('useAvatar', () => {
  let ref: React.RefObject<HTMLElement | null>;

  beforeEach(() => {
    ref = React.createRef<HTMLElement>();
  });

  it('should return state with default props', () => {
    const { result } = renderHook(() => useAvatar_unstable({ name: 'John Doe' }, ref));

    expect(result.current).toMatchObject({
      image: undefined,
      initials: expect.objectContaining({
        children: 'JD',
      }),
    });
  });

  it('should return state with custom props', () => {
    const props = {
      name: 'John Doe',
      image: { src: '/avatar.png' },
    };

    const { result } = renderHook(() => useAvatar_unstable(props, ref));

    expect(result.current).toMatchObject({
      image: expect.objectContaining({
        alt: '',
        src: props.image.src,
      }),
      initials: expect.objectContaining({
        children: 'JD',
      }),
    });

    // Custom props should not be spread on the root element
    expect(result.current.root).not.toHaveProperty('image');
    expect(result.current.root).not.toHaveProperty('initials');
  });

  it('should be possible to remove default icon', () => {
    const props = {
      name: '',
      icon: { children: null },
    };

    const { result } = renderHook(() => useAvatar_unstable(props, ref));

    expect(result.current).toMatchObject({
      image: undefined,
      icon: {
        children: null,
      },
    });
  });
});
