'use strict';

const introEl = document.getElementById('intro');
const searchEl = document.getElementById('search');
const highlightEl = document.getElementById('highlight');
const tooltipEl = document.getElementById('tooltip');
const frameworkEl = document.getElementById('framework');
const systemEl = document.getElementById('system');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let names, levels, numTicks;

/* BIN_PLACEHOLDER */

let rangeMin = 0;
let rangeMax = 1;
let topLevel = 0;
let query = '';
let showFramework = false;
let showSystem = false;
let graphWidth, pxPerTick;

const pxPerLevel = 18;
const collapseThreshold = 1;
const hideThreshold = 0.5;
const labelThreshold = 20;

let numTopLevelTicks = numTicks;

highlightEl.style.height = pxPerLevel + 'px';

if (levels) {
  init();
}

function init() {
  document.body.classList.add('loaded');

  // delta-decode bar positions
  for (const level of levels) {
    let prev = 0;
    for (let i = 0; i < level.length; i += 3) {
      level[i] += prev;
      prev = level[i] + level[i + 1];
    }
  }

  updateFromHash();
  render();
}

window.onhashchange = () => {
  updateFromHash();
  render();
};
canvas.onclick = e => {
  const { i, j } = xyToBar(e.offsetX, e.offsetY);
  if (j === -1) return;
  window.location.hash = [i, j].join(',');
  removeHover();
};
document.getElementById('reset').onclick = () => {
  searchEl.value = query = '';
  window.location.hash = '';
  render();
};
window.onresize = render;

searchEl.oninput = e => {
  query = e.target.value;
  render();
};

frameworkEl.onchange = e => {
  showFramework = frameworkEl.checked;
  render();
};

systemEl.onchange = e => {
  showSystem = systemEl.checked;
  render();
};

function updateFromHash() {
  const [i, j] = window.location.hash
    .substr(1)
    .split(',')
    .map(Number);

  if (!isNaN(i) && !isNaN(j)) {
    topLevel = i;
    numTopLevelTicks = levels[i][j + 1];
    rangeMin = levels[i][j] / numTicks;
    rangeMax = (levels[i][j] + levels[i][j + 1]) / numTicks;
  } else {
    topLevel = 0;
    numTopLevelTicks = numTicks;
    rangeMin = 0;
    rangeMax = 1;
  }
}

function tickToX(i) {
  return (i - numTicks * rangeMin) * pxPerTick;
}

function render() {
  if (!levels) return;

  graphWidth = canvas.width = canvas.clientWidth;
  canvas.height = pxPerLevel * (levels.length - topLevel);
  canvas.style.height = canvas.height + 'px';

  if (devicePixelRatio > 1) {
    canvas.width *= 2;
    canvas.height *= 2;
    ctx.scale(2, 2);
  }

  pxPerTick = graphWidth / numTicks / (rangeMax - rangeMin);

  ctx.textBaseline = 'middle';
  ctx.font = '10px Tahoma, sans-serif';
  ctx.strokeStyle = 'white';

  for (let i = 0; i < levels.length - topLevel; i++) {
    const level = levels[topLevel + i];

    for (let j = 0; j < level.length; j += 3) {
      const barIndex = level[j];
      const x = tickToX(barIndex);
      const y = i * pxPerLevel;
      let numBarTicks = level[j + 1];

      const inQuery = (query && names[level[j + 2]].indexOf(query) >= 0) || false;

      // merge very small blocks into big "collapsed" ones for performance
      // const collapsed = numBarTicks * pxPerTick <= collapseThreshold;
      const collapsed = (!showFramework && isFrameworkName(names[level[j + 2]])) || (!showSystem && isSystemName(names[level[j + 2]]));
      if (collapsed) {
        while (
          j < level.length - 3 &&
          barIndex + numBarTicks === level[j + 3] &&
          level[j + 4] * pxPerTick <= collapseThreshold &&
          inQuery === ((query && names[level[j + 5]].indexOf(query) >= 0) || false)
        ) {
          j += 3;
          numBarTicks += level[j + 1];
        }
      }

      const sw = numBarTicks * pxPerTick - (collapsed ? 0 : 0.5);
      const sh = pxPerLevel - 0.5;

      if (x < -1 || x + sw > graphWidth + 1 || sw < hideThreshold) continue;

      ctx.beginPath();
      ctx.rect(x, y, sw, sh);

      const ratio = numBarTicks / numTopLevelTicks;

      if (!collapsed) {
        ctx.stroke();
        const intensity = Math.min(1, (ratio * Math.pow(1.16, i)) / (rangeMax - rangeMin));
        const h = 50 - 50 * intensity;
        const l = 65 + 7 * intensity;
        ctx.fillStyle = inQuery ? 'lightgreen' : `hsl(${h}, 100%, ${l}%)`;
      } else {
        ctx.fillStyle = inQuery ? 'lightgreen' : '#eee';
      }
      ctx.fill();

      if (!collapsed && sw >= labelThreshold) {
        const percent = Math.round(10000 * ratio) / 100;
        const name = `${names[level[j + 2]]} (${percent}%, ${numBarTicks} samples)`;

        ctx.save();
        ctx.clip();
        ctx.fillStyle = 'black';
        ctx.fillText(name, Math.max(x, 0) + 1, y + sh / 2);
        ctx.restore();
      }
    }
  }
}

// pixel coordinates to bar coordinates in the levels array
function xyToBar(x, y) {
  const i = Math.floor(y / pxPerLevel) + topLevel;
  const j = binarySearchLevel(x, levels[i]);
  return { i, j };
}

// binary search of a block in a stack level
function binarySearchLevel(x, level) {
  let i = 0;
  let j = level.length - 3;
  while (i <= j) {
    const m = 3 * ((i / 3 + j / 3) >> 1);
    const x0 = tickToX(level[m]);
    const x1 = tickToX(level[m] + level[m + 1]);
    if (x0 <= x && x1 >= x) {
      return x1 - x0 > collapseThreshold ? m : -1;
    }
    if (x0 > x) {
      j = m - 3;
    } else {
      i = m + 3;
    }
  }
  return -1;
}

if (window.orientation === undefined) {
  canvas.onmousemove = addHover;
  canvas.onmouseout = window.onscroll = removeHover;
}

function removeHover() {
  canvas.style.cursor = '';
  highlightEl.style.display = 'none';
  tooltipEl.style.display = 'none';
}

function addHover(e) {
  const { i, j } = xyToBar(e.offsetX, e.offsetY);

  if (j === -1 || e.offsetX < 0 || e.offsetX > graphWidth) {
    removeHover();
    return;
  }

  canvas.style.cursor = 'pointer';

  const level = levels[i];
  const x = tickToX(level[j]);
  const y = (i - topLevel) * pxPerLevel;
  const sw = tickToX(level[j] + level[j + 1]) - x;

  highlightEl.style.display = 'block';
  highlightEl.style.left = x + 'px';
  highlightEl.style.top = canvas.offsetTop + y + 'px';
  highlightEl.style.width = sw + 'px';

  const numBarTicks = level[j + 1];
  const percent = Math.round((10000 * numBarTicks) / numTopLevelTicks) / 100;
  const time = `<span class="time">(${percent}%, ${numBarTicks} samples)</span>`;
  let content = names[level[j + 2]];
  if (content[0] !== '(') content = content.replace(' ', ` ${time}<br><span class="path">`) + '</span>';
  else content += ` ${time}`;

  tooltipEl.innerHTML = content;
  tooltipEl.style.display = 'block';
  tooltipEl.style.left = Math.min(e.offsetX + 15 + tooltipEl.clientWidth, graphWidth) - tooltipEl.clientWidth + 'px';
  tooltipEl.style.top = canvas.offsetTop + e.offsetY + 12 + 'px';
}

// (function frame() { if (levels) render(); requestAnimationFrame(frame); })();

/* BIN_SPLIT */
/* global mergeStacks, v8logToStacks */
const body = document.body;

body.ondragover = () => {
  body.classList.add('hover');
  return false;
};
body.ondragleave = () => {
  body.classList.remove('hover');
};
body.ondrop = e => {
  body.classList.remove('hover');

  canvas.height = 0;

  introEl.innerHTML = 'Loading...';

  console.time('Loading');

  const reader = new FileReader();
  reader.onload = function(event) {
    console.timeEnd('Loading');

    console.time('Parsing JSON');
    const json = JSON.parse(event.target.result);
    console.timeEnd('Parsing JSON');

    console.time('Processing stacks');
    const result = v8logToStacks(json);
    names = result.names;
    numTicks = result.stacks.length;
    levels = mergeStacks(result.stacks);
    console.timeEnd('Processing stacks');

    init();
  };
  reader.readAsText(e.dataTransfer.files[0]);

  e.preventDefault();
  return false;
};
/* BIN_SPLIT */
