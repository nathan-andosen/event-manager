/**
 * Mix multiple classes together. Only methods are mixed / copied.
 *
 * @param {*} derivedCtor
 * @param {any[]} baseCtors
 * @param {boolean} [ignoreConstructor=true]
 */
function mix(derivedCtor: any, baseCtors: any[], ignoreConstructor = true) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
      if (ignoreConstructor && name === 'constructor') return;
      Object.defineProperty(derivedCtor.prototype, name,
      Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
    });
  });
}

/**
 * Mix multiple classes together. Only methods are mixed / copied.
 *
 * @export
 * @param {*} derivedCtor 
 * @param {any[]} baseCtors
 */
export function applyMixins(derivedCtor: any, baseCtors: any[]) {
  mix(derivedCtor, baseCtors, false);
}


/**
 * Mix multiple classes together. Only methods are mixed / copied excluding
 * the constructor
 *
 * @export
 * @param {*} derivedCtor
 * @param {any[]} baseCtors
 */
export function applyMixinsExcludeConstructor(derivedCtor: any,
baseCtors: any[]) {
  mix(derivedCtor, baseCtors);
}