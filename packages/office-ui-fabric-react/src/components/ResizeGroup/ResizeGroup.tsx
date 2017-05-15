import * as React from 'react';
import {
  css,
  BaseComponent
} from '../../Utilities';
import { IResizeGroupProps, IResizeGroup } from './ResizeGroup.Props';
import styles = require('./ResizeGroup.scss');

export interface IResizeGroupState {
  renderedData?: any;
  measuredData: any;
  shouldMeasure?: boolean;
}

export class ResizeGroup extends BaseComponent<IResizeGroupProps, IResizeGroupState> implements IResizeGroup {

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

  public componentWillReceiveProps(nextProps) {
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
    const { onRenderData, onReduceData, data } = this.props;
    let { shouldMeasure, renderedData, measuredData } = this.state;

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

  public measure() {
    this.setState({ shouldMeasure: true });
  }

  public componentDidUpdate(prevProps: IResizeGroupProps) {
    this._measureItems();
  }

  private _onResize() {
    this.measure();
  }

  private _measureItems() {
    const { data, onReduceData } = this.props;
    let {
      shouldMeasure,
      renderedData,
      measuredData,
    } = this.state;

    if (shouldMeasure && Object.keys(data).length !== 0 && this._root && this._measured) {
      let container = this._root.getBoundingClientRect();
      let measured = this._measured.getBoundingClientRect();
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
