import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Button } from './Button';
import { IButtonProps } from './Button.types';
import { CommandBar, Icon, Stack, Text } from 'office-ui-fabric-react';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu: IButtonProps['menu'] = render => render((MenuType, props) => <MenuType {...props} items={menuItems} />);

describe('Button view', () => {
  it('renders a default Button with content correctly', () => {
    const component = renderer.create(<Button content="Default button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled default Button with content correctly', () => {
    const component = renderer.create(<Button disabled content="Disabled default button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary Button with content correctly', () => {
    const component = renderer.create(<Button primary content="Primary button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a disabled primary Button with content correctly', () => {
    const component = renderer.create(<Button primary disabled content="Disabled primary button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a default Button with content and an icon correctly', () => {
    const component = renderer.create(<Button icon="Upload" content="Button with string icon" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary Button with custom content and icon right-aligned correctly', () => {
    const component = renderer.create(
      <Button primary>
        <Text>With custom text/icon right aligned</Text>
        <Icon iconName="Upload" />
      </Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a default circular Button with an icon correctly', () => {
    const component = renderer.create(<Button icon="PeopleAdd" circular />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled default circular Button with an icon correctly', () => {
    const component = renderer.create(<Button icon="Phone" circular disabled />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary circular Button with an icon correctly', () => {
    const component = renderer.create(<Button icon="FontSize" circular primary />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled primary circular Button with an icon correctly', () => {
    const component = renderer.create(<Button icon="Attach" circular primary disabled />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a menu Button correctly', () => {
    const component = renderer.create(<Button content="Menu button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a menu primary Button correctly', () => {
    const component = renderer.create(<Button primary content="Menu primary button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a menu disabled Button correctly', () => {
    const component = renderer.create(<Button disabled content="Menu disabled button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a menu expanded Button correctly', () => {
    const component = renderer.create(<Button expanded content="Menu expanded button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a menu expanded primary Button correctly', () => {
    const component = renderer.create(<Button expanded primary content="Menu expanded primary button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a split Button correctly', () => {
    const component = renderer.create(<Button split icon="Add" content="Default split button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled split Button correctly', () => {
    const component = renderer.create(<Button split disabled icon="Add" content="Disabled split button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary split Button correctly', () => {
    const component = renderer.create(<Button split primary icon="Add" content="Primary split button" menu={buttonMenu} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a disabled primary split Button correctly', () => {
    const component = renderer.create(
      <Button split disabled primary icon="Add" content="Disabled primary split button" menu={buttonMenu} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a split Button with its first action disabled correctly', () => {
    const component = renderer.create(
      <Button split primaryActionDisabled icon="Add" content="First action disabled split button" menu={buttonMenu} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a primary split Button with its first action disabled correctly', () => {
    const component = renderer.create(
      <Button split primaryActionDisabled primary icon="Add" content="First action disabled primary split button" menu={buttonMenu} />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a multiline Button correctly', () => {
    const component = renderer.create(
      <Button icon="Share" menu={buttonMenu}>
        <Stack padding="8px 0" as="span" horizontalAlign="start">
          <Text>I am a compound multiline button.</Text>
          <Text variant="small">I can have a caption.</Text>
        </Stack>
      </Button>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });

  it('renders a Button inside a CommandBar correctly', () => {
    const component = renderer.create(<CommandBar items={[{ key: '0', text: 'Button 1', iconProps: { iconName: 'Upload' } }]} />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot;
  });
});
