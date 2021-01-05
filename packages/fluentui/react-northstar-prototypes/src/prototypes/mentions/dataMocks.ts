import * as _ from 'lodash';
import * as faker from 'faker';

export interface AtMentionItem {
  header: string;
  image: string;
  content: string;
}

export const atMentionItems: AtMentionItem[] = _.times(10, () => ({
  header: `${faker.name.firstName()} ${faker.name.lastName()}`,
  image: faker.random.arrayElement([
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/ade.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/chris.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/christian.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/daniel.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/elliot.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/helen.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/small/jenny.jpg',
  ]),
  content: faker.name.title(),
}));
