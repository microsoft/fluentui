import { Grid, Divider, Header, SvgIconProps } from '@fluentui/react-northstar';
import * as exports from '@fluentui/react-icons-northstar';
import * as React from 'react';

const icons = Object.keys(exports).reduce((acc: React.FC<SvgIconProps>[], exportName) => {
  if (!!exports[exportName].displayName) {
    acc.push(exports[exportName]);
  }

  return acc;
}, []);

const cellStyles = {
  margin: '10px 0',
};

const SvgIconSetExampleShorthand = () => (
  <>
    <div>
      <Divider>
        <Header as="h3" content="Regular" />
      </Divider>
      <Grid columns={4} styles={{ textAlign: 'center' }}>
        {icons.map(Icon => (
          <div key={Icon.displayName} style={cellStyles}>
            <Icon />
            <br />
            <code>{Icon.displayName}</code>
          </div>
        ))}
      </Grid>
    </div>

    <div>
      <Divider>
        <Header as="h3" content="Outline" />
      </Divider>
      <Grid columns={4} styles={{ textAlign: 'center' }}>
        {icons.map(Icon => (
          <div key={`${Icon.displayName} - outline`} style={cellStyles}>
            <Icon outline />
            <br />
            <code>{Icon.displayName}</code>
          </div>
        ))}
      </Grid>
    </div>
  </>
);

export default SvgIconSetExampleShorthand;
