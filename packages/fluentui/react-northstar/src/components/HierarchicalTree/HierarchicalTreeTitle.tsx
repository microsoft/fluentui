import {
  Accessibility,
  hierarchicalTreeTitleBehavior,
  HierarchicalTreeTitleBehaviorProps,
} from '@fluentui/accessibility';
import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  commonPropTypes,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  rtlTextContainer,
} from '../../utils';
// @ts-ignore
import { ThemeContext } from 'react-fela';
import { ComponentEventHandler, FluentComponentStaticProps, ProviderContextPrepared } from '../../types';
import {
  ComponentWithAs,
  getElementType,
  useUnhandledProps,
  useTelemetry,
  useAccessibility,
  useStyles,
} from '@fluentui/react-bindings';

export interface HierarchicalTreeTitleProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /** Accessibility behavior if overridden by the user. */
  accessibility?: Accessibility<HierarchicalTreeTitleBehaviorProps>;

  /**
   * Called on click.
   *
   * @param event - React's original SyntheticEvent.
   * @param data - All props.
   */
  onClick?: ComponentEventHandler<HierarchicalTreeTitleProps>;

  /** Whether or not the subtree of the item is in the open state. */
  open?: boolean;

  /** Whether or not the item has a subtree. */
  hasSubtree?: boolean;
}

export const hierarchicalTreeTitleClassName = 'ui-hierarchicaltree__title';

export type HierarchicalTreeTitleStylesProps = never;

/**
 * A TreeTitle renders a title of TreeItem.
 */
const HierarchicalTreeTitle: ComponentWithAs<'a', HierarchicalTreeTitleProps> &
  FluentComponentStaticProps<HierarchicalTreeTitleProps> = props => {
  const context: ProviderContextPrepared = React.useContext(ThemeContext);
  const { setStart, setEnd } = useTelemetry(HierarchicalTreeTitle.displayName, context.telemetry);
  setStart();

  const { children, content, open, hasSubtree, className, design, styles, variables } = props;

  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(HierarchicalTreeTitle.handledProps, props);

  const getA11yProps = useAccessibility<HierarchicalTreeTitleBehaviorProps>(props.accessibility, {
    debugName: HierarchicalTreeTitle.displayName,
    actionHandlers: {
      performClick: e => {
        e.preventDefault();
        handleClick(e);
      },
    },
    mapPropsToBehavior: () => ({
      open,
      hasSubtree,
    }),
    rtl: context.rtl,
  });

  const { classes } = useStyles<HierarchicalTreeTitleStylesProps>(HierarchicalTreeTitle.displayName, {
    className: hierarchicalTreeTitleClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const handleClick = e => {
    _.invoke(props, 'onClick', e, props);
  };

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        onClick: handleClick,
        ...unhandledProps,
        ...rtlTextContainer.getAttributes({ forElements: [children, content] }),
      })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  );
  setEnd();
  return element;
};

HierarchicalTreeTitle.displayName = 'HierarchicalTreeTitle';

HierarchicalTreeTitle.propTypes = {
  ...commonPropTypes.createCommon(),
  onClick: PropTypes.func,
  open: PropTypes.bool,
  hasSubtree: PropTypes.bool,
};

HierarchicalTreeTitle.defaultProps = {
  as: 'a',
  accessibility: hierarchicalTreeTitleBehavior,
};

HierarchicalTreeTitle.handledProps = Object.keys(HierarchicalTreeTitle.propTypes) as any;

HierarchicalTreeTitle.create = createShorthandFactory({
  Component: HierarchicalTreeTitle,
  mappedProp: 'content',
});

export default HierarchicalTreeTitle;
