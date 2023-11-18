import { handleRef } from '@fluentui/react-component-ref';
import { callable } from '@fluentui/styles';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import * as _ from 'lodash';

import { getElementType } from '../utils/getElementType';
import { getUnhandledProps } from '../utils/getUnhandledProps';
import { AutoFocusZoneProps } from './AutoFocusZone.types';
import { getNextElement, focusAsync } from './focusUtilities';

/** AutoFocusZone is used to focus inner element on mount. */
export class AutoFocusZone extends React.Component<AutoFocusZoneProps> {
  root = React.createRef<HTMLElement>();

  static propTypes = {
    as: PropTypes.elementType,
    firstFocusableSelector: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    innerRef: PropTypes.any,
  };

  static handledProps = _.keys(AutoFocusZone.propTypes) as any;

  componentDidMount(): void {
    this.findElementAndFocusAsync();
  }

  render(): JSX.Element {
    const unhandledProps = getUnhandledProps(AutoFocusZone.handledProps, this.props);
    const ElementType = getElementType(this.props);

    return (
      <ElementType
        ref={(element: HTMLElement) => {
          handleRef(this.root, element);
          handleRef(this.props.innerRef, element);
        }}
        {...unhandledProps}
      >
        {this.props.children}
      </ElementType>
    );
  }

  findElementAndFocusAsync = () => {
    if (!this.root.current) return;
    const { firstFocusableSelector } = this.props;

    const focusSelector = callable(firstFocusableSelector)();

    const firstFocusableChild = focusSelector
      ? (this.root.current.querySelector(focusSelector) as HTMLElement)
      : getNextElement(this.root.current, this.root.current.firstChild as HTMLElement, true, false, false, true);

    firstFocusableChild && focusAsync(firstFocusableChild);
  };
}
