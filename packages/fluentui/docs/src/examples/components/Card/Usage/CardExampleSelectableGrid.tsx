import {
  Flex,
  Image,
  Text,
  Card,
  cardSelectableBehavior,
  Grid,
  cardsContainerBehavior,
  Checkbox,
  Button,
  screenReaderContainerStyles,
  hiddenComponentBehavior,
} from '@fluentui/react-northstar';
import * as React from 'react';
import * as _ from 'lodash';

type SelectableCardProps = {
  index?: number;
  title?: string;
  selected?: boolean;
  handleClick?: Function;
};

const SelectableCard: React.FC<SelectableCardProps> = ({ title, index, selected, handleClick, ...unhadledProps }) => {
  const selectedMessageId = `selectedMessageId${index}`;
  const selectedMessage = 'selected';
  const notSelectedMessage = 'not selected';
  return (
    <Card
      id={`card${index}`}
      accessibility={cardSelectableBehavior}
      aria-labelledby={`card${index} ${selectedMessageId}`}
      aria-roledescription="user card"
      onClick={() => {
        handleClick(!selected, index);
      }}
      selected={selected}
      {...unhadledProps}
    >
      <Card.Header>
        <Text content={title} weight="bold" />
      </Card.Header>
      <Card.TopControls>
        <Checkbox
          accessibility={hiddenComponentBehavior}
          checked={selected}
          onClick={(event, props) => {
            event.preventDefault();
            handleClick(props.checked, index);
          }}
        />
        <div id={selectedMessageId} style={screenReaderContainerStyles} aria-live="polite" role="presentation">
          {selected ? selectedMessage : notSelectedMessage}
        </div>
      </Card.TopControls>

      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="public/images/wireframe/square-image.png" />
        </Flex>
      </Card.Body>
    </Card>
  );
};

interface SelectableCardsGridAction {
  type: 'TOGGLE_ITEM' | 'TOGGLE_ALL';
  selected: boolean;
  itemKey?: string;
}

interface SelectableCardsGridState {
  cards: Record<string, boolean>;
}

const selectableCardsGridStateReducer: React.Reducer<SelectableCardsGridState, SelectableCardsGridAction> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      return { cards: { ...state.cards, [action.itemKey]: action.selected } };
    }
    case 'TOGGLE_ALL': {
      return { cards: _.mapValues(state.cards, () => action.selected) };
    }
    default:
      throw new Error(`Action ${action.type} is not supported`);
  }
};

const CardExampleSelectableGrid = () => {
  // Component setup
  const cardsNumber = 12;
  const cards = Array(cardsNumber)
    .fill(undefined)
    .map((item, index) => ({ index: index + 1, title: `User ${index + 1}` }));
  const initialState: SelectableCardsGridState = {
    cards: cards.reduce((cards, card) => {
      cards[card.index] = false;
      return cards;
    }, {}),
  };
  const [state, dispatch] = React.useReducer(selectableCardsGridStateReducer, initialState);
  const handleClick = (isSelected, index) => {
    dispatch({ type: 'TOGGLE_ITEM', selected: isSelected, itemKey: index });
  };

  return (
    <>
      <Button
        content="Select all"
        onClick={() => {
          dispatch({ type: 'TOGGLE_ALL', selected: true });
        }}
      />
      <Button
        content="Unselect all"
        onClick={() => {
          dispatch({ type: 'TOGGLE_ALL', selected: false });
        }}
      />
      <Grid accessibility={cardsContainerBehavior} columns="3">
        {cards.map(card => {
          return (
            <SelectableCard
              key={card.index}
              index={card.index}
              title={card.title}
              aria-label={`${card.title} ${card.index} of ${cardsNumber}`}
              handleClick={handleClick}
              selected={state.cards[card.index]}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default CardExampleSelectableGrid;
