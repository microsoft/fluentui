Sequential slide animations with different timing and directions.

```tsx
import { Slide } from '@fluentui/react-motion-components-preview';

function SequentialSlides() {
  const [visibleCards, setVisibleCards] = useState(new Set());

  const playSequence = () => {
    cards.forEach((card, index) => {
      setTimeout(() => {
        setVisibleCards(prev => new Set([...prev, card.id]));
      }, index * 200);
    });
  };

  return (
    <>
      {cards.map(card => (
        <Slide key={card.id} visible={visibleCards.has(card.id)} fromX={card.fromX} fromY={card.fromY} duration={350}>
          <Card>{card.content}</Card>
        </Slide>
      ))}
    </>
  );
}
```

This example demonstrates how to create staggered entrance animations with different slide directions for each item.
