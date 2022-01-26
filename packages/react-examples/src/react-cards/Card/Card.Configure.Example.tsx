import * as React from 'react';
import {
  Card,
  ICardStyles,
  ICardTokens,
  ICardItemStyles,
  ICardItemTokens,
  ICardSectionStyles,
  ICardSectionTokens,
} from '@fluentui/react-cards';
import {
  Checkbox,
  Dropdown,
  IDropdownOption,
  Icon,
  Slider,
  Stack,
  IStackTokens,
  Text,
  ITextStyles,
} from '@fluentui/react';

/* eslint-disable deprecation/deprecation */

export type FilledSectionKey = '0' | '1' | '2' | '3';

export interface IExampleState {
  cardChildrenGap: number;
  cardChildrenMargin: number;
  cardChildrenPadding: number;
  cardItemHeight: number;
  debugMode: boolean;
  filledSection: FilledSectionKey;
  firstCardSectionHeight: number;
  secondCardSectionHeight: number;
  specificChildrenGap: number;
  specificChildrenGapAllowed: boolean;
  width: number;
}

export class CardConfigureExample extends React.Component<{}, IExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      cardChildrenGap: 20,
      cardChildrenMargin: 6,
      cardChildrenPadding: 6,
      cardItemHeight: 30,
      debugMode: true,
      filledSection: '0',
      firstCardSectionHeight: 115,
      secondCardSectionHeight: 115,
      specificChildrenGap: 20,
      specificChildrenGapAllowed: false,
      width: 212,
    };
  }

  public render(): JSX.Element {
    const {
      cardChildrenGap,
      cardChildrenMargin,
      cardChildrenPadding,
      cardItemHeight,
      debugMode,
      filledSection,
      firstCardSectionHeight,
      secondCardSectionHeight,
      specificChildrenGap,
      specificChildrenGapAllowed,
      width,
    } = this.state;

    // Style definitions
    const cardStyles: ICardStyles = {
      root: {
        backgroundColor: debugMode ? '#D8F6FF' : 'transparent',
      },
    };
    const cardSectionOrItemStyles: ICardSectionStyles | ICardItemStyles = {
      root: {
        borderStyle: 'dashed',
        borderWidth: '2px',
      },
    };
    const firstCardSectionStyles: ICardSectionStyles = {
      root: {
        backgroundColor: debugMode ? '#B0DEFF' : 'transparent',
        borderColor: debugMode ? '#2566CA' : 'transparent',
        minHeight: firstCardSectionHeight,
        ...(cardSectionOrItemStyles.root as object),
      },
    };
    const cardItemStyles: ICardSectionStyles = {
      root: {
        backgroundColor: debugMode ? '#ABFFEF' : 'transparent',
        borderColor: debugMode ? '#0F7A67' : 'transparent',
        minHeight: cardItemHeight,
        ...(cardSectionOrItemStyles.root as object),
      },
    };
    const secondCardSectionStyles: ICardSectionStyles = {
      root: {
        backgroundColor: debugMode ? '#E8D4FF' : 'transparent',
        borderColor: debugMode ? '#7742B3' : 'transparent',
        minHeight: secondCardSectionHeight,
        ...(cardSectionOrItemStyles.root as object),
      },
    };

    const resolvedGap = specificChildrenGapAllowed ? specificChildrenGap : cardChildrenGap;

    // Token definitions
    const containerStackTokens: IStackTokens = { childrenGap: 30 };
    const lastConfigOptionsStackTokens: IStackTokens = { childrenGap: 8 };
    const cardTokens: ICardTokens = {
      childrenGap: cardChildrenGap,
      childrenMargin: cardChildrenMargin,
      maxWidth: 400,
      minWidth: 212,
      width,
    };
    const cardSectionTokens: ICardSectionTokens = {
      childrenGap: resolvedGap,
      padding: cardChildrenPadding,
    };
    const cardItemTokens: ICardItemTokens = { padding: cardChildrenPadding };
    const debugCardTokens: ICardTokens = {
      boxShadow: 'none',
      childrenGap: 0,
      minWidth: 0,
    };

    // Debug card esction definition
    const DebugCardSection = (props: { height: number; text: string }): JSX.Element => {
      const { height, text } = props;

      const debugCardSectionStyles: ICardSectionStyles = {
        root: {
          fontSize: 9,
          fontWeight: 400,
          height,
        },
      };
      const debugHeading: ITextStyles = {
        root: {
          paddingLeft: 8,
        },
      };

      const debugCardSectionTokens: ICardSectionTokens = {
        childrenGap: 2,
        margin: `0px 6px`,
      };

      return (
        <Card.Section
          fill
          horizontal
          verticalAlign="center"
          styles={debugCardSectionStyles}
          tokens={debugCardSectionTokens}
        >
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
        <Stack horizontal verticalAlign="center">
          <Stack.Item grow>
            <Stack>
              <Slider
                label="First card section height:"
                min={75}
                max={230}
                step={1}
                defaultValue={115}
                showValue={true}
                onChange={this._onFirstCardSectionHeightChange}
              />
              <Slider
                label="Card item height:"
                min={30}
                max={60}
                step={1}
                defaultValue={30}
                showValue={true}
                onChange={this._onCardItemHeightChange}
              />
              <Slider
                label="Second card section height:"
                min={75}
                max={230}
                step={1}
                defaultValue={115}
                showValue={true}
                onChange={this._onSecondCardSectionHeightChange}
              />
            </Stack>
          </Stack.Item>
          <Stack.Item grow>
            <Stack>
              <Slider
                label="Card width:"
                min={212}
                max={400}
                step={1}
                defaultValue={212}
                showValue={true}
                onChange={this._onCardWidthChange}
              />
              <Slider
                label="Card children gap:"
                min={0}
                max={40}
                step={1}
                defaultValue={20}
                showValue={true}
                onChange={this._onCardChildrenGapChange}
              />
              <Slider
                label="Card children margin:"
                min={0}
                max={15}
                step={1}
                defaultValue={6}
                showValue={true}
                onChange={this._onCardChildrenMarginChange}
              />
            </Stack>
          </Stack.Item>
          <Stack.Item grow>
            <Stack tokens={lastConfigOptionsStackTokens}>
              <Slider
                label="Card children padding:"
                min={0}
                max={15}
                step={1}
                defaultValue={6}
                showValue={true}
                onChange={this._onCardChildrenPaddingChange}
              />
              <Slider
                label="Specific children gap in card sections:"
                min={0}
                max={40}
                step={1}
                defaultValue={20}
                showValue={true}
                onChange={this._onSpecificChildrenGapChange}
                disabled={!specificChildrenGapAllowed}
              />
              <Stack.Item align="center">
                <Checkbox
                  label="Allow specific children gap in card sections"
                  defaultChecked={false}
                  onChange={this._onSpecificChildrenGapAllowedChange}
                />
              </Stack.Item>
            </Stack>
          </Stack.Item>
          <Stack.Item>
            <Stack horizontalAlign="space-evenly" verticalAlign="space-evenly" tokens={lastConfigOptionsStackTokens}>
              <Checkbox label="Toggle debug mode" defaultChecked={true} onChange={this._onDebugModeChange} />
              <Dropdown
                selectedKey={filledSection}
                placeholder="Select section that fills margins:"
                label="Section that fills margins:"
                options={[
                  { key: '0', text: 'None' },
                  { key: '1', text: 'First card section' },
                  { key: '2', text: 'Card item' },
                  { key: '3', text: 'Second card section' },
                ]}
                onChange={this._onFilledSectionChange}
              />
            </Stack>
          </Stack.Item>
        </Stack>

        <Stack horizontal>
          <Card aria-label="Configurable card" styles={cardStyles} tokens={cardTokens}>
            <Card.Section fill={filledSection === '1'} styles={firstCardSectionStyles} tokens={cardSectionTokens}>
              <Text>This is a Card Section</Text>
              <Text>This is a Card Section</Text>
              <Text>This is a Card Section</Text>
            </Card.Section>
            <Card.Item fill={filledSection === '2'} styles={cardItemStyles} tokens={cardItemTokens}>
              <Text>This is a Card Item</Text>
            </Card.Item>
            <Card.Section fill={filledSection === '3'} styles={secondCardSectionStyles} tokens={cardSectionTokens}>
              <Text>This is a Card Section</Text>
              <Text>This is a Card Section</Text>
              <Text>This is a Card Section</Text>
            </Card.Section>
          </Card>

          {debugMode && (
            <Card root={{ verticalAlign: 'center' }} tokens={debugCardTokens}>
              {DebugCardSection({
                height:
                  (firstCardSectionHeight < 75 + 2 * resolvedGap ? 75 + 2 * resolvedGap : firstCardSectionHeight) -
                  (filledSection === '1' ? cardChildrenMargin : 0),
                text: 'Card Section',
              })}
              {DebugCardSection({ height: cardChildrenGap, text: 'Gap' })}
              {DebugCardSection({ height: cardItemHeight + 2 * cardChildrenPadding + 4, text: 'Card Item' })}
              {DebugCardSection({ height: cardChildrenGap, text: 'Gap' })}
              {DebugCardSection({
                height:
                  (secondCardSectionHeight < 75 + 2 * resolvedGap ? 75 + 2 * resolvedGap : secondCardSectionHeight) -
                  (filledSection === '3' ? cardChildrenMargin : 0),
                text: 'Card Section',
              })}
            </Card>
          )}
        </Stack>
      </Stack>
    );
  }

  private _onCardChildrenGapChange = (value: number): void => {
    this.setState({ cardChildrenGap: value });
  };

  private _onCardChildrenMarginChange = (value: number): void => {
    this.setState({ cardChildrenMargin: value });
  };
  private _onCardChildrenPaddingChange = (value: number): void => {
    this.setState({ cardChildrenPadding: value });
  };

  private _onCardItemHeightChange = (value: number): void => {
    this.setState({ cardItemHeight: value });
  };

  private _onCardWidthChange = (value: number): void => {
    this.setState({ width: value });
  };

  private _onDebugModeChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ debugMode: isChecked });
  };

  private _onFilledSectionChange = (ev: React.FormEvent<HTMLDivElement>, option: IDropdownOption): void => {
    this.setState({ filledSection: option.key as FilledSectionKey });
  };

  private _onFirstCardSectionHeightChange = (value: number): void => {
    this.setState({ firstCardSectionHeight: value });
  };

  private _onSecondCardSectionHeightChange = (value: number): void => {
    this.setState({ secondCardSectionHeight: value });
  };

  private _onSpecificChildrenGapChange = (value: number): void => {
    this.setState({ specificChildrenGap: value });
  };

  private _onSpecificChildrenGapAllowedChange = (ev: React.FormEvent<HTMLElement>, isChecked: boolean): void => {
    this.setState({ specificChildrenGapAllowed: isChecked });
  };
}
