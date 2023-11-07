'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.SparklineBase = void 0;
var tslib_1 = require('tslib');
var React = require('react');
var d3_scale_1 = import('d3-scale');
var d3_shape_1 = import('d3-shape');
var d3_array_1 = import('d3-array');
var react_focus_1 = require('@fluentui/react-focus');
var Utilities_1 = require('@fluentui/react/lib/Utilities');
var getClassNames = (0, Utilities_1.classNamesFunction)();
var SparklineBase = /** @class */ (function (_super) {
  tslib_1.__extends(SparklineBase, _super);
  function SparklineBase(props) {
    var _this = _super.call(this, props) || this;
    _this.margin = {
      top: 2,
      right: 0,
      bottom: 0,
      left: 0,
    };
    _this.state = {
      _points: null,
      _width: _this.props.width || 80,
      _height: _this.props.height || 20,
      _valueTextWidth: _this.props.valueTextWidth || 80,
    };
    _this._emptyChartId = (0, Utilities_1.getId)('_SparklineChart_empty');
    return _this;
  }
  SparklineBase.prototype.componentDidMount = function () {
    var _this = this;
    if (!this._isChartEmpty()) {
      var area = (0, d3_shape_1.area)()
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .x(function (d) {
          return _this.x(d.x);
        })
        .y0(this.state._height)
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .y1(function (d) {
          return _this.y(d.y);
        })
        .curve(d3_shape_1.curveLinear);
      this.area = area;
      var line = (0, d3_shape_1.line)()
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .x(function (d) {
          return _this.x(d.x);
        })
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .y(function (d) {
          return _this.y(d.y);
        })
        .curve(d3_shape_1.curveLinear);
      this.line = line;
      var points = this.props.data.lineChartData[0].data;
      /* eslint-disable @typescript-eslint/no-explicit-any */
      var _a = (0, d3_array_1.extent)(points, function (d) {
          return d.x;
        }),
        xMin = _a[0],
        xMax = _a[1];
      this.x = (0, d3_scale_1.scaleLinear)()
        .domain([xMin, xMax])
        .range([this.margin.left, this.state._width - this.margin.right]);
      this.y = (0, d3_scale_1.scaleLinear)()
        /* eslint-disable @typescript-eslint/no-explicit-any */
        .domain([
          0,
          (0, d3_array_1.max)(points, function (d) {
            return d.y;
          }),
        ])
        .range([this.state._height - this.margin.bottom, this.margin.top]);
      this.setState({
        _points: points,
      });
    }
  };
  SparklineBase.prototype.drawSparkline = function () {
    return React.createElement(
      React.Fragment,
      null,
      React.createElement('path', {
        className: 'line',
        d: this.line(this.state._points),
        fill: 'transparent',
        opacity: 1,
        strokeWidth: 2,
        stroke: this.props.data.lineChartData[0].color,
      }),
      React.createElement('path', {
        className: 'area',
        d: this.area(this.state._points),
        opacity: 1,
        fillOpacity: 0.2,
        fill: this.props.data.lineChartData[0].color,
        'aria-label': 'Sparkline with label '.concat(this.props.data.lineChartData[0].legend),
      }),
    );
  };
  SparklineBase.prototype.render = function () {
    var classNames = getClassNames(this.props.styles, {
      theme: this.props.theme,
    });
    return !this._isChartEmpty()
      ? React.createElement(
          react_focus_1.FocusZone,
          {
            direction: react_focus_1.FocusZoneDirection.horizontal,
            isCircularNavigation: true,
            className: classNames.inlineBlock,
          },
          React.createElement(
            'div',
            { className: classNames.inlineBlock },
            this.state._width >= 50 && this.state._height >= 16
              ? React.createElement(
                  'svg',
                  { width: this.state._width, height: this.state._height, 'data-is-focusable': true },
                  this.state._points ? this.drawSparkline() : null,
                )
              : React.createElement(React.Fragment, null),
            this.props.showLegend && this.props.data.lineChartData[0].legend
              ? React.createElement(
                  'svg',
                  { width: this.state._valueTextWidth, height: this.state._height, 'data-is-focusable': true },
                  React.createElement(
                    'text',
                    { x: '0%', dx: 8, y: '100%', dy: -5, className: classNames.valueText },
                    this.props.data.lineChartData[0].legend,
                  ),
                )
              : React.createElement(React.Fragment, null),
          ),
        )
      : React.createElement('div', {
          id: this._emptyChartId,
          role: 'alert',
          style: { opacity: '0' },
          'aria-label': 'Graph has no data to display',
        });
  };
  SparklineBase.prototype._isChartEmpty = function () {
    this._test();
    return !(
      this.props.data &&
      this.props.data.lineChartData &&
      this.props.data.lineChartData.length > 0 &&
      this.props.data.lineChartData.filter(function (item) {
        return item.data.length === 0;
      }).length === 0
    );
  };
  SparklineBase.prototype._test = function () {
    return 100;
  };
  return SparklineBase;
})(React.Component);
exports.SparklineBase = SparklineBase;
//# sourceMappingURL=Sparkline.base.js.map
