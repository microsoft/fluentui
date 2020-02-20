import { ICSSInJSStyle } from '@fluentui/styles'
import * as React from 'react'
import * as PropTypes from 'prop-types'
import cx from 'classnames'

import { UIComponent, UIComponentProps, commonPropTypes, rtlTextContainer } from '../../utils'
import { WithAsProp, withSafeTypeForAs } from '../../types'

export interface LayoutSlotClassNames {
  start: string
  main: string
  end: string
  gap: string
  reducedStart: string
  reducedMain: string
  reducedEnd: string
}

export interface LayoutProps extends UIComponentProps {
  debug?: boolean
  renderStartArea?: (params: object) => React.ReactNode
  renderMainArea?: (params: object) => React.ReactNode
  renderEndArea?: (params: object) => React.ReactNode
  renderGap?: (params: object) => React.ReactNode
  /** Styled applied to the root element of the rendered component. */
  rootCSS?: ICSSInJSStyle
  start?: any
  startCSS?: ICSSInJSStyle
  startSize?: string
  main?: any
  mainCSS?: ICSSInJSStyle
  mainSize?: string
  end?: any
  endCSS?: ICSSInJSStyle
  endSize?: string
  /** How to align items on-axis within the layout (i.e. vertical or not). */
  justifyItems?: React.CSSProperties['justifyItems']
  /** How to align cross-axis items within the layout (i.e. vertical or not). */
  alignItems?: React.CSSProperties['alignItems']
  /** A layout can have gaps of whitespace between areas. */
  gap?: string
  /** A layout can reduce to the minimum required areas. */
  reducing?: boolean
  /** A layout can render its content directly if only one piece of content exists. */
  disappearing?: boolean
  vertical?: boolean
}

class Layout extends UIComponent<WithAsProp<LayoutProps>, any> {
  static className = 'ui-layout'

  static displayName = 'Layout'

  static slotClassNames: LayoutSlotClassNames

  static propTypes = {
    ...commonPropTypes.createCommon({
      accessibility: false,
      children: false,
      content: false,
    }),
    debug: PropTypes.bool,

    renderStartArea: PropTypes.func,
    renderMainArea: PropTypes.func,
    renderEndArea: PropTypes.func,
    renderGap: PropTypes.func,

    rootCSS: PropTypes.object,

    start: PropTypes.any,
    startCSS: PropTypes.object,
    startSize: PropTypes.string,

    main: PropTypes.any,
    mainCSS: PropTypes.object,
    mainSize: PropTypes.string,

    end: PropTypes.any,
    endCSS: PropTypes.object,
    endSize: PropTypes.string,

    justifyItems: PropTypes.any,

    alignItems: PropTypes.any,

    gap: PropTypes.string,
    reducing: PropTypes.bool,
    disappearing: PropTypes.bool,

    vertical: PropTypes.bool,
  }

  static defaultProps = {
    startSize: 'auto',
    mainSize: '1fr',
    endSize: 'auto',

    // TODO: when an area is another Layout, do not wrap them in an extra div
    // TODO: option 1) higher value layouts could use start={Layout.create(start)} to ensure Areas are layout root
    renderStartArea({ start, classes }) {
      return (
        start && (
          <div
            className={cx(Layout.slotClassNames.start, classes.start)}
            {...rtlTextContainer.getAttributes({ forElements: [start] })}
          >
            {start}
          </div>
        )
      )
    },

    renderMainArea({ main, classes }) {
      return (
        main && (
          <div
            className={cx(Layout.slotClassNames.main, classes.main)}
            {...rtlTextContainer.getAttributes({ forElements: [main] })}
          >
            {main}
          </div>
        )
      )
    },

    renderEndArea({ end, classes }) {
      return (
        end && (
          <div
            className={cx(Layout.slotClassNames.end, classes.end)}
            {...rtlTextContainer.getAttributes({ forElements: [end] })}
          >
            {end}
          </div>
        )
      )
    },

    // Heads up!
    // IE11 Doesn't support grid-gap, insert virtual columns instead
    renderGap({ gap, classes }) {
      return gap && <span className={cx(Layout.slotClassNames.gap, classes.gap)} />
    },
  }

  renderComponent({ ElementType, classes, unhandledProps }) {
    const {
      reducing,
      disappearing,
      start,
      main,
      end,
      renderStartArea,
      renderMainArea,
      renderEndArea,
      renderGap,
    } = this.props

    const startArea = renderStartArea({ ...this.props, classes })
    const mainArea = renderMainArea({ ...this.props, classes })
    const endArea = renderEndArea({ ...this.props, classes })

    if (!startArea && !mainArea && !endArea) {
      return <ElementType {...unhandledProps} className={classes.root} />
    }

    const activeAreas = [startArea, mainArea, endArea].filter(Boolean)
    const isSingleArea = activeAreas.length === 1

    // disappear: render the content directly without wrapping layout or area elements
    if (disappearing && isSingleArea) {
      return start || main || end
    }

    if (reducing && isSingleArea) {
      const composedClasses = cx(
        classes.root,
        startArea && Layout.slotClassNames.reducedStart,
        mainArea && Layout.slotClassNames.reducedMain,
        endArea && Layout.slotClassNames.reducedEnd,
      )
      return (
        <ElementType {...unhandledProps} className={composedClasses}>
          {start || main || end}
        </ElementType>
      )
    }

    return (
      <ElementType {...unhandledProps} className={classes.root}>
        {startArea}
        {startArea && mainArea && renderGap({ ...this.props, classes })}
        {mainArea}
        {(startArea || mainArea) && endArea && renderGap({ ...this.props, classes })}
        {endArea}
      </ElementType>
    )
  }
}

Layout.slotClassNames = {
  start: `${Layout.className}__start`,
  main: `${Layout.className}__main`,
  end: `${Layout.className}__end`,
  gap: `${Layout.className}__gap`,
  reducedStart: `${Layout.className}--reduced__start`,
  reducedMain: `${Layout.className}--reduced__main`,
  reducedEnd: `${Layout.className}--reduced__end`,
}

/**
 * (DEPRECATED) A layout is a utility for arranging the content of a component.
 */
export default withSafeTypeForAs<typeof Layout, LayoutProps>(Layout)
