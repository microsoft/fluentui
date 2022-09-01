import * as React from 'react';
import { Announced } from '@fluentui/react/lib/Announced';
import { createArray } from '@fluentui/react/lib/Utilities';
import { Image } from '@fluentui/react/lib/Image';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { Text } from '@fluentui/react/lib/Text';
import { Stack, IStackTokens, IStackStyles } from '@fluentui/react/lib/Stack';
import { DefaultButton, IButtonStyles } from '@fluentui/react/lib/Button';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import { mergeStyles } from '@fluentui/react/lib/Styling';
import { useBoolean, useSetInterval, useConst } from '@fluentui/react-hooks';

const PHOTO_COUNT = 40;

const stackTokens: IStackTokens = { childrenGap: 10 };
const photoStackTokens: IStackTokens = { childrenGap: '6 6' };

const defaultButtonStyles: Partial<IButtonStyles> = { root: { width: 150 } };

const photoStackStyles: Partial<IStackStyles> = {
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
  const [announcedMessage, setAnnouncedMessage] = React.useState<string | undefined>(undefined);
  const [loading, { toggle: toggleLoading }] = useBoolean(false);
  const percentComplete = total / PHOTO_COUNT;

  const { setInterval, clearInterval } = useSetInterval();

  const photos: IPhoto[] = useConst(() => {
    const width = 100;
    const height = 100;
    return createArray(PHOTO_COUNT, () => ({
      url: `https://fabricweb.azureedge.net/fabric-website/placeholders/${width}x${height}.png`,
      width,
      height,
    }));
  });

  React.useEffect(() => {
    if (loading) {
      setTotal(0);

      const itemIntervalId = setInterval(() => {
        setTotal((t: number) => {
          if (t < PHOTO_COUNT) {
            return t + 1;
          }
          clearInterval(itemIntervalId);
          clearInterval(announceIntervalId);
          toggleLoading();
          return t;
        });
      }, 500);

      const announceIntervalId = setInterval(() => {
        // Referring to total directly would cause the effect to dispose.
        // Instead pull the total value from the setter to apply to the announcement.
        setTotal((t: number) => {
          setAnnouncedMessage(`${t} of ${PHOTO_COUNT} photos loaded`);
          return t;
        });
      }, 4000);

      return () => {
        clearInterval(itemIntervalId);
        clearInterval(announceIntervalId);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearInterval, setInterval, loading]);

  return (
    <>
      <Stack tokens={stackTokens}>
        <Text>
          Turn on Narrator and press the button to start loading photos. The number of photos loaded will be announced
          every four seconds.
        </Text>
        <DefaultButton text={loading ? 'Cancel' : 'Load photos'} onClick={toggleLoading} styles={defaultButtonStyles} />
        <ProgressIndicator label={!loading ? 'Paused' : 'Loading photos'} percentComplete={percentComplete} />
        <FocusZone>
          <Stack
            horizontal
            wrap
            tokens={photoStackTokens}
            styles={photoStackStyles}
            slots={{ inner: { component: 'ul' } }}
          >
            {photos.slice(0, total).map((photo: IPhoto, index: number) => (
              <li
                key={index}
                className={photoCellClass}
                aria-posinset={index + 1}
                aria-setsize={PHOTO_COUNT}
                aria-label="Photo"
                data-is-focusable
              >
                <Image src={photo.url} width={photo.width} height={photo.height} />
              </li>
            ))}
          </Stack>
        </FocusZone>
      </Stack>
      {loading && <Announced message={announcedMessage} />}
    </>
  );
};
