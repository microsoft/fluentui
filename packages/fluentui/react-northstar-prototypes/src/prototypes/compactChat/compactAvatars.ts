import { SizeValue } from '@fluentui/react-northstar';

export const [robinAvatar, timAvatar] = [
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/RobinCounts.jpg',
  'https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/TimDeboer.jpg',
].map(src => ({
  image: src,
  status: { color: '#6bb700', size: 'smallest' as SizeValue },
  size: 'smallest' as SizeValue,
}));
