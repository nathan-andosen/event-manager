"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function mix(derivedCtor, baseCtors, ignoreConstructor) {
    if (ignoreConstructor === void 0) { ignoreConstructor = true; }
    baseCtors.forEach(function (baseCtor) {
        Object.getOwnPropertyNames(baseCtor.prototype).forEach(function (name) {
            if (ignoreConstructor && name === 'constructor')
                return;
            Object.defineProperty(derivedCtor.prototype, name, Object.getOwnPropertyDescriptor(baseCtor.prototype, name));
        });
    });
}
function applyMixins(derivedCtor, baseCtors) {
    mix(derivedCtor, baseCtors, false);
}
exports.applyMixins = applyMixins;
function applyMixinsExcludeConstructor(derivedCtor, baseCtors) {
    mix(derivedCtor, baseCtors);
}
exports.applyMixinsExcludeConstructor = applyMixinsExcludeConstructor;
//# sourceMappingURL=mixin-utilities.js.map