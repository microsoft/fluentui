import * as React from 'react';
import { getNativeProps, divProperties, initializeComponentRef, warnDeprecations } from '../../Utilities';
import { IPivotItemProps } from './PivotItem.types';

export class PivotItem extends React.Component<IPivotItemProps, {}> {
  constructor(props: IPivotItemProps) {
    super(props);

    initializeComponentRef(this);
    warnDeprecations(this.constructor.name, props, {
      linkText: 'headerText'
    });
  }

  public render(): JSX.Element {
    return <div {...getNativeProps(this.props, divProperties)}>{this.props.children}</div>;
  }
}
