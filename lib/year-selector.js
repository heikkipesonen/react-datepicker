"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YearSelector = void 0;
var React = require("react");
var datepicker_config_1 = require("./datepicker-config");
exports.YearSelector = function (p) {
    var cfg = datepicker_config_1.useDatePickerConfig();
    var handleChange = function (value) { return function () { return p.onChange(p.value.plusYears(value)); }; };
    return (React.createElement("div", { className: "datepicker__yearselector__container" },
        React.createElement("button", { className: "datepicker__yearselector__control datepicker__yearselector__control--prev", onClick: handleChange(-1), "data-testid": "yearselector__control--prev" }, cfg.yearSelectPrevBtnLabel(p.value)),
        React.createElement("div", { className: "datepicker__yearselector__display", "data-testid": "datepicker__yearselector__display" }, cfg.formatYear(p.value)),
        React.createElement("button", { className: "datepicker__yearselector__control datepicker__yearselector__control--next", onClick: handleChange(1), "data-testid": "yearselector__control--next" }, cfg.yearSelectNextBtnLabel(p.value))));
};
