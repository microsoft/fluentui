import * as React from 'react';
import { IDocumentCardActionsProps } from './DocumentCard.Props';
import { Button, ButtonType } from '../../Button';
import './DocumentCardActions.scss';

export class DocumentCardActions extends React.Component<IDocumentCardActionsProps, any> {
  public render() {
    let { actions, views } = this.props;

    return (
      <div className='ms-DocumentCardActions'>

        { actions && actions.map((action, index) => {
          action.buttonType = ButtonType.icon;
          return (
            <div className='ms-DocumentCardActions-action' key={ index }>
              <Button { ...action } />
            </div>
          );
        }) }

        { views && (
        <div className='ms-DocumentCardActions-views'>
          <i className='ms-Icon ms-Icon--View' />
          { views }
        </div>
        ) }
      </div>
    );
  }
}
