import * as React from 'react';
import {
  css,
  Icon,
  TooltipHost,
  TooltipDelay,
  FocusZone,
  IProcessedStyleSet,
  classNamesFunction,
  styled,
} from '@fluentui/react';
import * as colorCheck from 'color-check';
import {
  IColorPaletteProps,
  IColorSwatch,
  IColorPaletteStyleProps,
  IColorPaletteStyles,
  IColorSwatchCode,
} from './ColorPalette.types';
import { getStyles } from './ColorPalette.styles';

const getClassNames = classNamesFunction<IColorPaletteStyleProps, IColorPaletteStyles>();

export interface IColorPaletteState {
  selectedColor: IColorSwatch;
}

class ColorPaletteBase extends React.Component<IColorPaletteProps, IColorPaletteState> {
  private _classNames: IProcessedStyleSet<IColorPaletteStyles>;

  public constructor(props: IColorPaletteProps) {
    super(props);

    this.state = {
      selectedColor: props.colors[0],
    };
  }

  public componentDidMount(): void {
    this._selectColor(this.props.colors[0]);
  }

  public componentDidUpdate(prevProps: IColorPaletteProps): void {
    if (this.props !== prevProps && JSON.stringify(this.props.colors) !== JSON.stringify(prevProps.colors)) {
      this._selectColor(this.props.colors[0]);
    }
  }

  public render(): JSX.Element {
    const { colors, isCondensed, styles, theme, className } = this.props;
    const { selectedColor } = this.state;

    this._classNames = getClassNames(styles, { isCondensed, theme: theme!, className });

    return (
      <div className={this._classNames.root}>
        {this._renderGrid(colors)}
        {this._renderDetail(selectedColor)}
      </div>
    );
  }

  private _renderGrid = (colors: IColorSwatch[]) => {
    return (
      <FocusZone as="ul" className={this._classNames.grid}>
        {colors.map((color: IColorSwatch) => {
          return this._renderSwatch(color);
        })}
      </FocusZone>
    );
  };

  // @todo: Use Fabric Core classes instead of inline styles.
  private _renderSwatch = (color: IColorSwatch) => {
    const { hex, icon, code } = color;
    let themeSlot;
    if (code) {
      themeSlot = code.themeSlot;
    }
    const { name = hex } = color;
    const classNames = this._classNames;
    const isSelected = JSON.stringify(this.state.selectedColor) === JSON.stringify(color);

    const swatchContent = (
      <div className={css(classNames.swatchContent, isSelected && classNames.swatchContentSelected)}>
        <span className={classNames.swatchName} title={name}>
          {name}
        </span>
        {icon && <Icon className={classNames.swatchIcon} iconName={icon} />}
      </div>
    );

    return (
      <li
        key={name}
        className={css(classNames.swatch, isSelected && classNames.swatchSelected)}
        onClick={() => this._selectColor(color)}
        onFocusCapture={() => this._selectColor(color)}
        style={{ backgroundColor: color.hex }}
        data-is-focusable={true}
      >
        {themeSlot ? (
          <TooltipHost
            hostClassName={classNames.swatchTooltip}
            delay={TooltipDelay.long}
            content={`Theme slot: ${themeSlot}.`}
          >
            {swatchContent}
          </TooltipHost>
        ) : (
          swatchContent
        )}
      </li>
    );
  };

  private _renderDetail = (color: IColorSwatch): JSX.Element => {
    const { hex, code } = color;
    const { name = hex } = color;
    const textColor = colorCheck.colorBrightnessDifference('#ffffff', hex) ? '#ffffff' : '#000000';
    const classNames = this._classNames;

    return (
      <div className={classNames.detail} style={{ backgroundColor: color.hex }}>
        <div className={classNames.detailContentWrapper} style={{ color: textColor }}>
          <span className={classNames.detailName} title={name}>
            {name}
          </span>
          <div className={classNames.detailValues}>
            <span className={classNames.detailHex}>{hex}</span>
            {code && (
              <span className={classNames.detailCode} aria-label={this._getCodeAriaLabel(code)}>
                {code.react && code.react.indexOf('.') > -1 ? code.react.split('.')[1] : code.react}{' '}
                <TooltipHost
                  tooltipProps={{
                    onRenderContent: () => this._renderCodeDetails(code),
                  }}
                  closeDelay={500}
                  id="code"
                >
                  <Icon className={classNames.detailCodeInfoIcon} iconName="Info" />
                </TooltipHost>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  private _getCodeAriaLabel(code: IColorSwatchCode): string | undefined {
    const { core, react, themeSlot } = code;
    if (core || react || themeSlot) {
      return (
        (core ? `Fabric Core: ${core}. ` : '') +
        (react ? `Fabric React: ${react}. ` : '') +
        (themeSlot ? `Theme slot: ${themeSlot}.` : '')
      );
    }
  }

  private _renderCodeDetails = (code: IColorSwatchCode): JSX.Element | null => {
    const { core, react, themeSlot } = code;
    if (core || react || themeSlot) {
      return (
        <div>
          {core && (
            <p>
              Fabric Core: <code>{core}</code>
            </p>
          )}
          {react && (
            <p>
              Fabric React: <code>{react}</code>
            </p>
          )}
          {themeSlot && (
            <p>
              Theme slot: <code>{themeSlot}</code>
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  private _selectColor = (color: IColorSwatch): void => {
    this.setState({
      selectedColor: color,
    });

    // Optional callback to notify parent that a color has been selected.
    this.props.onColorSelected && this.props.onColorSelected(color);
  };
}

export const ColorPalette: React.FunctionComponent<IColorPaletteProps> = styled<
  IColorPaletteProps,
  IColorPaletteStyleProps,
  IColorPaletteStyles
>(ColorPaletteBase, getStyles, undefined, { scope: 'ColorPalette' });
