export function getHTMLAttributes<T extends object>(props: T, allV8PropsSet: Set<string>): T {
  const v8Props: T = { ...props };
  const propsKeys: string[] = Object.keys(v8Props);
  propsKeys.forEach(key => {
    if (allV8PropsSet.has(key)) {
      delete v8Props[key as keyof typeof v8Props];
    }
  });
  return v8Props;
}
