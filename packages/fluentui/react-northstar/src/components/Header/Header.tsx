import { Accessibility } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  UIComponent,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
  AlignValue,
  ShorthandFactory,
} from '../../utils';
import HeaderDescription, { HeaderDescriptionProps } from './HeaderDescription';

import { WithAsProp, ShorthandValue, withSafeTypeForAs } from '../../types';

export interface HeaderSlotClassNames {
  description: string;
}

export interface HeaderProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility;

  /** Shorthand for Header.Description. */
  description?: ShorthandValue<HeaderDescriptionProps>;

  /** Align header content. */
  align?: AlignValue;
}

class Header extends UIComponent<WithAsProp<HeaderProps>, any> {
  static displayName = 'Header';

  static deprecated_className = 'ui-header';

  static slotClassNames: HeaderSlotClassNames = {
    description: `${Header.className}__description`,
  };

  static create: ShorthandFactory<HeaderProps>;

  static propTypes = {
    ...commonPropTypes.createCommon({ color: true }),
    description: customPropTypes.itemShorthand,
    align: customPropTypes.align,
    rtlAttributes: PropTypes.func,
  };

  static defaultProps = {
    as: 'h1',
  };

  static Description = HeaderDescription;

  renderComponent({ accessibility, ElementType, classes, variables: v, unhandledProps }) {
    const { children, description, content } = this.props;

    const hasChildren = childrenExist(children);
    const contentElement = childrenExist(children) ? children : content;

    return (
      <ElementType
        {...rtlTextContainer.getAttributes({
          forElements: [children, content],
          condition: !description,
        })}
        {...accessibility.attributes.root}
        {...unhandledProps}
        className={classes.root}
      >
        {rtlTextContainer.createFor({ element: contentElement, condition: !!description })}
        {!hasChildren &&
          HeaderDescription.create(description, {
            defaultProps: () => ({
              className: Header.slotClassNames.description,
              variables: {
                ...(v.descriptionColor && { color: v.descriptionColor }),
              },
            }),
          })}
      </ElementType>
    );
  }
}

Header.create = createShorthandFactory({ Component: Header, mappedProp: 'content' });

/**
 * A Header organises the content by declaring a content's topic.
 *
 * @accessibility
 * Headings communicate the organization of the content on the page. Web browsers, plug-ins, and assistive technologies can use them to provide in-page navigation.
 * Nest headings by their rank (or level). The most important heading has the rank 1 (<h1>), the least important heading rank 6 (<h6>). Headings with an equal or higher rank start a new section, headings with a lower rank start new subsections that are part of the higher ranked section.
 *
 * Other considerations:
 *  - when the description property is used in header, readers will narrate both header content and description within the element. In addition to that, both will be displayed in the list of headings.
 */
export default withSafeTypeForAs<typeof Header, HeaderProps, 'h1'>(Header);
