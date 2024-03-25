import * as React from 'react';
import { ImageSwatch } from '@fluentui/react-swatch-picker-preview';

const imagePath = 'https://fabricweb.azureedge.net/fabric-website/assets/images/swatch-picker/sea-swatch.jpg';
export const Default = () => <ImageSwatch src={imagePath} value="sea-img" />;
