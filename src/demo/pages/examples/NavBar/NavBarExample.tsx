import * as React from 'react';
import NavBar from '../../../../components/NavBar';

export default class NavBarExample extends React.Component<any, any> {
  public render() {
    return (
      <div className='NavBarExample'>
        <h1>NavBar</h1>
        <NavBar />
      </div>
    );
  }

}
