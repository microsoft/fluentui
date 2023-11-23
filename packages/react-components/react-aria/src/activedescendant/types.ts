import * as React from 'react';

export interface ActiveDescendantImperativeRef {
  first: () => void;
  next: () => void;
  prev: () => void;
  blur: () => void;
  active: () => string | undefined;
  focus: (id: string) => void;
}

export interface ActiveDescendantOptions {
  matchOption: (el: HTMLElement) => boolean;
  imperativeRef?: React.RefObject<ActiveDescendantImperativeRef>;
}
