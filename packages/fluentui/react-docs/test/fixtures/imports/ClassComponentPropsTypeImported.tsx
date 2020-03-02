import * as React from 'react';

type ClassComponentProps = { children: any };

export default class ClassComponentPropsTypeImported extends React.Component<ClassComponentProps> {
  render() {
    return <div>{this.props.children}</div>;
  }
}
