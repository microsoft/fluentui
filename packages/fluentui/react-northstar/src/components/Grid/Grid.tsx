import { Accessibility, GridBehaviorProps } from '@fluentui/accessibility';
import {
  getElementType,
  useAccessibility,
  useStyles,
  useFluentContext,
  useTelemetry,
  useUnhandledProps,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  ContentComponentProps,
  rtlTextContainer,
} from '../../utils';
import { FluentComponentStaticProps } from '../../types';

export interface GridProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   * @available gridBehavior, gridHorizontalBehavior
   * */
  accessibility?: Accessibility<GridBehaviorProps>;

  /** The columns of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  columns?: string | number;

  /** The rows of the grid with a space-separated list of values. The values represent the track size, and the space between them represents the grid line. */
  rows?: string | number;
}

export const gridClassName = 'ui-grid';

export type GridStylesProps = Pick<GridProps, 'columns' | 'rows'>;

/**
 * A Grid is a layout component that harmonizes negative space, by controlling both the row and column alignment.
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Grid.displayName, context.telemetry);
  setStart();

  const { accessibility, children, className, columns, content, design, rows, styles, variables } = props;

  const getA11yProps = useAccessibility(accessibility, {
    debugName: Grid.displayName,

    rtl: context.rtl,
  });
  const { classes } = useStyles<GridStylesProps>(Grid.displayName, {
    className: gridClassName,
    mapPropsToStyles: () => ({ columns, rows }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Grid.handledProps, props);

  const element = getA11yProps.unstable_wrapWithFocusZone(
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
        ...unhandledProps,
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>,
  );
  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, GridProps> & FluentComponentStaticProps<GridProps>;

Grid.displayName = 'Grid';

Grid.propTypes = {
  ...commonPropTypes.createCommon({
    content: false,
  }),
  columns: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  content: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.oneOfType([PropTypes.arrayOf(customPropTypes.nodeContent), customPropTypes.nodeContent]),
  ]),
  rows: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
Grid.handledProps = Object.keys(Grid.propTypes) as any;
