import React from 'react';
import { Box, Button, Divider, Header } from '@fluentui/react-northstar';
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

const InstructionMessageDefault: React.FC<any> = props => {
  const [displayed, setDisplayed] = React.useState(false);
  // const [displayed, setDisplayed] = React.useState(false);

  return (
    <Box styles={{ 'background-color': 'white', height: '400px' }}>
      <Button content="only to set focus" />

      {/* <NavigationContainer> */}

      {/* <FocusedComponent>
        <Button content="inside 1" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 2" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 3" onClick={() => setDisplayed(!displayed)} />
      </FocusedComponent> */}

      <Header content="region without tabindex" />
      <Box role="region" aria-label="use enter key and escape ...">
        <Button content="inside 1" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 2" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 3" onClick={() => setDisplayed(!displayed)} />
      </Box>

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
      <Box role="group" aria-label="use enter key and escape ...">
        <Button content="inside 1" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 2" onClick={() => setDisplayed(!displayed)} />
        <Button content="inside 3" onClick={() => setDisplayed(!displayed)} />
      </Box>

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
