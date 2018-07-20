import * as React from 'react';
import { Text } from '../Text';
import { Stack } from '../../Stack/Stack';
import { IFontStyles } from '../../../Styling';
import { ChoiceGroup, IChoiceGroupOption, TooltipHost, DirectionalHint } from 'office-ui-fabric-react';

export interface ITextFontTypeExampleState {
  type?: string;
}

export class TextFontTypeExample extends React.Component<{}, ITextFontTypeExampleState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      type: 'default'
    };
  }

  public render(): JSX.Element {
    const { type } = this.state;
    const content = `<Text type=${type}>Change This Text's Font Type!</Text>`;
    return (
      <Stack vertical gap={10}>
        <div>
          <ChoiceGroup
            selectedKey={type}
            options={[
              {
                key: 'default',
                text: 'Default'
              },
              {
                key: 'caption',
                text: 'Caption'
              },
              {
                key: 'h1',
                text: 'h1'
              },
              {
                key: 'h2',
                text: 'h2'
              },
              {
                key: 'h3',
                text: 'h3'
              },
              {
                key: 'h4',
                text: 'h4'
              },
              {
                key: 'h5',
                text: 'h5'
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
            <Text type={type}>Change This Text's Font Type!</Text>
          </TooltipHost>
        </div>
      </Stack>
    );
  }

  private _onChangeStyle = (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void => {
    const key = option.key as keyof IFontStyles;
    this.setState({
      type: key
    });
  };
}
