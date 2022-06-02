const findSelector = (selectors, name) => {
  return selectors.find(s => s.name === name)
}

module.exports = {
  findSelector
}
