import * as React from 'react';
import { getNativeProps, divProperties, initializeComponentRef, warnDeprecations } from '@fluentui/utilities';
import { TabItemProps } from './TabItem.types';

const COMPONENT_NAME = 'TabItem';

export class TabItem extends React.Component<TabItemProps, {}> {
  constructor(props: TabItemProps) {
    super(props);

    initializeComponentRef(this);
    warnDeprecations(COMPONENT_NAME, props, {
      linkText: 'headerText',
    });
  }

  public render(): JSX.Element {
    return <div {...getNativeProps(this.props, divProperties)}>{this.props.children}</div>;
  }
}
