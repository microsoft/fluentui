import * as React from 'react';
import { ICardHeaderProps, ICardHeaderStyles, FontSize } from './CardHeader.types';
import { getStyles } from './CardHeader.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { AutoFontSize } from 'auto-fontsize';

export class CardHeader extends React.Component<ICardHeaderProps, {}> {
  constructor(props: ICardHeaderProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<ICardHeaderProps, ICardHeaderStyles>();
    const fontSize = this.props.fontSize;
    const headerText = this.props.headerText;
    const annotationText = this.props.annotationText;
    const classNames = getClassNames(getStyles, { fontSize });

    let fontSizeMapping = [{ fontSize: 28, lineHeight: '36px' }, { fontSize: 16, lineHeight: '21px' }];
    if (fontSize === FontSize.medium) {
      fontSizeMapping = [{ fontSize: 16, lineHeight: '21px' }];
    }

    return (
      <div className={classNames.root}>
        <div className={classNames.headerText} title={headerText}>
          <AutoFontSize text={headerText!} targetLines={2} fontSizeMapping={fontSizeMapping} ellipsisOverflow />
        </div>
        <span className={classNames.annotationText}>{annotationText}</span>
      </div>
    );
  }
}
