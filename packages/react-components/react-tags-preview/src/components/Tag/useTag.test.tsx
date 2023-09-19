import { renderHook } from '@testing-library/react-hooks';
import * as React from 'react';

import { TagGroupContextProvider } from '../../contexts/tagGroupContext';
import { useTag_unstable } from './useTag';

describe('useTag_unstable', () => {
  it('should not attach event handler for non-dismissible tag', () => {
    const ref = React.createRef<HTMLElement>();
    const wrapper: React.FC = ({ children }) => (
      <TagGroupContextProvider
        value={{
          handleTagDismiss: () => null,
          size: 'medium',
        }}
      >
        {children}
      </TagGroupContextProvider>
    );

    const { result } = renderHook(() => useTag_unstable({}, ref), { wrapper });
    expect(result.current.root.onClick).toBeUndefined();
  });
});
