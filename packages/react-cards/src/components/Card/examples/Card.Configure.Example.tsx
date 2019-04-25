import * as React from 'react';
import {
  Card,
  ICardStyles,
  ICardTokens,
  ICardItemStyles,
  ICardItemTokens,
  ICardSectionStyles,
  ICardSectionTokens
} from '@uifabric/react-cards';
import { Checkbox, Icon, Stack, IStackTokens, Text, ITextStyles } from 'office-ui-fabric-react';

export interface IExampleState {
  debugMode: boolean;
}

export class CardConfigureExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      debugMode: false
    };
  }

  public render(): JSX.Element {
    const { debugMode } = this.state;

    // Style definitions
    const cardStyles: ICardStyles = {
      root: {
        backgroundColor: debugMode ? '#D8F6FF' : 'transparent'
      }
    };
    const cardSectionOrItemStyles: ICardSectionStyles | ICardItemStyles = {
      root: {
        borderStyle: 'dashed',
        borderWidth: '2px'
      }
    };
    const firstCardSectionOrItemStyles: ICardSectionStyles = {
      root: {
        backgroundColor: debugMode ? '#B0DEFF' : 'transparent',
        borderColor: debugMode ? '#2566CA' : 'transparent',
        height: 115,
        ...(cardSectionOrItemStyles.root as object)
      }
    };
    const secondCardSectionOrItemStyles: ICardSectionStyles = {
      root: {
        backgroundColor: debugMode ? '#ABFFEF' : 'transparent',
        borderColor: debugMode ? '#0F7A67' : 'transparent',
        height: 30,
        ...(cardSectionOrItemStyles.root as object)
      }
    };
    const thirdCardSectionOrItemStyles: ICardSectionStyles = {
      root: {
        backgroundColor: debugMode ? '#E8D4FF' : 'transparent',
        borderColor: debugMode ? '#7742B3' : 'transparent',
        ...(cardSectionOrItemStyles.root as object)
      }
    };

    // Token definitions
    const containerStackTokens: IStackTokens = { childrenGap: 30 };
    const cardTokens: ICardTokens = {
      childrenGap: 20,
      childrenMargin: 6
    };
    const cardSectionTokens: ICardSectionTokens = { padding: 6 };
    const cardItemTokens: ICardItemTokens = { padding: 6 };
    const debugCardTokens: ICardTokens = {
      boxShadow: 'none',
      childrenGap: 0,
      childrenMargin: 6,
      minWidth: 0
    };

    // Debug card esction definition
    const DebugCardSection = (props: { type: 'section' | 'item' | 'gap'; text: string }): JSX.Element => {
      const { type, text } = props;
      const height = type === 'section' ? 115 : type === 'item' ? 46 : 20;

      const debugCardSectionStyles: ICardSectionStyles = {
        root: {
          fontSize: 9,
          fontWeight: 400,
          height
        }
      };
      const debugHeading: ITextStyles = {
        root: {
          paddingLeft: 8
        }
      };

      const debugCardSectionTokens: ICardSectionTokens = {
        childrenGap: 2,
        margin: '0px 6px'
      };

      return (
        <Card.Section fill horizontal verticalAlign="center" styles={debugCardSectionStyles} tokens={debugCardSectionTokens}>
          {height >= 20 && (
            <>
              <Icon iconName="ChevronLeft" />
              <Icon iconName="Remove" />
              <Icon iconName="Remove" />
              <Icon iconName="Remove" />
              <Text variant="xSmall" styles={debugHeading}>
                {text}
              </Text>
            </>
          )}
        </Card.Section>
      );
    };

    return (
      <Stack tokens={containerStackTokens}>
        <Checkbox label="Toggle debug mode" onChange={this._onCheckboxChange} />

        <Stack horizontal>
          <Card styles={cardStyles} tokens={cardTokens}>
            <Card.Section styles={firstCardSectionOrItemStyles} tokens={cardSectionTokens}>
              <Text>This is a Card Section</Text>
              <Text>This is a Card Section</Text>
              <Text>This is a Card Section</Text>
            </Card.Section>
            <Card.Item styles={secondCardSectionOrItemStyles} tokens={cardItemTokens}>
              <Text>This is a Card Item</Text>
            </Card.Item>
            <Card.Section styles={thirdCardSectionOrItemStyles} tokens={cardSectionTokens}>
              <Text>This is a Card Section</Text>
              <Text>This is a Card Section</Text>
              <Text>This is a Card Section</Text>
            </Card.Section>
          </Card>

          {debugMode && (
            <Card root={{ props: { verticalAlign: 'center' } }} tokens={debugCardTokens}>
              <DebugCardSection type="section" text="Card Section" />
              <DebugCardSection type="gap" text="Gap" />
              <DebugCardSection type="item" text="Card Item" />
              <DebugCardSection type="gap" text="Gap" />
              <DebugCardSection type="section" text="Card Section" />
            </Card>
          )}
        </Stack>
      </Stack>
    );
  }

  private _onCheckboxChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ debugMode: isChecked });
  };
}
