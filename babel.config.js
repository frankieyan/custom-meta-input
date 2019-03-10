module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV === "development")

  const presets = [
    [
      "@babel/preset-env",
      api.env('test')
        ? {
          targets: {
            node: 'current',
          },
        }
        : {},
    ],
    [
      "@babel/preset-react",
      { development: api.env('development') },
    ],
  ]

  return {
    presets,
  }
}
