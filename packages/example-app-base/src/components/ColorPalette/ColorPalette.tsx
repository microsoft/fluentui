import * as React from 'react';
import { css, Icon, TooltipHost, FocusZone, IProcessedStyleSet, classNamesFunction } from 'office-ui-fabric-react';
import * as colorCheck from 'color-check';
import { IColorPaletteProps, IColor, IColorCode } from './ColorPalette.types';
import { IColorPaletteStyles, getStyles, IColorPaletteStyleProps } from './ColorPalette.styles';

const getClassNames = classNamesFunction<IColorPaletteStyleProps, IColorPaletteStyles>();

export interface IColorPaletteState {
  selectedColor?: IColor;
}

export class ColorPalette extends React.Component<IColorPaletteProps, IColorPaletteState> {
  public readonly state = {
    selectedColor: this.props.colors[0]
  };

  private _classNames: IProcessedStyleSet<IColorPaletteStyles>;

  public componentDidMount(): void {
    this._selectColor(this.props.colors[0]);
  }

  public componentWillReceiveProps(nextProps: IColorPaletteProps): void {
    if (JSON.stringify(this.props.colors) !== JSON.stringify(nextProps.colors)) {
      this._selectColor(nextProps.colors[0]);
    }
  }

  public render(): JSX.Element {
    const { colors, isCondensed, theme } = this.props;
    const { selectedColor } = this.state;

    this._classNames = getClassNames(getStyles, { isCondensed, theme: theme! });

    return (
      <div className={this._classNames.root}>
        {this._renderGrid(colors)}
        {this._renderDetail(selectedColor)}
      </div>
    );
  }

  private _renderGrid = (colors: IColor[]) => {
    return (
      <FocusZone as="ul" className={this._classNames.grid}>
        {colors.map((color: IColor) => {
          return this._renderSwatch(color);
        })}
      </FocusZone>
    );
  };

  // @todo: Use Fabric Core classes instead of inline styles.
  private _renderSwatch = (color: IColor) => {
    const { hex, icon } = color;
    const { name = hex } = color;
    const classNames = this._classNames;
    const isSelected = JSON.stringify(this.state.selectedColor) === JSON.stringify(color);

    return (
      <li
        key={name}
        className={css(classNames.swatch, isSelected && classNames.swatchSelected)}
        // tslint:disable-next-line jsx-no-lambda
        onClick={() => this._selectColor(color)}
        // tslint:disable-next-line jsx-no-lambda
        onFocusCapture={() => this._selectColor(color)}
        style={{ backgroundColor: color.hex }}
        data-is-focusable={true}
      >
        <div className={css(classNames.swatchContent, isSelected && classNames.swatchContentSelected)}>
          <span className={classNames.swatchName} title={name}>
            {name}
          </span>
          {icon && <Icon className={classNames.swatchIcon} iconName={icon} />}
        </div>
      </li>
    );
  };

  private _renderDetail = (color: IColor): JSX.Element => {
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
              <>
                <span className={classNames.detailCode} aria-describedby="code">
                  {code.react.split('.')[1]}{' '}
                  <TooltipHost
                    tooltipProps={{
                      onRenderContent: () => this._renderCodeDetails(code)
                    }}
                    closeDelay={500}
                    id="code"
                  >
                    <Icon className={classNames.detailCodeInfoIcon} iconName="Info" />
                  </TooltipHost>
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  private _renderCodeDetails = (code: IColorCode): JSX.Element | null => {
    const { core, react } = code;
    if (core || react) {
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
        </div>
      );
    }
    return null;
  };

  private _selectColor = (color: IColor): void => {
    this.setState({
      selectedColor: color
    });

    // Optional callback to notify parent that a color has been selected.
    this.props.onColorSelected && this.props.onColorSelected(color);
  };
}
