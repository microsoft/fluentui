import * as React from 'react';

export const useTagNameFromRef = <TElement extends HTMLElement>(
  ref: React.RefObject<TElement>,
  defaultTag: string,
): string => {
  const [elementTag, setElementTag] = React.useState(defaultTag);

  React.useEffect(() => {
    const element = ref.current;

    if (!element) {
      // eslint-disable-next-line no-console
      console.warn(
        `Can't determine whether the element is a native ${defaultTag} because \`ref\` wasn't passed to the component`,
      );
      return;
    }

    setElementTag(element.tagName.toLowerCase());
  }, [ref, defaultTag]);

  return elementTag;
};
