import * as React from 'react';
import { Announced } from 'office-ui-fabric-react/lib/Announced';
import { createArray } from 'office-ui-fabric-react/lib/Utilities';
import { Image } from 'office-ui-fabric-react/lib/Image';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { Stack, IStackTokens, IStackStyles } from 'office-ui-fabric-react/lib/Stack';
import { DefaultButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';
import { useBoolean, useSetInterval, useConst } from '@uifabric/react-hooks';

const DELAY = 10;
const PHOTO_COUNT = 30;

const stackTokens: IStackTokens = { childrenGap: 10 };
const photoStackTokens: IStackTokens = { childrenGap: '6 6' };

const defaultButtonStyles: Partial<IButtonStyles> = { root: { width: 150 } };

const photoStackStyles: Partial<IStackStyles> = {
  root: {
    border: '1px solid black',
    padding: 10,
    overflowY: 'auto',
  },
  inner: {
    padding: 0,
  },
};

const photoCellClass = mergeStyles({
  display: 'block',
  boxSizing: 'border-box',
  width: 100,
  height: 100,
});

interface IPhoto {
  url: string;
  width: number;
  height: number;
}

export const AnnouncedLazyLoadingExample = () => {
  const [total, setTotal] = React.useState<number>(0);
  const [announced, setAnnounced] = React.useState<JSX.Element | undefined>(undefined);
  const [timeSinceLastAnnounce, setTimeSinceLastAnnounce] = React.useState<number>(0);
  const [loading, { toggle: toggleLoading }] = useBoolean(false);
  const percentComplete = total / PHOTO_COUNT;
  const { setInterval, clearInterval } = useSetInterval();

  const photos: IPhoto[] = useConst(() => {
    const width = 100;
    const height = 100;
    const result = createArray(PHOTO_COUNT, () => {
      return {
        url: `http://placehold.it/${width}x${height}`,
        width: width,
        height: height,
      };
    });
    return result;
  });

  React.useEffect(() => {
    if (loading) {
      setTotal(0);
      const itemIntervalId = setInterval(() => {
        setTotal((t: number) => {
          if (t < PHOTO_COUNT) {
            return t + 1;
          } else {
            clearInterval(itemIntervalId);
            return t;
          }
        });
      }, 500);

      const announceIntervalId = setInterval(() => {
        setTimeSinceLastAnnounce(timeSinceLastAnnounce + 1);
        if (timeSinceLastAnnounce === DELAY || total === PHOTO_COUNT) {
          setAnnounced(<Announced message={`${total} of ${PHOTO_COUNT} photos loaded`} />);
          setTimeSinceLastAnnounce(0);
          if (total === PHOTO_COUNT) {
            clearInterval(announceIntervalId);
          }
        }
      }, 1000);

      return () => {
        clearInterval(itemIntervalId);
        clearInterval(announceIntervalId);
      };
    }
  }, [loading]);

  return (
    <Stack tokens={stackTokens}>
      <Text>
        Turn on Narrator and press the button to start loading photos. Announced should announce the number of photos
        loaded every 10 seconds, as that is the delay chosen for this example.
      </Text>
      <DefaultButton text={loading ? 'Cancel' : 'Load photos'} onClick={toggleLoading} styles={defaultButtonStyles} />
      <ProgressIndicator
        label={percentComplete < 1 ? 'Loading photos' : 'Finished loading photos'}
        percentComplete={percentComplete}
      />
      {announced}
      <FocusZone>
        <Stack
          horizontal
          wrap
          tokens={photoStackTokens}
          styles={photoStackStyles}
          slots={{ inner: { component: 'ul' } }}
        >
          {photos.map((photo: IPhoto, index: number) => (
            <li
              key={index}
              className={photoCellClass}
              aria-posinset={index + 1}
              aria-setsize={PHOTO_COUNT}
              aria-label="Photo"
              data-is-focusable
            >
              {total > index ? <Image src={photo.url} width={photo.width} height={photo.height} /> : <div />}
            </li>
          ))}
        </Stack>
      </FocusZone>
    </Stack>
  );
};
