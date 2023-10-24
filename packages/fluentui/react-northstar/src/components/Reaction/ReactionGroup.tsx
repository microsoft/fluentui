import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as _ from 'lodash';

import { ShorthandCollection, FluentComponentStaticProps } from '../../types';
import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
} from '../../utils';
import { Accessibility } from '@fluentui/accessibility';
import { Reaction, ReactionProps } from './Reaction';
import {
  getElementType,
  useUnhandledProps,
  useFluentContext,
  useAccessibility,
  useTelemetry,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface ReactionGroupProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** The reactions contained inside the reaction group. */
  items?: ShorthandCollection<ReactionProps>;
}

export const reactionGroupClassName = 'ui-reactions';

export type ReactionGroupStylesProps = never;

/**
 * A ReactionGroup groups multiple Reaction elements.
 */
export const ReactionGroup = React.forwardRef<HTMLDivElement, ReactionGroupProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(ReactionGroup.displayName, context.telemetry);
  setStart();
  const { children, items, content, className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(ReactionGroup.handledProps, props);

  const getA11yProps = useAccessibility<never>(props.accessibility, {
    debugName: ReactionGroup.displayName,
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<ReactionGroupStylesProps>(ReactionGroup.displayName, {
    className: reactionGroupClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = _.isNil(items) ? (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...unhandledProps,
      })}
      {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
    >
      {childrenExist(children) ? children : content}
    </ElementType>
  ) : (
    <ElementType {...unhandledProps} className={classes.root}>
      {_.map(items, reaction =>
        Reaction.create(reaction, {
          defaultProps: () => ({
            styles: resolvedStyles.reaction,
          }),
        }),
      )}
    </ElementType>
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'div', HTMLDivElement, ReactionGroupProps> &
  FluentComponentStaticProps<ReactionGroupProps>;

ReactionGroup.displayName = 'ReactionGroup';

ReactionGroup.propTypes = {
  ...commonPropTypes.createCommon(),
  items: customPropTypes.collectionShorthand,
};

ReactionGroup.handledProps = Object.keys(ReactionGroup.propTypes) as any;

ReactionGroup.create = createShorthandFactory({
  Component: ReactionGroup,
  mappedProp: 'content',
  mappedArrayProp: 'items',
});
