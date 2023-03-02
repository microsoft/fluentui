import * as React from 'react';
import { CommandButton } from '@fluentui/react/lib/Button';
import { Dropdown, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { styled, Theme, ThemeProvider, classNamesFunction, css, warn, memoizeFunction } from '@fluentui/react';
import { ISchemeNames, IProcessedStyleSet } from '@fluentui/react/lib/Styling';
import { IStackComponent, Stack } from '@fluentui/react/lib/Stack';
import { AppThemesContext, IAppThemes, IExampleCardTheme } from '../../utilities/theme';
import { CodepenComponent, CONTENT_ID } from '../CodepenComponent/CodepenComponent';
import { IExampleCardProps, IExampleCardStyleProps, IExampleCardStyles } from './ExampleCard.types';
import { getStyles } from './ExampleCard.styles';
import { EditorWrapper, SUPPORTED_PACKAGES, IMonacoTextModel, transformExample } from '@fluentui/react-monaco-editor';
import { getQueryParam } from '../../utilities/index2';

export interface IExampleCardState {
  /** only used if props.isCodeVisible and props.onToggleEditor are undefined */
  isCodeVisible: boolean;
  schemeIndex: number;
  themeIndex: number;
  /** State of the code as of the last time the code viewer was opened or closed. */
  latestCode: string;
}

const getClassNames = classNamesFunction<IExampleCardStyleProps, IExampleCardStyles>();
const _schemes: ISchemeNames[] = ['default', 'strong', 'soft', 'neutral'];
const _schemeOptions: IDropdownOption[] = _schemes.map((item: string, index: number) => ({
  key: index,
  text: 'Scheme: ' + item,
}));
const regionStyles: IStackComponent['styles'] = (props, theme) => ({
  root: {
    backgroundColor: theme.semanticColors.bodyBackground,
    color: theme.semanticColors.bodyText,
  },
});

export class ExampleCardBase extends React.Component<IExampleCardProps, IExampleCardState> {
  private _monacoModelRef: React.MutableRefObject<IMonacoTextModel | undefined> = { current: undefined };
  /**
   * Transformed version of the initial `props.code` for editing and/or export to codepen,
   * if the code is "valid" for transform purposes.
   */
  private _transformedInitialCode: string | undefined;

  private _exampleCardTheme: IExampleCardTheme[] | undefined;
  private _themeOptions: IDropdownOption[];
  private _classNames: IProcessedStyleSet<IExampleCardStyles>;
  private _activeTheme: Theme | undefined;
  private _isStrict: boolean;

  constructor(props: IExampleCardProps) {
    super(props);
    const { code = '' } = this.props;
    this.state = {
      isCodeVisible: false,
      schemeIndex: 0,
      themeIndex: 0,
      latestCode: code,
    };

    const strict = getQueryParam('strict');
    this._isStrict = strict === 'ex' || strict === 'examples';

    this._transformedInitialCode = this._transformCode(code);

    if (
      props.isCodeVisible !== undefined &&
      props.onToggleEditor === undefined &&
      process.env.NODE_ENV !== 'production'
    ) {
      warn(
        'ExampleCard: the onToggleEditor prop is required if isCodeVisible is set. ' +
          'Otherwise the show/hide code button will not work.',
      );
    }
  }

  public render(): JSX.Element {
    const {
      title,
      titleAs: TitleAs = 'h3',
      children,
      styles,
      isRightAligned = false,
      isScrollable = true,
      codepenJS,
      theme,
      isCodeVisible = this.state.isCodeVisible,
      editorSupportedPackages = SUPPORTED_PACKAGES,
    } = this.props;
    const { themeIndex, schemeIndex, latestCode } = this.state;

    return (
      <AppThemesContext.Consumer>
        {(context: IAppThemes) => {
          const { exampleCardTheme, hideSchemes } = context;
          this._activeTheme = exampleCardTheme && exampleCardTheme[themeIndex] && exampleCardTheme[themeIndex].theme;
          if (exampleCardTheme !== this._exampleCardTheme) {
            this._exampleCardTheme = exampleCardTheme;
            this._themeOptions = exampleCardTheme
              ? exampleCardTheme.map((item: IExampleCardTheme, index: number) => ({
                  key: index,
                  text: 'Theme: ' + item.title,
                }))
              : [];
          }

          const styleProps: IExampleCardStyleProps = { isRightAligned, isScrollable, theme, isCodeVisible };
          const classNames = (this._classNames = getClassNames(styles, styleProps));
          const { subComponentStyles } = classNames;
          const { codeButtons: codeButtonStyles } = subComponentStyles;

          const ExamplePreview = this._getPreviewComponent(this._activeTheme, _schemes[schemeIndex]);

          return (
            <div className={css(classNames.root, isCodeVisible && 'is-codeVisible')}>
              <div className={classNames.header}>
                <TitleAs className={classNames.title}>{title}</TitleAs>
                <div className={classNames.toggleButtons}>
                  {(codepenJS || this._transformedInitialCode) && (
                    <CodepenComponent
                      jsContent={this._getCodepenContent}
                      styles={{ subComponentStyles: { button: subComponentStyles.codeButtons } }}
                    />
                  )}

                  {exampleCardTheme && (
                    <Dropdown
                      ariaLabel="Example theme"
                      defaultSelectedKey={0}
                      onChange={this._onThemeChange}
                      options={this._themeOptions}
                      styles={subComponentStyles.dropdowns}
                    />
                  )}

                  {exampleCardTheme && !hideSchemes && (
                    <Dropdown
                      ariaLabel="Example scheme"
                      defaultSelectedKey={0}
                      onChange={this._onSchemeChange}
                      options={_schemeOptions}
                      styles={subComponentStyles.dropdowns}
                    />
                  )}

                  {latestCode && (
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
              {isCodeVisible ? (
                <EditorWrapper
                  code={latestCode}
                  supportedPackages={editorSupportedPackages}
                  editorClassName={classNames.code}
                  editorAriaLabel={`Editor for the example "${title}". The example will be updated as you type.`}
                  modelRef={this._monacoModelRef}
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  previewAs={ExamplePreview as any as React.FunctionComponent<{}>}
                >
                  {children}
                </EditorWrapper>
              ) : (
                <ExamplePreview>
                  {
                    // Only use strict mode when not editing. Might have unpredictable results otherwise.
                    this._isStrict ? <React.StrictMode>{children}</React.StrictMode> : children
                  }
                </ExamplePreview>
              )}

              {this._getDosAndDonts()}
            </div>
          );
        }}
      </AppThemesContext.Consumer>
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

  // eslint-disable-next-line @typescript-eslint/member-ordering
  private _getPreviewComponent = memoizeFunction(
    (activeTheme: Theme | undefined, scheme: ISchemeNames): React.FunctionComponent => {
      // Generate a component which renders the children with the current
      return props => {
        const { children } = props;
        const content = (
          <div className={this._classNames.example} data-is-scrollable={true}>
            {children}
          </div>
        );

        if (activeTheme) {
          const themeToApply = activeTheme.schemes?.[scheme] || activeTheme;

          return (
            <ThemeProvider theme={themeToApply}>
              <Stack styles={regionStyles}>{content}</Stack>
            </ThemeProvider>
          );
        }
        return content;
      };
    },
  );

  private _onSchemeChange = (ev: React.MouseEvent<HTMLDivElement>, value: IDropdownOption) => {
    this.setState({ schemeIndex: value.key as number });
  };

  private _onThemeChange = (ev: React.MouseEvent<HTMLDivElement>, value: IDropdownOption) => {
    this.setState({ themeIndex: value.key as number });
  };

  private _transformCode(code: string): string | undefined {
    return transformExample({
      tsCode: code,
      id: CONTENT_ID,
      supportedPackages: SUPPORTED_PACKAGES,
    }).output;
  }

  private _getCodepenContent = (): string => {
    // Use a client-side transform if possible, or fall back to codepen JS.
    if (this._transformedInitialCode) {
      // The initial code was transformable, which means it could have been edited. Try transforming
      // the latest version, or fall back to the initial version if the transform fails.
      const monacoModel = this._monacoModelRef.current;
      const latestCode = monacoModel ? monacoModel.getValue() : this.state.latestCode;
      return this._transformCode(latestCode) || this._transformedInitialCode;
    }
    return this.props.codepenJS || '';
  };

  private _onToggleCodeClick = () => {
    const { isCodeVisible, onToggleEditor, title } = this.props;
    let wasCodeVisible: boolean;
    if (isCodeVisible !== undefined && onToggleEditor !== undefined) {
      // Editor visibility is controlled
      wasCodeVisible = isCodeVisible;
      onToggleEditor(wasCodeVisible ? '' : title);
    } else {
      // Editor visibility is uncontrolled
      wasCodeVisible = !!this.state.isCodeVisible;
      this.setState({
        isCodeVisible: !wasCodeVisible,
      });
    }

    // In either case, if we're about to hide the code and it was being edited, grab the latest code
    // before closing so we can restore it when the editor is re-opened.
    if (wasCodeVisible && this._monacoModelRef.current) {
      this.setState({
        latestCode: this._monacoModelRef.current.getValue(),
      });
    }
  };
}

export const ExampleCard: React.FunctionComponent<IExampleCardProps> = styled<
  IExampleCardProps,
  IExampleCardStyleProps,
  IExampleCardStyles
>(ExampleCardBase, getStyles, undefined, {
  scope: 'ExampleCard',
});
