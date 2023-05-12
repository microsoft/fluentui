import { renderHook } from '@testing-library/react-hooks';

import { useChatMessagePopoverTrigger } from './useChatMessagePopoverTrigger';

describe('useChatMessagePopoverTrigger', () => {
  test('merge event listeners to chat message state.body', () => {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const consumerMouseEnterHandler = jest.fn(() => {});
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    const consumerMouseLeaveHandler = jest.fn(() => {});
    const state = {
      body: {
        onMouseEnter: consumerMouseEnterHandler,
        onMouseLeave: consumerMouseLeaveHandler,
      },
    };
    renderHook(() => useChatMessagePopoverTrigger(state));

    state.body.onMouseEnter();
    expect(consumerMouseEnterHandler).toHaveBeenCalled();
    state.body.onMouseLeave();
    expect(consumerMouseLeaveHandler).toHaveBeenCalled();
  });
});
