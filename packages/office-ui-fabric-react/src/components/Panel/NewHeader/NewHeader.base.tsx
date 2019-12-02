import * as React from 'react';
import { IconButton } from '../../../Button';
import { IProcessedStyleSet, IconFontSizes, getTheme } from '../../../Styling';
import { initializeComponentRef, classNamesFunction } from '../../../Utilities';
import { INewHeaderProps, INewHeaderStyleProps, INewHeaderStyles } from './NewHeader.types';

const getClassNames = classNamesFunction<INewHeaderStyleProps, INewHeaderStyles>();

export class NewHeaderBase extends React.Component<INewHeaderProps> {
  private _classNames: IProcessedStyleSet<INewHeaderStyles>;

  constructor(props: INewHeaderProps) {
    super(props);
    initializeComponentRef(this);
  }

  public render(): JSX.Element | null {
    const {
      styles,
      theme,
      onRenderNavigation = this._onRenderNavigation,
      onRenderHeader = this._onRenderHeader,
      headerTextId
    } = this.props;

    this._classNames = getClassNames(styles!, {
      theme: theme!
    });

    const header = onRenderHeader(this.props, this._onRenderHeader, headerTextId);

    const { _classNames } = this;

    return (
      <div className={_classNames.commands} data-is-visible={true}>
        {onRenderNavigation(this.props, this._onRenderNavigation)}
        {header}
      </div>
    );
  }

  private _onRenderNavigation = (props: INewHeaderProps): JSX.Element | null => {
    if (!this.props.onRenderNavigationContent && !this.props.onRenderNavigation && !this.props.hasCloseButton) {
      return null;
    }
    const { onRenderNavigationContent = this._onRenderNavigationContent } = this.props;
    return <div className={this._classNames.navigation}>{onRenderNavigationContent(props, this._onRenderNavigationContent)}</div>;
  };

  private _onRenderNavigationContent = (props: INewHeaderProps): JSX.Element | null => {
    const { closeButtonAriaLabel, hasCloseButton, onPanelClick } = props;
    const theme = getTheme();

    if (hasCloseButton) {
      return (
        <IconButton
          styles={{
            root: [
              {
                color: theme.palette.neutralSecondary,
                fontSize: IconFontSizes.large
              }
            ],
            rootHovered: {
              color: theme.palette.neutralPrimary
            }
          }}
          className={this._classNames.closeButton}
          onClick={onPanelClick}
          ariaLabel={closeButtonAriaLabel}
          title={closeButtonAriaLabel}
          data-is-visible={true}
          iconProps={{ iconName: 'Cancel' }}
        />
      );
    }
    return null;
  };

  private _onRenderHeader = (
    props: INewHeaderProps,
    defaultRender?: (props?: INewHeaderProps) => JSX.Element | null,
    headerTextId?: string | undefined
  ): JSX.Element | null => {
    const { headerText } = props;

    if (headerText) {
      return (
        <div className={this._classNames.header}>
          <p className={this._classNames.headerText} id={headerTextId} role="heading" aria-level={2}>
            {headerText}
          </p>
        </div>
      );
    }
    return null;
  };
}
