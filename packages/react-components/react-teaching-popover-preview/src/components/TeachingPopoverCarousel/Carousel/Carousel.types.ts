import * as React from 'react';
import { EventData } from '@fluentui/react-utilities';

export type CarouselStore = {
  addValue: (value: string) => void;
  insertValue: (value: string, prev: string | null) => void;
  removeValue: (value: string) => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => string[];
  getIndex: (index: number) => string;
};

export type CarouselItem = {
  el: HTMLElement;
  value: string | null;
};

export type CarouselPageChangeData = EventData<'click', React.MouseEvent<HTMLButtonElement>> & {
  /**
   * The index to be set after event has occurred.
   */
  index: number;

  /**
   * The value to be set after event has occurred.
   */
  value?: string;
};

export type CarouselItemProps = {
  /**
   * The value used to identify a page,
   * it should be unique and is nessecary for pagination
   */
  value: string;
  children: JSX.Element;
};
