"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useDatePickerConfig = exports.datePickerConfig = exports.defaultDatePickerConfig = exports.defaultFormatter = void 0;
var js_joda_1 = require("js-joda");
var React = require("react");
exports.defaultFormatter = js_joda_1.DateTimeFormatter.ofPattern('d.M.yyyy');
exports.defaultDatePickerConfig = {
    valueFormatter: exports.defaultFormatter,
    formatWeekday: function (x) {
        var days = [
            'Ma',
            'Ti',
            'Ke',
            'To',
            'Pe',
            'La',
            'Su',
        ];
        return days[x - 1] || '';
    },
    formatMonth: function (x) { return x.monthValue(); },
    formatYear: function (x) { return x.year(); },
    formatDay: function (x) { return x.dayOfMonth(); },
    monthSelectPrevBtnLabel: function () { return '<'; },
    monthSelectNextBtnLabel: function () { return '>'; },
    yearSelectPrevBtnLabel: function () { return '<'; },
    yearSelectNextBtnLabel: function () { return '>'; },
    closeAfterClick: true,
};
exports.datePickerConfig = React.createContext(exports.defaultDatePickerConfig);
exports.useDatePickerConfig = function () {
    var ctx = React.useContext(exports.datePickerConfig);
    return __assign(__assign({}, exports.defaultDatePickerConfig), ctx);
};
