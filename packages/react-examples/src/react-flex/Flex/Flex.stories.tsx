import * as React from 'react';
import { Flex } from '@fluentui/react-flex';
import * as classes from './Flex.stories.scss';
import { select, text, boolean, number } from '@storybook/addon-knobs';
import {
  FlexDirectionProperty,
  JustifyContentProperty,
  AlignItemsProperty,
  MarginProperty,
  GlobalsNumber,
} from 'csstype';
import { useState } from '@storybook/addons';

const directionOptions: FlexDirectionProperty[] = ['row', 'row-reverse', 'column', 'column-reverse'];
const alignmentOptions: JustifyContentProperty[] | AlignItemsProperty[] = [
  'normal',
  'flex-start',
  'center',
  'flex-end',
  'space-around',
  'space-between',
  'space-evenly',
];
export const Default = () => (
  <Flex
    direction={select('Direction', directionOptions, 'row')}
    horizontalAlign={select('Horizontal Alignment', alignmentOptions, 'normal')}
    verticalAlign={select('Vertical Alignment', alignmentOptions, 'normal')}
    gap={text('Gap', '10px')}
    wrap={boolean('Wrap', false)}
    grow={number('Grow', 0)}
    shrink={number('Shrink', 1)}
    inline={boolean('Inline', false)}
    className={classes.wrapper}
  >
    <span>Item A</span>
    <span>Item B</span>
  </Flex>
);
