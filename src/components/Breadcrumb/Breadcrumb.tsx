import * as React from 'react';
import './Breadcrumb.scss';
import { default as FocusZone, FocusZoneDirection } from '../../utilities/focus/FocusZone';

export interface IBreadcrumbProps {
}

export default class Breadcrumb extends React.Component<IBreadcrumbProps, any> {
    public render() {
      return (
        <div className='ms-Breadcrumb'>
          <div className='ms-Breadcrumb-overflow'>
            <div className='ms-Breadcrumb-overflowButton ms-Icon ms-Icon--ellipsis'></div>
            <i className='ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight'></i>
            <div className='ms-Breadcrumb-overflowMenu'>
              <ul className='ms-ContextualMenu is-open'></ul>
            </div>
          </div>
          <FocusZone direction={ FocusZoneDirection.horizontal }>
            <ul className='ms-Breadcrumb-list'>
              <li className='ms-Breadcrumb-listItem'>
                <a className='ms-Breadcrumb-itemLink' href='#'>Files</a>
                <i className='ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight'></i>
              </li>
              <li className='ms-Breadcrumb-listItem'>
                <a className='ms-Breadcrumb-itemLink' href='#'>Folder 1</a>
                <i className='ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight'></i>
              </li>
              <li className='ms-Breadcrumb-listItem'>
                <a className='ms-Breadcrumb-itemLink' href='#'>Folder 2</a>
                <i className='ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight'></i>
              </li>
              <li className='ms-Breadcrumb-listItem'>
                <a className='ms-Breadcrumb-itemLink' href='#'>Folder 3</a>
                <i className='ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight'></i>
              </li>
              <li className='ms-Breadcrumb-listItem'>
                <a className='ms-Breadcrumb-itemLink' href='#'>Folder 4</a>
                <i className='ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight'></i>
              </li>
              <li className='ms-Breadcrumb-listItem'>
                <a className='ms-Breadcrumb-itemLink' href='#'>Folder 5</a>
                <i className='ms-Breadcrumb-chevron ms-Icon ms-Icon--chevronRight'></i>
              </li>
            </ul>
          </FocusZone>
        </div>
      );
    }
}
