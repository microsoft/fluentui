import { Accessibility } from '@fluentui/accessibility';
import * as customPropTypes from '@fluentui/react-proptypes';
import * as React from 'react';

import {
  childrenExist,
  createShorthandFactory,
  UIComponentProps,
  ChildrenComponentProps,
  ContentComponentProps,
  commonPropTypes,
  ColorComponentProps,
  rtlTextContainer,
  AlignValue,
} from '../../utils';

import { HeaderDescription, HeaderDescriptionProps } from './HeaderDescription';

import { ShorthandValue, FluentComponentStaticProps } from '../../types';
import {
  useTelemetry,
  useAccessibility,
  useFluentContext,
  getElementType,
  useUnhandledProps,
  useStyles,
  ForwardRefWithAs,
} from '@fluentui/react-bindings';

export interface HeaderProps
  extends UIComponentProps,
    ChildrenComponentProps,
    ContentComponentProps,
    ColorComponentProps {
  /**
   * Accessibility behavior if overridden by the user.
   */
  accessibility?: Accessibility<never>;

  /** Shorthand for Header.Description. */
  description?: ShorthandValue<HeaderDescriptionProps>;

  /** Align header content. */
  align?: AlignValue;
}

export const headerClassName = 'ui-header';
export type HeaderStylesProps = Required<Pick<HeaderProps, 'align' | 'color'>> & { hasDescription: boolean };

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
export const Header = React.forwardRef<HTMLHeadingElement, HeaderProps>((props, ref) => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(Header.displayName, context.telemetry);
  setStart();
  const { children, content, variables, align, className, design, styles, description, color } = props;
  const ElementType = getElementType(props);
  const unhandledProps = useUnhandledProps(Header.handledProps, props);
  const hasChildren = childrenExist(children);
  const contentElement = hasChildren ? children : content;

  const getA11yProps = useAccessibility<never>(props.accessibility, {
    debugName: Header.displayName,
    rtl: context.rtl,
  });

  const { classes } = useStyles<HeaderStylesProps>(Header.displayName, {
    className: headerClassName,
    mapPropsToStyles: () => ({
      align,
      hasDescription: !!description,
      color,
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
        ...rtlTextContainer.getAttributes({
          forElements: [children, content],
          condition: !description,
        }),
      })}
    >
      {rtlTextContainer.createFor({ element: contentElement, condition: !!description })}
      {!hasChildren &&
        HeaderDescription.create(description, {
          defaultProps: () => getA11yProps('description', {}),
        })}
    </ElementType>
  );

  setEnd();

  return element;
}) as unknown as ForwardRefWithAs<'h1', HTMLHeadingElement, HeaderProps> &
  FluentComponentStaticProps<HeaderProps> & {
    Description: typeof HeaderDescription;
  };

Header.displayName = 'Header';

Header.propTypes = {
  ...commonPropTypes.createCommon({ color: true }),
  description: customPropTypes.itemShorthand,
  align: customPropTypes.align,
};

Header.defaultProps = {
  as: 'h1',
};

Header.handledProps = Object.keys(Header.propTypes) as any;

Header.Description = HeaderDescription;

Header.create = createShorthandFactory({ Component: Header, mappedProp: 'content' });
