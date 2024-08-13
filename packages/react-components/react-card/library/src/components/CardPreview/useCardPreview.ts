import * as React from 'react';
import { getIntrinsicElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';
import type { CardPreviewProps, CardPreviewState } from './CardPreview.types';
import { useCardContext_unstable } from '../Card/CardContext';
import { cardPreviewClassNames } from './useCardPreviewStyles.styles';

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
    selectableA11yProps: { referenceLabel, referenceId, setReferenceLabel, setReferenceId },
  } = useCardContext_unstable();
  // FIXME:
  // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
  // but since it would be a breaking change to fix it, we are casting ref to it's proper type
  const previewRef = useMergedRefs(ref as React.Ref<HTMLDivElement>, React.useRef<HTMLDivElement>(null));

  React.useEffect(() => {
    if (referenceLabel && referenceId) {
      return;
    }

    if (previewRef.current && previewRef.current.parentNode) {
      const img = previewRef.current.parentNode.querySelector<HTMLImageElement>(`.${cardPreviewClassNames.root} > img`);

      if (img) {
        const ariaLabel = img.getAttribute('aria-label');
        const ariaDescribedby = img.getAttribute('aria-describedby');

        if (ariaDescribedby) {
          setReferenceId(ariaDescribedby);
        } else if (img.alt) {
          setReferenceLabel(img.alt);
        } else if (ariaLabel) {
          setReferenceLabel(ariaLabel);
        }
      }
    }
  }, [setReferenceLabel, referenceLabel, previewRef, referenceId, setReferenceId]);

  return {
    components: {
      root: 'div',
      logo: 'div',
    },

    root: slot.always(
      getIntrinsicElementProps('div', {
        ref: previewRef,
        ...props,
      }),
      { elementType: 'div' },
    ),
    logo: slot.optional(logo, { elementType: 'div' }),
  };
};
