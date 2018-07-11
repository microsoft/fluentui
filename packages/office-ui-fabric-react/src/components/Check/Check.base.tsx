import * as React from 'react';
import { BaseComponent, customizable } from '../../Utilities';
import { ICheckProps } from './Check.types';
import { Icon } from '../../Icon';
import { getStyles } from './Check.styles';
import { getClassNames } from './Check.classNames';

@customizable('Check', ['theme', 'styles'])
export class CheckBase extends BaseComponent<ICheckProps, {}> {
  public static defaultProps: ICheckProps = {
    checked: false
  };

  public shouldComponentUpdate(newProps: ICheckProps): boolean {
    return this.props.checked !== newProps.checked;
  }

  public render(): JSX.Element {
    const { checked, className, theme } = this.props;

    const classNames = getClassNames(getStyles!, { theme: theme!, className, checked });

    return (
      <div className={classNames.root}>
        <Icon iconName="CircleRing" className={classNames.circle} />
        <Icon iconName="StatusCircleCheckmark" className={classNames.check} />
      </div>
    );
  }
}
