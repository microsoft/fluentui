import * as React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { LinkContextProvider } from '../../contexts/linkContext';
import type { LinkBaseState } from './Link.types';
import { useLink_unstable, useLinkBase_unstable } from './useLink';

const useLinkBaseTypeTests = () => {
  // @ts-expect-error - inline is a styled Link prop, not a LinkBase prop
  useLinkBase_unstable({ inline: true }, null);

  const state: LinkBaseState = useLinkBase_unstable({}, null);
  // @ts-expect-error - inline is not exposed by LinkBaseState
  state.inline;
};

useLinkBaseTypeTests;

describe('useLink_unstable', () => {
  it('defaults inline to false', () => {
    const { result } = renderHook(() => useLink_unstable({}, null));

    expect(result.current.inline).toBe(false);
  });

  it('sets inline from props', () => {
    const { result } = renderHook(() => useLink_unstable({ inline: true }, null));

    expect(result.current.inline).toBe(true);
  });

  it('sets inline from context when the prop is absent', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <LinkContextProvider value={{ inline: true }}>{children}</LinkContextProvider>
    );
    const { result } = renderHook(() => useLink_unstable({}, null), { wrapper });

    expect(result.current.inline).toBe(true);
  });

  it('prefers an explicit inline prop over context', () => {
    const wrapper = ({ children }: { children?: React.ReactNode }) => (
      <LinkContextProvider value={{ inline: true }}>{children}</LinkContextProvider>
    );
    const { result } = renderHook(() => useLink_unstable({ inline: false }, null), { wrapper });

    expect(result.current.inline).toBe(false);
  });
});
