import type { IBaseProps } from '@fluentui/react/lib/Utilities';

export interface IScrollContainerProps extends IBaseProps {
  /**
   * Optional class name to add to element
   */
  className?: string;

  /**
   * Milliseconds to wait before re-rendering after a scroll event occured, set to 0 to disable debounce.
   * Only used when falling back to scroll events
   * */
  scrollDebounceDelay?: number;
}
