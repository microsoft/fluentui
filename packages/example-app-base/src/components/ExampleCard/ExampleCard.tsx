import * as React from 'react';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ThemeProvider } from 'office-ui-fabric-react/lib/Foundation';
import { styled, Customizer, classNamesFunction, css, isIE11, CustomizerContext } from 'office-ui-fabric-react/lib/Utilities';
import { ISchemeNames, IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { IStackComponent, Stack } from 'office-ui-fabric-react/lib/Stack';
import { AppCustomizationsContext, IAppCustomizations, IExampleCardCustomizations } from '../../utilities/customizations';
import { CodepenComponent } from '../CodepenComponent/CodepenComponent';
import { IExampleCardProps, IExampleCardStyleProps, IExampleCardStyles } from './ExampleCard.types';
import { getStyles } from './ExampleCard.styles';
import { CodeSnippet } from '../CodeSnippet/index';
import { ITextModel, ITranspiledOutput } from '@uifabric/tsx-editor';
import { EditorPreview } from '@uifabric/tsx-editor/lib/components/EditorPreview';
import { transformExample } from '@uifabric/tsx-editor/lib/transpiler/exampleTransform';
import * as tsxEditorModule from '@uifabric/tsx-editor';
import { getSetting } from '../../index2';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';

export interface IExampleCardState {
  schemeIndex: number;
  themeIndex: number;
  error?: string;
}

const getClassNames = classNamesFunction<IExampleCardStyleProps, IExampleCardStyles>();
const _schemes: ISchemeNames[] = ['default', 'strong', 'soft', 'neutral'];
const _schemeOptions: IDropdownOption[] = _schemes.map((item: string, index: number) => ({
  key: index,
  text: 'Scheme: ' + item
}));
const regionStyles: IStackComponent['styles'] = (props, theme) => ({
  root: {
    backgroundColor: theme.semanticColors.bodyBackground,
    color: theme.semanticColors.bodyText
  }
});

export class ExampleCardBase extends React.Component<IExampleCardProps, IExampleCardState> {
  private _themeCustomizations: IExampleCardCustomizations[] | undefined;
  private _themeOptions: IDropdownOption[];
  private _classNames: IProcessedStyleSet<IExampleCardStyles>;
  private readonly canRenderLiveEditor: boolean;
  private editorModule: typeof tsxEditorModule;

  constructor(props: IExampleCardProps) {
    super(props);
    this.state = {
      schemeIndex: 0,
      themeIndex: 0
    };
    this.canRenderLiveEditor =
      getSetting('useEditor') === '1' && !isIE11() && transformExample(props.code!, 'placeholder').error === undefined;

    if (this.canRenderLiveEditor) {
      import('office-ui-fabric-react').then(Fabric => {
        // tslint:disable-next-line: no-any
        (window as any).Fabric = Fabric;
      });
    }
  }

  public render(): JSX.Element {
    const { title, code, children, styles, isRightAligned = false, isScrollable = true, codepenJS, theme, isCodeVisible } = this.props;
    const { schemeIndex, themeIndex } = this.state;

    return (
      <AppCustomizationsContext.Consumer>
        {(context: IAppCustomizations) => {
          const { exampleCardCustomizations, hideSchemes } = context;
          const activeCustomizations =
            exampleCardCustomizations && exampleCardCustomizations[themeIndex] && exampleCardCustomizations[themeIndex].customizations;
          if (exampleCardCustomizations !== this._themeCustomizations) {
            this._themeCustomizations = exampleCardCustomizations;
            this._themeOptions = exampleCardCustomizations
              ? exampleCardCustomizations.map((item: IExampleCardCustomizations, index: number) => ({
                  key: index,
                  text: 'Theme: ' + item.title
                }))
              : [];
          }
          const styleProps: IExampleCardStyleProps = { isRightAligned, isScrollable, theme, isCodeVisible };
          const classNames = (this._classNames = getClassNames(styles, styleProps));
          const { subComponentStyles } = classNames;
          const { codeButtons: codeButtonStyles } = subComponentStyles;

          const exampleCardContent =
            this.props.isCodeVisible && this.canRenderLiveEditor ? (
              <EditorPreview className={classNames.example} id={this.props.title.replace(' ', '')} />
            ) : (
              <div className={classNames.example} data-is-scrollable={isScrollable}>
                {children}
              </div>
            );

          const exampleCard = (
            <div className={css(classNames.root, isCodeVisible && 'is-codeVisible')}>
              <div className={classNames.header}>
                <span className={classNames.title}>{title}</span>
                <div className={classNames.toggleButtons}>
                  {codepenJS && (
                    <CodepenComponent jsContent={codepenJS} styles={{ subComponentStyles: { button: subComponentStyles.codeButtons } }} />
                  )}

                  {exampleCardCustomizations && (
                    <Dropdown
                      defaultSelectedKey={0}
                      onChange={this._onThemeChange}
                      options={this._themeOptions}
                      styles={subComponentStyles.dropdowns}
                    />
                  )}

                  {exampleCardCustomizations && !hideSchemes && (
                    <Dropdown
                      defaultSelectedKey={0}
                      onChange={this._onSchemeChange}
                      options={_schemeOptions}
                      styles={subComponentStyles.dropdowns}
                    />
                  )}

                  {code && (
                    <CommandButton
                      iconProps={{ iconName: 'Embed' }}
                      onClick={this._onToggleCodeClick}
                      checked={isCodeVisible}
                      // TODO: fix once button has full styling support
                      styles={typeof codeButtonStyles === 'function' ? codeButtonStyles({}) : codeButtonStyles}
                    >
                      {isCodeVisible ? 'Hide code' : 'Show code'}
                    </CommandButton>
                  )}
                </div>
              </div>
              {isCodeVisible && (
                <div className={classNames.code}>
                  {this.canRenderLiveEditor ? (
                    this.editorModule ? (
                      <this.editorModule.Editor
                        code={code!}
                        onChange={this._editorOnChange}
                        width={'auto'}
                        height={500}
                        language="typescript"
                      />
                    ) : (
                      <Stack horizontalAlign="center" verticalAlign="center" styles={{ root: { height: 500 } }}>
                        <Spinner size={SpinnerSize.large} label="Loading editor..." />
                      </Stack>
                    )
                  ) : (
                    <CodeSnippet language="tsx">{code}</CodeSnippet>
                  )}
                </div>
              )}
              {activeCustomizations ? (
                <CustomizerContext.Provider value={{ customizations: { settings: {}, scopedSettings: {} } }}>
                  <Customizer {...activeCustomizations}>
                    <ThemeProvider scheme={_schemes[schemeIndex]}>
                      <Stack styles={regionStyles}>{exampleCardContent}</Stack>
                    </ThemeProvider>
                  </Customizer>
                </CustomizerContext.Provider>
              ) : (
                exampleCardContent
              )}

              {this._getDosAndDonts()}
            </div>
          );
          return exampleCard;
        }}
      </AppCustomizationsContext.Consumer>
    );
  }

  private _getDosAndDonts(): JSX.Element | void {
    const classNames = this._classNames;
    if (this.props.dos && this.props.donts) {
      return (
        <div className={classNames.dosAndDonts}>
          <div className={classNames.dos}>
            <h4>Do</h4>
            {this.props.dos}
          </div>
          <div className={classNames.donts}>
            <h4>Do not</h4>
            {this.props.donts}
          </div>
        </div>
      );
    }
  }

  private _editorOnChange = (editor: ITextModel) => {
    this.editorModule.transpile(editor).then((output: ITranspiledOutput) => {
      if (output.outputString) {
        const evalCodeError = this.editorModule.evalCode(output.outputString, this.props.title.replace(' ', ''));
        this.setState({
          error: evalCodeError || undefined
        });
      } else {
        this.setState({
          error: output.error
        });
      }
    });
  };

  private _onSchemeChange = (ev: React.MouseEvent<HTMLDivElement>, value: IDropdownOption) => {
    this.setState({ schemeIndex: value.key as number });
  };

  private _onThemeChange = (ev: React.MouseEvent<HTMLDivElement>, value: IDropdownOption) => {
    this.setState({ themeIndex: value.key as number });
  };

  private _onToggleCodeClick = () => {
    if (this.canRenderLiveEditor && !this.editorModule) {
      // This delay imports the module since React.lazy was breaking the code splitting
      // ForceUpdate is needed to avoid a run-time error since it could be undefined
      require.ensure(['@uifabric/tsx-editor'], require => {
        this.editorModule = require('@uifabric/tsx-editor');
        this.forceUpdate();
      });
    }
    if (this.props.onToggleEditor) {
      if (this.props.isCodeVisible) {
        this.props.onToggleEditor('');
      } else {
        this.props.onToggleEditor(this.props.title);
      }
    }
  };
}
export const ExampleCard: React.StatelessComponent<IExampleCardProps> = styled<
  IExampleCardProps,
  IExampleCardStyleProps,
  IExampleCardStyles
>(ExampleCardBase, getStyles, undefined, {
  scope: 'ExampleCard'
});
