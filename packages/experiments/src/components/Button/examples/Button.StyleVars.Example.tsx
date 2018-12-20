import * as React from 'react';
import { Button, IButtonProps } from '../index';
import { Stack } from '@uifabric/experiments';
import { ContextualMenu, IContextualMenuProps, Spinner } from 'office-ui-fabric-react';

const menuItems = [{ key: 'a', name: 'Item a' }, { key: 'b', name: 'Item b' }];
const buttonMenu = (props: IContextualMenuProps) => <ContextualMenu {...props} items={menuItems} />;

const sectionGap = 32;
const headingGap = 16;
const buttonGap = 12;

// TODO: if kept, rename to tokens
export class ButtonStyleVarsExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    const ButtonSet = (props: IButtonProps) => (
      <Stack horizontal verticalAlign='center' gap={8}>
        <Button {...props} />
        <Button {...props} secondary />
        <Button {...props} primary />
        <Button {...props} disabled />
        <Button {...props} tokens={{
          backgroundColor: 'red',
          backgroundColorHovered: 'pink',
          color: 'white',
          colorHovered: 'white',
          iconColor: 'white',
          iconColorHovered: 'white'
        }} />
      </Stack>
    );

    // TODO: why is baseToken minWidth and minHeight not applying to first button set?
    return (
      <Stack gap={sectionGap}>
        <ButtonSet />
        <ButtonSet content='No Icon' />
        <ButtonSet content={<Spinner />} />
        <ButtonSet icon='upload' content='Button with Icon' />
        <ButtonSet icon='upload' href='http://www.microsoft.com' content='Button with href' />
        <ButtonSet circular />
        <ButtonSet circular icon='share' />
        <ButtonSet
          icon={(iconProps, IconType) => <IconType {...iconProps} iconName='upload' />}
          content='Menu button with icon'
          menu={buttonMenu}
        />
        <ButtonSet
          icon='upload'
          content='Split button'
          split
          menu={buttonMenu}
        />
      </Stack>
    );
  }
}
