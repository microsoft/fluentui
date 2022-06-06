import { CopyToClipboard } from '@fluentui/docs-components';
import {
  ComponentSlotStylesInput,
  ComponentSlotStyle,
  createComponent,
  ICSSInJSStyle,
} from '@fluentui/react-northstar';
import { AcceptIcon, ClipboardCopiedToIcon } from '@fluentui/react-icons-northstar';
import * as Color from 'color';
import * as _ from 'lodash';
import * as React from 'react';
import { isSystemColor } from '../utils';

type ColorBoxProps = {
  children?: React.ReactNode;
  name?: string;
  copyToClipboardIcon?: boolean;
  rounded?: boolean;
  size?: 'small' | 'normal' | 'big';
  value: string;
  showColorValue?: boolean;
  styles?: ComponentSlotStyle;
};

type ColorBoxVariables = {
  colorBlack: string;
  colorWhite: string;
  fontSize: {
    big: string;
    normal: string;
    small: string;
  };
  padding: {
    big: string;
    normal: string;
    small: string;
  };
};

export const colorBoxVariables = (siteVariables): ColorBoxVariables => ({
  colorBlack: siteVariables.colors.black,
  colorWhite: siteVariables.colors.white,
  fontSize: {
    big: '1.25em',
    small: '.85em',
    normal: '1.25em',
  },
  padding: {
    big: '4rem .75rem .75rem .75rem',
    small: '.75rem',
    normal: '2.5rem .75rem .75rem .75rem',
  },
});

const getColorBoxTextColor = (color: string | undefined, variables: ColorBoxVariables): string => {
  if (color === undefined) {
    return variables.colorWhite;
  }

  if (isSystemColor(color)) {
    switch (color) {
      case 'ButtonFace':
      case 'Canvas':
      case 'HighlightText':
        return variables.colorBlack;
      case 'CanvasText':
      case 'GrayText':
      case 'Highlight':
      case 'LinkText':
      case 'ButtonText':
        return variables.colorWhite;
    }
  }

  return Color(color).isDark() ? variables.colorWhite : variables.colorBlack;
};

export const colorBoxStyles: ComponentSlotStylesInput<ColorBoxProps, ColorBoxVariables> = {
  root: ({ props: p, variables: v }): ICSSInJSStyle => ({
    ...(p.showColorValue &&
      !_.isNil(p.value) && {
        backgroundImage:
          'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKUlEQVQoU2NkYGAwZkAD////RxdiYBwKCv///4/hGUZGkNNRAeMQUAgAtxof+nLDzyUAAAAASUVORK5CYII=")',
        backgroundRepeat: 'repeat',
      }),
    ...(p.showColorValue &&
      _.isNil(p.value) && {
        backgroundColor: 'transparent',
      }),
    borderRadius: p.rounded && '.25rem',
    color: getColorBoxTextColor(p.value, v),
  }),
  inner: ({ props: p, variables: v }) => ({
    backgroundColor: p.value,
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    fontSize: v.padding[p.size],
    padding: v.padding[p.size],
  }),
  name: ({ variables: v }) => ({
    color: v.colorBlack,
    fontWeight: 700,
  }),
  value: {
    fontFamily: 'Monospace',
    textAlign: 'right',
    userSelect: 'all',

    '> span': {
      cursor: 'pointer',
    },
  },
};

const ColorBox = createComponent<ColorBoxProps>({
  displayName: 'ColorBox',
  render: ({ children, name, value, showColorValue, copyToClipboardIcon, config: { classes } }) => (
    <div className={classes.root}>
      <div className={classes.inner}>
        <div className={classes.name}>{children || _.startCase(name)}</div>

        {copyToClipboardIcon && (
          <CopyToClipboard value={value}>
            {(active, onClick) => (
              <div className={classes.value}>
                <span onClick={onClick}>
                  {value && active ? <AcceptIcon size="small" /> : <ClipboardCopiedToIcon size="small" />}
                  {value || 'Not defined'}
                </span>
              </div>
            )}
          </CopyToClipboard>
        )}
        {!copyToClipboardIcon && showColorValue && <span className={classes.value}>{value || 'Not defined'}</span>}
      </div>
    </div>
  ),
});

ColorBox.defaultProps = {
  size: 'normal',
  copyToClipboardIcon: true,
  showColorValue: true,
};

export default ColorBox;
