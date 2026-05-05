# Motion/Components (preview)/Blur

The `Blur` component manages content presence, using blur in/out transitions.

> **⚠️ Preview components are considered unstable**

```tsx
import { Blur } from '@fluentui/react-motion-components-preview';

function Component({ visible }) {
  return (
    <Blur visible={visible}>
      <div>Content</div>
    </Blur>
  );
}
```

## Examples

### Default

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { Field, makeStyles, tokens, Switch } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'minmax(200px, 1fr) 2fr',
    gridTemplateAreas: '"controls content"',
    gap: '20px',
    padding: '20px',
  },
  content: {
    gridArea: 'content',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: '20px',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    maxWidth: '400px',
  },
  controls: {
    gridArea: 'controls',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: tokens.borderRadiusMedium,
    boxShadow: tokens.shadow16,
    padding: '20px',
  },
  field: {
    flex: 1,
  },
});

const LoremIpsum = () => (
  <>
    {'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '.repeat(
      10,
    )}
  </>
);

export const Default = (): JSXElement => {
  const classes = useClasses();
  const [visible, setVisible] = React.useState<boolean>(true);

  return (
    <div className={classes.container}>
      <div className={classes.controls}>
        <Field className={classes.field}>
          <Switch label="Visible" checked={visible} onChange={() => setVisible(v => !v)} />
        </Field>
      </div>

      <div className={classes.content}>
        <Blur visible={visible}>
          <div className={classes.card}>
            <LoremIpsum />
          </div>
        </Blur>
      </div>
    </div>
  );
};
```

### Duration

Control enter and exit animation timing with `duration` and `exitDuration` parameters. When `exitDuration` is omitted, it defaults to the `duration` value.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button, motionTokens } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  card: {
    width: '200px',
    height: '120px',
    padding: '20px',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase300,
    textAlign: 'center',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
});

const durationOptions: Array<{
  label: string;
  duration: number;
  exitDuration?: number;
}> = [
  {
    label: `Fast (${motionTokens.durationFast}ms)`,
    duration: motionTokens.durationFast,
  },
  {
    label: `Ultra Slow (${motionTokens.durationUltraSlow}ms)`,
    duration: motionTokens.durationUltraSlow,
  },
  {
    label: `Mixed (${motionTokens.durationFast}ms enter, ${motionTokens.durationUltraSlow}ms exit)`,
    duration: motionTokens.durationFast,
    exitDuration: motionTokens.durationUltraSlow,
  },
];

export const Duration = (): JSXElement => {
  const classes = useClasses();
  const [visibleStates, setVisibleStates] = React.useState<boolean[]>(durationOptions.map(() => true));

  const toggleAll = () => {
    setVisibleStates(prev => prev.map(state => !state));
  };

  const toggleSingle = (index: number) => {
    setVisibleStates(prev => prev.map((state, i) => (i === index ? !state : state)));
  };

  return (
    <>
      <div className={classes.controls}>
        <Button onClick={toggleAll}>Toggle All</Button>
      </div>

      <div className={classes.container}>
        {durationOptions.map((option, index) => (
          <div key={option.label} className={classes.example}>
            <h4>{option.label}</h4>
            <Button onClick={() => toggleSingle(index)}>{visibleStates[index] ? 'Hide' : 'Show'}</Button>
            <Blur visible={visibleStates[index]} duration={option.duration} exitDuration={option.exitDuration}>
              <div className={classes.card}>
                <div>
                  Enter: {option.duration}ms
                  <br />
                  Exit: {option.exitDuration ?? option.duration}ms
                  {!option.exitDuration && (
                    <>
                      <br />
                      <small>(Exit defaults to Enter duration)</small>
                    </>
                  )}
                </div>
              </div>
            </Blur>
          </div>
        ))}
      </div>
    </>
  );
};
```

### Layered Blur Demo

- Each image uses two Blur components with inverse visibility: the background stripes start blurred and become clear when revealed, while the overlay button starts clear and blurs away when clicked.
- The button fades away with `animateOpacity` set to true, while the background blur stays visible in both states with `animateOpacity` set to false.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
    padding: '20px',
  },
  demoSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  imageGallery: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '20px',
    padding: '20px',
    backgroundColor: tokens.colorNeutralBackground2,
    borderRadius: tokens.borderRadiusMedium,
  },
  imageCard: {
    position: 'relative',
    aspectRatio: '4/3',
    borderRadius: tokens.borderRadiusMedium,
    overflow: 'hidden',
    cursor: 'pointer',
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },

  controls: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: tokens.colorBackgroundOverlay,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: tokens.colorNeutralForegroundInverted,
    fontSize: tokens.fontSizeBase300,
    fontWeight: tokens.fontWeightSemibold,
  },
  overlayButton: {
    backgroundColor: tokens.colorSubtleBackgroundInverted,
    padding: '8px 16px',
    borderRadius: tokens.borderRadiusMedium,
    border: `1px solid ${tokens.colorNeutralStrokeAlpha2}`,
  },
});

const images = [
  {
    id: 'blue-gradient',
    gradient: `repeating-linear-gradient(45deg, ${tokens.colorPaletteBlueBorderActive} 0px, ${tokens.colorPaletteBlueBorderActive} 20px, ${tokens.colorPaletteBlueForeground2} 20px, ${tokens.colorPaletteBlueForeground2} 40px)`,
  },
  {
    id: 'red-gradient',
    gradient: `repeating-linear-gradient(135deg, ${tokens.colorPaletteRedBorderActive} 0px, ${tokens.colorPaletteRedBorderActive} 20px, ${tokens.colorPaletteRedForeground2} 20px, ${tokens.colorPaletteRedForeground2} 40px)`,
  },
];

export const LayeredBlurDemo = (): JSXElement => {
  const classes = useClasses();

  // Image Gallery Demo
  const [revealedImages, setRevealedImages] = React.useState<boolean[]>(images.map(() => false));

  const toggleImage = (index: number) => {
    setRevealedImages(prev => prev.map((revealed, i) => (i === index ? !revealed : revealed)));
  };

  const toggleAll = () => {
    const allRevealed = revealedImages.every(revealed => revealed);
    setRevealedImages(images.map(() => !allRevealed));
  };

  const allRevealed = revealedImages.every(revealed => revealed);

  return (
    <div className={classes.container}>
      {/* Layered Blur Demo */}
      <div className={classes.demoSection}>
        <div className={classes.controls}>
          <Button onClick={toggleAll}>{allRevealed ? 'Hide All' : 'Reveal All'}</Button>
        </div>
        <div className={classes.imageGallery}>
          {images.map((image, index) => (
            <div key={image.id} className={classes.imageCard} onClick={() => toggleImage(index)}>
              {/* Background with blur effect - starts blurred, becomes clear when revealed */}
              <Blur visible={revealedImages[index]} outRadius="5px" animateOpacity={false}>
                <div className={classes.imageBackground} style={{ backgroundImage: image.gradient }} />
              </Blur>

              {/* "Click to reveal" button - starts clear, blurs/fades out when clicked */}
              <Blur visible={!revealedImages[index]} outRadius="10px" animateOpacity={true}>
                <div className={classes.overlay}>
                  <div className={classes.overlayButton}>Click to reveal</div>
                </div>
              </Blur>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
```

### Opacity

Compare blur with opacity fade versus blur-only animation using `animateOpacity`.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '40px',
    padding: '20px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  card: {
    width: '250px',
    height: '180px',
    padding: '20px',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase400,
    textAlign: 'center',
    backgroundImage: `
      linear-gradient(45deg, ${tokens.colorNeutralBackground3} 25%, transparent 25%, transparent 75%, ${tokens.colorNeutralBackground3} 75%),
      linear-gradient(45deg, ${tokens.colorNeutralBackground3} 25%, transparent 25%, transparent 75%, ${tokens.colorNeutralBackground3} 75%)
    `,
    backgroundSize: '20px 20px',
    backgroundPosition: '0 0, 10px 10px',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    justifyContent: 'center',
  },
});

export const Opacity = (): JSXElement => {
  const classes = useClasses();
  const [withOpacityVisible, setWithOpacityVisible] = React.useState<boolean>(true);
  const [withoutOpacityVisible, setWithoutOpacityVisible] = React.useState<boolean>(true);

  const toggleBoth = () => {
    setWithOpacityVisible(prev => !prev);
    setWithoutOpacityVisible(prev => !prev);
  };

  return (
    <>
      <div className={classes.controls}>
        <Button onClick={toggleBoth}>Toggle Both</Button>
      </div>

      <div className={classes.container}>
        <div className={classes.example}>
          <Button onClick={() => setWithOpacityVisible(prev => !prev)}>{withOpacityVisible ? 'Hide' : 'Show'}</Button>
          <Blur visible={withOpacityVisible} animateOpacity={true}>
            <div className={classes.card}>
              <div>
                This content blurs and fades
                <br />
                <br />
                <strong>animateOpacity: true</strong>
              </div>
            </div>
          </Blur>
        </div>

        <div className={classes.example}>
          <Button onClick={() => setWithoutOpacityVisible(prev => !prev)}>
            {withoutOpacityVisible ? 'Hide' : 'Show'}
          </Button>
          <Blur visible={withoutOpacityVisible} animateOpacity={false}>
            <div className={classes.card}>
              <div>
                This content only blurs
                <br />
                <br />
                <strong>animateOpacity: false</strong>
              </div>
            </div>
          </Blur>
        </div>
      </div>
    </>
  );
};
```

### Radius

Compare different `outRadius` values to control the spread of the blur effect.

```tsx
import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { makeStyles, tokens, Button } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';

const useClasses = makeStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
    padding: '20px',
  },
  example: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  card: {
    width: '200px',
    height: '150px',
    padding: '20px',
    border: `${tokens.strokeWidthThin} solid ${tokens.colorNeutralStroke1}`,
    borderRadius: tokens.borderRadiusMedium,
    backgroundColor: tokens.colorNeutralBackground1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: tokens.fontSizeBase300,
    textAlign: 'center',
  },
  controls: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
});

const blurRadiusOptions = [
  { label: 'Small (5px)', value: '5px' },
  { label: 'Medium (20px)', value: '20px' },
  { label: 'Large (50px)', value: '50px' },
  { label: 'Extra Large (100px)', value: '100px' },
];

export const Radius = (): JSXElement => {
  const classes = useClasses();
  const [visibleStates, setVisibleStates] = React.useState<boolean[]>(blurRadiusOptions.map(() => true));

  const toggleAll = () => {
    setVisibleStates(prev => prev.map(state => !state));
  };

  const toggleSingle = (index: number) => {
    setVisibleStates(prev => prev.map((state, i) => (i === index ? !state : state)));
  };

  return (
    <>
      <div className={classes.controls}>
        <Button onClick={toggleAll}>Toggle All</Button>
      </div>

      <div className={classes.container}>
        {blurRadiusOptions.map((option, index) => (
          <div key={option.value} className={classes.example}>
            <h4>{option.label}</h4>
            <Button onClick={() => toggleSingle(index)}>{visibleStates[index] ? 'Hide' : 'Show'}</Button>
            <Blur visible={visibleStates[index]} outRadius={option.value}>
              <div className={classes.card}>
                <div>
                  Blur radius: {option.value}
                  <br />
                  Sample content with various text and elements.
                </div>
              </div>
            </Blur>
          </div>
        ))}
      </div>
    </>
  );
};
```
