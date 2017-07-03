import * as React from 'react';
import {
  css,
  BaseComponent
} from '../../Utilities';
import { IResizeGroupProps } from './ResizeGroup.Props';
import stylesImport from './ResizeGroup.scss';
const styles: any = stylesImport;
const RESIZE_DELAY = 16;

export interface IResizeGroupState {

  /**
   * Current set of data being measured to determine fit
  */
  measuredData: any;

  /**
   * Final data used to render proper sized component
  */
  renderedData?: any;

  /**
   * A flag to determine if a new measurement should be made upon state change
  */
  shouldMeasure?: boolean;
}

export class ResizeGroup extends BaseComponent<IResizeGroupProps, IResizeGroupState> {

  public static defaultProps = {
    data: {}
  };

  private _root: HTMLElement;
  private _measured: HTMLElement;
  private _lastKnownRootWidth: number | undefined = undefined;
  private _lastKnownMeasuredWidth: number | undefined = undefined;

  constructor(props: IResizeGroupProps) {
    super(props);
    this.state = {
      shouldMeasure: true,
      renderedData: null,
      measuredData: { ...this.props.data },
    };
  }

  public componentWillReceiveProps(nextProps: IResizeGroupProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        shouldMeasure: true,
        renderedData: null,
        measuredData: { ...nextProps.data }
      });
    }
  }

  public componentDidMount() {
    this._measureItems();
    this._events.on(window, 'resize', this._async.debounce(this._onResize, RESIZE_DELAY, { leading: true }));
  }

  public componentWillUnmount() {
    this._lastKnownRootWidth = undefined;
    this._lastKnownMeasuredWidth = undefined;
  }

  public render() {
    const { onRenderData, data } = this.props;
    const { shouldMeasure, renderedData, measuredData } = this.state;

    if (Object.keys(data).length === 0) {
      return null;
    }

    return (
      <div className={ css('ms-ResizeGroup') } ref={ this._resolveRef('_root') }>
        { shouldMeasure && (
          <div className={ css(styles.measured) } ref={ this._resolveRef('_measured') }>
            { onRenderData(measuredData) }
          </div>
        ) }

        { renderedData && onRenderData(renderedData) }
      </div>
    );
  }

  public componentDidUpdate(prevProps: IResizeGroupProps) {
    this._measureItems();

    if (this.state.renderedData) {
      if (this.props.dataDidRender) {
        this.props.dataDidRender(this.state.renderedData);
      }
    }
  }

  private _onResize() {
    let shouldMeasure = true;
    let nextMeasuredData = this.state.measuredData;

    if (this._root && this._lastKnownRootWidth && this._lastKnownMeasuredWidth) {
      // If we have some cached measurements, let's see if we can skip rendering
      let containerWidth = this._root.getBoundingClientRect().width;

      if (containerWidth <= this._lastKnownRootWidth) {
        // If the container shrank as a result of this resize, we can do an optimized rerender.
        if (this._lastKnownMeasuredWidth <= containerWidth) {
          // If the contents still fit within the container, don't trigger a remeasure.
          this._lastKnownRootWidth = containerWidth;
          shouldMeasure = false;
        } else {
          // If the container shrank and the contents don't fit, we can trigger a measurement
          // pass starting from the current value of rendered data.
          nextMeasuredData = this.state.renderedData;
        }
      }
    }

    if (shouldMeasure) {
      this.setState({
        shouldMeasure: true,
        measuredData: nextMeasuredData
      });
    }
  }

  private _setStateToDoneMeasuring() {
    this.setState((prevState, props) => {
      return {
        renderedData: prevState.measuredData,
        measuredData: { ...this.props.data },
        shouldMeasure: false
      };
    });
  }

  private _measureItems() {
    const { data, onReduceData } = this.props;
    const { shouldMeasure } = this.state;

    if (shouldMeasure && Object.keys(data).length !== 0 && this._root && this._measured) {
      const containerWidth = this._lastKnownRootWidth = this._root.getBoundingClientRect().width;
      const measuredWidth = this._lastKnownMeasuredWidth = this._measured.getBoundingClientRect().width;
      if ((measuredWidth > containerWidth)) {
        let nextMeasuredData = onReduceData(this.state.measuredData);

        // We don't want to get stuck in an infinite render loop when there are no more
        // scaling steps, so implementations of onReduceData should return undefined when
        // there are no more scaling states to apply.
        if (nextMeasuredData !== undefined) {
          this.setState({
            measuredData: nextMeasuredData,
          });
        } else {
          this._setStateToDoneMeasuring();
        }

      } else {
        this._setStateToDoneMeasuring();
      }
    }
  }
}
