export function relativeDates(thenDate: Date, nowDate: Date): string {
  const milliSeconds = nowDate.getTime() - thenDate.getTime();
  const hours = Math.floor(milliSeconds / (1000 * 60 * 60)) % 24;
  const days = Math.floor(milliSeconds / (1000 * 60 * 60 * 24));
  let openedOn = '';

  if (days < 1 && hours <= 1) {
    openedOn = '1 hour ago';
  } else if (days < 1) {
    openedOn = hours + ' hours ago';
  } else if (days === 1) {
    openedOn = '1 day ago';
  } else if (days <= 30) {
    openedOn = days + ' days ago';
  } else {
    openedOn = 'on ' + thenDate.toString().substring(4, 10);
  }
  return openedOn;
}
