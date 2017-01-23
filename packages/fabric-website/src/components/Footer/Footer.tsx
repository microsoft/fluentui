import * as React from 'react';
import './Footer.scss';
import { baseURL } from '../../appConfig';

export interface IFooterProps {
}

export interface IFooterState {
}

export class Footer extends React.Component<IFooterProps, IFooterState> {
  public render() {
    return (
      <footer className='od-OfficeFooter'>
        <div className='od-OfficeFooter-primary'>
          <div className='od-OfficeFooter-linkList'>
            <div className='od-OfficeFooter-heading'>Community Resources</div>
            <ul className='od-OfficeFooter-list'>
              <li><a href='https://www.yammer.com/itpronetwork' target='_blank'>Office 365 Technical Network</a></li>
              <li><a href='http://social.msdn.microsoft.com/Forums/office/en-US/home?category=apps,officedev,sharepoint,exchangeserver,lync,msproject' target='_blank'>MSDN Forums</a></li>
              <li><a href='http://officespdev.uservoice.com/' target='_blank'>UserVoice</a></li>
              <li><a href='http://stackoverflow.com/questions/tagged/ms-office' target='_blank'>Stack Overflow</a></li>
            </ul>
          </div>
          <div className='od-OfficeFooter-linkList'>
            <div className='od-OfficeFooter-heading'>Follow Fabric</div>
            <ul className='od-OfficeFooter-list'>
              <li><a href='https://twitter.com/officeuifabric' target='_blank'>Twitter</a></li>
              <li><a href='https://github.com/OfficeDev/?query=office-ui-fabric' target='_blank'>GitHub</a></li>
            </ul>
          </div>
        </div>
        <div className='od-OfficeFooter-secondary'>
          <ul className='od-OfficeFooter-list od-OfficeFooter-list--secondary'>
            <li><a href='http://www.microsoft.com/info/privacy.mspx' target='_blank'>Privacy</a></li>
            <li><a href='http://msdn.microsoft.com/en-US/cc300389' target='_blank'>Terms of use</a></li>
            <li><a href='http://www.microsoft.com/library/toolbar/3.0/trademarks/en-us.mspx' target='_blank'>Trademarks</a></li>
          </ul>
          <div className='od-OfficeFooter-microsoft'>
            <img src={ 'https://static2.sharepointonline.com/files/fabric/fabric-website/images/logo-microsoft.png' } width='123' height='24' alt='Microsoft logo' />
            <div>&copy; 2016 Microsoft</div>
          </div>
        </div>
      </footer>
    );
  }
}
