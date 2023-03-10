import { ComponentMeta } from '@storybook/react';
import { Card } from '@fluentui/react-northstar';
import CardExampleBody from '../../examples/components/Card/Slots/CardExampleBody';
import CardExampleFooter from '../../examples/components/Card/Slots/CardExampleFooter';
import CardExampleHeader from '../../examples/components/Card/Slots/CardExampleHeader';
import CardExamplePreview from '../../examples/components/Card/Slots/CardExamplePreview';
import CardExampleDisabled from '../../examples/components/Card/States/CardExampleDisabled';
import CardExampleSelected from '../../examples/components/Card/States/CardExampleSelected';
import CardExampleContextMenu from '../../examples/components/Card/Usage/CardExampleContextMenu';
import CardExampleExpandable from '../../examples/components/Card/Usage/CardExampleExpandable';
import CardExampleFocusableGrid from '../../examples/components/Card/Usage/CardExampleFocusableChildrenGrid';
import CardExampleSelectableGrid from '../../examples/components/Card/Usage/CardExampleSelectableGrid';
import CardExampleSimple from '../../examples/components/Card/Usage/CardExampleSimple';
import CardExampleCentered from '../../examples/components/Card/Variations/CardExampleCentered';
import CardExampleElevated from '../../examples/components/Card/Variations/CardExampleElevated';
import ImageExampleFluent from '../../examples/components/Card/Variations/CardExampleFluid';
import CardExampleHorizontal from '../../examples/components/Card/Variations/CardExampleHorizontal';
import CardExampleInverted from '../../examples/components/Card/Variations/CardExampleInverted';
import CardExampleQuiet from '../../examples/components/Card/Variations/CardExampleQuiet';
import CardExampleSize from '../../examples/components/Card/Variations/CardExampleSize';

export default { component: Card, title: 'Card' } as ComponentMeta<typeof Card>;

export {
  CardExampleBody,
  CardExampleFooter,
  CardExampleHeader,
  CardExamplePreview,
  CardExampleDisabled,
  CardExampleSelected,
  CardExampleContextMenu,
  CardExampleExpandable,
  CardExampleFocusableGrid,
  CardExampleSelectableGrid,
  CardExampleSimple,
  CardExampleCentered,
  CardExampleElevated,
  ImageExampleFluent,
  CardExampleHorizontal,
  CardExampleInverted,
  CardExampleQuiet,
  CardExampleSize,
};
