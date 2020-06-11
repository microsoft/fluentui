import * as React from 'react';
import {
  Provider,
  CallIcon,
  Header,
  Divider,
  Checkbox,
  Flex,
  teamsTheme,
  BookmarkIcon,
} from '@fluentui/react-northstar';
import Button from './Button/Button';
import TeamsButton, { TeamsButtonWithInlineStyles, TertiaryButton } from './Button/variants/TeamsButton';
import { RtlContextProvider } from './rtlContext';
import CallingsButton from './Button/variants/CallingsButton';
import CircularCallingsButton from './Button/variants/CircularCallingsButton';
import ToggleButton from './Button/variants/ToggleButton';
import themeOverrides from './themeOverrides';

export default function App() {
  const [rtl, setRtl] = React.useState(false);

  const handleClick = (e, p) => {
    console.log('Clicked ' + p.content);
  };

  return (
    <RtlContextProvider value={{ rtl }}>
      <Provider theme={teamsTheme}>
        <Flex padding="padding.medium" gap="gap.medium">
          <Checkbox toggle checked={rtl} label="Rtl" onChange={() => setRtl(!rtl)} />
          <Provider theme={themeOverrides} rtl={rtl}>
            <Header content="Fluent UI Button with hooks" as="h3" />
            <Button onClick={handleClick} content="Default" icon={<BookmarkIcon />} />
            <Button onClick={handleClick} size="small" content="Small primary" icon={<BookmarkIcon />} primary />
            <Divider />
            <Header content="Custom styled Button" as="h3" />
            <TeamsButton onClick={handleClick} icon={<BookmarkIcon />} content="Default" />
            <TeamsButton onClick={handleClick} icon={<BookmarkIcon />} danger content="Small danger" size="small" />
            {/*<TeamsButtonWithInlineStyles primary content={"Primary button"} />*/}
            {/*<TeamsButtonWithInlineStyles onClick={handleClick} icon={<BookmarkIcon />} danger content="Small danger" size="small" />*/}
            {/*<TeamsButtonWithInlineStyles onClick={handleClick} icon={<BookmarkIcon />} danger content="Small danger" size="small" />*/}
            <TertiaryButton tertiery content={'Tertiery'} />
            <TertiaryButton danger content={'Tertiery danger'} />
            <Divider />
            <Header content="Custom button" as="h4" />
            <Flex padding="padding.medium" style={{ backgroundColor: '#232323' }}>
              <CallingsButton icon={<CallIcon />} content="Call" />
              <CallingsButton icon={<CallIcon />} content="Primary" primary />
              <CallingsButton icon={<CallIcon />} content="Secondary" secondary />
              <CallingsButton icon={<CallIcon />} content="Danger" danger />
            </Flex>
            <Header content="Custom button with custom slots" as="h4" />
            <Flex padding="padding.medium" style={{ backgroundColor: '#232323' }}>
              <CircularCallingsButton icon={<CallIcon />} content="Call" />
              <CircularCallingsButton icon={<CallIcon />} content="Primary" primary />
              <CircularCallingsButton icon={<CallIcon />} content="Secondary" secondary size="small" />
              <CircularCallingsButton icon={<CallIcon />} content="Danger" danger />
            </Flex>
            <Divider />
            <Header content="Toggle Button" as="h3" />
            <ToggleButton content="Click for toggle" />
            <Divider />
            <Header conetnt="Styled components" as="h4" />
          </Provider>
        </Flex>
      </Provider>
    </RtlContextProvider>
  );
}
