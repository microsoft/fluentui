import * as React from 'react';
import { getNativeProps, divProperties, initializeComponentRef, warnDeprecations } from '@fluentui/utilities';
import type { IPivotItemProps } from './PivotItem.types';

const COMPONENT_NAME = 'PivotItem';

export class PivotItem extends React.Component<IPivotItemProps, {}> {
  constructor(props: IPivotItemProps) {
    super(props);

    initializeComponentRef(this);
    warnDeprecations(COMPONENT_NAME, props, {
      linkText: 'headerText',
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-deprecated
  public render(): JSX.Element {
    return <div {...getNativeProps(this.props, divProperties)}>{this.props.children}</div>;
  }
}
