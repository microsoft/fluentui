import * as React from 'react';

import {
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ShorthandFactory,
  childrenExist,
} from '../../utils';

import { WithAsProp, withSafeTypeForAs } from '../../types';

export interface DialogFooterProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {}

class DialogFooter extends UIComponent<WithAsProp<DialogFooterProps>> {
  static create: ShorthandFactory<DialogFooterProps>;

  static displayName = 'DialogFooter';
  static className = 'ui-dialog__footer';

  static propTypes = {
    ...commonPropTypes.createCommon(),
  };

  renderComponent({ accessibility, ElementType, classes, unhandledProps }): React.ReactNode {
    const { children, content } = this.props;

    return (
      <ElementType className={classes.root} {...accessibility.attributes.root} {...unhandledProps}>
        {childrenExist(children) ? children : content}
      </ElementType>
    );
  }
}

DialogFooter.create = createShorthandFactory({ Component: DialogFooter, mappedProp: 'content' });

/**
 * A DialogFooter represents footer content in Dialog, usually shows dialog actions.
 */
export default withSafeTypeForAs<typeof DialogFooter, DialogFooterProps>(DialogFooter);
