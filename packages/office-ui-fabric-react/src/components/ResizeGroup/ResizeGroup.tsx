import * as React from 'react';
import {
  css,
  BaseComponent
} from '../../Utilities';
import { IResizeGroupProps } from './ResizeGroup.Props';
import styles = require('./ResizeGroup.scss');

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
    this._events.on(window, 'resize', this._onResize);
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
  }

  private _onResize() {
    this.setState({ shouldMeasure: true });
  }

  private _measureItems() {
    const { data, onReduceData } = this.props;
    const { shouldMeasure } = this.state;

    if (shouldMeasure && Object.keys(data).length !== 0 && this._root && this._measured) {
      const container = this._root.getBoundingClientRect();
      const measured = this._measured.getBoundingClientRect();
      if ((measured.width > container.width)) {
        this.setState((prevState, props) => {
          return {
            measuredData: onReduceData(prevState.measuredData),
          };
        });
      } else {
        this.setState((prevState, props) => {
          return {
            renderedData: prevState.measuredData,
            measuredData: { ...this.props.data },
            shouldMeasure: false
          };
        });
      }
    }
  }
}
