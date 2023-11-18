import * as React from 'react';
import { classNamesFunction, css, warnDeprecations, initializeComponentRef } from '../../Utilities';
import { DialogType } from './DialogContent.types';
import { IconButton } from '../../Button';
import { DialogFooter } from './DialogFooter';
import { withResponsiveMode } from '../../ResponsiveMode';
import type { IDialogContentProps, IDialogContentStyleProps, IDialogContentStyles } from './DialogContent.types';
import type { IDialogFooterProps } from './DialogFooter.types';

const getClassNames = classNamesFunction<IDialogContentStyleProps, IDialogContentStyles>();

const DialogFooterType = ((<DialogFooter />) as React.ReactElement<IDialogFooterProps>).type;

const COMPONENT_NAME = 'DialogContent';

// eslint-disable-next-line deprecation/deprecation
@withResponsiveMode
export class DialogContentBase extends React.Component<IDialogContentProps, {}> {
  public static defaultProps: IDialogContentProps = {
    showCloseButton: false,
    className: '',
    topButtonsProps: [],
    closeButtonAriaLabel: 'Close',
  };

  constructor(props: IDialogContentProps) {
    super(props);

    initializeComponentRef(this);
    warnDeprecations(COMPONENT_NAME, props, {
      titleId: 'titleProps.id',
    });
  }

  public render(): JSX.Element {
    const {
      showCloseButton,
      className,
      closeButtonAriaLabel,
      onDismiss,
      subTextId,
      subText,
      titleProps = {},
      // eslint-disable-next-line deprecation/deprecation
      titleId,
      title,
      type,
      styles,
      theme,
      draggableHeaderClassName,
    } = this.props;

    const classNames = getClassNames(styles!, {
      theme: theme!,
      className,
      isLargeHeader: type === DialogType.largeHeader,
      isClose: type === DialogType.close,
      draggableHeaderClassName,
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
          <div
            id={titleId}
            role="heading"
            aria-level={1}
            {...titleProps}
            className={css(classNames.title, titleProps.className)}
          >
            {title}
          </div>
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
      contents: [],
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
