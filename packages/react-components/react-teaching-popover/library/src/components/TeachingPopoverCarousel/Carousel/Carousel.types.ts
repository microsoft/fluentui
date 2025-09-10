import * as React from 'react';
import { EventData, EventHandler } from '@fluentui/react-utilities';

export type CarouselStore = {
  clear: () => void;
  addValue: (value: string) => void;
  insertValue: (value: string, prev: string | null) => void;
  removeValue: (value: string) => void;
  subscribe: (listener: () => void) => () => void;
  getSnapshot: () => string[];
};

export type CarouselItem = {
  el: HTMLElement;
  value: string | null;
};

export type UseCarouselOptions = {
  /**
   * Localizes the string used to announce carousel page changes to screen reader users
   * Defaults to: undefined
   */
  announcement?: (newValue: string) => string;

  /**
   * The initial page to display in uncontrolled mode.
   */
  defaultValue?: string;

  /**
   * The value of the currently active page.
   */
  value?: string;

  /**
   * Callback to notify a page change.
   */
  onValueChange?: EventHandler<CarouselValueChangeData>;

  /**
   * Callback to notify when the final button step of a carousel has been activated.
   */
  onFinish?: EventHandler<CarouselValueChangeData>;
};

export type CarouselValueChangeData = EventData<'click', React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>> & {
  /**
   * The value to be set after event has occurred.
   */
  value?: string;
};
