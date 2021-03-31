import * as React from 'react';
import { css, createRef } from 'office-ui-fabric-react/lib/Utilities';
import { registerLanguage, highlightBlock } from 'highlight.js';
import * as xml from 'highlight.js/lib/languages/xml';
import * as javascript from 'highlight.js/lib/languages/javascript';
import * as stylesImport from './CodeBlock.module.scss';

registerLanguage('html', xml);
registerLanguage('javascript', javascript);

const styles: any = stylesImport;

export interface ICodeBlockProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The language of the code block. See https://highlightjs.org/static/demo/ for a list of supported languages.
   */
  language?: 'html' | 'javascript';

  /**
   * Whether or not the code block can be toggled opened and closed.
   * @default false
   */
  isCollapsible?: boolean;

  /**
   * Theme to display the code with.
   * @default false
   */
  isLightTheme?: boolean;
}

export interface ICodeBlockState {
  /**
   * Whether the code block is open or collapsed.
   */
  isOpen?: boolean;
}

export class CodeBlock extends React.Component<ICodeBlockProps, ICodeBlockState> {
  public static defaultProps: ICodeBlockProps = {
    language: 'html',
    isCollapsible: false,
    isLightTheme: false
  };

  private _codeElement = createRef<HTMLElement>();

  constructor(props: ICodeBlockProps) {
    super(props);

    this.state = {
      isOpen: false
    };

    this._onToggleClicked = this._onToggleClicked.bind(this);
  }

  public render(): JSX.Element {
    let { language, isCollapsible, isLightTheme, children } = this.props;
    let { isOpen } = this.state;

    let toggleButton;
    if (isCollapsible) {
      toggleButton = <button className={ styles.toggle } onClick={ this._onToggleClicked.bind(this) }>&lt;/&gt;</button>;
    }

    return (
      <div className={ css(
        styles.codeBlock,
        isCollapsible ? styles.isCollapsible : '',
        isOpen ? styles.isOpen : '',
        isLightTheme ? styles.isLightTheme : styles.isDarkTheme
      ) }>
        { toggleButton }
        <div className={ styles.code }>
          <pre>
            <code
              ref={ this._codeElement }
              className={ language }
            >
              { children }
            </code>
          </pre>
        </div>
      </div>
    );
  }

  public shouldComponentUpdate(nextProps: Readonly<ICodeBlockProps>, nextState: Readonly<ICodeBlockState>): boolean {
    return this.state.isOpen !== nextState.isOpen;
  }

  public componentDidMount(): void {
    if (this._codeElement.current) {
      highlightBlock(this._codeElement.current);
    }
  }

  private _onToggleClicked() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
}
