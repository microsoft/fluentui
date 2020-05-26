import { debugRoot, debugArea, debugGap } from '../../../../styles/debugStyles';
import { ComponentSlotStylesPrepared, ICSSInJSStyle } from '@fluentui/styles';
import { LayoutStylesProps } from '../../../../components/Layout/Layout';

const countTrue = items => items.filter(Boolean).length;

const layoutStyles: ComponentSlotStylesPrepared<LayoutStylesProps> = {
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
      // rootCSS,
      start,
      startSize,
      vertical,
    } = props;

    return {
      ...(debug && debugRoot()),
      justifyItems,
      alignItems,
      display: ['grid', '-ms-grid'],
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
    };
  },

  gap: ({ props }): ICSSInJSStyle => ({
    ...(props.debug && debugGap({ vertical: props.vertical })),
  }),

  start: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: 'inline-flex',
    [p.vertical ? '-ms-grid-row' : '-ms-grid-column']: '1',
  }),

  main: ({ props: p }): ICSSInJSStyle => ({
    ...(p.debug && debugArea()),
    alignItems: 'center',
    display: ['grid', '-ms-grid'],
    [p.vertical ? '-ms-grid-row' : '-ms-grid-column']: countTrue([p.start, p.start && p.gap, p.main]),
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
  }),
};

export default layoutStyles;
