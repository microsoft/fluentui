import { ICSSInJSStyle, ComponentSlotStylesPrepared } from '@fluentui/styles';
import { ChatVariables } from './chatVariables';
import { ChatStylesProps } from '../../../../components/Chat/Chat';
import { pxToRem } from '../../../../utils';

export const chatStyles: ComponentSlotStylesPrepared<ChatStylesProps, ChatVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    border: `1px solid ${v.backgroundColor}`,
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    padding: `0 ${pxToRem(10)} 0 ${pxToRem(10)}`,
    margin: 0,
  }),
};
