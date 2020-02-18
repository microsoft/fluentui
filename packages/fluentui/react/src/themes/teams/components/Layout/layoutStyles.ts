import { debugRoot, debugArea, debugGap } from '../../../../styles/debugStyles'
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles'
import { LayoutProps } from '../../../../components/Layout/Layout'

const countTrue = items => items.filter(Boolean).length

const layoutStyles: ComponentSlotStylesPrepared<LayoutProps> = {
  root: ({ props }): ICSSInJSStyle => {
    const {
      alignItems,
      debug,
      gap,
      justifyItems,
      main,
      mainSize,
      end,
      endSize,
      rootCSS,
      start,
      startSize,
      vertical,
    } = props

    return {
      ...(debug && debugRoot()),
      justifyItems,
      alignItems,
      display: 'grid',
      [vertical ? 'gridTemplateRows' : 'gridTemplateColumns']: [
        // Heads up!
        // IE11 Doesn't support grid-gap, insert virtual columns instead
        start && startSize,
        gap && start && main && gap,
        main && mainSize,
        gap && (start || main) && end && gap,
        end && endSize,
      ]
        .filter(Boolean)
        .join(' '),
      ...(vertical && {
        gridAutoFlow: 'row',
        '-ms-grid-columns': '1fr',
      }),
      ...rootCSS,
    }
  },

  gap: ({ props }): ICSSInJSStyle => ({
    ...(props.debug && debugGap({ vertical: props.vertical })),
  }),

  start: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: 'inline-flex',
    [p.vertical ? '-ms-grid-row' : '-ms-grid-column']: '1',
    ...p.startCSS,
  }),

  main: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: 'grid',
    [p.vertical ? '-ms-grid-row' : '-ms-grid-column']: countTrue([
      p.start,
      p.start && p.gap,
      p.main,
    ]),
    ...p.mainCSS,
  }),

  end: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: 'inline-flex',
    [p.vertical ? '-ms-grid-row' : '-ms-grid-column']: countTrue([
      p.start,
      p.start && p.gap,
      p.main,
      p.main && p.gap,
      p.end,
    ]),
    ...p.endCSS,
  }),
}

export default layoutStyles
