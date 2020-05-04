import {
  Flex,
  Image,
  Text,
  Card,
  cardSelectableBehavior,
  Grid,
  selectableCardsContainerBehavior,
  Checkbox,
  Button,
} from '@fluentui/react-northstar';
import * as React from 'react';
import * as _ from 'lodash';

type SelectableCardProps = {
  index?: number;
  selected?: boolean;
  handleClick?: Function;
};

const SelectableCard: React.FC<SelectableCardProps> = ({ index, selected, handleClick }) => {
  return (
    <Card
      accessibility={cardSelectableBehavior}
      aria-roledescription="user card"
      onClick={() => {
        handleClick(!selected, index);
      }}
      selected={selected}
    >
      <Card.TopControls>
        <Checkbox
          aria-label={`User #${index} checkbox`}
          checked={selected}
          data-is-focusable="false"
          onClick={(event, props) => {
            event.preventDefault();
            handleClick(props.checked, index);
          }}
        />
      </Card.TopControls>
      <Card.Header>
        <Text content={`User #${index}`} weight="bold" />
      </Card.Header>
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
  const cardsNumber = 12;
  const cards = Array(cardsNumber)
    .fill(undefined)
    .map((item, index) => ({ key: index + 1, title: `Card ${index + 1}` }));
  const initialState: SelectableCardsGridState = {
    cards: cards.reduce((cards, card) => {
      cards[card.key] = false;
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
      <Grid accessibility={selectableCardsContainerBehavior} columns="3">
        {cards.map(card => {
          return (
            <SelectableCard
              key={card.key}
              index={card.key}
              aria-label={`${card.key} of ${cardsNumber}`}
              handleClick={handleClick}
              selected={state.cards[card.key]}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default CardExampleSelectableGrid;
