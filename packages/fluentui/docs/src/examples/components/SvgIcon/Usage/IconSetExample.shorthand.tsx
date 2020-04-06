import * as React from 'react';
import { Grid, Divider, Header, SvgIconProps } from '@fluentui/react-northstar';
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
        {Object.keys(icons)
          .filter(icon => !!(icon as any).displayName)
          .map(icon => {
            const IconComponent = (icon as unknown) as React.FC<SvgIconProps>;
            return (
              <div key={IconComponent.displayName} style={cellStyles}>
                <IconComponent />
                <br />
                <code>{IconComponent.displayName} outline</code>
              </div>
            );
          })}
      </Grid>
    </div>

    <div>
      <Divider>
        <Header as="h3" content="Outline" />
      </Divider>
      <Grid columns={4} styles={{ textAlign: 'center' }}>
        {Object.keys(icons)
          .filter(icon => !!(icon as any).displayName)
          .map(icon => {
            const IconComponent = (icon as unknown) as React.FC<SvgIconProps>;
            return (
              <div key={`${IconComponent.displayName} - outline`} style={cellStyles}>
                <IconComponent outline />
                <br />
                <code>{IconComponent.displayName} outline</code>
              </div>
            );
          })}
      </Grid>
    </div>
  </>
);

IconSetExampleShorthand.defaultProps = {
  themeName: 'teams',
};

export default IconSetExampleShorthand;
