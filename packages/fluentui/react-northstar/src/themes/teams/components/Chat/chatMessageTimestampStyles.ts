import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatMessageTimestampStylesProps } from '../../../../components/Chat/ChatMessageTimestamp';
import { ChatMessageTimestampVariables } from './chatMessageTimestampVariables';

const getChatMessageVariantStyles = (props: ChatMessageTimestampStylesProps) => {
  const density = props.density || defaultChatDensity;
  switch (true) {
    case props.layout === 'refresh' && density === 'comfy':
      return ({ variables: v }): ICSSInJSStyle => ({
        display: 'inline-block',
        alignSelf: 'self-start',
        whiteSpace: 'nowrap',
        opacity: 0,
        ...(v.hasReducedHorizontalSpace && {
          fontSize: '1rem',
          margin: `${pxToRem(3)} ${pxToRem(2.5)} 0`,
        }),
      });

    case density === 'comfy':
      return ({ props: p, variables: v }) => ({
        marginBottom: v.headerMarginBottom,
        ...((p.attached === 'bottom' || p.attached === true) &&
          !p.hasHeaderReactionGroup &&
          (screenReaderContainerStyles as ICSSInJSStyle)),
      });

    default:
      return ({ variables: v }): ICSSInJSStyle => ({
        alignSelf: 'flex-start',
        flexShrink: 0,
        marginLeft: v.compactSpacing,
        marginTop: pxToRem(2),
        opacity: 0,
      }),
  }
};

export const chatMessageTimestampStyles: ComponentSlotStylesPrepared<
  ChatMessageTimestampStylesProps,
  ChatMessageTimestampVariables
> = {
  root: (componentStyleFunctionParam): ICSSInJSStyle => {
    const {
      props: p,
      variables: v,
      theme: { siteVariables },
    } = componentStyleFunctionParam;

    return {
      display: 'inline-block',

      fontSize: v.fontSizeSmall,
      lineHeight: v.fontLineHeightSmall,
      color: v.timestampColor,

      ...getChatMessageVariantStyles(p)(componentStyleFunctionParam),
    };
  },
};
