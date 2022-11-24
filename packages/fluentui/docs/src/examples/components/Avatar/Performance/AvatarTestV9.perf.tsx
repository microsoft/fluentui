import * as React from 'react';
import { FluentProvider, Avatar as FluentAvatar, webLightTheme } from '@fluentui/react-components';

const getImages = (isFluentV9: boolean) => {
  const avatars = [];
  const names = [
    'Alpha',
    'Bravo',
    'Charlie',
    'Delta',
    'Echo',
    'Foxtrot',
    'Golf',
    'Hotel',
    'India',
    'Juliett',
    'Kilo',
    'Lima',
    'Mike',
    'November',
    'Oscar',
    'Papa',
    'Quebec',
    'Romeo',
    'Sierra',
    'Tango',
    'Uniform',
    'Victor',
    'Whiskey',
    'Xray',
    'Yankee',
    'Zulu',
  ];
  for (let index = 0; index < 306; index++) {
    const firstName = index / 25 > 0 ? index / 25 : index;
    const lastName = index % 25;
    const name = `${names[Math.floor(firstName)]} ${names[lastName]}`;
    const image = (
      <div
        style={{
          width: '64px',
          height: '64px',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        <FluentAvatar
          size={64}
          image={{
            src: `https://teams.microsoft.com/api/mt/part/dogfood/beta/users/defaultProfilePictureV2?displayName=${name}`,
          }}
        />
      </div>
    );
    avatars.push(image);
  }

  return <ul className="grid-wrapper">{avatars}</ul>;
};

const App = () => getImages(false);

export default App;
