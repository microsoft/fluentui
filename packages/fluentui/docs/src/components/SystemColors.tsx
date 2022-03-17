import * as React from 'react';
import { Grid } from '@fluentui/react-northstar';
import ColorBox from './ColorBox';
import { systemColors } from '../utils';

const SystemColors: React.FC = () => {
  return (
    <Grid columns={2} variables={{ gridGap: '.5rem', padding: '.75rem' }}>
      {systemColors.map(color => (
        <div key={color}>
          <ColorBox name={color} rounded size="small" value={color} copyToClipboardIcon={false} />
        </div>
      ))}
    </Grid>
  );
};

export default SystemColors;
