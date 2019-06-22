import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { IButtonProps, IconButton, Stack } from 'office-ui-fabric-react';
import { mergeStyles } from '@uifabric/merge-styles/lib/mergeStyles';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { TextField, ITextField } from 'office-ui-fabric-react/lib/TextField';

const TEST_URL = 'https://company.sharepoint.com/:w:/sourcedoc=results.docx';

export class FooterComponent extends React.Component<IFooterComponent, {}> {
  constructor(props: IFooterComponent) {
    super(props);
  }

  public render(): JSX.Element {
    const { buttonProps, activities } = this.props;

    return _renderFooter(buttonProps, activities);
  }
}

const footerStyle = mergeStyles({
  height: 36,
  paddingLeft: 11
});

const activitiesStyle = mergeStyles({
  width: 184,
  height: 16,
  fontSize: 12,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.83,
  letterSpacing: 'normal',
  float: 'left',
  paddingTop: 18,
  paddingBottom: 12,
  marginTop: 0
});

const actionsStyle = mergeStyles({
  paddingRight: 6,
  position: 'relative'
});

const actionStyle = mergeStyles({
  float: 'right',
  cursor: 'pointer',
  width: 32,
  height: 36,
  backgroundColor: 'white',
  color: '#0078d7'
});

export interface IChicletFooterExampleState {
  textFieldValue: string;
}

export class ChicletFooterExample extends React.Component<{}, IChicletFooterExampleState> {
  private _textField = React.createRef<ITextField>();

  constructor(props: {}) {
    super(props);

    this.state = {
      textFieldValue: TEST_URL
    };
  }

  public render(): JSX.Element {
    const footerButtonProps: IButtonProps[] = [
      { iconProps: { iconName: 'More' } },
      { iconProps: { iconName: 'Save' } },
      { iconProps: { iconName: 'Share' } }
    ];
    const { textFieldValue } = this.state;
    const footer = <FooterComponent buttonProps={footerButtonProps} activities="10 Comments  16 Shares  87 Views" />;

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Text>{"Try changing the url to see the chiclet with a different icon (url must contain '.pptx', '.docx', or '.xlsx')"}</Text>
        <Stack horizontal tokens={{ childrenGap: 8 }}>
          <TextField componentRef={this._textField} styles={{ root: { width: '300px' } }} defaultValue="" />
          <DefaultButton text="Change url" onClick={this._onClickButton} />
        </Stack>
        <Chiclet url={textFieldValue} size={ChicletSize.medium} title="Quarterly Results" footer={footer} />
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

export interface IFooterComponent extends React.Props<FooterComponent> {
  buttonProps: IButtonProps[];
  activities: string;
}

function _renderFooter(buttonProps: IButtonProps[], activities: string): React.ReactElement<HTMLDivElement> {
  return (
    <div className={footerStyle}>
      <div className={activitiesStyle}>{activities ? activities : null}</div>
      <div className={actionsStyle}>
        {buttonProps &&
          buttonProps.map((buttonProp: IButtonProps, index: number) => {
            return (
              <div className={actionStyle} key={index}>
                <IconButton {...buttonProp} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
