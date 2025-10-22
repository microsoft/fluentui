import * as _ from 'lodash';
import * as React from 'react';
import { Box, ProviderConsumer } from '@fluentui/react-northstar';

import ColorBox from './ColorBox';

type ColorVariantsProps = {
  name: string;
  headerOnly?: boolean;
  size?: 'small' | 'normal' | 'big';
};

const ColorVariants: React.FC<ColorVariantsProps> = ({ name, headerOnly = false, size = 'big' }) => (
  <ProviderConsumer
    render={({ siteVariables: { colors } }) => (
      <Box
        styles={{
          border: '1px solid transparent',
          borderRadius: '.25rem',
          overflow: 'hidden',
        }}
      >
        <ColorBox
          name={name}
          size={size}
          value={colors[name][600] || colors[name][500] || colors[name][400]}
          copyToClipboardIcon={false}
        />

        {!headerOnly &&
          _.map(colors[name], (value, variable) => (
            <ColorBox key={variable} name={variable} size="small" value={value} />
          ))}
      </Box>
    )}
  />
);

export default ColorVariants;
