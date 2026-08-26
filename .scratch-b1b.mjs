import fs from 'node:fs';
const edits = [
 ["Input/Input.module.css", /border-b-2 border-b-compound-brand-stroke/g, "border-b-(length:--spacing-thick) border-b-compound-brand-stroke", 1],
 ["SpinButton/SpinButton.module.css", /border-b-2 border-b-compound-brand-stroke/g, "border-b-(length:--spacing-thick) border-b-compound-brand-stroke", 1],
 ["Input/Input.module.css", /height: max\(calc\(var\(--spacing\) \* 2\), var\(--radius-medium\)\);/g, "height: max(var(--spacing-thick), var(--radius-medium));", 1],
 ["SpinButton/SpinButton.module.css", /height: max\(calc\(var\(--spacing\) \* 2\), var\(--radius-medium\)\);/g, "height: max(var(--spacing-thick), var(--radius-medium));", 1],
 ["Input/Input.module.css", /clip-path: inset\(calc\(100% - var\(--spacing\) \* 2\) 0 0 0\);/g, "clip-path: inset(calc(100% - var(--spacing-thick)) 0 0 0);", 1],
 ["SpinButton/SpinButton.module.css", /clip-path: inset\(calc\(100% - var\(--spacing\) \* 2\) 0 0 0\);/g, "clip-path: inset(calc(100% - var(--spacing-thick)) 0 0 0);", 1],
 ["Card/Card.module.css", /--fui-focus-outline-offset: -2px;/g, "--fui-focus-outline-offset: calc(var(--stroke-width-thick) * -1);", 2],
];
let fail = 0;
for (const [p, re, newS, expect] of edits) {
  const s = fs.readFileSync(p, 'utf8');
  const n = (s.match(re) || []).length;
  if (n !== expect) { console.log(`!! ${p} : ${n} matches (expected ${expect}) for ${re}`); fail = 1; continue; }
  fs.writeFileSync(p, s.replace(re, newS));
  console.log(`ok  ${p}  x${n}  ${re.source.slice(0,50)}`);
}
process.exit(fail);
