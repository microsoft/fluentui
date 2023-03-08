import { ComponentMeta } from '@storybook/react';
import { Image } from '@fluentui/react-northstar';
import ImageExampleRtl from '../../examples/components/Image/Rtl/ImageExample.rtl';
import ImageExample from '../../examples/components/Image/Types/ImageExample.shorthand';
import ImageExampleAvatar from '../../examples/components/Image/Types/ImageExampleAvatar.shorthand';
import ImageExampleCircular from '../../examples/components/Image/Variations/ImageExampleCircular';
import ImageExampleFluent from '../../examples/components/Image/Variations/ImageExampleFluid';

export default { component: Image, title: 'Image' } as ComponentMeta<typeof Image>;

export { ImageExampleRtl, ImageExample, ImageExampleAvatar, ImageExampleCircular, ImageExampleFluent };
