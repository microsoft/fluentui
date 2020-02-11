const createReferenceFromContextClick = (nativeEvent: MouseEvent) => {
  const left = nativeEvent.clientX
  const top = nativeEvent.clientY
  const right = left + 1
  const bottom = top + 1

  function getBoundingClientRect() {
    return {
      left,
      top,
      right,
      bottom,
    }
  }

  return {
    getBoundingClientRect,
    clientWidth: 1,
    clientHeight: 1,
  }
}

export default createReferenceFromContextClick
