"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var src_1 = require("../../src");
describe('Event Manager', function () {
    describe('emit()', function () {
        it('should emit event', function (done) {
            var cnt = 0;
            var Hub = (function (_super) {
                __extends(Hub, _super);
                function Hub() {
                    return _super !== null && _super.apply(this, arguments) || this;
                }
                return Hub;
            }(src_1.EventManager));
            var hub = new Hub();
            hub.on('event-a', function (data, next) {
                cnt++;
                expect(cnt).toEqual(1);
                expect(data.a).toEqual('a');
                done();
            });
            hub.emit('event-a', { a: 'a' });
        });
        it('should emit event and fire completed', function () {
        });
        it('should not emit event with no listeners', function () {
        });
    });
    it('should fucking work', function () {
        expect(true).toEqual(true);
    });
});
//# sourceMappingURL=event-manager.spec.js.map