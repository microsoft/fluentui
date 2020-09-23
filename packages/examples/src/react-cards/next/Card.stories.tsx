import * as React from 'react';
import { Card } from '@uifabric/react-cards/lib/next/index';
import * as classes from './Card.stories.scss';

function onClick() {
  alert('Card was clicked');
}

/**
 * Temporary Stack until there's one in its own package.
 */
const Stack = (props: React.PropsWithChildren<{ horizontal?: boolean }>) => {
  const { horizontal, ...rest } = props;

  return <div {...rest} className={horizontal ? classes.hStack : classes.vStack} />;
};

export const DefaultCard = () => (
  <Card>
    <span>This is a card</span>
    <span>This is a card</span>
    <span>This is a card</span>
  </Card>
);

export const ClickableCard = () => (
  <Card onClick={onClick}>
    <span>This is a card</span>
    <span>This is a card</span>
    <span>This is a card</span>
  </Card>
);

export const CompactCard = () => (
  <Card compact onClick={onClick}>
    <span>This is a card</span>
    <span>This is a card</span>
    <span>This is a card</span>
  </Card>
);

export const DisabledCard = () => (
  <Card disabled onClick={onClick}>
    <span>This is a card</span>
    <span>This is a card</span>
    <span>This is a card</span>
  </Card>
);

export const SelectedCard = () => (
  <Card selected onClick={onClick}>
    <span>This is a card</span>
    <span>This is a card</span>
    <span>This is a card</span>
  </Card>
);

export const FluidCard = () => (
  <Card fluid onClick={onClick}>
    <span>This is a card</span>
    <span>This is a card</span>
    <span>This is a card</span>
  </Card>
);

export const CardSizes = () => (
  <Stack>
    <Card size="small" onClick={onClick}>
      <span>This is a card</span>
      <span>This is a card</span>
      <span>This is a card</span>
    </Card>
    <Card size="medium" onClick={onClick}>
      <span>This is a card</span>
      <span>This is a card</span>
      <span>This is a card</span>
    </Card>
    <Card size="large" onClick={onClick}>
      <span>This is a card</span>
      <span>This is a card</span>
      <span>This is a card</span>
    </Card>
  </Stack>
);
