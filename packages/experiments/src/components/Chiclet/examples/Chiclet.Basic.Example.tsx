import * as React from 'react';
import { Chiclet } from '../Chiclet';
import { ChicletSize } from '../Chiclet.types';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { TextField, ITextField } from 'office-ui-fabric-react/lib/TextField';

export interface IChicletBasicExampleState {
  textFieldValue: string;
}

const TEST_URL = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/chiclet-test.html';

export class ChicletBasicExample extends React.Component<{}, IChicletBasicExampleState> {
  private _textField = React.createRef<ITextField>();

  constructor(props: {}) {
    super(props);

    this.state = {
      textFieldValue: TEST_URL
    };
  }

  public render(): JSX.Element {
    const { textFieldValue } = this.state;

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Text>{'Try changing the url to see the chiclet with other metadata (eg. https://onedrive.com)'}</Text>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <TextField componentRef={this._textField} styles={{ root: { width: '300px' } }} defaultValue="" />
          <DefaultButton text="Change url" onClick={this._onClickButton} />
        </Stack>
        <Chiclet
          url={textFieldValue}
          title={'WordTest with a really long title that will wrap around to the second line but not the third line'}
          image="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg"
          itemType="docx"
          size={ChicletSize.medium}
        />
      </Stack>
    );
  }

  private _onClickButton = (): void => {
    if (this._textField && this._textField.current && this._textField.current.value) {
      this.setState({
        textFieldValue: this._textField.current.value
      });
    }
  };
}
