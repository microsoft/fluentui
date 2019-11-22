import * as React from 'react';
import * as renderer from 'react-test-renderer';

import { Button } from './Button';

describe('Button', () => {
  it('renders a default Button with content correctly', () => {
    const component = renderer.create(<Button content="Default button" />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // it('renders a disabled default Button with content correctly', () => {
  //   const component = renderer.create(<Button disabled content="Disabled default button" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a primary Button with content correctly', () => {
  //   const component = renderer.create(<Button primary content="Primary button" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a disabled primary Button with content correctly', () => {
  //   const component = renderer.create(<Button primary disabled content="Disabled primary button" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a default Button with content and an icon correctly', () => {
  //   const component = renderer.create(<Button icon="Upload" content="Button with string icon" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a primary Button with custom content and icon right-aligned correctly', () => {
  //   const component = renderer.create(
  //     <Button primary>
  //       <Text>With custom text/icon right aligned</Text>
  //       <Icon iconName="Upload" />
  //     </Button>
  //   );
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a default circular Button with an icon correctly', () => {
  //   const component = renderer.create(<Button icon="PeopleAdd" circular />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a disabled default circular Button with an icon correctly', () => {
  //   const component = renderer.create(<Button icon="Phone" circular disabled />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a primary circular Button with an icon correctly', () => {
  //   const component = renderer.create(<Button icon="FontSize" circular primary />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a disabled primary circular Button with an icon correctly', () => {
  //   const component = renderer.create(<Button icon="Attach" circular primary disabled />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a default Button as an anchor correctly', () => {
  //   const component = renderer.create(
  //     <Button content="Button as an anchor: Go to Bing" href="http://bing.com" target="_blank" title="Let us bing!" />
  //   );
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a primary Button as an anchor correctly', () => {
  //   const component = renderer.create(
  //     <Button primary content="Button as an anchor: Go to Bing" href="http://bing.com" target="_blank" title="Let us bing!" />
  //   );
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a default checked Button correctly', () => {
  //   const component = renderer.create(<Button checked content="Button" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a default disabled checked Button correctly', () => {
  //   const component = renderer.create(<Button disabled checked content="Button" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a primary checked Button correctly', () => {
  //   const component = renderer.create(<Button primary checked content="Button" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a primary disabled checked Button correctly', () => {
  //   const component = renderer.create(<Button primary disabled checked content="Button" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a default circular checked Button correctly', () => {
  //   const component = renderer.create(<Button circular checked icon="Volume3" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a default circular disabled checked Button correctly', () => {
  //   const component = renderer.create(<Button circular disabled checked icon="Volume3" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a primary circular checked Button correctly', () => {
  //   const component = renderer.create(<Button primary circular checked icon="Volume3" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('renders a primary circular disabled checked Button correctly', () => {
  //   const component = renderer.create(<Button primary circular disabled checked icon="Volume3" />);
  //   const tree = component.toJSON();
  //   expect(tree).toMatchSnapshot();
  // });

  // it('focuses correctly when focus is triggered via IButton interface', () => {
  //   const button1 = React.createRef<IButton>();
  //   const button2 = React.createRef<IButton>();
  //   const button3 = React.createRef<IButton>();

  //   const wrapper = mount(
  //     <div>
  //       <Button content="Button 1" componentRef={button1} />
  //       <Button content="Button 2" componentRef={button2} />
  //       <Button content="Button 3" componentRef={button3} />
  //     </div>
  //   );

  //   const buttons = wrapper.getDOMNode().querySelectorAll('button.ms-Button') as NodeListOf<HTMLButtonElement>;
  //   expect(buttons.length).toEqual(3);

  //   button1.current!.focus();
  //   expect(document.activeElement!).toBe(buttons[0]);

  //   button2.current!.focus();
  //   expect(document.activeElement!).toBe(buttons[1]);

  //   button3.current!.focus();
  //   expect(document.activeElement!).toBe(buttons[2]);
  // });
});
