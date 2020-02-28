import * as React from 'react';
import { UIComponentProps } from '@fluentui/react';

export default class ClassComponentPropsEmptyDD extends React.Component<UIComponentProps<never, never>> {
  render() {
    return <div>never component</div>;
  }
}

// export default ClassComponent
