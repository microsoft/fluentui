import * as React from 'react';
import { Grid, Divider, Header, Icon, themes } from '@fluentui/react-northstar';
import * as icons from '@fluentui/react-icons-northstar';

const cellStyles = {
  margin: '10px 0',
};

const IconSetExampleShorthand: React.FunctionComponent<{ themeName: string }> = ({ themeName }) => (
  <>
    <div>
      <Divider>
        <Header as="h3" content="Regular" />
      </Divider>
      <Grid columns={4} styles={{ textAlign: 'center' }}>
        {/*TODO: fix this*/}
        {/*{Object.keys(themes[themeName].icons).map(name => (*/}
        {/*  <div key={name} style={cellStyles}>*/}
        {/*    <Icon name={name} />*/}
        {/*    <br />*/}
        {/*    <code>{name}</code>*/}
        {/*  </div>*/}
        {/*))}*/}
      </Grid>
    </div>

    <div>
      <Divider>
        <Header as="h3" content="Outline" />
      </Divider>
      <Grid columns={4} styles={{ textAlign: 'center' }}>
        {/*TODO: fix this*/}
        {/*{Object.keys(icons).filter(icon => !!icon.displayName).map(Icon as React.FC<{outline: boolean}> => (*/}
        {/*  <div key={`${name}-outline`} style={cellStyles}>*/}
        {/*    <Icon outline />*/}
        {/*    <br />*/}
        {/*    <code>{Icon.displayName} outline</code>*/}
        {/*  </div>*/}
        {/*))}*/}
      </Grid>
    </div>
  </>
);

IconSetExampleShorthand.defaultProps = {
  themeName: 'teams',
};

export default IconSetExampleShorthand;
