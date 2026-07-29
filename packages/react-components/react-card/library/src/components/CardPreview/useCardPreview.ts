'use client';

import * as React from 'react';
import { getIntrinsicElementProps, useMergedRefs, slot } from '@fluentui/react-utilities';
import type {
  CardPreviewBaseProps,
  CardPreviewBaseState,
  CardPreviewProps,
  CardPreviewState,
} from './CardPreview.types';
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
  return useCardPreviewBase_unstable(props, ref);
};

/**
 * Base hook for CardPreview component, which manages state related to slots structure
 * and the card's selectable accessibility label.
 * Note: CardPreview has no design props, so this is equivalent to useCardPreview_unstable.
 *
 * @param props - props from this instance of CardPreview
 * @param ref - reference to root HTMLElement of CardPreview
 */
export const useCardPreviewBase_unstable = (
  props: CardPreviewBaseProps,
  ref: React.Ref<HTMLElement>,
): CardPreviewBaseState => {
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

    if (previewRef.current) {
      /*
       * Was `previewRef.current.parentNode.querySelector('.fui-CardPreview > img')` — a live
       * DOM query keyed on this component's BEM static, which D16.1 removes. Of the two
       * rewrites the statics-removal design offers (§2.1) this is the recommended one: drop
       * the class query entirely and scope to the ref this hook already holds.
       *
       * Preferred over the mechanical `fuiSelector(cardPreviewClassNames.root) + ' > img'`
       * substitution for three reasons:
       *   1. It removes the coupling instead of renaming it — no global token is involved,
       *      so nothing here can silently stop matching if the marker is ever renamed.
       *   2. The alternative needs `:scope` on `parentNode` to stay anchored, and `:scope`
       *      under jsdom goes through nwsapi's polyfill — the very code path D15.1 exists
       *      to keep away from marker tokens. Not introducing it is strictly safer.
       *   3. `previewRef` IS the element that carried `.fui-CardPreview`, so the ref form is
       *      the identity the old selector was reaching for.
       *
       * Two deliberate semantic narrowings come with it, both in the direction of the
       * effect's stated purpose ("label this card from THIS preview's image"):
       *   • Scope: the old query started at `parentNode` (the Card) and could resolve to a
       *     SIBLING CardPreview's image, labelling this card from someone else's picture.
       *     It now cannot leave this preview.
       *   • Depth: the old query required the `<img>` to be a direct child. A wrapped
       *     `<CardPreview><div><img/></div></CardPreview>` produced no label at all; it now
       *     resolves. Every in-repo story and test puts the `<img>` at the top level, so the
       *     common path is unchanged — see the CardPreview a11y regression test.
       */
      const img = previewRef.current.querySelector<HTMLImageElement>('img');

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
      // eslint-disable-next-line react-hooks/refs
      getIntrinsicElementProps('div', {
        ref: previewRef,
        ...props,
      }),
      { elementType: 'div' },
    ),
    logo: slot.optional(logo, { elementType: 'div' }),
  };
};
