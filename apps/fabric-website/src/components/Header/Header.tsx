import * as React from 'react';
import { DONavigation } from '../DONavigation/DONavigation';
import { DOSearchBox } from '../DOSearchBox/DOSearchBox';
import './Header.scss';

export interface IHeaderProps {
}

export interface IHeaderState {
}

export class Header extends React.Component<IHeaderProps, IHeaderState> {

  public render() {
    return (
      <header className='od-Header'>
        <div className='od-Header-banner'>
          <div className='od-Header-logo'>
            <a className='od-Logo-link' href='http://dev.office.com/' aria-label='Back to Office Dev Center website'>
              <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/logo-office-dev.svg' } width='190' height='48' alt='Office dev center logo image' />
            </a>
          </div>
          <div className='od-Header-searchContainer'>
            <DOSearchBox />
          </div>
        </div>
        <div className='od-Header-navigationContainer'>
          <DONavigation />
        </div>
        <button className='od-Header-hamburgerButton' role='menu' aria-label='Mobile menu, press enter to open'>
          <i className='ms-Icon ms-Icon--menu2' aria-hidden='true' />
        </button>
      </header>
    );
  }
}
