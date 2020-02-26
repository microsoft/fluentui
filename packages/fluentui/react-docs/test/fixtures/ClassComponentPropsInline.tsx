import * as React from 'react';
import { UIComponentProps } from '@fluentui/react';

export default class ClassComponentPropsInline extends React.Component<UIComponentProps> {
  render() {
    return <div>{this.props.children}</div>;
  }
}

// export default ClassComponent
