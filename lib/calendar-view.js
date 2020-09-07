"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Calendar = void 0;
var js_joda_1 = require("js-joda");
var React = require("react");
var O = require("fp-ts/lib/Option");
var calendar_1 = require("./calendar");
require("./calendar-view.css");
var pipeable_1 = require("fp-ts/lib/pipeable");
var datepicker_config_1 = require("./datepicker-config");
var formatDate = function (maybeDate) {
    return O.isSome(maybeDate) ? "" + maybeDate.value.dayOfMonth() : '';
};
var isEqual = function (d1, d2) { return pipeable_1.pipe(d1, O.map(function (x) { return x.equals(d2); }), O.getOrElse(function () { return false; })); };
exports.Calendar = function (p) {
    var cfg = datepicker_config_1.useDatePickerConfig();
    var viewModel = calendar_1.getCalendar(js_joda_1.YearMonth.of(p.value.year(), p.value.month()));
    var weekdayTitles = [1, 2, 3, 4, 5, 6, 7];
    var handleClick = function (x) { return function () {
        if (O.isSome(x)) {
            p.onChange(x.value);
        }
    }; };
    return (React.createElement("table", { className: "calendar__container" },
        React.createElement("thead", null,
            React.createElement("tr", { className: "calendar__days", "data-test-id": "calendar__days" }, weekdayTitles.map(function (x) { return (React.createElement("th", { className: "calendar__days__title", key: x, "data-test-id": "calendar__days__title--" + cfg.formatWeekday(x) }, cfg.formatWeekday(x))); }))),
        React.createElement("tbody", { "data-test-id": "calendar__body" }, viewModel.map(function (week, weekIndex) { return (React.createElement("tr", { className: "calendar__week", key: weekIndex, "data-test-id": "calendar__week" }, week.map(function (maybeDate, dayIndex) { return (React.createElement("td", { className: "calendar__day" + (isEqual(maybeDate, p.value) ? ' calendar__day--selected' : ''), key: dayIndex, onClick: handleClick(maybeDate), "data-test-id": "calendar__day--" + formatDate(maybeDate) }, formatDate(maybeDate))); }))); }))));
};
