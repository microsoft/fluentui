import { ICSSInJSStyle } from '@fluentui/styles';

const debugStyle = ({ name, color, style }): ICSSInJSStyle => ({
  position: 'relative',
  border: `2px ${style} ${color}`,
  '::before': {
    content: `'${name}'`,
    position: 'absolute',
    padding: '1px 4px 1px',
    top: '-2px',
    left: '-2px',
    fontSize: '8px',
    fontWeight: 900,
    lineHeight: 1,
    letterSpacing: '1px',
    color: '#fff',
    background: color,
  },
});

export const debugRoot = (): ICSSInJSStyle => ({
  ...debugStyle({ name: 'LAYOUT', color: 'cornflowerblue', style: 'solid' }),
  padding: '8px',
  margin: '2px',
});

export const debugArea = (): ICSSInJSStyle => ({
  ...debugStyle({ name: 'AREA', color: 'lightsalmon', style: 'dashed' }),
  padding: '8px',
  margin: '2px',
});

export const debugGap = ({ vertical }): ICSSInJSStyle => ({
  display: 'grid',
  background: '#ccc',
  '::before': {
    content: '"GAP"',
    ...(vertical
      ? {
          letterSpacing: '1px',
        }
      : {
          textOrientation: 'upright',
          writingMode: 'vertical-rl',
        }),
    alignSelf: 'center',
    justifySelf: 'center',
    fontSize: '8px',
    fontWeight: 900,
    lineHeight: 0,
    color: '#fff',
  },
});
