"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const godot_1 = require("godot");
const jsb_core_1 = require("./jsb/jsb.core");
const cyclic_import_1_1 = require("./tests/cyclic_import_1");
class TestNode extends godot_1.Button {
    get foo() { return this._v1; }
    set foo(value) { this._v1 = value; }
    constructor() {
        super();
        this._v1 = 0;
        this.hello = "hello";
        this.int_value = 0;
        console.log("test constructor");
    }
    _notification(what) {
        console.log("test _notification", what);
    }
    _ready() {
        console.log("test ready", this.hello);
        console.log("ready_node:", this.ready_node);
        this.test_wait_for_signal();
        // test cyclic imported modules
        cyclic_import_1_1.CyclicClass1.call1();
        const stub = new godot_1.Object();
        console.assert(jsb.is_instance_valid(stub));
        stub.free();
        // an `bad this` error will be thrown if you use it after `free` 
        // stub.do_something(); 
        console.assert(!jsb.is_instance_valid(stub));
    }
    test_wait_for_signal() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("waiting for test signal");
            let res = yield (0, jsb_core_1.$wait)(this.test_signal);
            console.log("done, test signal emitted", res);
        });
    }
    _on_pressed() {
        console.log("test on clicked!");
        // this.test_signal.connect(jsb.callable(this, this.on_test_signal), 0);
        // this.test_signal.emit();
        // this.test_signal.disconnect(jsb.callable(this, this.on_test_signal));
        this.test_signal.emit(123);
        // test godot object method with default arguments
        console.log("get_datetime_string_from_system(true)", godot_1.Time.get_datetime_string_from_system(true));
        console.log("get_datetime_string_from_system(true, true)", godot_1.Time.get_datetime_string_from_system(true, true));
        console.log("get_datetime_string_from_system(true, false)", godot_1.Time.get_datetime_string_from_system(true, false));
        // test variant static method with default arguments
        const basis = godot_1.Basis.looking_at(new godot_1.Vector3(1, 2, 0), godot_1.Vector3.UP);
        console.log("Basis.looking_at(new Vector3(1, 2, 0), Vector3.UP)", basis.x, basis.y, basis.y);
    }
    on_test_signal() {
        console.log("on test signal");
    }
    work() {
        console.log("test bark at the moon");
    }
    static unbound_call() {
    }
}
exports.default = TestNode;
__decorate([
    (0, jsb_core_1.onready_)("JSButtonChildNode")
], TestNode.prototype, "ready_node", void 0);
__decorate([
    (0, jsb_core_1.export_)(jsb.VariantType.TYPE_STRING)
], TestNode.prototype, "hello", void 0);
__decorate([
    (0, jsb_core_1.export_)(jsb.VariantType.TYPE_INT)
], TestNode.prototype, "int_value", void 0);
__decorate([
    (0, jsb_core_1.signal_)()
], TestNode.prototype, "test_signal", void 0);
//# sourceMappingURL=test_button.js.map