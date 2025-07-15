import * as React from 'react';
import { makeStyles, tokens, Button, Card, CardHeader, CardPreview } from '@fluentui/react-components';
import { Blur } from '@fluentui/react-motion-components-preview';
import BlurDemoDescription from './BlurDemo.stories.md';

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
});

const images = [
  { gradient: 'repeating-linear-gradient(45deg, #4a90e2 0px, #4a90e2 20px, #7b68ee 20px, #7b68ee 40px)' },
  { gradient: 'repeating-linear-gradient(135deg, #ff6b6b 0px, #ff6b6b 20px, #ffa726 20px, #ffa726 40px)' },
  { gradient: 'repeating-linear-gradient(225deg, #4ecdc4 0px, #4ecdc4 20px, #26a69a 20px, #26a69a 40px)' },
];

export const Demo = () => {
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
      {/* Image Gallery Demo */}
      <div className={classes.demoSection}>
        <h3>Image Gallery Reveal</h3>
        <p>Click on images to reveal them with blur transition</p>
        <div className={classes.controls}>
          <Button onClick={toggleAll}>{allRevealed ? 'Hide All' : 'Reveal All'}</Button>
        </div>
        <div className={classes.imageGallery}>
          {images.map((image, index) => (
            <div key={index} className={classes.imageCard} onClick={() => toggleImage(index)}>
              {/* Background with blur effect - starts blurred, becomes clear when revealed */}
              <Blur visible={revealedImages[index]} fromRadius="5px" animateOpacity={false}>
                <div className={classes.imageBackground} style={{ backgroundImage: image.gradient }} />
              </Blur>

              {/* "Click to reveal" button - starts clear, blurs/fades out when clicked */}
              <Blur visible={!revealedImages[index]} fromRadius="10px" animateOpacity={true}>
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: tokens.fontSizeBase300,
                    fontWeight: tokens.fontWeightSemibold,
                  }}
                >
                  <div
                    style={{
                      backgroundColor: 'rgba(0, 0, 0, 0.7)',
                      padding: '8px 16px',
                      borderRadius: tokens.borderRadiusMedium,
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                    }}
                  >
                    Click to reveal
                  </div>
                </div>
              </Blur>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Demo.parameters = {
  docs: {
    description: {
      story: BlurDemoDescription,
    },
  },
};
