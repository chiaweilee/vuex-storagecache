const set = (name, data, useSession) => (useSession ? sessionStorage : localStorage).setItem(name, JSON.stringify(data))
const get = (name, useSession) => {
  try {
    return JSON.parse((useSession ? sessionStorage : localStorage).getItem(name)) || {}
  } catch (err) {
    console.error(err)
    return {}
  }
}

export default option => store => {
  // initialized
  const xName = option.name || 'x_stateCache'
  const { cacheState, sessionState } = option
  const { state, _vm } = store
  const { $set } = _vm
  const stateCache = get(xName)
  const sessionCache = get(xName, true)
  // fn
  const climb = (cacheName, writeValue, useSession) => {
    let value = state
    cacheName = cacheName.split('.')
    const lastIndex = cacheName.length - 1
    cacheName.forEach((name, index) => {
      if (writeValue && lastIndex === index) {
        const cache = useSession ? sessionCache : stateCache
        if (!!cache.name && Object.keys(cache.name).length) {
          console.log(value)
          console.log(name)
          console.log(cache.name)
          $set(value, name, cache.name)
        }
        return
      }
      value = value[name]
    })
    return value
  }
  const watch = (cacheName, useSession) => {
    store.watch(
      store => climb(cacheName),
      to => {
        const cache = get(xName, !!useSession)
        cache[cacheName] = to
        set(xName, cache, !!useSession)
      },
      {
        deep: true
      }
    )
  }
  // check
  if (!(cacheState instanceof Array)) {
    console.warn('cacheState should be an Array.')
    return
  }
  //
  cacheState.forEach(cacheName => {
    climb(cacheName, true)
    watch(cacheName)
  })
  sessionState.forEach(cacheName => {
    climb(cacheName, true, true)
    watch(cacheName, true)
  })
}
