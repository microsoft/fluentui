import { Accessibility } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  UIComponent,
  childrenExist,
  RenderResultConfig,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  rtlTextContainer,
} from '../../utils';
import { WithAsProp, withSafeTypeForAs } from '../../types';

export interface GridProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available gridBehavior, gridHorizontalBehavior
   * */
  accessibility?: Accessibility;

  /** The columns of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  columns?: number;

  /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  rows?: number;
}

export const gridClassName = 'ui-grid';

class Grid extends UIComponent<WithAsProp<GridProps>> {
  static displayName = 'Grid';

  static deprecated_className = gridClassName;

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: false,
    }),
    columns: PropTypes.number,
    content: customPropTypes.every([
      customPropTypes.disallow(['children']),
      PropTypes.oneOfType([PropTypes.arrayOf(customPropTypes.nodeContent), customPropTypes.nodeContent]),
    ]),
    rows: PropTypes.number,
  };

  static defaultProps: WithAsProp<GridProps> = {
    as: 'div',
  };

  renderComponent({ accessibility, ElementType, classes, unhandledProps }: RenderResultConfig<any>): React.ReactNode {
    const { children, content } = this.props;

    return (
      <ElementType
        className={classes.root}
        {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
      >
        {childrenExist(children) ? children : content}
      </ElementType>
    );
  }
}

/**
 * A Grid is a layout component that harmonizes negative space, by controlling both the row and column alignment.
 */
export default withSafeTypeForAs<typeof Grid, GridProps>(Grid);
