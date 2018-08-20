import * as React from 'react';
import { IBodyTextProps } from './BodyText.types';
import { IBodyTextStyles } from './BodyText.types';
import { getStyles } from './BodyText.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';

export class BodyText extends React.Component<IBodyTextProps> {
  constructor(props: IBodyTextProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IBodyTextProps, IBodyTextStyles>();
    const classNames = getClassNames(getStyles, {});
    return (
      <div className={classNames.root}>
        <div className={classNames.subHeaderText}>{this.props.subHeaderText}</div>
        <div className={classNames.bodyText}>{this.props.bodyText}</div>
      </div>
    );
  }
}
