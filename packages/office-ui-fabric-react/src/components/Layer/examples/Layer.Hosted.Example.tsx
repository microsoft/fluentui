import * as React from 'react';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Layer, LayerHost } from 'office-ui-fabric-react/lib/Layer';
import { AnimationClassNames, mergeStyleSets, getTheme } from 'office-ui-fabric-react/lib/Styling';
import { IToggleStyles } from 'office-ui-fabric-react/lib/Toggle';
import { useId, useBoolean } from '@uifabric/react-hooks';

export const LayerHostedExample: React.FunctionComponent = () => {
  const [showLayer, { toggle: toggleShowLayer }] = useBoolean(false);
  const [showLayerNoId, { toggle: toggleShowLayerNoId }] = useBoolean(false);
  const [showHost, { toggle: toggleShowHost }] = useBoolean(true);

  // Use useId() to ensure that the ID is unique on the page.
  // (It's also okay to use a plain string without getId() and manually ensure uniqueness.)
  const layerHostId = useId('layerHost');

  const content = <div className={styles.content}>This is example layer content.</div>;

  return (
    <div className={styles.root}>
      <Toggle label="Show host" inlineLabel checked={showHost} onChange={toggleShowHost} />

      {showHost && <LayerHost id={layerHostId} className={styles.customHost} />}

      <p>
        In some cases, you may need to contain layered content within an area. Create an instance of a LayerHost along
        with an id, and provide a hostId on the layer to render it within the specific host. (Note that it's important
        that you don't include children within the LayerHost. It's meant to contain Layered content only.)
      </p>

      <Toggle
        styles={styles.toggle}
        label={`Render the box below in a Layer and target it at hostId=${layerHostId}`}
        inlineLabel
        checked={showLayer}
        onChange={toggleShowLayer}
      />

      {showLayer ? (
        <Layer hostId={layerHostId} onLayerDidMount={logDidMount} onLayerWillUnmount={logWillUnmount}>
          {content}
        </Layer>
      ) : (
        content
      )}

      <div className={styles.nonLayered}>I am normally below the content.</div>

      <p>If you do not specify a hostId, the hosted layer will default to being fixed to the page by default.</p>

      <Toggle
        styles={styles.toggle}
        label="Render the box below in a Layer without specifying a host, fixing it to the top of the page"
        inlineLabel
        checked={showLayerNoId}
        onChange={toggleShowLayerNoId}
      />

      {showLayerNoId ? (
        <Layer onLayerDidMount={logDidMount} onLayerWillUnmount={logWillUnmount}>
          {content}
        </Layer>
      ) : (
        content
      )}
    </div>
  );
};

const logDidMount = () => console.log('layer did mount');
const logWillUnmount = () => console.log('layer will unmount');

const toggleStyles: Partial<IToggleStyles> = {
  root: { margin: '10px 0' },
};
const theme = getTheme();
const styles = {
  toggle: toggleStyles,
  ...mergeStyleSets({
    root: {
      selectors: { p: { marginTop: 30 } },
    },
    customHost: {
      height: 100,
      padding: 20,
      background: 'rgba(255, 0, 0, 0.2)',
      border: '1px dashed ' + theme.palette.black,
      position: 'relative',
      selectors: {
        '&:before': {
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          // double quotes required to make the string show up
          content: '"I am a LayerHost with id=layerhost1"',
        },
      },
    },
    content: [
      {
        backgroundColor: theme.palette.themePrimary,
        color: theme.palette.white,
        lineHeight: '50px',
        padding: '0 20px',
      },
      AnimationClassNames.scaleUpIn100,
    ],
    nonLayered: {
      backgroundColor: theme.palette.neutralTertiaryAlt,
      lineHeight: '50px',
      padding: '0 20px',
      margin: '8px 0',
    },
  }),
};
