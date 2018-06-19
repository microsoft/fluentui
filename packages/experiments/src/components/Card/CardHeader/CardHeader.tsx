import * as React from 'react';
import { ICardHeaderProps, ICardHeaderStyles } from './CardHeader.types';
import { getStyles } from './CardHeader.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

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

    return (
      <div className={classNames.root}>
        <div className={classNames.headerText}>{headerText}</div>
        <span className={classNames.annotationText}>{annotationText}</span>
      </div>
    );
  }
}
