import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
} from '../../Utilities';
import {
  DialogType,
  IDialogContentProps,
  IDialogContentStyleProps,
  IDialogContentStyles,
} from './DialogContent.types';
import { IconButton } from '../../Button';
import { DialogFooter } from './DialogFooter';
import { withResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

const getClassNames = classNamesFunction<IDialogContentStyleProps, IDialogContentStyles>();

@customizable('DialogContent', ['theme'])
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

  public render() {
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
      getStyles,
      theme,
    } = this.props;

    const classNames = getClassNames(getStyles!, {
      theme: theme!,
      className,
      isLargeHeader: type === DialogType.largeHeader,
      isClose: type === DialogType.close,
    });

    const groupings = this._groupChildren();
    let subTextContent;
    if (subText) {
      subTextContent = <p className={ classNames.subText } id={ subTextId }>{ subText }</p>;
    }

    return (
      <div className={ classNames.content }>
        <div className={ classNames.header }>
          <p className={ classNames.title } id={ titleId } role='heading' aria-level={1}>{ title }</p>
          <div className={ classNames.topButton }>
            { this.props.topButtonsProps!.map((props) => (
              <IconButton { ...props } />
            )) }
            { (type === DialogType.close || (showCloseButton && type !== DialogType.largeHeader)) &&
              <IconButton
                className={ classNames.button }
                iconProps={ { iconName: 'Cancel' } }
                ariaLabel={ closeButtonAriaLabel }
                onClick={ onDismiss as any }
              />
            }
          </div>
        </div>
        <div className={ classNames.inner }>
          <div className={ classNames.innerContent }>
            { subTextContent }
            { groupings.contents }
          </div>
          { groupings.footers }
        </div>
      </div>
    );
  }

  // @TODO - typing the footers as an array of DialogFooter is difficult because
  // casing "child as DialogFooter" causes a problem because
  // "Neither type 'ReactElement<any>' nor type 'DialogFooter' is assignable to the other."
  private _groupChildren(): { footers: any[]; contents: any[]; } {

    const groupings: { footers: any[]; contents: any[]; } = {
      footers: [],
      contents: []
    };

    React.Children.map(this.props.children, child => {
      if (typeof child === 'object' && child !== null && child.type === DialogFooter) {
        groupings.footers.push(child);
      } else {
        groupings.contents.push(child);
      }
    });

    return groupings;
  }
}
