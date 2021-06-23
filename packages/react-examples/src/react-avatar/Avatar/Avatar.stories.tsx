import * as React from 'react';
import { AvatarExamples } from '@fluentui/example-data';
import { PrimaryButton, SpinButton, Stack, ThemeProvider } from '@fluentui/react';
import { Avatar, AvatarProps, renderAvatar, useAvatar, useAvatarStyles } from '@fluentui/react-avatar';
import { useBoolean } from '@fluentui/react-hooks';
import {
  CalendarIcon,
  CatIcon,
  ChatBotIcon,
  ContactIcon,
  GroupIcon,
  IDBadgeIcon,
  RoomIcon,
  TelemarketerIcon,
} from '@fluentui/react-icons-mdl2';
import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';

import { StoryExample } from '../utils/StoryExample';

const examples = {
  ...AvatarExamples,
  icon: [
    /* eslint-disable react/jsx-key */
    <GroupIcon />,
    <CatIcon />,
    <CalendarIcon />,
    <RoomIcon />,
    <IDBadgeIcon />,
    <TelemarketerIcon />,
    /* eslint-enable react/jsx-key */
  ],
  badge: [
    'available',
    'away',
    'busy',
    'doNotDisturb',
    'offline',
    'outOfOffice',
    { status: 'available', outOfOffice: true },
    { status: 'away', outOfOffice: true },
    { status: 'busy', outOfOffice: true },
    { status: 'doNotDisturb', outOfOffice: true },
    { status: 'offline', outOfOffice: true },
    { status: 'outOfOffice', outOfOffice: true },
  ],
} as const;

export const Basic = () => (
  <>
    <StoryExample title="Simple examples">
      <Avatar />
      <Avatar name={examples.name[0]} />
      <Avatar size={40} icon={<IDBadgeIcon />} />
      <Avatar size={72} name={examples.name[0]} image={examples.image[0]} />
    </StoryExample>
    <StoryExample title="Square">
      <Avatar square name="Group" />
      <Avatar square icon={<GroupIcon />} />
    </StoryExample>
    <StoryExample title="Badges">
      <Avatar name={examples.name[1]} badge="available" />
      <Avatar name={examples.name[2]} badge={{ status: 'available', outOfOffice: true }} />
      <Avatar name={examples.name[3]} image={examples.image[3]} badge="offline" />
    </StoryExample>
    <StoryExample title="Size">
      <Avatar size={20} name={examples.name[4]} image={examples.image[4]} badge="offline" />
      <Avatar size={48} name={examples.name[5]} image={examples.image[5]} badge="available" />
      <Avatar size={96} name={examples.name[6]} image={examples.image[6]} badge="away" />
    </StoryExample>
    <StoryExample title="Brand color">
      <Avatar color="brand" name={examples.name[4]} badge="doNotDisturb" />
      <Avatar color="brand" name={examples.name[5]} icon={examples.icon[5]} badge="available" />
    </StoryExample>
    <StoryExample title="Colorful">
      <Avatar color="colorful" name={examples.name[13]} />
      <Avatar color="colorful" name={examples.name[14]} />
      <Avatar color="colorful" name={examples.name[15]} />
      <Avatar color="colorful" name={examples.name[16]} />
      <Avatar color="colorful" name={examples.name[17]} />
      <Avatar color="colorful" idForColor={examples.name[18]} />
      <Avatar color="colorful" idForColor={examples.name[19]} />
      <Avatar color="colorful" idForColor={examples.name[20]} />
      <Avatar color="colorful" idForColor={examples.name[21]} />
      <Avatar color="colorful" idForColor={examples.name[22]} />
    </StoryExample>
    <StoryExample title="Active/inactive">
      <Stack horizontal wrap tokens={{ childrenGap: 16 }}>
        <Avatar name={examples.name[7]} active="active" />
        <Avatar image={examples.image[8]} active="active" activeDisplay="shadow" />
        <Avatar image={examples.image[9]} active="active" activeDisplay="glow" />
        <Avatar image={examples.image[10]} active="active" activeDisplay="ring-shadow" />
        <Avatar image={examples.image[11]} active="active" activeDisplay="ring-glow" />
        <Avatar image={examples.image[12]} active="inactive" />
      </Stack>
    </StoryExample>
  </>
);

export const AllSizes = () => (
  <>
    <StoryExample title="Image">
      <AvatarExampleList images={examples.image} />
    </StoryExample>
    <StoryExample title="Image, square">
      <AvatarExampleList images={examples.image} square exampleIndex={1} />
    </StoryExample>
    <StoryExample title="Initials">
      <AvatarExampleList names={examples.name} />
    </StoryExample>
    <StoryExample title="Initials, square">
      <AvatarExampleList names={examples.name} square exampleIndex={1} />
    </StoryExample>
    <StoryExample title="Icon">
      <AvatarExampleList icons={examples.icon} />
    </StoryExample>
    <StoryExample title="Icon, square">
      <AvatarExampleList icons={examples.icon} square exampleIndex={1} />
    </StoryExample>
  </>
);

export const Colors = () => (
  <>
    <StoryExample title="Neutral">
      <Avatar size={40} color="neutral" />
      <Avatar size={40} color="neutral" name={examples.name[0]} />
    </StoryExample>
    <StoryExample title="Brand">
      <Avatar size={40} color="brand" />
      <Avatar size={40} color="brand" name={examples.name[0]} />
    </StoryExample>
    <StoryExample title="Colorful">
      {examples.namedColors.map(color => (
        <Avatar size={40} color={color} key={color} />
      ))}
    </StoryExample>
    <StoryExample title="Colorful, hash of name">
      {examples.name.map(name => (
        <Avatar size={40} color="colorful" name={name} key={name} />
      ))}
    </StoryExample>
  </>
);

export const Active = () => (
  <>
    <StoryExample title="ring">
      <AvatarExampleList images={examples.image} active="active" activeDisplay="ring" exampleIndex={2} />
    </StoryExample>
    <StoryExample title="ring-shadow">
      <AvatarExampleList images={examples.image} active="active" activeDisplay="ring-shadow" exampleIndex={3} />
    </StoryExample>
    <StoryExample title="ring-glow">
      <AvatarExampleList images={examples.image} active="active" activeDisplay="ring-glow" exampleIndex={4} />
    </StoryExample>
    <StoryExample title="shadow">
      <AvatarExampleList images={examples.image} active="active" activeDisplay="shadow" exampleIndex={5} />
    </StoryExample>
    <StoryExample title="glow">
      <AvatarExampleList images={examples.image} active="active" activeDisplay="glow" exampleIndex={6} />
    </StoryExample>
    <StoryExample title="inactive">
      <AvatarExampleList images={examples.image} active="inactive" exampleIndex={7} />
    </StoryExample>
  </>
);

export const ActiveAnimation = () => {
  const [active, setActive] = React.useState(false);
  const [size, nextSize, prevSize] = useValueSelectorState(examples.size, 96);
  const [activeDisplay, nextActiveDisplay, prevActiveDisplay] = useValueSelectorState(examples.activeDisplay, 'ring');
  const [display, nextDisplay, prevDisplay] = useValueSelectorState(['image', 'icon', 'label'], 'image');

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
            active={active ? 'active' : 'inactive'}
            activeDisplay={activeDisplay}
            name={examples.name[10]}
            image={display === 'image' ? examples.image[10] : undefined}
            icon={display === 'icon' ? <ContactIcon /> : undefined}
          />
        </div>
        <Stack tokens={{ childrenGap: 8, maxWidth: 220 }}>
          <PrimaryButton onClick={React.useCallback(() => setActive(a => !a), [])}>Toggle Active</PrimaryButton>
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
    <Avatar name={examples.name[11]} badge="available" size={20} style={{ width: '13px', height: '13px' }} />
    <Avatar image={examples.image[12]} badge="away" size={20} style={{ width: '21px', height: '21px' }} />
    <Avatar name={examples.name[13]} badge="busy" size={32} style={{ width: '34px', height: '34px' }} />
    <Avatar image={examples.image[14]} badge="doNotDisturb" size={48} style={{ width: '55px', height: '55px' }} />
    <Avatar name={examples.name[15]} badge="offline" size={72} style={{ width: '89px', height: '89px' }} />
    <Avatar image={examples.image[16]} badge="outOfOffice" size={128} style={{ width: '144px', height: '144px' }} />
  </StoryExample>
);

const useRobotAvatarStyles = makeStyles({
  root: { borderRadius: '0' },
  20: { width: '24px' },
  24: { width: '28px' },
  28: { width: '32px' },
  32: { width: '36px' },
  36: { width: '40px' },
  40: { width: '44px' },
  48: { width: '56px' },
  56: { width: '64px' },
  64: { width: '72px' },
  72: { width: '80px' },
  96: { width: '108px' },
  120: { width: '128px' },
  128: { width: '136px' },
  label: {
    background: `url('${examples.hexagon}') 0px/contain no-repeat`,
    borderRadius: '0',
  },
});

const RobotAvatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) => {
  const state = useAvatar(props, ref, {
    icon: <ChatBotIcon />,
  });
  const styles = useRobotAvatarStyles();

  state.className = mergeClasses(styles.root, styles[state.size], state.className);
  state.label.className = mergeClasses(styles.label, state.label.className);

  useAvatarStyles(state);

  return renderAvatar(state);
});

export const RobotExample = () => {
  return (
    <StoryExample title="Robot Example">
      <Stack wrap horizontal tokens={{ childrenGap: 24 }}>
        <RobotAvatar size={20} />
        <RobotAvatar size={32} />
        <RobotAvatar size={48} />
        <RobotAvatar size={64} />
        <RobotAvatar size={96} />
        <RobotAvatar size={128} />
      </Stack>
    </StoryExample>
  );
};

export const AvatarPlayground = () => {
  const [nameAndImage, nextNameAndImage, prevNameAndImage] = useValueSelectorState(examples.nameAndImage);

  const propSelectors = [
    useValueSelector('size', useValueSelectorState(examples.size, 96), true),
    useValueSelector('square', useValueSelectorState([true, false])),
    useValueSelector('badge', useValueSelectorState(examples.badge), false, badgeToString),
    useValueSelector('name', [nameAndImage.name, nextNameAndImage, prevNameAndImage], true),
    useValueSelector('image', [nameAndImage.image, nextNameAndImage, prevNameAndImage], true, getFilenameFromUrl),
    useValueSelector('icon', useValueSelectorState(examples.icon), false, iconToString),
    useValueSelector('color', useValueSelectorState([...examples.color, ...examples.namedColors])),
    useValueSelector('active', useValueSelectorState(['active', 'inactive'] as const)),
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

/**
 * Generate a list of Avatars with sample properties
 */
const AvatarExampleList: React.FC<
  AvatarProps & {
    names?: readonly string[];
    images?: readonly string[];
    icons?: readonly JSX.Element[];
    exampleIndex?: number;
  }
> = props => {
  const { names, images, icons, exampleIndex = 0, ...restOfProps } = props;
  const offset = exampleIndex * examples.size.length;

  return (
    <Stack wrap horizontal tokens={{ childrenGap: 24 }}>
      {examples.size.map((size, i) => (
        <Avatar
          key={size}
          size={size}
          name={names && names[(i + offset) % names.length]}
          image={images && images[(i + offset) % images.length]}
          icon={icons && icons[(i + offset) % icons.length]}
          badge={examples.badge[(i + offset) % examples.badge.length]}
          {...restOfProps}
        />
      ))}
    </Stack>
  );
};

const iconToString = (icon: JSX.Element | undefined): string => `<${icon?.type.displayName} />`;
const badgeToString = (badge: typeof examples.badge[number] | undefined): string =>
  typeof badge === 'object' ? `{ status: '${badge.status}', outOfOffice: ${badge.outOfOffice} }` : `${badge}`;
const getFilenameFromUrl = (url: string) => url.substring(url.lastIndexOf('/') + 1);

type ValueSelectorState<T> = [/*value:*/ T, /*next:*/ () => void, /*prev:*/ () => void];

/**
 * Select a value from an array of values, with next/previous methods
 */
const useValueSelectorState = function <T>(values: readonly T[], initialValue: T = values[0]): ValueSelectorState<T> {
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
