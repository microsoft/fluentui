import * as React from 'react';
import { Flex, Text } from '@fluentui/react-northstar';
import { createImgIcon, ImgIconContext, ImgUrlConfig, ImgUrlResolverProps } from '@fluentui/react-bindings';

const AccdbIcon = createImgIcon({
  name: 'accdb',
  displayName: 'AccdbIcon',
});

const AccdbPngIcon = createImgIcon({
  name: 'accdb',
  displayName: 'AccdbIcon',
  type: 'png',
});

const urlResolver = (urlConfig: ImgUrlConfig | undefined, props: ImgUrlResolverProps) => {
  const { baseUrl, queryString } = urlConfig || {};
  const { size = 16, sizeModifier, type, name } = props || {};

  let svgUrl = `${baseUrl}/${size}${
    sizeModifier && type === 'png' ? `_${sizeModifier}` : ''
  }/${name}.${type}?${queryString}`;

  // SVGs scale well, so you can generally use the default image.
  // 1.5x is a special case where both SVGs and PNGs need a different image.
  // Remove if statements when missing image files for 20_1.5x are provided.
  if (size === 20 && sizeModifier === '1.5x') {
    svgUrl = `${baseUrl}/${size}_${sizeModifier}/${name}.${type}?${queryString}`;
  }

  return svgUrl;
};

const IconExample = () => (
  <ImgIconContext.Provider
    value={{
      urlConfig: {
        baseUrl: 'https://spoprod-a.akamaihd.net/files/fabric/assets/item-types',
        queryString: 'v6',
      },
      urlResolver,
    }}
  >
    <Flex column>
      <Text content={'SVG icons'} />
      <Flex gap="gap.smaller">
        <AccdbIcon />
        <AccdbIcon size={20} />
        <AccdbIcon size={24} />
        <AccdbIcon size={32} />
        <AccdbIcon size={40} />
        <AccdbIcon size={48} />
        <AccdbIcon size={64} />
        <AccdbIcon size={96} />
      </Flex>
      <Text content="PNG icons" />
      <Flex gap="gap.smaller">
        <AccdbPngIcon />
        <AccdbPngIcon size={20} />
        <AccdbPngIcon size={24} />
        <AccdbPngIcon size={32} />
        <AccdbPngIcon size={40} />
        <AccdbPngIcon size={48} />
        <AccdbPngIcon size={64} />
        <AccdbPngIcon size={96} />
      </Flex>
      <Text content="Size modifiers for size 24 svg" />
      <Flex gap="gap.smaller">
        <AccdbIcon size={24} sizeModifier="1.5x" />
        <AccdbIcon size={24} sizeModifier="2x" />
        <AccdbIcon size={24} sizeModifier="3x" />
        <AccdbIcon size={24} sizeModifier="4x" />
      </Flex>
      <Text content="Size modifiers for size 24 png" />
      <Flex gap="gap.smaller">
        <AccdbPngIcon size={24} sizeModifier="1.5x" />
        <AccdbPngIcon size={24} sizeModifier="2x" />
        <AccdbPngIcon size={24} sizeModifier="3x" />
        <AccdbPngIcon size={24} sizeModifier="4x" />
      </Flex>
    </Flex>
  </ImgIconContext.Provider>
);

export default IconExample;
