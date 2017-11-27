import { IBaseProps } from '../../Utilities';

export interface IScrollContainerProps extends IBaseProps {
  /**
   * Milliseconds to wait before re-rendering after a scroll event occured, set to 0 to disable debounce.
   * Only used when falling back to scroll events
   * */
  scrollDebounceDelay?: number;
}