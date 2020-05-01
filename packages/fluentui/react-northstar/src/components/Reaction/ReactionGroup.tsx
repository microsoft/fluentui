import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';
import * as _ from 'lodash';

import { WithAsProp, withSafeTypeForAs, ShorthandCollection } from '../../types';
import {
  UIComponent,
  childrenExist,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  rtlTextContainer,
  createShorthandFactory,
  ShorthandFactory,
} from '../../utils';
import { Accessibility } from '@fluentui/accessibility';
import Reaction, { ReactionProps } from './Reaction';

export interface ReactionGroupProps extends UIComponentProps, ChildrenComponentProps, ContentComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility;

  /** The reactions contained inside the reaction group. */
  items?: ShorthandCollection<ReactionProps>;
}

export const reactionGroupClassName = 'ui-reactions';

class ReactionGroup extends UIComponent<WithAsProp<ReactionGroupProps>> {
  static create: ShorthandFactory<ReactionGroupProps>;

  static displayName = 'ReactionGroup';

  static deprecated_className = reactionGroupClassName;

  static propTypes = {
    ...commonPropTypes.createCommon(),
    items: customPropTypes.collectionShorthand,
  };

  renderComponent({ ElementType, classes, accessibility, styles, unhandledProps }): React.ReactNode {
    const { children, items, content } = this.props;
    if (_.isNil(items)) {
      return (
        <ElementType
          {...accessibility.attributes.root}
          {...rtlTextContainer.getAttributes({ forElements: [children, content] })}
          {...unhandledProps}
          className={classes.root}
        >
          {childrenExist(children) ? children : content}
        </ElementType>
      );
    }

    return (
      <ElementType {...unhandledProps} className={classes.root}>
        {_.map(items, reaction =>
          Reaction.create(reaction, {
            defaultProps: () => ({
              styles: styles.reaction,
            }),
          }),
        )}
      </ElementType>
    );
  }
}

ReactionGroup.create = createShorthandFactory({
  Component: ReactionGroup,
  mappedProp: 'content',
  mappedArrayProp: 'items',
});

/**
 * A ReactionGroup groups multiple Reaction elements.
 */
export default withSafeTypeForAs<typeof ReactionGroup, ReactionGroupProps>(ReactionGroup);
