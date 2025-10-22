import { CopyToClipboard } from '@fluentui/docs-components';
import { ComponentSlotStyle, Box } from '@fluentui/react-northstar';
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

const getColorBoxTextColor = (color: string | undefined, colorWhite: string, colorBlack: string): string => {
  if (color === undefined) {
    return colorWhite;
  }

  if (isSystemColor(color)) {
    switch (color) {
      case 'ButtonFace':
      case 'Canvas':
      case 'HighlightText':
        return colorBlack;
      case 'CanvasText':
      case 'GrayText':
      case 'Highlight':
      case 'LinkText':
      case 'ButtonText':
        return colorWhite;
    }
  }

  return Color(color).isDark() ? colorWhite : colorBlack;
};

const PADDING = {
  big: '4rem .75rem .75rem .75rem',
  small: '.75rem',
  normal: '2.5rem .75rem .75rem .75rem',
};
const FONT_SIZE = {
  big: '1.25em',
  small: '.85em',
  normal: '1.25em',
};

const ColorBox: React.FC<ColorBoxProps> = ({
  children,
  name,
  rounded,
  value,
  showColorValue = true,
  copyToClipboardIcon = true,
  size = 'normal',
}) => (
  <Box
    styles={({ theme: { siteVariables } }) => ({
      ...(showColorValue &&
        !_.isNil(value) && {
          backgroundImage:
            'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAKUlEQVQoU2NkYGAwZkAD////RxdiYBwKCv///4/hGUZGkNNRAeMQUAgAtxof+nLDzyUAAAAASUVORK5CYII=")',
          backgroundRepeat: 'repeat',
        }),
      ...(showColorValue &&
        _.isNil(value) && {
          backgroundColor: 'transparent',
        }),
      borderRadius: rounded && '.25rem',
      color: getColorBoxTextColor(value, siteVariables.colors.white, siteVariables.colors.black),
    })}
  >
    <Box
      styles={{
        backgroundColor: value,
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        fontSize: FONT_SIZE[size],
        padding: PADDING[size],
      }}
    >
      <Box
        styles={({ theme: { siteVariables } }) => ({
          color: siteVariables.colors.black,
          fontWeight: 700,
        })}
      >
        {children || _.startCase(name)}
      </Box>

      {copyToClipboardIcon && (
        <CopyToClipboard value={value}>
          {(active, onClick) => (
            <Box
              styles={{
                fontFamily: 'Monospace',
                textAlign: 'right',
                userSelect: 'all',

                '> span': {
                  cursor: 'pointer',
                },
              }}
            >
              <span onClick={onClick}>
                {value && active ? <AcceptIcon size="small" /> : <ClipboardCopiedToIcon size="small" />}
                {value || 'Not defined'}
              </span>
            </Box>
          )}
        </CopyToClipboard>
      )}
      {!copyToClipboardIcon && showColorValue && (
        <Box
          as="span"
          styles={{
            fontFamily: 'Monospace',
            textAlign: 'right',
            userSelect: 'all',
          }}
        >
          {value || 'Not defined'}
        </Box>
      )}
    </Box>
  </Box>
);

export default ColorBox;
