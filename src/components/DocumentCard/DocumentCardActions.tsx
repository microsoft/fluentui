import * as React from 'react';
import { IDocumentCardActionsProps } from './DocumentCard.Props';
import './DocumentCardActions.scss';
import Button from '../Button/Button';
import { ButtonType } from '../Button/Button.Props';

export default class DocumentCardActions extends React.Component<IDocumentCardActionsProps, any> {
  public render() {
    let { actions, views } = this.props;

    return (
      <div className='ms-DocumentCardActions'>

        { actions && actions.map((action, index) => (
        <div className='ms-DocumentCardActions-action' key={ index }>
          <Button
            buttonType={ ButtonType.icon }
            icon={ action.icon }
            title=''
            description=''
            onClick={ action.onClick } />
        </div>
        )) }

        { views && (
        <div className='ms-DocumentCardActions-views'>
          <i className='ms-Icon ms-Icon--eye' />
          { views }
        </div>
        ) }
      </div>
    );
  }
}
