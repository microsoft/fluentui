import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
  BaseComponent,
  css,
  getNativeProps,
  divProperties
} from '../../Utilities';
import { ILayerProps, ILayerRenderer } from './Layer.Props';
import { ILayerHostProps } from './LayerHost.Props';
import './LayerHost.scss';

export interface ILayerHostContext {
  layerRenderer: ILayerRenderer;
}

export interface ILayerHostState {
  hasMounted: boolean;
}

/**
 * LayerHost provides a wrapper that acts as a passthrough, rendering the given children within it, but also
 * appending a div at the end, which projects all content wrapped in the Layer components within. Projecting
 * DOM to the end of the document allows for overlaying and stacking scenarios.
 *
 * Normally you do not need to interact directly with LayerHost. If you render Layers within content that isn't
 * wrapped within a LayerHost, a LayerHost will be created and appended to the end of the document body, where
 * layer content will then be projected. However in some circumstances you want Layered content to be rendered
 * in a specific place rather than document body (for example in a popup window or contained within a scrollable
 * region.) In those cases, wrap the content wihtin a LayerHost.
 *
 * @example
 * <LayerHost>
 *   <Layer>I will at the end of LayerHost.</Layer>
 *   <div>I will render normally.</div>
 * </LayerHost>
 **/
export class LayerHost extends BaseComponent<ILayerHostProps, ILayerHostState> implements ILayerRenderer {
  public static childContextTypes = {
    layerRenderer: React.PropTypes.object
  };

  private _container: HTMLElement;

  constructor(props) {
    super(props);
    this.state = {
      hasMounted: false
    };
  }

  public getContainer(): HTMLElement {
    return this._container;
  }

  public getChildContext(): ILayerHostContext {
    return {
      layerRenderer: this
    };
  }

  public componentDidMount() {
    this.setState({ hasMounted: true });
  }

  public render() {
    let divProps = getNativeProps(this.props, divProperties);

    return (
      <div { ...divProps } className={ css('ms-LayerHost', this.props.className) }>
        { this.state.hasMounted && this.props.children }
        <SelfRenderedContent>
          <div className='ms-LayerHost-overlay' ref={ this._resolveRef('_container') } />
        </SelfRenderedContent>
      </div>
    );
  }

}

export class SelfRenderedContent extends BaseComponent<{}, {}> {
  public shouldComponentUpdate() {
    return false;
  }

  public render() {
    return this.props.children as JSX.Element;
  }
}