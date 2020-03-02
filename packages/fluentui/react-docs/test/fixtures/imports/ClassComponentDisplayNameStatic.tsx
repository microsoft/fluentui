import * as React from 'react';

export default class ClassComponentPropsDisplayNameStatic extends React.Component {
  static displayName = 'ClassComponentDisplayNameStaticDefinition';
  render() {
    return <div />;
  }
}
