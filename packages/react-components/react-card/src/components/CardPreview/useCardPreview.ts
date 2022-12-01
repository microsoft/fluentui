import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useMergedRefs } from '@fluentui/react-utilities';
import type { CardPreviewProps, CardPreviewState } from './CardPreview.types';
import { useCardContext_unstable } from '../Card/CardContext';

/**
 * Create the state required to render CardPreview.
 *
 * The returned state can be modified with hooks such as useCardPreviewStyles_unstable,
 * before being passed to renderCardPreview_unstable.
 *
 * @param props - props from this instance of CardPreview
 * @param ref - reference to root HTMLElement of CardPreview
 */
export const useCardPreview_unstable = (props: CardPreviewProps, ref: React.Ref<HTMLElement>): CardPreviewState => {
  const { logo } = props;

  const {
    selectableA11yProps: { referenceLabel, setReferenceLabel },
  } = useCardContext_unstable();
  const previewRef = useMergedRefs(ref, React.useRef<HTMLDivElement>(null));

  React.useEffect(() => {
    if (referenceLabel) {
      return;
    }

    if (previewRef.current) {
      const img = previewRef.current.querySelector('img');

      if (img && img.alt) {
        setReferenceLabel(img.alt);
      }
    }
  }, [setReferenceLabel, referenceLabel, previewRef]);

  return {
    components: {
      root: 'div',
      logo: 'div',
    },

    root: getNativeElementProps('div', {
      ref: previewRef,
      ...props,
    }),
    logo: resolveShorthand(logo),
  };
};
