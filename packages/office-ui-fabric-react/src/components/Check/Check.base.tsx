import * as React from 'react';
import { BaseComponent } from '../../Utilities';
import { ICheckProps } from './Check.types';
import { Icon } from '../../Icon';
import { classNamesFunction } from '../../Utilities';
import { ICheckStyleProps, ICheckStyles } from './Check.types';

const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>();

export class CheckBase extends BaseComponent<ICheckProps, {}> {
  public static defaultProps: ICheckProps = {
    checked: false
  };

  public shouldComponentUpdate(newProps: ICheckProps): boolean {
    return this.props.checked !== newProps.checked || this.props.theme !== newProps.theme || this.props.className !== newProps.className;
  }

  public render(): JSX.Element {
    const { checked, className, theme, styles } = this.props;

    const classNames = getClassNames(styles!, { theme: theme!, className, checked });

    return (
      <div className={classNames.root}>
        <Icon iconName="CircleRing" className={classNames.circle} />
        <Icon iconName="StatusCircleCheckmark" className={classNames.check} />
      </div>
    );
  }
}
