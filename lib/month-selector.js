"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MonthSelector = void 0;
var React = require("react");
var datepicker_config_1 = require("./datepicker-config");
require("./month-selector.scss");
exports.MonthSelector = function (p) {
    var cfg = datepicker_config_1.useDatePickerConfig();
    var handleChange = function (value) { return function () { return p.onChange(p.value.plusMonths(value)); }; };
    return (React.createElement("div", { className: "calendar__monthselector__container" },
        React.createElement("button", { className: "calendar__monthselector__control--prev", onClick: handleChange(-1), "data-test-id": "monthselector__control--prev" }, cfg.monthSelectPrevBtnLabel(p.value)),
        React.createElement("div", { className: "calendar__monthselector__display", "data-test-id": "monthselector__display" }, cfg.formatMonth(p.value)),
        React.createElement("button", { className: "calendar__monthselector__control--next", onClick: handleChange(1), "data-test-id": "monthselector__control--next" }, cfg.monthSelectNextBtnLabel(p.value))));
};
