import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { CardHeaderProps, CardHeaderState } from './CardHeader.types';
import { useCardContext_unstable } from '../Card/CardContext';
import { cardHeaderClassNames } from './useCardHeaderStyles.styles';

function getChildWithId(header: CardHeaderProps['header']) {
  function isReactElementWithIdProp(element: React.ReactNode): element is React.ReactElement {
    return React.isValidElement(element) && Boolean(element.props.id);
  }

  return React.Children.toArray(header).find(isReactElementWithIdProp);
}

function getReferenceId(
  refId: string | undefined,
  childWithId: React.ReactElement | undefined,
  generatedId: string,
): string {
  if (refId) {
    return refId;
  }
  return childWithId?.props.id ? childWithId.props.id : generatedId;
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

  React.useEffect(() => {
    const refId = !hasChildId.current ? headerRef.current?.id : undefined;
    const childWithId = getChildWithId(header);

    hasChildId.current = Boolean(childWithId);

    setReferenceId(getReferenceId(refId, childWithId, generatedId));
  }, [generatedId, header, setReferenceId]);

  return {
    components: {
      root: 'div',
      image: 'div',
      header: 'div',
      description: 'div',
      action: 'div',
    },

    root: getNativeElementProps('div', {
      ref,
      ...props,
    }),
    image: resolveShorthand(image),
    header: resolveShorthand(header, {
      required: true,
      defaultProps: {
        ref: headerRef,
        id: !hasChildId.current ? referenceId : undefined,
      },
    }),
    description: resolveShorthand(description),
    action: resolveShorthand(action),
  };
};
