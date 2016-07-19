/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import {
  Button,
  MessageBar,
  MessageBarType,
  Label
} from '../../../../index';
import './MessageBar.Basic.Example.scss';

export const MessageBarBasicExample = () => (
      <div className='ms-BasicMessageBarsExample'>
        <Label>Info/Default MessageBar</Label>
        <MessageBar>Info - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</MessageBar>

        <Label>Error MessageBar</Label>
        <MessageBar messageBarType={ MessageBarType.error }>Error - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</MessageBar>

        <Label>Remove MessageBar</Label>
        <MessageBar messageBarType={ MessageBarType.remove }>Remove - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</MessageBar>

        <Label>SeverWarning MessageBar</Label>
        <MessageBar messageBarType={ MessageBarType.severeWarning }>SevereWarning - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</MessageBar>

        <Label>Success MessageBar</Label>
        <MessageBar messageBarType={ MessageBarType.success }>Success - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</MessageBar>

        <Label>Warning MessageBar</Label>
        <MessageBar messageBarType={ MessageBarType.warning } ariaLabel='Aria help text here' actions={<div><Button>Yes</Button><Button>No</Button></div>}>Warning - lorem ipsum dolor sit amet, a elit sem interdum consectetur adipiscing elit.</MessageBar>
      </div>
);