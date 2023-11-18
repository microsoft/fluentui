import { GriffelStyle } from '@fluentui/react-components';

const ALIGN = {
  auto: { alignSelf: 'auto' },
  start: { alignSelf: 'flex-start' },
  end: { alignSelf: 'flex-end' },
  center: { alignSelf: 'center' },
  baseline: { alignSelf: 'baseline' },
  stretch: { alignSelf: 'stretch' },
};

const SIZE = {
  half: { flexBasis: '50%' },
  quarter: { flexBasis: '25%' },
  small: { flexBasis: '150px' },
  medium: { flexBasis: '200px' },
  large: { flexBasis: '300px' },
};

const align = (value: 'auto' | 'start' | 'end' | 'center' | 'baseline' | 'stretch'): GriffelStyle => ALIGN[value];

const size = (value: 'half' | 'quarter' | 'small' | 'medium' | 'large'): GriffelStyle => SIZE[value];

const grow = (flexGrow: boolean | number): GriffelStyle | undefined => {
  if (flexGrow === true) {
    return { flexGrow: 1 };
  } else if (flexGrow) {
    return { flexGrow };
  } else {
    return undefined;
  }
};

const shrink = (flexShrink: boolean | number): GriffelStyle | undefined => {
  if (typeof flexShrink === 'number') {
    return { flexShrink };
  } else if (flexShrink === false) {
    return { flexShrink: 0 };
  } else {
    return undefined;
  }
};

const pushRow = (): GriffelStyle => ({ marginLeft: 'auto' });
const pushColumn = (): GriffelStyle => ({ marginTop: 'auto' });

export const flexItem = {
  align,
  size,
  grow,
  shrink,
  pushRow,
  pushColumn,
};
