import * as React from 'react';
import { Avatar } from './index';

export const ColorPalette = () => (
  <div
    style={{
      display: 'grid',
      gap: '5px',
      // gridAutoFlow: 'column',
      gridTemplateColumns: 'repeat(auto-fill, 125px)',
      // gridTemplateRows: 'repeat(5, auto)',
    }}
  >
    <span>
      <Avatar color="darkRed" aria-label="darkRed color avatar" /> darkRed
    </span>
    <span>
      <Avatar color="cranberry" aria-label="cranberry color avatar" /> cranberry
    </span>
    <span>
      <Avatar color="red" aria-label="red color avatar" /> red
    </span>
    <span>
      <Avatar color="pumpkin" aria-label="pumpkin color avatar" /> pumpkin
    </span>
    <span>
      <Avatar color="peach" aria-label="peach color avatar" /> peach
    </span>
    <span>
      <Avatar color="marigold" aria-label="marigold color avatar" /> marigold
    </span>
    <span>
      <Avatar color="gold" aria-label="gold color avatar" /> gold
    </span>
    <span>
      <Avatar color="brass" aria-label="brass color avatar" /> brass
    </span>
    <span>
      <Avatar color="brown" aria-label="brown color avatar" /> brown
    </span>
    <span>
      <Avatar color="forest" aria-label="forest color avatar" /> forest
    </span>
    <span>
      <Avatar color="seafoam" aria-label="seafoam color avatar" /> seafoam
    </span>
    <span>
      <Avatar color="darkGreen" aria-label="darkGreen color avatar" /> darkGreen
    </span>
    <span>
      <Avatar color="lightTeal" aria-label="lightTeal color avatar" /> lightTeal
    </span>
    <span>
      <Avatar color="teal" aria-label="teal color avatar" /> teal
    </span>
    <span>
      <Avatar color="steel" aria-label="steel color avatar" /> steel
    </span>
    <span>
      <Avatar color="blue" aria-label="blue color avatar" /> blue
    </span>
    <span>
      <Avatar color="royalBlue" aria-label="royalBlue color avatar" /> royalBlue
    </span>
    <span>
      <Avatar color="cornflower" aria-label="cornflower color avatar" /> cornflower
    </span>
    <span>
      <Avatar color="navy" aria-label="navy color avatar" /> navy
    </span>
    <span>
      <Avatar color="lavender" aria-label="lavender color avatar" /> lavender
    </span>
    <span>
      <Avatar color="purple" aria-label="purple color avatar" /> purple
    </span>
    <span>
      <Avatar color="grape" aria-label="grape color avatar" /> grape
    </span>
    <span>
      <Avatar color="lilac" aria-label="lilac color avatar" /> lilac
    </span>
    <span>
      <Avatar color="pink" aria-label="pink color avatar" /> pink
    </span>
    <span>
      <Avatar color="magenta" aria-label="magenta color avatar" /> magenta
    </span>
    <span>
      <Avatar color="plum" aria-label="plum color avatar" /> plum
    </span>
    <span>
      <Avatar color="beige" aria-label="beige color avatar" /> beige
    </span>
    <span>
      <Avatar color="mink" aria-label="mink color avatar" /> mink
    </span>
    <span>
      <Avatar color="platinum" aria-label="platinum color avatar" /> platinum
    </span>
    <span>
      <Avatar color="anchor" aria-label="anchor color avatar" /> anchor
    </span>
  </div>
);

ColorPalette.parameters = {
  docs: {
    description: {
      story:
        "An avatar can have a specific named color from the theme's color palette " +
        ' (e.g. `seaFoam`, `grape`, or `pumpkin`)',
    },
  },
};
