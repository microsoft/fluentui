import * as React from 'react';

import { DropdownList, DropdownOption } from './index';
import { makeStyles } from '@fluentui/react-make-styles';

const useStyles = makeStyles({
  container: theme => ({
    backgroundColor: theme.alias.color.neutral.neutralBackground1,
    minWidth: '128px',
    minHeight: '48px',
    maxWidth: '300px',
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
    <DropdownList>
      <DropdownOption>Apple</DropdownOption>
      <DropdownOption>Banana</DropdownOption>
      <DropdownOption>Blueberry</DropdownOption>
      <DropdownOption>Boysenberry</DropdownOption>
      <DropdownOption>Cherry</DropdownOption>
      <DropdownOption>Cranberry</DropdownOption>
      <DropdownOption>Durian</DropdownOption>
      <DropdownOption>Fig</DropdownOption>
      <DropdownOption>Grape</DropdownOption>
      <DropdownOption>Guava</DropdownOption>
      <DropdownOption>Pear</DropdownOption>
      <DropdownOption>Raspberry</DropdownOption>
    </DropdownList>
  </Container>
);

export default {
  // use the Components prefix and (react-dropdown) suffix to have the same naming convention as react-examples
  title: 'Components/DropdownList (react-dropdown)',
  // Explicit id used in story URL
  id: 'Components/DropdownList',
  component: DropdownList,
};
