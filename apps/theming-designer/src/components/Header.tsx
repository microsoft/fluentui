import * as React from 'react';
import { Stack, Link, ILinkStyleProps, ILinkStyles, PrimaryButton, ITheme, IStackProps } from 'office-ui-fabric-react';
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
  width: '100%',
  marginRight: 28,
  backgroundColor: 'white',
  color: '#333'
});

const microsoftLogo = mergeStyles({
  width: '120px',
  display: 'block'
});

const pipeFabricStyles = (p: ILinkStyleProps): ILinkStyles => ({
  root: {
    textDecoration: 'none',
    color: p.theme.semanticColors.bodyText,
    fontWeight: '600',
    fontSize: p.theme.fonts.medium.fontSize
  }
});

const headerStackStyles = (p: IStackProps, theme: ITheme) => ({
  root: {
    backgroundColor: theme.semanticColors.bodyBackground,
    minHeight: 47,
    padding: '0 32px',
    boxShadow: theme.effects.elevation16
  }
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
      <Stack horizontal verticalAlign="center" grow={0} styles={headerStackStyles}>
        <Stack horizontal grow={1} verticalAlign="center">
          <a href="https://www.microsoft.com" title="Microsoft Home Page" aria-label="Microsoft Home Page" className={microsoftLogo}>
            <img src="https://themingdesigner.blob.core.windows.net/$web/MicrosoftLogo.png" className={microsoftLogo} />
          </a>
          <Link
            href="https://www.aka.ms/themedesigner"
            title="Microsoft Theme Designer page"
            aria-label="Microsoft Fabric Theme Designer page"
            styles={pipeFabricStyles}
          >
            | UI Fabric Theme Designer
          </Link>
        </Stack>
        <PrimaryButton text="Export theme" onClick={this.showPanel} />
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
              loadTheme will automatically apply the configured theming to any Fabric controls used within the same app. You can also export
              this example to CodePen with a few component examples below.
            </p>
          </span>
          <div className={outputPanelClassName}>
            <Pivot>
              <PivotItem headerText="Code">
                <textarea className={textAreaClassName} readOnly={true} spellCheck={false} value={codeHeader + this.state.themeAsCode} />
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
