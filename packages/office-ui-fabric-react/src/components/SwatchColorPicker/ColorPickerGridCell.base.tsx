import * as React from 'react';
import {
  autobind,
  BaseComponent,
  customizable
} from '../../Utilities';
import {
  IColorCellProps,
  IColorPickerGridCellProps,
  IColorPickerGridCellStyleProps,
  IColorPickerGridCellStyles
} from './ColorPickerGridCell.types';
import { getColorFromString } from '../../utilities/color/colors';
import { GridCell } from '../../utilities/grid/GridCell';
import { IGridCellProps } from '../../utilities/grid/GridCell.types';
import { classNamesFunction, IClassNames, mergeStyleSets, Stylesheet, InjectionMode } from '../../Styling';

const getClassNames = classNamesFunction<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>();

class ColorCell extends GridCell<IColorCellProps, IGridCellProps<IColorCellProps>> {
}

export interface IColorPickerGridCellState {
  selected: boolean;
}

@customizable('ColorPickerGridCell', ['theme'])
export class ColorPickerGridCellBase extends React.Component<IColorPickerGridCellProps, {}> {

  public static defaultProps = {
    circle: true,
    disabled: false,
    selected: false,
  } as IColorPickerGridCellProps;

  private _classNames: {[key in keyof IColorPickerGridCellStyles]: string };

  public render() {
    let {
      item,
      id,
      selected,
      disabled,
      getStyles,
      theme,
      circle
    } = this.props;

    this._classNames = getClassNames(
      getStyles!,
      {
        theme: theme!,
        disabled,
        selected,
        circle
      }
    );

    // const styleSheet = Stylesheet.getInstance();
    // styleSheet.setConfig({ injectionMode: InjectionMode.none });
    // console.log(this._prettify(styleSheet.getRules()));

    return (
      <ColorCell
        item={ item }
        id={ id }
        key={ item.id }
        disabled={ disabled }
        role={ 'gridcell' }
        onRenderItem={ this._onRenderColorOption }
        selected={ selected }
        label={ item.label }
        className={ this._classNames.colorCell }
        classNames={ this._classNames }
      />
    );
  }

  private _prettify(styleRules: string): string {
    let rules = styleRules.split('}');

    let prettyRules = [''];

    for (let rule of rules) {
      if (rule) {
        let parts = rule.split('{');
        let indent = (parts.length > 2) ? '  ' : '';

        if (parts.length > 2) {
          prettyRules.push(parts[0] + ' {');
        }
        let selector = parts[parts.length - 2];
        let styles = parts[parts.length - 1].split(';');

        prettyRules.push(indent + selector + ' {');

        for (let style of styles) {
          if (style) {
            prettyRules.push(indent + '  ' + style + ';');
          }
        }

        prettyRules.push(indent + '}');

        if (parts.length > 2) {
          prettyRules.push('}');
        }

        prettyRules.push('');
      }
    }

    return prettyRules.join('\n');
  }

  /**
 * Render the core of a color cell
 * @returns {JSX.Element} - Element representing the core of the item
 */
  @autobind
  private _onRenderColorOption(colorOption: IColorCellProps): JSX.Element {
    // Build an SVG for the cell with the given shape and color properties
    return (
      <svg className={ this._classNames.svg } viewBox='0 0 20 20' fill={ getColorFromString(colorOption.color as string)!.str } >
        {
          this.props.circle ?
            <circle cx='50%' cy='50%' r='50%' /> :
            <rect width='100%' height='100%' />
        }
      </svg>
    );
  }

}