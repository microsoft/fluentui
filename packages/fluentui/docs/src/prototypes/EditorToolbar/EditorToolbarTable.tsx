import * as React from 'react';
import * as _ from 'lodash';
import { Grid } from '@fluentui/react-northstar';

type EditorToolbarTableProps = {
  onClick: () => void;
};

const EditorToolbarTable: React.FC<EditorToolbarTableProps> = props => (
  <Grid columns={3}>
    {_.times(9, i => (
      <button
        key={i}
        onClick={props.onClick}
        style={{
          background: 'blueviolet',
          border: 0,
          borderRadius: '4px',
          cursor: 'pointer',
          display: 'block',
          height: '20px',
          width: '20px',
          margin: '3px',
        }}
      />
    ))}
  </Grid>
);

export default EditorToolbarTable;
