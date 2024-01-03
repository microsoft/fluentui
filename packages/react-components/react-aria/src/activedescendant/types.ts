import * as React from 'react';

export interface ActiveDescendantImperativeRef {
  find: (pred: (id: string) => boolean) => string | undefined;
  first: () => void;
  last: () => void;
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
