import * as React from 'react';
import { IDocumentCardActionsProps } from './DocumentCard.Props';
import './DocumentCardActions.scss';
import Button from '../Button/Button';
import ButtonType from '../Button/Button.Props';

export default class DocumentCardActions extends React.Component<IDocumentCardActionsProps, any> {
  public render() {
    let { actions, views } = this.props;

    let actionsOutput = [];
    actions.forEach(function(action) {
      actionsOutput.push(
        <div className='ms-DocumentCard-actions-action'>
          <Button buttonType={ ButtonType.icon } icon={ action.icon } title='' description='' onClick={ action.onClickFunction }/>
        </div>
      );
    });

    let viewsOutput;
    if (views) {
      viewsOutput = (
        <div className='ms-DocumentCard-actions-views'>
          <i className='ms-Icon ms-Icon--eye'></i>
          { views }
        </div>
      );
    }

    return (
      <div className='ms-DocumentCard-actions'>
        { actionsOutput }
        { viewsOutput }
      </div>
    );
  }
}
