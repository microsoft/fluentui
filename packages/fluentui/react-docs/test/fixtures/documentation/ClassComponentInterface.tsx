import * as React from 'react';
import { TPropDocumented } from '../external-component-types';

interface IProps {
  /** Props docblock */

  /**
   * prop optional description
   * @param someOptionalProp prop docblock
   */
  someOptionalProp?: string | string[];

  /**
   * prop required description
   * @param someRequiredProp prop docblock
   */
  someRequiredProp: object;

  /**
   * prop required imported description
   * @param someRequiredImportedProp prop docblock
   */
  someRequiredImportedProp: TPropDocumented;

  /**
   * prop optional imported description
   * @param {someOptionalImportedProp} prop docblock
   */
  someOptionalImportedProp?: TPropDocumented;
}

/**
 * Component docblock.
 * @param someTag someTag Docblock
 *
 * @param someTag2 someTag2 Docblock
 */
export default class ClassComponentInterface extends React.Component<IProps> {
  render() {
    return <div></div>;
  }
}
