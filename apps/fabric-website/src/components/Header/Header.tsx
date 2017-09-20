import * as React from 'react';
import './Header.scss';

export interface IHeaderProps {
}

export interface IHeaderState {
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {

  public render() {
    return (
      <header className='od-Header'>
        <button className='od-Header-hamburgerButton' role='menu' aria-label='Mobile menu, press enter to open'>
          <i className='ms-Icon ms-Icon--menu2' aria-hidden='true' />
        </button>
      </header>
    );
  }
}
