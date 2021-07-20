import * as React from 'react';
import { Dropdown, DropdownList, DropdownProps, Select } from './index';
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

export const Default = (props: Partial<DropdownProps>) => (
  <Container>
    <h2>Dropdown Example</h2>
    <Dropdown {...props} options={['Apple', 'Pear', 'Raspberry']}>
      <Select>Select a Fruit</Select>
      <DropdownList options={['Apple', 'Pear', 'Raspberry']} />
    </Dropdown>
  </Container>
);

export default {
  // use the Components prefix and (react-dropdown) suffix to have the same naming convention as react-examples
  title: 'Components/Dropdown (react-dropdown)',
  // Explicit id used in story URL
  id: 'Components/Dropdown',
  component: Dropdown,
};
