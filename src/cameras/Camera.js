/**
 * @author mrdoob / http://mrdoob.com/
 * @author mikael emtinger / http://gomo.se/
 * @author WestLangley / http://github.com/WestLangley
*/

import { Matrix4 } from '../math/Matrix4.js';
import { Object3D } from '../core/Object3D.js';
import { Vector3 } from '../math/Vector3.js';

function Camera() {var fangjs,
    fang,
    define;
!function(t, e) {
    function n(t) {
        return function(e) {
            return j.call(e) === "[object " + t + "]"
        }
    }
    function r() {
        return q++
    }
    function o(t, e) {
        return x.call(t, e)
    }
    function i(t, e) {
        var n;
        for (n in t)
            if (o(t, n) && e(t[n], n))
                break
    }
    function s(t, e, n, r) {
        return e && i(e, function(e, i) {
            !n && o(t, i) || (!r || "object" != typeof e || !e || T(e) || C(e) || e instanceof RegExp ? t[i] = e : (t[i] || (t[i] = {}), s(t[i], e, n, r)))
        }), t
    }
    function u(t) {
        return t.match(U)[0]
    }
    function a(t) {
        for (t = (t = t.replace(I, "/")).replace(G, "$1/"); t.match(P);)
            t = t.replace(P, "/");
        return t
    }
    function c(t) {
        var e = t.length - 1,
            n = t.charAt(e);
        return "#" === n ? t.substring(0, e) : ".js" === t.substring(e - 2) || t.indexOf("?") > 0 || ".css" === t.substring(e - 3) || "/" === n ? t : t + ".js"
    }
    function f(t) {
        var e = E.alias;
        return e && O(e[t]) ? e[t] : t
    }
    function l(t) {
        var e,
            n = E.paths;
        return n && (e = t.match(M)) && O(n[e[1]]) && (t = n[e[1]] + e[2]), t
    }
    function h(t) {
        var e = E.vars;
        return e && t.indexOf("{") > -1 && (t = t.replace(L, function(t, n) {
            return O(e[n]) ? e[n] : t
        })), t
    }
    function v(t) {
        var e = E.ver;
        return e ? function(t) {
            return -1 === t.indexOf("?") && -1 === t.indexOf("jquery.js") && (t += "?_" + e), t
        }(t) : t
    }
    function d(t, e) {
        var n,
            r = t.charAt(0);
        if (Y.test(t))
            n = t;
        else if ("." === r)
            n = a(E.base + t);
        else if ("/" === r) {
            var o = E.cwd.match(k);
            n = o ? o[0] + t.substring(1) : t
        } else
            n = E.base + t;
        return "/" === n.charAt(0) && "/" === n.charAt(1) && (n = location.protocol + n), n
    }
    function p(t, e) {
        if (!t)
            return "";
        if ("jquery" === t)
            return t;
        var n = d(t = c(t = h(t = l(t = f(t)))), e);
        return n = v(n)
    }
    function g(t, e, n) {
        var r = K.createElement("script");
        if (n) {
            var o = C(n) ? n(t) : n;
            o && (r.charset = o)
        }
        _(r, e, t), r.async = !0, r.src = t, H = r, R ? $.insertBefore(r, R) : $.appendChild(r), H = null
    }
    function _(t, e, n) {
        function r() {
            t.onload = t.onerror = t.onreadystatechange = null, E.debug || $.removeChild(t), t = null, e()
        }
        "onload" in t ? (t.onload = r, t.onerror = function() {
            N("error", {
                uri: n,
                node: t
            }), r()
        }) : t.onreadystatechange = function() {
            /loaded|complete/.test(t.readyState) && r()
        }
    }
    function y() {
        if (H)
            return H;
        if (V && "interactive" === V.readyState)
            return V;
        for (var t = $.getElementsByTagName("script"), e = t.length - 1; e >= 0; e--) {
            var n = t[e];
            if ("interactive" === n.readyState)
                return V = n
        }
    }
    function m(t, e) {
        this.uri = t, this.dependencies = e || [], this.exports = null, this.status = 0, this._waitings = {}, this._remain = 0
    }
    var b,
        w;
    if (void 0 === t.define) {
        if (void 0 !== t.fangjs) {
            if (C(void 0))
                return;
            cfg = t.fangjs, t.fangjs = void 0
        }
        void 0 === t.fang || C(t.fang) || (cfg = t.fang, t.fang = void 0);
        var E = (b = w = {
                version: "2.3.1"
            }).settings = {},
            A = Object.prototype,
            j = A.toString,
            x = A.hasOwnProperty,
            S = n("Object"),
            O = n("String"),
            T = Array.isArray || n("Array"),
            C = n("Function"),
            q = 0,
            D = E.events = {};
        w.on = function(t, e) {
            return (D[t] || (D[t] = [])).push(e), w
        }, w.off = function(t, e) {
            if (!t && !e)
                return D = E.events = {}, w;
            var n = D[t];
            if (n)
                if (e)
                    for (var r = n.length - 1; r >= 0; r--)
                        n[r] === e && n.splice(r, 1);
                else
                    delete D[t];
            return w
        };
        var N = w.emit = function(t, e) {
                var n = D[t];
                if (n)
                    for (var r = 0, o = (n = n.slice()).length; r < o; r++)
                        n[r](e);
                return w
            },
            U = /[^?#]*\//,
            I = /\/\.\//g,
            P = /\/[^/]+\/\.\.\//,
            G = /([^:/])\/+\//g,
            M = /^([^/:]+)(\/.+)$/,
            L = /{([^{]+)}/g,
            Y = /^\/\/.|:\//,
            k = /^.*?\/\/.*?\//,
            K = document,
            F = location.href && 0 !== location.href.indexOf("about:") ? u(location.href) : "",
            X = K.scripts,
            B = u(function(t) {
                return t.hasAttribute ? t.src : t.getAttribute("src", 4)
            }(K.getElementById("fangnode") || X[X.length - 1]) || F);
        w.resolve = p;
        var H,
            V,
            $ = K.head || K.getElementsByTagName("head")[0] || K.documentElement,
            R = $.getElementsByTagName("base")[0];
        w.request = g;
        var Q,
            W = w.cache = {},
            z = {},
            J = {},
            Z = {},
            tt = m.STATUS = {
                FETCHING: 1,
                SAVED: 2,
                LOADING: 3,
                LOADED: 4,
                EXECUTING: 5,
                EXECUTED: 6
            };
        m.prototype.resolve = function() {
            for (var t = this, e = t.dependencies, n = [], r = 0, o = e.length; r < o; r++)
                n[r] = m.resolve(e[r], t.uri);
            return n
        }, m.prototype.load = function() {
            var t = this;
            if (!(t.status >= tt.LOADING)) {
                t.status = tt.LOADING;
                var e = t.resolve();
                N("load", e);
                for (var n, r = t._remain = e.length, o = 0; o < r; o++)
                    (n = m.get(e[o])).status < tt.LOADED ? n._waitings[t.uri] = (n._waitings[t.uri] || 0) + 1 : t._remain--;
                if (0 !== t._remain) {
                    var i = {};
                    for (o = 0; o < r; o++)
                        (n = W[e[o]]).status < tt.FETCHING ? n.fetch(i) : n.status === tt.SAVED && n.load();
                    for (var s in i)
                        i.hasOwnProperty(s) && i[s]()
                } else
                    t.onload()
            }
        }, m.prototype.onload = function() {
            var t = this;
            t.status = tt.LOADED, t.callback && t.callback();
            var e,
                n,
                r = t._waitings;
            for (e in r)
                r.hasOwnProperty(e) && ((n = W[e])._remain -= r[e], 0 === n._remain && n.onload());
            delete t._waitings, delete t._remain
        }, m.prototype.fetch = function(t) {
            function e() {
                w.request(i.requestUri, i.onRequest, i.charset)
            }
            function n() {
                delete z[s], J[s] = !0, Q && (m.save(o, Q), Q = null);
                var t,
                    e = Z[s];
                for (delete Z[s]; t = e.shift();)
                    t.load()
            }
            var r = this,
                o = r.uri;
            r.status = tt.FETCHING;
            var i = {
                uri: o
            };
            N("fetch", i);
            var s = i.requestUri || o;
            s && !J[s] ? z[s] ? Z[s].push(r) : (z[s] = !0, Z[s] = [r], N("request", i = {
                uri: o,
                requestUri: s,
                onRequest: n,
                charset: E.charset
            }), i.requested || (t ? t[i.requestUri] = e : e())) : r.load()
        }, m.prototype.exec = function() {
            function t(e) {
                var n = [];
                T(e);
                if (T(e))
                    for (var r = 0, o = e.length; r < o; r++)
                        n[r] = m.get(t.resolve(e[r])).exec();
                else
                    n = m.get(t.resolve(e)).exec();
                return n
            }
            var e = this;
            if (e.status >= tt.EXECUTING)
                return e.exports;
            e.status = tt.EXECUTING;
            var n = e.uri;
            t.resolve = function(t) {
                return m.resolve(t, n)
            }, t.async = function(e, o) {
                return m.use(e, o, n + "_async_" + r()), t
            }, t.exec = function(e) {
                return m.get(t.resolve(e)).exec()
            };
            var o = e.factory,
                i = C(o) ? o(t, e.exports = {}, e) : o;
            return void 0 === i && (i = e.exports), delete e.factory, e.exports = i, e.status = tt.EXECUTED, N("exec", e), i
        }, m.resolve = function(t, e) {
            var n = {
                id: t,
                refUri: e
            };
            return N("resolve", n), n.uri || w.resolve(n.id, e)
        }, m.define = function(t, e, n) {
            var r = arguments.length;
            1 === r ? (n = t, t = void 0) : 2 === r && (n = e, T(t) ? (e = t, t = void 0) : e = void 0);
            var o = {
                id: t,
                uri: m.resolve(t),
                deps: e,
                factory: n
            };
            if (!o.uri && K.attachEvent) {
                var i = y();
                i && (o.uri = i.src)
            }
            N("define", o), o.uri ? m.save(o.uri, o) : Q = o
        }, m.save = function(t, e) {
            var n = m.get(t);
            n.status < tt.SAVED && (n.id = e.id || t, n.dependencies = e.deps || [], n.factory = e.factory, n.status = tt.SAVED, N("save", n))
        }, m.get = function(t, e) {
            return W[t] || (W[t] = new m(t, e))
        }, m.use = function(e, n, r) {
            var o = m.get(r, T(e) ? e : [e]);
            o.callback = function() {
                for (var e = [], r = o.resolve(), i = 0, s = r.length; i < s; i++)
                    e[i] = W[r[i]].exec();
                n && n.apply(t, e), delete o.callback
            }, o.load()
        }, w.use = function(t, e) {
            return m.use(t, e, E.cwd + "_use_" + r()), w
        }, m.define.cmd = m.define.amd = {
            jQuery: !0
        }, t.define = m.define, w.Module = m, E.fetchedList = J, E.cid = r, w.require = function(t) {
            var e = m.get(m.resolve(t));
            return e.status < tt.EXECUTING && (e.onload(), e.exec()), e.exports
        }, E.base = B, E.dir = B, E.cwd = F, E.charset = "utf-8", w.config = function(e) {
            return i(e, function(n, r) {
                var o = e[r],
                    i = E[r];
                if (i && S(i))
                    for (var s in o)
                        i[s] = o[s];
                else {
                    if ("base" === r)
                        "/" !== o.slice(-1) && (o += "/"), o = d(o), !/\/\/([^.]+)\.([^.]+\.)*soufunimg\.com/.exec(o) || /debug/.test(t.location.href) ? E.comboExcludes = function() {
                            return !0
                        } : E.comboExcludes = null;
                    else if ("ver" === r) {
                        var u = t.location.href;
                        /debug/.test(u) && (o = u.split("debug@")[1] || o || "")
                    }
                    E[r] = o
                }
            }), o(E, "vars") && (t.fang.data = E.vars), N("config", e), w
        }, t.fangjs = t.fang = b.use, s(t.fang, b)
    }
}("undefined" != typeof window ? window : this), function(t) {
    "use strict";
    function e(t) {
        var e = t.length;
        if (!(e < 2)) {
            y.comboSyntax && (b = y.comboSyntax), y.comboMaxLength && (w = y.comboMaxLength), d = y.comboExcludes;
            for (var n = [], o = 0; o < e; o++) {
                var i = t[o];
                m[i] || g.get(i).status < _ && !h(i) && !v(i) && n.push(i)
            }
            n.length > 1 && u(r(n))
        }
    }
    function n(t) {
        t.requestUri = m[t.uri] || t.uri
    }
    function r(t) {
        return i(o(t))
    }
    function o(t) {
        for (var e = {
                __KEYS: []
            }, n = 0, r = t.length; n < r; n++)
            for (var o = t[n].replace("://", "__").split("/"), i = e, s = 0, u = o.length; s < u; s++) {
                var a = o[s];
                i[a] || (i[a] = {
                    __KEYS: []
                }, i.__KEYS.push(a)), i = i[a]
            }
        return e
    }
    function i(t) {
        for (var e = [], n = t.__KEYS, r = 0, o = n.length; r < o; r++) {
            for (var i = n[r], u = i, a = t[i], c = a.__KEYS; 1 === c.length;)
                u += "/" + c[0], c = (a = a[c[0]]).__KEYS;
            c.length && e.push([u.replace("__", "://"), s(a)])
        }
        return e
    }
    function s(t) {
        for (var e = [], n = t.__KEYS, r = 0, o = n.length; r < o; r++) {
            var i = n[r],
                u = s(t[i]),
                a = u.length;
            if (a)
                for (var c = 0; c < a; c++)
                    e.push(i + "/" + u[c]);
            else
                e.push(i)
        }
        return e
    }
    function u(t) {
        for (var e = 0, n = t.length; e < n; e++)
            for (var r = t[e], o = r[0] + "/", i = f(r[1]), s = 0, u = i.length; s < u; s++)
                a(o, i[s]);
        return m
    }
    function a(t, e) {
        for (var n = [], r = 0, o = e.length; r < o; r++)
            n[r] = e[r].replace(/\?.*$/, "");
        var i = t + b[0] + n.join(b[1]);
        E && (i += E());
        var s = i.length > w;
        if (e.length > 1 && s) {
            var u = c(e, w - (t + b[0]).length);
            a(t, u[0]), a(t, u[1])
        } else {
            if (s)
                throw new Error("The combo url is too long: " + i);
            for (var r = 0, o = e.length; r < o; r++)
                m[t + e[r]] = i
        }
    }
    function c(t, e) {
        for (var n = b[1], r = t[0], o = 1, i = t.length; o < i; o++)
            if ((r += n + t[o]).length > e)
                return [t.splice(0, o), t]
    }
    function f(t) {
        for (var e = [], n = {}, r = 0, o = t.length; r < o; r++) {
            var i = t[r],
                s = l(i);
            s && (n[s] || (n[s] = [])).push(i)
        }
        for (var u in n)
            n.hasOwnProperty(u) && e.push(n[u]);
        return e
    }
    function l(t) {
        var e = t.lastIndexOf(".");
        return e >= 0 ? t.substring(e).replace(/\?.*$/, "") : ""
    }
    function h(t) {
        if (d)
            return d.test ? d.test(t) : d(t)
    }
    function v(t) {
        var e = y.comboSyntax || ["??", ","],
            n = e[0],
            r = e[1];
        return n && t.indexOf(n) > 0 || r && t.indexOf(r) > 0
    }
    var d,
        p = t.fangjs,
        g = p.Module,
        _ = g.STATUS.FETCHING,
        y = p.settings,
        m = y.comboHash = {},
        b = ["??", ","],
        w = 2e3,
        E = function() {
            return "?_" + y.ver
        };
    if (p.on("load", e), p.on("fetch", n), y.test) {
        var A = p.test || (p.test = {});
        A.uris2paths = r, A.paths2hash = u
    }
    define("combo", [], {})
}("undefined" != typeof window ? window : this), function(t) {
    "use strict";
    var e = t.pageConfig || (t.pageConfig = {});
    e.protocol = t.location.protocol;
    var n = t.location.href;
    if (!e.base) {
        var r = n.split("/"),
            o = r.length,
            i = "";
        if (o >= 3) {
            var s = r[o - 1];
            !/.+\.\w+/.test(s) && s || r.pop(), i = r.join("/")
        }
        e.base = i + ("/" === i.substr(i.length - 1) ? "" : "/")
    }
    var u = {
        base: e.base,
        alias: {
            jquery: "jquery",
            util: "plugins/util"
        },
        paths: {
            jsub: "//" + ("http:" === e.protocol ? "js.ub" : "jsub") + ".fang.com",
            webim: "//js.soufunimg.com/upload/webim/im2"
        },
        ver: "",
        vars: e
    };
    t.fangjs.config(u)
}("undefined" != typeof window ? window : this), function(t) {
    "function" != typeof Object.assign && function() {
        Object.assign = function(t) {
            if (void 0 === t || null === t)
                return null;
            for (var e = Object(t), n = 1; n < arguments.length; n++) {
                var r = arguments[n];
                if (void 0 !== r && null !== r)
                    for (var o in r)
                        r.hasOwnProperty(o) && (e[o] = r[o])
            }
            return e
        }
    }();
    void 0 === t.Promise && (t.Promise = function() {
        function e(t) {
            return "function" == typeof t || "object" == typeof t && null !== t
        }
        function n(t) {
            return "function" == typeof t
        }
        function r(t) {
            X = t
        }
        function o(t) {
            B = t
        }
        function i() {
            return void 0 !== F ? function() {
                F(u)
            } : s()
        }
        function s() {
            var t = setTimeout;
            return function() {
                return t(u, 1)
            }
        }
        function u() {
            for (var t = 0; t < K; t += 2)
                (0, W[t])(W[t + 1]), W[t] = void 0, W[t + 1] = void 0;
            K = 0
        }
        function a(t, e) {
            var n = arguments,
                r = this,
                o = new this.constructor(f);
            void 0 === o[J] && C(o);
            var i = r._state;
            return i ? function() {
                var t = n[i - 1];
                B(function() {
                    return S(i, o, t, r._result)
                })
            }() : E(r, o, t, e), o
        }
        function c(t) {
            var e = this;
            if (t && "object" == typeof t && t.constructor === e)
                return t;
            var n = new e(f);
            return y(n, t), n
        }
        function f() {}
        function l() {
            return new TypeError("You cannot resolve a promise with itself")
        }
        function h() {
            return new TypeError("A promises callback cannot return that same promise.")
        }
        function v(t) {
            try {
                return t.then
            } catch (t) {
                return nt.error = t, nt
            }
        }
        function d(t, e, n, r) {
            try {
                t.call(e, n, r)
            } catch (t) {
                return t
            }
        }
        function p(t, e, n) {
            B(function(t) {
                var r = !1,
                    o = d(n, e, function(n) {
                        r || (r = !0, e !== n ? y(t, n) : b(t, n))
                    }, function(e) {
                        r || (r = !0, w(t, e))
                    }, "Settle: " + (t._label || " unknown promise"));
                !r && o && (r = !0, w(t, o))
            }, t)
        }
        function g(t, e) {
            e._state === tt ? b(t, e._result) : e._state === et ? w(t, e._result) : E(e, void 0, function(e) {
                return y(t, e)
            }, function(e) {
                return w(t, e)
            })
        }
        function _(t, e, r) {
            e.constructor === t.constructor && r === a && e.constructor.resolve === c ? g(t, e) : r === nt ? (w(t, nt.error), nt.error = null) : void 0 === r ? b(t, e) : n(r) ? p(t, e, r) : b(t, e)
        }
        function y(t, n) {
            t === n ? w(t, l()) : e(n) ? _(t, n, v(n)) : b(t, n)
        }
        function m(t) {
            t._onerror && t._onerror(t._result), A(t)
        }
        function b(t, e) {
            t._state === Z && (t._result = e, t._state = tt, 0 !== t._subscribers.length && B(A, t))
        }
        function w(t, e) {
            t._state === Z && (t._state = et, t._result = e, B(m, t))
        }
        function E(t, e, n, r) {
            var o = t._subscribers,
                i = o.length;
            t._onerror = null, o[i] = e, o[i + tt] = n, o[i + et] = r, 0 === i && t._state && B(A, t)
        }
        function A(t) {
            var e = t._subscribers,
                n = t._state;
            if (0 !== e.length) {
                for (var r = void 0, o = void 0, i = t._result, s = 0; s < e.length; s += 3)
                    r = e[s], o = e[s + n], r ? S(n, r, o, i) : o(i);
                t._subscribers.length = 0
            }
        }
        function j() {
            this.error = null
        }
        function x(t, e) {
            try {
                return t(e)
            } catch (t) {
                return rt.error = t, rt
            }
        }
        function S(t, e, r, o) {
            var i = n(r),
                s = void 0,
                u = void 0,
                a = void 0,
                c = void 0;
            if (i) {
                if (s = x(r, o), s === rt ? (c = !0, u = s.error, s.error = null) : a = !0, e === s)
                    return void w(e, h())
            } else
                s = o, a = !0;
            e._state !== Z || (i && a ? y(e, s) : c ? w(e, u) : t === tt ? b(e, s) : t === et && w(e, s))
        }
        function O(t, e) {
            try {
                e(function(e) {
                    y(t, e)
                }, function(e) {
                    w(t, e)
                })
            } catch (e) {
                w(t, e)
            }
        }
        function T() {
            return ot++
        }
        function C(t) {
            t[J] = ot++, t._state = void 0, t._result = void 0, t._subscribers = []
        }
        function q(t, e) {
            this._instanceConstructor = t, this.promise = new t(f), this.promise[J] || C(this.promise), k(e) ? (this._input = e, this.length = e.length, this._remaining = e.length, this._result = new Array(this.length), 0 === this.length ? b(this.promise, this._result) : (this.length = this.length || 0, this._enumerate(), 0 === this._remaining && b(this.promise, this._result))) : w(this.promise, D())
        }
        function D() {
            return new Error("Array Methods must be provided an Array")
        }
        function N(t) {
            return new q(this, t).promise
        }
        function U(t) {
            var e = this;
            return new e(k(t) ? function(n, r) {
                for (var o = t.length, i = 0; i < o; i++)
                    e.resolve(t[i]).then(n, r)
            } : function(t, e) {
                return e(new TypeError("You must pass an array to race."))
            })
        }
        function I(t) {
            var e = new this(f);
            return w(e, t), e
        }
        function P() {
            throw new TypeError("You must pass a resolver function as the first argument to the promise constructor")
        }
        function G() {
            throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.")
        }
        function M(t) {
            this[J] = T(), this._result = this._state = void 0, this._subscribers = [], f !== t && ("function" != typeof t && P(), this instanceof M ? O(this, t) : G())
        }
        function L() {
            var e = void 0;
            if (void 0 !== t)
                e = t;
            else if ("undefined" != typeof self)
                e = self;
            else
                try {
                    e = Function("return this")()
                } catch (t) {
                    throw new Error("polyfill failed because global object is unavailable in this environment")
                }
            var n = e.Promise;
            if (n) {
                var r = null;
                try {
                    r = Object.prototype.toString.call(n.resolve())
                } catch (t) {}
                if ("[object Promise]" === r && !n.cast)
                    return
            }
            e.Promise = M
        }
        var Y = void 0,
            k = Y = Array.isArray ? Array.isArray : function(t) {
                return "[object Array]" === Object.prototype.toString.call(t)
            },
            K = 0,
            F = void 0,
            X = void 0,
            B = function(t, e) {
                W[K] = t, W[K + 1] = e, 2 === (K += 2) && (X ? X(u) : z())
            },
            H = "undefined" != typeof window ? window : void 0,
            V = H || {},
            $ = V.MutationObserver || V.WebKitMutationObserver,
            R = "undefined" == typeof self && "undefined" != typeof process && "[object process]" === {}.toString.call(process),
            Q = "undefined" != typeof Uint8ClampedArray && "undefined" != typeof importScripts && "undefined" != typeof MessageChannel,
            W = new Array(1e3),
            z = void 0;
        z = R ? function() {
            return function() {
                return process.nextTick(u)
            }
        }() : $ ? function() {
            var t = 0,
                e = new $(u),
                n = document.createTextNode("");
            return e.observe(n, {
                characterData: !0
            }), function() {
                n.data = t = ++t % 2
            }
        }() : Q ? function() {
            var t = new MessageChannel;
            return t.port1.onmessage = u, function() {
                return t.port2.postMessage(0)
            }
        }() : void 0 === H && "function" == typeof require ? function() {
            try {
                var t = require("vertx");
                return F = t.runOnLoop || t.runOnContext, i()
            } catch (t) {
                return s()
            }
        }() : s();
        var J = Math.random().toString(36).substring(16),
            Z = void 0,
            tt = 1,
            et = 2,
            nt = new j,
            rt = new j,
            ot = 0;
        return q.prototype._enumerate = function() {
            for (var t = this.length, e = this._input, n = 0; this._state === Z && n < t; n++)
                this._eachEntry(e[n], n)
        }, q.prototype._eachEntry = function(t, e) {
            var n = this._instanceConstructor,
                r = n.resolve;
            if (r === c) {
                var o = v(t);
                if (o === a && t._state !== Z)
                    this._settledAt(t._state, e, t._result);
                else if ("function" != typeof o)
                    this._remaining--, this._result[e] = t;
                else if (n === M) {
                    var i = new n(f);
                    _(i, t, o), this._willSettleAt(i, e)
                } else
                    this._willSettleAt(new n(function(e) {
                        return e(t)
                    }), e)
            } else
                this._willSettleAt(r(t), e)
        }, q.prototype._settledAt = function(t, e, n) {
            var r = this.promise;
            r._state === Z && (this._remaining--, t === et ? w(r, n) : this._result[e] = n), 0 === this._remaining && b(r, this._result)
        }, q.prototype._willSettleAt = function(t, e) {
            var n = this;
            E(t, void 0, function(t) {
                return n._settledAt(tt, e, t)
            }, function(t) {
                return n._settledAt(et, e, t)
            })
        }, M.all = N, M.race = U, M.resolve = c, M.reject = I, M._setScheduler = r, M._setAsap = o, M._asap = B, M.prototype = {
            constructor: M,
            then: a,
            'catch': function(t) {
                return this.then(null, t)
            }
        }, M.polyfill = L, M.Promise = M, M
    }())
}("undefined" != typeof window ? window : this);
!function(e, t) {
    "use strict";
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function(e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    } : t(e)
}("undefined" != typeof window ? window : this, function(k, e) {
    "use strict";
    var t = [],
        S = k.document,
        r = Object.getPrototypeOf,
        s = t.slice,
        g = t.concat,
        u = t.push,
        i = t.indexOf,
        n = {},
        o = n.toString,
        h = n.hasOwnProperty,
        a = h.toString,
        l = a.call(Object),
        y = {};
    function m(e, t) {
        var n = (t = t || S).createElement("script");
        n.text = e, t.head.appendChild(n).parentNode.removeChild(n)
    }
    var c = "3.2.1",
        N = function(e, t) {
            return new N.fn.init(e, t)
        },
        f = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        d = /^-ms-/,
        p = /-([a-z])/g,
        v = function(e, t) {
            return t.toUpperCase()
        };
    function x(e) {
        var t = !!e && "length" in e && e.length,
            n = N.type(e);
        return "function" !== n && !N.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && 0 < t && t - 1 in e)
    }
    N.fn = N.prototype = {
        jquery: c,
        constructor: N,
        length: 0,
        toArray: function() {
            return s.call(this)
        },
        get: function(e) {
            return null == e ? s.call(this) : e < 0 ? this[e + this.length] : this[e]
        },
        pushStack: function(e) {
            var t = N.merge(this.constructor(), e);
            return t.prevObject = this, t
        },
        each: function(e) {
            return N.each(this, e)
        },
        map: function(n) {
            return this.pushStack(N.map(this, function(e, t) {
                return n.call(e, t, e)
            }))
        },
        slice: function() {
            return this.pushStack(s.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(e) {
            var t = this.length,
                n = +e + (e < 0 ? t : 0);
            return this.pushStack(0 <= n && n < t ? [this[n]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: u,
        sort: t.sort,
        splice: t.splice
    }, N.extend = N.fn.extend = function() {
        var e,
            t,
            n,
            r,
            i,
            o,
            a = arguments[0] || {},
            s = 1,
            u = arguments.length,
            l = !1;
        for ("boolean" == typeof a && (l = a, a = arguments[s] || {}, s++), "object" == typeof a || N.isFunction(a) || (a = {}), s === u && (a = this, s--); s < u; s++)
            if (null != (e = arguments[s]))
                for (t in e)
                    n = a[t], a !== (r = e[t]) && (l && r && (N.isPlainObject(r) || (i = Array.isArray(r))) ? (i ? (i = !1, o = n && Array.isArray(n) ? n : []) : o = n && N.isPlainObject(n) ? n : {}, a[t] = N.extend(l, o, r)) : r !== undefined && (a[t] = r));
        return a
    }, N.extend({
        expando: "jQuery" + (c + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(e) {
            throw new Error(e)
        },
        noop: function() {},
        isFunction: function(e) {
            return "function" === N.type(e)
        },
        isWindow: function(e) {
            return null != e && e === e.window
        },
        isNumeric: function(e) {
            var t = N.type(e);
            return ("number" === t || "string" === t) && !isNaN(e - parseFloat(e))
        },
        isPlainObject: function(e) {
            var t,
                n;
            return !(!e || "[object Object]" !== o.call(e)) && (!(t = r(e)) || "function" == typeof (n = h.call(t, "constructor") && t.constructor) && a.call(n) === l)
        },
        isEmptyObject: function(e) {
            var t;
            for (t in e)
                return !1;
            return !0
        },
        type: function(e) {
            return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? n[o.call(e)] || "object" : typeof e
        },
        globalEval: function(e) {
            m(e)
        },
        camelCase: function(e) {
            return e.replace(d, "ms-").replace(p, v)
        },
        each: function(e, t) {
            var n,
                r = 0;
            if (x(e))
                for (n = e.length; r < n && !1 !== t.call(e[r], r, e[r]); r++)
                    ;
            else
                for (r in e)
                    if (!1 === t.call(e[r], r, e[r]))
                        break;
            return e
        },
        trim: function(e) {
            return null == e ? "" : (e + "").replace(f, "")
        },
        makeArray: function(e, t) {
            var n = t || [];
            return null != e && (x(Object(e)) ? N.merge(n, "string" == typeof e ? [e] : e) : u.call(n, e)), n
        },
        inArray: function(e, t, n) {
            return null == t ? -1 : i.call(t, e, n)
        },
        merge: function(e, t) {
            for (var n = +t.length, r = 0, i = e.length; r < n; r++)
                e[i++] = t[r];
            return e.length = i, e
        },
        grep: function(e, t, n) {
            for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                !t(e[i], i) !== a && r.push(e[i]);
            return r
        },
        map: function(e, t, n) {
            var r,
                i,
                o = 0,
                a = [];
            if (x(e))
                for (r = e.length; o < r; o++)
                    null != (i = t(e[o], o, n)) && a.push(i);
            else
                for (o in e)
                    null != (i = t(e[o], o, n)) && a.push(i);
            return g.apply([], a)
        },
        guid: 1,
        proxy: function(e, t) {
            var n,
                r,
                i;
            return "string" == typeof t && (n = e[t], t = e, e = n), N.isFunction(e) ? (r = s.call(arguments, 2), (i = function() {
                return e.apply(t || this, r.concat(s.call(arguments)))
            }).guid = e.guid = e.guid || N.guid++, i) : undefined
        },
        now: Date.now,
        support: y
    }), "function" == typeof Symbol && (N.fn[Symbol.iterator] = t[Symbol.iterator]), N.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(e, t) {
        n["[object " + t + "]"] = t.toLowerCase()
    });
    var b = function(n) {
        var e,
            h,
            b,
            o,
            i,
            g,
            f,
            y,
            w,
            u,
            l,
            T,
            C,
            a,
            E,
            m,
            s,
            c,
            v,
            k = "sizzle" + 1 * new Date,
            x = n.document,
            S = 0,
            r = 0,
            d = ae(),
            p = ae(),
            N = ae(),
            D = function(e, t) {
                return e === t && (l = !0), 0
            },
            j = {}.hasOwnProperty,
            t = [],
            A = t.pop,
            q = t.push,
            L = t.push,
            H = t.slice,
            F = function(e, t) {
                for (var n = 0, r = e.length; n < r; n++)
                    if (e[n] === t)
                        return n;
                return -1
            },
            O = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            P = "[\\x20\\t\\r\\n\\f]",
            R = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",
            M = "\\[" + P + "*(" + R + ")(?:" + P + "*([*^$|!~]?=)" + P + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + R + "))|)" + P + "*\\]",
            I = ":(" + R + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + M + ")*)|.*)\\)|)",
            W = new RegExp(P + "+", "g"),
            $ = new RegExp("^" + P + "+|((?:^|[^\\\\])(?:\\\\.)*)" + P + "+$", "g"),
            B = new RegExp("^" + P + "*," + P + "*"),
            _ = new RegExp("^" + P + "*([>+~]|" + P + ")" + P + "*"),
            z = new RegExp("=" + P + "*([^\\]'\"]*?)" + P + "*\\]", "g"),
            X = new RegExp(I),
            U = new RegExp("^" + R + "$"),
            V = {
                ID: new RegExp("^#(" + R + ")"),
                CLASS: new RegExp("^\\.(" + R + ")"),
                TAG: new RegExp("^(" + R + "|[*])"),
                ATTR: new RegExp("^" + M),
                PSEUDO: new RegExp("^" + I),
                CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + P + "*(even|odd|(([+-]|)(\\d*)n|)" + P + "*(?:([+-]|)" + P + "*(\\d+)|))" + P + "*\\)|)", "i"),
                bool: new RegExp("^(?:" + O + ")$", "i"),
                needsContext: new RegExp("^" + P + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + P + "*((?:-\\d)?\\d*)" + P + "*\\)|)(?=[^-]|$)", "i")
            },
            G = /^(?:input|select|textarea|button)$/i,
            Y = /^h\d$/i,
            Q = /^[^{]+\{\s*\[native \w/,
            J = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            K = /[+~]/,
            Z = new RegExp("\\\\([\\da-f]{1,6}" + P + "?|(" + P + ")|.)", "ig"),
            ee = function(e, t, n) {
                var r = "0x" + t - 65536;
                return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
            },
            te = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
            ne = function(e, t) {
                return t ? "\0" === e ? "\ufffd" : e.slice(0, -1) + "\\" + e.charCodeAt(e.length - 1).toString(16) + " " : "\\" + e
            },
            re = function() {
                T()
            },
            ie = ve(function(e) {
                return !0 === e.disabled && ("form" in e || "label" in e)
            }, {
                dir: "parentNode",
                next: "legend"
            });
        try {
            L.apply(t = H.call(x.childNodes), x.childNodes), t[x.childNodes.length].nodeType
        } catch (Ce) {
            L = {
                apply: t.length ? function(e, t) {
                    q.apply(e, H.call(t))
                } : function(e, t) {
                    for (var n = e.length, r = 0; e[n++] = t[r++];)
                        ;
                    e.length = n - 1
                }
            }
        }
        function oe(e, t, n, r) {
            var i,
                o,
                a,
                s,
                u,
                l,
                c,
                f = t && t.ownerDocument,
                d = t ? t.nodeType : 9;
            if (n = n || [], "string" != typeof e || !e || 1 !== d && 9 !== d && 11 !== d)
                return n;
            if (!r && ((t ? t.ownerDocument || t : x) !== C && T(t), t = t || C, E)) {
                if (11 !== d && (u = J.exec(e)))
                    if (i = u[1]) {
                        if (9 === d) {
                            if (!(a = t.getElementById(i)))
                                return n;
                            if (a.id === i)
                                return n.push(a), n
                        } else if (f && (a = f.getElementById(i)) && v(t, a) && a.id === i)
                            return n.push(a), n
                    } else {
                        if (u[2])
                            return L.apply(n, t.getElementsByTagName(e)), n;
                        if ((i = u[3]) && h.getElementsByClassName && t.getElementsByClassName)
                            return L.apply(n, t.getElementsByClassName(i)), n
                    }
                if (h.qsa && !N[e + " "] && (!m || !m.test(e))) {
                    if (1 !== d)
                        f = t, c = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(te, ne) : t.setAttribute("id", s = k), o = (l = g(e)).length; o--;)
                            l[o] = "#" + s + " " + me(l[o]);
                        c = l.join(","), f = K.test(e) && ge(t.parentNode) || t
                    }
                    if (c)
                        try {
                            return L.apply(n, f.querySelectorAll(c)), n
                        } catch (p) {} finally {
                            s === k && t.removeAttribute("id")
                        }
                }
            }
            return y(e.replace($, "$1"), t, n, r)
        }
        function ae() {
            var n = [];
            return function r(e, t) {
                return n.push(e + " ") > b.cacheLength && delete r[n.shift()], r[e + " "] = t
            }
        }
        function se(e) {
            return e[k] = !0, e
        }
        function ue(e) {
            var t = C.createElement("fieldset");
            try {
                return !!e(t)
            } catch (Ce) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t), t = null
            }
        }
        function le(e, t) {
            for (var n = e.split("|"), r = n.length; r--;)
                b.attrHandle[n[r]] = t
        }
        function ce(e, t) {
            var n = t && e,
                r = n && 1 === e.nodeType && 1 === t.nodeType && e.sourceIndex - t.sourceIndex;
            if (r)
                return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function fe(t) {
            return function(e) {
                return "input" === e.nodeName.toLowerCase() && e.type === t
            }
        }
        function de(n) {
            return function(e) {
                var t = e.nodeName.toLowerCase();
                return ("input" === t || "button" === t) && e.type === n
            }
        }
        function pe(t) {
            return function(e) {
                return "form" in e ? e.parentNode && !1 === e.disabled ? "label" in e ? "label" in e.parentNode ? e.parentNode.disabled === t : e.disabled === t : e.isDisabled === t || e.isDisabled !== !t && ie(e) === t : e.disabled === t : "label" in e && e.disabled === t
            }
        }
        function he(a) {
            return se(function(o) {
                return o = +o, se(function(e, t) {
                    for (var n, r = a([], e.length, o), i = r.length; i--;)
                        e[n = r[i]] && (e[n] = !(t[n] = e[n]))
                })
            })
        }
        function ge(e) {
            return e && "undefined" != typeof e.getElementsByTagName && e
        }
        for (e in h = oe.support = {}, i = oe.isXML = function(e) {
            var t = e && (e.ownerDocument || e).documentElement;
            return !!t && "HTML" !== t.nodeName
        }, T = oe.setDocument = function(e) {
            var t,
                n,
                r = e ? e.ownerDocument || e : x;
            return r !== C && 9 === r.nodeType && r.documentElement && (a = (C = r).documentElement, E = !i(C), x !== C && (n = C.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", re, !1) : n.attachEvent && n.attachEvent("onunload", re)), h.attributes = ue(function(e) {
                return e.className = "i", !e.getAttribute("className")
            }), h.getElementsByTagName = ue(function(e) {
                return e.appendChild(C.createComment("")), !e.getElementsByTagName("*").length
            }), h.getElementsByClassName = Q.test(C.getElementsByClassName), h.getById = ue(function(e) {
                return a.appendChild(e).id = k, !C.getElementsByName || !C.getElementsByName(k).length
            }), h.getById ? (b.filter.ID = function(e) {
                var t = e.replace(Z, ee);
                return function(e) {
                    return e.getAttribute("id") === t
                }
            }, b.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && E) {
                    var n = t.getElementById(e);
                    return n ? [n] : []
                }
            }) : (b.filter.ID = function(e) {
                var n = e.replace(Z, ee);
                return function(e) {
                    var t = "undefined" != typeof e.getAttributeNode && e.getAttributeNode("id");
                    return t && t.value === n
                }
            }, b.find.ID = function(e, t) {
                if ("undefined" != typeof t.getElementById && E) {
                    var n,
                        r,
                        i,
                        o = t.getElementById(e);
                    if (o) {
                        if ((n = o.getAttributeNode("id")) && n.value === e)
                            return [o];
                        for (i = t.getElementsByName(e), r = 0; o = i[r++];)
                            if ((n = o.getAttributeNode("id")) && n.value === e)
                                return [o]
                    }
                    return []
                }
            }), b.find.TAG = h.getElementsByTagName ? function(e, t) {
                return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(e) : h.qsa ? t.querySelectorAll(e) : void 0
            } : function(e, t) {
                var n,
                    r = [],
                    i = 0,
                    o = t.getElementsByTagName(e);
                if ("*" === e) {
                    for (; n = o[i++];)
                        1 === n.nodeType && r.push(n);
                    return r
                }
                return o
            }, b.find.CLASS = h.getElementsByClassName && function(e, t) {
                if ("undefined" != typeof t.getElementsByClassName && E)
                    return t.getElementsByClassName(e)
            }, s = [], m = [], (h.qsa = Q.test(C.querySelectorAll)) && (ue(function(e) {
                a.appendChild(e).innerHTML = "<a id='" + k + "'></a><select id='" + k + "-\r\\' msallowcapture=''><option selected=''></option></select>", e.querySelectorAll("[msallowcapture^='']").length && m.push("[*^$]=" + P + "*(?:''|\"\")"), e.querySelectorAll("[selected]").length || m.push("\\[" + P + "*(?:value|" + O + ")"), e.querySelectorAll("[id~=" + k + "-]").length || m.push("~="), e.querySelectorAll(":checked").length || m.push(":checked"), e.querySelectorAll("a#" + k + "+*").length || m.push(".#.+[+~]")
            }), ue(function(e) {
                e.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
                var t = C.createElement("input");
                t.setAttribute("type", "hidden"), e.appendChild(t).setAttribute("name", "D"), e.querySelectorAll("[name=d]").length && m.push("name" + P + "*[*^$|!~]?="), 2 !== e.querySelectorAll(":enabled").length && m.push(":enabled", ":disabled"), a.appendChild(e).disabled = !0, 2 !== e.querySelectorAll(":disabled").length && m.push(":enabled", ":disabled"), e.querySelectorAll("*,:x"), m.push(",.*:")
            })), (h.matchesSelector = Q.test(c = a.matches || a.webkitMatchesSelector || a.mozMatchesSelector || a.oMatchesSelector || a.msMatchesSelector)) && ue(function(e) {
                h.disconnectedMatch = c.call(e, "*"), c.call(e, "[s!='']:x"), s.push("!=", I)
            }), m = m.length && new RegExp(m.join("|")), s = s.length && new RegExp(s.join("|")), t = Q.test(a.compareDocumentPosition), v = t || Q.test(a.contains) ? function(e, t) {
                var n = 9 === e.nodeType ? e.documentElement : e,
                    r = t && t.parentNode;
                return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
            } : function(e, t) {
                if (t)
                    for (; t = t.parentNode;)
                        if (t === e)
                            return !0;
                return !1
            }, D = t ? function(e, t) {
                if (e === t)
                    return l = !0, 0;
                var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !h.sortDetached && t.compareDocumentPosition(e) === n ? e === C || e.ownerDocument === x && v(x, e) ? -1 : t === C || t.ownerDocument === x && v(x, t) ? 1 : u ? F(u, e) - F(u, t) : 0 : 4 & n ? -1 : 1)
            } : function(e, t) {
                if (e === t)
                    return l = !0, 0;
                var n,
                    r = 0,
                    i = e.parentNode,
                    o = t.parentNode,
                    a = [e],
                    s = [t];
                if (!i || !o)
                    return e === C ? -1 : t === C ? 1 : i ? -1 : o ? 1 : u ? F(u, e) - F(u, t) : 0;
                if (i === o)
                    return ce(e, t);
                for (n = e; n = n.parentNode;)
                    a.unshift(n);
                for (n = t; n = n.parentNode;)
                    s.unshift(n);
                for (; a[r] === s[r];)
                    r++;
                return r ? ce(a[r], s[r]) : a[r] === x ? -1 : s[r] === x ? 1 : 0
            }), C
        }, oe.matches = function(e, t) {
            return oe(e, null, null, t)
        }, oe.matchesSelector = function(e, t) {
            if ((e.ownerDocument || e) !== C && T(e), t = t.replace(z, "='$1']"), h.matchesSelector && E && !N[t + " "] && (!s || !s.test(t)) && (!m || !m.test(t)))
                try {
                    var n = c.call(e, t);
                    if (n || h.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                        return n
                } catch (Ce) {}
            return 0 < oe(t, C, null, [e]).length
        }, oe.contains = function(e, t) {
            return (e.ownerDocument || e) !== C && T(e), v(e, t)
        }, oe.attr = function(e, t) {
            (e.ownerDocument || e) !== C && T(e);
            var n = b.attrHandle[t.toLowerCase()],
                r = n && j.call(b.attrHandle, t.toLowerCase()) ? n(e, t, !E) : undefined;
            return r !== undefined ? r : h.attributes || !E ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }, oe.escape = function(e) {
            return (e + "").replace(te, ne)
        }, oe.error = function(e) {
            throw new Error("Syntax error, unrecognized expression: " + e)
        }, oe.uniqueSort = function(e) {
            var t,
                n = [],
                r = 0,
                i = 0;
            if (l = !h.detectDuplicates, u = !h.sortStable && e.slice(0), e.sort(D), l) {
                for (; t = e[i++];)
                    t === e[i] && (r = n.push(i));
                for (; r--;)
                    e.splice(n[r], 1)
            }
            return u = null, e
        }, o = oe.getText = function(e) {
            var t,
                n = "",
                r = 0,
                i = e.nodeType;
            if (i) {
                if (1 === i || 9 === i || 11 === i) {
                    if ("string" == typeof e.textContent)
                        return e.textContent;
                    for (e = e.firstChild; e; e = e.nextSibling)
                        n += o(e)
                } else if (3 === i || 4 === i)
                    return e.nodeValue
            } else
                for (; t = e[r++];)
                    n += o(t);
            return n
        }, (b = oe.selectors = {
            cacheLength: 50,
            createPseudo: se,
            match: V,
            attrHandle: {},
            find: {},
            relative: {
                ">": {
                    dir: "parentNode",
                    first: !0
                },
                " ": {
                    dir: "parentNode"
                },
                "+": {
                    dir: "previousSibling",
                    first: !0
                },
                "~": {
                    dir: "previousSibling"
                }
            },
            preFilter: {
                ATTR: function(e) {
                    return e[1] = e[1].replace(Z, ee), e[3] = (e[3] || e[4] || e[5] || "").replace(Z, ee), "~=" === e[2] && (e[3] = " " + e[3] + " "), e.slice(0, 4)
                },
                CHILD: function(e) {
                    return e[1] = e[1].toLowerCase(), "nth" === e[1].slice(0, 3) ? (e[3] || oe.error(e[0]), e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])), e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && oe.error(e[0]), e
                },
                PSEUDO: function(e) {
                    var t,
                        n = !e[6] && e[2];
                    return V.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && X.test(n) && (t = g(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t), e[2] = n.slice(0, t)), e.slice(0, 3))
                }
            },
            filter: {
                TAG: function(e) {
                    var t = e.replace(Z, ee).toLowerCase();
                    return "*" === e ? function() {
                        return !0
                    } : function(e) {
                        return e.nodeName && e.nodeName.toLowerCase() === t
                    }
                },
                CLASS: function(e) {
                    var t = d[e + " "];
                    return t || (t = new RegExp("(^|" + P + ")" + e + "(" + P + "|$)")) && d(e, function(e) {
                            return t.test("string" == typeof e.className && e.className || "undefined" != typeof e.getAttribute && e.getAttribute("class") || "")
                        })
                },
                ATTR: function(n, r, i) {
                    return function(e) {
                        var t = oe.attr(e, n);
                        return null == t ? "!=" === r : !r || (t += "", "=" === r ? t === i : "!=" === r ? t !== i : "^=" === r ? i && 0 === t.indexOf(i) : "*=" === r ? i && -1 < t.indexOf(i) : "$=" === r ? i && t.slice(-i.length) === i : "~=" === r ? -1 < (" " + t.replace(W, " ") + " ").indexOf(i) : "|=" === r && (t === i || t.slice(0, i.length + 1) === i + "-"))
                    }
                },
                CHILD: function(h, e, t, g, y) {
                    var m = "nth" !== h.slice(0, 3),
                        v = "last" !== h.slice(-4),
                        x = "of-type" === e;
                    return 1 === g && 0 === y ? function(e) {
                        return !!e.parentNode
                    } : function(e, t, n) {
                        var r,
                            i,
                            o,
                            a,
                            s,
                            u,
                            l = m !== v ? "nextSibling" : "previousSibling",
                            c = e.parentNode,
                            f = x && e.nodeName.toLowerCase(),
                            d = !n && !x,
                            p = !1;
                        if (c) {
                            if (m) {
                                for (; l;) {
                                    for (a = e; a = a[l];)
                                        if (x ? a.nodeName.toLowerCase() === f : 1 === a.nodeType)
                                            return !1;
                                    u = l = "only" === h && !u && "nextSibling"
                                }
                                return !0
                            }
                            if (u = [v ? c.firstChild : c.lastChild], v && d) {
                                for (p = (s = (r = (i = (o = (a = c)[k] || (a[k] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === S && r[1]) && r[2], a = s && c.childNodes[s]; a = ++s && a && a[l] || (p = s = 0) || u.pop();)
                                    if (1 === a.nodeType && ++p && a === e) {
                                        i[h] = [S, s, p];
                                        break
                                    }
                            } else if (d && (p = s = (r = (i = (o = (a = e)[k] || (a[k] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] || [])[0] === S && r[1]), !1 === p)
                                for (; (a = ++s && a && a[l] || (p = s = 0) || u.pop()) && ((x ? a.nodeName.toLowerCase() !== f : 1 !== a.nodeType) || !++p || (d && ((i = (o = a[k] || (a[k] = {}))[a.uniqueID] || (o[a.uniqueID] = {}))[h] = [S, p]), a !== e));)
                                    ;
                            return (p -= y) === g || p % g == 0 && 0 <= p / g
                        }
                    }
                },
                PSEUDO: function(e, o) {
                    var t,
                        a = b.pseudos[e] || b.setFilters[e.toLowerCase()] || oe.error("unsupported pseudo: " + e);
                    return a[k] ? a(o) : 1 < a.length ? (t = [e, e, "", o], b.setFilters.hasOwnProperty(e.toLowerCase()) ? se(function(e, t) {
                        for (var n, r = a(e, o), i = r.length; i--;)
                            e[n = F(e, r[i])] = !(t[n] = r[i])
                    }) : function(e) {
                        return a(e, 0, t)
                    }) : a
                }
            },
            pseudos: {
                not: se(function(e) {
                    var r = [],
                        i = [],
                        s = f(e.replace($, "$1"));
                    return s[k] ? se(function(e, t, n, r) {
                        for (var i, o = s(e, null, r, []), a = e.length; a--;)
                            (i = o[a]) && (e[a] = !(t[a] = i))
                    }) : function(e, t, n) {
                        return r[0] = e, s(r, null, n, i), r[0] = null, !i.pop()
                    }
                }),
                has: se(function(t) {
                    return function(e) {
                        return 0 < oe(t, e).length
                    }
                }),
                contains: se(function(t) {
                    return t = t.replace(Z, ee), function(e) {
                        return -1 < (e.textContent || e.innerText || o(e)).indexOf(t)
                    }
                }),
                lang: se(function(n) {
                    return U.test(n || "") || oe.error("unsupported lang: " + n), n = n.replace(Z, ee).toLowerCase(), function(e) {
                        var t;
                        do {
                            if (t = E ? e.lang : e.getAttribute("xml:lang") || e.getAttribute("lang"))
                                return (t = t.toLowerCase()) === n || 0 === t.indexOf(n + "-")
                        } while ((e = e.parentNode) && 1 === e.nodeType);
                        return !1
                    }
                }),
                target: function(e) {
                    var t = n.location && n.location.hash;
                    return t && t.slice(1) === e.id
                },
                root: function(e) {
                    return e === a
                },
                focus: function(e) {
                    return e === C.activeElement && (!C.hasFocus || C.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                },
                enabled: pe(!1),
                disabled: pe(!0),
                checked: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && !!e.checked || "option" === t && !!e.selected
                },
                selected: function(e) {
                    return e.parentNode && e.parentNode.selectedIndex, !0 === e.selected
                },
                empty: function(e) {
                    for (e = e.firstChild; e; e = e.nextSibling)
                        if (e.nodeType < 6)
                            return !1;
                    return !0
                },
                parent: function(e) {
                    return !b.pseudos.empty(e)
                },
                header: function(e) {
                    return Y.test(e.nodeName)
                },
                input: function(e) {
                    return G.test(e.nodeName)
                },
                button: function(e) {
                    var t = e.nodeName.toLowerCase();
                    return "input" === t && "button" === e.type || "button" === t
                },
                text: function(e) {
                    var t;
                    return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                },
                first: he(function() {
                    return [0]
                }),
                last: he(function(e, t) {
                    return [t - 1]
                }),
                eq: he(function(e, t, n) {
                    return [n < 0 ? n + t : n]
                }),
                even: he(function(e, t) {
                    for (var n = 0; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                odd: he(function(e, t) {
                    for (var n = 1; n < t; n += 2)
                        e.push(n);
                    return e
                }),
                lt: he(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; 0 <= --r;)
                        e.push(r);
                    return e
                }),
                gt: he(function(e, t, n) {
                    for (var r = n < 0 ? n + t : n; ++r < t;)
                        e.push(r);
                    return e
                })
            }
        }).pseudos.nth = b.pseudos.eq, {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            b.pseudos[e] = fe(e);
        for (e in {
            submit: !0,
            reset: !0
        })
            b.pseudos[e] = de(e);
        function ye() {}
        function me(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++)
                r += e[t].value;
            return r
        }
        function ve(s, e, t) {
            var u = e.dir,
                l = e.next,
                c = l || u,
                f = t && "parentNode" === c,
                d = r++;
            return e.first ? function(e, t, n) {
                for (; e = e[u];)
                    if (1 === e.nodeType || f)
                        return s(e, t, n);
                return !1
            } : function(e, t, n) {
                var r,
                    i,
                    o,
                    a = [S, d];
                if (n) {
                    for (; e = e[u];)
                        if ((1 === e.nodeType || f) && s(e, t, n))
                            return !0
                } else
                    for (; e = e[u];)
                        if (1 === e.nodeType || f)
                            if (i = (o = e[k] || (e[k] = {}))[e.uniqueID] || (o[e.uniqueID] = {}), l && l === e.nodeName.toLowerCase())
                                e = e[u] || e;
                            else {
                                if ((r = i[c]) && r[0] === S && r[1] === d)
                                    return a[2] = r[2];
                                if ((i[c] = a)[2] = s(e, t, n))
                                    return !0
                            }
                return !1
            }
        }
        function xe(i) {
            return 1 < i.length ? function(e, t, n) {
                for (var r = i.length; r--;)
                    if (!i[r](e, t, n))
                        return !1;
                return !0
            } : i[0]
        }
        function be(e, t, n, r, i) {
            for (var o, a = [], s = 0, u = e.length, l = null != t; s < u; s++)
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o), l && t.push(s)));
            return a
        }
        function we(h, g, y, m, v, e) {
            return m && !m[k] && (m = we(m)), v && !v[k] && (v = we(v, e)), se(function(e, t, n, r) {
                var i,
                    o,
                    a,
                    s = [],
                    u = [],
                    l = t.length,
                    c = e || function f(e, t, n) {
                        for (var r = 0, i = t.length; r < i; r++)
                            oe(e, t[r], n);
                        return n
                    }(g || "*", n.nodeType ? [n] : n, []),
                    d = !h || !e && g ? c : be(c, s, h, n, r),
                    p = y ? v || (e ? h : l || m) ? [] : t : d;
                if (y && y(d, p, n, r), m)
                    for (i = be(p, u), m(i, [], n, r), o = i.length; o--;)
                        (a = i[o]) && (p[u[o]] = !(d[u[o]] = a));
                if (e) {
                    if (v || h) {
                        if (v) {
                            for (i = [], o = p.length; o--;)
                                (a = p[o]) && i.push(d[o] = a);
                            v(null, p = [], i, r)
                        }
                        for (o = p.length; o--;)
                            (a = p[o]) && -1 < (i = v ? F(e, a) : s[o]) && (e[i] = !(t[i] = a))
                    }
                } else
                    p = be(p === t ? p.splice(l, p.length) : p), v ? v(null, t, p, r) : L.apply(t, p)
            })
        }
        function Te(e) {
            for (var i, t, n, r = e.length, o = b.relative[e[0].type], a = o || b.relative[" "], s = o ? 1 : 0, u = ve(function(e) {
                    return e === i
                }, a, !0), l = ve(function(e) {
                    return -1 < F(i, e)
                }, a, !0), c = [function(e, t, n) {
                    var r = !o && (n || t !== w) || ((i = t).nodeType ? u(e, t, n) : l(e, t, n));
                    return i = null, r
                }]; s < r; s++)
                if (t = b.relative[e[s].type])
                    c = [ve(xe(c), t)];
                else {
                    if ((t = b.filter[e[s].type].apply(null, e[s].matches))[k]) {
                        for (n = ++s; n < r && !b.relative[e[n].type]; n++)
                            ;
                        return we(1 < s && xe(c), 1 < s && me(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace($, "$1"), t, s < n && Te(e.slice(s, n)), n < r && Te(e = e.slice(n)), n < r && me(e))
                    }
                    c.push(t)
                }
            return xe(c)
        }
        return ye.prototype = b.filters = b.pseudos, b.setFilters = new ye, g = oe.tokenize = function(e, t) {
            var n,
                r,
                i,
                o,
                a,
                s,
                u,
                l = p[e + " "];
            if (l)
                return t ? 0 : l.slice(0);
            for (a = e, s = [], u = b.preFilter; a;) {
                for (o in n && !(r = B.exec(a)) || (r && (a = a.slice(r[0].length) || a), s.push(i = [])), n = !1, (r = _.exec(a)) && (n = r.shift(), i.push({
                    value: n,
                    type: r[0].replace($, " ")
                }), a = a.slice(n.length)), b.filter)
                    !(r = V[o].exec(a)) || u[o] && !(r = u[o](r)) || (n = r.shift(), i.push({
                        value: n,
                        type: o,
                        matches: r
                    }), a = a.slice(n.length));
                if (!n)
                    break
            }
            return t ? a.length : a ? oe.error(e) : p(e, s).slice(0)
        }, f = oe.compile = function(e, t) {
            var n,
                r = [],
                i = [],
                o = N[e + " "];
            if (!o) {
                for (t || (t = g(e)), n = t.length; n--;)
                    (o = Te(t[n]))[k] ? r.push(o) : i.push(o);
                (o = N(e, function a(y, m) {
                    var v = 0 < m.length,
                        x = 0 < y.length,
                        e = function(e, t, n, r, i) {
                            var o,
                                a,
                                s,
                                u = 0,
                                l = "0",
                                c = e && [],
                                f = [],
                                d = w,
                                p = e || x && b.find.TAG("*", i),
                                h = S += null == d ? 1 : Math.random() || .1,
                                g = p.length;
                            for (i && (w = t === C || t || i); l !== g && null != (o = p[l]); l++) {
                                if (x && o) {
                                    for (a = 0, t || o.ownerDocument === C || (T(o), n = !E); s = y[a++];)
                                        if (s(o, t || C, n)) {
                                            r.push(o);
                                            break
                                        }
                                    i && (S = h)
                                }
                                v && ((o = !s && o) && u--, e && c.push(o))
                            }
                            if (u += l, v && l !== u) {
                                for (a = 0; s = m[a++];)
                                    s(c, f, t, n);
                                if (e) {
                                    if (0 < u)
                                        for (; l--;)
                                            c[l] || f[l] || (f[l] = A.call(r));
                                    f = be(f)
                                }
                                L.apply(r, f), i && !e && 0 < f.length && 1 < u + m.length && oe.uniqueSort(r)
                            }
                            return i && (S = h, w = d), c
                        };
                    return v ? se(e) : e
                }(i, r))).selector = e
            }
            return o
        }, y = oe.select = function(e, t, n, r) {
            var i,
                o,
                a,
                s,
                u,
                l = "function" == typeof e && e,
                c = !r && g(e = l.selector || e);
            if (n = n || [], 1 === c.length) {
                if (2 < (o = c[0] = c[0].slice(0)).length && "ID" === (a = o[0]).type && 9 === t.nodeType && E && b.relative[o[1].type]) {
                    if (!(t = (b.find.ID(a.matches[0].replace(Z, ee), t) || [])[0]))
                        return n;
                    l && (t = t.parentNode), e = e.slice(o.shift().value.length)
                }
                for (i = V.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i], !b.relative[s = a.type]);)
                    if ((u = b.find[s]) && (r = u(a.matches[0].replace(Z, ee), K.test(o[0].type) && ge(t.parentNode) || t))) {
                        if (o.splice(i, 1), !(e = r.length && me(o)))
                            return L.apply(n, r), n;
                        break
                    }
            }
            return (l || f(e, c))(r, t, !E, n, !t || K.test(e) && ge(t.parentNode) || t), n
        }, h.sortStable = k.split("").sort(D).join("") === k, h.detectDuplicates = !!l, T(), h.sortDetached = ue(function(e) {
            return 1 & e.compareDocumentPosition(C.createElement("fieldset"))
        }), ue(function(e) {
            return e.innerHTML = "<a href='#'></a>", "#" === e.firstChild.getAttribute("href")
        }) || le("type|href|height|width", function(e, t, n) {
            if (!n)
                return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
        }), h.attributes && ue(function(e) {
            return e.innerHTML = "<input/>", e.firstChild.setAttribute("value", ""), "" === e.firstChild.getAttribute("value")
        }) || le("value", function(e, t, n) {
            if (!n && "input" === e.nodeName.toLowerCase())
                return e.defaultValue
        }), ue(function(e) {
            return null == e.getAttribute("disabled")
        }) || le(O, function(e, t, n) {
            var r;
            if (!n)
                return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
        }), oe
    }(k);
    N.find = b, N.expr = b.selectors, N.expr[":"] = N.expr.pseudos, N.uniqueSort = N.unique = b.uniqueSort, N.text = b.getText, N.isXMLDoc = b.isXML, N.contains = b.contains, N.escapeSelector = b.escape;
    var w = function(e, t, n) {
            for (var r = [], i = n !== undefined; (e = e[t]) && 9 !== e.nodeType;)
                if (1 === e.nodeType) {
                    if (i && N(e).is(n))
                        break;
                    r.push(e)
                }
            return r
        },
        T = function(e, t) {
            for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
            return n
        },
        C = N.expr.match.needsContext;
    function E(e, t) {
        return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
    }
    var D = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        j = /^.[^:#\[\.,]*$/;
    function A(e, n, r) {
        return N.isFunction(n) ? N.grep(e, function(e, t) {
            return !!n.call(e, t, e) !== r
        }) : n.nodeType ? N.grep(e, function(e) {
            return e === n !== r
        }) : "string" != typeof n ? N.grep(e, function(e) {
            return -1 < i.call(n, e) !== r
        }) : j.test(n) ? N.filter(n, e, r) : (n = N.filter(n, e), N.grep(e, function(e) {
            return -1 < i.call(n, e) !== r && 1 === e.nodeType
        }))
    }
    N.filter = function(e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"), 1 === t.length && 1 === r.nodeType ? N.find.matchesSelector(r, e) ? [r] : [] : N.find.matches(e, N.grep(t, function(e) {
            return 1 === e.nodeType
        }))
    }, N.fn.extend({
        find: function(e) {
            var t,
                n,
                r = this.length,
                i = this;
            if ("string" != typeof e)
                return this.pushStack(N(e).filter(function() {
                    for (t = 0; t < r; t++)
                        if (N.contains(i[t], this))
                            return !0
                }));
            for (n = this.pushStack([]), t = 0; t < r; t++)
                N.find(e, i[t], n);
            return 1 < r ? N.uniqueSort(n) : n
        },
        filter: function(e) {
            return this.pushStack(A(this, e || [], !1))
        },
        not: function(e) {
            return this.pushStack(A(this, e || [], !0))
        },
        is: function(e) {
            return !!A(this, "string" == typeof e && C.test(e) ? N(e) : e || [], !1).length
        }
    });
    var q,
        L = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (N.fn.init = function(e, t, n) {
        var r,
            i;
        if (!e)
            return this;
        if (n = n || q, "string" == typeof e) {
            if (!(r = "<" === e[0] && ">" === e[e.length - 1] && 3 <= e.length ? [null, e, null] : L.exec(e)) || !r[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof N ? t[0] : t, N.merge(this, N.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : S, !0)), D.test(r[1]) && N.isPlainObject(t))
                    for (r in t)
                        N.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            return (i = S.getElementById(r[2])) && (this[0] = i, this.length = 1), this
        }
        return e.nodeType ? (this[0] = e, this.length = 1, this) : N.isFunction(e) ? n.ready !== undefined ? n.ready(e) : e(N) : N.makeArray(e, this)
    }).prototype = N.fn, q = N(S);
    var H = /^(?:parents|prev(?:Until|All))/,
        F = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    function O(e, t) {
        for (; (e = e[t]) && 1 !== e.nodeType;)
            ;
        return e
    }
    N.fn.extend({
        has: function(e) {
            var t = N(e, this),
                n = t.length;
            return this.filter(function() {
                for (var e = 0; e < n; e++)
                    if (N.contains(this, t[e]))
                        return !0
            })
        },
        closest: function(e, t) {
            var n,
                r = 0,
                i = this.length,
                o = [],
                a = "string" != typeof e && N(e);
            if (!C.test(e))
                for (; r < i; r++)
                    for (n = this[r]; n && n !== t; n = n.parentNode)
                        if (n.nodeType < 11 && (a ? -1 < a.index(n) : 1 === n.nodeType && N.find.matchesSelector(n, e))) {
                            o.push(n);
                            break
                        }
            return this.pushStack(1 < o.length ? N.uniqueSort(o) : o)
        },
        index: function(e) {
            return e ? "string" == typeof e ? i.call(N(e), this[0]) : i.call(this, e.jquery ? e[0] : e) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(e, t) {
            return this.pushStack(N.uniqueSort(N.merge(this.get(), N(e, t))))
        },
        addBack: function(e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }), N.each({
        parent: function(e) {
            var t = e.parentNode;
            return t && 11 !== t.nodeType ? t : null
        },
        parents: function(e) {
            return w(e, "parentNode")
        },
        parentsUntil: function(e, t, n) {
            return w(e, "parentNode", n)
        },
        next: function(e) {
            return O(e, "nextSibling")
        },
        prev: function(e) {
            return O(e, "previousSibling")
        },
        nextAll: function(e) {
            return w(e, "nextSibling")
        },
        prevAll: function(e) {
            return w(e, "previousSibling")
        },
        nextUntil: function(e, t, n) {
            return w(e, "nextSibling", n)
        },
        prevUntil: function(e, t, n) {
            return w(e, "previousSibling", n)
        },
        siblings: function(e) {
            return T((e.parentNode || {}).firstChild, e)
        },
        children: function(e) {
            return T(e.firstChild)
        },
        contents: function(e) {
            return E(e, "iframe") ? e.contentDocument : (E(e, "template") && (e = e.content || e), N.merge([], e.childNodes))
        }
    }, function(r, i) {
        N.fn[r] = function(e, t) {
            var n = N.map(this, i, e);
            return "Until" !== r.slice(-5) && (t = e), t && "string" == typeof t && (n = N.filter(t, n)), 1 < this.length && (F[r] || N.uniqueSort(n), H.test(r) && n.reverse()), this.pushStack(n)
        }
    });
    var P = /[^\x20\t\r\n\f]+/g;
    function R(e) {
        return e
    }
    function M(e) {
        throw e
    }
    function I(e, t, n, r) {
        var i;
        try {
            e && N.isFunction(i = e.promise) ? i.call(e).done(t).fail(n) : e && N.isFunction(i = e.then) ? i.call(e, t, n) : t.apply(undefined, [e].slice(r))
        } catch (e) {
            n.apply(undefined, [e])
        }
    }
    N.Callbacks = function(r) {
        r = "string" == typeof r ? function e(e) {
            var n = {};
            return N.each(e.match(P) || [], function(e, t) {
                n[t] = !0
            }), n
        }(r) : N.extend({}, r);
        var i,
            t,
            n,
            o,
            a = [],
            s = [],
            u = -1,
            l = function() {
                for (o = o || r.once, n = i = !0; s.length; u = -1)
                    for (t = s.shift(); ++u < a.length;)
                        !1 === a[u].apply(t[0], t[1]) && r.stopOnFalse && (u = a.length, t = !1);
                r.memory || (t = !1), i = !1, o && (a = t ? [] : "")
            },
            c = {
                add: function() {
                    return a && (t && !i && (u = a.length - 1, s.push(t)), function n(e) {
                        N.each(e, function(e, t) {
                            N.isFunction(t) ? r.unique && c.has(t) || a.push(t) : t && t.length && "string" !== N.type(t) && n(t)
                        })
                    }(arguments), t && !i && l()), this
                },
                remove: function() {
                    return N.each(arguments, function(e, t) {
                        for (var n; -1 < (n = N.inArray(t, a, n));)
                            a.splice(n, 1), n <= u && u--
                    }), this
                },
                has: function(e) {
                    return e ? -1 < N.inArray(e, a) : 0 < a.length
                },
                empty: function() {
                    return a && (a = []), this
                },
                disable: function() {
                    return o = s = [], a = t = "", this
                },
                disabled: function() {
                    return !a
                },
                lock: function() {
                    return o = s = [], t || i || (a = t = ""), this
                },
                locked: function() {
                    return !!o
                },
                fireWith: function(e, t) {
                    return o || (t = [e, (t = t || []).slice ? t.slice() : t], s.push(t), i || l()), this
                },
                fire: function() {
                    return c.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!n
                }
            };
        return c
    }, N.extend({
        Deferred: function(e) {
            var o = [["notify", "progress", N.Callbacks("memory"), N.Callbacks("memory"), 2], ["resolve", "done", N.Callbacks("once memory"), N.Callbacks("once memory"), 0, "resolved"], ["reject", "fail", N.Callbacks("once memory"), N.Callbacks("once memory"), 1, "rejected"]],
                i = "pending",
                a = {
                    state: function() {
                        return i
                    },
                    always: function() {
                        return s.done(arguments).fail(arguments), this
                    },
                    "catch": function(e) {
                        return a.then(null, e)
                    },
                    pipe: function() {
                        var i = arguments;
                        return N.Deferred(function(r) {
                            N.each(o, function(e, t) {
                                var n = N.isFunction(i[t[4]]) && i[t[4]];
                                s[t[1]](function() {
                                    var e = n && n.apply(this, arguments);
                                    e && N.isFunction(e.promise) ? e.promise().progress(r.notify).done(r.resolve).fail(r.reject) : r[t[0] + "With"](this, n ? [e] : arguments)
                                })
                            }), i = null
                        }).promise()
                    },
                    then: function(t, n, r) {
                        var l = 0;
                        function c(o, a, s, u) {
                            return function() {
                                var n = this,
                                    r = arguments,
                                    t = function() {
                                        var e,
                                            t;
                                        if (!(o < l)) {
                                            if ((e = s.apply(n, r)) === a.promise())
                                                throw new TypeError("Thenable self-resolution");
                                            t = e && ("object" == typeof e || "function" == typeof e) && e.then, N.isFunction(t) ? u ? t.call(e, c(l, a, R, u), c(l, a, M, u)) : (l++, t.call(e, c(l, a, R, u), c(l, a, M, u), c(l, a, R, a.notifyWith))) : (s !== R && (n = undefined, r = [e]), (u || a.resolveWith)(n, r))
                                        }
                                    },
                                    i = u ? t : function() {
                                        try {
                                            t()
                                        } catch (e) {
                                            N.Deferred.exceptionHook && N.Deferred.exceptionHook(e, i.stackTrace), l <= o + 1 && (s !== M && (n = undefined, r = [e]), a.rejectWith(n, r))
                                        }
                                    };
                                o ? i() : (N.Deferred.getStackHook && (i.stackTrace = N.Deferred.getStackHook()), k.setTimeout(i))
                            }
                        }
                        return N.Deferred(function(e) {
                            o[0][3].add(c(0, e, N.isFunction(r) ? r : R, e.notifyWith)), o[1][3].add(c(0, e, N.isFunction(t) ? t : R)), o[2][3].add(c(0, e, N.isFunction(n) ? n : M))
                        }).promise()
                    },
                    promise: function(e) {
                        return null != e ? N.extend(e, a) : a
                    }
                },
                s = {};
            return N.each(o, function(e, t) {
                var n = t[2],
                    r = t[5];
                a[t[1]] = n.add, r && n.add(function() {
                    i = r
                }, o[3 - e][2].disable, o[0][2].lock), n.add(t[3].fire), s[t[0]] = function() {
                    return s[t[0] + "With"](this === s ? undefined : this, arguments), this
                }, s[t[0] + "With"] = n.fireWith
            }), a.promise(s), e && e.call(s, s), s
        },
        when: function(e) {
            var n = arguments.length,
                t = n,
                r = Array(t),
                i = s.call(arguments),
                o = N.Deferred(),
                a = function(t) {
                    return function(e) {
                        r[t] = this, i[t] = 1 < arguments.length ? s.call(arguments) : e, --n || o.resolveWith(r, i)
                    }
                };
            if (n <= 1 && (I(e, o.done(a(t)).resolve, o.reject, !n), "pending" === o.state() || N.isFunction(i[t] && i[t].then)))
                return o.then();
            for (; t--;)
                I(i[t], a(t), o.reject);
            return o.promise()
        }
    });
    var W = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    N.Deferred.exceptionHook = function(e, t) {
        k.console && k.console.warn && e && W.test(e.name) && k.console.warn("jQuery.Deferred exception: " + e.message, e.stack, t)
    }, N.readyException = function(e) {
        k.setTimeout(function() {
            throw e
        })
    };
    var $ = N.Deferred();
    function B() {
        S.removeEventListener("DOMContentLoaded", B), k.removeEventListener("load", B), N.ready()
    }
    N.fn.ready = function(e) {
        return $.then(e)["catch"](function(e) {
            N.readyException(e)
        }), this
    }, N.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(e) {
            (!0 === e ? --N.readyWait : N.isReady) || (N.isReady = !0) !== e && 0 < --N.readyWait || $.resolveWith(S, [N])
        }
    }), N.ready.then = $.then, "complete" === S.readyState || "loading" !== S.readyState && !S.documentElement.doScroll ? k.setTimeout(N.ready) : (S.addEventListener("DOMContentLoaded", B), k.addEventListener("load", B));
    var _ = function(e, t, n, r, i, o, a) {
            var s = 0,
                u = e.length,
                l = null == n;
            if ("object" === N.type(n))
                for (s in i = !0, n)
                    _(e, t, s, n[s], !0, o, a);
            else if (r !== undefined && (i = !0, N.isFunction(r) || (a = !0), l && (a ? (t.call(e, r), t = null) : (l = t, t = function(e, t, n) {
                return l.call(N(e), n)
            })), t))
                for (; s < u; s++)
                    t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
            return i ? e : l ? t.call(e) : u ? t(e[0], n) : o
        },
        z = function(e) {
            return 1 === e.nodeType || 9 === e.nodeType || !+e.nodeType
        };
    function X() {
        this.expando = N.expando + X.uid++
    }
    X.uid = 1, X.prototype = {
        cache: function(e) {
            var t = e[this.expando];
            return t || (t = {}, z(e) && (e.nodeType ? e[this.expando] = t : Object.defineProperty(e, this.expando, {
                value: t,
                configurable: !0
            }))), t
        },
        set: function(e, t, n) {
            var r,
                i = this.cache(e);
            if ("string" == typeof t)
                i[N.camelCase(t)] = n;
            else
                for (r in t)
                    i[N.camelCase(r)] = t[r];
            return i
        },
        get: function(e, t) {
            return t === undefined ? this.cache(e) : e[this.expando] && e[this.expando][N.camelCase(t)]
        },
        access: function(e, t, n) {
            return t === undefined || t && "string" == typeof t && n === undefined ? this.get(e, t) : (this.set(e, t, n), n !== undefined ? n : t)
        },
        remove: function(e, t) {
            var n,
                r = e[this.expando];
            if (r !== undefined) {
                if (t !== undefined) {
                    n = (t = Array.isArray(t) ? t.map(N.camelCase) : (t = N.camelCase(t)) in r ? [t] : t.match(P) || []).length;
                    for (; n--;)
                        delete r[t[n]]
                }
                (t === undefined || N.isEmptyObject(r)) && (e.nodeType ? e[this.expando] = undefined : delete e[this.expando])
            }
        },
        hasData: function(e) {
            var t = e[this.expando];
            return t !== undefined && !N.isEmptyObject(t)
        }
    };
    var U = new X,
        V = new X,
        G = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Y = /[A-Z]/g;
    function Q(e, t, n) {
        var r;
        if (n === undefined && 1 === e.nodeType)
            if (r = "data-" + t.replace(Y, "-$&").toLowerCase(), "string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = function i(e) {
                        return "true" === e || "false" !== e && ("null" === e ? null : e === +e + "" ? +e : G.test(e) ? JSON.parse(e) : e)
                    }(n)
                } catch (o) {}
                V.set(e, t, n)
            } else
                n = undefined;
        return n
    }
    N.extend({
        hasData: function(e) {
            return V.hasData(e) || U.hasData(e)
        },
        data: function(e, t, n) {
            return V.access(e, t, n)
        },
        removeData: function(e, t) {
            V.remove(e, t)
        },
        _data: function(e, t, n) {
            return U.access(e, t, n)
        },
        _removeData: function(e, t) {
            U.remove(e, t)
        }
    }), N.fn.extend({
        data: function(n, e) {
            var t,
                r,
                i,
                o = this[0],
                a = o && o.attributes;
            if (n === undefined) {
                if (this.length && (i = V.get(o), 1 === o.nodeType && !U.get(o, "hasDataAttrs"))) {
                    for (t = a.length; t--;)
                        a[t] && 0 === (r = a[t].name).indexOf("data-") && (r = N.camelCase(r.slice(5)), Q(o, r, i[r]));
                    U.set(o, "hasDataAttrs", !0)
                }
                return i
            }
            return "object" == typeof n ? this.each(function() {
                V.set(this, n)
            }) : _(this, function(e) {
                var t;
                if (o && e === undefined)
                    return (t = V.get(o, n)) !== undefined ? t : (t = Q(o, n)) !== undefined ? t : void 0;
                this.each(function() {
                    V.set(this, n, e)
                })
            }, null, e, 1 < arguments.length, null, !0)
        },
        removeData: function(e) {
            return this.each(function() {
                V.remove(this, e)
            })
        }
    }), N.extend({
        queue: function(e, t, n) {
            var r;
            if (e)
                return t = (t || "fx") + "queue", r = U.get(e, t), n && (!r || Array.isArray(n) ? r = U.access(e, t, N.makeArray(n)) : r.push(n)), r || []
        },
        dequeue: function(e, t) {
            t = t || "fx";
            var n = N.queue(e, t),
                r = n.length,
                i = n.shift(),
                o = N._queueHooks(e, t);
            "inprogress" === i && (i = n.shift(), r--), i && ("fx" === t && n.unshift("inprogress"), delete o.stop, i.call(e, function() {
                N.dequeue(e, t)
            }, o)), !r && o && o.empty.fire()
        },
        _queueHooks: function(e, t) {
            var n = t + "queueHooks";
            return U.get(e, n) || U.access(e, n, {
                    empty: N.Callbacks("once memory").add(function() {
                        U.remove(e, [t + "queue", n])
                    })
                })
        }
    }), N.fn.extend({
        queue: function(t, n) {
            var e = 2;
            return "string" != typeof t && (n = t, t = "fx", e--), arguments.length < e ? N.queue(this[0], t) : n === undefined ? this : this.each(function() {
                var e = N.queue(this, t, n);
                N._queueHooks(this, t), "fx" === t && "inprogress" !== e[0] && N.dequeue(this, t)
            })
        },
        dequeue: function(e) {
            return this.each(function() {
                N.dequeue(this, e)
            })
        },
        clearQueue: function(e) {
            return this.queue(e || "fx", [])
        },
        promise: function(e, t) {
            var n,
                r = 1,
                i = N.Deferred(),
                o = this,
                a = this.length,
                s = function() {
                    --r || i.resolveWith(o, [o])
                };
            for ("string" != typeof e && (t = e, e = undefined), e = e || "fx"; a--;)
                (n = U.get(o[a], e + "queueHooks")) && n.empty && (r++, n.empty.add(s));
            return s(), i.promise(t)
        }
    });
    var J = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        K = new RegExp("^(?:([+-])=|)(" + J + ")([a-z%]*)$", "i"),
        Z = ["Top", "Right", "Bottom", "Left"],
        ee = function(e, t) {
            return "none" === (e = t || e).style.display || "" === e.style.display && N.contains(e.ownerDocument, e) && "none" === N.css(e, "display")
        },
        te = function(e, t, n, r) {
            var i,
                o,
                a = {};
            for (o in t)
                a[o] = e.style[o], e.style[o] = t[o];
            for (o in i = n.apply(e, r || []), t)
                e.style[o] = a[o];
            return i
        };
    function ne(e, t, n, r) {
        var i,
            o = 1,
            a = 20,
            s = r ? function() {
                return r.cur()
            } : function() {
                return N.css(e, t, "")
            },
            u = s(),
            l = n && n[3] || (N.cssNumber[t] ? "" : "px"),
            c = (N.cssNumber[t] || "px" !== l && +u) && K.exec(N.css(e, t));
        if (c && c[3] !== l)
            for (l = l || c[3], n = n || [], c = +u || 1; c /= o = o || ".5", N.style(e, t, c + l), o !== (o = s() / u) && 1 !== o && --a;)
                ;
        return n && (c = +c || +u || 0, i = n[1] ? c + (n[1] + 1) * n[2] : +n[2], r && (r.unit = l, r.start = c, r.end = i)), i
    }
    var re = {};
    function ie(e, t) {
        for (var n, r, i, o, a, s, u, l = [], c = 0, f = e.length; c < f; c++)
            (r = e[c]).style && (n = r.style.display, t ? ("none" === n && (l[c] = U.get(r, "display") || null, l[c] || (r.style.display = "")), "" === r.style.display && ee(r) && (l[c] = (u = a = o = void 0, a = (i = r).ownerDocument, s = i.nodeName, (u = re[s]) || (o = a.body.appendChild(a.createElement(s)), u = N.css(o, "display"), o.parentNode.removeChild(o), "none" === u && (u = "block"), re[s] = u)))) : "none" !== n && (l[c] = "none", U.set(r, "display", n)));
        for (c = 0; c < f; c++)
            null != l[c] && (e[c].style.display = l[c]);
        return e
    }
    N.fn.extend({
        show: function() {
            return ie(this, !0)
        },
        hide: function() {
            return ie(this)
        },
        toggle: function(e) {
            return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each(function() {
                ee(this) ? N(this).show() : N(this).hide()
            })
        }
    });
    var oe = /^(?:checkbox|radio)$/i,
        ae = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        se = /^$|\/(?:java|ecma)script/i,
        ue = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    function le(e, t) {
        var n;
        return n = "undefined" != typeof e.getElementsByTagName ? e.getElementsByTagName(t || "*") : "undefined" != typeof e.querySelectorAll ? e.querySelectorAll(t || "*") : [], t === undefined || t && E(e, t) ? N.merge([e], n) : n
    }
    function ce(e, t) {
        for (var n = 0, r = e.length; n < r; n++)
            U.set(e[n], "globalEval", !t || U.get(t[n], "globalEval"))
    }
    ue.optgroup = ue.option, ue.tbody = ue.tfoot = ue.colgroup = ue.caption = ue.thead, ue.th = ue.td;
    var fe,
        de,
        pe = /<|&#?\w+;/;
    function he(e, t, n, r, i) {
        for (var o, a, s, u, l, c, f = t.createDocumentFragment(), d = [], p = 0, h = e.length; p < h; p++)
            if ((o = e[p]) || 0 === o)
                if ("object" === N.type(o))
                    N.merge(d, o.nodeType ? [o] : o);
                else if (pe.test(o)) {
                    for (a = a || f.appendChild(t.createElement("div")), s = (ae.exec(o) || ["", ""])[1].toLowerCase(), u = ue[s] || ue._default, a.innerHTML = u[1] + N.htmlPrefilter(o) + u[2], c = u[0]; c--;)
                        a = a.lastChild;
                    N.merge(d, a.childNodes), (a = f.firstChild).textContent = ""
                } else
                    d.push(t.createTextNode(o));
        for (f.textContent = "", p = 0; o = d[p++];)
            if (r && -1 < N.inArray(o, r))
                i && i.push(o);
            else if (l = N.contains(o.ownerDocument, o), a = le(f.appendChild(o), "script"), l && ce(a), n)
                for (c = 0; o = a[c++];)
                    se.test(o.type || "") && n.push(o);
        return f
    }
    fe = S.createDocumentFragment().appendChild(S.createElement("div")), (de = S.createElement("input")).setAttribute("type", "radio"), de.setAttribute("checked", "checked"), de.setAttribute("name", "t"), fe.appendChild(de), y.checkClone = fe.cloneNode(!0).cloneNode(!0).lastChild.checked, fe.innerHTML = "<textarea>x</textarea>", y.noCloneChecked = !!fe.cloneNode(!0).lastChild.defaultValue;
    var ge = S.documentElement,
        ye = /^key/,
        me = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        ve = /^([^.]*)(?:\.(.+)|)/;
    function xe() {
        return !0
    }
    function be() {
        return !1
    }
    function we() {
        try {
            return S.activeElement
        } catch (e) {}
    }
    function Te(e, t, n, r, i, o) {
        var a,
            s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n, n = undefined), t)
                Te(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n, r = n = undefined) : null == i && ("string" == typeof n ? (i = r, r = undefined) : (i = r, r = n, n = undefined)), !1 === i)
            i = be;
        else if (!i)
            return e;
        return 1 === o && (a = i, (i = function(e) {
            return N().off(e), a.apply(this, arguments)
        }).guid = a.guid || (a.guid = N.guid++)), e.each(function() {
            N.event.add(this, t, i, r, n)
        })
    }
    N.event = {
        global: {},
        add: function(t, e, n, r, i) {
            var o,
                a,
                s,
                u,
                l,
                c,
                f,
                d,
                p,
                h,
                g,
                y = U.get(t);
            if (y)
                for (n.handler && (n = (o = n).handler, i = o.selector), i && N.find.matchesSelector(ge, i), n.guid || (n.guid = N.guid++), (u = y.events) || (u = y.events = {}), (a = y.handle) || (a = y.handle = function(e) {
                    return void 0 !== N && N.event.triggered !== e.type ? N.event.dispatch.apply(t, arguments) : undefined
                }), l = (e = (e || "").match(P) || [""]).length; l--;)
                    p = g = (s = ve.exec(e[l]) || [])[1], h = (s[2] || "").split(".").sort(), p && (f = N.event.special[p] || {}, p = (i ? f.delegateType : f.bindType) || p, f = N.event.special[p] || {}, c = N.extend({
                        type: p,
                        origType: g,
                        data: r,
                        handler: n,
                        guid: n.guid,
                        selector: i,
                        needsContext: i && N.expr.match.needsContext.test(i),
                        namespace: h.join(".")
                    }, o), (d = u[p]) || ((d = u[p] = []).delegateCount = 0, f.setup && !1 !== f.setup.call(t, r, h, a) || t.addEventListener && t.addEventListener(p, a)), f.add && (f.add.call(t, c), c.handler.guid || (c.handler.guid = n.guid)), i ? d.splice(d.delegateCount++, 0, c) : d.push(c), N.event.global[p] = !0)
        },
        remove: function(e, t, n, r, i) {
            var o,
                a,
                s,
                u,
                l,
                c,
                f,
                d,
                p,
                h,
                g,
                y = U.hasData(e) && U.get(e);
            if (y && (u = y.events)) {
                for (l = (t = (t || "").match(P) || [""]).length; l--;)
                    if (p = g = (s = ve.exec(t[l]) || [])[1], h = (s[2] || "").split(".").sort(), p) {
                        for (f = N.event.special[p] || {}, d = u[p = (r ? f.delegateType : f.bindType) || p] || [], s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"), a = o = d.length; o--;)
                            c = d[o], !i && g !== c.origType || n && n.guid !== c.guid || s && !s.test(c.namespace) || r && r !== c.selector && ("**" !== r || !c.selector) || (d.splice(o, 1), c.selector && d.delegateCount--, f.remove && f.remove.call(e, c));
                        a && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, y.handle) || N.removeEvent(e, p, y.handle), delete u[p])
                    } else
                        for (p in u)
                            N.event.remove(e, p + t[l], n, r, !0);
                N.isEmptyObject(u) && U.remove(e, "handle events")
            }
        },
        dispatch: function(e) {
            var t,
                n,
                r,
                i,
                o,
                a,
                s = N.event.fix(e),
                u = new Array(arguments.length),
                l = (U.get(this, "events") || {})[s.type] || [],
                c = N.event.special[s.type] || {};
            for (u[0] = s, t = 1; t < arguments.length; t++)
                u[t] = arguments[t];
            if (s.delegateTarget = this, !c.preDispatch || !1 !== c.preDispatch.call(this, s)) {
                for (a = N.event.handlers.call(this, s, l), t = 0; (i = a[t++]) && !s.isPropagationStopped();)
                    for (s.currentTarget = i.elem, n = 0; (o = i.handlers[n++]) && !s.isImmediatePropagationStopped();)
                        s.rnamespace && !s.rnamespace.test(o.namespace) || (s.handleObj = o, s.data = o.data, (r = ((N.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, u)) !== undefined && !1 === (s.result = r) && (s.preventDefault(), s.stopPropagation()));
                return c.postDispatch && c.postDispatch.call(this, s), s.result
            }
        },
        handlers: function(e, t) {
            var n,
                r,
                i,
                o,
                a,
                s = [],
                u = t.delegateCount,
                l = e.target;
            if (u && l.nodeType && !("click" === e.type && 1 <= e.button))
                for (; l !== this; l = l.parentNode || this)
                    if (1 === l.nodeType && ("click" !== e.type || !0 !== l.disabled)) {
                        for (o = [], a = {}, n = 0; n < u; n++)
                            a[i = (r = t[n]).selector + " "] === undefined && (a[i] = r.needsContext ? -1 < N(i, this).index(l) : N.find(i, this, null, [l]).length), a[i] && o.push(r);
                        o.length && s.push({
                            elem: l,
                            handlers: o
                        })
                    }
            return l = this, u < t.length && s.push({
                elem: l,
                handlers: t.slice(u)
            }), s
        },
        addProp: function(t, e) {
            Object.defineProperty(N.Event.prototype, t, {
                enumerable: !0,
                configurable: !0,
                get: N.isFunction(e) ? function() {
                    if (this.originalEvent)
                        return e(this.originalEvent)
                } : function() {
                    if (this.originalEvent)
                        return this.originalEvent[t]
                },
                set: function(e) {
                    Object.defineProperty(this, t, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: e
                    })
                }
            })
        },
        fix: function(e) {
            return e[N.expando] ? e : new N.Event(e)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== we() && this.focus)
                        return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === we() && this.blur)
                        return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && E(this, "input"))
                        return this.click(), !1
                },
                _default: function(e) {
                    return E(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(e) {
                    e.result !== undefined && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        }
    }, N.removeEvent = function(e, t, n) {
        e.removeEventListener && e.removeEventListener(t, n)
    }, N.Event = function(e, t) {
        if (!(this instanceof N.Event))
            return new N.Event(e, t);
        e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.defaultPrevented === undefined && !1 === e.returnValue ? xe : be, this.target = e.target && 3 === e.target.nodeType ? e.target.parentNode : e.target, this.currentTarget = e.currentTarget, this.relatedTarget = e.relatedTarget) : this.type = e, t && N.extend(this, t), this.timeStamp = e && e.timeStamp || N.now(), this[N.expando] = !0
    }, N.Event.prototype = {
        constructor: N.Event,
        isDefaultPrevented: be,
        isPropagationStopped: be,
        isImmediatePropagationStopped: be,
        isSimulated: !1,
        preventDefault: function() {
            var e = this.originalEvent;
            this.isDefaultPrevented = xe, e && !this.isSimulated && e.preventDefault()
        },
        stopPropagation: function() {
            var e = this.originalEvent;
            this.isPropagationStopped = xe, e && !this.isSimulated && e.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var e = this.originalEvent;
            this.isImmediatePropagationStopped = xe, e && !this.isSimulated && e.stopImmediatePropagation(), this.stopPropagation()
        }
    }, N.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(e) {
            var t = e.button;
            return null == e.which && ye.test(e.type) ? null != e.charCode ? e.charCode : e.keyCode : !e.which && t !== undefined && me.test(e.type) ? 1 & t ? 1 : 2 & t ? 3 : 4 & t ? 2 : 0 : e.which
        }
    }, N.event.addProp), N.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(e, i) {
        N.event.special[e] = {
            delegateType: i,
            bindType: i,
            handle: function(e) {
                var t,
                    n = e.relatedTarget,
                    r = e.handleObj;
                return n && (n === this || N.contains(this, n)) || (e.type = r.origType, t = r.handler.apply(this, arguments), e.type = i), t
            }
        }
    }), N.fn.extend({
        on: function(e, t, n, r) {
            return Te(this, e, t, n, r)
        },
        one: function(e, t, n, r) {
            return Te(this, e, t, n, r, 1)
        },
        off: function(e, t, n) {
            var r,
                i;
            if (e && e.preventDefault && e.handleObj)
                return r = e.handleObj, N(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler), this;
            if ("object" == typeof e) {
                for (i in e)
                    this.off(i, t, e[i]);
                return this
            }
            return !1 !== t && "function" != typeof t || (n = t, t = undefined), !1 === n && (n = be), this.each(function() {
                N.event.remove(this, e, n, t)
            })
        }
    });
    var Ce = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        Ee = /<script|<style|<link/i,
        ke = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Se = /^true\/(.*)/,
        Ne = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    function De(e, t) {
        return E(e, "table") && E(11 !== t.nodeType ? t : t.firstChild, "tr") && N(">tbody", e)[0] || e
    }
    function je(e) {
        return e.type = (null !== e.getAttribute("type")) + "/" + e.type, e
    }
    function Ae(e) {
        var t = Se.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"), e
    }
    function qe(e, t) {
        var n,
            r,
            i,
            o,
            a,
            s,
            u,
            l;
        if (1 === t.nodeType) {
            if (U.hasData(e) && (o = U.access(e), a = U.set(t, o), l = o.events))
                for (i in delete a.handle, a.events = {}, l)
                    for (n = 0, r = l[i].length; n < r; n++)
                        N.event.add(t, i, l[i][n]);
            V.hasData(e) && (s = V.access(e), u = N.extend({}, s), V.set(t, u))
        }
    }
    function Le(n, r, i, o) {
        r = g.apply([], r);
        var e,
            t,
            a,
            s,
            u,
            l,
            c = 0,
            f = n.length,
            d = f - 1,
            p = r[0],
            h = N.isFunction(p);
        if (h || 1 < f && "string" == typeof p && !y.checkClone && ke.test(p))
            return n.each(function(e) {
                var t = n.eq(e);
                h && (r[0] = p.call(this, e, t.html())), Le(t, r, i, o)
            });
        if (f && (t = (e = he(r, n[0].ownerDocument, !1, n, o)).firstChild, 1 === e.childNodes.length && (e = t), t || o)) {
            for (s = (a = N.map(le(e, "script"), je)).length; c < f; c++)
                u = e, c !== d && (u = N.clone(u, !0, !0), s && N.merge(a, le(u, "script"))), i.call(n[c], u, c);
            if (s)
                for (l = a[a.length - 1].ownerDocument, N.map(a, Ae), c = 0; c < s; c++)
                    u = a[c], se.test(u.type || "") && !U.access(u, "globalEval") && N.contains(l, u) && (u.src ? N._evalUrl && N._evalUrl(u.src) : m(u.textContent.replace(Ne, ""), l))
        }
        return n
    }
    function He(e, t, n) {
        for (var r, i = t ? N.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || N.cleanData(le(r)), r.parentNode && (n && N.contains(r.ownerDocument, r) && ce(le(r, "script")), r.parentNode.removeChild(r));
        return e
    }
    N.extend({
        htmlPrefilter: function(e) {
            return e.replace(Ce, "<$1></$2>")
        },
        clone: function(e, t, n) {
            var r,
                i,
                o,
                a,
                s,
                u,
                l,
                c = e.cloneNode(!0),
                f = N.contains(e.ownerDocument, e);
            if (!(y.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || N.isXMLDoc(e)))
                for (a = le(c), r = 0, i = (o = le(e)).length; r < i; r++)
                    s = o[r], u = a[r], void 0, "input" === (l = u.nodeName.toLowerCase()) && oe.test(s.type) ? u.checked = s.checked : "input" !== l && "textarea" !== l || (u.defaultValue = s.defaultValue);
            if (t)
                if (n)
                    for (o = o || le(e), a = a || le(c), r = 0, i = o.length; r < i; r++)
                        qe(o[r], a[r]);
                else
                    qe(e, c);
            return 0 < (a = le(c, "script")).length && ce(a, !f && le(e, "script")), c
        },
        cleanData: function(e) {
            for (var t, n, r, i = N.event.special, o = 0; (n = e[o]) !== undefined; o++)
                if (z(n)) {
                    if (t = n[U.expando]) {
                        if (t.events)
                            for (r in t.events)
                                i[r] ? N.event.remove(n, r) : N.removeEvent(n, r, t.handle);
                        n[U.expando] = undefined
                    }
                    n[V.expando] && (n[V.expando] = undefined)
                }
        }
    }), N.fn.extend({
        detach: function(e) {
            return He(this, e, !0)
        },
        remove: function(e) {
            return He(this, e)
        },
        text: function(e) {
            return _(this, function(e) {
                return e === undefined ? N.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = e)
                })
            }, null, e, arguments.length)
        },
        append: function() {
            return Le(this, arguments, function(e) {
                1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || De(this, e).appendChild(e)
            })
        },
        prepend: function() {
            return Le(this, arguments, function(e) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var t = De(this, e);
                    t.insertBefore(e, t.firstChild)
                }
            })
        },
        before: function() {
            return Le(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this)
            })
        },
        after: function() {
            return Le(this, arguments, function(e) {
                this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
            })
        },
        empty: function() {
            for (var e, t = 0; null != (e = this[t]); t++)
                1 === e.nodeType && (N.cleanData(le(e, !1)), e.textContent = "");
            return this
        },
        clone: function(e, t) {
            return e = null != e && e, t = null == t ? e : t, this.map(function() {
                return N.clone(this, e, t)
            })
        },
        html: function(e) {
            return _(this, function(e) {
                var t = this[0] || {},
                    n = 0,
                    r = this.length;
                if (e === undefined && 1 === t.nodeType)
                    return t.innerHTML;
                if ("string" == typeof e && !Ee.test(e) && !ue[(ae.exec(e) || ["", ""])[1].toLowerCase()]) {
                    e = N.htmlPrefilter(e);
                    try {
                        for (; n < r; n++)
                            1 === (t = this[n] || {}).nodeType && (N.cleanData(le(t, !1)), t.innerHTML = e);
                        t = 0
                    } catch (i) {}
                }
                t && this.empty().append(e)
            }, null, e, arguments.length)
        },
        replaceWith: function() {
            var n = [];
            return Le(this, arguments, function(e) {
                var t = this.parentNode;
                N.inArray(this, n) < 0 && (N.cleanData(le(this)), t && t.replaceChild(e, this))
            }, n)
        }
    }), N.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(e, a) {
        N.fn[e] = function(e) {
            for (var t, n = [], r = N(e), i = r.length - 1, o = 0; o <= i; o++)
                t = o === i ? this : this.clone(!0), N(r[o])[a](t), u.apply(n, t.get());
            return this.pushStack(n)
        }
    });
    var Fe = /^margin/,
        Oe = new RegExp("^(" + J + ")(?!px)[a-z%]+$", "i"),
        Pe = function(e) {
            var t = e.ownerDocument.defaultView;
            return t && t.opener || (t = k), t.getComputedStyle(e)
        };
    function Re(e, t, n) {
        var r,
            i,
            o,
            a,
            s = e.style;
        return (n = n || Pe(e)) && ("" !== (a = n.getPropertyValue(t) || n[t]) || N.contains(e.ownerDocument, e) || (a = N.style(e, t)), !y.pixelMarginRight() && Oe.test(a) && Fe.test(t) && (r = s.width, i = s.minWidth, o = s.maxWidth, s.minWidth = s.maxWidth = s.width = a, a = n.width, s.width = r, s.minWidth = i, s.maxWidth = o)), a !== undefined ? a + "" : a
    }
    function Me(e, t) {
        return {
            get: function() {
                if (!e())
                    return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }
    !function() {
        function e() {
            if (a) {
                a.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%", a.innerHTML = "", ge.appendChild(o);
                var e = k.getComputedStyle(a);
                t = "1%" !== e.top, i = "2px" === e.marginLeft, n = "4px" === e.width, a.style.marginRight = "50%", r = "4px" === e.marginRight, ge.removeChild(o), a = null
            }
        }
        var t,
            n,
            r,
            i,
            o = S.createElement("div"),
            a = S.createElement("div");
        a.style && (a.style.backgroundClip = "content-box", a.cloneNode(!0).style.backgroundClip = "", y.clearCloneStyle = "content-box" === a.style.backgroundClip, o.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", o.appendChild(a), N.extend(y, {
            pixelPosition: function() {
                return e(), t
            },
            boxSizingReliable: function() {
                return e(), n
            },
            pixelMarginRight: function() {
                return e(), r
            },
            reliableMarginLeft: function() {
                return e(), i
            }
        }))
    }();
    var Ie = /^(none|table(?!-c[ea]).+)/,
        We = /^--/,
        $e = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        Be = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        _e = ["Webkit", "Moz", "ms"],
        ze = S.createElement("div").style;
    function Xe(e) {
        var t = N.cssProps[e];
        return t || (t = N.cssProps[e] = function n(e) {
            if (e in ze)
                return e;
            for (var t = e[0].toUpperCase() + e.slice(1), n = _e.length; n--;)
                if ((e = _e[n] + t) in ze)
                    return e
        }(e) || e), t
    }
    function Ue(e, t, n) {
        var r = K.exec(t);
        return r ? Math.max(0, r[2] - (n || 0)) + (r[3] || "px") : t
    }
    function Ve(e, t, n, r, i) {
        var o,
            a = 0;
        for (o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0; o < 4; o += 2)
            "margin" === n && (a += N.css(e, n + Z[o], !0, i)), r ? ("content" === n && (a -= N.css(e, "padding" + Z[o], !0, i)), "margin" !== n && (a -= N.css(e, "border" + Z[o] + "Width", !0, i))) : (a += N.css(e, "padding" + Z[o], !0, i), "padding" !== n && (a += N.css(e, "border" + Z[o] + "Width", !0, i)));
        return a
    }
    function Ge(e, t, n) {
        var r,
            i = Pe(e),
            o = Re(e, t, i),
            a = "border-box" === N.css(e, "boxSizing", !1, i);
        return Oe.test(o) ? o : (r = a && (y.boxSizingReliable() || o === e.style[t]), "auto" === o && (o = e["offset" + t[0].toUpperCase() + t.slice(1)]), (o = parseFloat(o) || 0) + Ve(e, t, n || (a ? "border" : "content"), r, i) + "px")
    }
    function Ye(e, t, n, r, i) {
        return new Ye.prototype.init(e, t, n, r, i)
    }
    N.extend({
        cssHooks: {
            opacity: {
                get: function(e, t) {
                    if (t) {
                        var n = Re(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i,
                    o,
                    a,
                    s = N.camelCase(t),
                    u = We.test(t),
                    l = e.style;
                if (u || (t = Xe(s)), a = N.cssHooks[t] || N.cssHooks[s], n === undefined)
                    return a && "get" in a && (i = a.get(e, !1, r)) !== undefined ? i : l[t];
                "string" === (o = typeof n) && (i = K.exec(n)) && i[1] && (n = ne(e, t, i), o = "number"), null != n && n == n && ("number" === o && (n += i && i[3] || (N.cssNumber[s] ? "" : "px")), y.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"), a && "set" in a && (n = a.set(e, n, r)) === undefined || (u ? l.setProperty(t, n) : l[t] = n))
            }
        },
        css: function(e, t, n, r) {
            var i,
                o,
                a,
                s = N.camelCase(t);
            return We.test(t) || (t = Xe(s)), (a = N.cssHooks[t] || N.cssHooks[s]) && "get" in a && (i = a.get(e, !0, n)), i === undefined && (i = Re(e, t, r)), "normal" === i && t in Be && (i = Be[t]), "" === n || n ? (o = parseFloat(i), !0 === n || isFinite(o) ? o || 0 : i) : i
        }
    }), N.each(["height", "width"], function(e, a) {
        N.cssHooks[a] = {
            get: function(e, t, n) {
                if (t)
                    return !Ie.test(N.css(e, "display")) || e.getClientRects().length && e.getBoundingClientRect().width ? Ge(e, a, n) : te(e, $e, function() {
                        return Ge(e, a, n)
                    })
            },
            set: function(e, t, n) {
                var r,
                    i = n && Pe(e),
                    o = n && Ve(e, a, n, "border-box" === N.css(e, "boxSizing", !1, i), i);
                return o && (r = K.exec(t)) && "px" !== (r[3] || "px") && (e.style[a] = t, t = N.css(e, a)), Ue(0, t, o)
            }
        }
    }), N.cssHooks.marginLeft = Me(y.reliableMarginLeft, function(e, t) {
        if (t)
            return (parseFloat(Re(e, "marginLeft")) || e.getBoundingClientRect().left - te(e, {
                marginLeft: 0
            }, function() {
                return e.getBoundingClientRect().left
            })) + "px"
    }), N.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(i, o) {
        N.cssHooks[i + o] = {
            expand: function(e) {
                for (var t = 0, n = {}, r = "string" == typeof e ? e.split(" ") : [e]; t < 4; t++)
                    n[i + Z[t] + o] = r[t] || r[t - 2] || r[0];
                return n
            }
        }, Fe.test(i) || (N.cssHooks[i + o].set = Ue)
    }), N.fn.extend({
        css: function(e, t) {
            return _(this, function(e, t, n) {
                var r,
                    i,
                    o = {},
                    a = 0;
                if (Array.isArray(t)) {
                    for (r = Pe(e), i = t.length; a < i; a++)
                        o[t[a]] = N.css(e, t[a], !1, r);
                    return o
                }
                return n !== undefined ? N.style(e, t, n) : N.css(e, t)
            }, e, t, 1 < arguments.length)
        }
    }), ((N.Tween = Ye).prototype = {
        constructor: Ye,
        init: function(e, t, n, r, i, o) {
            this.elem = e, this.prop = n, this.easing = i || N.easing._default, this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = o || (N.cssNumber[n] ? "" : "px")
        },
        cur: function() {
            var e = Ye.propHooks[this.prop];
            return e && e.get ? e.get(this) : Ye.propHooks._default.get(this)
        },
        run: function(e) {
            var t,
                n = Ye.propHooks[this.prop];
            return this.options.duration ? this.pos = t = N.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Ye.propHooks._default.set(this), this
        }
    }).init.prototype = Ye.prototype, (Ye.propHooks = {
        _default: {
            get: function(e) {
                var t;
                return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = N.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
            },
            set: function(e) {
                N.fx.step[e.prop] ? N.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[N.cssProps[e.prop]] && !N.cssHooks[e.prop] ? e.elem[e.prop] = e.now : N.style(e.elem, e.prop, e.now + e.unit)
            }
        }
    }).scrollTop = Ye.propHooks.scrollLeft = {
        set: function(e) {
            e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
        }
    }, N.easing = {
        linear: function(e) {
            return e
        },
        swing: function(e) {
            return .5 - Math.cos(e * Math.PI) / 2
        },
        _default: "swing"
    }, N.fx = Ye.prototype.init, N.fx.step = {};
    var Qe,
        Je,
        Ke,
        Ze,
        et = /^(?:toggle|show|hide)$/,
        tt = /queueHooks$/;
    function nt() {
        Je && (!1 === S.hidden && k.requestAnimationFrame ? k.requestAnimationFrame(nt) : k.setTimeout(nt, N.fx.interval), N.fx.tick())
    }
    function rt() {
        return k.setTimeout(function() {
            Qe = undefined
        }), Qe = N.now()
    }
    function it(e, t) {
        var n,
            r = 0,
            i = {
                height: e
            };
        for (t = t ? 1 : 0; r < 4; r += 2 - t)
            i["margin" + (n = Z[r])] = i["padding" + n] = e;
        return t && (i.opacity = i.width = e), i
    }
    function ot(e, t, n) {
        for (var r, i = (at.tweeners[t] || []).concat(at.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function at(o, e, t) {
        var n,
            a,
            r = 0,
            i = at.prefilters.length,
            s = N.Deferred().always(function() {
                delete u.elem
            }),
            u = function() {
                if (a)
                    return !1;
                for (var e = Qe || rt(), t = Math.max(0, l.startTime + l.duration - e), n = 1 - (t / l.duration || 0), r = 0, i = l.tweens.length; r < i; r++)
                    l.tweens[r].run(n);
                return s.notifyWith(o, [l, n, t]), n < 1 && i ? t : (i || s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l]), !1)
            },
            l = s.promise({
                elem: o,
                props: N.extend({}, e),
                opts: N.extend(!0, {
                    specialEasing: {},
                    easing: N.easing._default
                }, t),
                originalProperties: e,
                originalOptions: t,
                startTime: Qe || rt(),
                duration: t.duration,
                tweens: [],
                createTween: function(e, t) {
                    var n = N.Tween(o, l.opts, e, t, l.opts.specialEasing[e] || l.opts.easing);
                    return l.tweens.push(n), n
                },
                stop: function(e) {
                    var t = 0,
                        n = e ? l.tweens.length : 0;
                    if (a)
                        return this;
                    for (a = !0; t < n; t++)
                        l.tweens[t].run(1);
                    return e ? (s.notifyWith(o, [l, 1, 0]), s.resolveWith(o, [l, e])) : s.rejectWith(o, [l, e]), this
                }
            }),
            c = l.props;
        for (!function f(e, t) {
            var n,
                r,
                i,
                o,
                a;
            for (n in e)
                if (i = t[r = N.camelCase(n)], o = e[n], Array.isArray(o) && (i = o[1], o = e[n] = o[0]), n !== r && (e[r] = o, delete e[n]), (a = N.cssHooks[r]) && "expand" in a)
                    for (n in o = a.expand(o), delete e[r], o)
                        n in e || (e[n] = o[n], t[n] = i);
                else
                    t[r] = i
        }(c, l.opts.specialEasing); r < i; r++)
            if (n = at.prefilters[r].call(l, o, c, l.opts))
                return N.isFunction(n.stop) && (N._queueHooks(l.elem, l.opts.queue).stop = N.proxy(n.stop, n)), n;
        return N.map(c, ot, l), N.isFunction(l.opts.start) && l.opts.start.call(o, l), l.progress(l.opts.progress).done(l.opts.done, l.opts.complete).fail(l.opts.fail).always(l.opts.always), N.fx.timer(N.extend(u, {
            elem: o,
            anim: l,
            queue: l.opts.queue
        })), l
    }
    N.Animation = N.extend(at, {
        tweeners: {
            "*": [function(e, t) {
                var n = this.createTween(e, t);
                return ne(n.elem, e, K.exec(t), n), n
            }]
        },
        tweener: function(e, t) {
            N.isFunction(e) ? (t = e, e = ["*"]) : e = e.match(P);
            for (var n, r = 0, i = e.length; r < i; r++)
                n = e[r], at.tweeners[n] = at.tweeners[n] || [], at.tweeners[n].unshift(t)
        },
        prefilters: [function st(e, t, n) {
            var r,
                i,
                o,
                a,
                s,
                u,
                l,
                c,
                f = "width" in t || "height" in t,
                d = this,
                p = {},
                h = e.style,
                g = e.nodeType && ee(e),
                y = U.get(e, "fxshow");
            for (r in n.queue || (null == (a = N._queueHooks(e, "fx")).unqueued && (a.unqueued = 0, s = a.empty.fire, a.empty.fire = function() {
                a.unqueued || s()
            }), a.unqueued++, d.always(function() {
                d.always(function() {
                    a.unqueued--, N.queue(e, "fx").length || a.empty.fire()
                })
            })), t)
                if (i = t[r], et.test(i)) {
                    if (delete t[r], o = o || "toggle" === i, i === (g ? "hide" : "show")) {
                        if ("show" !== i || !y || y[r] === undefined)
                            continue;
                        g = !0
                    }
                    p[r] = y && y[r] || N.style(e, r)
                }
            if ((u = !N.isEmptyObject(t)) || !N.isEmptyObject(p))
                for (r in f && 1 === e.nodeType && (n.overflow = [h.overflow, h.overflowX, h.overflowY], null == (l = y && y.display) && (l = U.get(e, "display")), "none" === (c = N.css(e, "display")) && (l ? c = l : (ie([e], !0), l = e.style.display || l, c = N.css(e, "display"), ie([e]))), ("inline" === c || "inline-block" === c && null != l) && "none" === N.css(e, "float") && (u || (d.done(function() {
                    h.display = l
                }), null == l && (c = h.display, l = "none" === c ? "" : c)), h.display = "inline-block")), n.overflow && (h.overflow = "hidden", d.always(function() {
                    h.overflow = n.overflow[0], h.overflowX = n.overflow[1], h.overflowY = n.overflow[2]
                })), u = !1, p)
                    u || (y ? "hidden" in y && (g = y.hidden) : y = U.access(e, "fxshow", {
                        display: l
                    }), o && (y.hidden = !g), g && ie([e], !0), d.done(function() {
                        for (r in g || ie([e]), U.remove(e, "fxshow"), p)
                            N.style(e, r, p[r])
                    })), u = ot(g ? y[r] : 0, r, d), r in y || (y[r] = u.start, g && (u.end = u.start, u.start = 0))
        }],
        prefilter: function(e, t) {
            t ? at.prefilters.unshift(e) : at.prefilters.push(e)
        }
    }), N.speed = function(e, t, n) {
        var r = e && "object" == typeof e ? N.extend({}, e) : {
            complete: n || !n && t || N.isFunction(e) && e,
            duration: e,
            easing: n && t || t && !N.isFunction(t) && t
        };
        return N.fx.off ? r.duration = 0 : "number" != typeof r.duration && (r.duration in N.fx.speeds ? r.duration = N.fx.speeds[r.duration] : r.duration = N.fx.speeds._default), null != r.queue && !0 !== r.queue || (r.queue = "fx"), r.old = r.complete, r.complete = function() {
            N.isFunction(r.old) && r.old.call(this), r.queue && N.dequeue(this, r.queue)
        }, r
    }, N.fn.extend({
        fadeTo: function(e, t, n, r) {
            return this.filter(ee).css("opacity", 0).show().end().animate({
                opacity: t
            }, e, n, r)
        },
        animate: function(t, e, n, r) {
            var i = N.isEmptyObject(t),
                o = N.speed(e, n, r),
                a = function() {
                    var e = at(this, N.extend({}, t), o);
                    (i || U.get(this, "finish")) && e.stop(!0)
                };
            return a.finish = a, i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
        },
        stop: function(i, e, o) {
            var a = function(e) {
                var t = e.stop;
                delete e.stop, t(o)
            };
            return "string" != typeof i && (o = e, e = i, i = undefined), e && !1 !== i && this.queue(i || "fx", []), this.each(function() {
                var e = !0,
                    t = null != i && i + "queueHooks",
                    n = N.timers,
                    r = U.get(this);
                if (t)
                    r[t] && r[t].stop && a(r[t]);
                else
                    for (t in r)
                        r[t] && r[t].stop && tt.test(t) && a(r[t]);
                for (t = n.length; t--;)
                    n[t].elem !== this || null != i && n[t].queue !== i || (n[t].anim.stop(o), e = !1, n.splice(t, 1));
                !e && o || N.dequeue(this, i)
            })
        },
        finish: function(a) {
            return !1 !== a && (a = a || "fx"), this.each(function() {
                var e,
                    t = U.get(this),
                    n = t[a + "queue"],
                    r = t[a + "queueHooks"],
                    i = N.timers,
                    o = n ? n.length : 0;
                for (t.finish = !0, N.queue(this, a, []), r && r.stop && r.stop.call(this, !0), e = i.length; e--;)
                    i[e].elem === this && i[e].queue === a && (i[e].anim.stop(!0), i.splice(e, 1));
                for (e = 0; e < o; e++)
                    n[e] && n[e].finish && n[e].finish.call(this);
                delete t.finish
            })
        }
    }), N.each(["toggle", "show", "hide"], function(e, r) {
        var i = N.fn[r];
        N.fn[r] = function(e, t, n) {
            return null == e || "boolean" == typeof e ? i.apply(this, arguments) : this.animate(it(r, !0), e, t, n)
        }
    }), N.each({
        slideDown: it("show"),
        slideUp: it("hide"),
        slideToggle: it("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(e, r) {
        N.fn[e] = function(e, t, n) {
            return this.animate(r, e, t, n)
        }
    }), N.timers = [], N.fx.tick = function() {
        var e,
            t = 0,
            n = N.timers;
        for (Qe = N.now(); t < n.length; t++)
            (e = n[t])() || n[t] !== e || n.splice(t--, 1);
        n.length || N.fx.stop(), Qe = undefined
    }, N.fx.timer = function(e) {
        N.timers.push(e), N.fx.start()
    }, N.fx.interval = 13, N.fx.start = function() {
        Je || (Je = !0, nt())
    }, N.fx.stop = function() {
        Je = null
    }, N.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    }, N.fn.delay = function(r, e) {
        return r = N.fx && N.fx.speeds[r] || r, e = e || "fx", this.queue(e, function(e, t) {
            var n = k.setTimeout(e, r);
            t.stop = function() {
                k.clearTimeout(n)
            }
        })
    }, Ke = S.createElement("input"), Ze = S.createElement("select").appendChild(S.createElement("option")), Ke.type = "checkbox", y.checkOn = "" !== Ke.value, y.optSelected = Ze.selected, (Ke = S.createElement("input")).value = "t", Ke.type = "radio", y.radioValue = "t" === Ke.value;
    var ut,
        lt = N.expr.attrHandle;
    N.fn.extend({
        attr: function(e, t) {
            return _(this, N.attr, e, t, 1 < arguments.length)
        },
        removeAttr: function(e) {
            return this.each(function() {
                N.removeAttr(this, e)
            })
        }
    }), N.extend({
        attr: function(e, t, n) {
            var r,
                i,
                o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return "undefined" == typeof e.getAttribute ? N.prop(e, t, n) : (1 === o && N.isXMLDoc(e) || (i = N.attrHooks[t.toLowerCase()] || (N.expr.match.bool.test(t) ? ut : undefined)), n !== undefined ? null === n ? void N.removeAttr(e, t) : i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : (e.setAttribute(t, n + ""), n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = N.find.attr(e, t)) ? undefined : r)
        },
        attrHooks: {
            type: {
                set: function(e, t) {
                    if (!y.radioValue && "radio" === t && E(e, "input")) {
                        var n = e.value;
                        return e.setAttribute("type", t), n && (e.value = n), t
                    }
                }
            }
        },
        removeAttr: function(e, t) {
            var n,
                r = 0,
                i = t && t.match(P);
            if (i && 1 === e.nodeType)
                for (; n = i[r++];)
                    e.removeAttribute(n)
        }
    }), ut = {
        set: function(e, t, n) {
            return !1 === t ? N.removeAttr(e, n) : e.setAttribute(n, n), n
        }
    }, N.each(N.expr.match.bool.source.match(/\w+/g), function(e, t) {
        var a = lt[t] || N.find.attr;
        lt[t] = function(e, t, n) {
            var r,
                i,
                o = t.toLowerCase();
            return n || (i = lt[o], lt[o] = r, r = null != a(e, t, n) ? o : null, lt[o] = i), r
        }
    });
    var ct = /^(?:input|select|textarea|button)$/i,
        ft = /^(?:a|area)$/i;
    function dt(e) {
        return (e.match(P) || []).join(" ")
    }
    function pt(e) {
        return e.getAttribute && e.getAttribute("class") || ""
    }
    N.fn.extend({
        prop: function(e, t) {
            return _(this, N.prop, e, t, 1 < arguments.length)
        },
        removeProp: function(e) {
            return this.each(function() {
                delete this[N.propFix[e] || e]
            })
        }
    }), N.extend({
        prop: function(e, t, n) {
            var r,
                i,
                o = e.nodeType;
            if (3 !== o && 8 !== o && 2 !== o)
                return 1 === o && N.isXMLDoc(e) || (t = N.propFix[t] || t, i = N.propHooks[t]), n !== undefined ? i && "set" in i && (r = i.set(e, n, t)) !== undefined ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
        },
        propHooks: {
            tabIndex: {
                get: function(e) {
                    var t = N.find.attr(e, "tabindex");
                    return t ? parseInt(t, 10) : ct.test(e.nodeName) || ft.test(e.nodeName) && e.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    }), y.optSelected || (N.propHooks.selected = {
        get: function(e) {
            var t = e.parentNode;
            return t && t.parentNode && t.parentNode.selectedIndex, null
        },
        set: function(e) {
            var t = e.parentNode;
            t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
        }
    }), N.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function() {
        N.propFix[this.toLowerCase()] = this
    }), N.fn.extend({
        addClass: function(t) {
            var e,
                n,
                r,
                i,
                o,
                a,
                s,
                u = 0;
            if (N.isFunction(t))
                return this.each(function(e) {
                    N(this).addClass(t.call(this, e, pt(this)))
                });
            if ("string" == typeof t && t)
                for (e = t.match(P) || []; n = this[u++];)
                    if (i = pt(n), r = 1 === n.nodeType && " " + dt(i) + " ") {
                        for (a = 0; o = e[a++];)
                            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = dt(r)) && n.setAttribute("class", s)
                    }
            return this
        },
        removeClass: function(t) {
            var e,
                n,
                r,
                i,
                o,
                a,
                s,
                u = 0;
            if (N.isFunction(t))
                return this.each(function(e) {
                    N(this).removeClass(t.call(this, e, pt(this)))
                });
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof t && t)
                for (e = t.match(P) || []; n = this[u++];)
                    if (i = pt(n), r = 1 === n.nodeType && " " + dt(i) + " ") {
                        for (a = 0; o = e[a++];)
                            for (; -1 < r.indexOf(" " + o + " ");)
                                r = r.replace(" " + o + " ", " ");
                        i !== (s = dt(r)) && n.setAttribute("class", s)
                    }
            return this
        },
        toggleClass: function(i, t) {
            var o = typeof i;
            return "boolean" == typeof t && "string" === o ? t ? this.addClass(i) : this.removeClass(i) : N.isFunction(i) ? this.each(function(e) {
                N(this).toggleClass(i.call(this, e, pt(this), t), t)
            }) : this.each(function() {
                var e,
                    t,
                    n,
                    r;
                if ("string" === o)
                    for (t = 0, n = N(this), r = i.match(P) || []; e = r[t++];)
                        n.hasClass(e) ? n.removeClass(e) : n.addClass(e);
                else
                    i !== undefined && "boolean" !== o || ((e = pt(this)) && U.set(this, "__className__", e), this.setAttribute && this.setAttribute("class", e || !1 === i ? "" : U.get(this, "__className__") || ""))
            })
        },
        hasClass: function(e) {
            var t,
                n,
                r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && -1 < (" " + dt(pt(n)) + " ").indexOf(t))
                    return !0;
            return !1
        }
    });
    var ht = /\r/g;
    N.fn.extend({
        val: function(n) {
            var r,
                e,
                i,
                t = this[0];
            return arguments.length ? (i = N.isFunction(n), this.each(function(e) {
                var t;
                1 === this.nodeType && (null == (t = i ? n.call(this, e, N(this).val()) : n) ? t = "" : "number" == typeof t ? t += "" : Array.isArray(t) && (t = N.map(t, function(e) {
                    return null == e ? "" : e + ""
                })), (r = N.valHooks[this.type] || N.valHooks[this.nodeName.toLowerCase()]) && "set" in r && r.set(this, t, "value") !== undefined || (this.value = t))
            })) : t ? (r = N.valHooks[t.type] || N.valHooks[t.nodeName.toLowerCase()]) && "get" in r && (e = r.get(t, "value")) !== undefined ? e : "string" == typeof (e = t.value) ? e.replace(ht, "") : null == e ? "" : e : void 0
        }
    }), N.extend({
        valHooks: {
            option: {
                get: function(e) {
                    var t = N.find.attr(e, "value");
                    return null != t ? t : dt(N.text(e))
                }
            },
            select: {
                get: function(e) {
                    var t,
                        n,
                        r,
                        i = e.options,
                        o = e.selectedIndex,
                        a = "select-one" === e.type,
                        s = a ? null : [],
                        u = a ? o + 1 : i.length;
                    for (r = o < 0 ? u : a ? o : 0; r < u; r++)
                        if (((n = i[r]).selected || r === o) && !n.disabled && (!n.parentNode.disabled || !E(n.parentNode, "optgroup"))) {
                            if (t = N(n).val(), a)
                                return t;
                            s.push(t)
                        }
                    return s
                },
                set: function(e, t) {
                    for (var n, r, i = e.options, o = N.makeArray(t), a = i.length; a--;)
                        ((r = i[a]).selected = -1 < N.inArray(N.valHooks.option.get(r), o)) && (n = !0);
                    return n || (e.selectedIndex = -1), o
                }
            }
        }
    }), N.each(["radio", "checkbox"], function() {
        N.valHooks[this] = {
            set: function(e, t) {
                if (Array.isArray(t))
                    return e.checked = -1 < N.inArray(N(e).val(), t)
            }
        }, y.checkOn || (N.valHooks[this].get = function(e) {
            return null === e.getAttribute("value") ? "on" : e.value
        })
    });
    var gt = /^(?:focusinfocus|focusoutblur)$/;
    N.extend(N.event, {
        trigger: function(e, t, n, r) {
            var i,
                o,
                a,
                s,
                u,
                l,
                c,
                f = [n || S],
                d = h.call(e, "type") ? e.type : e,
                p = h.call(e, "namespace") ? e.namespace.split(".") : [];
            if (o = a = n = n || S, 3 !== n.nodeType && 8 !== n.nodeType && !gt.test(d + N.event.triggered) && (-1 < d.indexOf(".") && (d = (p = d.split(".")).shift(), p.sort()), u = d.indexOf(":") < 0 && "on" + d, (e = e[N.expando] ? e : new N.Event(d, "object" == typeof e && e)).isTrigger = r ? 2 : 3, e.namespace = p.join("."), e.rnamespace = e.namespace ? new RegExp("(^|\\.)" + p.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, e.result = undefined, e.target || (e.target = n), t = null == t ? [e] : N.makeArray(t, [e]), c = N.event.special[d] || {}, r || !c.trigger || !1 !== c.trigger.apply(n, t))) {
                if (!r && !c.noBubble && !N.isWindow(n)) {
                    for (s = c.delegateType || d, gt.test(s + d) || (o = o.parentNode); o; o = o.parentNode)
                        f.push(o), a = o;
                    a === (n.ownerDocument || S) && f.push(a.defaultView || a.parentWindow || k)
                }
                for (i = 0; (o = f[i++]) && !e.isPropagationStopped();)
                    e.type = 1 < i ? s : c.bindType || d, (l = (U.get(o, "events") || {})[e.type] && U.get(o, "handle")) && l.apply(o, t), (l = u && o[u]) && l.apply && z(o) && (e.result = l.apply(o, t), !1 === e.result && e.preventDefault());
                return e.type = d, r || e.isDefaultPrevented() || c._default && !1 !== c._default.apply(f.pop(), t) || !z(n) || u && N.isFunction(n[d]) && !N.isWindow(n) && ((a = n[u]) && (n[u] = null), n[N.event.triggered = d](), N.event.triggered = undefined, a && (n[u] = a)), e.result
            }
        },
        simulate: function(e, t, n) {
            var r = N.extend(new N.Event, n, {
                type: e,
                isSimulated: !0
            });
            N.event.trigger(r, null, t)
        }
    }), N.fn.extend({
        trigger: function(e, t) {
            return this.each(function() {
                N.event.trigger(e, t, this)
            })
        },
        triggerHandler: function(e, t) {
            var n = this[0];
            if (n)
                return N.event.trigger(e, t, n, !0)
        }
    }), N.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(e, n) {
        N.fn[n] = function(e, t) {
            return 0 < arguments.length ? this.on(n, null, e, t) : this.trigger(n)
        }
    }), N.fn.extend({
        hover: function(e, t) {
            return this.mouseenter(e).mouseleave(t || e)
        }
    }), y.focusin = "onfocusin" in k, y.focusin || N.each({
        focus: "focusin",
        blur: "focusout"
    }, function(n, r) {
        var i = function(e) {
            N.event.simulate(r, e.target, N.event.fix(e))
        };
        N.event.special[r] = {
            setup: function() {
                var e = this.ownerDocument || this,
                    t = U.access(e, r);
                t || e.addEventListener(n, i, !0), U.access(e, r, (t || 0) + 1)
            },
            teardown: function() {
                var e = this.ownerDocument || this,
                    t = U.access(e, r) - 1;
                t ? U.access(e, r, t) : (e.removeEventListener(n, i, !0), U.remove(e, r))
            }
        }
    });
    var yt = k.location,
        mt = N.now(),
        vt = /\?/;
    N.parseXML = function(e) {
        var t;
        if (!e || "string" != typeof e)
            return null;
        try {
            t = (new k.DOMParser).parseFromString(e, "text/xml")
        } catch (n) {
            t = undefined
        }
        return t && !t.getElementsByTagName("parsererror").length || N.error("Invalid XML: " + e), t
    };
    var xt = /\[\]$/,
        bt = /\r?\n/g,
        wt = /^(?:submit|button|image|reset|file)$/i,
        Tt = /^(?:input|select|textarea|keygen)/i;
    function Ct(n, e, r, i) {
        var t;
        if (Array.isArray(e))
            N.each(e, function(e, t) {
                r || xt.test(n) ? i(n, t) : Ct(n + "[" + ("object" == typeof t && null != t ? e : "") + "]", t, r, i)
            });
        else if (r || "object" !== N.type(e))
            i(n, e);
        else
            for (t in e)
                Ct(n + "[" + t + "]", e[t], r, i)
    }
    N.param = function(e, t) {
        var n,
            r = [],
            i = function(e, t) {
                var n = N.isFunction(t) ? t() : t;
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(null == n ? "" : n)
            };
        if (Array.isArray(e) || e.jquery && !N.isPlainObject(e))
            N.each(e, function() {
                i(this.name, this.value)
            });
        else
            for (n in e)
                Ct(n, e[n], t, i);
        return r.join("&")
    }, N.fn.extend({
        serialize: function() {
            return N.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var e = N.prop(this, "elements");
                return e ? N.makeArray(e) : this
            }).filter(function() {
                var e = this.type;
                return this.name && !N(this).is(":disabled") && Tt.test(this.nodeName) && !wt.test(e) && (this.checked || !oe.test(e))
            }).map(function(e, t) {
                var n = N(this).val();
                return null == n ? null : Array.isArray(n) ? N.map(n, function(e) {
                    return {
                        name: t.name,
                        value: e.replace(bt, "\r\n")
                    }
                }) : {
                    name: t.name,
                    value: n.replace(bt, "\r\n")
                }
            }).get()
        }
    });
    var Et = /%20/g,
        kt = /#.*$/,
        St = /([?&])_=[^&]*/,
        Nt = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Dt = /^(?:GET|HEAD)$/,
        jt = /^\/\//,
        At = {},
        qt = {},
        Lt = "*/".concat("*"),
        Ht = S.createElement("a");
    function Ft(o) {
        return function(e, t) {
            "string" != typeof e && (t = e, e = "*");
            var n,
                r = 0,
                i = e.toLowerCase().match(P) || [];
            if (N.isFunction(t))
                for (; n = i[r++];)
                    "+" === n[0] ? (n = n.slice(1) || "*", (o[n] = o[n] || []).unshift(t)) : (o[n] = o[n] || []).push(t)
        }
    }
    function Ot(t, i, o, a) {
        var s = {},
            u = t === qt;
        function l(e) {
            var r;
            return s[e] = !0, N.each(t[e] || [], function(e, t) {
                var n = t(i, o, a);
                return "string" != typeof n || u || s[n] ? u ? !(r = n) : void 0 : (i.dataTypes.unshift(n), l(n), !1)
            }), r
        }
        return l(i.dataTypes[0]) || !s["*"] && l("*")
    }
    function Pt(e, t) {
        var n,
            r,
            i = N.ajaxSettings.flatOptions || {};
        for (n in t)
            t[n] !== undefined && ((i[n] ? e : r || (r = {}))[n] = t[n]);
        return r && N.extend(!0, e, r), e
    }
    Ht.href = yt.href, N.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: yt.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(yt.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Lt,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": N.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(e, t) {
            return t ? Pt(Pt(e, N.ajaxSettings), t) : Pt(N.ajaxSettings, e)
        },
        ajaxPrefilter: Ft(At),
        ajaxTransport: Ft(qt),
        ajax: function(e, t) {
            "object" == typeof e && (t = e, e = undefined), t = t || {};
            var d,
                p,
                h,
                n,
                g,
                r,
                y,
                m,
                i,
                o,
                v = N.ajaxSetup({}, t),
                x = v.context || v,
                b = v.context && (x.nodeType || x.jquery) ? N(x) : N.event,
                w = N.Deferred(),
                T = N.Callbacks("once memory"),
                C = v.statusCode || {},
                a = {},
                s = {},
                u = "canceled",
                E = {
                    readyState: 0,
                    getResponseHeader: function(e) {
                        var t;
                        if (y) {
                            if (!n)
                                for (n = {}; t = Nt.exec(h);)
                                    n[t[1].toLowerCase()] = t[2];
                            t = n[e.toLowerCase()]
                        }
                        return null == t ? null : t
                    },
                    getAllResponseHeaders: function() {
                        return y ? h : null
                    },
                    setRequestHeader: function(e, t) {
                        return null == y && (e = s[e.toLowerCase()] = s[e.toLowerCase()] || e, a[e] = t), this
                    },
                    overrideMimeType: function(e) {
                        return null == y && (v.mimeType = e), this
                    },
                    statusCode: function(e) {
                        var t;
                        if (e)
                            if (y)
                                E.always(e[E.status]);
                            else
                                for (t in e)
                                    C[t] = [C[t], e[t]];
                        return this
                    },
                    abort: function(e) {
                        var t = e || u;
                        return d && d.abort(t), l(0, t), this
                    }
                };
            if (w.promise(E), v.url = ((e || v.url || yt.href) + "").replace(jt, yt.protocol + "//"), v.type = t.method || t.type || v.method || v.type, v.dataTypes = (v.dataType || "*").toLowerCase().match(P) || [""], null == v.crossDomain) {
                r = S.createElement("a");
                try {
                    r.href = v.url, r.href = r.href, v.crossDomain = Ht.protocol + "//" + Ht.host != r.protocol + "//" + r.host
                } catch (c) {
                    v.crossDomain = !0
                }
            }
            if (v.data && v.processData && "string" != typeof v.data && (v.data = N.param(v.data, v.traditional)), Ot(At, v, t, E), y)
                return E;
            for (i in (m = N.event && v.global) && 0 == N.active++ && N.event.trigger("ajaxStart"), v.type = v.type.toUpperCase(), v.hasContent = !Dt.test(v.type), p = v.url.replace(kt, ""), v.hasContent ? v.data && v.processData && 0 === (v.contentType || "").indexOf("application/x-www-form-urlencoded") && (v.data = v.data.replace(Et, "+")) : (o = v.url.slice(p.length), v.data && (p += (vt.test(p) ? "&" : "?") + v.data, delete v.data), !1 === v.cache && (p = p.replace(St, "$1"), o = (vt.test(p) ? "&" : "?") + "_=" + mt++ + o), v.url = p + o), v.ifModified && (N.lastModified[p] && E.setRequestHeader("If-Modified-Since", N.lastModified[p]), N.etag[p] && E.setRequestHeader("If-None-Match", N.etag[p])), (v.data && v.hasContent && !1 !== v.contentType || t.contentType) && E.setRequestHeader("Content-Type", v.contentType), E.setRequestHeader("Accept", v.dataTypes[0] && v.accepts[v.dataTypes[0]] ? v.accepts[v.dataTypes[0]] + ("*" !== v.dataTypes[0] ? ", " + Lt + "; q=0.01" : "") : v.accepts["*"]), v.headers)
                E.setRequestHeader(i, v.headers[i]);
            if (v.beforeSend && (!1 === v.beforeSend.call(x, E, v) || y))
                return E.abort();
            if (u = "abort", T.add(v.complete), E.done(v.success), E.fail(v.error), d = Ot(qt, v, t, E)) {
                if (E.readyState = 1, m && b.trigger("ajaxSend", [E, v]), y)
                    return E;
                v.async && 0 < v.timeout && (g = k.setTimeout(function() {
                    E.abort("timeout")
                }, v.timeout));
                try {
                    y = !1, d.send(a, l)
                } catch (c) {
                    if (y)
                        throw c;
                    l(-1, c)
                }
            } else
                l(-1, "No Transport");
            function l(e, t, n, r) {
                var i,
                    o,
                    a,
                    s,
                    u,
                    l = t;
                y || (y = !0, g && k.clearTimeout(g), d = undefined, h = r || "", E.readyState = 0 < e ? 4 : 0, i = 200 <= e && e < 300 || 304 === e, n && (s = function c(e, t, n) {
                    for (var r, i, o, a, s = e.contents, u = e.dataTypes; "*" === u[0];)
                        u.shift(), r === undefined && (r = e.mimeType || t.getResponseHeader("Content-Type"));
                    if (r)
                        for (i in s)
                            if (s[i] && s[i].test(r)) {
                                u.unshift(i);
                                break
                            }
                    if (u[0] in n)
                        o = u[0];
                    else {
                        for (i in n) {
                            if (!u[0] || e.converters[i + " " + u[0]]) {
                                o = i;
                                break
                            }
                            a || (a = i)
                        }
                        o = o || a
                    }
                    if (o)
                        return o !== u[0] && u.unshift(o), n[o]
                }(v, E, n)), s = function f(e, t, n, r) {
                    var i,
                        o,
                        a,
                        s,
                        u,
                        l = {},
                        c = e.dataTypes.slice();
                    if (c[1])
                        for (a in e.converters)
                            l[a.toLowerCase()] = e.converters[a];
                    for (o = c.shift(); o;)
                        if (e.responseFields[o] && (n[e.responseFields[o]] = t), !u && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)), u = o, o = c.shift())
                            if ("*" === o)
                                o = u;
                            else if ("*" !== u && u !== o) {
                                if (!(a = l[u + " " + o] || l["* " + o]))
                                    for (i in l)
                                        if ((s = i.split(" "))[1] === o && (a = l[u + " " + s[0]] || l["* " + s[0]])) {
                                            !0 === a ? a = l[i] : !0 !== l[i] && (o = s[0], c.unshift(s[1]));
                                            break
                                        }
                                if (!0 !== a)
                                    if (a && e["throws"])
                                        t = a(t);
                                    else
                                        try {
                                            t = a(t)
                                        } catch (f) {
                                            return {
                                                state: "parsererror",
                                                error: a ? f : "No conversion from " + u + " to " + o
                                            }
                                        }
                            }
                    return {
                        state: "success",
                        data: t
                    }
                }(v, s, E, i), i ? (v.ifModified && ((u = E.getResponseHeader("Last-Modified")) && (N.lastModified[p] = u), (u = E.getResponseHeader("etag")) && (N.etag[p] = u)), 204 === e || "HEAD" === v.type ? l = "nocontent" : 304 === e ? l = "notmodified" : (l = s.state, o = s.data, i = !(a = s.error))) : (a = l, !e && l || (l = "error", e < 0 && (e = 0))), E.status = e, E.statusText = (t || l) + "", i ? w.resolveWith(x, [o, l, E]) : w.rejectWith(x, [E, l, a]), E.statusCode(C), C = undefined, m && b.trigger(i ? "ajaxSuccess" : "ajaxError", [E, v, i ? o : a]), T.fireWith(x, [E, l]), m && (b.trigger("ajaxComplete", [E, v]), --N.active || N.event.trigger("ajaxStop")))
            }
            return E
        },
        getJSON: function(e, t, n) {
            return N.get(e, t, n, "json")
        },
        getScript: function(e, t) {
            return N.get(e, undefined, t, "script")
        }
    }), N.each(["get", "post"], function(e, i) {
        N[i] = function(e, t, n, r) {
            return N.isFunction(t) && (r = r || n, n = t, t = undefined), N.ajax(N.extend({
                url: e,
                type: i,
                dataType: r,
                data: t,
                success: n
            }, N.isPlainObject(e) && e))
        }
    }), N._evalUrl = function(e) {
        return N.ajax({
            url: e,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    }, N.fn.extend({
        wrapAll: function(e) {
            var t;
            return this[0] && (N.isFunction(e) && (e = e.call(this[0])), t = N(e, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && t.insertBefore(this[0]), t.map(function() {
                for (var e = this; e.firstElementChild;)
                    e = e.firstElementChild;
                return e
            }).append(this)), this
        },
        wrapInner: function(n) {
            return N.isFunction(n) ? this.each(function(e) {
                N(this).wrapInner(n.call(this, e))
            }) : this.each(function() {
                var e = N(this),
                    t = e.contents();
                t.length ? t.wrapAll(n) : e.append(n)
            })
        },
        wrap: function(t) {
            var n = N.isFunction(t);
            return this.each(function(e) {
                N(this).wrapAll(n ? t.call(this, e) : t)
            })
        },
        unwrap: function(e) {
            return this.parent(e).not("body").each(function() {
                N(this).replaceWith(this.childNodes)
            }), this
        }
    }), N.expr.pseudos.hidden = function(e) {
        return !N.expr.pseudos.visible(e)
    }, N.expr.pseudos.visible = function(e) {
        return !!(e.offsetWidth || e.offsetHeight || e.getClientRects().length)
    }, N.ajaxSettings.xhr = function() {
        try {
            return new k.XMLHttpRequest
        } catch (e) {}
    };
    var Rt = {
            0: 200,
            1223: 204
        },
        Mt = N.ajaxSettings.xhr();
    y.cors = !!Mt && "withCredentials" in Mt, y.ajax = Mt = !!Mt, N.ajaxTransport(function(o) {
        var a,
            s;
        if (y.cors || Mt && !o.crossDomain)
            return {
                send: function(e, t) {
                    var n,
                        r = o.xhr();
                    if (r.open(o.type, o.url, o.async, o.username, o.password), o.xhrFields)
                        for (n in o.xhrFields)
                            r[n] = o.xhrFields[n];
                    for (n in o.mimeType && r.overrideMimeType && r.overrideMimeType(o.mimeType), o.crossDomain || e["X-Requested-With"] || (e["X-Requested-With"] = "XMLHttpRequest"), e)
                        r.setRequestHeader(n, e[n]);
                    a = function(e) {
                        return function() {
                            a && (a = s = r.onload = r.onerror = r.onabort = r.onreadystatechange = null, "abort" === e ? r.abort() : "error" === e ? "number" != typeof r.status ? t(0, "error") : t(r.status, r.statusText) : t(Rt[r.status] || r.status, r.statusText, "text" !== (r.responseType || "text") || "string" != typeof r.responseText ? {
                                binary: r.response
                            } : {
                                text: r.responseText
                            }, r.getAllResponseHeaders()))
                        }
                    }, r.onload = a(), s = r.onerror = a("error"), r.onabort !== undefined ? r.onabort = s : r.onreadystatechange = function() {
                        4 === r.readyState && k.setTimeout(function() {
                            a && s()
                        })
                    }, a = a("abort");
                    try {
                        r.send(o.hasContent && o.data || null)
                    } catch (i) {
                        if (a)
                            throw i
                    }
                },
                abort: function() {
                    a && a()
                }
            }
    }), N.ajaxPrefilter(function(e) {
        e.crossDomain && (e.contents.script = !1)
    }), N.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(e) {
                return N.globalEval(e), e
            }
        }
    }), N.ajaxPrefilter("script", function(e) {
        e.cache === undefined && (e.cache = !1), e.crossDomain && (e.type = "GET")
    }), N.ajaxTransport("script", function(n) {
        var r,
            i;
        if (n.crossDomain)
            return {
                send: function(e, t) {
                    r = N("<script>").prop({
                        charset: n.scriptCharset,
                        src: n.url
                    }).on("load error", i = function(e) {
                        r.remove(), i = null, e && t("error" === e.type ? 404 : 200, e.type)
                    }), S.head.appendChild(r[0])
                },
                abort: function() {
                    i && i()
                }
            }
    });
    var It,
        Wt = [],
        $t = /(=)\?(?=&|$)|\?\?/;
    N.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var e = Wt.pop() || N.expando + "_" + mt++;
            return this[e] = !0, e
        }
    }), N.ajaxPrefilter("json jsonp", function(e, t, n) {
        var r,
            i,
            o,
            a = !1 !== e.jsonp && ($t.test(e.url) ? "url" : "string" == typeof e.data && 0 === (e.contentType || "").indexOf("application/x-www-form-urlencoded") && $t.test(e.data) && "data");
        if (a || "jsonp" === e.dataTypes[0])
            return r = e.jsonpCallback = N.isFunction(e.jsonpCallback) ? e.jsonpCallback() : e.jsonpCallback, a ? e[a] = e[a].replace($t, "$1" + r) : !1 !== e.jsonp && (e.url += (vt.test(e.url) ? "&" : "?") + e.jsonp + "=" + r), e.converters["script json"] = function() {
                return o || N.error(r + " was not called"), o[0]
            }, e.dataTypes[0] = "json", i = k[r], k[r] = function() {
                o = arguments
            }, n.always(function() {
                i === undefined ? N(k).removeProp(r) : k[r] = i, e[r] && (e.jsonpCallback = t.jsonpCallback, Wt.push(r)), o && N.isFunction(i) && i(o[0]), o = i = undefined
            }), "script"
    }), y.createHTMLDocument = ((It = S.implementation.createHTMLDocument("").body).innerHTML = "<form></form><form></form>", 2 === It.childNodes.length), N.parseHTML = function(e, t, n) {
        return "string" != typeof e ? [] : ("boolean" == typeof t && (n = t, t = !1), t || (y.createHTMLDocument ? ((r = (t = S.implementation.createHTMLDocument("")).createElement("base")).href = S.location.href, t.head.appendChild(r)) : t = S), o = !n && [], (i = D.exec(e)) ? [t.createElement(i[1])] : (i = he([e], t, o), o && o.length && N(o).remove(), N.merge([], i.childNodes)));
        var r,
            i,
            o
    }, N.fn.load = function(e, t, n) {
        var r,
            i,
            o,
            a = this,
            s = e.indexOf(" ");
        return -1 < s && (r = dt(e.slice(s)), e = e.slice(0, s)), N.isFunction(t) ? (n = t, t = undefined) : t && "object" == typeof t && (i = "POST"), 0 < a.length && N.ajax({
            url: e,
            type: i || "GET",
            dataType: "html",
            data: t
        }).done(function(e) {
            o = arguments, a.html(r ? N("<div>").append(N.parseHTML(e)).find(r) : e)
        }).always(n && function(e, t) {
            a.each(function() {
                n.apply(this, o || [e.responseText, t, e])
            })
        }), this
    }, N.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function(e, t) {
        N.fn[t] = function(e) {
            return this.on(t, e)
        }
    }), N.expr.pseudos.animated = function(t) {
        return N.grep(N.timers, function(e) {
            return t === e.elem
        }).length
    }, N.offset = {
        setOffset: function(e, t, n) {
            var r,
                i,
                o,
                a,
                s,
                u,
                l = N.css(e, "position"),
                c = N(e),
                f = {};
            "static" === l && (e.style.position = "relative"), s = c.offset(), o = N.css(e, "top"), u = N.css(e, "left"), ("absolute" === l || "fixed" === l) && -1 < (o + u).indexOf("auto") ? (a = (r = c.position()).top, i = r.left) : (a = parseFloat(o) || 0, i = parseFloat(u) || 0), N.isFunction(t) && (t = t.call(e, n, N.extend({}, s))), null != t.top && (f.top = t.top - s.top + a), null != t.left && (f.left = t.left - s.left + i), "using" in t ? t.using.call(e, f) : c.css(f)
        }
    }, N.fn.extend({
        offset: function(t) {
            if (arguments.length)
                return t === undefined ? this : this.each(function(e) {
                    N.offset.setOffset(this, t, e)
                });
            var e,
                n,
                r,
                i,
                o = this[0];
            return o ? o.getClientRects().length ? (r = o.getBoundingClientRect(), n = (e = o.ownerDocument).documentElement, i = e.defaultView, {
                top: r.top + i.pageYOffset - n.clientTop,
                left: r.left + i.pageXOffset - n.clientLeft
            }) : {
                top: 0,
                left: 0
            } : void 0
        },
        position: function() {
            if (this[0]) {
                var e,
                    t,
                    n = this[0],
                    r = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === N.css(n, "position") ? t = n.getBoundingClientRect() : (e = this.offsetParent(), t = this.offset(), E(e[0], "html") || (r = e.offset()), r = {
                    top: r.top + N.css(e[0], "borderTopWidth", !0),
                    left: r.left + N.css(e[0], "borderLeftWidth", !0)
                }), {
                    top: t.top - r.top - N.css(n, "marginTop", !0),
                    left: t.left - r.left - N.css(n, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var e = this.offsetParent; e && "static" === N.css(e, "position");)
                    e = e.offsetParent;
                return e || ge
            })
        }
    }), N.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(t, i) {
        var o = "pageYOffset" === i;
        N.fn[t] = function(e) {
            return _(this, function(e, t, n) {
                var r;
                if (N.isWindow(e) ? r = e : 9 === e.nodeType && (r = e.defaultView), n === undefined)
                    return r ? r[i] : e[t];
                r ? r.scrollTo(o ? r.pageXOffset : n, o ? n : r.pageYOffset) : e[t] = n
            }, t, e, arguments.length)
        }
    }), N.each(["top", "left"], function(e, n) {
        N.cssHooks[n] = Me(y.pixelPosition, function(e, t) {
            if (t)
                return t = Re(e, n), Oe.test(t) ? N(e).position()[n] + "px" : t
        })
    }), N.each({
        Height: "height",
        Width: "width"
    }, function(a, s) {
        N.each({
            padding: "inner" + a,
            content: s,
            "": "outer" + a
        }, function(r, o) {
            N.fn[o] = function(e, t) {
                var n = arguments.length && (r || "boolean" != typeof e),
                    i = r || (!0 === e || !0 === t ? "margin" : "border");
                return _(this, function(e, t, n) {
                    var r;
                    return N.isWindow(e) ? 0 === o.indexOf("outer") ? e["inner" + a] : e.document.documentElement["client" + a] : 9 === e.nodeType ? (r = e.documentElement, Math.max(e.body["scroll" + a], r["scroll" + a], e.body["offset" + a], r["offset" + a], r["client" + a])) : n === undefined ? N.css(e, t, i) : N.style(e, t, n, i)
                }, s, n ? e : undefined, n)
            }
        })
    }), N.fn.extend({
        bind: function(e, t, n) {
            return this.on(e, null, t, n)
        },
        unbind: function(e, t) {
            return this.off(e, null, t)
        },
        delegate: function(e, t, n, r) {
            return this.on(t, e, n, r)
        },
        undelegate: function(e, t, n) {
            return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
        }
    }), N.holdReady = function(e) {
        e ? N.readyWait++ : N.ready(!0)
    }, N.isArray = Array.isArray, N.parseJSON = JSON.parse, N.nodeName = E, "function" == typeof define && define.amd && define("jquery", [], function() {
        return N
    });
    var Bt = k.jQuery,
        _t = k.$;
    return N.noConflict = function(e) {
        return k.$ === N && (k.$ = _t), e && k.jQuery === N && (k.jQuery = Bt), N
    }, e || (k.jQuery = k.$ = N), N
});



	// Camera继承父类Object3D
	Object3D.call( this );

	this.type = 'Camera';

	// 这是matrixWorld的逆。 MatrixWorld包含具有Camera的世界变换的Matrix。
	this.matrixWorldInverse = new Matrix4();

	// 这是包含投影的矩阵。
	this.projectionMatrix = new Matrix4();
	// 这是包含投影的矩阵逆。
	this.projectionMatrixInverse = new Matrix4();

}

Camera.prototype = Object.assign( Object.create( Object3D.prototype ), {

	constructor: Camera,

	isCamera: true,

	copy: function ( source, recursive ) {

		Object3D.prototype.copy.call( this, source, recursive );

		this.matrixWorldInverse.copy( source.matrixWorldInverse );

		this.projectionMatrix.copy( source.projectionMatrix );
		this.projectionMatrixInverse.copy( source.projectionMatrixInverse );

		return this;

	},

	getWorldDirection: function ( target ) {

		if ( target === undefined ) {

			console.warn( 'THREE.Camera: .getWorldDirection() target is now required' );
			target = new Vector3();

		}

		this.updateMatrixWorld( true );

		var e = this.matrixWorld.elements;

		return target.set( - e[ 8 ], - e[ 9 ], - e[ 10 ] ).normalize();

	},

	/**
	 * 更新世界矩阵
	 * 如果父对象发生了形变，那么他的形变需要传递到下面所有的子对象
	 * this.matrixWorld保存了物体在世界空间的形变，这个形变也是需要传递给所有子对象的形变。
	 * @param {boolean} force
	 */
	updateMatrixWorld: function ( force ) {

		Object3D.prototype.updateMatrixWorld.call( this, force );

		// 获取世界矩阵的逆矩阵
		this.matrixWorldInverse.getInverse( this.matrixWorld );

	},

	clone: function () {

		return new this.constructor().copy( this );

	}

} );

export { Camera };
