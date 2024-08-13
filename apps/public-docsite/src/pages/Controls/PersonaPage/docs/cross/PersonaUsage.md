### Persona in various sizes

<img src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002-cdn-prod_20200511.001/fabric-website/images/controls/cross/Persona/Persona_ramp.PNG"/>

#### Example usage (from [PersonaCoinTest.tsx](https://github.com/microsoft/fluentui-react-native/tree/master/apps/fluent-tester/src/FluentTester/TestComponents/PersonaCoin))

```
import * as React from 'react';
import { PersonaCoin, Persona } from '@fluentui/react-native';
import { View } from 'react-native';

const satyaPhotoUrl = 'https://www.microsoft.com/en-us/CMSImages/satya.jpg?version=0881eb71-4942-b627-d602-84c832b8a0b6&amp;CollectionId=1b46ce2d-c90d-421e-94f1-cfb6bc6ef6ec';

const App = () => {
  return (
    <View>
      <PersonaCoin
        size='size24'
        initials="SN"
        imageDescription="Photo of Satya Nadella"
        presence='online'
        imageUrl={satyaPhotoUrl}
        coinColor='blue'
      />
      <Persona
          text="John Vanderbloom"
          size="size48"
          secondaryText="Software Engineer"
          imageUrl={satyaPhotoUrl}
          presence="busy"
      />
    </View>
  );
};

export default App;

```
