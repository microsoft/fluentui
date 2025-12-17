import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { RangeSlider, RangeSliderProps } from '@fluentui/react-components';

export const Default = (props: Partial<RangeSliderProps>): JSXElement => <RangeSlider {...props} />;
