import * as React from 'react';
import { Card, CardProps } from '@fluentui/react-cards';
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

const ExampleCard = (props: CardProps) => (
  <Stack>
    <Card {...props}>
      <span>This is a card</span>
      <span>This is a card</span>
      <span>This is a card</span>
    </Card>
  </Stack>
);

export const DefaultCard = () => <ExampleCard />;

export const ClickableCard = () => <ExampleCard onClick={onClick} />;

export const CompactCard = () => <ExampleCard compact onClick={onClick} />;

export const DisabledCard = () => <ExampleCard disabled onClick={onClick} />;

export const SelectedCard = () => <ExampleCard selected onClick={onClick} />;

export const BlockCard = () => <ExampleCard block onClick={onClick} />;

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
