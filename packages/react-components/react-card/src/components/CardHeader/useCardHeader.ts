import * as React from 'react';
import { getNativeElementProps, resolveShorthand, useId } from '@fluentui/react-utilities';
import type { CardHeaderProps, CardHeaderState } from './CardHeader.types';
import { useCardContext_unstable } from '../Card/CardContext';
import { cardHeaderClassNames } from './useCardHeaderStyles.styles';

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

  const generatedId = useId(cardHeaderClassNames.header, referenceId);

  React.useEffect(() => {
    if (header && headerRef.current) {
      const { id } = headerRef.current;

      setReferenceId(id ? id : generatedId);
    }
  }, [header, setReferenceId, generatedId]);

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
        id: referenceId,
      },
    }),
    description: resolveShorthand(description),
    action: resolveShorthand(action),
  };
};
