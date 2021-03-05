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
  onClick?: (e: React.SyntheticEvent) => void;
};

const SelectableCard: React.FC<SelectableCardProps> = ({ title, index, selected, onClick, ...rest }) => {
  const selectedMessageId = `selectedMessageId${index}`;
  const selectedMessage = 'selected';
  const notSelectedMessage = 'not selected';
  return (
    <Card
      id={`card${index}`}
      accessibility={cardSelectableBehavior}
      aria-labelledby={`card${index} ${selectedMessageId}`}
      aria-roledescription="user card"
      onClick={onClick}
      selected={selected}
      {...rest}
    >
      <Card.Header>
        <Text content={title} weight="bold" />
      </Card.Header>
      <Card.TopControls>
        <Checkbox accessibility={hiddenComponentBehavior} checked={selected} onClick={onClick} />
        <div id={selectedMessageId} style={screenReaderContainerStyles} aria-live="polite" role="presentation">
          {selected ? selectedMessage : notSelectedMessage}
        </div>
      </Card.TopControls>

      <Card.Body>
        <Flex column gap="gap.small">
          <Image src="https://fabricweb.azureedge.net/fabric-website/assets/images/wireframe/square-image.png" />
        </Flex>
      </Card.Body>
    </Card>
  );
};

type SelectableCardsGridActions =
  | { type: 'TOGGLE_ITEM'; selected: boolean; index: string }
  | { type: 'TOGGLE_ALL'; selected: boolean };

type SelectableCardsGridState = Record<string, boolean>;

const selectableCardsGridStateReducer: React.Reducer<SelectableCardsGridState, SelectableCardsGridActions> = (
  state,
  action,
) => {
  switch (action.type) {
    case 'TOGGLE_ITEM': {
      return { ...state, [action.index]: action.selected };
    }
    case 'TOGGLE_ALL': {
      return _.mapValues(state, () => action.selected);
    }
  }
};

const CardExampleSelectableGrid = () => {
  // Component setup
  const cardsNumber = 12;
  const cards = Array(cardsNumber)
    .fill(undefined)
    .map((item, index) => ({ index: index + 1, title: `User ${index + 1}` }));
  const initialState: SelectableCardsGridState = cards.reduce((cards, card) => {
    cards[card.index] = false;
    return cards;
  }, {});
  const [state, dispatch] = React.useReducer(selectableCardsGridStateReducer, initialState);

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
      <Grid accessibility={cardsContainerBehavior} columns={3}>
        {cards.map(card => {
          return (
            <SelectableCard
              key={card.index}
              index={card.index}
              title={card.title}
              aria-label={`${card.title} ${card.index} of ${cardsNumber}`}
              onClick={() => {
                dispatch({ type: 'TOGGLE_ITEM', selected: !state[card.index], index: `${card.index}` });
              }}
              selected={state[card.index]}
            />
          );
        })}
      </Grid>
    </>
  );
};

export default CardExampleSelectableGrid;
