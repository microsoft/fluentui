import React from 'react';
import { Button, Input, makeStyles, tokens } from '@fluentui/react-components';
import { useId } from '@fluentui/react-components';
import { SearchRegular } from '@fluentui/react-icons';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    gap: tokens.spacingHorizontalM,
  },
});

export const SearchForm = () => {
  const inputId = useId('search-input');
  const styles = useStyles();

  return (
    <div className={styles.root}>
      <Input id={inputId} placeholder="Search..." appearance="outline" contentBefore={<SearchRegular />} />
      <Button appearance="primary" size="medium" icon={<SearchRegular />}>
        Search
      </Button>
      <Button appearance="secondary">Cancel</Button>
    </div>
  );
};
