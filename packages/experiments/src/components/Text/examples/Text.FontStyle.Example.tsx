import * as React from 'react';
import { Text } from '../Text';
import { Stack } from '../../Stack/Stack';
import { IFontStyles } from '../../../Styling';
import { ChoiceGroup, IChoiceGroupOption, TooltipHost, DirectionalHint } from 'office-ui-fabric-react';

export interface ITextFontStyleExampleState {
  style?: keyof IFontStyles;
}

export class TextFontStyleExample extends React.Component<{}, ITextFontStyleExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      style: 'medium'
    };
  }

  public render(): JSX.Element {
    const { style } = this.state;
    const content = `<Text fontStyle=${style}>Change This Text's Font Style!</Text>`;
    return (
      <Stack vertical gap={10}>
        <div>
          <ChoiceGroup
            selectedKey={style}
            options={[
              {
                key: 'small',
                text: 'Small'
              },
              {
                key: 'medium',
                text: 'Medium'
              },
              {
                key: 'large',
                text: 'Large'
              },
              {
                key: 'xLarge',
                text: 'XLarge'
              },
              {
                key: 'xxLarge',
                text: 'XXLarge'
              }
            ]}
            onChange={this._onChangeStyle}
          />
        </div>
        <div>
          <TooltipHost
            content={content}
            id="myID"
            calloutProps={{ gapSpace: 0 }}
            tooltipProps={{ directionalHint: DirectionalHint.bottomCenter }}
          >
            <Text fontStyle={style}>Change This Text's Font Style!</Text>
          </TooltipHost>
        </div>
      </Stack>
    );
  }

  private _onChangeStyle = (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void => {
    const key = option.key as keyof IFontStyles;
    this.setState({
      style: key
    });
  };
}
