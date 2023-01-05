/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import * as shape from 'd3-shape';
import { classNamesFunction } from '@fluentui/react/lib/Utilities';
import { getStyles } from './Arc.styles';
import { IChartDataPoint } from '../index';
import { IArcProps, IArcStyles } from './index';
import { wrapTextInsideDonut } from '../../../utilities/index';
import { select as d3Select } from 'd3-selection';
import { IProcessedStyleSet } from '../../../Styling';

export interface IArcState {
  isCalloutVisible?: boolean;
}

const TEXT_PADDING: number = 5;

export class Arc extends React.Component<IArcProps, IArcState> {
  public static defaultProps: Partial<IArcProps> = {
    arc: shape.arc(),
  };

  public state: {} = {};

  private _tooltip: any;
  private _classNames: IProcessedStyleSet<IArcStyles>;
  private currentRef = React.createRef<SVGPathElement>();

  public static getDerivedStateFromProps(nextProps: Readonly<IArcProps>): Partial<IArcState> | null {
    _updateChart(nextProps);
    return null;
  }

  public updateChart(newProps: IArcProps): void {
    _updateChart(newProps);
  }

  public render(): JSX.Element {
    const { arc, href, focusedArcId } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    this._classNames = getClassNames(getStyles, {
      color: this.props.color,
      href: href!,
      theme: this.props.theme!,
    });
    const id = this.props.uniqText! + this.props.data!.data.legend!.replace(/\s+/, '') + this.props.data!.data.data;
    const opacity: number =
      this.props.activeArc === this.props.data!.data.legend || this.props.activeArc === '' ? 1 : 0.1;
    let truncatedText: string = '';
    if (this.props.valueInsideDonut !== null && this.props.valueInsideDonut !== undefined) {
      truncatedText = this._getTruncatedText(
        this.props.valueInsideDonut!.toString(),
        this.props.innerRadius! * 2 - TEXT_PADDING,
      );
    }
    const isTruncated: boolean = truncatedText.slice(-3) === '...';

    return (
      <g ref={this.currentRef}>
        {!!focusedArcId && focusedArcId === id && (
          <path id={id + 'focusRing'} d={arc(this.props.focusData)} className={this._classNames.focusRing} />
        )}
        <path
          id={id}
          d={arc(this.props.data)}
          onFocus={this._onFocus.bind(this, this.props.data!.data, id)}
          className={this._classNames.root}
          data-is-focusable={true}
          onMouseOver={this._hoverOn.bind(this, this.props.data!.data)}
          onMouseMove={this._hoverOn.bind(this, this.props.data!.data)}
          onMouseLeave={this._hoverOff}
          onBlur={this._onBlur}
          opacity={opacity}
          onClick={href ? this._redirectToUrl.bind(this, href) : this.props.data?.data.onClick}
          aria-label={this._getAriaLabel()}
          role="img"
        />
        <g className={this._classNames.nodeTextContainer}>
          <text
            textAnchor={'middle'}
            className={this._classNames.insideDonutString}
            y={5}
            id={'Donut_center_text'}
            onMouseOver={this._showTooltip.bind(this, this.props.valueInsideDonut!, isTruncated)}
            onMouseOut={this._hideTooltip}
          >
            {truncatedText}
          </text>
        </g>
      </g>
    );
  }

  public componentDidMount(): void {
    this._tooltip = d3Select('body')
      .append('div')
      .attr('id', 'Donut_tooltip')
      .attr('class', this._classNames.tooltip!)
      .style('opacity', 0);
  }

  public componentDidUpdate(): void {
    const { href } = this.props;
    const getClassNames = classNamesFunction<IArcProps, IArcStyles>();
    const classNames = getClassNames(getStyles, {
      color: this.props.color,
      href: href!,
      theme: this.props.theme!,
    });

    wrapTextInsideDonut(classNames.insideDonutString, this.props.innerRadius! * 2 - TEXT_PADDING);
  }

  private _getTruncatedText(text: string, maxWidth: number): string {
    const words = text.split(/\s+/).reverse();
    let word: string = '';
    const line: string[] = [];
    let truncatedText = text;
    const tspan = d3Select('#Donut_center_text').text(null).append('tspan');
    let ellipsisLength = 0;

    if (tspan.node() !== null && tspan.node() !== undefined) {
      // Determine the ellipsis length for word truncation.
      tspan.text('...');
      ellipsisLength = tspan.node()!.getComputedTextLength();
      tspan.text(null);
      truncatedText = '';

      while ((word = words.pop()!)) {
        line.push(word);
        tspan.text(line.join(' ') + ' ');
        // Determine if truncation is required. If yes, append the ellipsis and break.
        if (tspan.node()!.getComputedTextLength() > maxWidth - ellipsisLength && line.length) {
          line.pop();
          while (tspan.node()!.getComputedTextLength() > maxWidth - ellipsisLength) {
            word = word.slice(0, -1);
            tspan.text(word);
          }
          word += '...';
          line.push(word);
          tspan.text(line.join(' '));
          break;
        }
      }
      truncatedText = tspan.text();
      tspan.text(null);
    }
    return truncatedText;
  }

  private _showTooltip = (text: string | number, checkTruncated: boolean, evt: any) => {
    if (checkTruncated && text !== null && text !== undefined && this._tooltip) {
      this._tooltip.style('opacity', 0.9);
      this._tooltip
        .html(text)
        .style('left', evt.pageX + 'px')
        .style('top', evt.pageY - 28 + 'px');
    }
  };

  private _hideTooltip = () => {
    if (this._tooltip) {
      this._tooltip.style('opacity', 0);
    }
  };

  private _onFocus(data: IChartDataPoint, id: string): void {
    this.props.onFocusCallback!(data, id, this.currentRef.current);
  }

  private _hoverOn(data: IChartDataPoint, mouseEvent: React.MouseEvent<SVGPathElement>): void {
    mouseEvent.persist();
    this.props.hoverOnCallback!(data, mouseEvent);
  }

  private _hoverOff = (): void => {
    this.props.hoverLeaveCallback!();
  };

  private _onBlur = (): void => {
    this.props.onBlurCallback!();
  };

  private _redirectToUrl(href: string | undefined): void {
    href ? (window.location.href = href) : '';
  }

  private _getAriaLabel = (): string => {
    const point = this.props.data!.data;
    const legend = point.xAxisCalloutData || point.legend;
    const yValue = point.yAxisCalloutData || point.data || 0;
    return point.callOutAccessibilityData?.ariaLabel || (legend ? `${legend}, ` : '') + `${yValue}.`;
  };
}

function _updateChart(newProps: IArcProps): void {
  newProps.arc.innerRadius(newProps.innerRadius);
  newProps.arc.outerRadius(newProps.outerRadius);
}
