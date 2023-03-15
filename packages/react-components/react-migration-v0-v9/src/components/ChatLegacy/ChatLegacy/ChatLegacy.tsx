import { getNativeElementProps, mergeClasses } from '@fluentui/react-components';
import * as React from 'react';

import { useChatLegacyClasses } from './ChatLegacy.styles';
import { useChatMoverAttribute_unstable } from './useChatMoverAttribute';

export const chatClassName = 'fui-ChatLegacy';

export type ChatLegacyProps = React.HTMLAttributes<HTMLElement>;

export const ChatLegacy = React.forwardRef<HTMLDivElement, ChatLegacyProps>((props, ref) => {
  const classes = useChatLegacyClasses();
  const className = mergeClasses(chatClassName, classes.base, classes.comfy, props.className);

  const moverAttribute = useChatMoverAttribute_unstable();

  const rootProps = getNativeElementProps('div', {
    ref,
    ...props,
  });

  return <div {...moverAttribute} {...rootProps} className={className} ref={ref} />;
});
ChatLegacy.displayName = 'ChatLegacy';
