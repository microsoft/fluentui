import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';

import { ChatStylesProps } from '../../../../components/Chat/Chat';
import { pxToRem } from '../../../../utils';
import { ChatVariables } from './chatVariables';

export const chatStyles: ComponentSlotStylesPrepared<ChatStylesProps, ChatVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    border: `1px solid ${v.backgroundColor}`,
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    padding:
      p.density === 'compact' ? `0 ${pxToRem(4)} ${pxToRem(2)} ${pxToRem(4)}` : `0 ${pxToRem(10)} 0 ${pxToRem(10)}`,
    margin: 0,
  }),
};
