import * as React from 'react';
import { Avatar, AvatarProps, avatarSizeValues } from '@fluentui/react-avatar';
import {
  GroupIcon,
  CatIcon,
  IDBadgeIcon,
  CalendarIcon,
  TelemarketerIcon,
  RoomIcon,
  ChatBotIcon,
  SkypeClockIcon,
  SkypeCheckIcon,
  SkypeMinusIcon,
  SkypeArrowIcon,
} from '@fluentui/react-icons';
import { StoryExample } from '../utils/StoryExample';
import { Stack } from '@fluentui/react-next';

const imageRoot = 'http://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large';
const examplePeople = [
  { name: 'Ade Q', image: imageRoot + '/ade.jpg' },
  { name: 'Christain W', image: imageRoot + '/christian.jpg' },
  { name: 'Daniel E', image: imageRoot + '/daniel.jpg' },
  { name: 'Elliot R', image: imageRoot + '/elliot.jpg' },
  { name: 'Elyse T', image: imageRoot + '/elyse.png' },
  { name: 'Helen Y', image: imageRoot + '/helen.jpg' },
  { name: 'Jenny U', image: imageRoot + '/jenny.jpg' },
  { name: 'Joe I', image: imageRoot + '/joe.jpg' },
  { name: 'Justen O', image: imageRoot + '/justen.jpg' },
  { name: 'Kristy P', image: imageRoot + '/kristy.png' },
  { name: 'Laura A', image: imageRoot + '/laura.jpg' },
  { name: 'Matt S', image: imageRoot + '/matt.jpg' },
  { name: 'Matthew D', image: imageRoot + '/matthew.png' },
  { name: 'Molly F', image: imageRoot + '/molly.png' },
  { name: 'Nan G', image: imageRoot + '/nan.jpg' },
  { name: 'Patrick H', image: imageRoot + '/patrick.png' },
  { name: 'Rachel J', image: imageRoot + '/rachel.png' },
  { name: 'Steve K', image: imageRoot + '/steve.jpg' },
  { name: 'Stevie L', image: imageRoot + '/stevie.jpg' },
  { name: 'Tom Z', image: imageRoot + '/tom.jpg' },
  { name: 'Veronika X', image: imageRoot + '/veronika.jpg' },
  { name: 'Zoe C', image: imageRoot + '/zoe.jpg' },
] as const;

/** Values used for the example avatars */
const examples = {
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
  activeDisplay: ['ring', 'ring-shadow', 'ring-glow', 'shadow', 'glow'],
  customSize: [19, 23, 28, 34, 41, 49, 58, 68, 79, 91, 104, 118, 133, 149, 166, 184],
} as const;

const iconToString = (icon: JSX.Element | undefined): string => `<${icon?.type.displayName} />`;
const badgeToString = (badge: typeof examples.badges[number] | undefined): string =>
  typeof badge === 'object' ? `{ state: '${badge.state}', icon: { as: ${badge.icon.as.displayName} } }` : `${badge}`;

export const BasicExamples = () => {
  return (
    <>
      <StoryExample title="Simple examples">
        <Avatar />
        <Avatar name="Joe B" />
        <Avatar icon={<IDBadgeIcon />} />
        <Avatar name="Joe B" image={`${imageRoot}/joe.jpg`} />
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
          image={`${imageRoot}/elyse.png`}
          badge={{ state: 'success', icon: { as: SkypeCheckIcon } }}
        />
      </StoryExample>
      <StoryExample title="Size">
        <Avatar size={20} name="Tom Z" image={`${imageRoot}/tom.jpg`} badge="info" />
        <Avatar size={48} name="Joe B" image={`${imageRoot}/joe.jpg`} badge="success" />
        <Avatar size={96} name="Rachel J" image={`${imageRoot}/rachel.png`} badge="warning" />
      </StoryExample>
      <StoryExample title="Active/inactive">
        <Avatar name="Tom Z" active={true} />
        <Avatar image={`${imageRoot}/molly.png`} active={true} activeDisplay="shadow" />
        <Avatar image={`${imageRoot}/nan.jpg`} active={true} activeDisplay="glow" />
        <Avatar image={`${imageRoot}/patrick.png`} active={true} activeDisplay="ring-shadow" />
        <Avatar image={`${imageRoot}/veronika.jpg`} active={true} activeDisplay="ring-glow" />
        <Avatar image={`${imageRoot}/kristy.png`} active={false} />
      </StoryExample>
    </>
  );
};

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
  </>
);

export const Active = () => (
  <>
    <StoryExample title="ring">
      <AvatarExampleList display="image" active={true} activeDisplay="ring" exampleIndex={39} />
    </StoryExample>
    <StoryExample title="ring-shadow">
      <AvatarExampleList display="image" active={true} activeDisplay="ring-shadow" exampleIndex={52} />
    </StoryExample>
    <StoryExample title="ring-glow">
      <AvatarExampleList display="image" active={true} activeDisplay="ring-glow" exampleIndex={91} />
    </StoryExample>
    <StoryExample title="shadow">
      <AvatarExampleList display="image" active={true} activeDisplay="shadow" exampleIndex={65} />
    </StoryExample>
    <StoryExample title="glow">
      <AvatarExampleList display="image" active={true} activeDisplay="glow" exampleIndex={78} />
    </StoryExample>
    <StoryExample title="inactive">
      <AvatarExampleList display="image" active={false} exampleIndex={26} />
    </StoryExample>
  </>
);

export const ActiveAnimation = () => {
  const [active, setActive] = React.useState(true);

  React.useEffect(() => {
    const id = setInterval(() => setActive(a => !a), 2500);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <StoryExample title="ring">
        <Stack horizontal tokens={{ childrenGap: '24px' }}>
          <Avatar size={64} {...examplePeople[9]} display="image" active={active} activeDisplay="ring" />
          <Avatar size={64} {...examplePeople[9]} display="icon" active={active} activeDisplay="ring" />
          <Avatar size={64} {...examplePeople[9]} display="label" active={active} activeDisplay="ring" />
        </Stack>
      </StoryExample>
      <StoryExample title="ring-shadow">
        <Avatar size={64} {...examplePeople[10]} active={active} activeDisplay="ring-shadow" />
      </StoryExample>
      <StoryExample title="ring-glow">
        <Avatar size={64} {...examplePeople[11]} active={active} activeDisplay="ring-glow" />
      </StoryExample>
      <StoryExample title="shadow">
        <Avatar size={64} {...examplePeople[15]} active={active} activeDisplay="shadow" />
      </StoryExample>
      <StoryExample title="glow">
        <Avatar size={64} {...examplePeople[18]} active={active} activeDisplay="glow" />
      </StoryExample>
    </>
  );
};

export const CustomSizes = () => (
  <StoryExample title="Custom Size">
    <Avatar name="Custom Size" badge="success" customSize={13} />
    <Avatar name="Custom Size" badge="warning" customSize={21} />
    <Avatar name="Custom Size" badge="error" customSize={34} />
    <Avatar name="Custom Size" badge="success" customSize={55} />
    <Avatar name="Custom Size" badge="success" customSize={89} />
    <Avatar name="Custom Size" badge="success" customSize={144} />
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
            background: 'url("images/avatar/hexagon.svg") 0px/contain no-repeat',
            borderRadius: '0',
          }}
        />
      </StoryExample>
    </>
  );
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

/**
 * Helpers
 */

/** Get an array index, wrapping around to the start of the array if the index is out of bounds */
const wrapIndex = <T,>(array: readonly T[], i: number) => array[(i + array.length) % array.length];

/**
 * Generate a list of Avatars with sample properties
 */
const AvatarExampleList = (props: AvatarProps & { exampleIndex?: number }) => {
  const { exampleIndex = 0 } = props;
  const avatars = avatarSizeValues.map((size, i) => (
    <div key={size} style={{ margin: `10px` }}>
      <Avatar
        size={size}
        name={wrapIndex(examples.names, i + exampleIndex)}
        image={wrapIndex(examples.images, i + exampleIndex)}
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

/**
 * Create a selector UI for a property value, allowing the user to toggle among the available property values
 */
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
