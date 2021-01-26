import * as React from 'react';
import { Box, Button, Divider, Header, Toolbar } from '@fluentui/react-northstar';
import InstructionMessage from './instructionMessage';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  FontSizeIcon,
  RemoveFormatIcon,
  OutdentIcon,
  IndentIcon,
  MoreIcon,
  LinkIcon,
  CodeSnippetIcon,
  QuoteIcon,
} from '@fluentui/react-icons-northstar';
// import FocusedComponent from './FocusedComponent';
// import { NavigationContainer, useFocusEffect } from '@react-navigation/native';
// import { NavigationContainer, useFocusEffect } from React;

// function ProfileScreen() {
//   useFocusEffect(
//     React.useCallback(() => {
//       alert('Screen was focused');
//       // Do something when the screen is focused
//       return () => {
//         alert('Screen was unfocused');
//         // Do something when the screen is unfocused
//         // Useful for cleanup functions
//       };
//     }, []),
//   );

//   return <Box />;
// }

// class FocusedControl extends React.Component {
//   render() {
//     // Get it from props
//     const { isFocused } = this.props;
//   }
// }
const stateReducer = (prevState, action) => ({ ...prevState, [action]: !prevState[action] });

const InstructionMessageDefault: React.FC<any> = props => {
  const [displayed, setDisplayed] = React.useState(false);
  const [state, dispatch] = React.useReducer(stateReducer, {
    bold: false,
    italic: false,
    more: false,
    underline: false,
  });

  return (
    <Box styles={{ 'background-color': 'white', height: '400px' }}>
      <Button content="only to set focus" />

      <InstructionMessage message="custom - navigate by arrows">
        <Toolbar
          aria-label="Default"
          items={[
            {
              icon: (
                <BoldIcon
                  {...{
                    outline: true,
                  }}
                />
              ),
              key: 'bold',
              kind: 'toggle',
              active: state.bold,
              title: 'Toggle bold',
              onClick: () => dispatch('bold'),
            },
            {
              icon: (
                <ItalicIcon
                  {...{
                    outline: true,
                  }}
                />
              ),
              key: 'italic',
              kind: 'toggle',
              active: state.italic,
              title: 'Toggle italic',
              onClick: () => dispatch('italic'),
            },
            {
              icon: (
                <UnderlineIcon
                  {...{
                    outline: true,
                  }}
                />
              ),
              key: 'underline',
              kind: 'toggle',
              active: state.underline,
              title: 'Toggle underline',
              onClick: () => dispatch('underline'),
            },
            {
              key: 'divider-1',
              kind: 'divider',
            },
            {
              icon: (
                <FontSizeIcon
                  {...{
                    outline: true,
                  }}
                />
              ),
              key: 'font-size',
              title: 'Font size',
            },
            {
              icon: (
                <RemoveFormatIcon
                  {...{
                    outline: true,
                  }}
                />
              ),
              key: 'remove-format',
              title: 'Remove formatting',
            },
            {
              key: 'divider-2',
              kind: 'divider',
            },
            {
              icon: (
                <OutdentIcon
                  {...{
                    outline: true,
                  }}
                />
              ),
              key: 'outdent',
              title: 'Outdent',
            },
            {
              icon: (
                <IndentIcon
                  {...{
                    outline: true,
                  }}
                />
              ),
              key: 'indent',
              title: 'Indent',
            },
            {
              key: 'divider-3',
              kind: 'divider',
            },
            {
              icon: (
                <MoreIcon
                  {...{
                    outline: true,
                  }}
                />
              ),
              key: 'more',
              active: state.more,
              title: 'More',
              menu: [
                {
                  key: 'quote',
                  content: 'Quote',
                  icon: <QuoteIcon />,
                },
                {
                  key: 'link',
                  content: 'Link',
                  icon: <LinkIcon />,
                  disabled: true,
                },
                {
                  key: 'code',
                  content: 'Code snippet',
                  icon: <CodeSnippetIcon />,
                },
              ],
              menuOpen: state.more,
              onMenuOpenChange: () => dispatch('more'),
            },
          ]}
        />
      </InstructionMessage>

      <Header content="region without tabindex" />
      <InstructionMessage role="region" aria-label="bar" message="custom - navigate by a + b">
        <Button content="inside 1" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 2" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 3" onClick={() => setDisplayed(!displayed)} />
      </InstructionMessage>

      <Button content="only to set focus" />
      <Button content="only to set focus" />

      <Divider />
      <Header content="region with 0" />
      <Box role="region" tabIndex={0} aria-label="use enter key and escape ...">
        <Button content="inside 1" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 2" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 3" onClick={() => setDisplayed(!displayed)} />
      </Box>

      <Button content="only to set focus" />
      <Button content="only to set focus" />

      <Divider />
      <Header content="region with -1" />
      <Box role="region" tabIndex={-1} aria-label="use enter key and escape ...">
        <Button content="inside 1" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 2" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 3" onClick={() => setDisplayed(!displayed)} />
      </Box>

      <Button content="only to set focus" />
      <Button content="only to set focus" />

      <Divider />
      <Header content="group without tabindex" />
      <InstructionMessage message="navigate by c + d" role="group" aria-label="bar">
        <Button content="inside 1" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 2" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 3" onClick={() => setDisplayed(!displayed)} />
      </InstructionMessage>

      <Divider />
      <Header content="group with -1" />
      <Box role="group" tabIndex={-1} aria-label="use enter key and escape ...">
        <Button content="inside 1" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 2" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 3" onClick={() => setDisplayed(!displayed)} />
      </Box>

      <Button content="only to set focus" />
      <Button content="only to set focus" />

      <Divider />
      <Header content="group with 0" />
      <Box role="group" tabIndex={0} aria-label="use enter key and escape ...">
        <Button content="inside 1" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 2" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 3" onClick={() => setDisplayed(!displayed)} />
      </Box>

      {/* {displayed && (
          <>
            <Skeleton aria-label="loading messages">
              <Skeleton.Shape />
              <Skeleton.Line />
              <Skeleton.Line width="70%" />
              <Skeleton.Line width="50%" />
            </Skeleton>
            <Skeleton aria-label="loading user cards">
              <Skeleton.Shape />
              <Skeleton.Line />
              <Skeleton.Line width="70%" />
              <Skeleton.Line width="50%" />
            </Skeleton>
          </>
        )} */}
      {/* </NavigationContainer> */}
    </Box>
  );
};

export default InstructionMessageDefault;
