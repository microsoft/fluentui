import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  css,
  customizable,
} from '@uifabric/utilities';
import {
  ICheckProps,
  ICheckStyleProps,
  ICheckStyles
} from './Check.types';
import { Icon } from '../../Icon';
import { getStyles } from './Check.styles';

// import * as stylesImport from './Check.scss';
// const styles: any = stylesImport;
const getClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>();

@customizable('Check', ['theme'])
export class CheckBase extends BaseComponent<ICheckProps, {}> {
  public static defaultProps: ICheckProps = {
    checked: false
  };

  public shouldComponentUpdate(newProps: ICheckProps) {
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
      <div
        className={ css(
          'ms-Check',
          className,
          classNames.root,
          checked && 'is-checked',
          checked && 'rootIsChecked'
        ) }
      >
        { Icon({
          className: `
            ms-Check-circle ${classNames.circle}
          `,
          iconName: 'CircleRing'
        }) }
        { Icon({
          className: `
            ms-Check-check ${classNames.check}
          `,
          iconName: 'StatusCircleCheckmark'
        }) }
      </div>
    );
  }
}
