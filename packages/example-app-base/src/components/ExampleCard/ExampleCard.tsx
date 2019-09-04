import * as React from 'react';
import { CommandButton } from 'office-ui-fabric-react/lib/Button';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import { ThemeProvider } from 'office-ui-fabric-react/lib/Foundation';
import {
  styled,
  Customizer,
  classNamesFunction,
  css,
  CustomizerContext,
  warn,
  ICustomizations
} from 'office-ui-fabric-react/lib/Utilities';
import { ISchemeNames, IProcessedStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { IStackComponent, Stack } from 'office-ui-fabric-react/lib/Stack';
import { AppCustomizationsContext, IAppCustomizations, IExampleCardCustomizations } from '../../utilities/customizations';
import { CodepenComponent } from '../CodepenComponent/CodepenComponent';
import { IExampleCardProps, IExampleCardStyleProps, IExampleCardStyles } from './ExampleCard.types';
import { getStyles } from './ExampleCard.styles';
import { EditorWrapper } from '@uifabric/tsx-editor/lib/components/EditorWrapper';
import { IEditorPreviewProps } from '@uifabric/tsx-editor';

export interface IExampleCardState {
  /** only used if props.isCodeVisible and props.onToggleEditor are undefined */
  isCodeVisible?: boolean;
  schemeIndex: number;
  themeIndex: number;
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
  private _activeCustomizations: ICustomizations | undefined;

  constructor(props: IExampleCardProps) {
    super(props);
    this.state = {
      isCodeVisible: false,
      schemeIndex: 0,
      themeIndex: 0
    };

    if (props.isCodeVisible !== undefined && props.onToggleEditor === undefined && process.env.NODE_ENV !== 'production') {
      warn('ExampleCard: the onToggleEditor prop is required if isCodeVisible is set. Otherwise the show/hide code button will not work.');
    }
  }

  public render(): JSX.Element {
    const { title, code, children, styles, isRightAligned = false, isScrollable = true, codepenJS, theme } = this.props;
    const { themeIndex } = this.state;
    const { isCodeVisible = this.state.isCodeVisible } = this.props;

    return (
      <AppCustomizationsContext.Consumer>
        {(context: IAppCustomizations) => {
          const { exampleCardCustomizations, hideSchemes } = context;
          this._activeCustomizations =
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
              <EditorWrapper
                code={code!}
                isCodeVisible={!!isCodeVisible}
                editorClassName={classNames.code}
                height={500}
                width="auto"
                previewClassName={classNames.example}
                onRenderPreview={this._onRenderPreview}
              >
                {children}
              </EditorWrapper>

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

  private _onRenderPreview = (previewProps: IEditorPreviewProps, defaultRender: (props: IEditorPreviewProps) => React.ReactNode) => {
    const content = defaultRender({ ...previewProps, isScrollable: true });
    if (this._activeCustomizations) {
      return (
        <CustomizerContext.Provider value={{ customizations: { settings: {}, scopedSettings: {} } }}>
          <Customizer {...this._activeCustomizations}>
            <ThemeProvider scheme={_schemes[this.state.schemeIndex]}>
              <Stack styles={regionStyles}>{content}</Stack>
            </ThemeProvider>
          </Customizer>
        </CustomizerContext.Provider>
      );
    }
    return content;
  };

  private _onSchemeChange = (ev: React.MouseEvent<HTMLDivElement>, value: IDropdownOption) => {
    this.setState({ schemeIndex: value.key as number });
  };

  private _onThemeChange = (ev: React.MouseEvent<HTMLDivElement>, value: IDropdownOption) => {
    this.setState({ themeIndex: value.key as number });
  };

  private _onToggleCodeClick = () => {
    const { isCodeVisible, onToggleEditor, title } = this.props;
    if (isCodeVisible !== undefined && onToggleEditor !== undefined) {
      if (isCodeVisible) {
        onToggleEditor('');
      } else {
        onToggleEditor(title);
      }
    } else {
      this.setState({
        isCodeVisible: !this.state.isCodeVisible
      });
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
