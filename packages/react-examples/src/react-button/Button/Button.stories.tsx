import * as React from 'react';
import { Button, ButtonProps } from '@fluentui/react-button';

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
const SizeExample = ({ size }: { size?: string }) => (
  <>
    <h4>{size || '(default)'}</h4>
    <Button size={size}>Text</Button>
    <Button size={size} icon={<SVGIcon />}>
      Text
    </Button>
    <Button size={size} icon={<SVGIcon />} />
    <br />
    <Button size={size} compound content="Primary string" secondaryText="Secondary string" />
    <Button size={size} compound content="Primary string" secondaryText="Secondary string" illustration={<SVGIcon />} />
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
export const Default = () => <AppearanceExample />;

//
// States
//
export const Disabled = () => (
  <Button disabled icon={<SVGIcon />}>
    Text
  </Button>
);
