import {
  ComponentWithAs,
  ComponentSlotClasses,
  useStyles,
  useFluentContext,
  useTelemetry,
  useUnhandledProps,
} from '@fluentui/react-bindings';
import { ICSSInJSStyle } from '@fluentui/styles';
import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';

import {
  createShorthandFactory,
  pxToRem,
  UIComponentProps,
  commonPropTypes,
  ContentComponentProps,
  rtlTextContainer,
} from '../../utils';
import { Layout } from '../Layout/Layout';
import { FluentComponentStaticProps } from '../../types';

export interface ItemLayoutSlotClassNames {
  header: string;
  headerMedia: string;
  main: string;
  content: string;
  contentMedia: string;
  media: string;
  endMedia: string;
}

export interface ItemLayoutProps extends UIComponentProps, ContentComponentProps<any> {
  contentMedia?: any;
  /** Toggle debug mode */
  debug?: boolean;
  header?: any;
  endMedia?: any;
  headerMedia?: any;
  media?: any;
  renderContentArea?: (props: ItemLayoutProps, classes: ComponentSlotClasses) => React.ReactNode;
  renderHeaderArea?: (props: ItemLayoutProps, classes: ComponentSlotClasses) => React.ReactNode;
  renderMainArea?: (props: ItemLayoutProps, classes: ComponentSlotClasses) => React.ReactNode;
  /** Styled applied to the root element of the rendered component. */
  rootCSS?: ICSSInJSStyle;
  /** Styled applied to the media element of the rendered component. */
  mediaCSS?: React.CSSProperties;
  /** Styled applied to the header element of the rendered component. */
  headerCSS?: ICSSInJSStyle;
  /** Styled applied to the header media element of the rendered component. */
  headerMediaCSS?: React.CSSProperties;
  /** Styled applied to the content element of the rendered component. */
  contentCSS?: ICSSInJSStyle;
  /** Styled applied to the content element of the rendered component. */
  contentMediaCSS?: React.CSSProperties;
  /** Styled applied to the end media element of the rendered component. */
  endMediaCSS?: React.CSSProperties;
}

export const itemLayoutClassName = 'ui-itemlayout';
export const itemLayoutSlotClassNames: ItemLayoutSlotClassNames = {
  header: `${itemLayoutClassName}__header`,
  headerMedia: `${itemLayoutClassName}__headerMedia`,
  main: `${itemLayoutClassName}__main`,
  content: `${itemLayoutClassName}__content`,
  contentMedia: `${itemLayoutClassName}__contentMedia`,
  media: `${itemLayoutClassName}__media`,
  endMedia: `${itemLayoutClassName}__endMedia`,
};

export type ItemLayoutStylesProps = never;

/**
 * (DEPRECATED) The Item Layout handles layout styles for menu items, list items and other similar item templates.
 */
export const ItemLayout: ComponentWithAs<'div', ItemLayoutProps> &
  FluentComponentStaticProps<ItemLayoutProps> = props => {
  const context = useFluentContext();
  const { setStart, setEnd } = useTelemetry(ItemLayout.displayName, context.telemetry);
  setStart();
  const {
    as,
    debug,
    endMedia,
    media,
    renderMainArea,
    rootCSS,
    mediaCSS,
    endMediaCSS,
    className,
    design,
    styles,
    variables,
  } = props;

  const unhandledProps = useUnhandledProps(ItemLayout.handledProps, props);

  const { classes, styles: resolvedStyles } = useStyles<ItemLayoutStylesProps>(ItemLayout.displayName, {
    className: itemLayoutClassName,
    mapPropsToInlineStyles: () => ({
      className,
      design,
      styles,
      variables,
    }),
    rtl: context.rtl,
  });

  const startArea = media;
  const mainArea = renderMainArea(props, classes);
  const endArea = endMedia;

  const mergedMediaClasses = cx(itemLayoutSlotClassNames.media, classes.media);
  const mergedEndMediaClasses = cx(itemLayoutSlotClassNames.endMedia, classes.endMedia);

  const element = (
    <Layout
      as={as as React.ElementType}
      className={classes.root}
      styles={resolvedStyles.root}
      rootCSS={rootCSS}
      alignItems="center"
      gap={pxToRem(8)}
      debug={debug}
      reducing
      start={
        startArea && (
          <span style={mediaCSS} className={mergedMediaClasses}>
            {rtlTextContainer.createFor({ element: startArea })}
          </span>
        )
      }
      main={mainArea}
      end={
        endArea && (
          <span style={endMediaCSS} className={mergedEndMediaClasses}>
            {rtlTextContainer.createFor({ element: endArea })}
          </span>
        )
      }
      {...unhandledProps}
    />
  );
  setEnd();
  return element;
};

ItemLayout.displayName = 'ItemLayout';

ItemLayout.propTypes = {
  ...commonPropTypes.createCommon({
    accessibility: false,
    children: false,
    content: false,
  }),
  contentMedia: PropTypes.any,
  content: PropTypes.any,
  debug: PropTypes.bool,
  header: PropTypes.any,
  endMedia: PropTypes.any,
  headerMedia: PropTypes.any,
  media: PropTypes.any,
  renderContentArea: PropTypes.func,
  renderHeaderArea: PropTypes.func,
  renderMainArea: PropTypes.func,
  rootCSS: PropTypes.object,
  mediaCSS: PropTypes.object,
  headerCSS: PropTypes.object,
  headerMediaCSS: PropTypes.object,
  contentCSS: PropTypes.object,
  contentMediaCSS: PropTypes.object,
  endMediaCSS: PropTypes.object,
};

ItemLayout.defaultProps = {
  renderMainArea: (props, classes) => {
    const { renderHeaderArea, renderContentArea } = props;

    const headerArea = renderHeaderArea(props, classes);
    const contentArea = renderContentArea(props, classes);

    return (
      <div
        className={itemLayoutSlotClassNames.main}
        style={{
          gridTemplateRows: '1fr 1fr',
        }}
      >
        {headerArea}
        {contentArea}
      </div>
    );
  },

  renderHeaderArea: (props, classes) => {
    const { debug, header, headerMedia, headerCSS, headerMediaCSS } = props;

    const mergedClasses = cx(itemLayoutSlotClassNames.header, classes.header);
    const mediaClasses = cx(itemLayoutSlotClassNames.headerMedia, classes.headerMedia);

    return !header && !headerMedia ? null : (
      <Layout
        className={mergedClasses}
        alignItems="end"
        gap={pxToRem(8)}
        debug={debug}
        main={rtlTextContainer.createFor({ element: header })}
        rootCSS={headerCSS}
        end={
          headerMedia && (
            <span style={headerMediaCSS} className={mediaClasses}>
              {rtlTextContainer.createFor({ element: headerMedia })}
            </span>
          )
        }
      />
    );
  },

  renderContentArea: (props, classes) => {
    const { debug, content, contentMedia, contentCSS, contentMediaCSS } = props;

    const mergedClasses = cx(itemLayoutSlotClassNames.content, classes.content);
    const mediaClasses = cx(itemLayoutSlotClassNames.contentMedia, classes.contentMedia);

    return !content && !contentMedia ? null : (
      <Layout
        className={mergedClasses}
        alignItems="start"
        gap={pxToRem(8)}
        debug={debug}
        rootCSS={contentCSS}
        main={rtlTextContainer.createFor({ element: content })}
        end={
          contentMedia && (
            <span style={contentMediaCSS} className={mediaClasses}>
              {rtlTextContainer.createFor({ element: contentMedia })}
            </span>
          )
        }
      />
    );
  },
};

ItemLayout.handledProps = Object.keys(ItemLayout.propTypes) as any;

ItemLayout.create = createShorthandFactory({ Component: ItemLayout, mappedProp: 'content' });
