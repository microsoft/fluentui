import * as React from 'react';

const isDefaultPrevented = () => false;
export function mockSyntheticEvent() {
  return { isDefaultPrevented } as unknown as React.SyntheticEvent;
}
