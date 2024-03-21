import * as React from 'react';
import { classNamesFunction, initializeComponentRef } from '../../Utilities';
import { Icon } from '../../Icon';
import { IconButton } from '../../Button';
import type {
  IDocumentCardActionsProps,
  IDocumentCardActionsStyleProps,
  IDocumentCardActionsStyles,
} from './DocumentCardActions.types';
import type { IProcessedStyleSet } from '../../Styling';

const getClassNames = classNamesFunction<IDocumentCardActionsStyleProps, IDocumentCardActionsStyles>();

/**
 * {@docCategory DocumentCard}
 */
export class DocumentCardActionsBase extends React.Component<IDocumentCardActionsProps, any> {
  private _classNames: IProcessedStyleSet<IDocumentCardActionsStyles>;

  constructor(props: IDocumentCardActionsProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const { actions, views, styles, theme, className } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!,
      className,
    });

    return (
      <div className={this._classNames.root}>
        {actions &&
          actions.map((action, index) => {
            return (
              <div className={this._classNames.action} key={index}>
                <IconButton {...action} />
              </div>
            );
          })}

        {(views as number) > 0 && (
          <div className={this._classNames.views}>
            <Icon iconName="View" className={this._classNames.viewsIcon} />
            {views}
          </div>
        )}
      </div>
    );
  }
}
