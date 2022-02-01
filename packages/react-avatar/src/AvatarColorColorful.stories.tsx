import * as React from 'react';
import { Avatar } from './index';

export const ColorColorful = () => (
  <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
    <Avatar color="colorful" name="Katri Athokas" />
    <Avatar color="colorful" name="Elvia Atkins" />
    <Avatar color="colorful" name="Mauricio August" />
    <Avatar color="colorful" name="Robin Counts" />
    <Avatar color="colorful" name="Cameron Evans" />
    <Avatar color="colorful" name="Miguel Garcia" />
    <Avatar color="colorful" name="Wanda Howard" />
    <Avatar color="colorful" name="Mona Kane" />
    <Avatar color="colorful" name="Johnie McConnell" />
    <Avatar color="colorful" name="Allan Munger" />
    <Avatar color="colorful" name="Daisy Phillips" />
    <Avatar color="colorful" name="Carlos Slattery" />
    <Avatar color="colorful" name="Robert Tolbert" />
    <Avatar color="colorful" name="Kevin Sturgis" />
    <Avatar color="colorful" name="Charlotte Waltson" />
    <Avatar color="colorful" name="Elliot Woodward" />
    <Avatar color="colorful" aria-label="Unknown user #1" idForColor="1" />
    <Avatar color="colorful" aria-label="Unknown user #42" idForColor="42" />
    <Avatar color="colorful" aria-label="Unknown user #99" idForColor="99" />
    <Avatar color="colorful" aria-label="Unknown user #23" idForColor="User-23" />
  </div>
);

ColorColorful.storyName = 'Color: colorful';
ColorColorful.parameters = {
  docs: {
    description: {
      story:
        'An avatar can have the color be automatically generated from the `name` prop ' +
        '(or `idForColor` can be used if a name is not available).',
    },
  },
};
