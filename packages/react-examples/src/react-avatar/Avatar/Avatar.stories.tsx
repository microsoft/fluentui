import * as React from 'react';
import { Avatar, AvatarProps } from '@fluentui/react-avatar';
import { GroupIcon, IDBadgeIcon, ChatBotIcon, SkypeCheckIcon } from '@fluentui/react-icons-mdl2';
import { StoryExample } from '../utils/StoryExample';
import { Button, SpinButton, Stack, ThemeProvider } from '@fluentui/react';
import { AvatarExampleList } from './AvatarExampleList';
import { avatarExamples as examples, svgHexagonDataUrl } from './avatarExamples';
import { useBoolean } from '@fluentui/react-hooks';

export const Basic = () => (
  <>
    <StoryExample title="Simple examples">
      <Avatar />
      <Avatar name={examples.person[0].name} />
      <Avatar size={40} icon={<IDBadgeIcon />} />
      <Avatar size={72} name={examples.person[0].name} image={examples.person[0].image} />
    </StoryExample>
    <StoryExample title="Square">
      <Avatar square name="Group" />
      <Avatar square icon={<GroupIcon />} />
    </StoryExample>
    <StoryExample title="Badges">
      <Avatar name={examples.person[1].name} badge="warning" />
      <Avatar name={examples.person[2].name} badge="success" />
      <Avatar
        name={examples.person[3].name}
        image={examples.person[3].image}
        badge={{ state: 'success', icon: { as: SkypeCheckIcon } }}
      />
    </StoryExample>
    <StoryExample title="Size">
      <Avatar size={20} name={examples.person[4].name} image={examples.person[4].image} badge="info" />
      <Avatar size={48} name={examples.person[5].name} image={examples.person[5].image} badge="success" />
      <Avatar size={96} name={examples.person[6].name} image={examples.person[6].image} badge="warning" />
    </StoryExample>
    <StoryExample title="Active/inactive">
      <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
        <Avatar name={examples.person[7].name} active={true} />
        <Avatar image={examples.person[8].image} active={true} activeDisplay="shadow" />
        <Avatar image={examples.person[9].image} active={true} activeDisplay="glow" />
        <Avatar image={examples.person[10].image} active={true} activeDisplay="ring-shadow" />
        <Avatar image={examples.person[11].image} active={true} activeDisplay="ring-glow" />
        <Avatar image={examples.person[12].image} active={false} />
      </Stack>
    </StoryExample>
  </>
);

export const AllSizes = () => (
  <>
    <StoryExample title="Image">
      <AvatarExampleList display="image" />
    </StoryExample>
    <StoryExample title="Image, square">
      <AvatarExampleList display="image" square exampleIndex={1} />
    </StoryExample>
    <StoryExample title="Initials">
      <AvatarExampleList display="label" />
    </StoryExample>
    <StoryExample title="Initials, square">
      <AvatarExampleList display="label" square exampleIndex={1} />
    </StoryExample>
    <StoryExample title="Icon">
      <AvatarExampleList display="icon" />
    </StoryExample>
    <StoryExample title="Icon, square">
      <AvatarExampleList display="icon" square exampleIndex={1} />
    </StoryExample>
  </>
);

export const Active = () => (
  <>
    <StoryExample title="ring">
      <AvatarExampleList display="image" active={true} activeDisplay="ring" exampleIndex={2} />
    </StoryExample>
    <StoryExample title="ring-shadow">
      <AvatarExampleList display="image" active={true} activeDisplay="ring-shadow" exampleIndex={3} />
    </StoryExample>
    <StoryExample title="ring-glow">
      <AvatarExampleList display="image" active={true} activeDisplay="ring-glow" exampleIndex={4} />
    </StoryExample>
    <StoryExample title="shadow">
      <AvatarExampleList display="image" active={true} activeDisplay="shadow" exampleIndex={5} />
    </StoryExample>
    <StoryExample title="glow">
      <AvatarExampleList display="image" active={true} activeDisplay="glow" exampleIndex={6} />
    </StoryExample>
    <StoryExample title="inactive">
      <AvatarExampleList display="image" active={false} exampleIndex={7} />
    </StoryExample>
  </>
);

export const ActiveAnimation = () => {
  const [active, setActive] = React.useState(false);
  const [size, nextSize, prevSize] = useValueSelectorState(examples.size, 96);
  const [activeDisplay, nextActiveDisplay, prevActiveDisplay] = useValueSelectorState(examples.activeDisplay, 'ring');
  const [display, nextDisplay, prevDisplay] = useValueSelectorState(examples.display, 'image');

  React.useEffect(() => {
    const id = setTimeout(() => setActive(true), 500);
    return () => clearTimeout(id);
  }, []);

  return (
    <ThemeProvider>
      <Stack>
        <div style={{ width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Avatar
            size={size}
            display={display}
            active={active}
            activeDisplay={activeDisplay}
            name={examples.person[10].name}
            image={examples.person[10].image}
          />
        </div>
        <Stack tokens={{ childrenGap: 8, maxWidth: 220 }}>
          <Button primary onClick={React.useCallback(() => setActive(a => !a), [])}>
            Toggle Active
          </Button>
          <SpinButton
            label="activeDisplay"
            value={activeDisplay}
            onIncrement={nextActiveDisplay}
            onDecrement={prevActiveDisplay}
          />
          <SpinButton label="display" value={display} onIncrement={nextDisplay} onDecrement={prevDisplay} />
          <SpinButton label="size" value={`${size}`} onIncrement={nextSize} onDecrement={prevSize} />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export const CustomSizes = () => (
  <StoryExample title="Custom size">
    <Avatar name={examples.person[11].name} badge="success" customSize={13} />
    <Avatar image={examples.person[12].image} badge="warning" customSize={21} />
    <Avatar name={examples.person[13].name} badge="error" customSize={34} />
    <Avatar image={examples.person[14].image} badge="info" customSize={55} />
    <Avatar name={examples.person[15].name} badge="warning" customSize={89} />
    <Avatar image={examples.person[16].image} badge="success" customSize={144} />
  </StoryExample>
);

export const CustomShape = () => {
  return (
    <>
      <StoryExample title="Custom shape">
        <AvatarExampleList
          icon={<ChatBotIcon />}
          display="icon"
          tokens={{
            width: 'calc(var(--avatar-height) * 1.125)',
            background: `url('${svgHexagonDataUrl}') 0px/contain no-repeat`,
            borderRadius: '0',
          }}
        />
      </StoryExample>
    </>
  );
};

export const AvatarPlayground = () => {
  const [person, nextPerson, prevPerson] = useValueSelectorState(examples.person);

  const propSelectors = [
    useValueSelector('size', useValueSelectorState(examples.size, 96), true),
    useValueSelector('customSize', useValueSelectorState(examples.customSize)),
    useValueSelector('square', useValueSelectorState([true, false])),
    useValueSelector('badge', useValueSelectorState(examples.badge), false, badgeToString),
    useValueSelector('name', [person.name, nextPerson, prevPerson], true),
    useValueSelector('image', [person.image, nextPerson, prevPerson], true, getFilenameFromUrl),
    useValueSelector('icon', useValueSelectorState(examples.icon), false, iconToString),
    useValueSelector('display', useValueSelectorState(examples.display)),
    useValueSelector('active', useValueSelectorState([true, false])),
    useValueSelector('activeDisplay', useValueSelectorState(examples.activeDisplay)),
  ];

  // Build an AvatarProps object with the selected property values
  const propValues: AvatarProps = {};
  propSelectors.forEach(({ assignValue }) => assignValue(propValues));

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: '225px', height: '225px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar {...propValues} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', fontFamily: 'Consolas, monospaced', fontSize: '14px' }}>
        {...propSelectors.map(p => p.renderSelector())}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          {`<Avatar `}
          {...propSelectors.map(p => p.renderValue())}
          {`/>`}
        </div>
      </div>
    </div>
  );
};

//
// Helpers
//

const iconToString = (icon: JSX.Element | undefined): string => `<${icon?.type.displayName} />`;
const badgeToString = (badge: typeof examples.badge[number] | undefined): string =>
  typeof badge === 'object' ? `{ state: '${badge.state}', icon: { as: ${badge.icon.as.displayName} } }` : `${badge}`;
const getFilenameFromUrl = (url: string) => url.substring(url.lastIndexOf('/') + 1);

type ValueSelectorState<T> = [/*value:*/ T, /*next:*/ () => void, /*prev:*/ () => void];

/**
 * Select a value from an array of values, with next/previous methods
 */
const useValueSelectorState = function<T>(values: readonly T[], initialValue: T = values[0]): ValueSelectorState<T> {
  const count = values.length;
  const [index, setIndex] = React.useState<number>(() => values.indexOf(initialValue));
  const next = React.useCallback(() => setIndex(i => (i + 1) % count), [count]);
  const prev = React.useCallback(() => setIndex(i => (i - 1 + count) % count), [count]);
  return [values[index], next, prev];
};

/**
 * Create a selector UI for a property value, allowing the user to toggle among the available property values
 */
const useValueSelector = <Prop extends keyof AvatarProps>(
  name: Prop,
  [value, next, prev]: ValueSelectorState<AvatarProps[Prop]>,
  initialEnabled: boolean = false,
  valueToString: (v: AvatarProps[Prop] | undefined) => string = v => `${v}`,
) => {
  const [enabled, { toggle: toggleEnabled }] = useBoolean(initialEnabled);

  return {
    /** Assign this property's value to the given props object, if the property is set */
    assignValue: (props: AvatarProps) => enabled && (props[name] = value),

    /** Render the UI to select the property value */
    renderSelector: () => (
      <div style={{ opacity: !enabled ? '50%' : undefined }}>
        <button onClick={enabled ? prev : toggleEnabled}>&lt;</button>
        <button onClick={enabled ? next : toggleEnabled}>&gt;</button>
        <input id={`prop_${name}`} type="checkbox" onChange={toggleEnabled} checked={enabled} />
        <label htmlFor={`prop_${name}`}>{`${name}: ${enabled ? `${valueToString(value)}` : `(unset)`}`}</label>
      </div>
    ),

    /** Render a span with propName="propValue" inside, if the property is set */
    renderValue: () => {
      const quotes = typeof value === 'string' ? '""' : '{}';
      return enabled && <span>{`${name}=${quotes[0]}${valueToString(value)}${quotes[1]}`}</span>;
    },
  };
};
