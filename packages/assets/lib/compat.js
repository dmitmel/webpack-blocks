module.exports = {
  synthesizeMatch
}

function synthesizeMatch (fileType, options) {
  const match = {}

  if (fileType) {
    match.test = fileType
  }
  if (options) {
    if (options.exclude) {
      match.exclude = options.exclude
    }
    if (options.include) {
      match.include = options.include
    }
  }

  return match
}
