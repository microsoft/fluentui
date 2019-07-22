import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Layer, LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { AnimationClassNames, mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { getId, css } from 'office-ui-fabric-react/lib/Utilities';
import { IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import * as styles from './Layer.Example.scss';

const toggleStyles: Partial<IStyleSet<IToggleStyles>> = {
  root: { margin: '10px 0' }
};

const rootClass = mergeStyles({
  selectors: { p: { marginTop: 30 } }
});

export interface ILayerHostedExampleState {
  showLayer: boolean;
  showLayerNoId: boolean;
  showHost: boolean;
}

export class LayerHostedExample extends React.Component<{}, ILayerHostedExampleState> {
  public state: ILayerHostedExampleState = {
    showLayer: false,
    showLayerNoId: false,
    showHost: true
  };
  // Use getId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string without getId() and manually ensure uniqueness.)
  private _layerHostId: string = getId('layerhost');

  public render(): JSX.Element {
    const { showLayer, showLayerNoId, showHost } = this.state;
    const content = <div className={css(styles.content, AnimationClassNames.scaleUpIn100)}>This is example layer content.</div>;

    return (
      <div className={rootClass}>
        <Toggle label="Show host" inlineLabel checked={showHost} onChange={this._onChangeToggle} />

        {showHost && <LayerHost id={this._layerHostId} className={styles.customHost} />}

        <p>
          In some cases, you may need to contain layered content within an area. Create an instance of a LayerHost along with an id, and
          provide a hostId on the layer to render it within the specific host. (Note that it's important that you don't include children
          within the LayerHost. It's meant to contain Layered content only.)
        </p>

        <Toggle
          styles={toggleStyles}
          label={`Render the box below in a Layer and target it at hostId=${this._layerHostId}`}
          inlineLabel
          checked={showLayer}
          onChange={this._onChangeCheckbox}
        />

        {showLayer ? (
          <Layer hostId={this._layerHostId} onLayerDidMount={this._log('didmount')} onLayerWillUnmount={this._log('willunmount')}>
            {content}
          </Layer>
        ) : (
          content
        )}

        <div className={styles.nonLayered}>I am normally below the content.</div>

        <p>If you do not specify a hostId, the hosted layer will default to being fixed to the page by default.</p>

        <Toggle
          styles={toggleStyles}
          label="Render the box below in a Layer without specifying a host, fixing it to the top of the page"
          inlineLabel
          checked={showLayerNoId}
          onChange={this._onChangeCheckboxNoId}
        />

        {showLayerNoId ? (
          <Layer onLayerDidMount={this._log('didmount')} onLayerWillUnmount={this._log('willunmount')}>
            {content}
          </Layer>
        ) : (
          content
        )}
      </div>
    );
  }

  private _log(text: string): () => void {
    return (): void => {
      console.log(text);
    };
  }

  private _onChangeCheckbox = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void => {
    this.setState({ showLayer: checked });
  };

  private _onChangeCheckboxNoId = (ev: React.FormEvent<HTMLElement | HTMLInputElement>, checked: boolean): void => {
    this.setState({ showLayerNoId: checked });
  };

  private _onChangeToggle = (ev: React.MouseEvent<HTMLElement>, checked: boolean): void => {
    this.setState({ showHost: checked });
  };
}
