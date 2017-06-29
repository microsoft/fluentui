import * as React from 'react';
import { BaseComponent, css } from '../../Utilities';
import { IDocumentCardActionsProps } from './DocumentCard.Props';
import { Icon } from '../../Icon';
import { IconButton } from '../../Button';
import * as stylesImport from './DocumentCard.scss';
const styles: any = stylesImport;

export class DocumentCardActions extends BaseComponent<IDocumentCardActionsProps, any> {
  public render() {
    let { actions, views } = this.props;

    return (
      <div className={ css('ms-DocumentCardActions', styles.actions) }>

        { actions && actions.map((action, index) => {
          return (
            <div className={ css('ms-DocumentCardActions-action', styles.action) } key={ index }>
              <IconButton { ...action } />
            </div>
          );
        }) }

        { views > 0 && (
          <div className={ css('ms-DocumentCardActions-views', styles.views) }>
            <Icon iconName='View' />
            { views }
          </div>
        ) }
      </div>
    );
  }
}
