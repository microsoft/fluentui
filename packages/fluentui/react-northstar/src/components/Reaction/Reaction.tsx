import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';

import {
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
  ContentComponentProps,
} from '../../utils';
import { Accessibility } from '@fluentui/accessibility';

import { ShorthandValue, FluentComponentStaticProps } from '../../types';
import { Box, BoxProps } from '../Box/Box';
import { ReactionGroup } from './ReactionGroup';
import {
  useTelemetry,
  useFluentContext,
  getElementType,
  useUnhandledProps,
  useAccessibility,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface ReactionSlotClassNames {
  icon: string;
  content: string;
}

export interface ReactionProps
  extends UIComponentProps<ReactionProps>,
    ChildrenComponentProps,
    ContentComponentProps<ShorthandValue<BoxProps>> {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** A reaction can have icon for the indicator of the reaction. */
  icon?: ShorthandValue<BoxProps>;
}

export type ReactionStylesProps = {
  hasContent: boolean;
};

export const reactionClassName = 'ui-reaction';
export const reactionSlotClassNames: ReactionSlotClassNames = {
  icon: `${reactionClassName}__icon`,
  content: `${reactionClassName}__content`,
};

/**
 * A Reaction indicates user's emotion or perception.
 * Used to display user's reaction for entity in Chat (e.g. message).
 */
export const Reaction = React.forwardRef<HTMLSpanElement, ReactionProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Reaction.displayName, context.telemetry);
  setStart();
  const { children, icon, content, className, design, styles, variables } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Reaction.handledProps, props);

  const getA11yProps = useAccessibility<never>(props.accessibility, {
    debugName: Reaction.displayName,
    rtl: context.rtl,
  });

  const { classes, styles: resolvedStyles } = useStyles<ReactionStylesProps>(Reaction.displayName, {
    className: reactionClassName,
    mapPropsToStyles: () => ({
      hasContent: !!content,
    }),
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const element = (
    <ElementType
      {...getA11yProps('root', {
        className: classes.root,
        ref,
        ...unhandledProps,
      })}
      {...rtlTextContainer.getAttributes({ forElements: [children] })}
    >
      {childrenExist(children) ? (
        children
      ) : (
        <>
          {Box.create(icon, {
            defaultProps: () =>
              getA11yProps('icon', {
                className: reactionSlotClassNames.icon,
                styles: resolvedStyles.icon,
              }),
          })}
          {Box.create(content, {
            defaultProps: () =>
              getA11yProps('content', {
                className: reactionSlotClassNames.content,
                styles: resolvedStyles.content,
              }),
          })}
        </>
      )}
    </ElementType>
  );

  setEnd();
  return element;
}) as unknown as ForwardRefWithAs<'span', HTMLSpanElement, ReactionProps> &
  FluentComponentStaticProps<ReactionProps> & {
    Group: typeof ReactionGroup;
  };

Reaction.displayName = 'Reaction';

Reaction.propTypes = {
  ...commonPropTypes.createCommon({
    content: 'shorthand',
  }),
  icon: customPropTypes.shorthandAllowingChildren,
};

Reaction.defaultProps = {
  as: 'span',
};

Reaction.handledProps = Object.keys(Reaction.propTypes) as any;

Reaction.Group = ReactionGroup;

Reaction.create = createShorthandFactory({ Component: Reaction, mappedProp: 'content' });
