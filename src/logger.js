module.exports = function logger (realm) {
  return {
    log: (...args) => log(realm, 'log', ...args),
    debug: (...args) => log(realm, 'debug', ...args)
  };
}

function log (realm, level, ...args) {
  console[level](`[${realm}][${level}]`, ...args);
}

