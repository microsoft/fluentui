import * as React from 'react';
import { getNativeProps, divProperties, initializeComponentRef } from '@fluentui/utilities';
import { TabItemProps } from './TabItem.types';

// const COMPONENT_NAME = 'TabItem';

export class TabItem extends React.Component<TabItemProps, {}> {
  constructor(props: TabItemProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    return <div {...getNativeProps(this.props, divProperties)}>{this.props.children}</div>;
  }
}
