"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePicker = void 0;
var js_joda_1 = require("js-joda");
var React = require("react");
var calendar_1 = require("./calendar");
var month_selector_1 = require("./month-selector");
var year_selector_1 = require("./year-selector");
var datepicker_config_1 = require("./datepicker-config");
exports.DatePicker = function (p) {
    var config = datepicker_config_1.useDatePickerConfig();
    // state is here because prop might be null
    // picker does not display null value and does not care,
    // defaults to current day
    var _a = React.useState(p.value ? p.value : js_joda_1.LocalDate.now()), state = _a[0], setState = _a[1];
    React.useEffect(function () {
        setState(p.value ? p.value : js_joda_1.LocalDate.now());
    }, [p.value]);
    var handleClick = function (e) {
        e.stopPropagation();
    };
    var handleDayChange = function (x) {
        handleChange(x);
        if (config.closeAfterClick) {
            p.onClose();
        }
    };
    var handleChange = function (x) {
        return p.onChange(x);
    };
    var handleMouseDown = function (e) {
        e.stopPropagation();
        e.preventDefault();
    };
    return (React.createElement("div", { className: "datepicker", onMouseDown: handleMouseDown },
        React.createElement("div", { className: "datepicker__inner-container", onClick: handleClick, "data-testid": "datepicker" },
            React.createElement(year_selector_1.YearSelector, { value: state, onChange: handleChange }),
            React.createElement(month_selector_1.MonthSelector, { value: state, onChange: handleChange }),
            React.createElement(calendar_1.Calendar, { value: state, onChange: handleDayChange }))));
};
