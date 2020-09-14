"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateInput = void 0;
var React = require("react");
var datepicker_1 = require("./datepicker");
var datepicker_config_1 = require("./datepicker-config");
require("./date-input.scss");
exports.DateInput = function (p) {
    var config = datepicker_config_1.useDatePickerConfig();
    var _a = React.useState(null), state = _a[0], setState = _a[1];
    var _b = React.useState(false), visible = _b[0], setVisible = _b[1];
    var formatedValue = state == null ? '' : state.format(config.valueFormatter);
    var handleFocus = function (e) {
        setVisible(true);
        if (p.onFocus) {
            p.onFocus(e);
        }
    };
    var handleBlur = function (e) {
        if (p.onBlur) {
            p.onBlur(e);
        }
    };
    var handleClose = function () {
        setVisible(false);
    };
    var handleChange = function (x) {
        p.onChange(x);
    };
    // prevent typing into input
    // TODO: allow typing
    var toVoid = function () { };
    React.useEffect(function () {
        setState(p.value);
    }, [p.value]);
    var classNames = [
        'datepicker-input',
        visible ? 'datepicker-active' : false,
        p.className ? p.className : false,
    ].filter(function (x) { return x; });
    return (React.createElement("div", { className: "datepicker-input__container" },
        React.createElement("input", { className: classNames.join(' '), type: "text", value: formatedValue, onFocus: handleFocus, onBlur: handleBlur, onChange: toVoid }),
        visible ? React.createElement(datepicker_1.DatePicker, { value: state, onChange: handleChange, onClose: handleClose }) : null));
};
