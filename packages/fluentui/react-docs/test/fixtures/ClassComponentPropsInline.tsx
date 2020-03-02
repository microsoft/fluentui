import * as React from 'react';

export default class ClassComponentPropsInlineImported extends React.Component<{ children?: JSX.Element | JSX.Element[] }> {
  render() {
    return <div>{this.props.children}</div>;
  }
}
