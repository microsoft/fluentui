import * as React from 'react';
import type { JSXElement } from '@fluentui/react-components';
import { tokens, Button } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';
import BlurDemoDescription from './BlurDemo.stories.md';

import styles from './BlurDemo.module.css';

const useClasses = () => styles;

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

LayeredBlurDemo.parameters = {
  docs: {
    description: {
      story: BlurDemoDescription,
    },
  },
};
