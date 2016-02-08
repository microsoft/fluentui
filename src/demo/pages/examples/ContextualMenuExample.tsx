import * as React from 'react';
import ContextualMenu from '../../../components/contextualMenu/ContextualMenu';

export default class ContextualMenuExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='ContextualMenuExample'>
        <h1>ContextualMenu</h1>
        <ContextualMenu />
      </div>
    );
  }

}
