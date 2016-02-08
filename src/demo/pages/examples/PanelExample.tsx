import * as React from 'react';
import Panel from '../../../components/panel/Panel';

export default class PanelExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='PanelExample'>
        <h1>Panel</h1>
        <Panel />
      </div>
    );
  }

}
