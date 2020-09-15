import * as React from 'react';
import { Avatar } from './Avatar';
import { AvatarProps, avatarSizeValues } from './Avatar.types';
import { StoryExample } from '../utils/StoryExample';
import {
  GroupIcon,
  CatIcon,
  IDBadgeIcon,
  CalendarIcon,
  TelemarketerIcon,
  RoomIcon,
  RobotIcon,
  SkypeClockIcon,
  SkypeCheckIcon,
  SkypeMinusIcon,
  SkypeArrowIcon,
} from '@fluentui/react-icons';

export const BasicExamples = () => {
  return (
    <>
      <StoryExample title="Simple examples">
        <Avatar />
        <Avatar name="Joe B" />
        <Avatar icon={<IDBadgeIcon />} />
        <Avatar name="Joe B" image="images/avatar/joe.png" />
      </StoryExample>
      <StoryExample title="Square">
        <Avatar square name="Group" />
        <Avatar square icon={<GroupIcon />} />
      </StoryExample>
      <StoryExample title="Badges">
        <Avatar name="Matthew Doe" badge="warning" />
        <Avatar name="Matthew Doe" badge="success" />
        <Avatar
          name="Elyse T"
          image="images/avatar/elyse.png"
          badge={{ state: 'success', icon: { as: SkypeCheckIcon } }}
        />
      </StoryExample>
      <StoryExample title="Size">
        <Avatar size={20} name="Tom Z" image="images/avatar/tom.png" badge="info" />
        <Avatar size={48} name="Joe B" image="images/avatar/joe.png" badge="success" />
        <Avatar size={96} name="Rachel J" image="images/avatar/rachel.png" badge="warning" />
      </StoryExample>
      <StoryExample title="Active/inactive">
        <Avatar name="Tom Z" active={true} />
        <Avatar image="images/avatar/molly.png" active={true} activeDisplay="shadow" />
        <Avatar image="images/avatar/nan.png" active={true} activeDisplay="glow" />
        <Avatar image="images/avatar/patrick.png" active={true} activeDisplay="ringShadow" />
        <Avatar image="images/avatar/veronika.png" active={true} activeDisplay="ringGlow" />
        <Avatar image="images/avatar/kristy.png" active={false} />
      </StoryExample>
    </>
  );
};

/** Helper to get an array index, wrapping around to the start of the array if the index is out of bounds */
const wrapIndex = <T,>(array: readonly T[], i: number) => array[(i + array.length) % array.length];

/** Construct an array with a range of numbers */
const range = (from: number, to: number, step: number = 1) =>
  Array.from({ length: (to - from + step) / step }, (_, i) => i * step + from);

// Generates a list of Avatars with sample properties
const AvatarExampleList = (props: AvatarProps & { exampleIndex?: number }) => {
  const { exampleIndex = 0 } = props;
  const avatars = avatarSizeValues.map((size, i) => (
    <div key={size} style={{ margin: `8px` }}>
      <Avatar
        size={size}
        {...wrapIndex(examples.people, i + exampleIndex)}
        badge={wrapIndex(examples.badges, i + exampleIndex)}
        icon={wrapIndex(examples.icons, i + exampleIndex)}
        {...props}
      />
    </div>
  ));

  return (
    <div style={{ display: 'flex', margin: '0', flexWrap: 'wrap' }}>
      <div style={{ display: 'flex' }}>{avatars.slice(0, 9)}</div>
      <div style={{ display: 'flex' }}>{avatars.slice(9)}</div>
    </div>
  );
};

// Values used for the example avatars
const examplePeople = [
  { name: 'Ade Q', image: 'images/avatar/ade.png' },
  { name: 'Christain W', image: 'images/avatar/christian.png' },
  { name: 'Daniel E', image: 'images/avatar/daniel.png' },
  { name: 'Elliot R', image: 'images/avatar/elliot.png' },
  { name: 'Elyse T', image: 'images/avatar/elyse.png' },
  { name: 'Helen Y', image: 'images/avatar/helen.png' },
  { name: 'Jenny U', image: 'images/avatar/jenny.png' },
  { name: 'Joe I', image: 'images/avatar/joe.png' },
  { name: 'Justen O', image: 'images/avatar/justen.png' },
  { name: 'Kristy P', image: 'images/avatar/kristy.png' },
  { name: 'Laura A', image: 'images/avatar/laura.png' },
  { name: 'Matt S', image: 'images/avatar/matt.png' },
  { name: 'Matthew D', image: 'images/avatar/matthew.png' },
  { name: 'Molly F', image: 'images/avatar/molly.png' },
  { name: 'Nan G', image: 'images/avatar/nan.png' },
  { name: 'Patrick H', image: 'images/avatar/patrick.png' },
  { name: 'Rachel J', image: 'images/avatar/rachel.png' },
  { name: 'Steve K', image: 'images/avatar/steve.png' },
  { name: 'Stevie L', image: 'images/avatar/stevie.png' },
  { name: 'Tom Z', image: 'images/avatar/tom.png' },
  { name: 'Veronika X', image: 'images/avatar/veronika.png' },
  { name: 'Zoe C', image: 'images/avatar/zoe.png' },
] as const;

const examples = {
  people: examplePeople,
  names: examplePeople.map(p => p.name),
  images: examplePeople.map(p => p.image),
  icons: [
    /* eslint-disable react/jsx-key */
    <GroupIcon />,
    <CatIcon />,
    <CalendarIcon />,
    <RoomIcon />,
    <IDBadgeIcon />,
    <TelemarketerIcon />,
    /* eslint-enable react/jsx-key */
  ],
  badges: [
    'success',
    'warning',
    'error',
    'info',
    { state: 'success', icon: { as: SkypeCheckIcon } },
    { state: 'warning', icon: { as: SkypeClockIcon } },
    { state: 'error', icon: { as: SkypeMinusIcon } },
    { state: 'info', icon: { as: SkypeArrowIcon } },
  ],
  display: ['label', 'image', 'icon'],
  activeDisplay: ['ring', 'ringShadow', 'ringGlow', 'shadow', 'glow'],
  customSize: range(15, 200, 4.25),
} as const;

const iconToString = (icon: JSX.Element | undefined): string => `<${icon?.type.displayName} />`;
const badgeToString = (badge: typeof examples.badges[number] | undefined): string =>
  typeof badge === 'object' ? `{ state: '${badge.state}', icon: { as: ${badge.icon.as.displayName} } }` : `${badge}`;

export const AllSizes = () => (
  <>
    <StoryExample title="Image">
      <AvatarExampleList display="image" />
      <AvatarExampleList display="image" square exampleIndex={avatarSizeValues.length} />
    </StoryExample>
    <StoryExample title="Initials">
      <AvatarExampleList display="label" />
      <AvatarExampleList display="label" square exampleIndex={avatarSizeValues.length} />
    </StoryExample>
    <StoryExample title="Icon">
      <AvatarExampleList display="icon" />
      <AvatarExampleList display="icon" square exampleIndex={avatarSizeValues.length} />
    </StoryExample>
    <StoryExample title="Inactive">
      <AvatarExampleList display="image" active={false} exampleIndex={26} />
    </StoryExample>
    <StoryExample title="Active">
      <AvatarExampleList display="image" active={true} exampleIndex={39} />
      <AvatarExampleList display="image" active={true} activeDisplay="shadow" exampleIndex={65} />
      <AvatarExampleList display="image" active={true} activeDisplay="glow" exampleIndex={52} />
      <AvatarExampleList display="image" active={true} activeDisplay="ringShadow" exampleIndex={78} />
      <AvatarExampleList display="image" active={true} activeDisplay="ringGlow" exampleIndex={91} />
    </StoryExample>
  </>
);

export const CustomSizes = () => (
  <StoryExample title="Custom Size">
    <Avatar name="Custom Size" badge="success" customSize={17} />
    <Avatar name="Custom Size" badge="warning" customSize={42} />
    <Avatar name="Custom Size" badge="error" customSize={55} />
    <Avatar name="Custom Size" badge="success" customSize={100} />
    <Avatar name="Custom Size" badge="success" customSize={150} />
  </StoryExample>
);

export const CustomShape = () => {
  return (
    <>
      <StoryExample title="Custom shape">
        <AvatarExampleList
          icon={<RobotIcon />}
          display="icon"
          tokens={{ clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)' }}
        />
      </StoryExample>
    </>
  );
};

const useValueSelector = <Prop extends keyof AvatarProps>(
  name: Prop,
  values: readonly AvatarProps[Prop][],
  initialValue?: AvatarProps[Prop],
  valueToString: (v: AvatarProps[Prop] | undefined) => string = v => `${v}`,
) => {
  const [value, setValue] = React.useState(initialValue === undefined ? values[0] : initialValue);
  const [enabled, setEnabled] = React.useState(initialValue !== undefined);
  const next = React.useCallback(() => setValue(v => wrapIndex(values, values.indexOf(v) + 1)), [values]);
  const prev = React.useCallback(() => setValue(v => wrapIndex(values, values.indexOf(v) - 1)), [values]);
  const toggleEnabled = React.useCallback(() => setEnabled(e => !e), []);
  return {
    assignValue: (props: AvatarProps) => enabled && (props[name] = value),
    renderSelector: () => (
      <div style={{ opacity: !enabled ? '50%' : undefined }}>
        <button onClick={enabled ? prev : toggleEnabled}>&lt;</button>
        <button onClick={enabled ? next : toggleEnabled}>&gt;</button>
        <input id={`prop_${name}`} type="checkbox" onChange={toggleEnabled} checked={enabled} />
        <label htmlFor={`prop_${name}`}>{`${name}: ${enabled ? `${valueToString(value)}` : `(unset)`}`}</label>
      </div>
    ),
    renderValue: () => {
      const quotes = typeof value === 'string' ? '""' : '{}';
      return enabled && <span>{`${name}=${quotes[0]}${valueToString(value)}${quotes[1]}`}</span>;
    },
  };
};

export const AvatarPlayground = () => {
  const propSelectors = [
    useValueSelector('size', avatarSizeValues, 96),
    useValueSelector('customSize', examples.customSize),
    useValueSelector('square', [true, false]),
    useValueSelector('badge', examples.badges, undefined, badgeToString),
    useValueSelector('name', examples.names, examples.names[7]),
    useValueSelector('image', examples.images, examples.images[7]),
    useValueSelector('icon', examples.icons, undefined, iconToString),
    useValueSelector('display', examples.display),
    useValueSelector('active', [true, false]),
    useValueSelector('activeDisplay', examples.activeDisplay),
  ];

  const propValues = propSelectors.reduce((props, { assignValue }) => {
    assignValue(props);
    return props;
  }, {} as AvatarProps);

  return (
    <div style={{ display: 'flex' }}>
      <div
        style={{
          margin: '20px',
          width: '200px',
          height: '200px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
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
