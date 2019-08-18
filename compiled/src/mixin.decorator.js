"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function Mixin(classes, ignoreConstructor) {
    if (ignoreConstructor === void 0) { ignoreConstructor = true; }
    return function (target) {
        classes.forEach(function (clas) {
            Object.getOwnPropertyNames(clas.prototype).forEach(function (name) {
                if (ignoreConstructor && name === 'constructor')
                    return;
                var propDesc = Object.getOwnPropertyDescriptor(clas.prototype, name);
                Object.defineProperty(target.prototype, name, propDesc);
            });
        });
    };
}
exports.Mixin = Mixin;
;
//# sourceMappingURL=mixin.decorator.js.map