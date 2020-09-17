"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePickerOverlay = void 0;
var React = require("react");
exports.DatePickerOverlay = function (p) {
    var handleAndPreventClickPropagation = function (e) {
        e.stopPropagation();
        p.onClick();
    };
    return (React.createElement("div", { className: "datepicker__overlay", onClick: handleAndPreventClickPropagation, "data-testid": "datepicker__overlay" }));
};
