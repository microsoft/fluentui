import { transformPlugin } from './transformPlugin';

export default function preset() {
  return {
    plugins: [[transformPlugin]],
  };
}
