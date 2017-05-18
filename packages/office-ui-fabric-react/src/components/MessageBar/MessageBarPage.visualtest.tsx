import { MessageBar, MessageBarType } from './index';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
export default class MessageBarVPage extends React.Component<any, any> {
  public render() {
    return <div >
      <MessageBar className='MessageBarInfo'>Info - lorem ipsum dolor sit amet </MessageBar>
      <MessageBar className='MessageBarError' messageBarType={ MessageBarType.error }>Error - lorem ipsum dolor sit amet </MessageBar>
      <MessageBar className='MessageBarWarning' messageBarType={ MessageBarType.warning }>Warning - lorem ipsum dolor sit amet </MessageBar>
      <MessageBar className='MessageBarSevereWarning' messageBarType={ MessageBarType.severeWarning }>SevereWarning - lorem ipsum dolor sit amet </MessageBar>
      <MessageBar className='MessageBarBlocked' messageBarType={ MessageBarType.blocked }>Blocked - lorem ipsum dolor sit amet </MessageBar>
      <MessageBar className='MessageBarSuccess' messageBarType={ MessageBarType.success }>Success - lorem ipsum dolor sit amet </MessageBar>
    </div>;
  }
}