import * as React from 'react';
import { Avatar, AvatarProps } from './index';

export const ColorBrand = (props: Partial<AvatarProps>) => <Avatar {...props} color="brand" />;

ColorBrand.storyName = 'Color: brand';
