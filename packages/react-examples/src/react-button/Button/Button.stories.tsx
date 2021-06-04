import * as React from 'react';
import { Button, ButtonProps } from '@fluentui/react-button';
import { Playground } from '../Playground';
import { PlaygroundProps, PropDefinition } from '../Playground.types';

// TODO: this is here while waiting for react-icons to merge
const SVGIcon = () => (
  <span
    role="presentation"
    style={{
      width: '1em',
      height: '1em',
    }}
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 2048 2048"
      style={{
        height: '100%',
        fill: 'currentColor',
        verticalAlign: 'top',
      }}
    >
      <path d="M768 768h128v128H768V768zm384 768h128v128h-128v-128zm384-768h128v128h-128V768zm-384 0h128v128h-128V768zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zm1152 0h128v128h-128v-128zm-384 0h128v128h-128v-128zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zm1152 0h128v128h-128v-128zm-384 0h128v128h-128v-128zm-384 256h128v128H768v-128zm-384 0h128v128H384v-128zM2048 128v1792H0V128h384V0h128v128h1024V0h128v128h384zM128 256v256h1792V256h-256v128h-128V256H512v128H384V256H128zm1792 1536V640H128v1152h1792z" />
    </svg>
  </span>
);

export const Default = () => <AppearanceExample />;

//
// Anatomy & Layout
//

export const TextOnly = () => <Button>Text</Button>;
export const TextOnlyLong = () => <Button>Text truncates after it hits the max width token value</Button>;

export const IconWithText = () => (
  <>
    <Button icon={<SVGIcon />}>Text</Button>
    <Button icon={<SVGIcon />} iconPosition="after">
      Text
    </Button>
  </>
);

export const IconOnly = () => <Button icon={<SVGIcon />} />;

//
// Size
//
const SizeExample = ({ size }: { size?: ButtonProps['size'] }) => (
  <>
    <h4>{size || '(default)'}</h4>
    <Button size={size}>Text</Button>
    <Button size={size} icon={<SVGIcon />}>
      Text
    </Button>
    <Button size={size} icon={<SVGIcon />} />
  </>
);

export const Size = () => (
  <>
    <SizeExample size="small" />
    <SizeExample />
    <SizeExample size="large" />
  </>
);

//
// Appearance
//
const AppearanceExample = (props: ButtonProps) => (
  <>
    <Button {...props} icon={<SVGIcon />} />
    <br />
    <Button {...props}>Text</Button>
    <Button {...props} icon={<SVGIcon />}>
      Text
    </Button>
    <Button {...props} icon={<SVGIcon />} iconPosition="after">
      Text
    </Button>
  </>
);

export const Primary = () => <AppearanceExample primary />;

//
// States
//
export const Disabled = () => (
  <>
    <Button disabled icon={<SVGIcon />}>
      Default disabled
    </Button>
    <Button primary disabled icon={<SVGIcon />}>
      Primary disabled
    </Button>
  </>
);

type ExampleProps = { iconOnly?: string };

export const buttonBaseProps: PropDefinition<ButtonProps & ExampleProps>[] = [
  { propName: 'content', propType: 'string', defaultValue: 'This is a button', dependsOnProps: ['~iconOnly'] },
  { propName: 'disabled', propType: 'boolean' },
  { propName: 'icon', propType: 'boolean' },
  { propName: 'iconOnly', propType: 'boolean', dependsOnProps: ['icon'] },
  {
    propName: 'iconPosition',
    propType: ['before', 'after'],
    defaultValue: 'before',
    dependsOnProps: ['icon', '~iconOnly'],
  },
  { propName: 'primary', propType: 'boolean', dependsOnProps: ['~subtle', '~transparent'] },
  { propName: 'size', propType: ['small', 'medium', 'large'], defaultValue: 'medium' },
  { propName: 'subtle', propType: 'boolean', dependsOnProps: ['~primary', '~transparent'] },
  { propName: 'transparent', propType: 'boolean', dependsOnProps: ['~primary', '~subtle'] },
];

const buttonProps: PlaygroundProps<ButtonProps>['sections'] = [
  { sectionName: 'Button props', propList: buttonBaseProps },
];

export const ButtonPlayground = () => (
  <Playground sections={buttonProps}>
    <Button />
  </Playground>
);
