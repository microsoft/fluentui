import * as React from 'react';
import { Card } from '@uifabric/react-cards';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IThemeRules, ThemeGenerator } from 'office-ui-fabric-react/lib/ThemeGenerator';
import { mergeStyles } from '@uifabric/merge-styles';
import { CodepenComponent } from '@uifabric/example-app-base';

export interface IHeaderProps {
  themeRules?: IThemeRules;
}

export interface IHeaderState {
  showPanel: boolean;
  jsonTheme: string;
  powershellTheme: string;
  themeAsCode: any;
}

const outputPanelClassName = mergeStyles({
  display: 'flex'
});

const textAreaClassName = mergeStyles({
  height: 350,
  width: 280,
  marginRight: 28,
  backgroundColor: 'white',
  color: '#333'
});

const codeHeader = "import { loadTheme } from 'office-ui-fabric-react';\n\n";
const codepenHeader = 'const { loadTheme, DefaultButton, PrimaryButton, Toggle, TooltipHost } = Fabric;\n\n';
const codepenSamples =
  '\n\nclass Content extends React.Component {\n  public render() {\n    return (<div>' +
  '<DefaultButton text="DefaultButton"/><PrimaryButton text="PrimaryButton"/>' +
  '<Toggle label="Enabled"/><Toggle label="Disabled" disabled={true}/>' +
  '</div>);\n  }\n}\n' +
  "ReactDOM.render(<Content />,document.getElementById('content'));";

export class Header extends React.Component<IHeaderProps, IHeaderState> {
  constructor(props: any) {
    super(props);
    this.state = {
      showPanel: false,
      jsonTheme: '',
      powershellTheme: '',
      themeAsCode: <div />
    };
  }

  public render(): JSX.Element {
    return (
      <Card styles={{ root: { backgroundColor: 'white', minWidth: '99%', height: '35px', position: 'fixed', top: '0', zIndex: 600 } }}>
        <Stack horizontal tokens={{ childrenGap: 1200 }}>
          <Stack horizontal>
            <img src="https://uifabric.azurewebsites.net/media/images/MicrosoftUIFabric-logo-rgb_no-padding.svg" />
          </Stack>
          <Stack horizontal styles={{ root: { position: 'absolute', right: '25px' } }}>
            <PrimaryButton text="Export theme" onClick={this.showPanel} styles={{ root: { width: '130px', height: '35px' } }} />
            <Panel
              isOpen={this.state.showPanel}
              type={PanelType.smallFixedFar}
              onDismiss={this.hidePanel}
              headerText="Export theme"
              closeButtonAriaLabel="Close"
              onRenderFooterContent={this.onRenderFooterContent}
            >
              <span>
                <p>
                  This code block initializes the theme you have configured above and loads it using the loadTheme utility function. Calling
                  loadTheme will automatically apply the configured theming to any Fabric controls used within the same app. You can also
                  export this example to CodePen with a few component examples below.
                </p>
              </span>
              <div className={outputPanelClassName}>
                <Pivot>
                  <PivotItem headerText="Code">
                    <textarea
                      className={textAreaClassName}
                      readOnly={true}
                      spellCheck={false}
                      value={codeHeader + this.state.themeAsCode}
                    />
                  </PivotItem>
                  <PivotItem headerText="JSON">
                    <textarea className={textAreaClassName} readOnly={true} spellCheck={false} value={this.state.jsonTheme} />
                  </PivotItem>
                  <PivotItem headerText="PowerShell">
                    <textarea className={textAreaClassName} readOnly={true} spellCheck={false} value={this.state.powershellTheme} />
                  </PivotItem>
                </Pivot>
              </div>
            </Panel>
          </Stack>
        </Stack>
      </Card>
    );
  }

  private exportToJson = () => {
    const themeRules = this.props.themeRules!;

    // strip out the unnecessary shade slots from the final output theme
    const abridgedTheme: IThemeRules = {};
    for (const ruleName in themeRules) {
      if (themeRules.hasOwnProperty(ruleName)) {
        if (
          ruleName.indexOf('ColorShade') === -1 &&
          ruleName !== 'primaryColor' &&
          ruleName !== 'backgroundColor' &&
          ruleName !== 'foregroundColor' &&
          ruleName.indexOf('body') === -1
        ) {
          abridgedTheme[ruleName] = themeRules[ruleName];
        }
      }
    }

    this.setState({
      jsonTheme: JSON.stringify(ThemeGenerator.getThemeAsJson(abridgedTheme), void 0, 2),
      powershellTheme: ThemeGenerator.getThemeForPowerShell(abridgedTheme),
      themeAsCode: ThemeGenerator.getThemeAsCode(abridgedTheme)
    });
  };

  private onRenderFooterContent = () => {
    return (
      <div>
        <CodepenComponent jsContent={codepenHeader + this.state.themeAsCode + codepenSamples} buttonAs={PrimaryButton} />
      </div>
    );
  };

  private showPanel = () => {
    this.setState({ showPanel: true });
    this.exportToJson();
  };

  private hidePanel = () => {
    this.setState({ showPanel: false });
  };
}
