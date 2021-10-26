import * as React from 'react';
import { StoryExample } from './StoryExample.stories';
import { AvatarExamples as examples } from './AvatarExamples.stories';
import { Avatar, renderAvatar, useAvatar, useAvatarStyles } from './index';
import { mergeClasses, makeStyles } from '@fluentui/react-make-styles';
import { People20Regular, Guest20Regular, Bot20Regular, Bot24Regular } from '@fluentui/react-icons';
import type { AvatarProps } from './index';

/**
 * Temporary workaround for Buttons
 * The converged Button component is not yet migrated to the new DX: https://github.com/microsoft/fluentui/pull/18607
 */
const Button: React.FC<{ value?: string | number; onClick: React.MouseEventHandler<HTMLButtonElement> }> = props => {
  return (
    <button value={props.value} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

const useFlexStyles = makeStyles({
  root: {},
  stack: {
    display: 'flex',
    flexDirection: 'column',
  },
  flex: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '16px',
  },
});

export const Basic = () => {
  const styles = useFlexStyles();
  return (
    <>
      <StoryExample title="Simple examples">
        <Avatar />
        <Avatar name={examples.name[0]} />
        <Avatar size={40} icon={<Guest20Regular />} />
        <Avatar size={72} name={examples.name[0]} image={{ src: examples.image[0] }} />
      </StoryExample>
      <StoryExample title="Shape">
        <Avatar name="Group" />
        <Avatar icon={<People20Regular />} />
        <Avatar shape="square" name="Group" />
        <Avatar shape="square" icon={<People20Regular />} />
      </StoryExample>
      <StoryExample title="Badges">
        <Avatar name={examples.name[1]} badge={{ status: 'available' }} />
        <Avatar name={examples.name[2]} badge={{ status: 'available', outOfOffice: true }} />
        <Avatar name={examples.name[3]} image={{ src: examples.image[3] }} badge={{ status: 'offline' }} />
      </StoryExample>
      <StoryExample title="Size">
        <Avatar size={20} name={examples.name[4]} image={{ src: examples.image[4] }} badge={{ status: 'offline' }} />
        <Avatar size={48} name={examples.name[5]} image={{ src: examples.image[5] }} badge={{ status: 'available' }} />
        <Avatar size={96} name={examples.name[6]} image={{ src: examples.image[6] }} badge={{ status: 'away' }} />
      </StoryExample>
      <StoryExample title="Brand color">
        <Avatar color="brand" name={examples.name[4]} badge={{ status: 'doNotDisturb' }} />
        <Avatar color="brand" badge={{ status: 'available' }} />
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
        <div className={styles.flex}>
          <Avatar name={examples.name[7]} active="active" />
          <Avatar image={{ src: examples.image[8] }} active="active" activeAppearance="shadow" />
          <Avatar image={{ src: examples.image[9] }} active="active" activeAppearance="glow" />
          <Avatar image={{ src: examples.image[10] }} active="active" activeAppearance="ring-shadow" />
          <Avatar image={{ src: examples.image[11] }} active="active" activeAppearance="ring-glow" />
          <Avatar image={{ src: examples.image[12] }} active="inactive" />
        </div>
      </StoryExample>
    </>
  );
};

export const ShapesAndSizes = () => (
  <>
    <StoryExample title="Image, default circular">
      <AvatarExampleList images={examples.image} />
    </StoryExample>
    <StoryExample title="Image, square">
      <AvatarExampleList images={examples.image} shape="square" exampleIndex={1} />
    </StoryExample>
    <StoryExample title="Initials, default circular">
      <AvatarExampleList names={examples.name} />
    </StoryExample>
    <StoryExample title="Initials, square">
      <AvatarExampleList names={examples.name} shape="square" exampleIndex={1} />
    </StoryExample>
    <StoryExample title="Icon, default circular">
      <AvatarExampleList />
    </StoryExample>
    <StoryExample title="Icon, square">
      <AvatarExampleList shape="square" exampleIndex={1} />
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

export const ActiveAppearance = () => (
  <>
    <StoryExample title="ring">
      <AvatarExampleList images={examples.image} active="active" activeAppearance="ring" exampleIndex={2} />
    </StoryExample>
    <StoryExample title="ring-shadow">
      <AvatarExampleList images={examples.image} active="active" activeAppearance="ring-shadow" exampleIndex={3} />
    </StoryExample>
    <StoryExample title="ring-glow">
      <AvatarExampleList images={examples.image} active="active" activeAppearance="ring-glow" exampleIndex={4} />
    </StoryExample>
    <StoryExample title="shadow">
      <AvatarExampleList images={examples.image} active="active" activeAppearance="shadow" exampleIndex={5} />
    </StoryExample>
    <StoryExample title="glow">
      <AvatarExampleList images={examples.image} active="active" activeAppearance="glow" exampleIndex={6} />
    </StoryExample>
    <StoryExample title="inactive">
      <AvatarExampleList images={examples.image} active="inactive" exampleIndex={7} />
    </StoryExample>
  </>
);

export const ActiveAnimation = () => {
  const [active, setActive] = React.useState(false);
  const [size, nextSize, prevSize] = useValueSelectorState(examples.size, 96);
  const [activeAppearance, nextActiveDisplay, prevActiveDisplay] = useValueSelectorState(
    examples.activeAppearance,
    'ring',
  );
  const [display, nextDisplay, prevDisplay] = useValueSelectorState(['image', 'icon', 'label'], 'image');
  const flexStyles = useFlexStyles();
  React.useEffect(() => {
    const id = setTimeout(() => setActive(true), 500);
    return () => clearTimeout(id);
  }, []);

  return (
    <div className={flexStyles.stack}>
      <div style={{ width: 200, height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar
          size={size}
          active={active ? 'active' : 'inactive'}
          activeAppearance={activeAppearance}
          name={display === 'label' ? examples.name[10] : undefined}
          image={display === 'image' ? { src: examples.image[10] } : undefined}
        />
      </div>
      <div className={flexStyles.stack}>
        <Button onClick={React.useCallback(() => setActive(a => !a), [])}>Toggle Active</Button>
        {/* Temporarly replacement of SpinButtons */}
        <div className={flexStyles.flex}>
          <span>activeAppearance="{activeAppearance}"</span>
          <Button value={activeAppearance} onClick={nextActiveDisplay}>
            next
          </Button>
          <Button value={activeAppearance} onClick={prevActiveDisplay}>
            prev
          </Button>
        </div>

        <div className={flexStyles.flex}>
          <span>display="{display}"</span>
          <Button value={display} onClick={nextDisplay}>
            next
          </Button>
          <Button value={display} onClick={prevDisplay}>
            prev
          </Button>
        </div>

        <div className={flexStyles.flex}>
          <span>size="{size}"</span>
          <Button value={size} onClick={nextSize}>
            next
          </Button>
          <Button value={size} onClick={prevSize}>
            prev
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CustomSizes = () => (
  <StoryExample title="Custom size">
    <Avatar
      name={examples.name[11]}
      badge={{ status: 'available' }}
      size={20}
      style={{ width: '13px', height: '13px' }}
    />
    <Avatar
      image={{ src: examples.image[12] }}
      badge={{ status: 'away' }}
      size={20}
      style={{ width: '21px', height: '21px' }}
    />
    <Avatar name={examples.name[13]} badge={{ status: 'busy' }} size={32} style={{ width: '34px', height: '34px' }} />
    <Avatar
      image={{ src: examples.image[14] }}
      badge={{ status: 'doNotDisturb' }}
      size={48}
      style={{ width: '55px', height: '55px' }}
    />
    <Avatar
      name={examples.name[15]}
      badge={{ status: 'offline' }}
      size={72}
      style={{ width: '89px', height: '89px' }}
    />
    <Avatar
      image={{ src: examples.image[16] }}
      badge={{ status: 'outOfOffice' }}
      size={128}
      style={{ width: '144px', height: '144px' }}
    />
  </StoryExample>
);

const useRobotAvatarStyles = makeStyles({
  root: {
    background: `url('${examples.hexagon}') 0px/contain no-repeat`,
    borderRadius: '0',
  },
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
});

const RobotAvatar = React.forwardRef((props: AvatarProps, ref: React.Ref<HTMLElement>) => {
  const { size = 32 } = props;

  const icon = size <= 40 ? <Bot20Regular /> : <Bot24Regular />;

  const state = useAvatar({ icon, ...props }, ref);
  const styles = useRobotAvatarStyles();

  state.className = mergeClasses(styles.root, styles[state.size], state.className);

  useAvatarStyles(state);

  return renderAvatar(state);
});

export const RobotExample = () => {
  const flexStyles = useFlexStyles();
  return (
    <StoryExample title="Robot Example">
      <div className={flexStyles.flex}>
        <RobotAvatar size={32} />
        <RobotAvatar size={48} />
        <RobotAvatar size={64} />
      </div>
    </StoryExample>
  );
};

export const Playground = () => {
  const [nameAndImage, nextNameAndImage, prevNameAndImage] = useValueSelectorState(examples.nameAndImage);

  const propSelectors = [
    useValueSelector('size', useValueSelectorState(examples.size, 96), true),
    useValueSelector('shape', useValueSelectorState(examples.shape)),
    useValueSelector('badge', useValueSelectorState(examples.badge), false, badgeToString as () => string),
    useValueSelector('name', [nameAndImage.name, nextNameAndImage, prevNameAndImage], true),
    useValueSelector(
      'image',
      [{ src: nameAndImage.image }, nextNameAndImage, prevNameAndImage],
      true,
      getFilenameFromUrl,
    ),
    useValueSelector('color', useValueSelectorState([...examples.color, ...examples.namedColors])),
    useValueSelector('active', useValueSelectorState(['active', 'inactive'] as const)),
    useValueSelector('activeAppearance', useValueSelectorState(examples.activeAppearance)),
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
        {propSelectors.map(p => p.renderSelector())}
        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
          {`<Avatar `}
          {propSelectors.map(p => p.renderValue())}
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
    exampleIndex?: number;
  }
> = props => {
  const { names, images, exampleIndex = 0, ...restOfProps } = props;
  const offset = exampleIndex * examples.size.length;
  const flexStyles = useFlexStyles();

  return (
    <div className={flexStyles.flex}>
      {examples.size.map((size, i) => (
        <Avatar
          key={size}
          size={size}
          name={names && names[(i + offset) % names.length]}
          image={images && { src: images[(i + offset) % images.length] }}
          badge={examples.badge[(i + offset) % examples.badge.length]}
          {...restOfProps}
        />
      ))}
    </div>
  );
};

const badgeToString = (badge: typeof examples.badge[number] | undefined): string =>
  typeof badge === 'object' ? `{ status: '${badge.status}', outOfOffice: ${badge.outOfOffice} }` : `${badge}`;

const getFilenameFromUrl = (image: AvatarProps['image']) =>
  image?.src?.substring(image?.src.lastIndexOf('/') + 1) ?? '';

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
  const [enabled, setEnabled] = React.useState(initialEnabled);

  return {
    /** Assign this property's value to the given props object, if the property is set */
    assignValue: (props: AvatarProps) => enabled && (props[name] = value),

    /** Render the UI to select the property value */
    renderSelector: () => (
      <div style={{ opacity: !enabled ? '50%' : undefined }}>
        <button onClick={enabled ? prev : () => setEnabled(!enabled)}>&lt;</button>
        <button onClick={enabled ? next : () => setEnabled(!enabled)}>&gt;</button>
        <input id={`prop_${name}`} type="checkbox" onChange={() => setEnabled(!enabled)} checked={enabled} />
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

export default {
  title: 'Components/Avatar',
  component: Avatar,
};
