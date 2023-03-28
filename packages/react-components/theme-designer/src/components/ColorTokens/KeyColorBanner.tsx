import * as React from 'react';
import { Text } from '@fluentui/react-components';
import { contrast, hex_to_sRGB } from '../../colors';

export interface KeyColorBannerProps {
  keyColor: string;
}
export const KeyColorBanner = (props: KeyColorBannerProps) => {
  return (
    <div
      style={{
        backgroundColor: props.keyColor,
        padding: '8px 8px 8px 8px',
        textAlign: 'center',
      }}
    >
      <Text style={{ color: contrast(hex_to_sRGB(props.keyColor), hex_to_sRGB('#FFFFFF')) <= 4.5 ? 'black' : 'white' }}>
        Key color {props.keyColor.toUpperCase()}
      </Text>
    </div>
  );
};
