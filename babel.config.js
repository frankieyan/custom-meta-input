module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV === "development")

  const presets = [
    "@babel/preset-env",
    [
      "@babel/preset-react",
      { development: api.env('development') },
    ],
  ]

  return {
    presets,
  }
}
