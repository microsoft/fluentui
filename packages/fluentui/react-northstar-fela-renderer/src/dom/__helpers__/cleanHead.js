/* eslint-disable */
export default function cleanHead() {
  const { head } = document;
  while (head.firstChild) {
    head.removeChild(head.firstChild);
  }
}
