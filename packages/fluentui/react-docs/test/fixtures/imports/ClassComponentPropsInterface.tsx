import * as React from 'react';

interface ClassComponentProps {
  /** Ensure this docblock is annotated in JSON schema */
  children: any;

  /**
   * Inverted function docblock
   *
   * @param {string} someString - Some kinda parameter
   *
   * @param {boolean} someBool - some other kinda param
   *
   * @param {string[]} [someArray] - other thing last part of the docblock
   * */
  inverted?: (someString: string, someBool: boolean, someArray?: string[]) => void;
}

export default class ClassComponentPropsInterface extends React.Component<ClassComponentProps> {
  render() {
    return <div>{this.props.children}</div>;
  }
}
