import './define.js';

const itemRenderer = () => {
  const image = document.createElement('fluent-image');
  const img = document.createElement('img');
  img.setAttribute('src', 'https://picsum.photos/300/100');
  img.setAttribute('alt', 'Placeholder image');
  image.appendChild(img);
  return image;
};

export default itemRenderer;
export { tests } from '../utils/benchmark-wrapper.js';
