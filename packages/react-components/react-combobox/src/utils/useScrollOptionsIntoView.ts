import * as React from 'react';
import { canUseDOM } from '@fluentui/react-utilities';
import { ListboxState } from '../Listbox';

export function useScrollOptionsIntoView(state: ListboxState): React.Ref<HTMLDivElement> {
  const { activeOption } = state;
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollContainerRef.current && activeOption && canUseDOM()) {
      const activeOptionElement = scrollContainerRef.current.querySelector(`#${activeOption.id}`) as HTMLElement;

      if (!activeOptionElement) {
        return;
      }

      const { offsetHeight, offsetTop } = activeOptionElement;
      const { offsetHeight: parentOffsetHeight, scrollTop } = scrollContainerRef.current;

      const isAbove = offsetTop < scrollTop;
      const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

      // add a small buffer for general visual nicety
      // it looks slightly better if the option has some space from the top/bottom while arrowing
      const buffer = 2;

      if (isAbove) {
        scrollContainerRef.current.scrollTo(0, offsetTop - buffer);
      } else if (isBelow) {
        scrollContainerRef.current.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight + buffer);
      }
    }
  }, [activeOption]);

  return scrollContainerRef;
}
