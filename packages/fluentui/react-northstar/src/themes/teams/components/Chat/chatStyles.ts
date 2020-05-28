import { ICSSInJSStyle, ComponentSlotStylesPrepared, margin } from '@fluentui/styles';
import { ChatVariables } from './chatVariables';
import { ChatStylesProps } from '../../../../components/Chat/Chat';
import { pxToRem } from '../../../../utils';

const chatStyles: ComponentSlotStylesPrepared<ChatStylesProps, ChatVariables> = {
  root: ({ variables: v }): ICSSInJSStyle => ({
    backgroundColor: v.backgroundColor,
    border: `1px solid ${v.backgroundColor}`,
    display: 'flex',
    flexDirection: 'column',
    listStyle: 'none',
    paddingLeft: `0`,
    paddingRight: pxToRem(10),
    paddingTop: `0`,
    paddingBottom: pxToRem(10),
    ...margin('0'),
  }),
};

export default chatStyles;
