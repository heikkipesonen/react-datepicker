"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePickerOverlay = void 0;
var React = require("react");
require("./overlay.css");
exports.DatePickerOverlay = function (p) {
    var handleAndPreventClickPropagation = function (e) {
        e.stopPropagation();
        p.onClick();
    };
    return (React.createElement("div", { className: "datepicker__overlay", onClick: handleAndPreventClickPropagation, "data-test-id": "datepicker__overlay" }));
};
