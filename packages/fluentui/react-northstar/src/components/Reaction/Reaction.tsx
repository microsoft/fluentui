import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';

import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
  ContentComponentProps,
  ShorthandFactory,
} from '../../utils';
import { Accessibility } from '@fluentui/accessibility';

import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types';
import Box, { BoxProps } from '../Box/Box';
import ReactionGroup from './ReactionGroup';

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
  accessibility?: Accessibility;

  /** A reaction can have icon for the indicator of the reaction. */
  icon?: ShorthandValue<BoxProps>;
}

export const reactionClassName = 'ui-reaction';
export const reactionSlotClassNames: ReactionSlotClassNames = {
  icon: `${reactionClassName}__icon`,
  content: `${reactionClassName}__content`,
};

class Reaction extends UIComponent<WithAsProp<ReactionProps>> {
  static create: ShorthandFactory<ReactionProps>;

  static deprecated_className = reactionClassName;

  static displayName = 'Reaction';

  static propTypes = {
    ...commonPropTypes.createCommon({
      content: 'shorthand',
    }),
    icon: customPropTypes.shorthandAllowingChildren,
  };

  static defaultProps = {
    as: 'span',
  };

  static Group = ReactionGroup;

  renderComponent({ accessibility, ElementType, classes, styles, unhandledProps }) {
    const { children, icon, content } = this.props;

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({ forElements: [children] })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {childrenExist(children) ? (
          children
        ) : (
          <>
            {Box.create(icon, {
              defaultProps: () => ({
                className: reactionSlotClassNames.icon,
                styles: styles.icon,
              }),
            })}
            {Box.create(content, {
              defaultProps: () => ({
                className: reactionSlotClassNames.content,
                styles: styles.content,
              }),
            })}
          </>
        )}
      </ElementType>
    );
  }
}

Reaction.create = createShorthandFactory({ Component: Reaction, mappedProp: 'content' });

/**
 * A Reaction indicates user's emotion or perception.
 * Used to display user's reaction for entity in Chat (e.g. message).
 */
export default withSafeTypeForAs<typeof Reaction, ReactionProps, 'span'>(Reaction);
