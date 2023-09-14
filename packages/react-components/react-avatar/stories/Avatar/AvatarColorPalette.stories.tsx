import * as React from 'react';
import { Avatar } from '@fluentui/react-components';

export const ColorPalette = () => (
  <>
    <Avatar initials="DR" color="dark-red" name="darkRed avatar" />
    <Avatar initials="CR" color="cranberry" name="cranberry avatar" />
    <Avatar initials="RE" color="red" name="red avatar" />
    <Avatar initials="PU" color="pumpkin" name="pumpkin avatar" />
    <Avatar initials="PE" color="peach" name="peach avatar" />
    <Avatar initials="MA" color="marigold" name="marigold avatar" />
    <Avatar initials="GO" color="gold" name="gold avatar" />
    <Avatar initials="BS" color="brass" name="brass avatar" />
    <Avatar initials="BR" color="brown" name="brown avatar" />
    <Avatar initials="FO" color="forest" name="forest avatar" />
    <Avatar initials="SE" color="seafoam" name="seafoam avatar" />
    <Avatar initials="DG" color="dark-green" name="darkGreen avatar" />
    <Avatar initials="LT" color="light-teal" name="lightTeal avatar" />
    <Avatar initials="TE" color="teal" name="teal avatar" />
    <Avatar initials="ST" color="steel" name="steel avatar" />
    <Avatar initials="BL" color="blue" name="blue avatar" />
    <Avatar initials="RB" color="royal-blue" name="royalBlue avatar" />
    <Avatar initials="CO" color="cornflower" name="cornflower avatar" />
    <Avatar initials="NA" color="navy" name="navy avatar" />
    <Avatar initials="LA" color="lavender" name="lavender avatar" />
    <Avatar initials="PU" color="purple" name="purple avatar" />
    <Avatar initials="GR" color="grape" name="grape avatar" />
    <Avatar initials="LI" color="lilac" name="lilac avatar" />
    <Avatar initials="PI" color="pink" name="pink avatar" />
    <Avatar initials="MA" color="magenta" name="magenta avatar" />
    <Avatar initials="PL" color="plum" name="plum avatar" />
    <Avatar initials="BE" color="beige" name="beige avatar" />
    <Avatar initials="MI" color="mink" name="mink avatar" />
    <Avatar initials="PL" color="platinum" name="platinum avatar" />
    <Avatar initials="AN" color="anchor" name="anchor avatar" />
  </>
);

ColorPalette.storyName = 'Color: named color';
ColorPalette.parameters = {
  docs: {
    description: {
      story:
        "An avatar can have a specific named color from the theme's color palette " +
        ' (e.g. `seafoam`, `grape`, or `pumpkin`)',
    },
  },
};
