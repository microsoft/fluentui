import * as React from 'react';
import { Text } from '../Text';
import { IFontStyles } from '../../../Styling';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react';
import './Text.Attributes.Example.scss';

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
    return (
      <div>
        <div>
          <ChoiceGroup
            label="Change the text style"
            selectedKey={type}
            options={[
              {
                key: 'default',
                text: 'Default'
              },
              {
                key: 'disabled',
                text: 'Disabled'
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
        <div className="ms-text">
          <Text type={type}>Change This Text's Font Type!</Text>
        </div>
      </div>
    );
  }

  private _onChangeStyle = (ev: React.SyntheticEvent<HTMLElement>, option: IChoiceGroupOption): void => {
    const key = option.key as keyof IFontStyles;
    this.setState({
      type: key
    });
  };
}
