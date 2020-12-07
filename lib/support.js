"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCalendar = void 0;
var O = require("fp-ts/lib/Option");
var js_joda_1 = require("js-joda");
var createWeek = function () { return Array(7)
    .fill(false)
    .map(function () { return O.none; }); };
exports.getCalendar = function (month) {
    var r = [createWeek()];
    var days = month.lengthOfMonth();
    Array(days)
        .fill(false)
        .map(function (_, index) { return js_joda_1.LocalDate.of(month.year(), month.month(), index + 1); })
        .forEach(function (x) {
        var d = x.dayOfWeek().value();
        if (O.isSome(r[r.length - 1][6])) {
            r.push(createWeek());
        }
        r[r.length - 1][d - 1] = O.some(x);
    });
    return r;
};
