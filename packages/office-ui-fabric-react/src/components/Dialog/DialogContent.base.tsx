import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { DialogType, IDialogContentProps, IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types';
import { IconButton } from '../../Button';
import { DialogFooter } from './DialogFooter';
import { IDialogFooterProps } from './DialogFooter.types';
import { withResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

const getClassNames = classNamesFunction<IDialogContentStyleProps, IDialogContentStyles>();

const DialogFooterType = (<DialogFooter /> as React.ReactElement<IDialogFooterProps>).type;

@withResponsiveMode
export class DialogContentBase extends BaseComponent<IDialogContentProps, {}> {
  public static defaultProps: IDialogContentProps = {
    showCloseButton: false,
    className: '',
    topButtonsProps: [],
    closeButtonAriaLabel: 'Close'
  };

  constructor(props: IDialogContentProps) {
    super(props);
  }

  public render(): JSX.Element {
    const {
      showCloseButton,
      className,
      closeButtonAriaLabel,
      onDismiss,
      subTextId,
      subText,
      titleId,
      title,
      type,
      styles,
      theme,
      draggableHeaderClassName
    } = this.props;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isLargeHeader: type === DialogType.largeHeader,
      isClose: type === DialogType.close,
      draggableHeaderClassName
    });

    const groupings = this._groupChildren();
    let subTextContent;
    if (subText) {
      subTextContent = (
        <p className={classNames.subText} id={subTextId}>
          {subText}
        </p>
      );
    }

    return (
      <div className={classNames.content}>
        <div className={classNames.header}>
          <p className={classNames.title} id={titleId} role="heading" aria-level={2}>
            {title}
          </p>
          <div className={classNames.topButton}>
            {this.props.topButtonsProps!.map((props, index) => (
              <IconButton key={props.uniqueId || index} {...props} />
            ))}
            {(type === DialogType.close || (showCloseButton && type !== DialogType.largeHeader)) && (
              <IconButton
                className={classNames.button}
                iconProps={{ iconName: 'Cancel' }}
                ariaLabel={closeButtonAriaLabel}
                onClick={onDismiss as any}
              />
            )}
          </div>
        </div>
        <div className={classNames.inner}>
          <div className={classNames.innerContent}>
            {subTextContent}
            {groupings.contents}
          </div>
          {groupings.footers}
        </div>
      </div>
    );
  }

  // @TODO - typing the footers as an array of DialogFooter is difficult because
  // casing "child as DialogFooter" causes a problem because
  // "Neither type 'ReactElement<any>' nor type 'DialogFooter' is assignable to the other."
  private _groupChildren(): { footers: any[]; contents: any[] } {
    const groupings: { footers: any[]; contents: any[] } = {
      footers: [],
      contents: []
    };

    React.Children.map(this.props.children, child => {
      if (typeof child === 'object' && child !== null && (child as any).type === DialogFooterType) {
        groupings.footers.push(child);
      } else {
        groupings.contents.push(child);
      }
    });

    return groupings;
  }
}
