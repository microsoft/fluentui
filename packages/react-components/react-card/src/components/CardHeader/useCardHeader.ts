import * as React from 'react';
import { getIntrinsicElementProps, useId, slot } from '@fluentui/react-utilities';
import type { CardHeaderProps, CardHeaderState } from './CardHeader.types';
import { useCardContext_unstable } from '../Card/CardContext';
import { cardHeaderClassNames } from './useCardHeaderStyles.styles';

/**
 * Finds the first child of CardHeader with an id prop.
 *
 * @param header - the header prop of CardHeader
 */
function getChildWithId(header: React.ReactNode) {
  function isReactElementWithIdProp(element: React.ReactNode): element is React.ReactElement {
    return React.isValidElement(element) && Boolean(element.props.id);
  }

  return React.Children.toArray(header).find(isReactElementWithIdProp);
}

/**
 * Returns the id to use for the CardHeader root element.
 *
 * @param headerId - the id prop of the CardHeader component
 * @param childWithId - the first child of the CardHeader component with an id prop
 * @param generatedId - a generated id
 *
 * @returns the id to use for the CardHeader root element
 */
function getReferenceId(
  headerId: string | undefined,
  childWithId: React.ReactElement | undefined,
  generatedId: string,
): string {
  if (headerId) {
    return headerId;
  }

  if (childWithId?.props.id) {
    return childWithId.props.id;
  }

  return generatedId;
}

/**
 * Create the state required to render CardHeader.
 *
 * The returned state can be modified with hooks such as useCardHeaderStyles_unstable,
 * before being passed to renderCardHeader_unstable.
 *
 * @param props - props from this instance of CardHeader
 * @param ref - reference to root HTMLElement of CardHeader
 */
export const useCardHeader_unstable = (props: CardHeaderProps, ref: React.Ref<HTMLElement>): CardHeaderState => {
  const { image, header, description, action } = props;

  const {
    selectableA11yProps: { referenceId, setReferenceId },
  } = useCardContext_unstable();
  const headerRef = React.useRef<HTMLDivElement>(null);

  const hasChildId = React.useRef(false);
  const generatedId = useId(cardHeaderClassNames.header, referenceId);

  const headerSlot = slot.optional(header, {
    renderByDefault: true,
    defaultProps: {
      ref: headerRef,
      id: !hasChildId.current ? referenceId : undefined,
    },
    elementType: 'div',
  });
  React.useEffect(() => {
    const headerId = !hasChildId.current ? headerRef.current?.id : undefined;
    const childWithId = getChildWithId(headerSlot?.children);
    hasChildId.current = Boolean(childWithId);
    setReferenceId(getReferenceId(headerId, childWithId, generatedId));
  }, [generatedId, header, headerSlot, setReferenceId]);
  return {
    components: { root: 'div', image: 'div', header: 'div', description: 'div', action: 'div' },

    root: slot.always(
      getIntrinsicElementProps('div', {
        // FIXME:
        // `ref` is wrongly assigned to be `HTMLElement` instead of `HTMLDivElement`
        // but since it would be a breaking change to fix it, we are casting ref to it's proper type
        ref: ref as React.Ref<HTMLDivElement>,
        ...props,
      }),
      { elementType: 'div' },
    ),
    image: slot.optional(image, { elementType: 'div' }),
    header: headerSlot,
    description: slot.optional(description, { elementType: 'div' }),
    action: slot.optional(action, { elementType: 'div' }),
  };
};
