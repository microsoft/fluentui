import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
} from '../../Utilities';
import {
  ICheckProps,
  ICheckStyleProps,
  ICheckStyles
} from './Check.types';
import { Icon } from '../../Icon';
import { getStyles } from './Check.styles';

const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>();

@customizable('Check', ['theme'])
export class CheckBase extends BaseComponent<ICheckProps, {}> {
  public static defaultProps: ICheckProps = {
    checked: false
  };

  public shouldComponentUpdate(newProps: ICheckProps): boolean {
    return this.props.checked !== newProps.checked;
  }

  public render(): JSX.Element {
    const {
      checked,
      className,
      theme
    } = this.props;

    const classNames = getClassNames(getStyles!, { theme: theme!, className, checked });

    return (
      <div className={ classNames.root } >
        <Icon name='CircleRing' className={ classNames.circle } />
        <Icon name='StatusCircleCheckmark' className={ classNames.check } />
      </div>
    );
  }
}
