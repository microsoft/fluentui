import * as React from 'react';
import { SearchBox } from '@fluentui/react-search';
import { makeStyles, shorthands, useId, Label } from '@fluentui/react-components';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    ...shorthands.gap('20px'),
    maxWidth: '400px',
    // Stack the label above the field (with 2px gap per the design system)
    '> div': { display: 'flex', flexDirection: 'column', ...shorthands.gap('2px') },
  },
});

export const Size = () => {
  const smallId = useId('searchBox-small');
  const mediumId = useId('searchBox-medium');
  const largeId = useId('searchBox-large');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <div>
        <Label size="small" htmlFor={smallId}>
          Small SearchBox
        </Label>
        <SearchBox size="small" id={smallId} />
      </div>

      <div>
        <Label size="medium" htmlFor={mediumId}>
          Medium SearchBox
        </Label>
        <SearchBox size="medium" id={mediumId} />
      </div>

      <div>
        <Label size="large" htmlFor={largeId}>
          Large SearchBox
        </Label>
        <SearchBox size="large" id={largeId} />
      </div>
    </div>
  );
};

Size.parameters = {
  docs: {
    description: {
      story: 'A SearchBox can have different sizes.',
    },
  },
};
