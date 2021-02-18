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
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarlosSlattery.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CharlotteWaltson.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/CarolePoland.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/ColinBallinger.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/DaisyPhillips.jpg',
    'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/WandaHoward.jpg',
  ]),
  content: faker.name.title(),
}));
