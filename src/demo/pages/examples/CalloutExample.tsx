import * as React from 'react';
import Callout from '../../../components/callout/Callout';

export default class CalloutExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='CalloutExample'>
        <h1>Callout</h1>

        <Callout
          title='All of your favorite people'
          subText='Message body is optional. If help documentation is available, consider adding a link to learn more at the bottom.'
        />
      </div>
    );
  }

}
