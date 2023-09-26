"use strict";
!(function (t) {
    var e;
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define([], t)
        : ("undefined" != typeof window ? (e = window) : "undefined" != typeof global ? (e = global) : "undefined" != typeof self && (e = self), (e.Promise = t()));
})(function () {
    return (function r(o, i, s) {
        function a(n, t) {
            if (!i[n]) {
                if (!o[n]) {
                    var e = "function" == typeof _dereq_ && _dereq_;
                    if (!t && e) return e(n, !0);
                    if (c) return c(n, !0);
                    t = new Error("Cannot find module '" + n + "'");
                    throw ((t.code = "MODULE_NOT_FOUND"), t);
                }
                e = i[n] = { exports: {} };
                o[n][0].call(
                    e.exports,
                    function (t) {
                        var e = o[n][1][t];
                        return a(e || t);
                    },
                    e,
                    e.exports,
                    r,
                    o,
                    i,
                    s
                );
            }
            return i[n].exports;
        }
        for (var c = "function" == typeof _dereq_ && _dereq_, t = 0; t < s.length; t++) a(s[t]);
        return a;
    })(
        {
            1: [
                function (t, e, n) {
                    e.exports = function (t) {
                        function e(t) {
                            var t = new n(t),
                                e = t.promise();
                            return t.setHowMany(1), t.setUnwrap(), t.init(), e;
                        }
                        var n = t._SomePromiseArray;
                        (t.any = e),
                            (t.prototype.any = function () {
                                return e(this);
                            });
                    };
                },
                {},
            ],
            2: [
                function (t, e, n) {
                    function r() {
                        (this._customScheduler = !1), (this._isTickUsed = !1), (this._lateQueue = new a(16)), (this._normalQueue = new a(16)), (this._haveDrainedQueues = !1);
                        var t = this;
                        (this.drainQueues = function () {
                            t._drainQueues();
                        }),
                            (this._schedule = s);
                    }
                    function o(t) {
                        for (; 0 < t.length(); ) {
                            e = void 0;
                            n = void 0;
                            r = void 0;
                            var e = t;
                            var n = e.shift();
                            {
                                var r;
                                "function" != typeof n ? n._settlePromises() : ((r = e.shift()), (e = e.shift()), n.call(r, e));
                            }
                        }
                    }
                    var i;
                    try {
                        throw new Error();
                    } catch (t) {
                        i = t;
                    }
                    var s = t("./schedule"),
                        a = t("./queue");
                    (r.prototype.setScheduler = function (t) {
                        var e = this._schedule;
                        return (this._schedule = t), (this._customScheduler = !0), e;
                    }),
                        (r.prototype.hasCustomScheduler = function () {
                            return this._customScheduler;
                        }),
                        (r.prototype.haveItemsQueued = function () {
                            return this._isTickUsed || this._haveDrainedQueues;
                        }),
                        (r.prototype.fatalError = function (t, e) {
                            e ? (process.stderr.write("Fatal " + (t instanceof Error ? t.stack : t) + "\n"), process.exit(2)) : this.throwLater(t);
                        }),
                        (r.prototype.throwLater = function (t, e) {
                            if (
                                (1 === arguments.length &&
                                    ((e = t),
                                    (t = function () {
                                        throw e;
                                    })),
                                "undefined" != typeof setTimeout)
                            )
                                setTimeout(function () {
                                    t(e);
                                }, 0);
                            else
                                try {
                                    this._schedule(function () {
                                        t(e);
                                    });
                                } catch (t) {
                                    throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
                                }
                        }),
                        (r.prototype.invokeLater = function (t, e, n) {
                            this._lateQueue.push(t, e, n), this._queueTick();
                        }),
                        (r.prototype.invoke = function (t, e, n) {
                            this._normalQueue.push(t, e, n), this._queueTick();
                        }),
                        (r.prototype.settlePromises = function (t) {
                            this._normalQueue._pushOne(t), this._queueTick();
                        }),
                        (r.prototype._drainQueues = function () {
                            o(this._normalQueue), this._reset(), (this._haveDrainedQueues = !0), o(this._lateQueue);
                        }),
                        (r.prototype._queueTick = function () {
                            this._isTickUsed || ((this._isTickUsed = !0), this._schedule(this.drainQueues));
                        }),
                        (r.prototype._reset = function () {
                            this._isTickUsed = !1;
                        }),
                        (e.exports = r),
                        (e.exports.firstLineError = i);
                },
                { "./queue": 26, "./schedule": 29 },
            ],
            3: [
                function (t, e, n) {
                    e.exports = function (o, i, s, a) {
                        function n(t, e) {
                            this._reject(e);
                        }
                        function c(t, e) {
                            (e.promiseRejectionQueued = !0), e.bindingPromise._then(n, n, null, this, t);
                        }
                        function l(t, e) {
                            0 == (50397184 & this._bitField) && this._resolveCallback(e.target);
                        }
                        function u(t, e) {
                            e.promiseRejectionQueued || this._reject(t);
                        }
                        var p = !1;
                        (o.prototype.bind = function (t) {
                            p || ((p = !0), (o.prototype._propagateFrom = a.propagateFromFunction()), (o.prototype._boundValue = a.boundValueFunction()));
                            var e,
                                t = s(t),
                                n = new o(i),
                                r = (n._propagateFrom(this, 1), this._target());
                            return (
                                n._setBoundTo(t),
                                t instanceof o ? (r._then(i, c, void 0, n, (e = { promiseRejectionQueued: !1, promise: n, target: r, bindingPromise: t })), t._then(l, u, void 0, n, e), n._setOnCancel(t)) : n._resolveCallback(r),
                                n
                            );
                        }),
                            (o.prototype._setBoundTo = function (t) {
                                void 0 !== t ? ((this._bitField = 2097152 | this._bitField), (this._boundTo = t)) : (this._bitField = -2097153 & this._bitField);
                            }),
                            (o.prototype._isBound = function () {
                                return 2097152 == (2097152 & this._bitField);
                            }),
                            (o.bind = function (t, e) {
                                return o.resolve(e).bind(t);
                            });
                    };
                },
                {},
            ],
            4: [
                function (t, e, n) {
                    "undefined" != typeof Promise && (r = Promise);
                    var r,
                        o = t("./promise")();
                    (o.noConflict = function () {
                        try {
                            Promise === o && (Promise = r);
                        } catch (t) {}
                        return o;
                    }),
                        (e.exports = o);
                },
                { "./promise": 22 },
            ],
            5: [
                function (t, e, n) {
                    var r,
                        o = Object.create;
                    o && ((r = o(null)), (o = o(null)), (r[" size"] = o[" size"] = 0)),
                        (e.exports = function (r) {
                            function n(t) {
                                return (function (t, e) {
                                    var n;
                                    if ("function" != typeof (n = null != t ? t[e] : n)) throw ((t = "Object " + s.classString(t) + " has no method '" + s.toString(e) + "'"), new r.TypeError(t));
                                    return n;
                                })(t, this.pop()).apply(t, this);
                            }
                            function o(t) {
                                return t[this];
                            }
                            function i(t) {
                                var e = +this;
                                return t[(e = e < 0 ? Math.max(0, e + t.length) : e)];
                            }
                            var s = t("./util"),
                                a = s.canEvaluate;
                            s.isIdentifier,
                                (r.prototype.call = function (t) {
                                    var e = [].slice.call(arguments, 1);
                                    return e.push(t), this._then(n, void 0, void 0, e, void 0);
                                }),
                                (r.prototype.get = function (t) {
                                    var e;
                                    return (e = "number" == typeof t ? i : a && null !== (e = (void 0)(t)) ? e : o), this._then(e, void 0, void 0, t, void 0);
                                });
                        });
                },
                { "./util": 36 },
            ],
            6: [
                function (c, t, e) {
                    t.exports = function (t, e, n, r) {
                        var o = c("./util"),
                            i = o.tryCatch,
                            s = o.errorObj,
                            a = t._async;
                        (t.prototype.break = t.prototype.cancel = function () {
                            if (!r.cancellation()) return this._warn("cancellation is disabled");
                            for (var t = this, e = t; t._isCancellable(); ) {
                                if (!t._cancelBy(e)) {
                                    e._isFollowing() ? e._followee().cancel() : e._cancelBranched();
                                    break;
                                }
                                var n = t._cancellationParent;
                                if (null == n || !n._isCancellable()) {
                                    t._isFollowing() ? t._followee().cancel() : t._cancelBranched();
                                    break;
                                }
                                t._isFollowing() && t._followee().cancel(), t._setWillBeCancelled(), (e = t), (t = n);
                            }
                        }),
                            (t.prototype._branchHasCancelled = function () {
                                this._branchesRemainingToCancel--;
                            }),
                            (t.prototype._enoughBranchesHaveCancelled = function () {
                                return void 0 === this._branchesRemainingToCancel || this._branchesRemainingToCancel <= 0;
                            }),
                            (t.prototype._cancelBy = function (t) {
                                return t === this ? ((this._branchesRemainingToCancel = 0), this._invokeOnCancel(), !0) : (this._branchHasCancelled(), !!this._enoughBranchesHaveCancelled() && (this._invokeOnCancel(), !0));
                            }),
                            (t.prototype._cancelBranched = function () {
                                this._enoughBranchesHaveCancelled() && this._cancel();
                            }),
                            (t.prototype._cancel = function () {
                                this._isCancellable() && (this._setCancelled(), a.invoke(this._cancelPromises, this, void 0));
                            }),
                            (t.prototype._cancelPromises = function () {
                                0 < this._length() && this._settlePromises();
                            }),
                            (t.prototype._unsetOnCancel = function () {
                                this._onCancelField = void 0;
                            }),
                            (t.prototype._isCancellable = function () {
                                return this.isPending() && !this._isCancelled();
                            }),
                            (t.prototype.isCancellable = function () {
                                return this.isPending() && !this.isCancelled();
                            }),
                            (t.prototype._doInvokeOnCancel = function (t, e) {
                                var n;
                                if (o.isArray(t)) for (var r = 0; r < t.length; ++r) this._doInvokeOnCancel(t[r], e);
                                else void 0 !== t && ("function" == typeof t ? e || ((n = i(t).call(this._boundValue())) === s && (this._attachExtraTrace(n.e), a.throwLater(n.e))) : t._resultCancelled(this));
                            }),
                            (t.prototype._invokeOnCancel = function () {
                                var t = this._onCancel();
                                this._unsetOnCancel(), a.invoke(this._doInvokeOnCancel, this, t);
                            }),
                            (t.prototype._invokeInternalOnCancel = function () {
                                this._isCancellable() && (this._doInvokeOnCancel(this._onCancel(), !0), this._unsetOnCancel());
                            }),
                            (t.prototype._resultCancelled = function () {
                                this.cancel();
                            });
                    };
                },
                { "./util": 36 },
            ],
            7: [
                function (t, e, n) {
                    e.exports = function (p) {
                        var h = t("./util"),
                            f = t("./es5").keys,
                            d = h.tryCatch,
                            _ = h.errorObj;
                        return function (c, l, u) {
                            return function (t) {
                                var e = u._boundValue();
                                t: for (var n = 0; n < c.length; ++n) {
                                    var r = c[n];
                                    if (r === Error || (null != r && r.prototype instanceof Error)) {
                                        if (t instanceof r) return d(l).call(e, t);
                                    } else if ("function" == typeof r) {
                                        var o = d(r).call(e, t);
                                        if (o === _) return o;
                                        if (o) return d(l).call(e, t);
                                    } else if (h.isObject(t)) {
                                        for (var i = f(r), s = 0; s < i.length; ++s) {
                                            var a = i[s];
                                            if (r[a] != t[a]) continue t;
                                        }
                                        return d(l).call(e, t);
                                    }
                                }
                                return p;
                            };
                        };
                    };
                },
                { "./es5": 13, "./util": 36 },
            ],
            8: [
                function (t, e, n) {
                    e.exports = function (i) {
                        function s() {
                            this._trace = new s.CapturedTrace(a());
                        }
                        function a() {
                            var t = n.length - 1;
                            return 0 <= t ? n[t] : void 0;
                        }
                        var c = !1,
                            n = [];
                        return (
                            (i.prototype._promiseCreated = function () {}),
                            (i.prototype._pushContext = function () {}),
                            (i.prototype._popContext = function () {
                                return null;
                            }),
                            (i._peekContext = i.prototype._peekContext = function () {}),
                            (s.prototype._pushContext = function () {
                                void 0 !== this._trace && ((this._trace._promiseCreated = null), n.push(this._trace));
                            }),
                            (s.prototype._popContext = function () {
                                var t, e;
                                return void 0 !== this._trace ? ((e = (t = n.pop())._promiseCreated), (t._promiseCreated = null), e) : null;
                            }),
                            (s.CapturedTrace = null),
                            (s.create = function () {
                                return c ? new s() : void 0;
                            }),
                            (s.deactivateLongStackTraces = function () {}),
                            (s.activateLongStackTraces = function () {
                                var t = i.prototype._pushContext,
                                    e = i.prototype._popContext,
                                    n = i._peekContext,
                                    r = i.prototype._peekContext,
                                    o = i.prototype._promiseCreated;
                                (s.deactivateLongStackTraces = function () {
                                    (i.prototype._pushContext = t), (i.prototype._popContext = e), (i._peekContext = n), (i.prototype._peekContext = r), (i.prototype._promiseCreated = o), (c = !1);
                                }),
                                    (c = !0),
                                    (i.prototype._pushContext = s.prototype._pushContext),
                                    (i.prototype._popContext = s.prototype._popContext),
                                    (i._peekContext = i.prototype._peekContext = a),
                                    (i.prototype._promiseCreated = function () {
                                        var t = this._peekContext();
                                        t && null == t._promiseCreated && (t._promiseCreated = this);
                                    });
                            }),
                            s
                        );
                    };
                },
                {},
            ],
            9: [
                function (rt, t, e) {
                    t.exports = function (r, o, V, H) {
                        function t(t, e) {
                            return { promise: e };
                        }
                        function n() {
                            return !1;
                        }
                        function I(t, e, n) {
                            var r = this;
                            try {
                                t(e, n, function (t) {
                                    if ("function" != typeof t) throw new TypeError("onCancel must be a function, got: " + b.toString(t));
                                    r._attachCancellationCallback(t);
                                });
                            } catch (t) {
                                return t;
                            }
                        }
                        function L(t) {
                            if (!this._isCancellable()) return this;
                            var e = this._onCancel();
                            void 0 !== e ? (b.isArray(e) ? e.push(t) : this._setOnCancel([e, t])) : this._setOnCancel(t);
                        }
                        function N() {
                            return this._onCancelField;
                        }
                        function U(t) {
                            this._onCancelField = t;
                        }
                        function B() {
                            (this._cancellationParent = void 0), (this._onCancelField = void 0);
                        }
                        function i(t, e) {
                            var n;
                            0 != (1 & e) && ((n = (this._cancellationParent = t)._branchesRemainingToCancel), (t._branchesRemainingToCancel = (n = void 0 === n ? 0 : n) + 1)), 0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
                        }
                        function M() {
                            var t = this._boundTo;
                            return void 0 !== t && t instanceof r ? (t.isFulfilled() ? t.value() : void 0) : t;
                        }
                        function z() {
                            this._trace = new l(this._peekContext());
                        }
                        function q(t, e) {
                            var n;
                            W(t) &&
                                (void 0 !== (n = void 0 !== (n = this._trace) && e ? n._parent : n)
                                    ? n.attachExtraTrace(t)
                                    : t.__stackCleaned__ || ((e = y(t)), b.notEnumerableProp(t, "stack", e.message + "\n" + e.stack.join("\n")), b.notEnumerableProp(t, "__stackCleaned__", !0)));
                        }
                        function Q() {
                            this._trace = void 0;
                        }
                        function s(t, e, n) {
                            D.warnings &&
                                ((t = new G(t)),
                                e ? n._attachExtraTrace(t) : D.longStackTraces && (e = r._peekContext()) ? e.attachExtraTrace(t) : ((n = y(t)), (t.stack = n.message + "\n" + n.stack.join("\n"))),
                                A("warning", t) || a(t, "", !0));
                        }
                        function v(t) {
                            for (var e = [], n = 0; n < t.length; ++n) {
                                var r = t[n],
                                    o = "    (No stack trace)" === r || k.test(r),
                                    i = o && $(r);
                                o && !i && (E && " " !== r.charAt(0) && (r = "    " + r), e.push(r));
                            }
                            return e;
                        }
                        function y(t) {
                            var e = t.stack,
                                n = t.toString(),
                                e =
                                    "string" == typeof e && 0 < e.length
                                        ? (function (t) {
                                              for (var e = t.stack.replace(/\s+$/g, "").split("\n"), n = 0; n < e.length; ++n) {
                                                  var r = e[n];
                                                  if ("    (No stack trace)" === r || k.test(r)) break;
                                              }
                                              return (e = 0 < n && "SyntaxError" != t.name ? e.slice(n) : e);
                                          })(t)
                                        : ["    (No stack trace)"];
                            return { message: n, stack: "SyntaxError" == t.name ? e : v(e) };
                        }
                        function a(t, e, n) {
                            var r;
                            "undefined" != typeof console &&
                                ((r = b.isObject(t) ? ((r = t.stack), e + j(r, t)) : e + String(t)), "function" == typeof d ? d(r, n) : ("function" != typeof console.log && "object" != typeof console.log) || console.log(r));
                        }
                        function e(t, e, n, r) {
                            var o = !1;
                            try {
                                "function" == typeof e && ((o = !0), "rejectionHandled" === t ? e(r) : e(n, r));
                            } catch (t) {
                                m.throwLater(t);
                            }
                            "unhandledRejection" === t ? A(t, n, r) || o || a(n, "Unhandled rejection ") : A(t, r);
                        }
                        function c(t) {
                            if ("function" == typeof t) e = "[function " + (t.name || "anonymous") + "]";
                            else {
                                e = t && "function" == typeof t.toString ? t.toString() : b.toString(t);
                                if (/\[object [a-zA-Z0-9$_]+\]/.test(e))
                                    try {
                                        var e = JSON.stringify(t);
                                    } catch (t) {}
                                0 === e.length && (e = "(empty array)");
                            }
                            return "(<" + ((t = e).length < 41 ? t : t.substr(0, 38) + "...") + ">, no stack trace)";
                        }
                        function u() {
                            return "function" == typeof nt;
                        }
                        function p(t) {
                            t = t.match(et);
                            return t ? { fileName: t[1], line: parseInt(t[2], 10) } : void 0;
                        }
                        function l(t) {
                            (this._parent = t), (this._promisesCreated = 0);
                            t = this._length = 1 + (void 0 === t ? 0 : t._length);
                            nt(this, l), 32 < t && this.uncycle();
                        }
                        var h,
                            f,
                            d,
                            _,
                            g,
                            m = r._async,
                            G = rt("./errors").Warning,
                            b = rt("./util"),
                            w = rt("./es5"),
                            W = b.canAttachTrace,
                            C = /[\\\/]bluebird[\\\/]js[\\\/](release|debug|instrumented)/,
                            X = /\((?:timers\.js):\d+:\d+\)/,
                            K = /[\/<\(](.+?):(\d+):(\d+)\)?\s*$/,
                            k = null,
                            j = null,
                            E = !1,
                            F = !(0 == b.env("BLUEBIRD_DEBUG") || (!b.env("BLUEBIRD_DEBUG") && "development" !== b.env("NODE_ENV"))),
                            x = !(0 == b.env("BLUEBIRD_WARNINGS") || (!F && !b.env("BLUEBIRD_WARNINGS"))),
                            F = !(0 == b.env("BLUEBIRD_LONG_STACK_TRACES") || (!F && !b.env("BLUEBIRD_LONG_STACK_TRACES"))),
                            T = 0 != b.env("BLUEBIRD_W_FORGOTTEN_RETURN") && (x || !!b.env("BLUEBIRD_W_FORGOTTEN_RETURN"));
                        function P() {
                            for (var t = 0; t < g.length; ++t) g[t]._notifyUnhandledRejection();
                            S();
                        }
                        function S() {
                            g.length = 0;
                        }
                        (g = []),
                            (_ = function (t) {
                                g.push(t), setTimeout(P, 1);
                            }),
                            w.defineProperty(r, "_unhandledRejectionCheck", { value: P }),
                            w.defineProperty(r, "_unhandledRejectionClear", { value: S }),
                            (r.prototype.suppressUnhandledRejections = function () {
                                var t = this._target();
                                t._bitField = (-1048577 & t._bitField) | 524288;
                            }),
                            (r.prototype._ensurePossibleRejectionHandled = function () {
                                0 == (524288 & this._bitField) && (this._setRejectionIsUnhandled(), _(this));
                            }),
                            (r.prototype._notifyUnhandledRejectionIsHandled = function () {
                                e("rejectionHandled", h, void 0, this);
                            }),
                            (r.prototype._setReturnedNonUndefined = function () {
                                this._bitField = 268435456 | this._bitField;
                            }),
                            (r.prototype._returnedNonUndefined = function () {
                                return 0 != (268435456 & this._bitField);
                            }),
                            (r.prototype._notifyUnhandledRejection = function () {
                                var t;
                                this._isRejectionUnhandled() && ((t = this._settledValue()), this._setUnhandledRejectionIsNotified(), e("unhandledRejection", f, t, this));
                            }),
                            (r.prototype._setUnhandledRejectionIsNotified = function () {
                                this._bitField = 262144 | this._bitField;
                            }),
                            (r.prototype._unsetUnhandledRejectionIsNotified = function () {
                                this._bitField = -262145 & this._bitField;
                            }),
                            (r.prototype._isUnhandledRejectionNotified = function () {
                                return 0 < (262144 & this._bitField);
                            }),
                            (r.prototype._setRejectionIsUnhandled = function () {
                                this._bitField = 1048576 | this._bitField;
                            }),
                            (r.prototype._unsetRejectionIsUnhandled = function () {
                                (this._bitField = -1048577 & this._bitField), this._isUnhandledRejectionNotified() && (this._unsetUnhandledRejectionIsNotified(), this._notifyUnhandledRejectionIsHandled());
                            }),
                            (r.prototype._isRejectionUnhandled = function () {
                                return 0 < (1048576 & this._bitField);
                            }),
                            (r.prototype._warn = function (t, e, n) {
                                return s(t, e, n || this);
                            }),
                            (r.onPossiblyUnhandledRejection = function (t) {
                                var e = r._getContext();
                                f = b.contextBind(e, t);
                            }),
                            (r.onUnhandledRejectionHandled = function (t) {
                                var e = r._getContext();
                                h = b.contextBind(e, t);
                            });
                        var R = function () {},
                            O =
                                ((r.longStackTraces = function () {
                                    if (m.haveItemsQueued() && !D.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                    var t, e, n;
                                    !D.longStackTraces &&
                                        u() &&
                                        ((t = r.prototype._captureStackTrace),
                                        (e = r.prototype._attachExtraTrace),
                                        (n = r.prototype._dereferenceTrace),
                                        (D.longStackTraces = !0),
                                        (R = function () {
                                            if (m.haveItemsQueued() && !D.longStackTraces) throw new Error("cannot enable long stack traces after promises have been created\n\n    See http://goo.gl/MqrFmX\n");
                                            (r.prototype._captureStackTrace = t), (r.prototype._attachExtraTrace = e), (r.prototype._dereferenceTrace = n), o.deactivateLongStackTraces(), (D.longStackTraces = !1);
                                        }),
                                        (r.prototype._captureStackTrace = z),
                                        (r.prototype._attachExtraTrace = q),
                                        (r.prototype._dereferenceTrace = Q),
                                        o.activateLongStackTraces());
                                }),
                                (r.hasLongStackTraces = function () {
                                    return D.longStackTraces && u();
                                }),
                                {
                                    unhandledrejection: {
                                        before: function () {
                                            var t = b.global.onunhandledrejection;
                                            return (b.global.onunhandledrejection = null), t;
                                        },
                                        after: function (t) {
                                            b.global.onunhandledrejection = t;
                                        },
                                    },
                                    rejectionhandled: {
                                        before: function () {
                                            var t = b.global.onrejectionhandled;
                                            return (b.global.onrejectionhandled = null), t;
                                        },
                                        after: function (t) {
                                            b.global.onrejectionhandled = t;
                                        },
                                    },
                                }),
                            Y = (function () {
                                function r(t, e) {
                                    if (!t) return !b.global.dispatchEvent(e);
                                    var n;
                                    try {
                                        return (n = t.before()), !b.global.dispatchEvent(e);
                                    } finally {
                                        t.after(n);
                                    }
                                }
                                var t;
                                try {
                                    return "function" == typeof CustomEvent
                                        ? ((t = new CustomEvent("CustomEvent")),
                                          b.global.dispatchEvent(t),
                                          function (t, e) {
                                              t = t.toLowerCase();
                                              var n = new CustomEvent(t, { detail: e, cancelable: !0 });
                                              return w.defineProperty(n, "promise", { value: e.promise }), w.defineProperty(n, "reason", { value: e.reason }), r(O[t], n);
                                          })
                                        : "function" == typeof Event
                                        ? ((t = new Event("CustomEvent")),
                                          b.global.dispatchEvent(t),
                                          function (t, e) {
                                              t = t.toLowerCase();
                                              var n = new Event(t, { cancelable: !0 });
                                              return (n.detail = e), w.defineProperty(n, "promise", { value: e.promise }), w.defineProperty(n, "reason", { value: e.reason }), r(O[t], n);
                                          })
                                        : ((t = document.createEvent("CustomEvent")).initCustomEvent("testingtheevent", !1, !0, {}),
                                          b.global.dispatchEvent(t),
                                          function (t, e) {
                                              t = t.toLowerCase();
                                              var n = document.createEvent("CustomEvent");
                                              return n.initCustomEvent(t, !1, !0, e), r(O[t], n);
                                          });
                                } catch (t) {}
                                return function () {
                                    return !1;
                                };
                            })(),
                            J = b.isNode
                                ? function () {
                                      return process.emit.apply(process, arguments);
                                  }
                                : b.global
                                ? function (t) {
                                      (t = "on" + t.toLowerCase()), (t = b.global[t]);
                                      return !!t && (t.apply(b.global, [].slice.call(arguments, 1)), !0);
                                  }
                                : function () {
                                      return !1;
                                  },
                            Z = {
                                promiseCreated: t,
                                promiseFulfilled: t,
                                promiseRejected: t,
                                promiseResolved: t,
                                promiseCancelled: t,
                                promiseChained: function (t, e, n) {
                                    return { promise: e, child: n };
                                },
                                warning: function (t, e) {
                                    return { warning: e };
                                },
                                unhandledRejection: function (t, e, n) {
                                    return { reason: e, promise: n };
                                },
                                rejectionHandled: t,
                            },
                            A = function (t) {
                                var e = !1;
                                try {
                                    e = J.apply(null, arguments);
                                } catch (t) {
                                    m.throwLater(t), (e = !0);
                                }
                                var n = !1;
                                try {
                                    n = Y(t, Z[t].apply(null, arguments));
                                } catch (t) {
                                    m.throwLater(t), (n = !0);
                                }
                                return n || e;
                            },
                            tt =
                                ((r.config = function (t) {
                                    var e;
                                    if (
                                        ("longStackTraces" in (t = Object(t)) && (t.longStackTraces ? r.longStackTraces() : !t.longStackTraces && r.hasLongStackTraces() && R()),
                                        "warnings" in t && ((e = t.warnings), (D.warnings = !!e), (T = D.warnings), b.isObject(e)) && "wForgottenReturn" in e && (T = !!e.wForgottenReturn),
                                        "cancellation" in t && t.cancellation && !D.cancellation)
                                    ) {
                                        if (m.haveItemsQueued()) throw new Error("cannot enable cancellation after promises are in use");
                                        (r.prototype._clearCancellationData = B),
                                            (r.prototype._propagateFrom = i),
                                            (r.prototype._onCancel = N),
                                            (r.prototype._setOnCancel = U),
                                            (r.prototype._attachCancellationCallback = L),
                                            (r.prototype._execute = I),
                                            (tt = i),
                                            (D.cancellation = !0);
                                    }
                                    return (
                                        "monitoring" in t && (t.monitoring && !D.monitoring ? ((D.monitoring = !0), (r.prototype._fireEvent = A)) : !t.monitoring && D.monitoring && ((D.monitoring = !1), (r.prototype._fireEvent = n))),
                                        "asyncHooks" in t && b.nodeSupportsAsyncResource && D.asyncHooks !== (e = !!t.asyncHooks) && ((D.asyncHooks = e) ? V : H)(),
                                        r
                                    );
                                }),
                                (r.prototype._fireEvent = n),
                                (r.prototype._execute = function (t, e, n) {
                                    try {
                                        t(e, n);
                                    } catch (t) {
                                        return t;
                                    }
                                }),
                                (r.prototype._onCancel = function () {}),
                                (r.prototype._setOnCancel = function (t) {}),
                                (r.prototype._attachCancellationCallback = function (t) {}),
                                (r.prototype._captureStackTrace = function () {}),
                                (r.prototype._attachExtraTrace = function () {}),
                                (r.prototype._dereferenceTrace = function () {}),
                                (r.prototype._clearCancellationData = function () {}),
                                (r.prototype._propagateFrom = function (t, e) {}),
                                function (t, e) {
                                    0 != (2 & e) && t._isBound() && this._setBoundTo(t._boundTo);
                                }),
                            $ = function () {
                                return !1;
                            },
                            et = /[\/<\(]([^:\/]+):(\d+):(?:\d+)\)?\s*$/,
                            nt =
                                (b.inherits(l, Error),
                                ((o.CapturedTrace = l).prototype.uncycle = function () {
                                    if (!(this._length < 2)) {
                                        for (var t = [], e = {}, n = 0, r = this; void 0 !== r; ++n) t.push(r), (r = r._parent);
                                        for (var o, n = (o = this._length = n) - 1; 0 <= n; --n) {
                                            var i = t[n].stack;
                                            void 0 === e[i] && (e[i] = n);
                                        }
                                        for (n = 0; n < o; ++n) {
                                            var s = e[t[n].stack];
                                            if (void 0 !== s && s !== n) {
                                                0 < s && ((t[s - 1]._parent = void 0), (t[s - 1]._length = 1)), (t[n]._parent = void 0), (t[n]._length = 1);
                                                var a = 0 < n ? t[n - 1] : this;
                                                s < o - 1 ? ((a._parent = t[s + 1]), a._parent.uncycle(), (a._length = a._parent._length + 1)) : ((a._parent = void 0), (a._length = 1));
                                                for (var c = a._length + 1, l = n - 2; 0 <= l; --l) (t[l]._length = c), c++;
                                                return;
                                            }
                                        }
                                    }
                                }),
                                (l.prototype.attachExtraTrace = function (t) {
                                    if (!t.__stackCleaned__) {
                                        this.uncycle();
                                        for (var e = y(t), n = e.message, r = [e.stack], o = this; void 0 !== o; ) r.push(v(o.stack.split("\n"))), (o = o._parent);
                                        for (var i = r, s = i[0], a = 1; a < i.length; ++a) {
                                            for (var c = i[a], l = s.length - 1, u = s[l], p = -1, h = c.length - 1; 0 <= h; --h)
                                                if (c[h] === u) {
                                                    p = h;
                                                    break;
                                                }
                                            for (h = p; 0 <= h; --h) {
                                                var f = c[h];
                                                if (s[l] !== f) break;
                                                s.pop(), l--;
                                            }
                                            s = c;
                                        }
                                        for (var d = r, _ = 0; _ < d.length; ++_) (0 === d[_].length || (_ + 1 < d.length && d[_][0] === d[_ + 1][0])) && (d.splice(_, 1), _--);
                                        b.notEnumerableProp(
                                            t,
                                            "stack",
                                            (function (t, e) {
                                                for (var n = 0; n < e.length - 1; ++n) e[n].push("From previous event:"), (e[n] = e[n].join("\n"));
                                                return n < e.length && (e[n] = e[n].join("\n")), t + "\n" + e.join("\n");
                                            })(n, r)
                                        ),
                                            b.notEnumerableProp(t, "__stackCleaned__", !0);
                                    }
                                }),
                                (function () {
                                    function t(t, e) {
                                        return "string" == typeof t ? t : void 0 !== e.name && void 0 !== e.message ? e.toString() : c(e);
                                    }
                                    var n,
                                        e = /^\s*at\s*/;
                                    if ("number" == typeof Error.stackTraceLimit && "function" == typeof Error.captureStackTrace)
                                        return (
                                            (Error.stackTraceLimit += 6),
                                            (k = e),
                                            (j = t),
                                            (n = Error.captureStackTrace),
                                            ($ = function (t) {
                                                return C.test(t);
                                            }),
                                            function (t, e) {
                                                (Error.stackTraceLimit += 6), n(t, e), (Error.stackTraceLimit -= 6);
                                            }
                                        );
                                    var r,
                                        o = new Error();
                                    if ("string" == typeof o.stack && 0 <= o.stack.split("\n")[0].indexOf("stackDetection@"))
                                        return (
                                            (k = /@/),
                                            (j = t),
                                            (E = !0),
                                            function (t) {
                                                t.stack = new Error().stack;
                                            }
                                        );
                                    try {
                                        throw new Error();
                                    } catch (t) {
                                        r = "stack" in t;
                                    }
                                    return "stack" in o || !r || "number" != typeof Error.stackTraceLimit
                                        ? ((j = function (t, e) {
                                              return "string" == typeof t ? t : ("object" != typeof e && "function" != typeof e) || void 0 === e.name || void 0 === e.message ? c(e) : e.toString();
                                          }),
                                          null)
                                        : ((k = e),
                                          (j = t),
                                          function (e) {
                                              Error.stackTraceLimit += 6;
                                              try {
                                                  throw new Error();
                                              } catch (t) {
                                                  e.stack = t.stack;
                                              }
                                              Error.stackTraceLimit -= 6;
                                          });
                                })()),
                            D =
                                ("undefined" != typeof console &&
                                    void 0 !== console.warn &&
                                    ((d = function (t) {
                                        console.warn(t);
                                    }),
                                    b.isNode && process.stderr.isTTY
                                        ? (d = function (t, e) {
                                              console.warn((e ? "[33m" : "[31m") + t + "[0m\n");
                                          })
                                        : b.isNode ||
                                          "string" != typeof new Error().stack ||
                                          (d = function (t, e) {
                                              console.warn("%c" + t, e ? "color: darkorange" : "color: red");
                                          })),
                                { warnings: x, longStackTraces: !1, cancellation: !1, monitoring: !1, asyncHooks: !1 });
                        return (
                            F && r.longStackTraces(),
                            {
                                asyncHooks: function () {
                                    return D.asyncHooks;
                                },
                                longStackTraces: function () {
                                    return D.longStackTraces;
                                },
                                warnings: function () {
                                    return D.warnings;
                                },
                                cancellation: function () {
                                    return D.cancellation;
                                },
                                monitoring: function () {
                                    return D.monitoring;
                                },
                                propagateFromFunction: function () {
                                    return tt;
                                },
                                boundValueFunction: function () {
                                    return M;
                                },
                                checkForgottenReturns: function (t, e, n, r, o) {
                                    if (void 0 === t && null !== e && T && (void 0 === o || !o._returnedNonUndefined()) && 0 != (65535 & r._bitField)) {
                                        n && (n += " ");
                                        var i = "",
                                            s = "";
                                        if (e._trace) {
                                            for (var a = e._trace.stack.split("\n"), c = v(a), l = c.length - 1; 0 <= l; --l) {
                                                var u = c[l];
                                                if (!X.test(u)) {
                                                    u = u.match(K);
                                                    u && (i = "at " + u[1] + ":" + u[2] + ":" + u[3] + " ");
                                                    break;
                                                }
                                            }
                                            if (0 < c.length)
                                                for (var p = c[0], l = 0; l < a.length; ++l)
                                                    if (a[l] === p) {
                                                        0 < l && (s = "\n" + a[l - 1]);
                                                        break;
                                                    }
                                        }
                                        r._warn("a promise was created in a " + n + "handler " + i + "but was not returned from it, see http://goo.gl/rRqMUw" + s, !0, e);
                                    }
                                },
                                setBounds: function (t, e) {
                                    if (u()) {
                                        for (var n, r, o = (t.stack || "").split("\n"), i = (e.stack || "").split("\n"), s = -1, a = -1, c = 0; c < o.length; ++c)
                                            if ((l = p(o[c]))) {
                                                (n = l.fileName), (s = l.line);
                                                break;
                                            }
                                        for (var l, c = 0; c < i.length; ++c)
                                            if ((l = p(i[c]))) {
                                                (r = l.fileName), (a = l.line);
                                                break;
                                            }
                                        s < 0 ||
                                            a < 0 ||
                                            !n ||
                                            !r ||
                                            n !== r ||
                                            a <= s ||
                                            ($ = function (t) {
                                                return !!C.test(t) || !!((t = p(t)) && t.fileName === n && s <= t.line && t.line <= a);
                                            });
                                    }
                                },
                                warn: s,
                                deprecated: function (t, e) {
                                    return (t += " is deprecated and will be removed in a future version."), e && (t += " Use " + e + " instead."), s(t);
                                },
                                CapturedTrace: l,
                                fireDomEvent: Y,
                                fireGlobalEvent: J,
                            }
                        );
                    };
                },
                { "./errors": 12, "./es5": 13, "./util": 36 },
            ],
            10: [
                function (t, e, n) {
                    e.exports = function (n) {
                        function r() {
                            return this.value;
                        }
                        function o() {
                            throw this.reason;
                        }
                        (n.prototype.return = n.prototype.thenReturn = function (t) {
                            return t instanceof n && t.suppressUnhandledRejections(), this._then(r, void 0, void 0, { value: t }, void 0);
                        }),
                            (n.prototype.throw = n.prototype.thenThrow = function (t) {
                                return this._then(o, void 0, void 0, { reason: t }, void 0);
                            }),
                            (n.prototype.catchThrow = function (t) {
                                var e;
                                return arguments.length <= 1
                                    ? this._then(void 0, o, void 0, { reason: t }, void 0)
                                    : ((e = arguments[1]),
                                      this.caught(t, function () {
                                          throw e;
                                      }));
                            }),
                            (n.prototype.catchReturn = function (t) {
                                var e;
                                return arguments.length <= 1
                                    ? (t instanceof n && t.suppressUnhandledRejections(), this._then(void 0, r, void 0, { value: t }, void 0))
                                    : ((e = arguments[1]) instanceof n && e.suppressUnhandledRejections(),
                                      this.caught(t, function () {
                                          return e;
                                      }));
                            });
                    };
                },
                {},
            ],
            11: [
                function (t, e, n) {
                    e.exports = function (t, n) {
                        function r() {
                            return e(this);
                        }
                        var o = t.reduce,
                            e = t.all;
                        (t.prototype.each = function (t) {
                            return o(this, t, n, 0)._then(r, void 0, void 0, this, void 0);
                        }),
                            (t.prototype.mapSeries = function (t) {
                                return o(this, t, n, n);
                            }),
                            (t.each = function (t, e) {
                                return o(t, e, n, 0)._then(r, void 0, void 0, t, void 0);
                            }),
                            (t.mapSeries = function (t, e) {
                                return o(t, e, n, n);
                            });
                    };
                },
                {},
            ],
            12: [
                function (t, e, n) {
                    function r(e, n) {
                        function r(t) {
                            return this instanceof r ? (u(this, "message", "string" == typeof t ? t : n), u(this, "name", e), void (Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : Error.call(this))) : new r(t);
                        }
                        return l(r, Error), r;
                    }
                    function o(t) {
                        return this instanceof o
                            ? (u(this, "name", "OperationalError"),
                              u(this, "message", t),
                              (this.cause = t),
                              (this.isOperational = !0),
                              void (t instanceof Error ? (u(this, "message", t.message), u(this, "stack", t.stack)) : Error.captureStackTrace && Error.captureStackTrace(this, this.constructor)))
                            : new o(t);
                    }
                    var i,
                        s,
                        a = t("./es5"),
                        c = a.freeze,
                        t = t("./util"),
                        l = t.inherits,
                        u = t.notEnumerableProp,
                        t = r("Warning", "warning"),
                        p = r("CancellationError", "cancellation error"),
                        h = r("TimeoutError", "timeout error"),
                        f = r("AggregateError", "aggregate error");
                    try {
                        (i = TypeError), (s = RangeError);
                    } catch (t) {
                        (i = r("TypeError", "type error")), (s = r("RangeError", "range error"));
                    }
                    for (var d = "join pop push shift unshift slice filter forEach some every map indexOf lastIndexOf reduce reduceRight sort reverse".split(" "), _ = 0; _ < d.length; ++_)
                        "function" == typeof Array.prototype[d[_]] && (f.prototype[d[_]] = Array.prototype[d[_]]);
                    a.defineProperty(f.prototype, "length", { value: 0, configurable: !1, writable: !0, enumerable: !0 }), (f.prototype.isOperational = !0);
                    var v = 0,
                        y =
                            ((f.prototype.toString = function () {
                                var t = "\n" + Array(4 * v + 1).join(" ") + "AggregateError of:\n";
                                v++;
                                for (var e = Array(4 * v + 1).join(" "), n = 0; n < this.length; ++n) {
                                    for (var r = this[n] === this ? "[Circular AggregateError]" : this[n] + "", o = r.split("\n"), i = 0; i < o.length; ++i) o[i] = e + o[i];
                                    t += (r = o.join("\n")) + "\n";
                                }
                                return v--, t;
                            }),
                            l(o, Error),
                            Error.__BluebirdErrorTypes__);
                    y ||
                        ((y = c({ CancellationError: p, TimeoutError: h, OperationalError: o, RejectionError: o, AggregateError: f })),
                        a.defineProperty(Error, "__BluebirdErrorTypes__", { value: y, writable: !1, enumerable: !1, configurable: !1 })),
                        (e.exports = { Error: Error, TypeError: i, RangeError: s, CancellationError: y.CancellationError, OperationalError: y.OperationalError, TimeoutError: y.TimeoutError, AggregateError: y.AggregateError, Warning: t });
                },
                { "./es5": 13, "./util": 36 },
            ],
            13: [
                function (t, e, n) {
                    var r,
                        o,
                        i,
                        s = (function () {
                            return void 0 === this;
                        })();
                    s
                        ? (e.exports = {
                              freeze: Object.freeze,
                              defineProperty: Object.defineProperty,
                              getDescriptor: Object.getOwnPropertyDescriptor,
                              keys: Object.keys,
                              names: Object.getOwnPropertyNames,
                              getPrototypeOf: Object.getPrototypeOf,
                              isArray: Array.isArray,
                              isES5: s,
                              propertyIsWritable: function (t, e) {
                                  t = Object.getOwnPropertyDescriptor(t, e);
                                  return !(t && !t.writable && !t.set);
                              },
                          })
                        : ((r = {}.hasOwnProperty),
                          (o = {}.toString),
                          (i = {}.constructor.prototype),
                          (e.exports = {
                              isArray: function (t) {
                                  try {
                                      return "[object Array]" === o.call(t);
                                  } catch (t) {
                                      return !1;
                                  }
                              },
                              keys: (e = function (t) {
                                  var e,
                                      n = [];
                                  for (e in t) r.call(t, e) && n.push(e);
                                  return n;
                              }),
                              names: e,
                              defineProperty: function (t, e, n) {
                                  return (t[e] = n.value), t;
                              },
                              getDescriptor: function (t, e) {
                                  return { value: t[e] };
                              },
                              freeze: function (t) {
                                  return t;
                              },
                              getPrototypeOf: function (t) {
                                  try {
                                      return Object(t).constructor.prototype;
                                  } catch (t) {
                                      return i;
                                  }
                              },
                              isES5: s,
                              propertyIsWritable: function () {
                                  return !0;
                              },
                          }));
                },
                {},
            ],
            14: [
                function (t, e, n) {
                    e.exports = function (t, r) {
                        var o = t.map;
                        (t.prototype.filter = function (t, e) {
                            return o(this, t, e, r);
                        }),
                            (t.filter = function (t, e, n) {
                                return o(t, e, n, r);
                            });
                    };
                },
                {},
            ],
            15: [
                function (t, e, n) {
                    e.exports = function (s, o, i) {
                        function a(t, e, n) {
                            (this.promise = t), (this.type = e), (this.handler = n), (this.called = !1), (this.cancelPromise = null);
                        }
                        function c(t) {
                            this.finallyHandler = t;
                        }
                        function l(t, e) {
                            return null != t.cancelPromise && (1 < arguments.length ? t.cancelPromise._reject(e) : t.cancelPromise._cancel(), (t.cancelPromise = null), 1);
                        }
                        function u() {
                            return h.call(this, this.promise._target()._settledValue());
                        }
                        function p(t) {
                            return l(this, t) ? void 0 : ((_.e = t), _);
                        }
                        function h(t) {
                            var e = this.promise,
                                n = this.handler;
                            if (!this.called) {
                                this.called = !0;
                                n = this.isFinallyHandler() ? n.call(e._boundValue()) : n.call(e._boundValue(), t);
                                if (n === i) return n;
                                if (void 0 !== n) {
                                    e._setReturnedNonUndefined();
                                    var r,
                                        n = o(n, e);
                                    if (n instanceof s) {
                                        if (null != this.cancelPromise) {
                                            if (n._isCancelled()) return (r = new d("late cancellation observer")), e._attachExtraTrace(r), (_.e = r), _;
                                            n.isPending() && n._attachCancellationCallback(new c(this));
                                        }
                                        return n._then(u, p, void 0, this, void 0);
                                    }
                                }
                            }
                            return e.isRejected() ? (l(this), (_.e = t), _) : (l(this), t);
                        }
                        var f = t("./util"),
                            d = s.CancellationError,
                            _ = f.errorObj,
                            v = t("./catch_filter")(i);
                        return (
                            (a.prototype.isFinallyHandler = function () {
                                return 0 === this.type;
                            }),
                            (c.prototype._resultCancelled = function () {
                                l(this.finallyHandler);
                            }),
                            (s.prototype._passThrough = function (t, e, n, r) {
                                return "function" != typeof t ? this.then() : this._then(n, r, void 0, new a(this, e, t), void 0);
                            }),
                            (s.prototype.lastly = s.prototype.finally = function (t) {
                                return this._passThrough(t, 0, h, h);
                            }),
                            (s.prototype.tap = function (t) {
                                return this._passThrough(t, 1, h);
                            }),
                            (s.prototype.tapCatch = function (t) {
                                var e = arguments.length;
                                if (1 === e) return this._passThrough(t, 1, void 0, h);
                                for (var n = new Array(e - 1), r = 0, o = 0; o < e - 1; ++o) {
                                    var i = arguments[o];
                                    if (!f.isObject(i)) return s.reject(new TypeError("tapCatch statement predicate: expecting an object but got " + f.classString(i)));
                                    n[r++] = i;
                                }
                                return (n.length = r), this._passThrough(v(n, arguments[o], this), 1, void 0, h);
                            }),
                            a
                        );
                    };
                },
                { "./catch_filter": 7, "./util": 36 },
            ],
            16: [
                function (r, t, e) {
                    t.exports = function (s, n, a, c, t, l) {
                        function u(t, e, n, r) {
                            var o, i;
                            l.cancellation()
                                ? ((o = new s(a)),
                                  (i = this._finallyPromise = new s(a)),
                                  (this._promise = o.lastly(function () {
                                      return i;
                                  })),
                                  o._captureStackTrace(),
                                  o._setOnCancel(this))
                                : (this._promise = new s(a))._captureStackTrace(),
                                (this._stack = r),
                                (this._generatorFunction = t),
                                (this._receiver = e),
                                (this._generator = void 0),
                                (this._yieldHandlers = "function" == typeof n ? [n].concat(d) : d),
                                (this._yieldedPromise = null),
                                (this._cancellationPhase = !1);
                        }
                        var p = r("./errors").TypeError,
                            e = r("./util"),
                            h = e.errorObj,
                            f = e.tryCatch,
                            d = [];
                        e.inherits(u, t),
                            (u.prototype._isResolved = function () {
                                return null === this._promise;
                            }),
                            (u.prototype._cleanup = function () {
                                (this._promise = this._generator = null), l.cancellation() && null !== this._finallyPromise && (this._finallyPromise._fulfill(), (this._finallyPromise = null));
                            }),
                            (u.prototype._promiseCancelled = function () {
                                var t;
                                this._isResolved() ||
                                    ((t =
                                        void 0 !== this._generator.return
                                            ? (this._promise._pushContext(), f(this._generator.return).call(this._generator, void 0))
                                            : ((t = new s.CancellationError("generator .return() sentinel")),
                                              (s.coroutine.returnSentinel = t),
                                              this._promise._attachExtraTrace(t),
                                              this._promise._pushContext(),
                                              f(this._generator.throw).call(this._generator, t))),
                                    this._promise._popContext(),
                                    (this._cancellationPhase = !0),
                                    (this._yieldedPromise = null),
                                    this._continue(t));
                            }),
                            (u.prototype._promiseFulfilled = function (t) {
                                (this._yieldedPromise = null), this._promise._pushContext();
                                t = f(this._generator.next).call(this._generator, t);
                                this._promise._popContext(), this._continue(t);
                            }),
                            (u.prototype._promiseRejected = function (t) {
                                (this._yieldedPromise = null), this._promise._attachExtraTrace(t), this._promise._pushContext();
                                t = f(this._generator.throw).call(this._generator, t);
                                this._promise._popContext(), this._continue(t);
                            }),
                            (u.prototype._resultCancelled = function () {
                                var t;
                                this._yieldedPromise instanceof s && ((t = this._yieldedPromise), (this._yieldedPromise = null), t.cancel());
                            }),
                            (u.prototype.promise = function () {
                                return this._promise;
                            }),
                            (u.prototype._run = function () {
                                (this._generator = this._generatorFunction.call(this._receiver)), (this._receiver = this._generatorFunction = void 0), this._promiseFulfilled(void 0);
                            }),
                            (u.prototype._continue = function (t) {
                                var e,
                                    n = this._promise;
                                return t === h
                                    ? (this._cleanup(), this._cancellationPhase ? n.cancel() : n._rejectCallback(t.e, !1))
                                    : ((e = t.value),
                                      !0 === t.done
                                          ? (this._cleanup(), this._cancellationPhase ? n.cancel() : n._resolveCallback(e))
                                          : void ((t = c(e, this._promise)) instanceof s ||
                                            null !==
                                                (t = (function (t, e, n) {
                                                    for (var r = 0; r < e.length; ++r) {
                                                        n._pushContext();
                                                        var o = f(e[r])(t);
                                                        if ((n._popContext(), o === h)) return n._pushContext(), (i = s.reject(h.e)), n._popContext(), i;
                                                        var i = c(o, n);
                                                        if (i instanceof s) return i;
                                                    }
                                                    return null;
                                                })(t, this._yieldHandlers, this._promise))
                                                ? 0 == (50397184 & (n = (t = t._target())._bitField))
                                                    ? (this._yieldedPromise = t)._proxy(this, null)
                                                    : 0 != (33554432 & n)
                                                    ? s._async.invoke(this._promiseFulfilled, this, t._value())
                                                    : 0 != (16777216 & n)
                                                    ? s._async.invoke(this._promiseRejected, this, t._reason())
                                                    : this._promiseCancelled()
                                                : this._promiseRejected(
                                                      new p(
                                                          "A value %s was yielded that could not be treated as a promise\n\n    See http://goo.gl/MqrFmX\n\n".replace("%s", String(e)) +
                                                              "From coroutine:\n" +
                                                              this._stack.split("\n").slice(1, -7).join("\n")
                                                      )
                                                  )));
                            }),
                            (s.coroutine = function (r, t) {
                                if ("function" != typeof r) throw new p("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n");
                                var o = Object(t).yieldHandler,
                                    i = u,
                                    s = new Error().stack;
                                return function () {
                                    var t = r.apply(this, arguments),
                                        e = new i(void 0, void 0, o, s),
                                        n = e.promise();
                                    return (e._generator = t), e._promiseFulfilled(void 0), n;
                                };
                            }),
                            (s.coroutine.addYieldHandler = function (t) {
                                if ("function" != typeof t) throw new p("expecting a function but got " + e.classString(t));
                                d.push(t);
                            }),
                            (s.spawn = function (t) {
                                var e;
                                return (
                                    l.deprecated("Promise.spawn()", "Promise.coroutine()"),
                                    "function" != typeof t ? n("generatorFunction must be a function\n\n    See http://goo.gl/MqrFmX\n") : ((e = (t = new u(t, this)).promise()), t._run(s.spawn), e)
                                );
                            });
                    };
                },
                { "./errors": 12, "./util": 36 },
            ],
            17: [
                function (s, t, e) {
                    t.exports = function (t, n, e, r, o) {
                        var i = s("./util");
                        i.canEvaluate,
                            i.tryCatch,
                            i.errorObj,
                            (t.join = function () {
                                var t,
                                    e = arguments.length - 1,
                                    e = (0 < e && "function" == typeof arguments[e] && (t = arguments[e]), [].slice.call(arguments)),
                                    e = (t && e.pop(), new n(e).promise());
                                return void 0 !== t ? e.spread(t) : e;
                            });
                    };
                },
                { "./util": 36 },
            ],
            18: [
                function (e, t, n) {
                    t.exports = function (l, t, i, u, a, p) {
                        function s(t, e, n, r) {
                            this.constructor$(t), this._promise._captureStackTrace();
                            var o = l._getContext();
                            if (
                                ((this._callback = c.contextBind(o, e)),
                                (this._preservedValues = r === a ? new Array(this.length()) : null),
                                (this._limit = n),
                                (this._inFlight = 0),
                                (this._queue = []),
                                d.invoke(this._asyncInit, this, void 0),
                                c.isArray(t))
                            )
                                for (var i = 0; i < t.length; ++i) {
                                    var s = t[i];
                                    s instanceof l && s.suppressUnhandledRejections();
                                }
                        }
                        function n(t, e, n, r) {
                            if ("function" != typeof e) return i("expecting a function but got " + c.classString(e));
                            var o = 0;
                            if (void 0 !== n) {
                                if ("object" != typeof n || null === n) return l.reject(new TypeError("options argument must be an object but it is " + c.classString(n)));
                                if ("number" != typeof n.concurrency) return l.reject(new TypeError("'concurrency' must be a number but it is " + c.classString(n.concurrency)));
                                o = n.concurrency;
                            }
                            return new s(t, e, (o = "number" == typeof o && isFinite(o) && 1 <= o ? o : 0), r).promise();
                        }
                        var c = e("./util"),
                            h = c.tryCatch,
                            f = c.errorObj,
                            d = l._async;
                        c.inherits(s, t),
                            (s.prototype._asyncInit = function () {
                                this._init$(void 0, -2);
                            }),
                            (s.prototype._init = function () {}),
                            (s.prototype._promiseFulfilled = function (t, e) {
                                var n = this._values,
                                    r = this.length(),
                                    o = this._preservedValues,
                                    i = this._limit;
                                if (e < 0) {
                                    if (((n[(e = -1 * e - 1)] = t), 1 <= i && (this._inFlight--, this._drainQueue(), this._isResolved()))) return !0;
                                } else {
                                    if (1 <= i && this._inFlight >= i) return (n[e] = t), this._queue.push(e), !1;
                                    null !== o && (o[e] = t);
                                    var s = this._promise,
                                        a = this._callback,
                                        c = s._boundValue(),
                                        a = (s._pushContext(), h(a).call(c, t, e, r)),
                                        c = s._popContext();
                                    if ((p.checkForgottenReturns(a, c, null !== o ? "Promise.filter" : "Promise.map", s), a === f)) return this._reject(a.e), !0;
                                    if ((t = u(a, this._promise)) instanceof l) {
                                        c = (t = t._target())._bitField;
                                        if (0 == (50397184 & c)) return 1 <= i && this._inFlight++, (n[e] = t)._proxy(this, -1 * (e + 1)), !1;
                                        if (0 == (33554432 & c)) return 0 != (16777216 & c) ? this._reject(t._reason()) : this._cancel(), !0;
                                        a = t._value();
                                    }
                                    n[e] = a;
                                }
                                return r <= ++this._totalResolved && (null !== o ? this._filter(n, o) : this._resolve(n), !0);
                            }),
                            (s.prototype._drainQueue = function () {
                                for (var t = this._queue, e = this._limit, n = this._values; 0 < t.length && this._inFlight < e; ) {
                                    if (this._isResolved()) return;
                                    var r = t.pop();
                                    this._promiseFulfilled(n[r], r);
                                }
                            }),
                            (s.prototype._filter = function (t, e) {
                                for (var n = e.length, r = new Array(n), o = 0, i = 0; i < n; ++i) t[i] && (r[o++] = e[i]);
                                (r.length = o), this._resolve(r);
                            }),
                            (s.prototype.preservedValues = function () {
                                return this._preservedValues;
                            }),
                            (l.prototype.map = function (t, e) {
                                return n(this, t, e, null);
                            }),
                            (l.map = n);
                    };
                },
                { "./util": 36 },
            ],
            19: [
                function (e, t, n) {
                    t.exports = function (o, i, t, s, a) {
                        var c = e("./util"),
                            l = c.tryCatch;
                        (o.method = function (r) {
                            if ("function" != typeof r) throw new o.TypeError("expecting a function but got " + c.classString(r));
                            return function () {
                                var t = new o(i),
                                    e = (t._captureStackTrace(), t._pushContext(), l(r).apply(this, arguments)),
                                    n = t._popContext();
                                return a.checkForgottenReturns(e, n, "Promise.method", t), t._resolveFromSyncValue(e), t;
                            };
                        }),
                            (o.attempt = o.try = function (t) {
                                var e, n, r;
                                return "function" != typeof t
                                    ? s("expecting a function but got " + c.classString(t))
                                    : ((e = new o(i))._captureStackTrace(),
                                      e._pushContext(),
                                      (n = 1 < arguments.length ? (a.deprecated("calling Promise.try with more than 1 argument"), (r = arguments[1]), (n = arguments[2]), c.isArray(r) ? l(t).apply(n, r) : l(t).call(n, r)) : l(t)()),
                                      (r = e._popContext()),
                                      a.checkForgottenReturns(n, r, "Promise.try", e),
                                      e._resolveFromSyncValue(n),
                                      e);
                            }),
                            (o.prototype._resolveFromSyncValue = function (t) {
                                t === c.errorObj ? this._rejectCallback(t.e, !1) : this._resolveCallback(t, !0);
                            });
                    };
                },
                { "./util": 36 },
            ],
            20: [
                function (t, e, n) {
                    function o(t) {
                        var e, n;
                        if ((n = t) instanceof Error && c.getPrototypeOf(n) === Error.prototype) {
                            ((e = new a(t)).name = t.name), (e.message = t.message), (e.stack = t.stack);
                            for (var r = c.keys(t), o = 0; o < r.length; ++o) {
                                var i = r[o];
                                l.test(i) || (e[i] = t[i]);
                            }
                            return e;
                        }
                        return s.markAsOriginatingFromRejection(t), t;
                    }
                    var s = t("./util"),
                        i = s.maybeWrapAsError,
                        a = t("./errors").OperationalError,
                        c = t("./es5"),
                        l = /^(?:name|message|stack|cause)$/;
                    e.exports = function (n, r) {
                        return function (t, e) {
                            null !== n && (t ? ((t = o(i(t))), n._attachExtraTrace(t), n._reject(t)) : r ? ((t = [].slice.call(arguments, 1)), n._fulfill(t)) : n._fulfill(e), (n = null));
                        };
                    };
                },
                { "./errors": 12, "./es5": 13, "./util": 36 },
            ],
            21: [
                function (e, t, n) {
                    t.exports = function (t) {
                        function r(t, e) {
                            if (!n.isArray(t)) return o.call(this, t, e);
                            e = a(e).apply(this._boundValue(), [null].concat(t));
                            e === c && s.throwLater(e.e);
                        }
                        function o(t, e) {
                            var n = this._boundValue(),
                                e = void 0 === t ? a(e).call(n, null) : a(e).call(n, null, t);
                            e === c && s.throwLater(e.e);
                        }
                        function i(t, e) {
                            t || (((n = new Error(t + "")).cause = t), (t = n));
                            var n = a(e).call(this._boundValue(), t);
                            n === c && s.throwLater(n.e);
                        }
                        var n = e("./util"),
                            s = t._async,
                            a = n.tryCatch,
                            c = n.errorObj;
                        t.prototype.asCallback = t.prototype.nodeify = function (t, e) {
                            var n;
                            return "function" == typeof t && ((n = o), void 0 !== e && Object(e).spread && (n = r), this._then(n, i, void 0, this, t)), this;
                        };
                    };
                },
                { "./util": 36 },
            ],
            22: [
                function (A, $, t) {
                    $.exports = function () {
                        function a() {}
                        function p(t) {
                            if (t !== w) {
                                var e = this,
                                    n = t;
                                if (null == e || e.constructor !== p) throw new m("the promise constructor cannot be invoked directly\n\n    See http://goo.gl/MqrFmX\n");
                                if ("function" != typeof n) throw new m("expecting a function but got " + h.classString(n));
                            }
                            (this._bitField = 0),
                                (this._fulfillmentHandler0 = void 0),
                                (this._rejectionHandler0 = void 0),
                                (this._promise0 = void 0),
                                (this._receiver0 = void 0),
                                this._resolveFromExecutor(t),
                                this._promiseCreated(),
                                this._fireEvent("promiseCreated", this);
                        }
                        function t(t) {
                            this.promise._resolveCallback(t);
                        }
                        function e(t) {
                            this.promise._rejectCallback(t, !1);
                        }
                        function n(t) {
                            var e = new p(w);
                            (e._fulfillmentHandler0 = t), (e._rejectionHandler0 = t), (e._promise0 = t), (e._receiver0 = t);
                        }
                        function s() {
                            return new m("circular promise resolution chain\n\n    See http://goo.gl/MqrFmX\n");
                        }
                        function c() {
                            return new p.PromiseInspection(this._target());
                        }
                        function l(t) {
                            return p.reject(new m(t));
                        }
                        function r() {
                            return { domain: u(), async: null };
                        }
                        function o() {
                            return { domain: u(), async: new f("Bluebird::Promise") };
                        }
                        var i = {},
                            h = A("./util"),
                            u =
                                (h.setReflectHandler(c),
                                function () {
                                    var t = process.domain;
                                    return void 0 === t ? null : t;
                                }),
                            f = h.isNode && h.nodeSupportsAsyncResource ? A("async_hooks").AsyncResource : null,
                            d = h.isNode
                                ? r
                                : function () {
                                      return null;
                                  },
                            _ = (h.notEnumerableProp(p, "_getContext", d), A("./es5")),
                            v = A("./async"),
                            y = new v(),
                            g = (_.defineProperty(p, "_async", { value: y }), A("./errors")),
                            m = (p.TypeError = g.TypeError),
                            b = ((p.RangeError = g.RangeError), (p.CancellationError = g.CancellationError)),
                            w = ((p.TimeoutError = g.TimeoutError), (p.OperationalError = g.OperationalError), (p.RejectionError = g.OperationalError), (p.AggregateError = g.AggregateError), function () {}),
                            C = {},
                            k = {},
                            j = A("./thenables")(p, w),
                            E = A("./promise_array")(p, w, j, l, a),
                            g = A("./context")(p),
                            F = g.create,
                            x = A("./debuggability")(
                                p,
                                g,
                                function () {
                                    (d = o), h.notEnumerableProp(p, "_getContext", o);
                                },
                                function () {
                                    (d = r), h.notEnumerableProp(p, "_getContext", r);
                                }
                            ),
                            T = (x.CapturedTrace, A("./finally")(p, j, k)),
                            P = A("./catch_filter")(k),
                            S = A("./nodeback"),
                            R = h.errorObj,
                            O = h.tryCatch;
                        return (
                            (p.prototype.toString = function () {
                                return "[object Promise]";
                            }),
                            (p.prototype.caught = p.prototype.catch = function (t) {
                                var e = arguments.length;
                                if (1 < e) {
                                    for (var n = new Array(e - 1), r = 0, o = 0; o < e - 1; ++o) {
                                        var i = arguments[o];
                                        if (!h.isObject(i)) return l("Catch statement predicate: expecting an object but got " + h.classString(i));
                                        n[r++] = i;
                                    }
                                    if (((n.length = r), "function" != typeof (t = arguments[o]))) throw new m("The last argument to .catch() must be a function, got " + h.toString(t));
                                    return this.then(void 0, P(n, t, this));
                                }
                                return this.then(void 0, t);
                            }),
                            (p.prototype.reflect = function () {
                                return this._then(c, c, void 0, this, void 0);
                            }),
                            (p.prototype.then = function (t, e) {
                                var n;
                                return (
                                    x.warnings() &&
                                        0 < arguments.length &&
                                        "function" != typeof t &&
                                        "function" != typeof e &&
                                        ((n = ".then() only accepts functions but was passed: " + h.classString(t)), 1 < arguments.length && (n += ", " + h.classString(e)), this._warn(n)),
                                    this._then(t, e, void 0, void 0, void 0)
                                );
                            }),
                            (p.prototype.done = function (t, e) {
                                this._then(t, e, void 0, void 0, void 0)._setIsFinal();
                            }),
                            (p.prototype.spread = function (t) {
                                return "function" != typeof t ? l("expecting a function but got " + h.classString(t)) : this.all()._then(t, void 0, void 0, C, void 0);
                            }),
                            (p.prototype.toJSON = function () {
                                var t = { isFulfilled: !1, isRejected: !1, fulfillmentValue: void 0, rejectionReason: void 0 };
                                return this.isFulfilled() ? ((t.fulfillmentValue = this.value()), (t.isFulfilled = !0)) : this.isRejected() && ((t.rejectionReason = this.reason()), (t.isRejected = !0)), t;
                            }),
                            (p.prototype.all = function () {
                                return 0 < arguments.length && this._warn(".all() was passed arguments but it does not take any"), new E(this).promise();
                            }),
                            (p.prototype.error = function (t) {
                                return this.caught(h.originatesFromRejection, t);
                            }),
                            (p.getNewLibraryCopy = $.exports),
                            (p.is = function (t) {
                                return t instanceof p;
                            }),
                            (p.fromNode = p.fromCallback = function (t) {
                                var e = new p(w),
                                    n = (e._captureStackTrace(), 1 < arguments.length && !!Object(arguments[1]).multiArgs),
                                    t = O(t)(S(e, n));
                                return t === R && e._rejectCallback(t.e, !0), e._isFateSealed() || e._setAsyncGuaranteed(), e;
                            }),
                            (p.all = function (t) {
                                return new E(t).promise();
                            }),
                            (p.resolve = p.fulfilled = p.cast = function (t) {
                                var e = j(t);
                                return e instanceof p || ((e = new p(w))._captureStackTrace(), e._setFulfilled(), (e._rejectionHandler0 = t)), e;
                            }),
                            (p.reject = p.rejected = function (t) {
                                var e = new p(w);
                                return e._captureStackTrace(), e._rejectCallback(t, !0), e;
                            }),
                            (p.setScheduler = function (t) {
                                if ("function" != typeof t) throw new m("expecting a function but got " + h.classString(t));
                                return y.setScheduler(t);
                            }),
                            (p.prototype._then = function (t, e, n, r, o) {
                                var i,
                                    s,
                                    a,
                                    c = void 0 !== o,
                                    o = c ? o : new p(w),
                                    l = this._target(),
                                    u = l._bitField,
                                    c =
                                        (c ||
                                            (o._propagateFrom(this, 3),
                                            o._captureStackTrace(),
                                            void 0 === r && 0 != (2097152 & this._bitField) && (r = 0 != (50397184 & u) ? this._boundValue() : l === this ? void 0 : this._boundTo),
                                            this._fireEvent("promiseChained", this, o)),
                                        d());
                                return (
                                    0 != (50397184 & u)
                                        ? ((a = l._settlePromiseCtx),
                                          0 != (33554432 & u)
                                              ? ((s = l._rejectionHandler0), (i = t))
                                              : 0 != (16777216 & u)
                                              ? ((s = l._fulfillmentHandler0), (i = e), l._unsetRejectionIsUnhandled())
                                              : ((a = l._settlePromiseLateCancellationObserver), (s = new b("late cancellation observer")), l._attachExtraTrace(s), (i = e)),
                                          y.invoke(a, l, { handler: h.contextBind(c, i), promise: o, receiver: r, value: s }))
                                        : l._addCallbacks(t, e, o, r, c),
                                    o
                                );
                            }),
                            (p.prototype._length = function () {
                                return 65535 & this._bitField;
                            }),
                            (p.prototype._isFateSealed = function () {
                                return 0 != (117506048 & this._bitField);
                            }),
                            (p.prototype._isFollowing = function () {
                                return 67108864 == (67108864 & this._bitField);
                            }),
                            (p.prototype._setLength = function (t) {
                                this._bitField = (-65536 & this._bitField) | (65535 & t);
                            }),
                            (p.prototype._setFulfilled = function () {
                                (this._bitField = 33554432 | this._bitField), this._fireEvent("promiseFulfilled", this);
                            }),
                            (p.prototype._setRejected = function () {
                                (this._bitField = 16777216 | this._bitField), this._fireEvent("promiseRejected", this);
                            }),
                            (p.prototype._setFollowing = function () {
                                (this._bitField = 67108864 | this._bitField), this._fireEvent("promiseResolved", this);
                            }),
                            (p.prototype._setIsFinal = function () {
                                this._bitField = 4194304 | this._bitField;
                            }),
                            (p.prototype._isFinal = function () {
                                return 0 < (4194304 & this._bitField);
                            }),
                            (p.prototype._unsetCancelled = function () {
                                this._bitField = -65537 & this._bitField;
                            }),
                            (p.prototype._setCancelled = function () {
                                (this._bitField = 65536 | this._bitField), this._fireEvent("promiseCancelled", this);
                            }),
                            (p.prototype._setWillBeCancelled = function () {
                                this._bitField = 8388608 | this._bitField;
                            }),
                            (p.prototype._setAsyncGuaranteed = function () {
                                var t;
                                y.hasCustomScheduler() || ((t = this._bitField), (this._bitField = t | (((536870912 & t) >> 2) ^ 134217728)));
                            }),
                            (p.prototype._setNoAsyncGuarantee = function () {
                                this._bitField = -134217729 & (536870912 | this._bitField);
                            }),
                            (p.prototype._receiverAt = function (t) {
                                t = 0 === t ? this._receiver0 : this[4 * t - 4 + 3];
                                return t === i ? void 0 : void 0 === t && this._isBound() ? this._boundValue() : t;
                            }),
                            (p.prototype._promiseAt = function (t) {
                                return this[4 * t - 4 + 2];
                            }),
                            (p.prototype._fulfillmentHandlerAt = function (t) {
                                return this[4 * t - 4];
                            }),
                            (p.prototype._rejectionHandlerAt = function (t) {
                                return this[4 * t - 4 + 1];
                            }),
                            (p.prototype._boundValue = function () {}),
                            (p.prototype._migrateCallback0 = function (t) {
                                t._bitField;
                                var e = t._fulfillmentHandler0,
                                    n = t._rejectionHandler0,
                                    r = t._promise0,
                                    t = t._receiverAt(0);
                                this._addCallbacks(e, n, r, (t = void 0 === t ? i : t), null);
                            }),
                            (p.prototype._migrateCallbackAt = function (t, e) {
                                var n = t._fulfillmentHandlerAt(e),
                                    r = t._rejectionHandlerAt(e),
                                    o = t._promiseAt(e),
                                    t = t._receiverAt(e);
                                this._addCallbacks(n, r, o, (t = void 0 === t ? i : t), null);
                            }),
                            (p.prototype._addCallbacks = function (t, e, n, r, o) {
                                var i,
                                    s = this._length();
                                return (
                                    65531 <= s && this._setLength((s = 0)),
                                    0 === s
                                        ? ((this._promise0 = n), (this._receiver0 = r), "function" == typeof t && (this._fulfillmentHandler0 = h.contextBind(o, t)), "function" == typeof e && (this._rejectionHandler0 = h.contextBind(o, e)))
                                        : ((this[2 + (i = 4 * s - 4)] = n), (this[3 + i] = r), "function" == typeof t && (this[i] = h.contextBind(o, t)), "function" == typeof e && (this[1 + i] = h.contextBind(o, e))),
                                    this._setLength(s + 1),
                                    s
                                );
                            }),
                            (p.prototype._proxy = function (t, e) {
                                this._addCallbacks(void 0, void 0, e, t, null);
                            }),
                            (p.prototype._resolveCallback = function (t, e) {
                                if (0 == (117506048 & this._bitField)) {
                                    if (t === this) return this._rejectCallback(s(), !1);
                                    var n = j(t, this);
                                    if (!(n instanceof p)) return this._fulfill(t);
                                    e && this._propagateFrom(n, 2);
                                    var r = n._target();
                                    if (r === this) this._reject(s());
                                    else {
                                        t = r._bitField;
                                        if (0 == (50397184 & t)) {
                                            var o = this._length();
                                            0 < o && r._migrateCallback0(this);
                                            for (var i = 1; i < o; ++i) r._migrateCallbackAt(this, i);
                                            this._setFollowing(), this._setLength(0), this._setFollowee(n);
                                        } else 0 != (33554432 & t) ? this._fulfill(r._value()) : 0 != (16777216 & t) ? this._reject(r._reason()) : ((e = new b("late cancellation observer")), r._attachExtraTrace(e), this._reject(e));
                                    }
                                }
                            }),
                            (p.prototype._rejectCallback = function (t, e, n) {
                                var r = h.ensureErrorObject(t),
                                    o = r === t;
                                o || n || !x.warnings() || ((n = "a promise was rejected with a non-error: " + h.classString(t)), this._warn(n, !0)), this._attachExtraTrace(r, !!e && o), this._reject(t);
                            }),
                            (p.prototype._resolveFromExecutor = function (t) {
                                var e, n;
                                t !== w &&
                                    ((e = this)._captureStackTrace(),
                                    this._pushContext(),
                                    (n = !0),
                                    (t = this._execute(
                                        t,
                                        function (t) {
                                            e._resolveCallback(t);
                                        },
                                        function (t) {
                                            e._rejectCallback(t, n);
                                        }
                                    )),
                                    (n = !1),
                                    this._popContext(),
                                    void 0 !== t) &&
                                    e._rejectCallback(t, !0);
                            }),
                            (p.prototype._settlePromiseFromHandler = function (t, e, n, r) {
                                var o;
                                0 == (65536 & r._bitField) &&
                                    (r._pushContext(),
                                    e === C ? (n && "number" == typeof n.length ? (o = O(t).apply(this._boundValue(), n)) : ((o = R).e = new m("cannot .spread() a non-array: " + h.classString(n)))) : (o = O(t).call(e, n)),
                                    (t = r._popContext()),
                                    0 == (65536 & r._bitField)) &&
                                    (o === k ? r._reject(n) : o === R ? r._rejectCallback(o.e, !1) : (x.checkForgottenReturns(o, t, "", r, this), r._resolveCallback(o)));
                            }),
                            (p.prototype._target = function () {
                                for (var t = this; t._isFollowing(); ) t = t._followee();
                                return t;
                            }),
                            (p.prototype._followee = function () {
                                return this._rejectionHandler0;
                            }),
                            (p.prototype._setFollowee = function (t) {
                                this._rejectionHandler0 = t;
                            }),
                            (p.prototype._settlePromise = function (t, e, n, r) {
                                var o = t instanceof p,
                                    i = this._bitField,
                                    s = 0 != (134217728 & i);
                                0 != (65536 & i)
                                    ? (o && t._invokeInternalOnCancel(),
                                      n instanceof T && n.isFinallyHandler()
                                          ? ((n.cancelPromise = t), O(e).call(n, r) === R && t._reject(R.e))
                                          : e === c
                                          ? t._fulfill(c.call(n))
                                          : n instanceof a
                                          ? n._promiseCancelled(t)
                                          : o || t instanceof E
                                          ? t._cancel()
                                          : n.cancel())
                                    : "function" == typeof e
                                    ? o
                                        ? (s && t._setAsyncGuaranteed(), this._settlePromiseFromHandler(e, n, r, t))
                                        : e.call(n, r, t)
                                    : n instanceof a
                                    ? n._isResolved() || (0 != (33554432 & i) ? n._promiseFulfilled(r, t) : n._promiseRejected(r, t))
                                    : o && (s && t._setAsyncGuaranteed(), 0 != (33554432 & i) ? t._fulfill(r) : t._reject(r));
                            }),
                            (p.prototype._settlePromiseLateCancellationObserver = function (t) {
                                var e = t.handler,
                                    n = t.promise,
                                    r = t.receiver,
                                    t = t.value;
                                "function" == typeof e ? (n instanceof p ? this._settlePromiseFromHandler(e, r, t, n) : e.call(r, t, n)) : n instanceof p && n._reject(t);
                            }),
                            (p.prototype._settlePromiseCtx = function (t) {
                                this._settlePromise(t.promise, t.handler, t.receiver, t.value);
                            }),
                            (p.prototype._settlePromise0 = function (t, e, n) {
                                var r = this._promise0,
                                    o = this._receiverAt(0);
                                (this._promise0 = void 0), (this._receiver0 = void 0), this._settlePromise(r, t, o, e);
                            }),
                            (p.prototype._clearCallbackDataAtIndex = function (t) {
                                t = 4 * t - 4;
                                this[2 + t] = this[3 + t] = this[t] = this[1 + t] = void 0;
                            }),
                            (p.prototype._fulfill = function (t) {
                                var e,
                                    n = this._bitField;
                                if (!((117506048 & n) >>> 16)) {
                                    if (t === this) return (e = s()), this._attachExtraTrace(e), this._reject(e);
                                    this._setFulfilled(), (this._rejectionHandler0 = t), 0 < (65535 & n) && (0 != (134217728 & n) ? this._settlePromises() : y.settlePromises(this), this._dereferenceTrace());
                                }
                            }),
                            (p.prototype._reject = function (t) {
                                var e = this._bitField;
                                if (!((117506048 & e) >>> 16))
                                    return this._setRejected(), (this._fulfillmentHandler0 = t), this._isFinal() ? y.fatalError(t, h.isNode) : void (0 < (65535 & e) ? y.settlePromises(this) : this._ensurePossibleRejectionHandled());
                            }),
                            (p.prototype._fulfillPromises = function (t, e) {
                                for (var n = 1; n < t; n++) {
                                    var r = this._fulfillmentHandlerAt(n),
                                        o = this._promiseAt(n),
                                        i = this._receiverAt(n);
                                    this._clearCallbackDataAtIndex(n), this._settlePromise(o, r, i, e);
                                }
                            }),
                            (p.prototype._rejectPromises = function (t, e) {
                                for (var n = 1; n < t; n++) {
                                    var r = this._rejectionHandlerAt(n),
                                        o = this._promiseAt(n),
                                        i = this._receiverAt(n);
                                    this._clearCallbackDataAtIndex(n), this._settlePromise(o, r, i, e);
                                }
                            }),
                            (p.prototype._settlePromises = function () {
                                var t,
                                    e = this._bitField,
                                    n = 65535 & e;
                                0 < n &&
                                    (0 != (16842752 & e)
                                        ? ((t = this._fulfillmentHandler0), this._settlePromise0(this._rejectionHandler0, t, e), this._rejectPromises(n, t))
                                        : ((t = this._rejectionHandler0), this._settlePromise0(this._fulfillmentHandler0, t, e), this._fulfillPromises(n, t)),
                                    this._setLength(0)),
                                    this._clearCancellationData();
                            }),
                            (p.prototype._settledValue = function () {
                                var t = this._bitField;
                                return 0 != (33554432 & t) ? this._rejectionHandler0 : 0 != (16777216 & t) ? this._fulfillmentHandler0 : void 0;
                            }),
                            "undefined" != typeof Symbol &&
                                Symbol.toStringTag &&
                                _.defineProperty(p.prototype, Symbol.toStringTag, {
                                    get: function () {
                                        return "Object";
                                    },
                                }),
                            (p.defer = p.pending = function () {
                                return x.deprecated("Promise.defer", "new Promise"), { promise: new p(w), resolve: t, reject: e };
                            }),
                            h.notEnumerableProp(p, "_makeSelfResolutionError", s),
                            A("./method")(p, w, j, l, x),
                            A("./bind")(p, w, j, x),
                            A("./cancel")(p, E, l, x),
                            A("./direct_resolve")(p),
                            A("./synchronous_inspection")(p),
                            A("./join")(p, E, j, w, y),
                            ((p.Promise = p).version = "3.7.2"),
                            A("./call_get.js")(p),
                            A("./generators.js")(p, l, w, j, a, x),
                            A("./map.js")(p, E, l, j, w, x),
                            A("./nodeify.js")(p),
                            A("./promisify.js")(p, w),
                            A("./props.js")(p, E, j, l),
                            A("./race.js")(p, w, j, l),
                            A("./reduce.js")(p, E, l, j, w, x),
                            A("./settle.js")(p, E, x),
                            A("./some.js")(p, E, l),
                            A("./timers.js")(p, w, x),
                            A("./using.js")(p, l, j, F, w, x),
                            A("./any.js")(p),
                            A("./each.js")(p, w),
                            A("./filter.js")(p, w),
                            h.toFastProperties(p),
                            h.toFastProperties(p.prototype),
                            n({ a: 1 }),
                            n({ b: 2 }),
                            n({ c: 3 }),
                            n(1),
                            n(function () {}),
                            n(void 0),
                            n(!1),
                            n(new p(w)),
                            x.setBounds(v.firstLineError, h.lastLineError),
                            p
                        );
                    };
                },
                {
                    "./any.js": 1,
                    "./async": 2,
                    "./bind": 3,
                    "./call_get.js": 5,
                    "./cancel": 6,
                    "./catch_filter": 7,
                    "./context": 8,
                    "./debuggability": 9,
                    "./direct_resolve": 10,
                    "./each.js": 11,
                    "./errors": 12,
                    "./es5": 13,
                    "./filter.js": 14,
                    "./finally": 15,
                    "./generators.js": 16,
                    "./join": 17,
                    "./map.js": 18,
                    "./method": 19,
                    "./nodeback": 20,
                    "./nodeify.js": 21,
                    "./promise_array": 23,
                    "./promisify.js": 24,
                    "./props.js": 25,
                    "./race.js": 27,
                    "./reduce.js": 28,
                    "./settle.js": 30,
                    "./some.js": 31,
                    "./synchronous_inspection": 32,
                    "./thenables": 33,
                    "./timers.js": 34,
                    "./using.js": 35,
                    "./util": 36,
                    async_hooks: void 0,
                },
            ],
            23: [
                function (r, t, e) {
                    t.exports = function (a, n, c, i, t) {
                        function e(t) {
                            var e = (this._promise = new a(n));
                            t instanceof a && (e._propagateFrom(t, 3), t.suppressUnhandledRejections()), e._setOnCancel(this), (this._values = t), (this._length = 0), (this._totalResolved = 0), this._init(void 0, -2);
                        }
                        var s = r("./util");
                        return (
                            s.isArray,
                            s.inherits(e, t),
                            (e.prototype.length = function () {
                                return this._length;
                            }),
                            (e.prototype.promise = function () {
                                return this._promise;
                            }),
                            (e.prototype._init = function t(e, n) {
                                if ((r = c(this._values, this._promise)) instanceof a) {
                                    var r,
                                        o = (r = r._target())._bitField;
                                    if (((this._values = r), 0 == (50397184 & o))) return this._promise._setAsyncGuaranteed(), r._then(t, this._reject, void 0, this, n);
                                    if (0 == (33554432 & o)) return 0 != (16777216 & o) ? this._reject(r._reason()) : this._cancel();
                                    r = r._value();
                                }
                                if (null !== (r = s.asArray(r)))
                                    return 0 === r.length
                                        ? void (-5 === n
                                              ? this._resolveEmptyArray()
                                              : this._resolve(
                                                    (function (t) {
                                                        switch (t) {
                                                            case -2:
                                                                return [];
                                                            case -3:
                                                                return {};
                                                            case -6:
                                                                return new Map();
                                                        }
                                                    })(n)
                                                ))
                                        : void this._iterate(r);
                                (o = i("expecting an array or an iterable object but got " + s.classString(r)).reason()), this._promise._rejectCallback(o, !1);
                            }),
                            (e.prototype._iterate = function (t) {
                                var e = this.getActualLength(t.length);
                                (this._length = e), (this._values = this.shouldCopyValues() ? new Array(e) : this._values);
                                for (var n = this._promise, r = !1, o = null, i = 0; i < e; ++i) {
                                    var s = c(t[i], n),
                                        o = s instanceof a ? (s = s._target())._bitField : null;
                                    r
                                        ? null !== o && s.suppressUnhandledRejections()
                                        : null !== o
                                        ? 0 == (50397184 & o)
                                            ? (s._proxy(this, i), (this._values[i] = s))
                                            : (r = 0 != (33554432 & o) ? this._promiseFulfilled(s._value(), i) : 0 != (16777216 & o) ? this._promiseRejected(s._reason(), i) : this._promiseCancelled(i))
                                        : (r = this._promiseFulfilled(s, i));
                                }
                                r || n._setAsyncGuaranteed();
                            }),
                            (e.prototype._isResolved = function () {
                                return null === this._values;
                            }),
                            (e.prototype._resolve = function (t) {
                                (this._values = null), this._promise._fulfill(t);
                            }),
                            (e.prototype._cancel = function () {
                                !this._isResolved() && this._promise._isCancellable() && ((this._values = null), this._promise._cancel());
                            }),
                            (e.prototype._reject = function (t) {
                                (this._values = null), this._promise._rejectCallback(t, !1);
                            }),
                            (e.prototype._promiseFulfilled = function (t, e) {
                                return (this._values[e] = t), ++this._totalResolved >= this._length && (this._resolve(this._values), !0);
                            }),
                            (e.prototype._promiseCancelled = function () {
                                return this._cancel(), !0;
                            }),
                            (e.prototype._promiseRejected = function (t) {
                                return this._totalResolved++, this._reject(t), !0;
                            }),
                            (e.prototype._resultCancelled = function () {
                                if (!this._isResolved()) {
                                    var t = this._values;
                                    if ((this._cancel(), t instanceof a)) t.cancel();
                                    else for (var e = 0; e < t.length; ++e) t[e] instanceof a && t[e].cancel();
                                }
                            }),
                            (e.prototype.shouldCopyValues = function () {
                                return !0;
                            }),
                            (e.prototype.getActualLength = function (t) {
                                return t;
                            }),
                            e
                        );
                    };
                },
                { "./util": 36 },
            ],
            24: [
                function (n, t, e) {
                    t.exports = function (l, u) {
                        function r(t) {
                            return !e.test(t);
                        }
                        function g(t) {
                            try {
                                return !0 === t.__isPromisified__;
                            } catch (t) {
                                return !1;
                            }
                        }
                        function f(t, e, n, r) {
                            for (var o, i = m.inheritedDataKeys(t), s = [], a = 0; a < i.length; ++a) {
                                var c = i[a],
                                    l = t[c],
                                    u = r === C || C(c, l, t);
                                "function" != typeof l || g(l) || ((o = t), (o = m.getDataPropertyOrDefault(o, c + e, w)) && g(o)) || !r(c, l, t, u) || s.push(c, l);
                            }
                            for (var p = s, h = e, f = n, d = 0; d < p.length; d += 2) {
                                var _ = p[d];
                                if (f.test(_))
                                    for (var v = _.replace(f, ""), y = 0; y < p.length; y += 2)
                                        if (p[y] === v) throw new b("Cannot promisify an API that has normal methods with '%s'-suffix\n\n    See http://goo.gl/MqrFmX\n".replace("%s", h));
                            }
                            return s;
                        }
                        function p(t, e, n, r, o) {
                            for (var i = new RegExp(e.replace(/([$])/, "\\$") + "$"), s = f(t, e, i, n), a = 0, c = s.length; a < c; a += 2) {
                                var l,
                                    u = s[a],
                                    p = s[a + 1],
                                    h = u + e;
                                r === y
                                    ? (t[h] = y(u, d, u, p, e, o))
                                    : ((l = r(p, function () {
                                          return y(u, d, u, p, e, o);
                                      })),
                                      m.notEnumerableProp(l, "__isPromisified__", !0),
                                      (t[h] = l));
                            }
                            return m.toFastProperties(t), t;
                        }
                        var d = {},
                            m = n("./util"),
                            h = n("./nodeback"),
                            _ = m.withAppended,
                            v = m.maybeWrapAsError,
                            t = m.canEvaluate,
                            b = n("./errors").TypeError,
                            w = { __isPromisified__: !0 },
                            e = new RegExp("^(?:" + ["arity", "length", "name", "arguments", "caller", "callee", "prototype", "__isPromisified__"].join("|") + ")$"),
                            C = function (t) {
                                return m.isIdentifier(t) && "_" !== t.charAt(0) && "constructor" !== t;
                            },
                            y = t
                                ? void 0
                                : function (o, i, t, e, n, s) {
                                      function r() {
                                          var t = i,
                                              e = (i === d && (t = this), new l(u)),
                                              n = (e._captureStackTrace(), "string" == typeof c && this !== a ? this[c] : o),
                                              r = h(e, s);
                                          try {
                                              n.apply(t, _(arguments, r));
                                          } catch (t) {
                                              e._rejectCallback(v(t), !0, !0);
                                          }
                                          return e._isFateSealed() || e._setAsyncGuaranteed(), e;
                                      }
                                      var a = (function () {
                                              return this;
                                          })(),
                                          c = o;
                                      return "string" == typeof c && (o = e), m.notEnumerableProp(r, "__isPromisified__", !0), r;
                                  };
                        (l.promisify = function (t, e) {
                            if ("function" != typeof t) throw new b("expecting a function but got " + m.classString(t));
                            var n;
                            return g(t) ? t : ((n = void 0 === (e = Object(e)).context ? d : e.context), (e = !!e.multiArgs), (n = y(t, n, void 0, t, null, e)), m.copyDescriptors(t, n, r), n);
                        }),
                            (l.promisifyAll = function (t, e) {
                                if ("function" != typeof t && "object" != typeof t) throw new b("the target of promisifyAll must be an object or a function\n\n    See http://goo.gl/MqrFmX\n");
                                var n = !!(e = Object(e)).multiArgs,
                                    r = e.suffix,
                                    o = e.filter,
                                    i = ("function" != typeof o && (o = C), e.promisifier);
                                if (("function" != typeof i && (i = y), !m.isIdentifier((r = "string" != typeof r ? "Async" : r)))) throw new RangeError("suffix must be a valid identifier\n\n    See http://goo.gl/MqrFmX\n");
                                for (var s = m.inheritedDataKeys(t), a = 0; a < s.length; ++a) {
                                    var c = t[s[a]];
                                    "constructor" !== s[a] && m.isClass(c) && (p(c.prototype, r, o, i, n), p(c, r, o, i, n));
                                }
                                return p(t, r, o, i, n);
                            });
                    };
                },
                { "./errors": 12, "./nodeback": 20, "./util": 36 },
            ],
            25: [
                function (d, t, e) {
                    t.exports = function (n, t, r, o) {
                        function i(t) {
                            var e = !1;
                            if (void 0 !== a && t instanceof a) (o = h(t)), (e = !0);
                            else
                                for (var n = p.keys(t), r = n.length, o = new Array(2 * r), i = 0; i < r; ++i) {
                                    var s = n[i];
                                    (o[i] = t[s]), (o[i + r] = s);
                                }
                            this.constructor$(o), (this._isMap = e), this._init$(void 0, e ? -6 : -3);
                        }
                        function e(t) {
                            var e,
                                t = r(t);
                            return u(t)
                                ? ((e = t instanceof n ? t._then(n.props, void 0, void 0, void 0, void 0) : new i(t).promise()), t instanceof n && e._propagateFrom(t, 2), e)
                                : o("cannot await properties of a non-object\n\n    See http://goo.gl/MqrFmX\n");
                        }
                        var a,
                            s,
                            c,
                            l = d("./util"),
                            u = l.isObject,
                            p = d("./es5"),
                            h =
                                ("function" == typeof Map && (a = Map),
                                (c = 0),
                                function (t) {
                                    (s = t.size), (c = 0);
                                    var e = new Array(2 * t.size);
                                    return t.forEach(f, e), e;
                                });
                        function f(t, e) {
                            (this[c] = t), (this[c + s] = e), c++;
                        }
                        l.inherits(i, t),
                            (i.prototype._init = function () {}),
                            (i.prototype._promiseFulfilled = function (t, e) {
                                if (((this._values[e] = t), ++this._totalResolved >= this._length)) {
                                    if (this._isMap)
                                        n = (function (t) {
                                            for (var e = new a(), n = (t.length / 2) | 0, r = 0; r < n; ++r) {
                                                var o = t[n + r],
                                                    i = t[r];
                                                e.set(o, i);
                                            }
                                            return e;
                                        })(this._values);
                                    else for (var n = {}, r = this.length(), o = 0, i = this.length(); o < i; ++o) n[this._values[o + r]] = this._values[o];
                                    return this._resolve(n), !0;
                                }
                                return !1;
                            }),
                            (i.prototype.shouldCopyValues = function () {
                                return !1;
                            }),
                            (i.prototype.getActualLength = function (t) {
                                return t >> 1;
                            }),
                            (n.prototype.props = function () {
                                return e(this);
                            }),
                            (n.props = e);
                    };
                },
                { "./es5": 13, "./util": 36 },
            ],
            26: [
                function (t, e, n) {
                    function r(t) {
                        (this._capacity = t), (this._length = 0), (this._front = 0);
                    }
                    (r.prototype._willBeOverCapacity = function (t) {
                        return this._capacity < t;
                    }),
                        (r.prototype._pushOne = function (t) {
                            var e = this.length(),
                                n = (this._checkCapacity(e + 1), (this._front + e) & (this._capacity - 1));
                            (this[n] = t), (this._length = e + 1);
                        }),
                        (r.prototype.push = function (t, e, n) {
                            var r,
                                o,
                                i = this.length() + 3;
                            this._willBeOverCapacity(i)
                                ? (this._pushOne(t), this._pushOne(e), this._pushOne(n))
                                : ((r = this._front + i - 3), this._checkCapacity(i), (o = this._capacity - 1), (this[r & o] = t), (this[(1 + r) & o] = e), (this[(2 + r) & o] = n), (this._length = i));
                        }),
                        (r.prototype.shift = function () {
                            var t = this._front,
                                e = this[t];
                            return (this[t] = void 0), (this._front = (t + 1) & (this._capacity - 1)), this._length--, e;
                        }),
                        (r.prototype.length = function () {
                            return this._length;
                        }),
                        (r.prototype._checkCapacity = function (t) {
                            this._capacity < t && this._resizeTo(this._capacity << 1);
                        }),
                        (r.prototype._resizeTo = function (t) {
                            var e = this._capacity;
                            this._capacity = t;
                            for (var t = (this._front + this._length) & (e - 1), n = this, r = 0, o = this, i = e, s = t, a = 0; a < s; ++a) (o[a + i] = n[a + r]), (n[a + r] = void 0);
                        }),
                        (e.exports = r);
                },
                {},
            ],
            27: [
                function (t, e, n) {
                    e.exports = function (l, u, p, h) {
                        function n(t, e) {
                            var n = p(t);
                            if (n instanceof l) return f(n);
                            if (null === (t = d.asArray(t))) return h("expecting an array or an iterable object but got " + d.classString(t));
                            var r = new l(u);
                            void 0 !== e && r._propagateFrom(e, 3);
                            for (var o = r._fulfill, i = r._reject, s = 0, a = t.length; s < a; ++s) {
                                var c = t[s];
                                (void 0 !== c || s in t) && l.cast(c)._then(o, i, void 0, r, null);
                            }
                            return r;
                        }
                        function f(e) {
                            return e.then(function (t) {
                                return n(t, e);
                            });
                        }
                        var d = t("./util");
                        (l.race = function (t) {
                            return n(t, void 0);
                        }),
                            (l.prototype.race = function () {
                                return n(this, void 0);
                            });
                    };
                },
                { "./util": 36 },
            ],
            28: [
                function (f, t, e) {
                    t.exports = function (a, t, o, e, i, s) {
                        function c(t, e, n, r) {
                            this.constructor$(t);
                            t = a._getContext();
                            (this._fn = p.contextBind(t, e)),
                                void 0 !== n && (n = a.resolve(n))._attachCancellationCallback(this),
                                (this._initialValue = n),
                                (this._currentCancellable = null),
                                (this._eachValues = r === i ? Array(this._length) : 0 === r ? null : void 0),
                                this._promise._captureStackTrace(),
                                this._init$(void 0, -5);
                        }
                        function l(t, e) {
                            this.isFulfilled() ? e._resolve(t) : e._reject(t);
                        }
                        function n(t, e, n, r) {
                            return "function" != typeof e ? o("expecting a function but got " + p.classString(e)) : new c(t, e, n, r).promise();
                        }
                        function u(t) {
                            (this.accum = t), this.array._gotAccum(t);
                            t = e(this.value, this.array._promise);
                            return t instanceof a ? (this.array._currentCancellable = t)._then(r, void 0, void 0, this, void 0) : r.call(this, t);
                        }
                        function r(t) {
                            var e = this.array,
                                n = e._promise,
                                r = h(e._fn),
                                t =
                                    (n._pushContext(),
                                    (r = void 0 !== e._eachValues ? r.call(n._boundValue(), t, this.index, this.length) : r.call(n._boundValue(), this.accum, t, this.index, this.length)) instanceof a && (e._currentCancellable = r),
                                    n._popContext());
                            return s.checkForgottenReturns(r, t, void 0 !== e._eachValues ? "Promise.each" : "Promise.reduce", n), r;
                        }
                        var p = f("./util"),
                            h = p.tryCatch;
                        p.inherits(c, t),
                            (c.prototype._gotAccum = function (t) {
                                void 0 !== this._eachValues && null !== this._eachValues && t !== i && this._eachValues.push(t);
                            }),
                            (c.prototype._eachComplete = function (t) {
                                return null !== this._eachValues && this._eachValues.push(t), this._eachValues;
                            }),
                            (c.prototype._init = function () {}),
                            (c.prototype._resolveEmptyArray = function () {
                                this._resolve(void 0 !== this._eachValues ? this._eachValues : this._initialValue);
                            }),
                            (c.prototype.shouldCopyValues = function () {
                                return !1;
                            }),
                            (c.prototype._resolve = function (t) {
                                this._promise._resolveCallback(t), (this._values = null);
                            }),
                            (c.prototype._resultCancelled = function (t) {
                                return t === this._initialValue
                                    ? this._cancel()
                                    : void (this._isResolved() || (this._resultCancelled$(), this._currentCancellable instanceof a && this._currentCancellable.cancel(), this._initialValue instanceof a && this._initialValue.cancel()));
                            }),
                            (c.prototype._iterate = function (t) {
                                var e = (this._values = t).length,
                                    n = void 0 !== this._initialValue ? ((s = this._initialValue), 0) : ((s = a.resolve(t[0])), 1);
                                this._currentCancellable = s;
                                for (var r = n; r < e; ++r) {
                                    var o = t[r];
                                    o instanceof a && o.suppressUnhandledRejections();
                                }
                                if (!s.isRejected())
                                    for (; n < e; ++n) {
                                        var i = { accum: null, value: t[n], index: n, length: e, array: this },
                                            s = s._then(u, void 0, void 0, i, void 0);
                                        0 == (127 & n) && s._setNoAsyncGuarantee();
                                    }
                                (s = void 0 !== this._eachValues ? s._then(this._eachComplete, void 0, void 0, this, void 0) : s)._then(l, l, void 0, s, this);
                            }),
                            (a.prototype.reduce = function (t, e) {
                                return n(this, t, e, null);
                            }),
                            (a.reduce = n);
                    };
                },
                { "./util": 36 },
            ],
            29: [
                function (t, e, n) {
                    var r,
                        o,
                        i,
                        t = t("./util"),
                        s = t.getNativePromise();
                    (t =
                        t.isNode && "undefined" == typeof MutationObserver
                            ? ((r = global.setImmediate),
                              (o = process.nextTick),
                              t.isRecentNode
                                  ? function (t) {
                                        r.call(global, t);
                                    }
                                  : function (t) {
                                        o.call(process, t);
                                    })
                            : "function" == typeof s && "function" == typeof s.resolve
                            ? ((i = s.resolve()),
                              function (t) {
                                  i.then(t);
                              })
                            : "undefined" != typeof MutationObserver && ("undefined" == typeof window || !window.navigator || (!window.navigator.standalone && !window.cordova)) && "classList" in document.documentElement
                            ? (function () {
                                  var n = document.createElement("div"),
                                      r = { attributes: !0 },
                                      o = !1,
                                      i = document.createElement("div");
                                  new MutationObserver(function () {
                                      n.classList.toggle("foo"), (o = !1);
                                  }).observe(i, r);
                                  return function (t) {
                                      var e = new MutationObserver(function () {
                                          e.disconnect(), t();
                                      });
                                      e.observe(n, r), o || ((o = !0), i.classList.toggle("foo"));
                                  };
                              })()
                            : "undefined" != typeof setImmediate
                            ? function (t) {
                                  setImmediate(t);
                              }
                            : "undefined" != typeof setTimeout
                            ? function (t) {
                                  setTimeout(t, 0);
                              }
                            : function () {
                                  throw new Error("No async scheduler available\n\n    See http://goo.gl/MqrFmX\n");
                              }),
                        (e.exports = t);
                },
                { "./util": 36 },
            ],
            30: [
                function (i, t, e) {
                    t.exports = function (t, e, n) {
                        function r(t) {
                            this.constructor$(t);
                        }
                        var o = t.PromiseInspection;
                        i("./util").inherits(r, e),
                            (r.prototype._promiseResolved = function (t, e) {
                                return (this._values[t] = e), ++this._totalResolved >= this._length && (this._resolve(this._values), !0);
                            }),
                            (r.prototype._promiseFulfilled = function (t, e) {
                                var n = new o();
                                return (n._bitField = 33554432), (n._settledValueField = t), this._promiseResolved(e, n);
                            }),
                            (r.prototype._promiseRejected = function (t, e) {
                                var n = new o();
                                return (n._bitField = 16777216), (n._settledValueField = t), this._promiseResolved(e, n);
                            }),
                            (t.settle = function (t) {
                                return n.deprecated(".settle()", ".reflect()"), new r(t).promise();
                            }),
                            (t.allSettled = function (t) {
                                return new r(t).promise();
                            }),
                            (t.prototype.settle = function () {
                                return t.settle(this);
                            });
                    };
                },
                { "./util": 36 },
            ],
            31: [
                function (u, t, e) {
                    t.exports = function (t, e, r) {
                        function o(t) {
                            this.constructor$(t), (this._howMany = 0), (this._unwrap = !1), (this._initialized = !1);
                        }
                        function n(t, e) {
                            var n;
                            return (0 | e) !== e || e < 0 ? r("expecting a positive integer\n\n    See http://goo.gl/MqrFmX\n") : ((n = (t = new o(t)).promise()), t.setHowMany(e), t.init(), n);
                        }
                        var i = u("./util"),
                            s = u("./errors").RangeError,
                            a = u("./errors").AggregateError,
                            c = i.isArray,
                            l = {};
                        i.inherits(o, e),
                            (o.prototype._init = function () {
                                var t;
                                this._initialized &&
                                    (0 === this._howMany
                                        ? this._resolve([])
                                        : (this._init$(void 0, -5), (t = c(this._values)), !this._isResolved() && t && this._howMany > this._canPossiblyFulfill() && this._reject(this._getRangeError(this.length()))));
                            }),
                            (o.prototype.init = function () {
                                (this._initialized = !0), this._init();
                            }),
                            (o.prototype.setUnwrap = function () {
                                this._unwrap = !0;
                            }),
                            (o.prototype.howMany = function () {
                                return this._howMany;
                            }),
                            (o.prototype.setHowMany = function (t) {
                                this._howMany = t;
                            }),
                            (o.prototype._promiseFulfilled = function (t) {
                                return (
                                    this._addFulfilled(t),
                                    this._fulfilled() === this.howMany() && ((this._values.length = this.howMany()), 1 === this.howMany() && this._unwrap ? this._resolve(this._values[0]) : this._resolve(this._values), !0)
                                );
                            }),
                            (o.prototype._promiseRejected = function (t) {
                                return this._addRejected(t), this._checkOutcome();
                            }),
                            (o.prototype._promiseCancelled = function () {
                                return this._values instanceof t || null == this._values ? this._cancel() : (this._addRejected(l), this._checkOutcome());
                            }),
                            (o.prototype._checkOutcome = function () {
                                if (this.howMany() > this._canPossiblyFulfill()) {
                                    for (var t = new a(), e = this.length(); e < this._values.length; ++e) this._values[e] !== l && t.push(this._values[e]);
                                    return 0 < t.length ? this._reject(t) : this._cancel(), !0;
                                }
                                return !1;
                            }),
                            (o.prototype._fulfilled = function () {
                                return this._totalResolved;
                            }),
                            (o.prototype._rejected = function () {
                                return this._values.length - this.length();
                            }),
                            (o.prototype._addRejected = function (t) {
                                this._values.push(t);
                            }),
                            (o.prototype._addFulfilled = function (t) {
                                this._values[this._totalResolved++] = t;
                            }),
                            (o.prototype._canPossiblyFulfill = function () {
                                return this.length() - this._rejected();
                            }),
                            (o.prototype._getRangeError = function (t) {
                                t = "Input array must contain at least " + this._howMany + " items but contains only " + t + " items";
                                return new s(t);
                            }),
                            (o.prototype._resolveEmptyArray = function () {
                                this._reject(this._getRangeError(0));
                            }),
                            (t.some = n),
                            (t.prototype.some = function (t) {
                                return n(this, t);
                            }),
                            (t._SomePromiseArray = o);
                    };
                },
                { "./errors": 12, "./util": 36 },
            ],
            32: [
                function (t, e, n) {
                    e.exports = function (t) {
                        function e(t) {
                            void 0 !== t ? ((t = t._target()), (this._bitField = t._bitField), (this._settledValueField = t._isFateSealed() ? t._settledValue() : void 0)) : ((this._bitField = 0), (this._settledValueField = void 0));
                        }
                        e.prototype._settledValue = function () {
                            return this._settledValueField;
                        };
                        var n = (e.prototype.value = function () {
                                if (this.isFulfilled()) return this._settledValue();
                                throw new TypeError("cannot get fulfillment value of a non-fulfilled promise\n\n    See http://goo.gl/MqrFmX\n");
                            }),
                            r = (e.prototype.error = e.prototype.reason = function () {
                                if (this.isRejected()) return this._settledValue();
                                throw new TypeError("cannot get rejection reason of a non-rejected promise\n\n    See http://goo.gl/MqrFmX\n");
                            }),
                            o = (e.prototype.isFulfilled = function () {
                                return 0 != (33554432 & this._bitField);
                            }),
                            i = (e.prototype.isRejected = function () {
                                return 0 != (16777216 & this._bitField);
                            }),
                            s = (e.prototype.isPending = function () {
                                return 0 == (50397184 & this._bitField);
                            }),
                            a = (e.prototype.isResolved = function () {
                                return 0 != (50331648 & this._bitField);
                            });
                        (e.prototype.isCancelled = function () {
                            return 0 != (8454144 & this._bitField);
                        }),
                            (t.prototype.__isCancelled = function () {
                                return 65536 == (65536 & this._bitField);
                            }),
                            (t.prototype._isCancelled = function () {
                                return this._target().__isCancelled();
                            }),
                            (t.prototype.isCancelled = function () {
                                return 0 != (8454144 & this._target()._bitField);
                            }),
                            (t.prototype.isPending = function () {
                                return s.call(this._target());
                            }),
                            (t.prototype.isRejected = function () {
                                return i.call(this._target());
                            }),
                            (t.prototype.isFulfilled = function () {
                                return o.call(this._target());
                            }),
                            (t.prototype.isResolved = function () {
                                return a.call(this._target());
                            }),
                            (t.prototype.value = function () {
                                return n.call(this._target());
                            }),
                            (t.prototype.reason = function () {
                                var t = this._target();
                                return t._unsetRejectionIsUnhandled(), r.call(t);
                            }),
                            (t.prototype._value = function () {
                                return this._settledValue();
                            }),
                            (t.prototype._reason = function () {
                                return this._unsetRejectionIsUnhandled(), this._settledValue();
                            }),
                            (t.PromiseInspection = e);
                    };
                },
                {},
            ],
            33: [
                function (t, e, n) {
                    e.exports = function (a, c) {
                        var l = t("./util"),
                            u = l.errorObj,
                            p = l.isObject,
                            h = {}.hasOwnProperty;
                        return function (t, e) {
                            if (p(t)) {
                                if (t instanceof a) return t;
                                var n = (function (t) {
                                    try {
                                        return t.then;
                                    } catch (t) {
                                        return (u.e = t), u;
                                    }
                                })(t);
                                if (n === u) return e && e._pushContext(), (r = a.reject(n.e)), e && e._popContext(), r;
                                if ("function" == typeof n)
                                    return (function (t) {
                                        try {
                                            return h.call(t, "_promise0");
                                        } catch (t) {}
                                    })(t)
                                        ? ((r = new a(c)), t._then(r._fulfill, r._reject, void 0, r, null), r)
                                        : ((r = t),
                                          (n = n),
                                          (e = e),
                                          (o = new a(c)),
                                          (i = o),
                                          e && e._pushContext(),
                                          o._captureStackTrace(),
                                          e && e._popContext(),
                                          (s = !0),
                                          (e = l.tryCatch(n).call(
                                              r,
                                              function (t) {
                                                  o && (o._resolveCallback(t), (o = null));
                                              },
                                              function (t) {
                                                  o && (o._rejectCallback(t, s, !0), (o = null));
                                              }
                                          )),
                                          (s = !1),
                                          o && e === u && (o._rejectCallback(e.e, !0, !0), (o = null)),
                                          i);
                            }
                            var r, o, i, s;
                            return t;
                        };
                    };
                },
                { "./util": 36 },
            ],
            34: [
                function (t, e, n) {
                    e.exports = function (r, o, s) {
                        function a(t) {
                            this.handle = t;
                        }
                        function e(t) {
                            return clearTimeout(this.handle), t;
                        }
                        function n(t) {
                            throw (clearTimeout(this.handle), t);
                        }
                        function i(t) {
                            return u(+this).thenReturn(t);
                        }
                        var c = t("./util"),
                            l = r.TimeoutError,
                            u =
                                ((a.prototype._resultCancelled = function () {
                                    clearTimeout(this.handle);
                                }),
                                (r.delay = function (t, e) {
                                    var n;
                                    return (
                                        void 0 !== e
                                            ? ((n = r.resolve(e)._then(i, null, null, t, void 0)), s.cancellation() && e instanceof r && n._setOnCancel(e))
                                            : ((n = new r(o)),
                                              (e = setTimeout(function () {
                                                  n._fulfill();
                                              }, +t)),
                                              s.cancellation() && n._setOnCancel(new a(e)),
                                              n._captureStackTrace()),
                                        n._setAsyncGuaranteed(),
                                        n
                                    );
                                }));
                        r.prototype.delay = function (t) {
                            return u(t, this);
                        };
                        r.prototype.timeout = function (t, r) {
                            t = +t;
                            var o,
                                i,
                                t = new a(
                                    setTimeout(function () {
                                        var t, e, n;
                                        o.isPending() &&
                                            ((t = o),
                                            (n = i),
                                            (e = "string" != typeof (e = r) ? (e instanceof Error ? e : new l("operation timed out")) : new l(e)),
                                            c.markAsOriginatingFromRejection(e),
                                            t._attachExtraTrace(e),
                                            t._reject(e),
                                            null != n) &&
                                            n.cancel();
                                    }, t)
                                );
                            return s.cancellation() ? ((i = this.then()), (o = i._then(e, n, void 0, t, void 0))._setOnCancel(t)) : (o = this._then(e, n, void 0, t, void 0)), o;
                        };
                    };
                },
                { "./util": 36 },
            ],
            35: [
                function (s, t, e) {
                    t.exports = function (p, h, f, e, t, d) {
                        function c(t) {
                            setTimeout(function () {
                                throw t;
                            }, 0);
                        }
                        function _(r, o) {
                            var i = 0,
                                s = r.length,
                                a = new p(t);
                            return (
                                (function t() {
                                    if (s <= i) return a._fulfill();
                                    (n = r[i++]), (e = f(n)) !== n && "function" == typeof n._isDisposable && "function" == typeof n._getDisposer && n._isDisposable() && e._setDisposable(n._getDisposer());
                                    var e,
                                        n = e;
                                    if (n instanceof p && n._isDisposable()) {
                                        try {
                                            n = f(n._getDisposer().tryDispose(o), r.promise);
                                        } catch (t) {
                                            return c(t);
                                        }
                                        if (n instanceof p) return n._then(t, c, null, null, null);
                                    }
                                    t();
                                })(),
                                a
                            );
                        }
                        function v(t, e, n) {
                            (this._data = t), (this._promise = e), (this._context = n);
                        }
                        function n(t, e, n) {
                            this.constructor$(t, e, n);
                        }
                        function y(t) {
                            return v.isDisposer(t) ? (this.resources[this.index]._setDisposable(t), t.promise()) : t;
                        }
                        function g(t) {
                            (this.length = t), (this.promise = null), (this[t - 1] = null);
                        }
                        var m = s("./util"),
                            r = s("./errors").TypeError,
                            o = s("./util").inherits,
                            b = m.errorObj,
                            w = m.tryCatch,
                            i = {};
                        (v.prototype.data = function () {
                            return this._data;
                        }),
                            (v.prototype.promise = function () {
                                return this._promise;
                            }),
                            (v.prototype.resource = function () {
                                return this.promise().isFulfilled() ? this.promise().value() : i;
                            }),
                            (v.prototype.tryDispose = function (t) {
                                var e = this.resource(),
                                    n = this._context,
                                    e = (void 0 !== n && n._pushContext(), e !== i ? this.doDispose(e, t) : null);
                                return void 0 !== n && n._popContext(), this._promise._unsetDisposable(), (this._data = null), e;
                            }),
                            (v.isDisposer = function (t) {
                                return null != t && "function" == typeof t.resource && "function" == typeof t.tryDispose;
                            }),
                            o(n, v),
                            (n.prototype.doDispose = function (t, e) {
                                return this.data().call(t, t, e);
                            }),
                            (g.prototype._resultCancelled = function () {
                                for (var t = this.length, e = 0; e < t; ++e) {
                                    var n = this[e];
                                    n instanceof p && n.cancel();
                                }
                            }),
                            (p.using = function () {
                                var t = arguments.length;
                                if (t < 2) return h("you must pass at least 2 arguments to Promise.using");
                                var i = arguments[t - 1];
                                if ("function" != typeof i) return h("expecting a function but got " + m.classString(i));
                                var e,
                                    s = !0;
                                2 === t && Array.isArray(arguments[0]) ? ((t = (e = arguments[0]).length), (s = !1)) : ((e = arguments), t--);
                                for (var n = new g(t), r = 0; r < t; ++r) {
                                    var o,
                                        a = e[r];
                                    v.isDisposer(a) ? (a = (o = a).promise())._setDisposable(o) : (o = f(a)) instanceof p && (a = o._then(y, null, null, { resources: n, index: r }, void 0)), (n[r] = a);
                                }
                                for (var c = new Array(n.length), r = 0; r < c.length; ++r) c[r] = p.resolve(n[r]).reflect();
                                var l = p.all(c).then(function (t) {
                                        for (var e = 0; e < t.length; ++e) {
                                            var n = t[e];
                                            if (n.isRejected()) return (b.e = n.error()), b;
                                            if (!n.isFulfilled()) return void l.cancel();
                                            t[e] = n.value();
                                        }
                                        u._pushContext(), (i = w(i));
                                        var r = s ? i.apply(void 0, t) : i(t),
                                            o = u._popContext();
                                        return d.checkForgottenReturns(r, o, "Promise.using", u), r;
                                    }),
                                    u = l.lastly(function () {
                                        var t = new p.PromiseInspection(l);
                                        return _(n, t);
                                    });
                                return (n.promise = u)._setOnCancel(n), u;
                            }),
                            (p.prototype._setDisposable = function (t) {
                                (this._bitField = 131072 | this._bitField), (this._disposer = t);
                            }),
                            (p.prototype._isDisposable = function () {
                                return 0 < (131072 & this._bitField);
                            }),
                            (p.prototype._getDisposer = function () {
                                return this._disposer;
                            }),
                            (p.prototype._unsetDisposable = function () {
                                (this._bitField = -131073 & this._bitField), (this._disposer = void 0);
                            }),
                            (p.prototype.disposer = function (t) {
                                if ("function" == typeof t) return new n(t, this, e());
                                throw new r();
                            });
                    };
                },
                { "./errors": 12, "./util": 36 },
            ],
            36: [
                function (t, e, n) {
                    function r() {
                        try {
                            var t = u;
                            return (u = null), t.apply(this, arguments);
                        } catch (t) {
                            return (y.e = t), y;
                        }
                    }
                    function o(t) {
                        return null == t || !0 === t || !1 === t || "string" == typeof t || "number" == typeof t;
                    }
                    function i(t, e, n) {
                        return o(t) || _.defineProperty(t, e, { value: n, configurable: !0, enumerable: !1, writable: !0 }), t;
                    }
                    function s(t) {
                        try {
                            return t + "";
                        } catch (t) {
                            return "[no string representation]";
                        }
                    }
                    function a(t) {
                        return t instanceof Error || (null !== t && "object" == typeof t && "string" == typeof t.message && "string" == typeof t.name);
                    }
                    function c(t) {
                        return a(t) && _.propertyIsWritable(t, "stack");
                    }
                    function l(t) {
                        return {}.toString.call(t);
                    }
                    var u,
                        p,
                        h,
                        f,
                        d,
                        _ = t("./es5"),
                        v = "undefined" == typeof navigator,
                        y = { e: {} },
                        g = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : void 0 !== this ? this : null,
                        m =
                            ((f = [Array.prototype, Object.prototype, Function.prototype]),
                            _.isES5
                                ? ((p = Object.getOwnPropertyNames),
                                  function (t) {
                                      for (var e, n = [], r = Object.create(null); null != t && !j(t); ) {
                                          try {
                                              e = p(t);
                                          } catch (t) {
                                              return n;
                                          }
                                          for (var o = 0; o < e.length; ++o) {
                                              var i,
                                                  s = e[o];
                                              r[s] || ((r[s] = !0), null != (i = Object.getOwnPropertyDescriptor(t, s)) && null == i.get && null == i.set && n.push(s));
                                          }
                                          t = _.getPrototypeOf(t);
                                      }
                                      return n;
                                  })
                                : ((h = {}.hasOwnProperty),
                                  function (t) {
                                      if (j(t)) return [];
                                      var e = [];
                                      t: for (var n in t) {
                                          if (!h.call(t, n)) for (var r = 0; r < f.length; ++r) if (h.call(f[r], n)) continue t;
                                          e.push(n);
                                      }
                                      return e;
                                  })),
                        b = /this\s*\.\s*\S+\s*=/,
                        w = /^[a-z$_][a-z$_0-9]*$/i,
                        C =
                            "stack" in new Error()
                                ? function (t) {
                                      return c(t) ? t : new Error(s(t));
                                  }
                                : function (t) {
                                      if (c(t)) return t;
                                      try {
                                          throw new Error(s(t));
                                      } catch (t) {
                                          return t;
                                      }
                                  },
                        k = function (t) {
                            return _.isArray(t) ? t : null;
                        };
                    function j(t) {
                        for (var e = 0; e < f.length; ++e) if (f[e] === t) return 1;
                    }
                    "undefined" != typeof Symbol &&
                        Symbol.iterator &&
                        ((d =
                            "function" == typeof Array.from
                                ? function (t) {
                                      return Array.from(t);
                                  }
                                : function (t) {
                                      for (var e, n = [], r = t[Symbol.iterator](); !(e = r.next()).done; ) n.push(e.value);
                                      return n;
                                  }),
                        (k = function (t) {
                            return _.isArray(t) ? t : null != t && "function" == typeof t[Symbol.iterator] ? d(t) : null;
                        }));
                    var E,
                        F,
                        x = "undefined" != typeof process && "[object process]" === l(process).toLowerCase(),
                        T = "undefined" != typeof process && void 0 !== process.env,
                        m = {
                            setReflectHandler: function (t) {
                                E = t;
                            },
                            isClass: function (t) {
                                try {
                                    if ("function" == typeof t) {
                                        var e = _.names(t.prototype),
                                            n = _.isES5 && 1 < e.length,
                                            r = 0 < e.length && !(1 === e.length && "constructor" === e[0]),
                                            o = b.test(t + "") && 0 < _.names(t).length;
                                        if (n || r || o) return !0;
                                    }
                                    return !1;
                                } catch (t) {
                                    return !1;
                                }
                            },
                            isIdentifier: function (t) {
                                return w.test(t);
                            },
                            inheritedDataKeys: m,
                            getDataPropertyOrDefault: function (t, e, n) {
                                var r;
                                return _.isES5 ? (null != (r = Object.getOwnPropertyDescriptor(t, e)) ? (null == r.get && null == r.set ? r.value : n) : void 0) : {}.hasOwnProperty.call(t, e) ? t[e] : void 0;
                            },
                            thrower: function (t) {
                                throw t;
                            },
                            isArray: _.isArray,
                            asArray: k,
                            notEnumerableProp: i,
                            isPrimitive: o,
                            isObject: function (t) {
                                return "function" == typeof t || ("object" == typeof t && null !== t);
                            },
                            isError: a,
                            canEvaluate: v,
                            errorObj: y,
                            tryCatch: function (t) {
                                return (u = t), r;
                            },
                            inherits: function (e, n) {
                                function t() {
                                    for (var t in ((this.constructor = e), (this.constructor$ = n).prototype)) r.call(n.prototype, t) && "$" !== t.charAt(t.length - 1) && (this[t + "$"] = n.prototype[t]);
                                }
                                var r = {}.hasOwnProperty;
                                return (t.prototype = n.prototype), (e.prototype = new t()), e.prototype;
                            },
                            withAppended: function (t, e) {
                                for (var n = t.length, r = new Array(n + 1), o = 0; o < n; ++o) r[o] = t[o];
                                return (r[o] = e), r;
                            },
                            maybeWrapAsError: function (t) {
                                return o(t) ? new Error(s(t)) : t;
                            },
                            toFastProperties: function (t) {
                                function e() {}
                                function n() {
                                    r.foo;
                                }
                                e.prototype = t;
                                var r = new e();
                                return n(), n(), t;
                            },
                            filledRange: function (t, e, n) {
                                for (var r = new Array(t), o = 0; o < t; ++o) r[o] = e + o + n;
                                return r;
                            },
                            toString: s,
                            canAttachTrace: c,
                            ensureErrorObject: C,
                            originatesFromRejection: function (t) {
                                return null != t && (t instanceof Error.__BluebirdErrorTypes__.OperationalError || !0 === t.isOperational);
                            },
                            markAsOriginatingFromRejection: function (t) {
                                try {
                                    i(t, "isOperational", !0);
                                } catch (t) {}
                            },
                            classString: l,
                            copyDescriptors: function (t, e, n) {
                                for (var r = _.names(t), o = 0; o < r.length; ++o) {
                                    var i = r[o];
                                    if (n(i))
                                        try {
                                            _.defineProperty(e, i, _.getDescriptor(t, i));
                                        } catch (t) {}
                                }
                            },
                            isNode: x,
                            hasEnvVariables: T,
                            env: function (t) {
                                return T ? process.env[t] : void 0;
                            },
                            global: g,
                            getNativePromise: function () {
                                if ("function" == typeof Promise)
                                    try {
                                        if ("[object Promise]" === l(new Promise(function () {}))) return Promise;
                                    } catch (t) {}
                            },
                            contextBind: function (t, e) {
                                var n, r;
                                return (
                                    null !== t &&
                                        "function" == typeof e &&
                                        e !== E &&
                                        (null !== t.domain && (e = t.domain.bind(e)), null !== (n = t.async)) &&
                                        ((r = e),
                                        (e = function () {
                                            var t = new Array(2).concat([].slice.call(arguments));
                                            return (t[0] = r), (t[1] = this), n.runInAsyncScope.apply(n, t);
                                        })),
                                    e
                                );
                            },
                        };
                    (m.isRecentNode =
                        m.isNode && (process.versions && process.versions.node ? (F = process.versions.node.split(".").map(Number)) : process.version && (F = process.version.split(".").map(Number)), (0 === F[0] && 10 < F[1]) || 0 < F[0])),
                        (m.nodeSupportsAsyncResource =
                            m.isNode &&
                            (function () {
                                var e = !1;
                                try {
                                    e = "function" == typeof t("async_hooks").AsyncResource.prototype.runInAsyncScope;
                                } catch (t) {
                                    e = !1;
                                }
                                return e;
                            })()),
                        m.isNode && m.toFastProperties(process);
                    try {
                        throw new Error();
                    } catch (t) {
                        m.lastLineError = t;
                    }
                    e.exports = m;
                },
                { "./es5": 13, async_hooks: void 0 },
            ],
        },
        {},
        [4]
    )(4);
}),
    "undefined" != typeof window && null !== window ? (window.P = window.Promise) : "undefined" != typeof self && null !== self && (self.P = self.Promise);
var Preloader = new Promise(function (t) {
        var e = $(".preloader"),
            n = $(".spinner");
        e.length &&
            $(window).on({
                load: function () {
                    n.delay(750).fadeOut(),
                        setTimeout(function () {
                            e.delay(750).fadeOut("slow"), t();
                        }, 350);
                },
            });
    }),
    Navbar = (function () {
        var n = $(".theme-navbar"),
            t = n.data("transparent"),
            r = n.data("text-color"),
            o = n.css("background-color"),
            i = n.find(".navbar-text"),
            s = n.find('.navbar-text a:not(".btn")'),
            a = $("main").find("section:first-child");
        function e() {
            var t = $(window).scrollTop(),
                e = $(window).width(),
                t = ((t / (a.find(".bg-container").length ? a.outerHeight() : 800)) * 1.5).toString();
            992 <= e
                ? -1 == o.indexOf("a") &&
                  ((e = o.replace(")", ", " + t + ")").replace("rgb", "rgba")),
                  n.attr("style", "background-color: " + e + "!important"),
                  "0.4" < t ? (i.css("color", r), s.css("color", r)) : (i.css("color", ""), s.css("color", "")),
                  "0.97" < t) &&
                  ((e = o.replace(")", ", 0.97)").replace("rgb", "rgba")), n.attr("style", "background-color: " + e + "!important"))
                : (n.attr("style", "background-color: " + o + "!important"), i.css("color", r), s.css("color", r));
        }
        n.length &&
            void 0 !== t &&
            (e(),
            $(window).on({
                "scroll resize": function () {
                    e();
                },
            }));
    })(),
    Menu = (function () {
        var t = $(".menu-toggle"),
            e = $(".theme-navbar-overlay"),
            n = $(".theme-navbar-nav"),
            r = $(".search i"),
            o = $(".navbar-text");
        function i() {
            t.addClass("open"), e.addClass("open"), n.addClass("open"), o.css("z-index", -1);
        }
        e.length &&
            t.on({
                click: function () {
                    $(this).hasClass("open")
                        ? (n.removeClass("open"),
                          setTimeout(function () {
                              t.removeClass("open"),
                                  e.removeClass("open"),
                                  o.delay(800).queue(function (t) {
                                      $(this).css("z-index", 0), t();
                                  });
                          }, 500),
                          r.length && r.parent().removeClass("open"))
                        : i();
                },
            }),
            r.length &&
                r.on({
                    click: function () {
                        e.length && i(),
                            setTimeout(function () {
                                r.parent().addClass("open");
                            }, 500);
                    },
                });
    })(),
    DropdownToggle = (function () {
        var t = $(".dropdown-toggle"),
            e = $(".dropdown-menu");
        t.length &&
            t.on({
                click: function () {
                    var t;
                    (t = $(this)), e.not(t.next(".dropdown-menu")).slideUp(500), t.next(".dropdown-menu").slideToggle(500);
                },
            });
    })(),
    Sticky = (function () {
        var t = $('[data-toggle="sticky"]');
        function e(t) {
            var e = $(window).width();
            !(void 0 === t.data("sticky-disable-mobile") || t.data("sticky-disable-mobile")) || 992 <= e ? n(t) : t.trigger("sticky_kit:detach");
        }
        function n(t) {
            var e = t.data("sticky-offset-top") || 0,
                n = t.data("sticky-parent") || "section",
                r = void 0 === t.data("sticky-bottom") || t.data("sticky-bottom");
            t.stick_in_parent({ parent: n, offset_top: e, bottoming: r });
        }
        t.length &&
            (t.each(function () {
                e($(this));
            }),
            $(window).on({
                resize: function () {
                    t.each(function () {
                        e($(this));
                    });
                },
            }));
    })(),
    Parallax = void ($(".parallax").length && new Rellax(".parallax")),
    SmooothScroll = (function () {
        var t = $("[data-smooth-scroll]"),
            n = t.data("smooth-scroll-offset") || 0,
            r = $("html, body");
        function e(t) {
            var e = t.data("smooth-scroll-hash"),
                e = (void 0 !== e && !1 === e && (void 0).preventDefault(), t);
            (e = e.attr("href") ? e.attr("href") : e), r.stop(!0, !0).animate({ scrollTop: $(e).offset().top - n }, 800, function () {});
        }
        t.length &&
            "" !== t.hash &&
            t.on({
                click: function (t) {
                    e($(this));
                },
            });
    })(),
    BackgroundText = (function () {
        var t = $("[data-background-text], .bg-text");
        t.length &&
            t.each(function () {
                var t, e, n, r, o, i, s, a, c, l;
                (t = $(this)),
                    (e = t.data("color")),
                    (n = t.data("opacity")),
                    (r = t.data("font-size")),
                    (o = t.data("font-weight")),
                    (i = t.data("offset-x")),
                    (s = t.data("offset-y")),
                    (a = t.data("padding")),
                    (c = t.data("margin")),
                    (l = t.data("letter-spacing")),
                    t.css({ color: e, opacity: n, "font-size": r, "font-weight": o, left: i, top: s, padding: a, margin: c, "letter-spacing": l });
            });
    })(),
    Typed = (function () {
        var t = $("[data-typed-text], .typed");
        t.length &&
            t.each(function (t) {
                var e, n, r, o, i, s, a, c, l;
                (e = $(this)),
                    (t = "typed_" + (t = t)),
                    (n = e.data("typed-text").split("###")),
                    (r = void 0 === e.data("typed-loop") || e.data("typed-loop")),
                    (o = e.data("typed-speed") || 100),
                    (i = e.data("typed-back-speed") || 50),
                    (s = e.data("typed-back-delay") || 1e3),
                    (a = e.data("typed-start-delay") || 0),
                    (c = e.data("typed-cursor") || ""),
                    e.attr("data-typed-id", t),
                    (l = new Typed("[data-typed-id=" + t + "]", { strings: n, typeSpeed: o, backSpeed: i, startDelay: a, cursorChar: c, loop: r, backDelay: s })).stop(),
                    $(".preloader").length
                        ? Preloader.then(
                              function () {
                                  setTimeout(function () {
                                      l.start();
                                  }, 1500);
                              },
                              function (t) {}
                          )
                        : setTimeout(function () {
                              l.start();
                          }, 1500);
            });
    })(),
    GoogleMap = (function () {
        var t = $("[data-latlng]");
        t.length &&
            google.maps.event.addDomListener(
                window,
                "load",
                void t.each(function (t) {
                    var e,
                        n = $(this),
                        r = n.data("latlng").split(","),
                        r = { lat: parseFloat(r[0]), lng: parseFloat(r[1]) },
                        o = n.html(),
                        i = void 0 !== n.data("zoom") ? n.data("zoom") : 14,
                        s = n.data("marker"),
                        a = {},
                        c = void 0 === $(this).data("zoom-control") || n.data("zoom-control"),
                        l = void 0 === $(this).data("map-type-control") || n.data("map-type-control"),
                        u = void 0 === $(this).data("scale-control") || n.data("scale-control"),
                        p = void 0 === $(this).data("street-view-control") || n.data("street-view-control"),
                        h = void 0 === $(this).data("rotate-control") || n.data("rotate-control"),
                        f = void 0 === $(this).data("full-screen-control") || n.data("full-screen-control"),
                        d = void 0 !== $(this).data("disable-default-ui") && n.data("disable-default-ui"),
                        _ = void 0 !== $(this).data("styles") ? n.data("styles") : [],
                        v = void 0 !== $(this).data("streetview") && n.data("streetview"),
                        y = void 0 !== $(this).data("pov-heading") ? n.data("pov-heading") : 0,
                        g = void 0 !== $(this).data("pov-pitch") ? n.data("pov-pitch") : 0,
                        a = d ? { disableDefaultUI: d } : { zoomControl: c, mapTypeControl: l, scaleControl: u, streetViewControl: p, rotateControl: h, fullscreenControl: f },
                        d = { zoom: i, center: r, mapTypeId: google.maps.MapTypeId.ROADMAP, styles: _ },
                        d = $.extend(d, a),
                        m = new google.maps.Map(n.get(0), d),
                        b = (v && ((c = new google.maps.StreetViewPanorama(n.get(0), { position: r, pov: { heading: y, pitch: g } })), m.setStreetView(c)), new google.maps.Marker({ position: r, map: m, icon: s }));
                    o.length &&
                        ((e = new google.maps.InfoWindow({ content: o })),
                        google.maps.event.addListener(b, "click", function () {
                            e.open(m, b);
                        }));
                })
            );
    })(),
    Carousel = (function () {
        var t = $(".owl-carousel");
        t.length &&
            t.each(function (t) {
                var e, n;
                (e = $(this)),
                    (t = t),
                    (n = e.data("carousel-options")),
                    (t = "carousel_" + t),
                    e.hasClass("carousel-nav-pos-edge") && e.after('<div class="container-nav container" id="' + t + '"><div class="owl-nav"></div></div>'),
                    (t = $.extend({ margin: 0, stagePadding: 0, navText: ['<i class="zmdi zmdi-long-arrow-left"></i>', '<i class="zmdi zmdi-long-arrow-right"></i>'] }, n)),
                    e.owlCarousel(t);
            });
    })(),
    Player = (function () {
        var t = $(".vimeo"),
            e = $(".youtube");
        t.length && $(".vimeo").vimeo_player(), e.length && $(".youtube").YTPlayer();
    })(),
    Countdown = (function () {
        var t = $("[data-countdown]");
        t.length &&
            t.each(function () {
                var e, t;
                (e = $(this)),
                    (t = e.data("countdown")),
                    e.countdown(t, function (t) {
                        void 0 !== e.data("countdown-template") ? e.html(t.strftime(e.data("countdown-template"))) : e.html(t.strftime("%D days %H:%M:%S"));
                    });
            });
    })(),
    Isotope = (function () {
        var n = $(".grid, [data-isotope]"),
            r = $("[data-filter]"),
            t = { itemSelector: ".grid-item", layoutMode: "packery" };
        n.length &&
            ($(this),
            n.imagesLoaded(function () {
                n.isotope(t);
            }),
            r.length) &&
            r.on({
                click: function (t) {
                    var e;
                    t.preventDefault(),
                        (t = $(this)),
                        (e = t.data("filter")),
                        (e = $.extend({ filter: e }, void 0)),
                        n.isotope(e),
                        r.removeClass("active"),
                        t.addClass("active"),
                        n.data("isotope").filteredItems.length ? n.find(".no-grid-result").remove() : n.append('<p class="no-grid-result text-center text-600 py-8">Unfortunately there is no result!</p>');
                },
            });
    })();
const Animation = void (
    $("[data-aos]").length &&
    ($(".preloader").length
        ? Preloader.then(
              function () {
                  setTimeout(function () {
                      AOS.init({ offset: 150, delay: 0, once: !0 });
                  }, 1e3);
              },
              function (t) {}
          )
        : AOS.init({ offset: 150, delay: 0, once: !0 }))
);
//# sourceMappingURL=theme.js.map
