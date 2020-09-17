"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WithDatepicker = void 0;
var React = require("react");
var O = require("fp-ts/lib/Option");
var js_joda_1 = require("js-joda");
var datepicker_1 = require("./datepicker");
var datepicker_config_1 = require("./datepicker-config");
var pipeable_1 = require("fp-ts/lib/pipeable");
var parseValue = function (formatter) { return function (x) {
    return pipeable_1.pipe(x, O.fromNullable, O.chain(function (v) {
        try {
            var value = js_joda_1.LocalDate.parse(v, formatter);
            return O.some(value);
        }
        catch (e) {
            return O.none;
        }
    }));
}; };
var getFormattedValue = function (x, formatter) { return pipeable_1.pipe(x, O.fromNullable, O.map(function (v) { return v.format(formatter); }), O.getOrElse(function () { return ''; })); };
exports.WithDatepicker = function (p) {
    var cfg = datepicker_config_1.useDatePickerConfig();
    var _a = React.useState(getFormattedValue(p.value, cfg.valueFormatter)), inputValue = _a[0], setInputValue = _a[1];
    var _b = React.useState(false), focused = _b[0], setFocused = _b[1];
    var handleInputChange = function (e) {
        return setInputValue(e.target.value);
    };
    var handleInputBlur = function () {
        var displayValue = pipeable_1.pipe(inputValue, parseValue(cfg.valueFormatter), O.getOrElse(function () { return p.value; }));
        p.onChange(displayValue);
        setInputValue(getFormattedValue(displayValue, cfg.valueFormatter));
    };
    var handleInputFocus = function () { return setFocused(true); };
    var handleDatepickerClose = function () { return setFocused(false); };
    React.useEffect(function () {
        setInputValue(getFormattedValue(p.value, cfg.valueFormatter));
    }, [p.value, cfg.valueFormatter]);
    var inputProps = {
        value: inputValue,
        onBlur: handleInputBlur,
        onFocus: handleInputFocus,
        onChange: handleInputChange
    };
    return (React.createElement(React.Fragment, null,
        p.children(inputProps),
        focused ? React.createElement(datepicker_1.DatePicker, { value: p.value, onChange: p.onChange, onClose: handleDatepickerClose }) : null));
};
