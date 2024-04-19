import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { TagGroupContextProvider } from '../../contexts/tagGroupContext';
import { useTag_unstable } from './useTag';

describe('useTag_unstable', () => {
  it.each([true, false])('should %s attach click event handler for tag when dismissible:$dismissible', dismissible => {
    // onClick handler should be added only when dismissible is true.
    // This is because Voice Over + Safari and NVDA + Chrome will announce 'clickable' if a click handler is attached.
    // We don't want 'clickable' announcement when Tag is a simple span and not dismissible.

    const ref = React.createRef<HTMLElement>();
    const wrapper: React.FC = ({ children }) => (
      <TagGroupContextProvider
        value={{
          handleTagDismiss: () => ({}),
          size: 'medium',
        }}
      >
        {children}
      </TagGroupContextProvider>
    );

    const { result } = renderHook(() => useTag_unstable({ dismissible }, ref), { wrapper });
    if (dismissible) {
      expect(result.current.root.onClick).toBeDefined();
    } else {
      expect(result.current.root.onClick).toBeUndefined();
    }
  });
});
