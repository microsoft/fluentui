import { pxToRem } from '../../../../utils';
import type { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import type { ChatStylesProps } from '../../../../components/Chat/Chat';
import type { ChatVariables } from './chatVariables';

export const chatStyles: ComponentSlotStylesPrepared<ChatStylesProps, ChatVariables> = {
  root: ({ props: p, variables: v, theme: { siteVariables } }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    border: `${siteVariables.borderWidth} solid ${v.backgroundColor}`,
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    margin: 0,
    padding: p.density === 'compact' ? `0 ${pxToRem(4)} ${pxToRem(2)}` : `0 ${pxToRem(10)} 0 ${pxToRem(10)}`,
  }),
};
