#### Example usage (from [PersonaCoinTest.tsx](https://github.com/microsoft/fluentui-react-native/tree/master/apps/fluent-tester/src/RNTester/TestComponents/PersonaCoin))

```
import * as React from 'react';
import { PersonaCoin } from '@fluentui/react-native';
import { View } from 'react-native';
import { satyaPhotoUrl } from './styles';
import { commonTestStyles as commonStyles } from '../Common/styles';

const satyaPhotoUrl = 'https://www.microsoft.com/en-us/CMSImages/satya.jpg?version=0881eb71-4942-b627-d602-84c832b8a0b6&amp;CollectionId=1b46ce2d-c90d-421e-94f1-cfb6bc6ef6ec';

export const StandardUsage: React.FunctionComponent<{}> = () => {
  return (
    <View style={commonStyles.root}>

      <PersonaCoin
        size='size24'
        initials="SN"
        imageDescription="Photo of Satya Nadella"
        presence='online'
        imageUrl={satyaPhotoUrl}
        coinColor='blue'
      />
    </View>
  );
};
```
