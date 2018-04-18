import * as React from 'react';
import {
  BaseComponent,
  customizable,
  getNativeProps,
  divProperties,
  createRef,
  classNamesFunction
} from '../../Utilities';
import {
  ITheme,
} from '../../Styling';
import { getStyles } from './Fabric.styles';
import { IFabricProps, IFabricStyleProps, IFabricStyles } from './Fabric.types';

const getClassNames = classNamesFunction<IFabricStyleProps, IFabricStyles>();

@customizable('Fabric', ['theme'])
export class Fabric extends BaseComponent<IFabricProps, {}> {
  public render() {
    const classNames = getClassNames(getStyles, this.props as IFabricStyleProps);
    const divProps = getNativeProps(this.props, divProperties);

    return (
      <div
        { ...divProps }
        className={ classNames.root }
      />
    );
  }
}
