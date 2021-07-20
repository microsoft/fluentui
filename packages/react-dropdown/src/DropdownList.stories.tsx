import * as React from 'react';

import { DropdownList } from './index';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  container: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '600px',
    width: 'max-content',
    boxShadow: `${theme.alias.shadow.shadow16}`,
    paddingTop: '4px',
    paddingBottom: '4px',
  }),
});

const Container: React.FC = props => {
  const styles = useStyles();
  return <div className={styles.container}>{props.children}</div>;
};

export const TextOnly = () => (
  <Container>
    <DropdownList
      aria-label="choose a fruit"
      options={[
        'Apple',
        'Banana',
        'Blueberry',
        'Boysenberry',
        'Cherry',
        'Cranberry',
        'Durian',
        'Fig',
        'Grape',
        'Guava',
        'Pear',
        'Raspberry',
      ]}
    ></DropdownList>

    <DropdownList
      aria-label="choose a fruit"
      options={[
        'Apple',
        'Banana',
        'Blueberry',
        'Boysenberry',
        'Cherry',
        'Cranberry',
        'Durian',
        'Fig',
        'Grape',
        'Guava',
        'Pear',
        'Raspberry',
      ]}
      option={{
        'aria-label': 'test',
      }}
    ></DropdownList>
  </Container>
);

export default {
  // use the Components prefix and (react-dropdown) suffix to have the same naming convention as react-examples
  title: 'Components/DropdownList (react-dropdown)',
  // Explicit id used in story URL
  id: 'Components/DropdownList',
  component: DropdownList,
};
