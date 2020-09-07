"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatePicker = void 0;
var js_joda_1 = require("js-joda");
var React = require("react");
var calendar_view_1 = require("./calendar-view");
var month_selector_1 = require("./month-selector");
require("./datepicker.css");
var year_selector_1 = require("./year-selector");
var overlay_1 = require("./overlay");
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
        p.onChange(x);
        if (config.closeAfterClick) {
            p.onClose();
        }
    };
    return (React.createElement("div", { className: "datepicker__container" },
        React.createElement(overlay_1.DatePickerOverlay, { onClick: p.onClose }),
        React.createElement("div", { className: "datepicker__inner-container", onClick: handleClick },
            React.createElement(year_selector_1.YearSelector, { value: state, onChange: p.onChange }),
            React.createElement(month_selector_1.MonthSelector, { value: state, onChange: p.onChange }),
            React.createElement(calendar_view_1.Calendar, { value: state, onChange: handleDayChange }))));
};
