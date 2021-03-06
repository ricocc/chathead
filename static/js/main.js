function resizeCanvasIfNeeded(t) {
    var e = t.targetCanvas,
        i = e.width,
        r = e.height,
        n = t.destinationWidth,
        s = t.destinationHeight;
    i === n && r === s || (e.width = n, e.height = s)
}

function copyGLTo2DDrawImage(t, e) {
    var i = t.canvas,
        r = e.targetCanvas,
        n = r.getContext("2d");
    n.translate(0, r.height), n.scale(1, -1);
    var s = i.height - r.height;
    n.drawImage(i, 0, s, r.width, r.height, 0, 0, r.width, r.height)
}

function copyGLTo2DPutImageData(t, e) {
    var i = e.targetCanvas.getContext("2d"),
        r = e.destinationWidth,
        n = e.destinationHeight,
        s = r * n * 4,
        o = new Uint8Array(this.imageBuffer, 0, s),
        a = new Uint8ClampedArray(this.imageBuffer, 0, s);
    t.readPixels(0, 0, r, n, t.RGBA, t.UNSIGNED_BYTE, o);
    var h = new ImageData(a, r, n);
    i.putImageData(h, 0, 0)
}
var fabric = fabric || {
    version: "2.0.0-rc.3"
};
"undefined" != typeof exports && (exports.fabric = fabric), "undefined" != typeof document && "undefined" != typeof window ? (fabric.document = document, fabric.window = window) : (fabric.document = require("jsdom").jsdom(decodeURIComponent("%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3C%2Fhead%3E%3Cbody%3E%3C%2Fbody%3E%3C%2Fhtml%3E"), {
        features: {
            FetchExternalResources: ["img"]
        }
    }), fabric.jsdomImplForWrapper = require("jsdom/lib/jsdom/living/generated/utils").implForWrapper, fabric.window = fabric.document.defaultView, DOMParser = require("xmldom").DOMParser), fabric.isTouchSupported = "ontouchstart" in fabric.window, fabric.isLikelyNode = "undefined" != typeof Buffer && "undefined" == typeof window, fabric.SHARED_ATTRIBUTES = ["display", "transform", "fill", "fill-opacity", "fill-rule", "opacity", "stroke", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "stroke-miterlimit", "stroke-opacity", "stroke-width", "id", "paint-order", "instantiated_by_use"], fabric.DPI = 96, fabric.reNum = "(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:e[-+]?\\d+)?)", fabric.fontPaths = {}, fabric.iMatrix = [1, 0, 0, 1, 0, 0], fabric.canvasModule = "canvas", fabric.perfLimitSizeTotal = 2097152, fabric.maxCacheSideLimit = 4096, fabric.minCacheSideLimit = 256, fabric.charWidthsCache = {}, fabric.textureSize = 2048, fabric.enableGLFiltering = !0, fabric.devicePixelRatio = fabric.window.devicePixelRatio || fabric.window.webkitDevicePixelRatio || fabric.window.mozDevicePixelRatio || 1, fabric.browserShadowBlurConstant = 1, fabric.initFilterBackend = function() {
        return fabric.enableGLFiltering && fabric.isWebglSupported && fabric.isWebglSupported(fabric.textureSize) ? (console.log("max texture size: " + fabric.maxTextureSize), new fabric.WebglFilterBackend({
            tileSize: fabric.textureSize
        })) : fabric.Canvas2dFilterBackend ? new fabric.Canvas2dFilterBackend : void 0
    }, "undefined" != typeof document && "undefined" != typeof window && (window.fabric = fabric),
    function() {
        function t(t, e) {
            if (this.__eventListeners[t]) {
                var i = this.__eventListeners[t];
                e ? i[i.indexOf(e)] = !1 : fabric.util.array.fill(i, !1)
            }
        }

        function e(t, e) {
            if (this.__eventListeners || (this.__eventListeners = {}), 1 === arguments.length)
                for (var i in t) this.on(i, t[i]);
            else this.__eventListeners[t] || (this.__eventListeners[t] = []), this.__eventListeners[t].push(e);
            return this
        }

        function i(e, i) {
            if (this.__eventListeners) {
                if (0 === arguments.length)
                    for (e in this.__eventListeners) t.call(this, e);
                else if (1 === arguments.length && "object" == typeof arguments[0])
                    for (var r in e) t.call(this, r, e[r]);
                else t.call(this, e, i);
                return this
            }
        }

        function r(t, e) {
            if (this.__eventListeners) {
                var i = this.__eventListeners[t];
                if (i) {
                    for (var r = 0, n = i.length; r < n; r++) i[r] && i[r].call(this, e || {});
                    return this.__eventListeners[t] = i.filter(function(t) {
                        return !1 !== t
                    }), this
                }
            }
        }
        fabric.Observable = {
            observe: e,
            stopObserving: i,
            fire: r,
            on: e,
            off: i,
            trigger: r
        }
    }(), fabric.Collection = {
        _objects: [],
        add: function() {
            if (this._objects.push.apply(this._objects, arguments), this._onObjectAdded)
                for (var t = 0, e = arguments.length; t < e; t++) this._onObjectAdded(arguments[t]);
            return this.renderOnAddRemove && this.requestRenderAll(), this
        },
        insertAt: function(t, e, i) {
            var r = this.getObjects();
            return i ? r[e] = t : r.splice(e, 0, t), this._onObjectAdded && this._onObjectAdded(t), this.renderOnAddRemove && this.requestRenderAll(), this
        },
        remove: function() {
            for (var t, e = this.getObjects(), i = !1, r = 0, n = arguments.length; r < n; r++) - 1 !== (t = e.indexOf(arguments[r])) && (i = !0, e.splice(t, 1), this._onObjectRemoved && this._onObjectRemoved(arguments[r]));
            return this.renderOnAddRemove && i && this.requestRenderAll(), this
        },
        forEachObject: function(t, e) {
            for (var i = this.getObjects(), r = 0, n = i.length; r < n; r++) t.call(e, i[r], r, i);
            return this
        },
        getObjects: function(t) {
            return void 0 === t ? this._objects : this._objects.filter(function(e) {
                return e.type === t
            })
        },
        item: function(t) {
            return this.getObjects()[t]
        },
        isEmpty: function() {
            return 0 === this.getObjects().length
        },
        size: function() {
            return this.getObjects().length
        },
        contains: function(t) {
            return this.getObjects().indexOf(t) > -1
        },
        complexity: function() {
            return this.getObjects().reduce(function(t, e) {
                return t += e.complexity ? e.complexity() : 0
            }, 0)
        }
    }, fabric.CommonMethods = {
        _setOptions: function(t) {
            for (var e in t) this.set(e, t[e])
        },
        _initGradient: function(t, e) {
            !t || !t.colorStops || t instanceof fabric.Gradient || this.set(e, new fabric.Gradient(t))
        },
        _initPattern: function(t, e, i) {
            !t || !t.source || t instanceof fabric.Pattern ? i && i() : this.set(e, new fabric.Pattern(t, i))
        },
        _initClipping: function(t) {
            if (t.clipTo && "string" == typeof t.clipTo) {
                var e = fabric.util.getFunctionBody(t.clipTo);
                void 0 !== e && (this.clipTo = new Function("ctx", e))
            }
        },
        _setObject: function(t) {
            for (var e in t) this._set(e, t[e])
        },
        set: function(t, e) {
            return "object" == typeof t ? this._setObject(t) : "function" == typeof e && "clipTo" !== t ? this._set(t, e(this.get(t))) : this._set(t, e), this
        },
        _set: function(t, e) {
            this[t] = e
        },
        toggle: function(t) {
            var e = this.get(t);
            return "boolean" == typeof e && this.set(t, !e), this
        },
        get: function(t) {
            return this[t]
        }
    },
    function(t) {
        var e = Math.sqrt,
            i = Math.atan2,
            r = Math.pow,
            n = Math.abs,
            s = Math.PI / 180;
        fabric.util = {
            removeFromArray: function(t, e) {
                var i = t.indexOf(e);
                return -1 !== i && t.splice(i, 1), t
            },
            getRandomInt: function(t, e) {
                return Math.floor(Math.random() * (e - t + 1)) + t
            },
            degreesToRadians: function(t) {
                return t * s
            },
            radiansToDegrees: function(t) {
                return t / s
            },
            rotatePoint: function(t, e, i) {
                t.subtractEquals(e);
                var r = fabric.util.rotateVector(t, i);
                return new fabric.Point(r.x, r.y).addEquals(e)
            },
            rotateVector: function(t, e) {
                var i = Math.sin(e),
                    r = Math.cos(e);
                return {
                    x: t.x * r - t.y * i,
                    y: t.x * i + t.y * r
                }
            },
            transformPoint: function(t, e, i) {
                return i ? new fabric.Point(e[0] * t.x + e[2] * t.y, e[1] * t.x + e[3] * t.y) : new fabric.Point(e[0] * t.x + e[2] * t.y + e[4], e[1] * t.x + e[3] * t.y + e[5])
            },
            makeBoundingBoxFromPoints: function(t) {
                var e = [t[0].x, t[1].x, t[2].x, t[3].x],
                    i = fabric.util.array.min(e),
                    r = fabric.util.array.max(e) - i,
                    n = [t[0].y, t[1].y, t[2].y, t[3].y],
                    s = fabric.util.array.min(n);
                return {
                    left: i,
                    top: s,
                    width: r,
                    height: fabric.util.array.max(n) - s
                }
            },
            invertTransform: function(t) {
                var e = 1 / (t[0] * t[3] - t[1] * t[2]),
                    i = [e * t[3], -e * t[1], -e * t[2], e * t[0]],
                    r = fabric.util.transformPoint({
                        x: t[4],
                        y: t[5]
                    }, i, !0);
                return i[4] = -r.x, i[5] = -r.y, i
            },
            toFixed: function(t, e) {
                return parseFloat(Number(t).toFixed(e))
            },
            parseUnit: function(t, e) {
                var i = /\D{0,2}$/.exec(t),
                    r = parseFloat(t);
                switch (e || (e = fabric.Text.DEFAULT_SVG_FONT_SIZE), i[0]) {
                    case "mm":
                        return r * fabric.DPI / 25.4;
                    case "cm":
                        return r * fabric.DPI / 2.54;
                    case "in":
                        return r * fabric.DPI;
                    case "pt":
                        return r * fabric.DPI / 72;
                    case "pc":
                        return r * fabric.DPI / 72 * 12;
                    case "em":
                        return r * e;
                    default:
                        return r
                }
            },
            falseFunction: function() {
                return !1
            },
            getKlass: function(t, e) {
                return t = fabric.util.string.camelize(t.charAt(0).toUpperCase() + t.slice(1)), fabric.util.resolveNamespace(e)[t]
            },
            getSvgAttributes: function(t) {
                var e = ["instantiated_by_use", "style", "id", "class"];
                switch (t) {
                    case "linearGradient":
                        e = e.concat(["x1", "y1", "x2", "y2", "gradientUnits", "gradientTransform"]);
                        break;
                    case "radialGradient":
                        e = e.concat(["gradientUnits", "gradientTransform", "cx", "cy", "r", "fx", "fy", "fr"]);
                        break;
                    case "stop":
                        e = e.concat(["offset", "stop-color", "stop-opacity"])
                }
                return e
            },
            resolveNamespace: function(e) {
                if (!e) return fabric;
                var i, r = e.split("."),
                    n = r.length,
                    s = t || fabric.window;
                for (i = 0; i < n; ++i) s = s[r[i]];
                return s
            },
            loadImage: function(t, e, i, r) {
                if (t) {
                    var n = fabric.util.createImage(),
                        s = function() {
                            e && e.call(i, n), n = n.onload = n.onerror = null
                        };
                    n.onload = s, n.onerror = function() {
                        fabric.log("Error loading " + n.src), e && e.call(i, null, !0), n = n.onload = n.onerror = null
                    }, 0 !== t.indexOf("data") && r && (n.crossOrigin = r), "data:image/svg" === t.substring(0, 14) && (n.onload = null, fabric.util.loadImageInDom(n, s)), n.src = t
                } else e && e.call(i, t)
            },
            loadImageInDom: function(t, e) {
                var i = fabric.document.createElement("div");
                i.style.width = i.style.height = "1px", i.style.left = i.style.top = "-100%", i.style.position = "absolute", i.appendChild(t), fabric.document.querySelector("body").appendChild(i), t.onload = function() {
                    e(), i.parentNode.removeChild(i), i = null
                }
            },
            enlivenObjects: function(t, e, i, r) {
                function n() {
                    ++o === a && e && e(s)
                }
                var s = [],
                    o = 0,
                    a = (t = t || []).length;
                a ? t.forEach(function(t, e) {
                    t && t.type ? fabric.util.getKlass(t.type, i).fromObject(t, function(i, o) {
                        o || (s[e] = i), r && r(t, i, o), n()
                    }) : n()
                }) : e && e(s)
            },
            enlivenPatterns: function(t, e) {
                function i() {
                    ++n === s && e && e(r)
                }
                var r = [],
                    n = 0,
                    s = (t = t || []).length;
                s ? t.forEach(function(t, e) {
                    t && t.source ? new fabric.Pattern(t, function(t) {
                        r[e] = t, i()
                    }) : (r[e] = t, i())
                }) : e && e(r)
            },
            groupSVGElements: function(t, e, i) {
                var r;
                return 1 === t.length ? t[0] : (e && (e.width && e.height ? e.centerPoint = {
                    x: e.width / 2,
                    y: e.height / 2
                } : (delete e.width, delete e.height)), r = new fabric.Group(t, e), void 0 !== i && (r.sourcePath = i), r)
            },
            populateWithProperties: function(t, e, i) {
                if (i && "[object Array]" === Object.prototype.toString.call(i))
                    for (var r = 0, n = i.length; r < n; r++) i[r] in t && (e[i[r]] = t[i[r]])
            },
            drawDashedLine: function(t, r, n, s, o, a) {
                var h = s - r,
                    c = o - n,
                    l = e(h * h + c * c),
                    u = i(c, h),
                    f = a.length,
                    d = 0,
                    g = !0;
                for (t.save(), t.translate(r, n), t.moveTo(0, 0), t.rotate(u), r = 0; l > r;)(r += a[d++ % f]) > l && (r = l), t[g ? "lineTo" : "moveTo"](r, 0), g = !g;
                t.restore()
            },
            createCanvasElement: function() {
                return fabric.document.createElement("canvas")
            },
            createImage: function() {
                return fabric.document.createElement("img")
            },
            clipContext: function(t, e) {
                e.save(), e.beginPath(), t.clipTo(e), e.clip()
            },
            multiplyTransformMatrices: function(t, e, i) {
                return [t[0] * e[0] + t[2] * e[1], t[1] * e[0] + t[3] * e[1], t[0] * e[2] + t[2] * e[3], t[1] * e[2] + t[3] * e[3], i ? 0 : t[0] * e[4] + t[2] * e[5] + t[4], i ? 0 : t[1] * e[4] + t[3] * e[5] + t[5]]
            },
            qrDecompose: function(t) {
                var n = i(t[1], t[0]),
                    o = r(t[0], 2) + r(t[1], 2),
                    a = e(o),
                    h = (t[0] * t[3] - t[2] * t[1]) / a,
                    c = i(t[0] * t[2] + t[1] * t[3], o);
                return {
                    angle: n / s,
                    scaleX: a,
                    scaleY: h,
                    skewX: c / s,
                    skewY: 0,
                    translateX: t[4],
                    translateY: t[5]
                }
            },
            customTransformMatrix: function(t, e, i) {
                var r = [1, 0, n(Math.tan(i * s)), 1],
                    o = [n(t), 0, 0, n(e)];
                return fabric.util.multiplyTransformMatrices(o, r, !0)
            },
            resetObjectTransform: function(t) {
                t.scaleX = 1, t.scaleY = 1, t.skewX = 0, t.skewY = 0, t.flipX = !1, t.flipY = !1, t.rotate(0)
            },
            getFunctionBody: function(t) {
                return (String(t).match(/function[^{]*\{([\s\S]*)\}/) || {})[1]
            },
            isTransparent: function(t, e, i, r) {
                r > 0 && (e > r ? e -= r : e = 0, i > r ? i -= r : i = 0);
                var n, s, o = !0,
                    a = t.getImageData(e, i, 2 * r || 1, 2 * r || 1),
                    h = a.data.length;
                for (n = 3; n < h && (s = a.data[n], !1 !== (o = s <= 0)); n += 4);
                return a = null, o
            },
            parsePreserveAspectRatioAttribute: function(t) {
                var e, i = "meet",
                    r = "Mid",
                    n = "Mid",
                    s = t.split(" ");
                return s && s.length && ("meet" !== (i = s.pop()) && "slice" !== i ? (e = i, i = "meet") : s.length && (e = s.pop())), r = "none" !== e ? e.slice(1, 4) : "none", n = "none" !== e ? e.slice(5, 8) : "none", {
                    meetOrSlice: i,
                    alignX: r,
                    alignY: n
                }
            },
            clearFabricFontCache: function(t) {
                t ? fabric.charWidthsCache[t] && delete fabric.charWidthsCache[t] : fabric.charWidthsCache = {}
            },
            limitDimsByArea: function(t, e) {
                var i = Math.sqrt(e * t),
                    r = Math.floor(e / i);
                return {
                    x: Math.floor(i),
                    y: r
                }
            },
            capValue: function(t, e, i) {
                return Math.max(t, Math.min(e, i))
            },
            findScaleToFit: function(t, e) {
                return Math.min(e.width / t.width, e.height / t.height)
            },
            findScaleToCover: function(t, e) {
                return Math.max(e.width / t.width, e.height / t.height)
            }
        }
    }("undefined" != typeof exports ? exports : this),
    function() {
        function t(t, r, s, o, h, c, l) {
            var u = a.call(arguments);
            if (n[u]) return n[u];
            var f = Math.PI,
                d = l * f / 180,
                g = Math.sin(d),
                p = Math.cos(d),
                v = 0,
                m = 0,
                b = -p * t * .5 - g * r * .5,
                _ = -p * r * .5 + g * t * .5,
                y = (s = Math.abs(s)) * s,
                x = (o = Math.abs(o)) * o,
                C = _ * _,
                S = b * b,
                w = y * x - y * C - x * S,
                T = 0;
            if (w < 0) {
                var O = Math.sqrt(1 - w / (y * x));
                s *= O, o *= O
            } else T = (h === c ? -1 : 1) * Math.sqrt(w / (y * C + x * S));
            var k = T * s * _ / o,
                D = -T * o * b / s,
                j = p * k - g * D + .5 * t,
                E = g * k + p * D + .5 * r,
                A = i(1, 0, (b - k) / s, (_ - D) / o),
                P = i((b - k) / s, (_ - D) / o, (-b - k) / s, (-_ - D) / o);
            0 === c && P > 0 ? P -= 2 * f : 1 === c && P < 0 && (P += 2 * f);
            for (var M = Math.ceil(Math.abs(P / f * 2)), F = [], I = P / M, L = 8 / 3 * Math.sin(I / 4) * Math.sin(I / 4) / Math.sin(I / 2), R = A + I, B = 0; B < M; B++) F[B] = e(A, R, p, g, s, o, j, E, L, v, m), v = F[B][4], m = F[B][5], A = R, R += I;
            return n[u] = F, F
        }

        function e(t, e, i, r, n, o, h, c, l, u, f) {
            var d = a.call(arguments);
            if (s[d]) return s[d];
            var g = Math.cos(t),
                p = Math.sin(t),
                v = Math.cos(e),
                m = Math.sin(e),
                b = i * n * v - r * o * m + h,
                _ = r * n * v + i * o * m + c,
                y = u + l * (-i * n * p - r * o * g),
                x = f + l * (-r * n * p + i * o * g),
                C = b + l * (i * n * m + r * o * v),
                S = _ + l * (r * n * m - i * o * v);
            return s[d] = [y, x, C, S, b, _], s[d]
        }

        function i(t, e, i, r) {
            var n = Math.atan2(e, t),
                s = Math.atan2(r, i);
            return s >= n ? s - n : 2 * Math.PI - (n - s)
        }

        function r(t, e, i, r, n, s, h, c) {
            var l = a.call(arguments);
            if (o[l]) return o[l];
            var u, f, d, g, p, v, m, b, _ = Math.sqrt,
                y = Math.min,
                x = Math.max,
                C = Math.abs,
                S = [],
                w = [
                    [],
                    []
                ];
            f = 6 * t - 12 * i + 6 * n, u = -3 * t + 9 * i - 9 * n + 3 * h, d = 3 * i - 3 * t;
            for (var T = 0; T < 2; ++T)
                if (T > 0 && (f = 6 * e - 12 * r + 6 * s, u = -3 * e + 9 * r - 9 * s + 3 * c, d = 3 * r - 3 * e), C(u) < 1e-12) {
                    if (C(f) < 1e-12) continue;
                    0 < (g = -d / f) && g < 1 && S.push(g)
                } else(m = f * f - 4 * d * u) < 0 || (0 < (p = (-f + (b = _(m))) / (2 * u)) && p < 1 && S.push(p), 0 < (v = (-f - b) / (2 * u)) && v < 1 && S.push(v));
            for (var O, k, D, j = S.length, E = j; j--;) O = (D = 1 - (g = S[j])) * D * D * t + 3 * D * D * g * i + 3 * D * g * g * n + g * g * g * h, w[0][j] = O, k = D * D * D * e + 3 * D * D * g * r + 3 * D * g * g * s + g * g * g * c, w[1][j] = k;
            w[0][E] = t, w[1][E] = e, w[0][E + 1] = h, w[1][E + 1] = c;
            var A = [{
                x: y.apply(null, w[0]),
                y: y.apply(null, w[1])
            }, {
                x: x.apply(null, w[0]),
                y: x.apply(null, w[1])
            }];
            return o[l] = A, A
        }
        var n = {},
            s = {},
            o = {},
            a = Array.prototype.join;
        fabric.util.drawArc = function(e, i, r, n) {
            for (var s = n[0], o = n[1], a = n[2], h = n[3], c = n[4], l = [
                [],
                [],
                [],
                []
            ], u = t(n[5] - i, n[6] - r, s, o, h, c, a), f = 0, d = u.length; f < d; f++) l[f][0] = u[f][0] + i, l[f][1] = u[f][1] + r, l[f][2] = u[f][2] + i, l[f][3] = u[f][3] + r, l[f][4] = u[f][4] + i, l[f][5] = u[f][5] + r, e.bezierCurveTo.apply(e, l[f])
        }, fabric.util.getBoundsOfArc = function(e, i, n, s, o, a, h, c, l) {
            for (var u, f = 0, d = 0, g = [], p = t(c - e, l - i, n, s, a, h, o), v = 0, m = p.length; v < m; v++) u = r(f, d, p[v][0], p[v][1], p[v][2], p[v][3], p[v][4], p[v][5]), g.push({
                x: u[0].x + e,
                y: u[0].y + i
            }), g.push({
                x: u[1].x + e,
                y: u[1].y + i
            }), f = p[v][4], d = p[v][5];
            return g
        }, fabric.util.getBoundsOfCurve = r
    }(),
    function() {
        function t(t, e, i) {
            if (t && 0 !== t.length) {
                var r = t.length - 1,
                    n = e ? t[r][e] : t[r];
                if (e)
                    for (; r--;) i(t[r][e], n) && (n = t[r][e]);
                else
                    for (; r--;) i(t[r], n) && (n = t[r]);
                return n
            }
        }
        var e = Array.prototype.slice;
        fabric.util.array = {
            fill: function(t, e) {
                for (var i = t.length; i--;) t[i] = e;
                return t
            },
            invoke: function(t, i) {
                for (var r = e.call(arguments, 2), n = [], s = 0, o = t.length; s < o; s++) n[s] = r.length ? t[s][i].apply(t[s], r) : t[s][i].call(t[s]);
                return n
            },
            min: function(e, i) {
                return t(e, i, function(t, e) {
                    return t < e
                })
            },
            max: function(e, i) {
                return t(e, i, function(t, e) {
                    return t >= e
                })
            }
        }
    }(),
    function() {
        function t(e, i, r) {
            if (r)
                if (!fabric.isLikelyNode && i instanceof Element) e = i;
                else if (i instanceof Array) {
                e = [];
                for (var n = 0, s = i.length; n < s; n++) e[n] = t({}, i[n], r)
            } else if (i && "object" == typeof i)
                for (var o in i) i.hasOwnProperty(o) && (e[o] = t({}, i[o], r));
            else e = i;
            else
                for (var o in i) e[o] = i[o];
            return e
        }
        fabric.util.object = {
            extend: t,
            clone: function(e, i) {
                return t({}, e, i)
            }
        }, fabric.util.object.extend(fabric.util, fabric.Observable)
    }(),
    function() {
        function t(t, e) {
            var i = t.charCodeAt(e);
            if (isNaN(i)) return "";
            if (i < 55296 || i > 57343) return t.charAt(e);
            if (55296 <= i && i <= 56319) {
                if (t.length <= e + 1) throw "High surrogate without following low surrogate";
                var r = t.charCodeAt(e + 1);
                if (56320 > r || r > 57343) throw "High surrogate without following low surrogate";
                return t.charAt(e) + t.charAt(e + 1)
            }
            if (0 === e) throw "Low surrogate without preceding high surrogate";
            var n = t.charCodeAt(e - 1);
            if (55296 > n || n > 56319) throw "Low surrogate without preceding high surrogate";
            return !1
        }
        fabric.util.string = {
            camelize: function(t) {
                return t.replace(/-+(.)?/g, function(t, e) {
                    return e ? e.toUpperCase() : ""
                })
            },
            capitalize: function(t, e) {
                return t.charAt(0).toUpperCase() + (e ? t.slice(1) : t.slice(1).toLowerCase())
            },
            escapeXml: function(t) {
                return t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            },
            graphemeSplit: function(e) {
                var i, r = 0,
                    n = [];
                for (r = 0, i; r < e.length; r++)!1 !== (i = t(e, r)) && n.push(i);
                return n
            }
        }
    }(),
    function() {
        function t() {}

        function e(t) {
            for (var e = null, r = this; r.constructor.superclass;) {
                var n = r.constructor.superclass.prototype[t];
                if (r[t] !== n) {
                    e = n;
                    break
                }
                r = r.constructor.superclass.prototype
            }
            return e ? arguments.length > 1 ? e.apply(this, i.call(arguments, 1)) : e.call(this) : console.log("tried to callSuper " + t + ", method not found in prototype chain", this)
        }
        var i = Array.prototype.slice,
            r = function() {},
            n = function() {
                for (var t in {
                    toString: 1
                })
                    if ("toString" === t) return !1;
                return !0
            }(),
            s = function(t, e, i) {
                for (var r in e) r in t.prototype && "function" == typeof t.prototype[r] && (e[r] + "").indexOf("callSuper") > -1 ? t.prototype[r] = function(t) {
                    return function() {
                        var r = this.constructor.superclass;
                        this.constructor.superclass = i;
                        var n = e[t].apply(this, arguments);
                        if (this.constructor.superclass = r, "initialize" !== t) return n
                    }
                }(r) : t.prototype[r] = e[r], n && (e.toString !== Object.prototype.toString && (t.prototype.toString = e.toString), e.valueOf !== Object.prototype.valueOf && (t.prototype.valueOf = e.valueOf))
            };
        fabric.util.createClass = function() {
            function n() {
                this.initialize.apply(this, arguments)
            }
            var o = null,
                a = i.call(arguments, 0);
            "function" == typeof a[0] && (o = a.shift()), n.superclass = o, n.subclasses = [], o && (t.prototype = o.prototype, n.prototype = new t, o.subclasses.push(n));
            for (var h = 0, c = a.length; h < c; h++) s(n, a[h], o);
            return n.prototype.initialize || (n.prototype.initialize = r), n.prototype.constructor = n, n.prototype.callSuper = e, n
        }
    }(),
    function() {
        function t(t) {
            var e, i, r = Array.prototype.slice.call(arguments, 1),
                n = r.length;
            for (i = 0; i < n; i++)
                if (e = typeof t[r[i]], !/^(?:function|object|unknown)$/.test(e)) return !1;
            return !0
        }

        function e(t, e) {
            return {
                handler: e,
                wrappedHandler: i(t, e)
            }
        }

        function i(t, e) {
            return function(i) {
                e.call(s(t), i || fabric.window.event)
            }
        }

        function r(t, e) {
            return function(i) {
                if (g[t] && g[t][e])
                    for (var r = g[t][e], n = 0, s = r.length; n < s; n++) r[n].call(this, i || fabric.window.event)
            }
        }

        function n(t, e, i) {
            var r = "touchend" === t.type ? "changedTouches" : "touches";
            return t[r] && t[r][0] ? t[r][0][e] - (t[r][0][e] - t[r][0][i]) || t[i] : t[i]
        }
        var s, o, a = "unknown",
            h = function() {
                var t = 0;
                return function(e) {
                    return e.__uniqueID || (e.__uniqueID = "uniqueID__" + t++)
                }
            }();
        ! function() {
            var t = {};
            s = function(e) {
                return t[e]
            }, o = function(e, i) {
                t[e] = i
            }
        }();
        var c, l, u = t(fabric.document.documentElement, "addEventListener", "removeEventListener") && t(fabric.window, "addEventListener", "removeEventListener"),
            f = t(fabric.document.documentElement, "attachEvent", "detachEvent") && t(fabric.window, "attachEvent", "detachEvent"),
            d = {},
            g = {};
        u ? (c = function(t, e, i, r) {
            t && t.addEventListener(e, i, !f && r)
        }, l = function(t, e, i, r) {
            t && t.removeEventListener(e, i, !f && r)
        }) : f ? (c = function(t, i, r) {
            if (t) {
                var n = h(t);
                o(n, t), d[n] || (d[n] = {}), d[n][i] || (d[n][i] = []);
                var s = e(n, r);
                d[n][i].push(s), t.attachEvent("on" + i, s.wrappedHandler)
            }
        }, l = function(t, e, i) {
            if (t) {
                var r, n = h(t);
                if (d[n] && d[n][e])
                    for (var s = 0, o = d[n][e].length; s < o; s++)(r = d[n][e][s]) && r.handler === i && (t.detachEvent("on" + e, r.wrappedHandler), d[n][e][s] = null)
            }
        }) : (c = function(t, e, i) {
            if (t) {
                var n = h(t);
                if (g[n] || (g[n] = {}), !g[n][e]) {
                    g[n][e] = [];
                    var s = t["on" + e];
                    s && g[n][e].push(s), t["on" + e] = r(n, e)
                }
                g[n][e].push(i)
            }
        }, l = function(t, e, i) {
            if (t) {
                var r = h(t);
                if (g[r] && g[r][e])
                    for (var n = g[r][e], s = 0, o = n.length; s < o; s++) n[s] === i && n.splice(s, 1)
            }
        }), fabric.util.addListener = c, fabric.util.removeListener = l;
        var p = function(t) {
                return t.clientX
            },
            v = function(t) {
                return t.clientY
            };
        fabric.isTouchSupported && (p = function(t) {
            return n(t, "pageX", "clientX")
        }, v = function(t) {
            return n(t, "pageY", "clientY")
        }), fabric.util.getPointer = function(t) {
            t || (t = fabric.window.event);
            var e = t.target || (typeof t.srcElement !== a ? t.srcElement : null),
                i = fabric.util.getScrollLeftTop(e);
            return {
                x: p(t) + i.left,
                y: v(t) + i.top
            }
        }
    }(),
    function() {
        var t = fabric.document.createElement("div"),
            e = "string" == typeof t.style.opacity,
            i = "string" == typeof t.style.filter,
            r = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/,
            n = function(t) {
                return t
            };
        e ? n = function(t, e) {
            return t.style.opacity = e, t
        } : i && (n = function(t, e) {
            var i = t.style;
            return t.currentStyle && !t.currentStyle.hasLayout && (i.zoom = 1), r.test(i.filter) ? (e = e >= .9999 ? "" : "alpha(opacity=" + 100 * e + ")", i.filter = i.filter.replace(r, e)) : i.filter += " alpha(opacity=" + 100 * e + ")", t
        }), fabric.util.setStyle = function(t, e) {
            var i = t.style;
            if (!i) return t;
            if ("string" == typeof e) return t.style.cssText += ";" + e, e.indexOf("opacity") > -1 ? n(t, e.match(/opacity:\s*(\d?\.?\d*)/)[1]) : t;
            for (var r in e) "opacity" === r ? n(t, e[r]) : i["float" === r || "cssFloat" === r ? void 0 === i.styleFloat ? "cssFloat" : "styleFloat" : r] = e[r];
            return t
        }
    }(),
    function() {
        function t(t, e) {
            var i = fabric.document.createElement(t);
            for (var r in e) "class" === r ? i.className = e[r] : "for" === r ? i.htmlFor = e[r] : i.setAttribute(r, e[r]);
            return i
        }

        function e(t) {
            for (var e = 0, i = 0, r = fabric.document.documentElement, n = fabric.document.body || {
                scrollLeft: 0,
                scrollTop: 0
            }; t && (t.parentNode || t.host) && ((t = t.parentNode || t.host) === fabric.document ? (e = n.scrollLeft || r.scrollLeft || 0, i = n.scrollTop || r.scrollTop || 0) : (e += t.scrollLeft || 0, i += t.scrollTop || 0), 1 !== t.nodeType || "fixed" !== fabric.util.getElementStyle(t, "position")););
            return {
                left: e,
                top: i
            }
        }
        var i, r = Array.prototype.slice,
            n = function(t) {
                return r.call(t, 0)
            };
        try {
            i = n(fabric.document.childNodes) instanceof Array
        } catch (t) {}
        i || (n = function(t) {
            for (var e = new Array(t.length), i = t.length; i--;) e[i] = t[i];
            return e
        });
        var s;
        s = fabric.document.defaultView && fabric.document.defaultView.getComputedStyle ? function(t, e) {
                var i = fabric.document.defaultView.getComputedStyle(t, null);
                return i ? i[e] : void 0
            } : function(t, e) {
                var i = t.style[e];
                return !i && t.currentStyle && (i = t.currentStyle[e]), i
            },
            function() {
                var t = fabric.document.documentElement.style,
                    e = "userSelect" in t ? "userSelect" : "MozUserSelect" in t ? "MozUserSelect" : "WebkitUserSelect" in t ? "WebkitUserSelect" : "KhtmlUserSelect" in t ? "KhtmlUserSelect" : "";
                fabric.util.makeElementUnselectable = function(t) {
                    return void 0 !== t.onselectstart && (t.onselectstart = fabric.util.falseFunction), e ? t.style[e] = "none" : "string" == typeof t.unselectable && (t.unselectable = "on"), t
                }, fabric.util.makeElementSelectable = function(t) {
                    return void 0 !== t.onselectstart && (t.onselectstart = null), e ? t.style[e] = "" : "string" == typeof t.unselectable && (t.unselectable = ""), t
                }
            }(),
            function() {
                fabric.util.getScript = function(t, e) {
                    var i = fabric.document.getElementsByTagName("head")[0],
                        r = fabric.document.createElement("script"),
                        n = !0;
                    r.onload = r.onreadystatechange = function(t) {
                        if (n) {
                            if ("string" == typeof this.readyState && "loaded" !== this.readyState && "complete" !== this.readyState) return;
                            n = !1, e(t || fabric.window.event), r = r.onload = r.onreadystatechange = null
                        }
                    }, r.src = t, i.appendChild(r)
                }
            }(), fabric.util.getById = function(t) {
                return "string" == typeof t ? fabric.document.getElementById(t) : t
            }, fabric.util.toArray = n, fabric.util.makeElement = t, fabric.util.addClass = function(t, e) {
                t && -1 === (" " + t.className + " ").indexOf(" " + e + " ") && (t.className += (t.className ? " " : "") + e)
            }, fabric.util.wrapElement = function(e, i, r) {
                return "string" == typeof i && (i = t(i, r)), e.parentNode && e.parentNode.replaceChild(i, e), i.appendChild(e), i
            }, fabric.util.getScrollLeftTop = e, fabric.util.getElementOffset = function(t) {
                var i, r, n = t && t.ownerDocument,
                    o = {
                        left: 0,
                        top: 0
                    },
                    a = {
                        left: 0,
                        top: 0
                    },
                    h = {
                        borderLeftWidth: "left",
                        borderTopWidth: "top",
                        paddingLeft: "left",
                        paddingTop: "top"
                    };
                if (!n) return a;
                for (var c in h) a[h[c]] += parseInt(s(t, c), 10) || 0;
                return i = n.documentElement, void 0 !== t.getBoundingClientRect && (o = t.getBoundingClientRect()), r = e(t), {
                    left: o.left + r.left - (i.clientLeft || 0) + a.left,
                    top: o.top + r.top - (i.clientTop || 0) + a.top
                }
            }, fabric.util.getElementStyle = s
    }(),
    function() {
        function t(t, e) {
            return t + (/\?/.test(t) ? "&" : "?") + e
        }

        function e() {}
        var i = function() {
            for (var t = [
                function() {
                    return new ActiveXObject("Microsoft.XMLHTTP")
                },
                function() {
                    return new ActiveXObject("Msxml2.XMLHTTP")
                },
                function() {
                    return new ActiveXObject("Msxml2.XMLHTTP.3.0")
                },
                function() {
                    return new XMLHttpRequest
                }
            ], e = t.length; e--;) try {
                if (t[e]()) return t[e]
            } catch (t) {}
        }();
        fabric.util.request = function(r, n) {
            n || (n = {});
            var s = n.method ? n.method.toUpperCase() : "GET",
                o = n.onComplete || function() {},
                a = i(),
                h = n.body || n.parameters;
            return a.onreadystatechange = function() {
                4 === a.readyState && (o(a), a.onreadystatechange = e)
            }, "GET" === s && (h = null, "string" == typeof n.parameters && (r = t(r, n.parameters))), a.open(s, r, !0), "POST" !== s && "PUT" !== s || a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), a.send(h), a
        }
    }(), fabric.log = function() {}, fabric.warn = function() {}, "undefined" != typeof console && ["log", "warn"].forEach(function(t) {
        void 0 !== console[t] && "function" == typeof console[t].apply && (fabric[t] = function() {
            return console[t].apply(console, arguments)
        })
    }),
    function() {
        function t() {
            return !1
        }

        function e() {
            return i.apply(fabric.window, arguments)
        }
        var i = fabric.window.requestAnimationFrame || fabric.window.webkitRequestAnimationFrame || fabric.window.mozRequestAnimationFrame || fabric.window.oRequestAnimationFrame || fabric.window.msRequestAnimationFrame || function(t) {
                return fabric.window.setTimeout(t, 1e3 / 60)
            },
            r = fabric.window.cancelAnimationFrame || fabric.window.clearTimeout;
        fabric.util.animate = function(i) {
            e(function(r) {
                i || (i = {});
                var n, s = r || +new Date,
                    o = i.duration || 500,
                    a = s + o,
                    h = i.onChange || t,
                    c = i.abort || t,
                    l = i.onComplete || t,
                    u = i.easing || function(t, e, i, r) {
                        return -i * Math.cos(t / r * (Math.PI / 2)) + i + e
                    },
                    f = "startValue" in i ? i.startValue : 0,
                    d = "endValue" in i ? i.endValue : 100,
                    g = i.byValue || d - f;
                i.onStart && i.onStart(),
                    function t(r) {
                        if (c()) l(d, 1, 1);
                        else {
                            var p = (n = r || +new Date) > a ? o : n - s,
                                v = p / o,
                                m = u(p, f, g, o),
                                b = Math.abs((m - f) / g);
                            h(m, b, v), n > a ? i.onComplete && i.onComplete() : e(t)
                        }
                    }(s)
            })
        }, fabric.util.requestAnimFrame = e, fabric.util.cancelAnimFrame = function() {
            return r.apply(fabric.window, arguments)
        }
    }(),
    function() {
        function t(t, e, i) {
            var r = "rgba(" + parseInt(t[0] + i * (e[0] - t[0]), 10) + "," + parseInt(t[1] + i * (e[1] - t[1]), 10) + "," + parseInt(t[2] + i * (e[2] - t[2]), 10);
            return r += "," + (t && e ? parseFloat(t[3] + i * (e[3] - t[3])) : 1), r += ")"
        }
        fabric.util.animateColor = function(e, i, r, n) {
            var s = new fabric.Color(e).getSource(),
                o = new fabric.Color(i).getSource();
            n = n || {}, fabric.util.animate(fabric.util.object.extend(n, {
                duration: r || 500,
                startValue: s,
                endValue: o,
                byValue: o,
                easing: function(e, i, r, s) {
                    return t(i, r, n.colorEasing ? n.colorEasing(e, s) : 1 - Math.cos(e / s * (Math.PI / 2)))
                }
            }))
        }
    }(),
    function() {
        function t(t, e, i, r) {
            return t < Math.abs(e) ? (t = e, r = i / 4) : r = 0 === e && 0 === t ? i / (2 * Math.PI) * Math.asin(1) : i / (2 * Math.PI) * Math.asin(e / t), {
                a: t,
                c: e,
                p: i,
                s: r
            }
        }

        function e(t, e, i) {
            return t.a * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * i - t.s) * (2 * Math.PI) / t.p)
        }

        function i(t, e, i, n) {
            return i - r(n - t, 0, i, n) + e
        }

        function r(t, e, i, r) {
            return (t /= r) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
        }
        fabric.util.ease = {
            easeInQuad: function(t, e, i, r) {
                return i * (t /= r) * t + e
            },
            easeOutQuad: function(t, e, i, r) {
                return -i * (t /= r) * (t - 2) + e
            },
            easeInOutQuad: function(t, e, i, r) {
                return (t /= r / 2) < 1 ? i / 2 * t * t + e : -i / 2 * (--t * (t - 2) - 1) + e
            },
            easeInCubic: function(t, e, i, r) {
                return i * (t /= r) * t * t + e
            },
            easeOutCubic: function(t, e, i, r) {
                return i * ((t = t / r - 1) * t * t + 1) + e
            },
            easeInOutCubic: function(t, e, i, r) {
                return (t /= r / 2) < 1 ? i / 2 * t * t * t + e : i / 2 * ((t -= 2) * t * t + 2) + e
            },
            easeInQuart: function(t, e, i, r) {
                return i * (t /= r) * t * t * t + e
            },
            easeOutQuart: function(t, e, i, r) {
                return -i * ((t = t / r - 1) * t * t * t - 1) + e
            },
            easeInOutQuart: function(t, e, i, r) {
                return (t /= r / 2) < 1 ? i / 2 * t * t * t * t + e : -i / 2 * ((t -= 2) * t * t * t - 2) + e
            },
            easeInQuint: function(t, e, i, r) {
                return i * (t /= r) * t * t * t * t + e
            },
            easeOutQuint: function(t, e, i, r) {
                return i * ((t = t / r - 1) * t * t * t * t + 1) + e
            },
            easeInOutQuint: function(t, e, i, r) {
                return (t /= r / 2) < 1 ? i / 2 * t * t * t * t * t + e : i / 2 * ((t -= 2) * t * t * t * t + 2) + e
            },
            easeInSine: function(t, e, i, r) {
                return -i * Math.cos(t / r * (Math.PI / 2)) + i + e
            },
            easeOutSine: function(t, e, i, r) {
                return i * Math.sin(t / r * (Math.PI / 2)) + e
            },
            easeInOutSine: function(t, e, i, r) {
                return -i / 2 * (Math.cos(Math.PI * t / r) - 1) + e
            },
            easeInExpo: function(t, e, i, r) {
                return 0 === t ? e : i * Math.pow(2, 10 * (t / r - 1)) + e
            },
            easeOutExpo: function(t, e, i, r) {
                return t === r ? e + i : i * (1 - Math.pow(2, -10 * t / r)) + e
            },
            easeInOutExpo: function(t, e, i, r) {
                return 0 === t ? e : t === r ? e + i : (t /= r / 2) < 1 ? i / 2 * Math.pow(2, 10 * (t - 1)) + e : i / 2 * (2 - Math.pow(2, -10 * --t)) + e
            },
            easeInCirc: function(t, e, i, r) {
                return -i * (Math.sqrt(1 - (t /= r) * t) - 1) + e
            },
            easeOutCirc: function(t, e, i, r) {
                return i * Math.sqrt(1 - (t = t / r - 1) * t) + e
            },
            easeInOutCirc: function(t, e, i, r) {
                return (t /= r / 2) < 1 ? -i / 2 * (Math.sqrt(1 - t * t) - 1) + e : i / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
            },
            easeInElastic: function(i, r, n, s) {
                var o = 0,
                    a = n;
                return 0 === i ? r : 1 == (i /= s) ? r + n : (o || (o = .3 * s), -e(t(a, n, o, 1.70158), i, s) + r)
            },
            easeOutElastic: function(e, i, r, n) {
                var s = 0,
                    o = r;
                if (0 === e) return i;
                if (1 == (e /= n)) return i + r;
                s || (s = .3 * n);
                var a = t(o, r, s, 1.70158);
                return a.a * Math.pow(2, -10 * e) * Math.sin((e * n - a.s) * (2 * Math.PI) / a.p) + a.c + i
            },
            easeInOutElastic: function(i, r, n, s) {
                var o = 0,
                    a = n;
                if (0 === i) return r;
                if (2 == (i /= s / 2)) return r + n;
                o || (o = s * (.3 * 1.5));
                var h = t(a, n, o, 1.70158);
                return i < 1 ? -.5 * e(h, i, s) + r : h.a * Math.pow(2, -10 * (i -= 1)) * Math.sin((i * s - h.s) * (2 * Math.PI) / h.p) * .5 + h.c + r
            },
            easeInBack: function(t, e, i, r, n) {
                return void 0 === n && (n = 1.70158), i * (t /= r) * t * ((n + 1) * t - n) + e
            },
            easeOutBack: function(t, e, i, r, n) {
                return void 0 === n && (n = 1.70158), i * ((t = t / r - 1) * t * ((n + 1) * t + n) + 1) + e
            },
            easeInOutBack: function(t, e, i, r, n) {
                return void 0 === n && (n = 1.70158), (t /= r / 2) < 1 ? i / 2 * (t * t * ((1 + (n *= 1.525)) * t - n)) + e : i / 2 * ((t -= 2) * t * ((1 + (n *= 1.525)) * t + n) + 2) + e
            },
            easeInBounce: i,
            easeOutBounce: r,
            easeInOutBounce: function(t, e, n, s) {
                return t < s / 2 ? .5 * i(2 * t, 0, n, s) + e : .5 * r(2 * t - s, 0, n, s) + .5 * n + e
            }
        }
    }(),
    function(t) {
        "use strict";

        function e(t) {
            return t in O ? O[t] : t
        }

        function i(t, e, i, r) {
            var n, s = "[object Array]" === Object.prototype.toString.call(e);
            if ("fill" !== t && "stroke" !== t || "none" !== e)
                if ("strokeDashArray" === t) e = "none" === e ? null : e.replace(/,/g, " ").split(/\s+/).map(function(t) {
                    return parseFloat(t)
                });
                else if ("transformMatrix" === t) e = i && i.transformMatrix ? x(i.transformMatrix, v.parseTransformAttribute(e)) : v.parseTransformAttribute(e);
            else if ("visible" === t) e = "none" !== e && "hidden" !== e, i && !1 === i.visible && (e = !1);
            else if ("opacity" === t) e = parseFloat(e), i && void 0 !== i.opacity && (e *= i.opacity);
            else if ("textAnchor" === t) e = "start" === e ? "left" : "end" === e ? "right" : "center";
            else if ("paintFirst" === t) {
                var o = e.indexOf("fill"),
                    a = e.indexOf("stroke"),
                    e = "fill";
                o > -1 && a > -1 && a < o ? e = "stroke" : -1 === o && a > -1 && (e = "stroke")
            } else n = s ? e.map(y) : y(e, r);
            else e = "";
            return !s && isNaN(n) ? e : n
        }

        function r(t) {
            return new RegExp("^(" + t.join("|") + ")\\b", "i")
        }

        function n(t) {
            for (var e in k)
                if (void 0 !== t[k[e]] && "" !== t[e]) {
                    if (void 0 === t[e]) {
                        if (!v.Object.prototype[e]) continue;
                        t[e] = v.Object.prototype[e]
                    }
                    if (0 !== t[e].indexOf("url(")) {
                        var i = new v.Color(t[e]);
                        t[e] = i.setAlpha(_(i.getAlpha() * t[k[e]], 2)).toRgba()
                    }
                }
            return t
        }

        function s(t, e) {
            var i, r, n, s, o = [];
            for (n = 0, s = e.length; n < s; n++) i = e[n], r = t.getElementsByTagName(i), o = o.concat(Array.prototype.slice.call(r));
            return o
        }

        function o(t, e) {
            var i, r;
            t.replace(/;\s*$/, "").split(";").forEach(function(t) {
                var n = t.split(":");
                i = n[0].trim().toLowerCase(), r = n[1].trim(), e[i] = r
            })
        }

        function a(t, e) {
            var i, r;
            for (var n in t) void 0 !== t[n] && (i = n.toLowerCase(), r = t[n], e[i] = r)
        }

        function h(t, e) {
            var i = {};
            for (var r in v.cssRules[e])
                if (c(t, r.split(" ")))
                    for (var n in v.cssRules[e][r]) i[n] = v.cssRules[e][r][n];
            return i
        }

        function c(t, e) {
            var i, r = !0;
            return (i = u(t, e.pop())) && e.length && (r = l(t, e)), i && r && 0 === e.length
        }

        function l(t, e) {
            for (var i, r = !0; t.parentNode && 1 === t.parentNode.nodeType && e.length;) r && (i = e.pop()), r = u(t = t.parentNode, i);
            return 0 === e.length
        }

        function u(t, e) {
            var i, r, n = t.nodeName,
                s = t.getAttribute("class"),
                o = t.getAttribute("id");
            if (i = new RegExp("^" + n, "i"), e = e.replace(i, ""), o && e.length && (i = new RegExp("#" + o + "(?![a-zA-Z\\-]+)", "i"), e = e.replace(i, "")), s && e.length)
                for (r = (s = s.split(" ")).length; r--;) i = new RegExp("\\." + s[r] + "(?![a-zA-Z\\-]+)", "i"), e = e.replace(i, "");
            return 0 === e.length
        }

        function f(t, e) {
            var i;
            if (t.getElementById && (i = t.getElementById(e)), i) return i;
            var r, n, s, o = t.getElementsByTagName("*");
            for (n = 0, s = o.length; n < s; n++)
                if (r = o[n], e === r.getAttribute("id")) return r
        }

        function d(t) {
            for (var e = s(t, ["use", "svg:use"]), i = 0; e.length && i < e.length;) {
                var r, n, o, a, h = e[i],
                    c = h.getAttribute("xlink:href").substr(1),
                    l = h.getAttribute("x") || 0,
                    u = h.getAttribute("y") || 0,
                    d = f(t, c).cloneNode(!0),
                    p = (d.getAttribute("transform") || "") + " translate(" + l + ", " + u + ")",
                    v = e.length;
                if (g(d), /^svg$/i.test(d.nodeName)) {
                    var m = d.ownerDocument.createElement("g");
                    for (n = 0, a = (o = d.attributes).length; n < a; n++) r = o.item(n), m.setAttribute(r.nodeName, r.nodeValue);
                    for (; d.firstChild;) m.appendChild(d.firstChild);
                    d = m
                }
                for (n = 0, a = (o = h.attributes).length; n < a; n++) "x" !== (r = o.item(n)).nodeName && "y" !== r.nodeName && "xlink:href" !== r.nodeName && ("transform" === r.nodeName ? p = r.nodeValue + " " + p : d.setAttribute(r.nodeName, r.nodeValue));
                d.setAttribute("transform", p), d.setAttribute("instantiated_by_use", "1"), d.removeAttribute("id"), h.parentNode.replaceChild(d, h), e.length === v && i++
            }
        }

        function g(t) {
            var e, i, r, n, s = t.getAttribute("viewBox"),
                o = 1,
                a = 1,
                h = 0,
                c = 0,
                l = t.getAttribute("width"),
                u = t.getAttribute("height"),
                f = t.getAttribute("x") || 0,
                d = t.getAttribute("y") || 0,
                g = t.getAttribute("preserveAspectRatio") || "",
                p = !s || !v.svgViewBoxElementsRegEx.test(t.nodeName) || !(s = s.match(D)),
                m = !l || !u || "100%" === l || "100%" === u,
                b = p && m,
                _ = {},
                x = "";
            if (_.width = 0, _.height = 0, _.toBeParsed = b, b) return _;
            if (p) return _.width = y(l), _.height = y(u), _;
            if (h = -parseFloat(s[1]), c = -parseFloat(s[2]), e = parseFloat(s[3]), i = parseFloat(s[4]), m ? (_.width = e, _.height = i) : (_.width = y(l), _.height = y(u), o = _.width / e, a = _.height / i), "none" !== (g = v.util.parsePreserveAspectRatioAttribute(g)).alignX && (a = o = o > a ? a : o), 1 === o && 1 === a && 0 === h && 0 === c && 0 === f && 0 === d) return _;
            if ((f || d) && (x = " translate(" + y(f) + " " + y(d) + ") "), r = x + " matrix(" + o + " 0 0 " + a + " " + h * o + " " + c * a + ") ", "svg" === t.nodeName) {
                for (n = t.ownerDocument.createElement("g"); t.firstChild;) n.appendChild(t.firstChild);
                t.appendChild(n)
            } else r = (n = t).getAttribute("transform") + r;
            return n.setAttribute("transform", r), _
        }

        function p(t, e) {
            for (; t && (t = t.parentNode);)
                if (t.nodeName && e.test(t.nodeName.replace("svg:", "")) && !t.getAttribute("instantiated_by_use")) return !0;
            return !1
        }
        var v = t.fabric || (t.fabric = {}),
            m = v.util.object.extend,
            b = v.util.object.clone,
            _ = v.util.toFixed,
            y = v.util.parseUnit,
            x = v.util.multiplyTransformMatrices,
            C = ["path", "circle", "polygon", "polyline", "ellipse", "rect", "line", "image", "text", "linearGradient", "radialGradient", "stop"],
            S = ["symbol", "image", "marker", "pattern", "view", "svg"],
            w = ["pattern", "defs", "symbol", "metadata", "clipPath", "mask", "desc"],
            T = ["symbol", "g", "a", "svg"],
            O = {
                cx: "left",
                x: "left",
                r: "radius",
                cy: "top",
                y: "top",
                display: "visible",
                visibility: "visible",
                transform: "transformMatrix",
                "fill-opacity": "fillOpacity",
                "fill-rule": "fillRule",
                "font-family": "fontFamily",
                "font-size": "fontSize",
                "font-style": "fontStyle",
                "font-weight": "fontWeight",
                "paint-order": "paintFirst",
                "stroke-dasharray": "strokeDashArray",
                "stroke-linecap": "strokeLineCap",
                "stroke-linejoin": "strokeLineJoin",
                "stroke-miterlimit": "strokeMiterLimit",
                "stroke-opacity": "strokeOpacity",
                "stroke-width": "strokeWidth",
                "text-decoration": "textDecoration",
                "text-anchor": "textAnchor",
                opacity: "opacity"
            },
            k = {
                stroke: "strokeOpacity",
                fill: "fillOpacity"
            };
        v.svgValidTagNamesRegEx = r(C), v.svgViewBoxElementsRegEx = r(S), v.svgInvalidAncestorsRegEx = r(w), v.svgValidParentsRegEx = r(T), v.cssRules = {}, v.gradientDefs = {}, v.parseTransformAttribute = function() {
            function t(t, e) {
                var i = Math.cos(e[0]),
                    r = Math.sin(e[0]),
                    n = 0,
                    s = 0;
                3 === e.length && (n = e[1], s = e[2]), t[0] = i, t[1] = r, t[2] = -r, t[3] = i, t[4] = n - (i * n - r * s), t[5] = s - (r * n + i * s)
            }

            function e(t, e) {
                var i = e[0],
                    r = 2 === e.length ? e[1] : e[0];
                t[0] = i, t[3] = r
            }

            function i(t, e, i) {
                t[i] = Math.tan(v.util.degreesToRadians(e[0]))
            }

            function r(t, e) {
                t[4] = e[0], 2 === e.length && (t[5] = e[1])
            }
            var n = [1, 0, 0, 1, 0, 0],
                s = v.reNum,
                o = "(?:\\s+,?\\s*|,\\s*)",
                a = "(?:" + ("(?:(matrix)\\s*\\(\\s*(" + s + ")" + o + "(" + s + ")" + o + "(" + s + ")" + o + "(" + s + ")" + o + "(" + s + ")" + o + "(" + s + ")\\s*\\))") + "|" + ("(?:(translate)\\s*\\(\\s*(" + s + ")(?:" + o + "(" + s + "))?\\s*\\))") + "|" + ("(?:(scale)\\s*\\(\\s*(" + s + ")(?:" + o + "(" + s + "))?\\s*\\))") + "|" + ("(?:(rotate)\\s*\\(\\s*(" + s + ")(?:" + o + "(" + s + ")" + o + "(" + s + "))?\\s*\\))") + "|" + ("(?:(skewX)\\s*\\(\\s*(" + s + ")\\s*\\))") + "|" + ("(?:(skewY)\\s*\\(\\s*(" + s + ")\\s*\\))") + ")",
                h = "^\\s*(?:" + ("(?:" + a + "(?:" + o + "*" + a + ")*)") + "?)\\s*$",
                c = new RegExp(h),
                l = new RegExp(a, "g");
            return function(s) {
                var o = n.concat(),
                    h = [];
                if (!s || s && !c.test(s)) return o;
                s.replace(l, function(s) {
                    var c = new RegExp(a).exec(s).filter(function(t) {
                            return !!t
                        }),
                        l = c[1],
                        u = c.slice(2).map(parseFloat);
                    switch (l) {
                        case "translate":
                            r(o, u);
                            break;
                        case "rotate":
                            u[0] = v.util.degreesToRadians(u[0]), t(o, u);
                            break;
                        case "scale":
                            e(o, u);
                            break;
                        case "skewX":
                            i(o, u, 2);
                            break;
                        case "skewY":
                            i(o, u, 1);
                            break;
                        case "matrix":
                            o = u
                    }
                    h.push(o.concat()), o = n.concat()
                });
                for (var u = h[0]; h.length > 1;) h.shift(), u = v.util.multiplyTransformMatrices(u, h[0]);
                return u
            }
        }();
        var D = new RegExp("^\\s*(" + v.reNum + "+)\\s*,?\\s*(" + v.reNum + "+)\\s*,?\\s*(" + v.reNum + "+)\\s*,?\\s*(" + v.reNum + "+)\\s*$");
        v.parseSVGDocument = function(t, e, i, r) {
            if (t) {
                d(t);
                var n, s, o = v.Object.__uid++,
                    a = g(t),
                    h = v.util.toArray(t.getElementsByTagName("*"));
                if (a.crossOrigin = r && r.crossOrigin, a.svgUid = o, 0 === h.length && v.isLikelyNode) {
                    var c = [];
                    for (n = 0, s = (h = t.selectNodes('//*[name(.)!="svg"]')).length; n < s; n++) c[n] = h[n];
                    h = c
                }
                var l = h.filter(function(t) {
                    return g(t), v.svgValidTagNamesRegEx.test(t.nodeName.replace("svg:", "")) && !p(t, v.svgInvalidAncestorsRegEx)
                });
                !l || l && !l.length ? e && e([], {}) : (v.gradientDefs[o] = v.getGradientDefs(t), v.cssRules[o] = v.getCSSRules(t), v.parseElements(l, function(t, i) {
                    e && e(t, a, i, h)
                }, b(a), i, r))
            }
        };
        var j = new RegExp("(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(" + v.reNum + "(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|" + v.reNum + "))?\\s+(.*)");
        m(v, {
            parseFontDeclaration: function(t, e) {
                var i = t.match(j);
                if (i) {
                    var r = i[1],
                        n = i[3],
                        s = i[4],
                        o = i[5],
                        a = i[6];
                    r && (e.fontStyle = r), n && (e.fontWeight = isNaN(parseFloat(n)) ? n : parseFloat(n)), s && (e.fontSize = y(s)), a && (e.fontFamily = a), o && (e.lineHeight = "normal" === o ? 1 : o)
                }
            },
            getGradientDefs: function(t) {
                var e, i, r, n = s(t, ["linearGradient", "radialGradient", "svg:linearGradient", "svg:radialGradient"]),
                    o = 0,
                    a = {},
                    h = {};
                for (o = n.length; o--;) r = (e = n[o]).getAttribute("xlink:href"), i = e.getAttribute("id"), r && (h[i] = r.substr(1)), a[i] = e;
                for (i in h) {
                    var c = a[h[i]].cloneNode(!0);
                    for (e = a[i]; c.firstChild;) e.appendChild(c.firstChild)
                }
                return a
            },
            parseAttributes: function(t, r, s) {
                if (t) {
                    var o, a, c = {};
                    void 0 === s && (s = t.getAttribute("svgUid")), t.parentNode && v.svgValidParentsRegEx.test(t.parentNode.nodeName) && (c = v.parseAttributes(t.parentNode, r, s)), a = c && c.fontSize || t.getAttribute("font-size") || v.Text.DEFAULT_SVG_FONT_SIZE;
                    var l = r.reduce(function(e, i) {
                        return (o = t.getAttribute(i)) && (e[i] = o), e
                    }, {});
                    l = m(l, m(h(t, s), v.parseStyleAttribute(t)));
                    var u, f, d = {};
                    for (var g in l) f = i(u = e(g), l[g], c, a), d[u] = f;
                    d && d.font && v.parseFontDeclaration(d.font, d);
                    var p = m(c, d);
                    return v.svgValidParentsRegEx.test(t.nodeName) ? p : n(p)
                }
            },
            parseElements: function(t, e, i, r, n) {
                new v.ElementsParser(t, e, i, r, n).parse()
            },
            parseStyleAttribute: function(t) {
                var e = {},
                    i = t.getAttribute("style");
                return i ? ("string" == typeof i ? o(i, e) : a(i, e), e) : e
            },
            parsePointsAttribute: function(t) {
                if (!t) return null;
                var e, i, r = [];
                for (e = 0, i = (t = (t = t.replace(/,/g, " ").trim()).split(/\s+/)).length; e < i; e += 2) r.push({
                    x: parseFloat(t[e]),
                    y: parseFloat(t[e + 1])
                });
                return r
            },
            getCSSRules: function(t) {
                var e, i, r = t.getElementsByTagName("style"),
                    n = {};
                for (e = 0, i = r.length; e < i; e++) {
                    var s = r[e].textContent || r[e].text;
                    "" !== (s = s.replace(/\/\*[\s\S]*?\*\//g, "")).trim() && s.match(/[^{]*\{[\s\S]*?\}/g).map(function(t) {
                        return t.trim()
                    }).forEach(function(t) {
                        var r = t.match(/([\s\S]*?)\s*\{([^}]*)\}/),
                            s = {},
                            o = r[2].trim().replace(/;$/, "").split(/\s*;\s*/);
                        for (e = 0, i = o.length; e < i; e++) {
                            var a = o[e].split(/\s*:\s*/),
                                h = a[0],
                                c = a[1];
                            s[h] = c
                        }(t = r[1]).split(",").forEach(function(t) {
                            "" !== (t = t.replace(/^svg/i, "").trim()) && (n[t] ? v.util.object.extend(n[t], s) : n[t] = v.util.object.clone(s))
                        })
                    })
                }
                return n
            },
            loadSVGFromURL: function(t, e, i, r) {
                t = t.replace(/^\n\s*/, "").trim(), new v.util.request(t, {
                    method: "get",
                    onComplete: function(t) {
                        var n = t.responseXML;
                        n && !n.documentElement && v.window.ActiveXObject && t.responseText && ((n = new ActiveXObject("Microsoft.XMLDOM")).async = "false", n.loadXML(t.responseText.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, ""))), n && n.documentElement || e && e(null), v.parseSVGDocument(n.documentElement, function(t, i, r, n) {
                            e && e(t, i, r, n)
                        }, i, r)
                    }
                })
            },
            loadSVGFromString: function(t, e, i, r) {
                t = t.trim();
                var n;
                if ("undefined" != typeof DOMParser) {
                    var s = new DOMParser;
                    s && s.parseFromString && (n = s.parseFromString(t, "text/xml"))
                } else v.window.ActiveXObject && ((n = new ActiveXObject("Microsoft.XMLDOM")).async = "false", n.loadXML(t.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, "")));
                v.parseSVGDocument(n.documentElement, function(t, i, r, n) {
                    e(t, i, r, n)
                }, i, r)
            }
        })
    }("undefined" != typeof exports ? exports : this), fabric.ElementsParser = function(t, e, i, r, n) {
        this.elements = t, this.callback = e, this.options = i, this.reviver = r, this.svgUid = i && i.svgUid || 0, this.parsingOptions = n
    }, fabric.ElementsParser.prototype.parse = function() {
        this.instances = new Array(this.elements.length), this.numElements = this.elements.length, this.createObjects()
    }, fabric.ElementsParser.prototype.createObjects = function() {
        for (var t = 0, e = this.elements.length; t < e; t++) this.elements[t].setAttribute("svgUid", this.svgUid),
            function(t, e) {
                setTimeout(function() {
                    t.createObject(t.elements[e], e)
                }, 0)
            }(this, t)
    }, fabric.ElementsParser.prototype.createObject = function(t, e) {
        var i = fabric[fabric.util.string.capitalize(t.tagName.replace("svg:", ""))];
        if (i && i.fromElement) try {
            this._createObject(i, t, e)
        } catch (t) {
            fabric.log(t)
        } else this.checkIfDone()
    }, fabric.ElementsParser.prototype._createObject = function(t, e, i) {
        t.fromElement(e, this.createCallback(i, e), this.options)
    }, fabric.ElementsParser.prototype.createCallback = function(t, e) {
        var i = this;
        return function(r) {
            var n;
            i.resolveGradient(r, "fill"), i.resolveGradient(r, "stroke"), r instanceof fabric.Image && (n = r.parsePreserveAspectRatioAttribute(e)), r._removeTransformMatrix(n), i.reviver && i.reviver(e, r), i.instances[t] = r, i.checkIfDone()
        }
    }, fabric.ElementsParser.prototype.resolveGradient = function(t, e) {
        var i = t.get(e);
        if (/^url\(/.test(i)) {
            var r = i.slice(5, i.length - 1);
            fabric.gradientDefs[this.svgUid][r] && t.set(e, fabric.Gradient.fromElement(fabric.gradientDefs[this.svgUid][r], t))
        }
    }, fabric.ElementsParser.prototype.checkIfDone = function() {
        0 == --this.numElements && (this.instances = this.instances.filter(function(t) {
            return null != t
        }), this.callback(this.instances, this.elements))
    },
    function(t) {
        "use strict";

        function e(t, e) {
            this.x = t, this.y = e
        }
        var i = t.fabric || (t.fabric = {});
        i.Point ? i.warn("fabric.Point is already defined") : (i.Point = e, e.prototype = {
            type: "point",
            constructor: e,
            add: function(t) {
                return new e(this.x + t.x, this.y + t.y)
            },
            addEquals: function(t) {
                return this.x += t.x, this.y += t.y, this
            },
            scalarAdd: function(t) {
                return new e(this.x + t, this.y + t)
            },
            scalarAddEquals: function(t) {
                return this.x += t, this.y += t, this
            },
            subtract: function(t) {
                return new e(this.x - t.x, this.y - t.y)
            },
            subtractEquals: function(t) {
                return this.x -= t.x, this.y -= t.y, this
            },
            scalarSubtract: function(t) {
                return new e(this.x - t, this.y - t)
            },
            scalarSubtractEquals: function(t) {
                return this.x -= t, this.y -= t, this
            },
            multiply: function(t) {
                return new e(this.x * t, this.y * t)
            },
            multiplyEquals: function(t) {
                return this.x *= t, this.y *= t, this
            },
            divide: function(t) {
                return new e(this.x / t, this.y / t)
            },
            divideEquals: function(t) {
                return this.x /= t, this.y /= t, this
            },
            eq: function(t) {
                return this.x === t.x && this.y === t.y
            },
            lt: function(t) {
                return this.x < t.x && this.y < t.y
            },
            lte: function(t) {
                return this.x <= t.x && this.y <= t.y
            },
            gt: function(t) {
                return this.x > t.x && this.y > t.y
            },
            gte: function(t) {
                return this.x >= t.x && this.y >= t.y
            },
            lerp: function(t, i) {
                return void 0 === i && (i = .5), i = Math.max(Math.min(1, i), 0), new e(this.x + (t.x - this.x) * i, this.y + (t.y - this.y) * i)
            },
            distanceFrom: function(t) {
                var e = this.x - t.x,
                    i = this.y - t.y;
                return Math.sqrt(e * e + i * i)
            },
            midPointFrom: function(t) {
                return this.lerp(t)
            },
            min: function(t) {
                return new e(Math.min(this.x, t.x), Math.min(this.y, t.y))
            },
            max: function(t) {
                return new e(Math.max(this.x, t.x), Math.max(this.y, t.y))
            },
            toString: function() {
                return this.x + "," + this.y
            },
            setXY: function(t, e) {
                return this.x = t, this.y = e, this
            },
            setX: function(t) {
                return this.x = t, this
            },
            setY: function(t) {
                return this.y = t, this
            },
            setFromPoint: function(t) {
                return this.x = t.x, this.y = t.y, this
            },
            swap: function(t) {
                var e = this.x,
                    i = this.y;
                this.x = t.x, this.y = t.y, t.x = e, t.y = i
            },
            clone: function() {
                return new e(this.x, this.y)
            }
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";

        function e(t) {
            this.status = t, this.points = []
        }
        var i = t.fabric || (t.fabric = {});
        i.Intersection ? i.warn("fabric.Intersection is already defined") : (i.Intersection = e, i.Intersection.prototype = {
            constructor: e,
            appendPoint: function(t) {
                return this.points.push(t), this
            },
            appendPoints: function(t) {
                return this.points = this.points.concat(t), this
            }
        }, i.Intersection.intersectLineLine = function(t, r, n, s) {
            var o, a = (s.x - n.x) * (t.y - n.y) - (s.y - n.y) * (t.x - n.x),
                h = (r.x - t.x) * (t.y - n.y) - (r.y - t.y) * (t.x - n.x),
                c = (s.y - n.y) * (r.x - t.x) - (s.x - n.x) * (r.y - t.y);
            if (0 !== c) {
                var l = a / c,
                    u = h / c;
                0 <= l && l <= 1 && 0 <= u && u <= 1 ? (o = new e("Intersection")).appendPoint(new i.Point(t.x + l * (r.x - t.x), t.y + l * (r.y - t.y))) : o = new e
            } else o = new e(0 === a || 0 === h ? "Coincident" : "Parallel");
            return o
        }, i.Intersection.intersectLinePolygon = function(t, i, r) {
            var n, s, o, a, h = new e,
                c = r.length;
            for (a = 0; a < c; a++) n = r[a], s = r[(a + 1) % c], o = e.intersectLineLine(t, i, n, s), h.appendPoints(o.points);
            return h.points.length > 0 && (h.status = "Intersection"), h
        }, i.Intersection.intersectPolygonPolygon = function(t, i) {
            var r, n = new e,
                s = t.length;
            for (r = 0; r < s; r++) {
                var o = t[r],
                    a = t[(r + 1) % s],
                    h = e.intersectLinePolygon(o, a, i);
                n.appendPoints(h.points)
            }
            return n.points.length > 0 && (n.status = "Intersection"), n
        }, i.Intersection.intersectPolygonRectangle = function(t, r, n) {
            var s = r.min(n),
                o = r.max(n),
                a = new i.Point(o.x, s.y),
                h = new i.Point(s.x, o.y),
                c = e.intersectLinePolygon(s, a, t),
                l = e.intersectLinePolygon(a, o, t),
                u = e.intersectLinePolygon(o, h, t),
                f = e.intersectLinePolygon(h, s, t),
                d = new e;
            return d.appendPoints(c.points), d.appendPoints(l.points), d.appendPoints(u.points), d.appendPoints(f.points), d.points.length > 0 && (d.status = "Intersection"), d
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";

        function e(t) {
            t ? this._tryParsingColor(t) : this.setSource([0, 0, 0, 1])
        }

        function i(t, e, i) {
            return i < 0 && (i += 1), i > 1 && (i -= 1), i < 1 / 6 ? t + 6 * (e - t) * i : i < .5 ? e : i < 2 / 3 ? t + (e - t) * (2 / 3 - i) * 6 : t
        }
        var r = t.fabric || (t.fabric = {});
        r.Color ? r.warn("fabric.Color is already defined.") : (r.Color = e, r.Color.prototype = {
            _tryParsingColor: function(t) {
                var i;
                t in e.colorNameMap && (t = e.colorNameMap[t]), "transparent" === t && (i = [255, 255, 255, 0]), i || (i = e.sourceFromHex(t)), i || (i = e.sourceFromRgb(t)), i || (i = e.sourceFromHsl(t)), i || (i = [0, 0, 0, 1]), i && this.setSource(i)
            },
            _rgbToHsl: function(t, e, i) {
                t /= 255, e /= 255, i /= 255;
                var n, s, o, a = r.util.array.max([t, e, i]),
                    h = r.util.array.min([t, e, i]);
                if (o = (a + h) / 2, a === h) n = s = 0;
                else {
                    var c = a - h;
                    switch (s = o > .5 ? c / (2 - a - h) : c / (a + h), a) {
                        case t:
                            n = (e - i) / c + (e < i ? 6 : 0);
                            break;
                        case e:
                            n = (i - t) / c + 2;
                            break;
                        case i:
                            n = (t - e) / c + 4
                    }
                    n /= 6
                }
                return [Math.round(360 * n), Math.round(100 * s), Math.round(100 * o)]
            },
            getSource: function() {
                return this._source
            },
            setSource: function(t) {
                this._source = t
            },
            toRgb: function() {
                var t = this.getSource();
                return "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")"
            },
            toRgba: function() {
                var t = this.getSource();
                return "rgba(" + t[0] + "," + t[1] + "," + t[2] + "," + t[3] + ")"
            },
            toHsl: function() {
                var t = this.getSource(),
                    e = this._rgbToHsl(t[0], t[1], t[2]);
                return "hsl(" + e[0] + "," + e[1] + "%," + e[2] + "%)"
            },
            toHsla: function() {
                var t = this.getSource(),
                    e = this._rgbToHsl(t[0], t[1], t[2]);
                return "hsla(" + e[0] + "," + e[1] + "%," + e[2] + "%," + t[3] + ")"
            },
            toHex: function() {
                var t, e, i, r = this.getSource();
                return t = r[0].toString(16), t = 1 === t.length ? "0" + t : t, e = r[1].toString(16), e = 1 === e.length ? "0" + e : e, i = r[2].toString(16), i = 1 === i.length ? "0" + i : i, t.toUpperCase() + e.toUpperCase() + i.toUpperCase()
            },
            toHexa: function() {
                var t;
                return t = 255 * this.getSource()[3], t = t.toString(16), t = 1 === t.length ? "0" + t : t, this.toHex() + t.toUpperCase()
            },
            getAlpha: function() {
                return this.getSource()[3]
            },
            setAlpha: function(t) {
                var e = this.getSource();
                return e[3] = t, this.setSource(e), this
            },
            toGrayscale: function() {
                var t = this.getSource(),
                    e = parseInt((.3 * t[0] + .59 * t[1] + .11 * t[2]).toFixed(0), 10),
                    i = t[3];
                return this.setSource([e, e, e, i]), this
            },
            toBlackWhite: function(t) {
                var e = this.getSource(),
                    i = (.3 * e[0] + .59 * e[1] + .11 * e[2]).toFixed(0),
                    r = e[3];
                return t = t || 127, i = Number(i) < Number(t) ? 0 : 255, this.setSource([i, i, i, r]), this
            },
            overlayWith: function(t) {
                t instanceof e || (t = new e(t));
                var i, r = [],
                    n = this.getAlpha(),
                    s = this.getSource(),
                    o = t.getSource();
                for (i = 0; i < 3; i++) r.push(Math.round(.5 * s[i] + .5 * o[i]));
                return r[3] = n, this.setSource(r), this
            }
        }, r.Color.reRGBa = /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*((?:\d*\.?\d+)?)\s*)?\)$/, r.Color.reHSLa = /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/, r.Color.reHex = /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i, r.Color.colorNameMap = {
            aliceblue: "#F0F8FF",
            antiquewhite: "#FAEBD7",
            aqua: "#00FFFF",
            aquamarine: "#7FFFD4",
            azure: "#F0FFFF",
            beige: "#F5F5DC",
            bisque: "#FFE4C4",
            black: "#000000",
            blanchedalmond: "#FFEBCD",
            blue: "#0000FF",
            blueviolet: "#8A2BE2",
            brown: "#A52A2A",
            burlywood: "#DEB887",
            cadetblue: "#5F9EA0",
            chartreuse: "#7FFF00",
            chocolate: "#D2691E",
            coral: "#FF7F50",
            cornflowerblue: "#6495ED",
            cornsilk: "#FFF8DC",
            crimson: "#DC143C",
            cyan: "#00FFFF",
            darkblue: "#00008B",
            darkcyan: "#008B8B",
            darkgoldenrod: "#B8860B",
            darkgray: "#A9A9A9",
            darkgrey: "#A9A9A9",
            darkgreen: "#006400",
            darkkhaki: "#BDB76B",
            darkmagenta: "#8B008B",
            darkolivegreen: "#556B2F",
            darkorange: "#FF8C00",
            darkorchid: "#9932CC",
            darkred: "#8B0000",
            darksalmon: "#E9967A",
            darkseagreen: "#8FBC8F",
            darkslateblue: "#483D8B",
            darkslategray: "#2F4F4F",
            darkslategrey: "#2F4F4F",
            darkturquoise: "#00CED1",
            darkviolet: "#9400D3",
            deeppink: "#FF1493",
            deepskyblue: "#00BFFF",
            dimgray: "#696969",
            dimgrey: "#696969",
            dodgerblue: "#1E90FF",
            firebrick: "#B22222",
            floralwhite: "#FFFAF0",
            forestgreen: "#228B22",
            fuchsia: "#FF00FF",
            gainsboro: "#DCDCDC",
            ghostwhite: "#F8F8FF",
            gold: "#FFD700",
            goldenrod: "#DAA520",
            gray: "#808080",
            grey: "#808080",
            green: "#008000",
            greenyellow: "#ADFF2F",
            honeydew: "#F0FFF0",
            hotpink: "#FF69B4",
            indianred: "#CD5C5C",
            indigo: "#4B0082",
            ivory: "#FFFFF0",
            khaki: "#F0E68C",
            lavender: "#E6E6FA",
            lavenderblush: "#FFF0F5",
            lawngreen: "#7CFC00",
            lemonchiffon: "#FFFACD",
            lightblue: "#ADD8E6",
            lightcoral: "#F08080",
            lightcyan: "#E0FFFF",
            lightgoldenrodyellow: "#FAFAD2",
            lightgray: "#D3D3D3",
            lightgrey: "#D3D3D3",
            lightgreen: "#90EE90",
            lightpink: "#FFB6C1",
            lightsalmon: "#FFA07A",
            lightseagreen: "#20B2AA",
            lightskyblue: "#87CEFA",
            lightslategray: "#778899",
            lightslategrey: "#778899",
            lightsteelblue: "#B0C4DE",
            lightyellow: "#FFFFE0",
            lime: "#00FF00",
            limegreen: "#32CD32",
            linen: "#FAF0E6",
            magenta: "#FF00FF",
            maroon: "#800000",
            mediumaquamarine: "#66CDAA",
            mediumblue: "#0000CD",
            mediumorchid: "#BA55D3",
            mediumpurple: "#9370DB",
            mediumseagreen: "#3CB371",
            mediumslateblue: "#7B68EE",
            mediumspringgreen: "#00FA9A",
            mediumturquoise: "#48D1CC",
            mediumvioletred: "#C71585",
            midnightblue: "#191970",
            mintcream: "#F5FFFA",
            mistyrose: "#FFE4E1",
            moccasin: "#FFE4B5",
            navajowhite: "#FFDEAD",
            navy: "#000080",
            oldlace: "#FDF5E6",
            olive: "#808000",
            olivedrab: "#6B8E23",
            orange: "#FFA500",
            orangered: "#FF4500",
            orchid: "#DA70D6",
            palegoldenrod: "#EEE8AA",
            palegreen: "#98FB98",
            paleturquoise: "#AFEEEE",
            palevioletred: "#DB7093",
            papayawhip: "#FFEFD5",
            peachpuff: "#FFDAB9",
            peru: "#CD853F",
            pink: "#FFC0CB",
            plum: "#DDA0DD",
            powderblue: "#B0E0E6",
            purple: "#800080",
            rebeccapurple: "#663399",
            red: "#FF0000",
            rosybrown: "#BC8F8F",
            royalblue: "#4169E1",
            saddlebrown: "#8B4513",
            salmon: "#FA8072",
            sandybrown: "#F4A460",
            seagreen: "#2E8B57",
            seashell: "#FFF5EE",
            sienna: "#A0522D",
            silver: "#C0C0C0",
            skyblue: "#87CEEB",
            slateblue: "#6A5ACD",
            slategray: "#708090",
            slategrey: "#708090",
            snow: "#FFFAFA",
            springgreen: "#00FF7F",
            steelblue: "#4682B4",
            tan: "#D2B48C",
            teal: "#008080",
            thistle: "#D8BFD8",
            tomato: "#FF6347",
            turquoise: "#40E0D0",
            violet: "#EE82EE",
            wheat: "#F5DEB3",
            white: "#FFFFFF",
            whitesmoke: "#F5F5F5",
            yellow: "#FFFF00",
            yellowgreen: "#9ACD32"
        }, r.Color.fromRgb = function(t) {
            return e.fromSource(e.sourceFromRgb(t))
        }, r.Color.sourceFromRgb = function(t) {
            var i = t.match(e.reRGBa);
            if (i) {
                var r = parseInt(i[1], 10) / (/%$/.test(i[1]) ? 100 : 1) * (/%$/.test(i[1]) ? 255 : 1),
                    n = parseInt(i[2], 10) / (/%$/.test(i[2]) ? 100 : 1) * (/%$/.test(i[2]) ? 255 : 1),
                    s = parseInt(i[3], 10) / (/%$/.test(i[3]) ? 100 : 1) * (/%$/.test(i[3]) ? 255 : 1);
                return [parseInt(r, 10), parseInt(n, 10), parseInt(s, 10), i[4] ? parseFloat(i[4]) : 1]
            }
        }, r.Color.fromRgba = e.fromRgb, r.Color.fromHsl = function(t) {
            return e.fromSource(e.sourceFromHsl(t))
        }, r.Color.sourceFromHsl = function(t) {
            var r = t.match(e.reHSLa);
            if (r) {
                var n, s, o, a = (parseFloat(r[1]) % 360 + 360) % 360 / 360,
                    h = parseFloat(r[2]) / (/%$/.test(r[2]) ? 100 : 1),
                    c = parseFloat(r[3]) / (/%$/.test(r[3]) ? 100 : 1);
                if (0 === h) n = s = o = c;
                else {
                    var l = c <= .5 ? c * (h + 1) : c + h - c * h,
                        u = 2 * c - l;
                    n = i(u, l, a + 1 / 3), s = i(u, l, a), o = i(u, l, a - 1 / 3)
                }
                return [Math.round(255 * n), Math.round(255 * s), Math.round(255 * o), r[4] ? parseFloat(r[4]) : 1]
            }
        }, r.Color.fromHsla = e.fromHsl, r.Color.fromHex = function(t) {
            return e.fromSource(e.sourceFromHex(t))
        }, r.Color.sourceFromHex = function(t) {
            if (t.match(e.reHex)) {
                var i = t.slice(t.indexOf("#") + 1),
                    r = 3 === i.length || 4 === i.length,
                    n = 8 === i.length || 4 === i.length,
                    s = r ? i.charAt(0) + i.charAt(0) : i.substring(0, 2),
                    o = r ? i.charAt(1) + i.charAt(1) : i.substring(2, 4),
                    a = r ? i.charAt(2) + i.charAt(2) : i.substring(4, 6),
                    h = n ? r ? i.charAt(3) + i.charAt(3) : i.substring(6, 8) : "FF";
                return [parseInt(s, 16), parseInt(o, 16), parseInt(a, 16), parseFloat((parseInt(h, 16) / 255).toFixed(2))]
            }
        }, r.Color.fromSource = function(t) {
            var i = new e;
            return i.setSource(t), i
        })
    }("undefined" != typeof exports ? exports : this),
    function() {
        function t(t) {
            var e, i, r, n, s = t.getAttribute("style"),
                o = t.getAttribute("offset") || 0;
            if (o = parseFloat(o) / (/%$/.test(o) ? 100 : 1), o = o < 0 ? 0 : o > 1 ? 1 : o, s) {
                var a = s.split(/\s*;\s*/);
                for ("" === a[a.length - 1] && a.pop(), n = a.length; n--;) {
                    var h = a[n].split(/\s*:\s*/),
                        c = h[0].trim(),
                        l = h[1].trim();
                    "stop-color" === c ? e = l : "stop-opacity" === c && (r = l)
                }
            }
            return e || (e = t.getAttribute("stop-color") || "rgb(0,0,0)"), r || (r = t.getAttribute("stop-opacity")), e = new fabric.Color(e), i = e.getAlpha(), r = isNaN(parseFloat(r)) ? 1 : parseFloat(r), r *= i, {
                offset: o,
                color: e.toRgb(),
                opacity: r
            }
        }

        function e(t) {
            return {
                x1: t.getAttribute("x1") || 0,
                y1: t.getAttribute("y1") || 0,
                x2: t.getAttribute("x2") || "100%",
                y2: t.getAttribute("y2") || 0
            }
        }

        function i(t) {
            return {
                x1: t.getAttribute("fx") || t.getAttribute("cx") || "50%",
                y1: t.getAttribute("fy") || t.getAttribute("cy") || "50%",
                r1: 0,
                x2: t.getAttribute("cx") || "50%",
                y2: t.getAttribute("cy") || "50%",
                r2: t.getAttribute("r") || "50%"
            }
        }

        function r(t, e, i) {
            var r, n = 0,
                s = 1,
                o = "";
            for (var a in e) "Infinity" === e[a] ? e[a] = 1 : "-Infinity" === e[a] && (e[a] = 0), r = parseFloat(e[a], 10), s = "string" == typeof e[a] && /^\d+%$/.test(e[a]) ? .01 : 1, "x1" === a || "x2" === a || "r2" === a ? (s *= "objectBoundingBox" === i ? t.width : 1, n = "objectBoundingBox" === i ? t.left || 0 : 0) : "y1" !== a && "y2" !== a || (s *= "objectBoundingBox" === i ? t.height : 1, n = "objectBoundingBox" === i ? t.top || 0 : 0), e[a] = r * s + n;
            if ("ellipse" === t.type && null !== e.r2 && "objectBoundingBox" === i && t.rx !== t.ry) {
                var h = t.ry / t.rx;
                o = " scale(1, " + h + ")", e.y1 && (e.y1 /= h), e.y2 && (e.y2 /= h)
            }
            return o
        }
        var n = fabric.util.object.clone;
        fabric.Gradient = fabric.util.createClass({
            offsetX: 0,
            offsetY: 0,
            initialize: function(t) {
                t || (t = {});
                var e = {};
                this.id = fabric.Object.__uid++, this.type = t.type || "linear", e = {
                    x1: t.coords.x1 || 0,
                    y1: t.coords.y1 || 0,
                    x2: t.coords.x2 || 0,
                    y2: t.coords.y2 || 0
                }, "radial" === this.type && (e.r1 = t.coords.r1 || 0, e.r2 = t.coords.r2 || 0), this.coords = e, this.colorStops = t.colorStops.slice(), t.gradientTransform && (this.gradientTransform = t.gradientTransform), this.offsetX = t.offsetX || this.offsetX, this.offsetY = t.offsetY || this.offsetY
            },
            addColorStop: function(t) {
                for (var e in t) {
                    var i = new fabric.Color(t[e]);
                    this.colorStops.push({
                        offset: parseFloat(e),
                        color: i.toRgb(),
                        opacity: i.getAlpha()
                    })
                }
                return this
            },
            toObject: function(t) {
                var e = {
                    type: this.type,
                    coords: this.coords,
                    colorStops: this.colorStops,
                    offsetX: this.offsetX,
                    offsetY: this.offsetY,
                    gradientTransform: this.gradientTransform ? this.gradientTransform.concat() : this.gradientTransform
                };
                return fabric.util.populateWithProperties(this, e, t), e
            },
            toSVG: function(t) {
                var e, i, r, s, o = n(this.coords, !0),
                    a = n(this.colorStops, !0),
                    h = o.r1 > o.r2,
                    c = t.width / 2,
                    l = t.height / 2;
                a.sort(function(t, e) {
                    return t.offset - e.offset
                }), "path" === t.type && (c -= t.pathOffset.x, l -= t.pathOffset.y);
                for (var u in o) "x1" === u || "x2" === u ? o[u] += this.offsetX - c : "y1" !== u && "y2" !== u || (o[u] += this.offsetY - l);
                if (s = 'id="SVGID_' + this.id + '" gradientUnits="userSpaceOnUse"', this.gradientTransform && (s += ' gradientTransform="matrix(' + this.gradientTransform.join(" ") + ')" '), "linear" === this.type ? r = ["<linearGradient ", s, ' x1="', o.x1, '" y1="', o.y1, '" x2="', o.x2, '" y2="', o.y2, '">\n'] : "radial" === this.type && (r = ["<radialGradient ", s, ' cx="', h ? o.x1 : o.x2, '" cy="', h ? o.y1 : o.y2, '" r="', h ? o.r1 : o.r2, '" fx="', h ? o.x2 : o.x1, '" fy="', h ? o.y2 : o.y1, '">\n']), "radial" === this.type) {
                    if (h)
                        for ((a = a.concat()).reverse(), e = 0, i = a.length; e < i; e++) a[e].offset = 1 - a[e].offset;
                    var f = Math.min(o.r1, o.r2);
                    if (f > 0) {
                        var d = f / Math.max(o.r1, o.r2);
                        for (e = 0, i = a.length; e < i; e++) a[e].offset += d * (1 - a[e].offset)
                    }
                }
                for (e = 0, i = a.length; e < i; e++) {
                    var g = a[e];
                    r.push("<stop ", 'offset="', 100 * g.offset + "%", '" style="stop-color:', g.color, null !== g.opacity ? ";stop-opacity: " + g.opacity : ";", '"/>\n')
                }
                return r.push("linear" === this.type ? "</linearGradient>\n" : "</radialGradient>\n"), r.join("")
            },
            toLive: function(t) {
                var e, i, r, n = fabric.util.object.clone(this.coords);
                if (this.type) {
                    for ("linear" === this.type ? e = t.createLinearGradient(n.x1, n.y1, n.x2, n.y2) : "radial" === this.type && (e = t.createRadialGradient(n.x1, n.y1, n.r1, n.x2, n.y2, n.r2)), i = 0, r = this.colorStops.length; i < r; i++) {
                        var s = this.colorStops[i].color,
                            o = this.colorStops[i].opacity,
                            a = this.colorStops[i].offset;
                        void 0 !== o && (s = new fabric.Color(s).setAlpha(o).toRgba()), e.addColorStop(a, s)
                    }
                    return e
                }
            }
        }), fabric.util.object.extend(fabric.Gradient, {
            fromElement: function(n, s) {
                var o, a, h, c, l = n.getElementsByTagName("stop"),
                    u = n.getAttribute("gradientUnits") || "objectBoundingBox",
                    f = n.getAttribute("gradientTransform"),
                    d = [];
                for ("linear" === (o = "linearGradient" === n.nodeName || "LINEARGRADIENT" === n.nodeName ? "linear" : "radial") ? a = e(n) : "radial" === o && (a = i(n)), c = l.length; c--;) d.push(t(l[c]));
                h = r(s, a, u);
                var g = new fabric.Gradient({
                    type: o,
                    coords: a,
                    colorStops: d,
                    offsetX: -s.left,
                    offsetY: -s.top
                });
                return (f || "" !== h) && (g.gradientTransform = fabric.parseTransformAttribute((f || "") + h)), g
            },
            forObject: function(t, e) {
                return e || (e = {}), r(t, e.coords, "userSpaceOnUse"), new fabric.Gradient(e)
            }
        })
    }(),
    function() {
        "use strict";
        var t = fabric.util.toFixed;
        fabric.Pattern = fabric.util.createClass({
            repeat: "repeat",
            offsetX: 0,
            offsetY: 0,
            initialize: function(t, e) {
                if (t || (t = {}), this.id = fabric.Object.__uid++, this.setOptions(t), !t.source || t.source && "string" != typeof t.source) e && e(this);
                else if (void 0 !== fabric.util.getFunctionBody(t.source)) this.source = new Function(fabric.util.getFunctionBody(t.source)), e && e(this);
                else {
                    var i = this;
                    this.source = fabric.util.createImage(), fabric.util.loadImage(t.source, function(t) {
                        i.source = t, e && e(i)
                    })
                }
            },
            toObject: function(e) {
                var i, r, n = fabric.Object.NUM_FRACTION_DIGITS;
                return "function" == typeof this.source ? i = String(this.source) : "string" == typeof this.source.src ? i = this.source.src : "object" == typeof this.source && this.source.toDataURL && (i = this.source.toDataURL()), r = {
                    type: "pattern",
                    source: i,
                    repeat: this.repeat,
                    offsetX: t(this.offsetX, n),
                    offsetY: t(this.offsetY, n)
                }, fabric.util.populateWithProperties(this, r, e), r
            },
            toSVG: function(t) {
                var e = "function" == typeof this.source ? this.source() : this.source,
                    i = e.width / t.width,
                    r = e.height / t.height,
                    n = this.offsetX / t.width,
                    s = this.offsetY / t.height,
                    o = "";
                return "repeat-x" !== this.repeat && "no-repeat" !== this.repeat || (r = 1), "repeat-y" !== this.repeat && "no-repeat" !== this.repeat || (i = 1), e.src ? o = e.src : e.toDataURL && (o = e.toDataURL()), '<pattern id="SVGID_' + this.id + '" x="' + n + '" y="' + s + '" width="' + i + '" height="' + r + '">\n<image x="0" y="0" width="' + e.width + '" height="' + e.height + '" xlink:href="' + o + '"></image>\n</pattern>\n'
            },
            setOptions: function(t) {
                for (var e in t) this[e] = t[e]
            },
            toLive: function(t) {
                var e = "function" == typeof this.source ? this.source() : this.source;
                if (!e) return "";
                if (void 0 !== e.src) {
                    if (!e.complete) return "";
                    if (0 === e.naturalWidth || 0 === e.naturalHeight) return ""
                }
                return t.createPattern(e, this.repeat)
            }
        })
    }(),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.toFixed;
        e.Shadow ? e.warn("fabric.Shadow is already defined.") : (e.Shadow = e.util.createClass({
            color: "rgb(0,0,0)",
            blur: 0,
            offsetX: 0,
            offsetY: 0,
            affectStroke: !1,
            includeDefaultValues: !0,
            initialize: function(t) {
                "string" == typeof t && (t = this._parseShadow(t));
                for (var i in t) this[i] = t[i];
                this.id = e.Object.__uid++
            },
            _parseShadow: function(t) {
                var i = t.trim(),
                    r = e.Shadow.reOffsetsAndBlur.exec(i) || [];
                return {
                    color: (i.replace(e.Shadow.reOffsetsAndBlur, "") || "rgb(0,0,0)").trim(),
                    offsetX: parseInt(r[1], 10) || 0,
                    offsetY: parseInt(r[2], 10) || 0,
                    blur: parseInt(r[3], 10) || 0
                }
            },
            toString: function() {
                return [this.offsetX, this.offsetY, this.blur, this.color].join("px ")
            },
            toSVG: function(t) {
                var r = 40,
                    n = 40,
                    s = e.Object.NUM_FRACTION_DIGITS,
                    o = e.util.rotateVector({
                        x: this.offsetX,
                        y: this.offsetY
                    }, e.util.degreesToRadians(-t.angle));
                return t.width && t.height && (r = 100 * i((Math.abs(o.x) + this.blur) / t.width, s) + 20, n = 100 * i((Math.abs(o.y) + this.blur) / t.height, s) + 20), t.flipX && (o.x *= -1), t.flipY && (o.y *= -1), '<filter id="SVGID_' + this.id + '" y="-' + n + '%" height="' + (100 + 2 * n) + '%" x="-' + r + '%" width="' + (100 + 2 * r) + '%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="' + i(this.blur ? this.blur / 2 : 0, s) + '"></feGaussianBlur>\n\t<feOffset dx="' + i(o.x, s) + '" dy="' + i(o.y, s) + '" result="oBlur" ></feOffset>\n\t<feFlood flood-color="' + this.color + '"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
            },
            toObject: function() {
                if (this.includeDefaultValues) return {
                    color: this.color,
                    blur: this.blur,
                    offsetX: this.offsetX,
                    offsetY: this.offsetY,
                    affectStroke: this.affectStroke
                };
                var t = {},
                    i = e.Shadow.prototype;
                return ["color", "blur", "offsetX", "offsetY", "affectStroke"].forEach(function(e) {
                    this[e] !== i[e] && (t[e] = this[e])
                }, this), t
            }
        }), e.Shadow.reOffsetsAndBlur = /(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/)
    }("undefined" != typeof exports ? exports : this),
    function() {
        "use strict";
        if (fabric.StaticCanvas) fabric.warn("fabric.StaticCanvas is already defined.");
        else {
            var t = fabric.util.object.extend,
                e = fabric.util.getElementOffset,
                i = fabric.util.removeFromArray,
                r = fabric.util.toFixed,
                n = fabric.util.transformPoint,
                s = fabric.util.invertTransform,
                o = new Error("Could not initialize `canvas` element");
            fabric.StaticCanvas = fabric.util.createClass(fabric.CommonMethods, {
                initialize: function(t, e) {
                    e || (e = {}), this.renderAndResetBound = this.renderAndReset.bind(this), this.requestRenderAllBound = this.requestRenderAll.bind(this), this._initStatic(t, e)
                },
                backgroundColor: "",
                backgroundImage: null,
                overlayColor: "",
                overlayImage: null,
                includeDefaultValues: !0,
                stateful: !1,
                renderOnAddRemove: !0,
                clipTo: null,
                controlsAboveOverlay: !1,
                allowTouchScrolling: !1,
                imageSmoothingEnabled: !0,
                viewportTransform: fabric.iMatrix.concat(),
                backgroundVpt: !0,
                overlayVpt: !0,
                onBeforeScaleRotate: function() {},
                enableRetinaScaling: !0,
                vptCoords: {},
                skipOffscreen: !0,
                _initStatic: function(t, e) {
                    var i = this.requestRenderAllBound;
                    this._objects = [], this._createLowerCanvas(t), this._initOptions(e), this._setImageSmoothing(), this.interactive || this._initRetinaScaling(), e.overlayImage && this.setOverlayImage(e.overlayImage, i), e.backgroundImage && this.setBackgroundImage(e.backgroundImage, i), e.backgroundColor && this.setBackgroundColor(e.backgroundColor, i), e.overlayColor && this.setOverlayColor(e.overlayColor, i), this.calcOffset()
                },
                _isRetinaScaling: function() {
                    return 1 !== fabric.devicePixelRatio && this.enableRetinaScaling
                },
                getRetinaScaling: function() {
                    return this._isRetinaScaling() ? fabric.devicePixelRatio : 1
                },
                _initRetinaScaling: function() {
                    this._isRetinaScaling() && (this.lowerCanvasEl.setAttribute("width", this.width * fabric.devicePixelRatio), this.lowerCanvasEl.setAttribute("height", this.height * fabric.devicePixelRatio), this.contextContainer.scale(fabric.devicePixelRatio, fabric.devicePixelRatio))
                },
                calcOffset: function() {
                    return this._offset = e(this.lowerCanvasEl), this
                },
                setOverlayImage: function(t, e, i) {
                    return this.__setBgOverlayImage("overlayImage", t, e, i)
                },
                setBackgroundImage: function(t, e, i) {
                    return this.__setBgOverlayImage("backgroundImage", t, e, i)
                },
                setOverlayColor: function(t, e) {
                    return this.__setBgOverlayColor("overlayColor", t, e)
                },
                setBackgroundColor: function(t, e) {
                    return this.__setBgOverlayColor("backgroundColor", t, e)
                },
                _setImageSmoothing: function() {
                    var t = this.getContext();
                    t.imageSmoothingEnabled = t.imageSmoothingEnabled || t.webkitImageSmoothingEnabled || t.mozImageSmoothingEnabled || t.msImageSmoothingEnabled || t.oImageSmoothingEnabled, t.imageSmoothingEnabled = this.imageSmoothingEnabled
                },
                __setBgOverlayImage: function(t, e, i, r) {
                    return "string" == typeof e ? fabric.util.loadImage(e, function(e) {
                        e && (this[t] = new fabric.Image(e, r)), i && i(e)
                    }, this, r && r.crossOrigin) : (r && e.setOptions(r), this[t] = e, i && i(e)), this
                },
                __setBgOverlayColor: function(t, e, i) {
                    return this[t] = e, this._initGradient(e, t), this._initPattern(e, t, i), this
                },
                _createCanvasElement: function() {
                    var t = fabric.util.createCanvasElement();
                    if (!t) throw o;
                    if (t.style || (t.style = {}), void 0 === t.getContext) throw o;
                    return t
                },
                _initOptions: function(t) {
                    this._setOptions(t), this.width = this.width || parseInt(this.lowerCanvasEl.width, 10) || 0, this.height = this.height || parseInt(this.lowerCanvasEl.height, 10) || 0, this.lowerCanvasEl.style && (this.lowerCanvasEl.width = this.width, this.lowerCanvasEl.height = this.height, this.lowerCanvasEl.style.width = this.width + "px", this.lowerCanvasEl.style.height = this.height + "px", this.viewportTransform = this.viewportTransform.slice())
                },
                _createLowerCanvas: function(t) {
                    t && t.getContext ? this.lowerCanvasEl = t : this.lowerCanvasEl = fabric.util.getById(t) || this._createCanvasElement(), fabric.util.addClass(this.lowerCanvasEl, "lower-canvas"), this.interactive && this._applyCanvasStyle(this.lowerCanvasEl), this.contextContainer = this.lowerCanvasEl.getContext("2d")
                },
                getWidth: function() {
                    return this.width
                },
                getHeight: function() {
                    return this.height
                },
                setWidth: function(t, e) {
                    return this.setDimensions({
                        width: t
                    }, e)
                },
                setHeight: function(t, e) {
                    return this.setDimensions({
                        height: t
                    }, e)
                },
                setDimensions: function(t, e) {
                    var i;
                    e = e || {};
                    for (var r in t) i = t[r], e.cssOnly || (this._setBackstoreDimension(r, t[r]), i += "px"), e.backstoreOnly || this._setCssDimension(r, i);
                    return this._initRetinaScaling(), this._setImageSmoothing(), this.calcOffset(), e.cssOnly || this.requestRenderAll(), this
                },
                _setBackstoreDimension: function(t, e) {
                    return this.lowerCanvasEl[t] = e, this.upperCanvasEl && (this.upperCanvasEl[t] = e), this.cacheCanvasEl && (this.cacheCanvasEl[t] = e), this[t] = e, this
                },
                _setCssDimension: function(t, e) {
                    return this.lowerCanvasEl.style[t] = e, this.upperCanvasEl && (this.upperCanvasEl.style[t] = e), this.wrapperEl && (this.wrapperEl.style[t] = e), this
                },
                getZoom: function() {
                    return this.viewportTransform[0]
                },
                setViewportTransform: function(t) {
                    var e, i, r, n = this._activeObject;
                    for (this.viewportTransform = t, i = 0, r = this._objects.length; i < r; i++)(e = this._objects[i]).group || e.setCoords(!1, !0);
                    return n && "activeSelection" === n.type && n.setCoords(!1, !0), this.calcViewportBoundaries(), this.renderOnAddRemove && this.requestRenderAll(), this
                },
                zoomToPoint: function(t, e) {
                    var i = t,
                        r = this.viewportTransform.slice(0);
                    t = n(t, s(this.viewportTransform)), r[0] = e, r[3] = e;
                    var o = n(t, r);
                    return r[4] += i.x - o.x, r[5] += i.y - o.y, this.setViewportTransform(r)
                },
                setZoom: function(t) {
                    return this.zoomToPoint(new fabric.Point(0, 0), t), this
                },
                absolutePan: function(t) {
                    var e = this.viewportTransform.slice(0);
                    return e[4] = -t.x, e[5] = -t.y, this.setViewportTransform(e)
                },
                relativePan: function(t) {
                    return this.absolutePan(new fabric.Point(-t.x - this.viewportTransform[4], -t.y - this.viewportTransform[5]))
                },
                getElement: function() {
                    return this.lowerCanvasEl
                },
                _onObjectAdded: function(t) {
                    this.stateful && t.setupState(), t._set("canvas", this), t.setCoords(), this.fire("object:added", {
                        target: t
                    }), t.fire("added")
                },
                _onObjectRemoved: function(t) {
                    this.fire("object:removed", {
                        target: t
                    }), t.fire("removed"), delete t.canvas
                },
                clearContext: function(t) {
                    return t.clearRect(0, 0, this.width, this.height), this
                },
                getContext: function() {
                    return this.contextContainer
                },
                clear: function() {
                    return this._objects.length = 0, this.backgroundImage = null, this.overlayImage = null, this.backgroundColor = "", this.overlayColor = "", this._hasITextHandlers && (this.off("mouse:up", this._mouseUpITextHandler), this._iTextInstances = null, this._hasITextHandlers = !1), this.clearContext(this.contextContainer), this.fire("canvas:cleared"), this.renderOnAddRemove && this.requestRenderAll(), this
                },
                renderAll: function() {
                    var t = this.contextContainer;
                    return this.renderCanvas(t, this._objects), this
                },
                renderAndReset: function() {
                    this.isRendering = 0, this.renderAll()
                },
                requestRenderAll: function() {
                    return this.isRendering || (this.isRendering = fabric.util.requestAnimFrame(this.renderAndResetBound)), this
                },
                calcViewportBoundaries: function() {
                    var t = {},
                        e = this.width,
                        i = this.height,
                        r = s(this.viewportTransform);
                    return t.tl = n({
                        x: 0,
                        y: 0
                    }, r), t.br = n({
                        x: e,
                        y: i
                    }, r), t.tr = new fabric.Point(t.br.x, t.tl.y), t.bl = new fabric.Point(t.tl.x, t.br.y), this.vptCoords = t, t
                },
                renderCanvas: function(t, e) {
                    var i = this.viewportTransform;
                    this.isRendering && (fabric.util.cancelAnimFrame(this.isRendering), this.isRendering = 0), this.calcViewportBoundaries(), this.clearContext(t), this.fire("before:render"), this.clipTo && fabric.util.clipContext(this, t), this._renderBackground(t), t.save(), t.transform(i[0], i[1], i[2], i[3], i[4], i[5]), this._renderObjects(t, e), t.restore(), !this.controlsAboveOverlay && this.interactive && this.drawControls(t), this.clipTo && t.restore(), this._renderOverlay(t), this.controlsAboveOverlay && this.interactive && this.drawControls(t), this.fire("after:render")
                },
                _renderObjects: function(t, e) {
                    var i, r;
                    for (i = 0, r = e.length; i < r; ++i) e[i] && e[i].render(t)
                },
                _renderBackgroundOrOverlay: function(t, e) {
                    var i, r = this[e + "Color"];
                    r && (t.fillStyle = r.toLive ? r.toLive(t, this) : r, t.fillRect(r.offsetX || 0, r.offsetY || 0, this.width, this.height)), (r = this[e + "Image"]) && (this[e + "Vpt"] && (i = this.viewportTransform, t.save(), t.transform(i[0], i[1], i[2], i[3], i[4], i[5])), r.render(t), this[e + "Vpt"] && t.restore())
                },
                _renderBackground: function(t) {
                    this._renderBackgroundOrOverlay(t, "background")
                },
                _renderOverlay: function(t) {
                    this._renderBackgroundOrOverlay(t, "overlay")
                },
                getCenter: function() {
                    return {
                        top: this.height / 2,
                        left: this.width / 2
                    }
                },
                centerObjectH: function(t) {
                    return this._centerObject(t, new fabric.Point(this.getCenter().left, t.getCenterPoint().y))
                },
                centerObjectV: function(t) {
                    return this._centerObject(t, new fabric.Point(t.getCenterPoint().x, this.getCenter().top))
                },
                centerObject: function(t) {
                    var e = this.getCenter();
                    return this._centerObject(t, new fabric.Point(e.left, e.top))
                },
                viewportCenterObject: function(t) {
                    var e = this.getVpCenter();
                    return this._centerObject(t, e)
                },
                viewportCenterObjectH: function(t) {
                    var e = this.getVpCenter();
                    return this._centerObject(t, new fabric.Point(e.x, t.getCenterPoint().y)), this
                },
                viewportCenterObjectV: function(t) {
                    var e = this.getVpCenter();
                    return this._centerObject(t, new fabric.Point(t.getCenterPoint().x, e.y))
                },
                getVpCenter: function() {
                    var t = this.getCenter(),
                        e = s(this.viewportTransform);
                    return n({
                        x: t.left,
                        y: t.top
                    }, e)
                },
                _centerObject: function(t, e) {
                    return t.setPositionByOrigin(e, "center", "center"), this.renderOnAddRemove && this.requestRenderAll(), this
                },
                toDatalessJSON: function(t) {
                    return this.toDatalessObject(t)
                },
                toObject: function(t) {
                    return this._toObjectMethod("toObject", t)
                },
                toDatalessObject: function(t) {
                    return this._toObjectMethod("toDatalessObject", t)
                },
                _toObjectMethod: function(e, i) {
                    var r = {
                        version: fabric.version,
                        objects: this._toObjects(e, i)
                    };
                    return t(r, this.__serializeBgOverlay(e, i)), fabric.util.populateWithProperties(this, r, i), r
                },
                _toObjects: function(t, e) {
                    return this.getObjects().filter(function(t) {
                        return !t.excludeFromExport
                    }).map(function(i) {
                        return this._toObject(i, t, e)
                    }, this)
                },
                _toObject: function(t, e, i) {
                    var r;
                    this.includeDefaultValues || (r = t.includeDefaultValues, t.includeDefaultValues = !1);
                    var n = t[e](i);
                    return this.includeDefaultValues || (t.includeDefaultValues = r), n
                },
                __serializeBgOverlay: function(t, e) {
                    var i = {},
                        r = this.backgroundImage,
                        n = this.overlayImage;
                    return this.backgroundColor && (i.background = this.backgroundColor.toObject ? this.backgroundColor.toObject(e) : this.backgroundColor), this.overlayColor && (i.overlay = this.overlayColor.toObject ? this.overlayColor.toObject(e) : this.overlayColor), r && !r.excludeFromExport && (i.backgroundImage = this._toObject(r, t, e)), n && !n.excludeFromExport && (i.overlayImage = this._toObject(n, t, e)), i
                },
                svgViewportTransformation: !0,
                toSVG: function(t, e) {
                    t || (t = {});
                    var i = [];
                    return this._setSVGPreamble(i, t), this._setSVGHeader(i, t), this._setSVGBgOverlayColor(i, "backgroundColor"), this._setSVGBgOverlayImage(i, "backgroundImage", e), this._setSVGObjects(i, e), this._setSVGBgOverlayColor(i, "overlayColor"), this._setSVGBgOverlayImage(i, "overlayImage", e), i.push("</svg>"), i.join("")
                },
                _setSVGPreamble: function(t, e) {
                    e.suppressPreamble || t.push('<?xml version="1.0" encoding="', e.encoding || "UTF-8", '" standalone="no" ?>\n', '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ', '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n')
                },
                _setSVGHeader: function(t, e) {
                    var i, n = e.width || this.width,
                        s = e.height || this.height,
                        o = 'viewBox="0 0 ' + this.width + " " + this.height + '" ',
                        a = fabric.Object.NUM_FRACTION_DIGITS;
                    e.viewBox ? o = 'viewBox="' + e.viewBox.x + " " + e.viewBox.y + " " + e.viewBox.width + " " + e.viewBox.height + '" ' : this.svgViewportTransformation && (i = this.viewportTransform, o = 'viewBox="' + r(-i[4] / i[0], a) + " " + r(-i[5] / i[3], a) + " " + r(this.width / i[0], a) + " " + r(this.height / i[3], a) + '" '), t.push("<svg ", 'xmlns="http://www.w3.org/2000/svg" ', 'xmlns:xlink="http://www.w3.org/1999/xlink" ', 'version="1.1" ', 'width="', n, '" ', 'height="', s, '" ', o, 'xml:space="preserve">\n', "<desc>Created with Fabric.js ", fabric.version, "</desc>\n", "<defs>\n", this.createSVGFontFacesMarkup(), this.createSVGRefElementsMarkup(), "</defs>\n")
                },
                createSVGRefElementsMarkup: function() {
                    var t = this;
                    return ["backgroundColor", "overlayColor"].map(function(e) {
                        var i = t[e];
                        if (i && i.toLive) return i.toSVG(t, !1)
                    }).join("")
                },
                createSVGFontFacesMarkup: function() {
                    var t, e, i, r, n, s, o, a, h = "",
                        c = {},
                        l = fabric.fontPaths,
                        u = this.getObjects();
                    for (o = 0, a = u.length; o < a; o++)
                        if (t = u[o], e = t.fontFamily, -1 !== t.type.indexOf("text") && !c[e] && l[e] && (c[e] = !0, t.styles)) {
                            i = t.styles;
                            for (n in i) {
                                r = i[n];
                                for (s in r)!c[e = r[s].fontFamily] && l[e] && (c[e] = !0)
                            }
                        }
                    for (var f in c) h += ["\t\t@font-face {\n", "\t\t\tfont-family: '", f, "';\n", "\t\t\tsrc: url('", l[f], "');\n", "\t\t}\n"].join("");
                    return h && (h = ['\t<style type="text/css">', "<![CDATA[\n", h, "]]>", "</style>\n"].join("")), h
                },
                _setSVGObjects: function(t, e) {
                    var i, r, n, s = this.getObjects();
                    for (r = 0, n = s.length; r < n; r++)(i = s[r]).excludeFromExport || this._setSVGObject(t, i, e)
                },
                _setSVGObject: function(t, e, i) {
                    t.push(e.toSVG(i))
                },
                _setSVGBgOverlayImage: function(t, e, i) {
                    this[e] && this[e].toSVG && t.push(this[e].toSVG(i))
                },
                _setSVGBgOverlayColor: function(t, e) {
                    var i = this[e];
                    if (i)
                        if (i.toLive) {
                            var r = i.repeat;
                            t.push('<rect transform="translate(', this.width / 2, ",", this.height / 2, ')"', ' x="', i.offsetX - this.width / 2, '" y="', i.offsetY - this.height / 2, '" ', 'width="', "repeat-y" === r || "no-repeat" === r ? i.source.width : this.width, '" height="', "repeat-x" === r || "no-repeat" === r ? i.source.height : this.height, '" fill="url(#SVGID_' + i.id + ')"', "></rect>\n")
                        } else t.push('<rect x="0" y="0" ', 'width="', this.width, '" height="', this.height, '" fill="', this[e], '"', "></rect>\n")
                },
                sendToBack: function(t) {
                    if (!t) return this;
                    var e, r, n, s = this._activeObject;
                    if (t === s && "activeSelection" === t.type)
                        for (e = (n = s._objects).length; e--;) r = n[e], i(this._objects, r), this._objects.unshift(r);
                    else i(this._objects, t), this._objects.unshift(t);
                    return this.renderOnAddRemove && this.requestRenderAll(), this
                },
                bringToFront: function(t) {
                    if (!t) return this;
                    var e, r, n, s = this._activeObject;
                    if (t === s && "activeSelection" === t.type)
                        for (n = s._objects, e = 0; e < n.length; e++) r = n[e], i(this._objects, r), this._objects.push(r);
                    else i(this._objects, t), this._objects.push(t);
                    return this.renderOnAddRemove && this.requestRenderAll(), this
                },
                sendBackwards: function(t, e) {
                    if (!t) return this;
                    var r, n, s, o, a, h = this._activeObject,
                        c = 0;
                    if (t === h && "activeSelection" === t.type)
                        for (a = h._objects, r = 0; r < a.length; r++) n = a[r], (s = this._objects.indexOf(n)) > 0 + c && (o = s - 1, i(this._objects, n), this._objects.splice(o, 0, n)), c++;
                    else 0 !== (s = this._objects.indexOf(t)) && (o = this._findNewLowerIndex(t, s, e), i(this._objects, t), this._objects.splice(o, 0, t));
                    return this.renderOnAddRemove && this.requestRenderAll(), this
                },
                _findNewLowerIndex: function(t, e, i) {
                    var r, n;
                    if (i) {
                        for (r = e, n = e - 1; n >= 0; --n)
                            if (t.intersectsWithObject(this._objects[n]) || t.isContainedWithinObject(this._objects[n]) || this._objects[n].isContainedWithinObject(t)) {
                                r = n;
                                break
                            }
                    } else r = e - 1;
                    return r
                },
                bringForward: function(t, e) {
                    if (!t) return this;
                    var r, n, s, o, a, h = this._activeObject,
                        c = 0;
                    if (t === h && "activeSelection" === t.type)
                        for (r = (a = h._objects).length; r--;) n = a[r], (s = this._objects.indexOf(n)) < this._objects.length - 1 - c && (o = s + 1, i(this._objects, n), this._objects.splice(o, 0, n)), c++;
                    else(s = this._objects.indexOf(t)) !== this._objects.length - 1 && (o = this._findNewUpperIndex(t, s, e), i(this._objects, t), this._objects.splice(o, 0, t));
                    return this.renderOnAddRemove && this.requestRenderAll(), this
                },
                _findNewUpperIndex: function(t, e, i) {
                    var r, n, s;
                    if (i) {
                        for (r = e, n = e + 1, s = this._objects.length; n < s; ++n)
                            if (t.intersectsWithObject(this._objects[n]) || t.isContainedWithinObject(this._objects[n]) || this._objects[n].isContainedWithinObject(t)) {
                                r = n;
                                break
                            }
                    } else r = e + 1;
                    return r
                },
                moveTo: function(t, e) {
                    return i(this._objects, t), this._objects.splice(e, 0, t), this.renderOnAddRemove && this.requestRenderAll()
                },
                dispose: function() {
                    return this._objects.length = 0, this.backgroundImage = null, this.overlayImage = null, this._iTextInstances = null, this.lowerCanvasEl = null, this.cacheCanvasEl = null, this
                },
                toString: function() {
                    return "#<fabric.Canvas (" + this.complexity() + "): { objects: " + this.getObjects().length + " }>"
                }
            }), t(fabric.StaticCanvas.prototype, fabric.Observable), t(fabric.StaticCanvas.prototype, fabric.Collection), t(fabric.StaticCanvas.prototype, fabric.DataURLExporter), t(fabric.StaticCanvas, {
                EMPTY_JSON: '{"objects": [], "background": "white"}',
                supports: function(t) {
                    var e = fabric.util.createCanvasElement();
                    if (!e || !e.getContext) return null;
                    var i = e.getContext("2d");
                    if (!i) return null;
                    switch (t) {
                        case "getImageData":
                            return void 0 !== i.getImageData;
                        case "setLineDash":
                            return void 0 !== i.setLineDash;
                        case "toDataURL":
                            return void 0 !== e.toDataURL;
                        case "toDataURLWithQuality":
                            try {
                                return e.toDataURL("image/jpeg", 0), !0
                            } catch (t) {}
                            return !1;
                        default:
                            return null
                    }
                }
            }), fabric.StaticCanvas.prototype.toJSON = fabric.StaticCanvas.prototype.toObject, fabric.isLikelyNode && (fabric.StaticCanvas.prototype.createPNGStream = function() {
                var t = fabric.jsdomImplForWrapper(this.lowerCanvasEl);
                return t && t.createPNGStream()
            }, fabric.StaticCanvas.prototype.createJPEGStream = function(t) {
                var e = fabric.jsdomImplForWrapper(this.lowerCanvasEl);
                return e && e.createJPEGStream(t)
            })
        }
    }(), fabric.BaseBrush = fabric.util.createClass({
        color: "rgb(0, 0, 0)",
        width: 1,
        shadow: null,
        strokeLineCap: "round",
        strokeLineJoin: "round",
        strokeMiterLimit: 10,
        strokeDashArray: null,
        setShadow: function(t) {
            return this.shadow = new fabric.Shadow(t), this
        },
        _setBrushStyles: function() {
            var t = this.canvas.contextTop;
            t.strokeStyle = this.color, t.lineWidth = this.width, t.lineCap = this.strokeLineCap, t.miterLimit = this.strokeMiterLimit, t.lineJoin = this.strokeLineJoin, this.strokeDashArray && fabric.StaticCanvas.supports("setLineDash") && t.setLineDash(this.strokeDashArray)
        },
        _setShadow: function() {
            if (this.shadow) {
                var t = this.canvas.contextTop,
                    e = this.canvas.getZoom();
                t.shadowColor = this.shadow.color, t.shadowBlur = this.shadow.blur * e, t.shadowOffsetX = this.shadow.offsetX * e, t.shadowOffsetY = this.shadow.offsetY * e
            }
        },
        _resetShadow: function() {
            var t = this.canvas.contextTop;
            t.shadowColor = "", t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0
        }
    }), fabric.PencilBrush = fabric.util.createClass(fabric.BaseBrush, {
        initialize: function(t) {
            this.canvas = t, this._points = []
        },
        onMouseDown: function(t) {
            this._prepareForDrawing(t), this._captureDrawingPath(t), this._render()
        },
        onMouseMove: function(t) {
            this._captureDrawingPath(t), this.canvas.clearContext(this.canvas.contextTop), this._render()
        },
        onMouseUp: function() {
            this._finalizeAndAddPath()
        },
        _prepareForDrawing: function(t) {
            var e = new fabric.Point(t.x, t.y);
            this._reset(), this._addPoint(e), this.canvas.contextTop.moveTo(e.x, e.y)
        },
        _addPoint: function(t) {
            this._points.length > 1 && t.eq(this._points[this._points.length - 1]) || this._points.push(t)
        },
        _reset: function() {
            this._points.length = 0, this._setBrushStyles(), this._setShadow()
        },
        _captureDrawingPath: function(t) {
            var e = new fabric.Point(t.x, t.y);
            this._addPoint(e)
        },
        _render: function() {
            var t, e, i = this.canvas.contextTop,
                r = this.canvas.viewportTransform,
                n = this._points[0],
                s = this._points[1];
            if (i.save(), i.transform(r[0], r[1], r[2], r[3], r[4], r[5]), i.beginPath(), 2 === this._points.length && n.x === s.x && n.y === s.y) {
                var o = this.width / 1e3;
                n = new fabric.Point(n.x, n.y), s = new fabric.Point(s.x, s.y), n.x -= o, s.x += o
            }
            for (i.moveTo(n.x, n.y), t = 1, e = this._points.length; t < e; t++) {
                var a = n.midPointFrom(s);
                i.quadraticCurveTo(n.x, n.y, a.x, a.y), n = this._points[t], s = this._points[t + 1]
            }
            i.lineTo(n.x, n.y), i.stroke(), i.restore()
        },
        convertPointsToSVGPath: function(t) {
            var e, i = [],
                r = this.width / 1e3,
                n = new fabric.Point(t[0].x, t[0].y),
                s = new fabric.Point(t[1].x, t[1].y),
                o = t.length,
                a = 1,
                h = 1,
                c = o > 2;
            for (c && (a = t[2].x < s.x ? -1 : t[2].x === s.x ? 0 : 1, h = t[2].y < s.y ? -1 : t[2].y === s.y ? 0 : 1), i.push("M ", n.x - a * r, " ", n.y - h * r, " "), e = 1; e < o; e++) {
                if (!n.eq(s)) {
                    var l = n.midPointFrom(s);
                    i.push("Q ", n.x, " ", n.y, " ", l.x, " ", l.y, " ")
                }
                n = t[e], e + 1 < t.length && (s = t[e + 1])
            }
            return c && (a = n.x > t[e - 2].x ? 1 : n.x === t[e - 2].x ? 0 : -1, h = n.y > t[e - 2].y ? 1 : n.y === t[e - 2].y ? 0 : -1), i.push("L ", n.x + a * r, " ", n.y + h * r), i
        },
        createPath: function(t) {
            var e = new fabric.Path(t, {
                    fill: null,
                    stroke: this.color,
                    strokeWidth: this.width,
                    strokeLineCap: this.strokeLineCap,
                    strokeMiterLimit: this.strokeMiterLimit,
                    strokeLineJoin: this.strokeLineJoin,
                    strokeDashArray: this.strokeDashArray
                }),
                i = new fabric.Point(e.left + e.width / 2, e.top + e.height / 2);
            return i = e.translateToGivenOrigin(i, "center", "center", e.originX, e.originY), e.top = i.y, e.left = i.x, this.shadow && (this.shadow.affectStroke = !0, e.setShadow(this.shadow)), e
        },
        _finalizeAndAddPath: function() {
            this.canvas.contextTop.closePath();
            var t = this.convertPointsToSVGPath(this._points).join("");
            if ("M 0 0 Q 0 0 0 0 L 0 0" !== t) {
                var e = this.createPath(t);
                this.canvas.clearContext(this.canvas.contextTop), this.canvas.add(e), this.canvas.renderAll(), e.setCoords(), this._resetShadow(), this.canvas.fire("path:created", {
                    path: e
                })
            } else this.canvas.requestRenderAll()
        }
    }), fabric.CircleBrush = fabric.util.createClass(fabric.BaseBrush, {
        width: 10,
        initialize: function(t) {
            this.canvas = t, this.points = []
        },
        drawDot: function(t) {
            var e = this.addPoint(t),
                i = this.canvas.contextTop,
                r = this.canvas.viewportTransform;
            i.save(), i.transform(r[0], r[1], r[2], r[3], r[4], r[5]), i.fillStyle = e.fill, i.beginPath(), i.arc(e.x, e.y, e.radius, 0, 2 * Math.PI, !1), i.closePath(), i.fill(), i.restore()
        },
        onMouseDown: function(t) {
            this.points.length = 0, this.canvas.clearContext(this.canvas.contextTop), this._setShadow(), this.drawDot(t)
        },
        onMouseMove: function(t) {
            this.drawDot(t)
        },
        onMouseUp: function() {
            var t, e, i = this.canvas.renderOnAddRemove;
            this.canvas.renderOnAddRemove = !1;
            var r = [];
            for (t = 0, e = this.points.length; t < e; t++) {
                var n = this.points[t],
                    s = new fabric.Circle({
                        radius: n.radius,
                        left: n.x,
                        top: n.y,
                        originX: "center",
                        originY: "center",
                        fill: n.fill
                    });
                this.shadow && s.setShadow(this.shadow), r.push(s)
            }
            var o = new fabric.Group(r, {
                originX: "center",
                originY: "center"
            });
            o.canvas = this.canvas, this.canvas.add(o), this.canvas.fire("path:created", {
                path: o
            }), this.canvas.clearContext(this.canvas.contextTop), this._resetShadow(), this.canvas.renderOnAddRemove = i, this.canvas.requestRenderAll()
        },
        addPoint: function(t) {
            var e = new fabric.Point(t.x, t.y),
                i = fabric.util.getRandomInt(Math.max(0, this.width - 20), this.width + 20) / 2,
                r = new fabric.Color(this.color).setAlpha(fabric.util.getRandomInt(0, 100) / 100).toRgba();
            return e.radius = i, e.fill = r, this.points.push(e), e
        }
    }), fabric.SprayBrush = fabric.util.createClass(fabric.BaseBrush, {
        width: 10,
        density: 20,
        dotWidth: 1,
        dotWidthVariance: 1,
        randomOpacity: !1,
        optimizeOverlapping: !0,
        initialize: function(t) {
            this.canvas = t, this.sprayChunks = []
        },
        onMouseDown: function(t) {
            this.sprayChunks.length = 0, this.canvas.clearContext(this.canvas.contextTop), this._setShadow(), this.addSprayChunk(t), this.render()
        },
        onMouseMove: function(t) {
            this.addSprayChunk(t), this.render()
        },
        onMouseUp: function() {
            var t = this.canvas.renderOnAddRemove;
            this.canvas.renderOnAddRemove = !1;
            for (var e = [], i = 0, r = this.sprayChunks.length; i < r; i++)
                for (var n = this.sprayChunks[i], s = 0, o = n.length; s < o; s++) {
                    var a = new fabric.Rect({
                        width: n[s].width,
                        height: n[s].width,
                        left: n[s].x + 1,
                        top: n[s].y + 1,
                        originX: "center",
                        originY: "center",
                        fill: this.color
                    });
                    this.shadow && a.setShadow(this.shadow), e.push(a)
                }
            this.optimizeOverlapping && (e = this._getOptimizedRects(e));
            var h = new fabric.Group(e, {
                originX: "center",
                originY: "center"
            });
            h.canvas = this.canvas, this.canvas.add(h), this.canvas.fire("path:created", {
                path: h
            }), this.canvas.clearContext(this.canvas.contextTop), this._resetShadow(), this.canvas.renderOnAddRemove = t, this.canvas.requestRenderAll()
        },
        _getOptimizedRects: function(t) {
            var e, i, r, n = {};
            for (i = 0, r = t.length; i < r; i++) n[e = t[i].left + "" + t[i].top] || (n[e] = t[i]);
            var s = [];
            for (e in n) s.push(n[e]);
            return s
        },
        render: function() {
            var t = this.canvas.contextTop;
            t.fillStyle = this.color;
            var e, i, r = this.canvas.viewportTransform;
            for (t.save(), t.transform(r[0], r[1], r[2], r[3], r[4], r[5]), e = 0, i = this.sprayChunkPoints.length; e < i; e++) {
                var n = this.sprayChunkPoints[e];
                void 0 !== n.opacity && (t.globalAlpha = n.opacity), t.fillRect(n.x, n.y, n.width, n.width)
            }
            t.restore()
        },
        addSprayChunk: function(t) {
            this.sprayChunkPoints = [];
            var e, i, r, n, s = this.width / 2;
            for (n = 0; n < this.density; n++) {
                e = fabric.util.getRandomInt(t.x - s, t.x + s), i = fabric.util.getRandomInt(t.y - s, t.y + s), r = this.dotWidthVariance ? fabric.util.getRandomInt(Math.max(1, this.dotWidth - this.dotWidthVariance), this.dotWidth + this.dotWidthVariance) : this.dotWidth;
                var o = new fabric.Point(e, i);
                o.width = r, this.randomOpacity && (o.opacity = fabric.util.getRandomInt(0, 100) / 100), this.sprayChunkPoints.push(o)
            }
            this.sprayChunks.push(this.sprayChunkPoints)
        }
    }), fabric.PatternBrush = fabric.util.createClass(fabric.PencilBrush, {
        getPatternSrc: function() {
            var t = fabric.document.createElement("canvas"),
                e = t.getContext("2d");
            return t.width = t.height = 25, e.fillStyle = this.color, e.beginPath(), e.arc(10, 10, 10, 0, 2 * Math.PI, !1), e.closePath(), e.fill(), t
        },
        getPatternSrcFunction: function() {
            return String(this.getPatternSrc).replace("this.color", '"' + this.color + '"')
        },
        getPattern: function() {
            return this.canvas.contextTop.createPattern(this.source || this.getPatternSrc(), "repeat")
        },
        _setBrushStyles: function() {
            this.callSuper("_setBrushStyles"), this.canvas.contextTop.strokeStyle = this.getPattern()
        },
        createPath: function(t) {
            var e = this.callSuper("createPath", t),
                i = e._getLeftTopCoords().scalarAdd(e.strokeWidth / 2);
            return e.stroke = new fabric.Pattern({
                source: this.source || this.getPatternSrcFunction(),
                offsetX: -i.x,
                offsetY: -i.y
            }), e
        }
    }),
    function() {
        var t = fabric.util.getPointer,
            e = fabric.util.degreesToRadians,
            i = fabric.util.radiansToDegrees,
            r = Math.atan2,
            n = Math.abs,
            s = fabric.StaticCanvas.supports("setLineDash");
        fabric.Canvas = fabric.util.createClass(fabric.StaticCanvas, {
            initialize: function(t, e) {
                e || (e = {}), this.renderAndResetBound = this.renderAndReset.bind(this), this._initStatic(t, e), this._initInteractive(), this._createCacheCanvas()
            },
            uniScaleTransform: !1,
            uniScaleKey: "shiftKey",
            centeredScaling: !1,
            centeredRotation: !1,
            centeredKey: "altKey",
            altActionKey: "shiftKey",
            interactive: !0,
            selection: !0,
            selectionKey: "shiftKey",
            altSelectionKey: null,
            selectionColor: "rgba(100, 100, 255, 0.3)",
            selectionDashArray: [],
            selectionBorderColor: "rgba(255, 255, 255, 0.3)",
            selectionLineWidth: 1,
            hoverCursor: "move",
            moveCursor: "move",
            defaultCursor: "default",
            freeDrawingCursor: "crosshair",
            rotationCursor: "crosshair",
            notAllowedCursor: "not-allowed",
            containerClass: "canvas-container",
            perPixelTargetFind: !1,
            targetFindTolerance: 0,
            skipTargetFind: !1,
            isDrawingMode: !1,
            preserveObjectStacking: !1,
            snapAngle: 0,
            snapThreshold: null,
            stopContextMenu: !1,
            fireRightClick: !1,
            fireMiddleClick: !1,
            _initInteractive: function() {
                this._currentTransform = null, this._groupSelector = null, this._initWrapperElement(), this._createUpperCanvas(), this._initEventListeners(), this._initRetinaScaling(), this.freeDrawingBrush = fabric.PencilBrush && new fabric.PencilBrush(this), this.calcOffset()
            },
            _chooseObjectsToRender: function() {
                var t, e, i, r = this.getActiveObjects();
                if (r.length > 0 && !this.preserveObjectStacking) {
                    e = [], i = [];
                    for (var n = 0, s = this._objects.length; n < s; n++) t = this._objects[n], -1 === r.indexOf(t) ? e.push(t) : i.push(t);
                    r.length > 1 && (this._activeObject._objects = i), e.push.apply(e, i)
                } else e = this._objects;
                return e
            },
            renderAll: function() {
                !this.contextTopDirty || this._groupSelector || this.isDrawingMode || (this.clearContext(this.contextTop), this.contextTopDirty = !1);
                var t = this.contextContainer;
                return this.renderCanvas(t, this._chooseObjectsToRender()), this
            },
            renderTop: function() {
                var t = this.contextTop;
                return this.clearContext(t), this.selection && this._groupSelector && this._drawSelection(t), this.fire("after:render"), this.contextTopDirty = !0, this
            },
            _resetCurrentTransform: function() {
                var t = this._currentTransform;
                t.target.set({
                    scaleX: t.original.scaleX,
                    scaleY: t.original.scaleY,
                    skewX: t.original.skewX,
                    skewY: t.original.skewY,
                    left: t.original.left,
                    top: t.original.top
                }), this._shouldCenterTransform(t.target) ? "rotate" === t.action ? this._setOriginToCenter(t.target) : ("center" !== t.originX && ("right" === t.originX ? t.mouseXSign = -1 : t.mouseXSign = 1), "center" !== t.originY && ("bottom" === t.originY ? t.mouseYSign = -1 : t.mouseYSign = 1), t.originX = "center", t.originY = "center") : (t.originX = t.original.originX, t.originY = t.original.originY)
            },
            containsPoint: function(t, e, i) {
                var r, n = i || this.getPointer(t, !0);
                return r = e.group && e.group === this._activeObject && "activeSelection" === e.group.type ? this._normalizePointer(e.group, n) : {
                    x: n.x,
                    y: n.y
                }, e.containsPoint(r) || e._findTargetCorner(n)
            },
            _normalizePointer: function(t, e) {
                var i = t.calcTransformMatrix(),
                    r = fabric.util.invertTransform(i),
                    n = this.restorePointerVpt(e);
                return fabric.util.transformPoint(n, r)
            },
            isTargetTransparent: function(t, e, i) {
                var r = this.contextCache,
                    n = t.selectionBackgroundColor,
                    s = this.viewportTransform;
                return t.selectionBackgroundColor = "", this.clearContext(r), r.save(), r.transform(s[0], s[1], s[2], s[3], s[4], s[5]), t.render(r), r.restore(), t === this._activeObject && t._renderControls(r, {
                    hasBorders: !1,
                    transparentCorners: !1
                }, {
                    hasBorders: !1
                }), t.selectionBackgroundColor = n, fabric.util.isTransparent(r, e, i, this.targetFindTolerance)
            },
            _isSelectionKeyPressed: function(t) {
                return "[object Array]" === Object.prototype.toString.call(this.selectionKey) ? !!this.selectionKey.find(function(e) {
                    return !0 === t[e]
                }) : t[this.selectionKey]
            },
            _shouldClearSelection: function(t, e) {
                var i = this.getActiveObjects(),
                    r = this._activeObject;
                return !e || e && r && i.length > 1 && -1 === i.indexOf(e) && r !== e && !this._isSelectionKeyPressed(t) || e && !e.evented || e && !e.selectable && r && r !== e
            },
            _shouldCenterTransform: function(t) {
                if (t) {
                    var e, i = this._currentTransform;
                    return "scale" === i.action || "scaleX" === i.action || "scaleY" === i.action ? e = this.centeredScaling || t.centeredScaling : "rotate" === i.action && (e = this.centeredRotation || t.centeredRotation), e ? !i.altKey : i.altKey
                }
            },
            _getOriginFromCorner: function(t, e) {
                var i = {
                    x: t.originX,
                    y: t.originY
                };
                return "ml" === e || "tl" === e || "bl" === e ? i.x = "right" : "mr" !== e && "tr" !== e && "br" !== e || (i.x = "left"), "tl" === e || "mt" === e || "tr" === e ? i.y = "bottom" : "bl" !== e && "mb" !== e && "br" !== e || (i.y = "top"), i
            },
            _getActionFromCorner: function(t, e, i) {
                if (!e) return "drag";
                switch (e) {
                    case "mtr":
                        return "rotate";
                    case "ml":
                    case "mr":
                        return i[this.altActionKey] ? "skewY" : "scaleX";
                    case "mt":
                    case "mb":
                        return i[this.altActionKey] ? "skewX" : "scaleY";
                    default:
                        return "scale"
                }
            },
            _setupCurrentTransform: function(t, i) {
                if (i) {
                    var r = this.getPointer(t),
                        n = i._findTargetCorner(this.getPointer(t, !0)),
                        s = this._getActionFromCorner(i, n, t),
                        o = this._getOriginFromCorner(i, n);
                    this._currentTransform = {
                        target: i,
                        action: s,
                        corner: n,
                        scaleX: i.scaleX,
                        scaleY: i.scaleY,
                        skewX: i.skewX,
                        skewY: i.skewY,
                        offsetX: r.x - i.left,
                        offsetY: r.y - i.top,
                        originX: o.x,
                        originY: o.y,
                        ex: r.x,
                        ey: r.y,
                        lastX: r.x,
                        lastY: r.y,
                        left: i.left,
                        top: i.top,
                        theta: e(i.angle),
                        width: i.width * i.scaleX,
                        mouseXSign: 1,
                        mouseYSign: 1,
                        shiftKey: t.shiftKey,
                        altKey: t[this.centeredKey]
                    }, this._currentTransform.original = {
                        left: i.left,
                        top: i.top,
                        scaleX: i.scaleX,
                        scaleY: i.scaleY,
                        skewX: i.skewX,
                        skewY: i.skewY,
                        originX: o.x,
                        originY: o.y
                    }, this._resetCurrentTransform()
                }
            },
            _translateObject: function(t, e) {
                var i = this._currentTransform,
                    r = i.target,
                    n = t - i.offsetX,
                    s = e - i.offsetY,
                    o = !r.get("lockMovementX") && r.left !== n,
                    a = !r.get("lockMovementY") && r.top !== s;
                return o && r.set("left", n), a && r.set("top", s), o || a
            },
            _changeSkewTransformOrigin: function(t, e, i) {
                var r = "originX",
                    n = {
                        0: "center"
                    },
                    s = e.target.skewX,
                    o = "left",
                    a = "right",
                    h = "mt" === e.corner || "ml" === e.corner ? 1 : -1,
                    c = 1;
                t = t > 0 ? 1 : -1, "y" === i && (s = e.target.skewY, o = "top", a = "bottom", r = "originY"), n[-1] = o, n[1] = a, e.target.flipX && (c *= -1), e.target.flipY && (c *= -1), 0 === s ? (e.skewSign = -h * t * c, e[r] = n[-t]) : (s = s > 0 ? 1 : -1, e.skewSign = s, e[r] = n[s * h * c])
            },
            _skewObject: function(t, e, i) {
                var r = this._currentTransform,
                    n = r.target,
                    s = !1,
                    o = n.get("lockSkewingX"),
                    a = n.get("lockSkewingY");
                if (o && "x" === i || a && "y" === i) return !1;
                var h, c, l = n.getCenterPoint(),
                    u = n.toLocalPoint(new fabric.Point(t, e), "center", "center")[i],
                    f = n.toLocalPoint(new fabric.Point(r.lastX, r.lastY), "center", "center")[i],
                    d = n._getTransformedDimensions();
                return this._changeSkewTransformOrigin(u - f, r, i), h = n.toLocalPoint(new fabric.Point(t, e), r.originX, r.originY)[i], c = n.translateToOriginPoint(l, r.originX, r.originY), s = this._setObjectSkew(h, r, i, d), r.lastX = t, r.lastY = e, n.setPositionByOrigin(c, r.originX, r.originY), s
            },
            _setObjectSkew: function(t, e, i, r) {
                var n, s, o, a, h, c, l, u, f, d = e.target,
                    g = !1,
                    p = e.skewSign;
                return "x" === i ? (a = "y", h = "Y", c = "X", u = 0, f = d.skewY) : (a = "x", h = "X", c = "Y", u = d.skewX, f = 0), o = d._getTransformedDimensions(u, f), (l = 2 * Math.abs(t) - o[i]) <= 2 ? n = 0 : (n = p * Math.atan(l / d["scale" + c] / (o[a] / d["scale" + h])), n = fabric.util.radiansToDegrees(n)), g = d["skew" + c] !== n, d.set("skew" + c, n), 0 !== d["skew" + h] && (s = d._getTransformedDimensions(), n = r[a] / s[a] * d["scale" + h], d.set("scale" + h, n)), g
            },
            _scaleObject: function(t, e, i) {
                var r = this._currentTransform,
                    n = r.target,
                    s = n.get("lockScalingX"),
                    o = n.get("lockScalingY"),
                    a = n.get("lockScalingFlip");
                if (s && o) return !1;
                var h = n.translateToOriginPoint(n.getCenterPoint(), r.originX, r.originY),
                    c = n.toLocalPoint(new fabric.Point(t, e), r.originX, r.originY),
                    l = n._getTransformedDimensions(),
                    u = !1;
                return this._setLocalMouse(c, r), u = this._setObjectScale(c, r, s, o, i, a, l), n.setPositionByOrigin(h, r.originX, r.originY), u
            },
            _setObjectScale: function(t, e, i, r, n, s, o) {
                var a, h, c, l, u = e.target,
                    f = !1,
                    d = !1,
                    g = !1;
                return c = t.x * u.scaleX / o.x, l = t.y * u.scaleY / o.y, a = u.scaleX !== c, h = u.scaleY !== l, s && c <= 0 && c < u.scaleX && (f = !0, t.x = 0), s && l <= 0 && l < u.scaleY && (d = !0, t.y = 0), "equally" !== n || i || r ? n ? "x" !== n || u.get("lockUniScaling") ? "y" !== n || u.get("lockUniScaling") || d || r || u.set("scaleY", l) && (g = g || h) : f || i || u.set("scaleX", c) && (g = g || a) : (f || i || u.set("scaleX", c) && (g = g || a), d || r || u.set("scaleY", l) && (g = g || h)) : g = this._scaleObjectEqually(t, u, e, o), e.newScaleX = c, e.newScaleY = l, f || d || this._flipObject(e, n), g
            },
            _scaleObjectEqually: function(t, e, i, r) {
                var n, s = t.y + t.x,
                    o = r.y * i.original.scaleY / e.scaleY + r.x * i.original.scaleX / e.scaleX,
                    a = t.x < 0 ? -1 : 1,
                    h = t.y < 0 ? -1 : 1;
                return i.newScaleX = a * Math.abs(i.original.scaleX * s / o), i.newScaleY = h * Math.abs(i.original.scaleY * s / o), n = i.newScaleX !== e.scaleX || i.newScaleY !== e.scaleY, e.set("scaleX", i.newScaleX), e.set("scaleY", i.newScaleY), n
            },
            _flipObject: function(t, e) {
                t.newScaleX < 0 && "y" !== e && ("left" === t.originX ? t.originX = "right" : "right" === t.originX && (t.originX = "left")), t.newScaleY < 0 && "x" !== e && ("top" === t.originY ? t.originY = "bottom" : "bottom" === t.originY && (t.originY = "top"))
            },
            _setLocalMouse: function(t, e) {
                var i = e.target,
                    r = this.getZoom(),
                    s = i.padding / r;
                "right" === e.originX ? t.x *= -1 : "center" === e.originX && (t.x *= 2 * e.mouseXSign, t.x < 0 && (e.mouseXSign = -e.mouseXSign)), "bottom" === e.originY ? t.y *= -1 : "center" === e.originY && (t.y *= 2 * e.mouseYSign, t.y < 0 && (e.mouseYSign = -e.mouseYSign)), n(t.x) > s ? t.x < 0 ? t.x += s : t.x -= s : t.x = 0, n(t.y) > s ? t.y < 0 ? t.y += s : t.y -= s : t.y = 0
            },
            _rotateObject: function(t, e) {
                var n = this._currentTransform;
                if (n.target.get("lockRotation")) return !1;
                var s = r(n.ey - n.top, n.ex - n.left),
                    o = r(e - n.top, t - n.left),
                    a = i(o - s + n.theta),
                    h = !0;
                if (n.target.snapAngle > 0) {
                    var c = n.target.snapAngle,
                        l = n.target.snapThreshold || c,
                        u = Math.ceil(a / c) * c,
                        f = Math.floor(a / c) * c;
                    Math.abs(a - f) < l ? a = f : Math.abs(a - u) < l && (a = u)
                }
                return a < 0 && (a = 360 + a), a %= 360, n.target.angle === a ? h = !1 : n.target.angle = a, h
            },
            setCursor: function(t) {
                this.upperCanvasEl.style.cursor = t
            },
            _resetObjectTransform: function(t) {
                t.scaleX = 1, t.scaleY = 1, t.skewX = 0, t.skewY = 0, t.rotate(0)
            },
            _drawSelection: function(t) {
                var e = this._groupSelector,
                    i = e.left,
                    r = e.top,
                    o = n(i),
                    a = n(r);
                if (this.selectionColor && (t.fillStyle = this.selectionColor, t.fillRect(e.ex - (i > 0 ? 0 : -i), e.ey - (r > 0 ? 0 : -r), o, a)), this.selectionLineWidth && this.selectionBorderColor)
                    if (t.lineWidth = this.selectionLineWidth, t.strokeStyle = this.selectionBorderColor, this.selectionDashArray.length > 1 && !s) {
                        var h = e.ex + .5 - (i > 0 ? 0 : o),
                            c = e.ey + .5 - (r > 0 ? 0 : a);
                        t.beginPath(), fabric.util.drawDashedLine(t, h, c, h + o, c, this.selectionDashArray), fabric.util.drawDashedLine(t, h, c + a - 1, h + o, c + a - 1, this.selectionDashArray), fabric.util.drawDashedLine(t, h, c, h, c + a, this.selectionDashArray), fabric.util.drawDashedLine(t, h + o - 1, c, h + o - 1, c + a, this.selectionDashArray), t.closePath(), t.stroke()
                    } else fabric.Object.prototype._setLineDash.call(this, t, this.selectionDashArray), t.strokeRect(e.ex + .5 - (i > 0 ? 0 : o), e.ey + .5 - (r > 0 ? 0 : a), o, a)
            },
            findTarget: function(t, e) {
                if (!this.skipTargetFind) {
                    var i, r, n = this.getPointer(t, !0),
                        s = this._activeObject,
                        o = this.getActiveObjects();
                    if (this.targets = [], o.length > 1 && !e && s === this._searchPossibleTargets([s], n)) return s;
                    if (1 === o.length && s._findTargetCorner(n)) return s;
                    if (1 === o.length && s === this._searchPossibleTargets([s], n)) {
                        if (!this.preserveObjectStacking) return s;
                        i = s, r = this.targets, this.targets = []
                    }
                    var a = this._searchPossibleTargets(this._objects, n);
                    return t[this.altSelectionKey] && a && i && a !== i && (a = i, this.targets = r), a
                }
            },
            _checkTarget: function(t, e) {
                if (e && e.visible && e.evented && this.containsPoint(null, e, t)) {
                    if (!this.perPixelTargetFind && !e.perPixelTargetFind || e.isEditing) return !0;
                    if (!this.isTargetTransparent(e, t.x, t.y)) return !0
                }
            },
            _searchPossibleTargets: function(t, e) {
                for (var i, r, n, s = t.length; s--;)
                    if (this._checkTarget(e, t[s])) {
                        "group" === (i = t[s]).type && i.subTargetCheck && (r = this._normalizePointer(i, e), (n = this._searchPossibleTargets(i._objects, r)) && this.targets.push(n));
                        break
                    }
                return i
            },
            restorePointerVpt: function(t) {
                return fabric.util.transformPoint(t, fabric.util.invertTransform(this.viewportTransform))
            },
            getPointer: function(e, i, r) {
                r || (r = this.upperCanvasEl);
                var n, s = t(e),
                    o = r.getBoundingClientRect(),
                    a = o.width || 0,
                    h = o.height || 0;
                return a && h || ("top" in o && "bottom" in o && (h = Math.abs(o.top - o.bottom)), "right" in o && "left" in o && (a = Math.abs(o.right - o.left))), this.calcOffset(), s.x = s.x - this._offset.left, s.y = s.y - this._offset.top, i || (s = this.restorePointerVpt(s)), n = 0 === a || 0 === h ? {
                    width: 1,
                    height: 1
                } : {
                    width: r.width / a,
                    height: r.height / h
                }, {
                    x: s.x * n.width,
                    y: s.y * n.height
                }
            },
            _createUpperCanvas: function() {
                var t = this.lowerCanvasEl.className.replace(/\s*lower-canvas\s*/, "");
                this.upperCanvasEl ? this.upperCanvasEl.className = "" : this.upperCanvasEl = this._createCanvasElement(), fabric.util.addClass(this.upperCanvasEl, "upper-canvas " + t), this.wrapperEl.appendChild(this.upperCanvasEl), this._copyCanvasStyle(this.lowerCanvasEl, this.upperCanvasEl), this._applyCanvasStyle(this.upperCanvasEl), this.contextTop = this.upperCanvasEl.getContext("2d")
            },
            _createCacheCanvas: function() {
                this.cacheCanvasEl = this._createCanvasElement(), this.cacheCanvasEl.setAttribute("width", this.width), this.cacheCanvasEl.setAttribute("height", this.height), this.contextCache = this.cacheCanvasEl.getContext("2d")
            },
            _initWrapperElement: function() {
                this.wrapperEl = fabric.util.wrapElement(this.lowerCanvasEl, "div", {
                    class: this.containerClass
                }), fabric.util.setStyle(this.wrapperEl, {
                    width: this.width + "px",
                    height: this.height + "px",
                    position: "relative"
                }), fabric.util.makeElementUnselectable(this.wrapperEl)
            },
            _applyCanvasStyle: function(t) {
                var e = this.width || t.width,
                    i = this.height || t.height;
                fabric.util.setStyle(t, {
                    position: "absolute",
                    width: e + "px",
                    height: i + "px",
                    left: 0,
                    top: 0,
                    "touch-action": "none"
                }), t.width = e, t.height = i, fabric.util.makeElementUnselectable(t)
            },
            _copyCanvasStyle: function(t, e) {
                e.style.cssText = t.style.cssText
            },
            getSelectionContext: function() {
                return this.contextTop
            },
            getSelectionElement: function() {
                return this.upperCanvasEl
            },
            getActiveObject: function() {
                return this._activeObject
            },
            getActiveObjects: function() {
                var t = this._activeObject;
                return t ? "activeSelection" === t.type && t._objects ? t._objects.slice(0) : [t] : []
            },
            _onObjectRemoved: function(t) {
                t === this._activeObject && (this.fire("before:selection:cleared", {
                    target: t
                }), this._discardActiveObject(), this.fire("selection:cleared", {
                    target: t
                }), t.fire("deselected")), this._hoveredTarget === t && (this._hoveredTarget = null), this.callSuper("_onObjectRemoved", t)
            },
            _fireSelectionEvents: function(t, e) {
                var i = !1,
                    r = this.getActiveObjects(),
                    n = [],
                    s = [],
                    o = {
                        e: e
                    };
                t.forEach(function(t) {
                    -1 === r.indexOf(t) && (i = !0, t.fire("deselected", o), s.push(t))
                }), r.forEach(function(e) {
                    -1 === t.indexOf(e) && (i = !0, e.fire("selected", o), n.push(e))
                }), t.length > 0 && r.length > 0 ? (o.selected = n, o.deselected = s, o.updated = n[0] || s[0], o.target = this._activeObject, i && this.fire("selection:updated", o)) : r.length > 0 ? (1 === r.length && (o.target = n[0], this.fire("object:selected", o)), o.selected = n, o.target = this._activeObject, this.fire("selection:created", o)) : t.length > 0 && (o.deselected = s, this.fire("selection:cleared", o))
            },
            setActiveObject: function(t, e) {
                var i = this.getActiveObjects();
                return this._setActiveObject(t, e), this._fireSelectionEvents(i, e), this
            },
            _setActiveObject: function(t, e) {
                return this._activeObject !== t && (!!this._discardActiveObject(e, t) && (!t.onSelect({
                    e: e
                }) && (this._activeObject = t, !0)))
            },
            _discardActiveObject: function(t, e) {
                var i = this._activeObject;
                if (i) {
                    if (i.onDeselect({
                        e: t,
                        object: e
                    })) return !1;
                    this._activeObject = null
                }
                return !0
            },
            discardActiveObject: function(t) {
                var e = this.getActiveObjects();
                return e.length && this.fire("before:selection:cleared", {
                    target: e[0],
                    e: t
                }), this._discardActiveObject(t), this._fireSelectionEvents(e, t), this
            },
            dispose: function() {
                var t = this.wrapperEl;
                return this.removeListeners(), t.removeChild(this.upperCanvasEl), t.removeChild(this.lowerCanvasEl), delete this.upperCanvasEl, t.parentNode && t.parentNode.replaceChild(this.lowerCanvasEl, this.wrapperEl), delete this.wrapperEl, fabric.StaticCanvas.prototype.dispose.call(this), this
            },
            clear: function() {
                return this.discardActiveObject(), this.clearContext(this.contextTop), this.callSuper("clear")
            },
            drawControls: function(t) {
                var e = this._activeObject;
                e && e._renderControls(t)
            },
            _toObject: function(t, e, i) {
                var r = this._realizeGroupTransformOnObject(t),
                    n = this.callSuper("_toObject", t, e, i);
                return this._unwindGroupTransformOnObject(t, r), n
            },
            _realizeGroupTransformOnObject: function(t) {
                if (t.group && "activeSelection" === t.group.type && this._activeObject === t.group) {
                    var e = {};
                    return ["angle", "flipX", "flipY", "left", "scaleX", "scaleY", "skewX", "skewY", "top"].forEach(function(i) {
                        e[i] = t[i]
                    }), this._activeObject.realizeTransform(t), e
                }
                return null
            },
            _unwindGroupTransformOnObject: function(t, e) {
                e && t.set(e)
            },
            _setSVGObject: function(t, e, i) {
                var r = this._realizeGroupTransformOnObject(e);
                this.callSuper("_setSVGObject", t, e, i), this._unwindGroupTransformOnObject(e, r)
            }
        });
        for (var o in fabric.StaticCanvas) "prototype" !== o && (fabric.Canvas[o] = fabric.StaticCanvas[o]);
        fabric.isTouchSupported && (fabric.Canvas.prototype._setCursorFromEvent = function() {})
    }(),
    function() {
        function t(t, e) {
            return "which" in t ? t.which === e : t.button === e - 1
        }
        var e = {
                mt: 0,
                tr: 1,
                mr: 2,
                br: 3,
                mb: 4,
                bl: 5,
                ml: 6,
                tl: 7
            },
            i = fabric.util.addListener,
            r = fabric.util.removeListener;
        fabric.util.object.extend(fabric.Canvas.prototype, {
            cursorMap: ["n-resize", "ne-resize", "e-resize", "se-resize", "s-resize", "sw-resize", "w-resize", "nw-resize"],
            _initEventListeners: function() {
                this.removeListeners(), this._bindEvents(), i(fabric.window, "resize", this._onResize), i(this.upperCanvasEl, "mousedown", this._onMouseDown), i(this.upperCanvasEl, "dblclick", this._onDoubleClick), i(this.upperCanvasEl, "mousemove", this._onMouseMove), i(this.upperCanvasEl, "mouseout", this._onMouseOut), i(this.upperCanvasEl, "mouseenter", this._onMouseEnter), i(this.upperCanvasEl, "wheel", this._onMouseWheel), i(this.upperCanvasEl, "contextmenu", this._onContextMenu), i(this.upperCanvasEl, "touchstart", this._onMouseDown, {
                    passive: !1
                }), i(this.upperCanvasEl, "touchmove", this._onMouseMove, {
                    passive: !1
                }), "undefined" != typeof eventjs && "add" in eventjs && (eventjs.add(this.upperCanvasEl, "gesture", this._onGesture), eventjs.add(this.upperCanvasEl, "drag", this._onDrag), eventjs.add(this.upperCanvasEl, "orientation", this._onOrientationChange), eventjs.add(this.upperCanvasEl, "shake", this._onShake), eventjs.add(this.upperCanvasEl, "longpress", this._onLongPress))
            },
            _bindEvents: function() {
                this.eventsBinded || (this._onMouseDown = this._onMouseDown.bind(this), this._onMouseMove = this._onMouseMove.bind(this), this._onMouseUp = this._onMouseUp.bind(this), this._onResize = this._onResize.bind(this), this._onGesture = this._onGesture.bind(this), this._onDrag = this._onDrag.bind(this), this._onShake = this._onShake.bind(this), this._onLongPress = this._onLongPress.bind(this), this._onOrientationChange = this._onOrientationChange.bind(this), this._onMouseWheel = this._onMouseWheel.bind(this), this._onMouseOut = this._onMouseOut.bind(this), this._onMouseEnter = this._onMouseEnter.bind(this), this._onContextMenu = this._onContextMenu.bind(this), this._onDoubleClick = this._onDoubleClick.bind(this), this.eventsBinded = !0)
            },
            removeListeners: function() {
                r(fabric.window, "resize", this._onResize), r(this.upperCanvasEl, "mousedown", this._onMouseDown), r(this.upperCanvasEl, "mousemove", this._onMouseMove), r(this.upperCanvasEl, "mouseout", this._onMouseOut), r(this.upperCanvasEl, "mouseenter", this._onMouseEnter), r(this.upperCanvasEl, "wheel", this._onMouseWheel), r(this.upperCanvasEl, "contextmenu", this._onContextMenu), r(this.upperCanvasEl, "doubleclick", this._onDoubleClick), r(this.upperCanvasEl, "touchstart", this._onMouseDown), r(this.upperCanvasEl, "touchmove", this._onMouseMove), "undefined" != typeof eventjs && "remove" in eventjs && (eventjs.remove(this.upperCanvasEl, "gesture", this._onGesture), eventjs.remove(this.upperCanvasEl, "drag", this._onDrag), eventjs.remove(this.upperCanvasEl, "orientation", this._onOrientationChange), eventjs.remove(this.upperCanvasEl, "shake", this._onShake), eventjs.remove(this.upperCanvasEl, "longpress", this._onLongPress))
            },
            _onGesture: function(t, e) {
                this.__onTransformGesture && this.__onTransformGesture(t, e)
            },
            _onDrag: function(t, e) {
                this.__onDrag && this.__onDrag(t, e)
            },
            _onMouseWheel: function(t) {
                this.__onMouseWheel(t)
            },
            _onMouseOut: function(t) {
                var e = this._hoveredTarget;
                this.fire("mouse:out", {
                    target: e,
                    e: t
                }), this._hoveredTarget = null, e && e.fire("mouseout", {
                    e: t
                }), this._iTextInstances && this._iTextInstances.forEach(function(t) {
                    t.isEditing && t.hiddenTextarea.focus()
                })
            },
            _onMouseEnter: function(t) {
                this.findTarget(t) || (this.fire("mouse:over", {
                    target: null,
                    e: t
                }), this._hoveredTarget = null)
            },
            _onOrientationChange: function(t, e) {
                this.__onOrientationChange && this.__onOrientationChange(t, e)
            },
            _onShake: function(t, e) {
                this.__onShake && this.__onShake(t, e)
            },
            _onLongPress: function(t, e) {
                this.__onLongPress && this.__onLongPress(t, e)
            },
            _onContextMenu: function(t) {
                return this.stopContextMenu && (t.stopPropagation(), t.preventDefault()), !1
            },
            _onDoubleClick: function(t) {
                this._handleEvent(t, "dblclick", void 0)
            },
            _onMouseDown: function(t) {
                this.__onMouseDown(t), i(fabric.document, "touchend", this._onMouseUp, {
                    passive: !1
                }), i(fabric.document, "touchmove", this._onMouseMove, {
                    passive: !1
                }), r(this.upperCanvasEl, "mousemove", this._onMouseMove), r(this.upperCanvasEl, "touchmove", this._onMouseMove), "touchstart" === t.type ? r(this.upperCanvasEl, "mousedown", this._onMouseDown) : (i(fabric.document, "mouseup", this._onMouseUp), i(fabric.document, "mousemove", this._onMouseMove))
            },
            _onMouseUp: function(t) {
                if (this.__onMouseUp(t), r(fabric.document, "mouseup", this._onMouseUp), r(fabric.document, "touchend", this._onMouseUp), r(fabric.document, "mousemove", this._onMouseMove), r(fabric.document, "touchmove", this._onMouseMove), i(this.upperCanvasEl, "mousemove", this._onMouseMove), i(this.upperCanvasEl, "touchmove", this._onMouseMove, {
                    passive: !1
                }), "touchend" === t.type) {
                    var e = this;
                    setTimeout(function() {
                        i(e.upperCanvasEl, "mousedown", e._onMouseDown)
                    }, 400)
                }
            },
            _onMouseMove: function(t) {
                !this.allowTouchScrolling && t.preventDefault && t.preventDefault(), this.__onMouseMove(t)
            },
            _onResize: function() {
                this.calcOffset()
            },
            _shouldRender: function(t, e) {
                var i = this._activeObject;
                return (!i || !i.isEditing || t !== i) && !!(t && (t.isMoving || t !== i) || !t && i || !t && !i && !this._groupSelector || e && this._previousPointer && this.selection && (e.x !== this._previousPointer.x || e.y !== this._previousPointer.y))
            },
            __onMouseUp: function(e) {
                var i, r = !0,
                    n = this._currentTransform,
                    s = this._groupSelector,
                    o = !s || 0 === s.left && 0 === s.top;
                if (t(e, 3)) this.fireRightClick && this._handleEvent(e, "up", i, 3, o);
                else if (t(e, 2)) this.fireMiddleClick && this._handleEvent(e, "up", i, 2, o);
                else if (this.isDrawingMode && this._isCurrentlyDrawing) this._onMouseUpInDrawingMode(e);
                else {
                    n && (this._finalizeCurrentTransform(e), r = !n.actionPerformed), i = r ? this.findTarget(e, !0) : n.target;
                    var a = this._shouldRender(i, this.getPointer(e));
                    i || !o ? this._maybeGroupObjects(e) : (this._groupSelector = null, this._currentTransform = null), i && (i.isMoving = !1), this._setCursorFromEvent(e, i), this._handleEvent(e, "up", i || null, 1, o), i && (i.__corner = 0), a && this.requestRenderAll()
                }
            },
            _handleEvent: function(t, e, i, r, n) {
                var s = void 0 === i ? this.findTarget(t) : i,
                    o = this.targets || [],
                    a = {
                        e: t,
                        target: s,
                        subTargets: o,
                        button: r || 1,
                        isClick: n || !1
                    };
                this.fire("mouse:" + e, a), s && s.fire("mouse" + e, a);
                for (var h = 0; h < o.length; h++) o[h].fire("mouse" + e, a)
            },
            _finalizeCurrentTransform: function(t) {
                var e = this._currentTransform,
                    i = e.target;
                i._scaling && (i._scaling = !1), i.setCoords(), this._restoreOriginXY(i), (e.actionPerformed || this.stateful && i.hasStateChanged()) && (this.fire("object:modified", {
                    target: i,
                    e: t
                }), i.fire("modified", {
                    e: t
                }))
            },
            _restoreOriginXY: function(t) {
                if (this._previousOriginX && this._previousOriginY) {
                    var e = t.translateToOriginPoint(t.getCenterPoint(), this._previousOriginX, this._previousOriginY);
                    t.originX = this._previousOriginX, t.originY = this._previousOriginY, t.left = e.x, t.top = e.y, this._previousOriginX = null, this._previousOriginY = null
                }
            },
            _onMouseDownInDrawingMode: function(t) {
                this._isCurrentlyDrawing = !0, this.discardActiveObject(t).requestRenderAll(), this.clipTo && fabric.util.clipContext(this, this.contextTop);
                var e = this.getPointer(t);
                this.freeDrawingBrush.onMouseDown(e), this._handleEvent(t, "down")
            },
            _onMouseMoveInDrawingMode: function(t) {
                if (this._isCurrentlyDrawing) {
                    var e = this.getPointer(t);
                    this.freeDrawingBrush.onMouseMove(e)
                }
                this.setCursor(this.freeDrawingCursor), this._handleEvent(t, "move")
            },
            _onMouseUpInDrawingMode: function(t) {
                this._isCurrentlyDrawing = !1, this.clipTo && this.contextTop.restore(), this.freeDrawingBrush.onMouseUp(), this._handleEvent(t, "up")
            },
            __onMouseDown: function(e) {
                var i = this.findTarget(e);
                if (t(e, 3)) this.fireRightClick && this._handleEvent(e, "down", i || null, 3);
                else if (t(e, 2)) this.fireMiddleClick && this._handleEvent(e, "down", i || null, 2);
                else if (this.isDrawingMode) this._onMouseDownInDrawingMode(e);
                else if (!this._currentTransform) {
                    var r = this.getPointer(e, !0);
                    this._previousPointer = r;
                    var n = this._shouldRender(i, r),
                        s = this._shouldGroup(e, i);
                    this._shouldClearSelection(e, i) ? this.discardActiveObject(e) : s && (this._handleGrouping(e, i), i = this._activeObject), !this.selection || i && (i.selectable || i.isEditing || i === this._activeObject) || (this._groupSelector = {
                        ex: r.x,
                        ey: r.y,
                        top: 0,
                        left: 0
                    }), i && (i.selectable && this.setActiveObject(i, e), i !== this._activeObject || !i.__corner && s || (this._beforeTransform(e, i), this._setupCurrentTransform(e, i))), this._handleEvent(e, "down", i || null), n && this.requestRenderAll()
                }
            },
            _beforeTransform: function(t, e) {
                this.stateful && e.saveState(), e._findTargetCorner(this.getPointer(t)) && this.onBeforeScaleRotate(e)
            },
            _setOriginToCenter: function(t) {
                this._previousOriginX = this._currentTransform.target.originX, this._previousOriginY = this._currentTransform.target.originY;
                var e = t.getCenterPoint();
                t.originX = "center", t.originY = "center", t.left = e.x, t.top = e.y, this._currentTransform.left = t.left, this._currentTransform.top = t.top
            },
            _setCenterToOrigin: function(t) {
                var e = t.translateToOriginPoint(t.getCenterPoint(), this._previousOriginX, this._previousOriginY);
                t.originX = this._previousOriginX, t.originY = this._previousOriginY, t.left = e.x, t.top = e.y, this._previousOriginX = null, this._previousOriginY = null
            },
            __onMouseMove: function(t) {
                var e, i;
                if (this.isDrawingMode) this._onMouseMoveInDrawingMode(t);
                else if (!(void 0 !== t.touches && t.touches.length > 1)) {
                    var r = this._groupSelector;
                    r ? (i = this.getPointer(t, !0), r.left = i.x - r.ex, r.top = i.y - r.ey, this.renderTop()) : this._currentTransform ? this._transformObject(t) : (e = this.findTarget(t), this._setCursorFromEvent(t, e), this._fireOverOutEvents(e, t)), this._handleEvent(t, "move", this._currentTransform ? null : e)
                }
            },
            _fireOverOutEvents: function(t, e) {
                var i, r, n = this._hoveredTarget;
                n !== t && (i = {
                    e: e,
                    target: t,
                    previousTarget: this._hoveredTarget
                }, r = {
                    e: e,
                    target: this._hoveredTarget,
                    nextTarget: t
                }, this._hoveredTarget = t), t ? n !== t && (n && (this.fire("mouse:out", r), n.fire("mouseout", r)), this.fire("mouse:over", i), t.fire("mouseover", i)) : n && (this.fire("mouse:out", r), n.fire("mouseout", r))
            },
            __onMouseWheel: function(t) {
                this._handleEvent(t, "wheel")
            },
            _transformObject: function(t) {
                var e = this.getPointer(t),
                    i = this._currentTransform;
                i.reset = !1, i.target.isMoving = !0, i.shiftKey = t.shiftKey, i.altKey = t[this.centeredKey], this._beforeScaleTransform(t, i), this._performTransformAction(t, i, e), i.actionPerformed && this.requestRenderAll()
            },
            _performTransformAction: function(t, e, i) {
                var r = i.x,
                    n = i.y,
                    s = e.target,
                    o = e.action,
                    a = !1;
                "rotate" === o ? (a = this._rotateObject(r, n)) && this._fire("rotating", s, t) : "scale" === o ? (a = this._onScale(t, e, r, n)) && this._fire("scaling", s, t) : "scaleX" === o ? (a = this._scaleObject(r, n, "x")) && this._fire("scaling", s, t) : "scaleY" === o ? (a = this._scaleObject(r, n, "y")) && this._fire("scaling", s, t) : "skewX" === o ? (a = this._skewObject(r, n, "x")) && this._fire("skewing", s, t) : "skewY" === o ? (a = this._skewObject(r, n, "y")) && this._fire("skewing", s, t) : (a = this._translateObject(r, n)) && (this._fire("moving", s, t), this.setCursor(s.moveCursor || this.moveCursor)), e.actionPerformed = e.actionPerformed || a
            },
            _fire: function(t, e, i) {
                this.fire("object:" + t, {
                    target: e,
                    e: i
                }), e.fire(t, {
                    e: i
                })
            },
            _beforeScaleTransform: function(t, e) {
                if ("scale" === e.action || "scaleX" === e.action || "scaleY" === e.action) {
                    var i = this._shouldCenterTransform(e.target);
                    (i && ("center" !== e.originX || "center" !== e.originY) || !i && "center" === e.originX && "center" === e.originY) && (this._resetCurrentTransform(), e.reset = !0)
                }
            },
            _onScale: function(t, e, i, r) {
                return this._isUniscalePossible(t, e.target) ? (e.currentAction = "scale", this._scaleObject(i, r)) : (e.reset || "scale" !== e.currentAction || this._resetCurrentTransform(), e.currentAction = "scaleEqually", this._scaleObject(i, r, "equally"))
            },
            _isUniscalePossible: function(t, e) {
                return (t[this.uniScaleKey] || this.uniScaleTransform) && !e.get("lockUniScaling")
            },
            _setCursorFromEvent: function(t, e) {
                if (!e) return this.setCursor(this.defaultCursor), !1;
                var i = e.hoverCursor || this.hoverCursor,
                    r = this._activeObject && "activeSelection" === this._activeObject.type ? this._activeObject : null,
                    n = (!r || !r.contains(e)) && e._findTargetCorner(this.getPointer(t, !0));
                n ? this.setCursor(this.getCornerCursor(n, e, t)) : this.setCursor(i)
            },
            getCornerCursor: function(t, i, r) {
                return this.actionIsDisabled(t, i, r) ? this.notAllowedCursor : t in e ? this._getRotatedCornerCursor(t, i, r) : "mtr" === t && i.hasRotatingPoint ? this.rotationCursor : this.defaultCursor
            },
            actionIsDisabled: function(t, e, i) {
                return "mt" === t || "mb" === t ? i[this.altActionKey] ? e.lockSkewingX : e.lockScalingY : "ml" === t || "mr" === t ? i[this.altActionKey] ? e.lockSkewingY : e.lockScalingX : "mtr" === t ? e.lockRotation : this._isUniscalePossible(i, e) ? e.lockScalingX && e.lockScalingY : e.lockScalingX || e.lockScalingY
            },
            _getRotatedCornerCursor: function(t, i, r) {
                var n = Math.round(i.angle % 360 / 45);
                return n < 0 && (n += 8), n += e[t], r[this.altActionKey] && e[t] % 2 == 0 && (n += 2), n %= 8, this.cursorMap[n]
            }
        })
    }(),
    function() {
        var t = Math.min,
            e = Math.max;
        fabric.util.object.extend(fabric.Canvas.prototype, {
            _shouldGroup: function(t, e) {
                var i = this._activeObject;
                return i && this._isSelectionKeyPressed(t) && e && e.selectable && this.selection && (i !== e || "activeSelection" === i.type)
            },
            _handleGrouping: function(t, e) {
                var i = this._activeObject;
                i.__corner || (e !== i || (e = this.findTarget(t, !0))) && (i && "activeSelection" === i.type ? this._updateActiveSelection(e, t) : this._createActiveSelection(e, t))
            },
            _updateActiveSelection: function(t, e) {
                var i = this._activeObject,
                    r = i._objects.slice(0);
                i.contains(t) ? (i.removeWithUpdate(t), this._hoveredTarget = t, 1 === i.size() && this._setActiveObject(i.item(0), e)) : (i.addWithUpdate(t), this._hoveredTarget = i), this._fireSelectionEvents(r, e)
            },
            _createActiveSelection: function(t, e) {
                var i = this.getActiveObjects(),
                    r = this._createGroup(t);
                this._hoveredTarget = r, this._setActiveObject(r, e), this._fireSelectionEvents(i, e)
            },
            _createGroup: function(t) {
                var e = this.getObjects(),
                    i = e.indexOf(this._activeObject) < e.indexOf(t) ? [this._activeObject, t] : [t, this._activeObject];
                return this._activeObject.isEditing && this._activeObject.exitEditing(), new fabric.ActiveSelection(i, {
                    canvas: this
                })
            },
            _groupSelectedObjects: function(t) {
                var e, i = this._collectObjects();
                1 === i.length ? this.setActiveObject(i[0], t) : i.length > 1 && (e = new fabric.ActiveSelection(i.reverse(), {
                    canvas: this
                }), this.setActiveObject(e, t))
            },
            _collectObjects: function() {
                for (var i, r = [], n = this._groupSelector.ex, s = this._groupSelector.ey, o = n + this._groupSelector.left, a = s + this._groupSelector.top, h = new fabric.Point(t(n, o), t(s, a)), c = new fabric.Point(e(n, o), e(s, a)), l = n === o && s === a, u = this._objects.length; u-- && !((i = this._objects[u]) && i.selectable && i.visible && (i.intersectsWithRect(h, c) || i.isContainedWithinRect(h, c) || i.containsPoint(h) || i.containsPoint(c)) && (r.push(i), l)););
                return r
            },
            _maybeGroupObjects: function(t) {
                this.selection && this._groupSelector && this._groupSelectedObjects(t), this.setCursor(this.defaultCursor), this._groupSelector = null, this._currentTransform = null
            }
        })
    }(),
    function() {
        var t = fabric.StaticCanvas.supports("toDataURLWithQuality");
        fabric.util.object.extend(fabric.StaticCanvas.prototype, {
            toDataURL: function(t) {
                t || (t = {});
                var e = t.format || "png",
                    i = t.quality || 1,
                    r = t.multiplier || 1,
                    n = {
                        left: t.left || 0,
                        top: t.top || 0,
                        width: t.width || 0,
                        height: t.height || 0
                    };
                return this.__toDataURLWithMultiplier(e, i, n, r)
            },
            __toDataURLWithMultiplier: function(t, e, i, r) {
                var n = this.width,
                    s = this.height,
                    o = (i.width || this.width) * r,
                    a = (i.height || this.height) * r,
                    h = this.getZoom() * r,
                    c = this.viewportTransform,
                    l = [h, 0, 0, h, (c[4] - i.left) * r, (c[5] - i.top) * r],
                    u = this.interactive,
                    f = this.skipOffscreen,
                    d = n !== o || s !== a;
                this.viewportTransform = l, this.skipOffscreen = !1, this.interactive = !1, d && this.setDimensions({
                    width: o,
                    height: a
                }, {
                    backstoreOnly: !0
                }), this.renderAll();
                var g = this.__toDataURL(t, e, i);
                return this.interactive = u, this.skipOffscreen = f, this.viewportTransform = c, d && this.setDimensions({
                    width: n,
                    height: s
                }, {
                    backstoreOnly: !0
                }), this.renderAll(), g
            },
            __toDataURL: function(e, i) {
                var r = this.contextContainer.canvas;
                return "jpg" === e && (e = "jpeg"), t ? r.toDataURL("image/" + e, i) : r.toDataURL("image/" + e)
            }
        })
    }(), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
        loadFromDatalessJSON: function(t, e, i) {
            return this.loadFromJSON(t, e, i)
        },
        loadFromJSON: function(t, e, i) {
            if (t) {
                var r = "string" == typeof t ? JSON.parse(t) : fabric.util.object.clone(t),
                    n = this,
                    s = this.renderOnAddRemove;
                return this.renderOnAddRemove = !1, this._enlivenObjects(r.objects, function(t) {
                    n.clear(), n._setBgOverlay(r, function() {
                        t.forEach(function(t, e) {
                            n.insertAt(t, e)
                        }), n.renderOnAddRemove = s, delete r.objects, delete r.backgroundImage, delete r.overlayImage, delete r.background, delete r.overlay, n._setOptions(r), n.renderAll(), e && e()
                    })
                }, i), this
            }
        },
        _setBgOverlay: function(t, e) {
            var i = {
                backgroundColor: !1,
                overlayColor: !1,
                backgroundImage: !1,
                overlayImage: !1
            };
            if (t.backgroundImage || t.overlayImage || t.background || t.overlay) {
                var r = function() {
                    i.backgroundImage && i.overlayImage && i.backgroundColor && i.overlayColor && e && e()
                };
                this.__setBgOverlay("backgroundImage", t.backgroundImage, i, r), this.__setBgOverlay("overlayImage", t.overlayImage, i, r), this.__setBgOverlay("backgroundColor", t.background, i, r), this.__setBgOverlay("overlayColor", t.overlay, i, r)
            } else e && e()
        },
        __setBgOverlay: function(t, e, i, r) {
            var n = this;
            if (!e) return i[t] = !0, void(r && r());
            "backgroundImage" === t || "overlayImage" === t ? fabric.util.enlivenObjects([e], function(e) {
                n[t] = e[0], i[t] = !0, r && r()
            }) : this["set" + fabric.util.string.capitalize(t, !0)](e, function() {
                i[t] = !0, r && r()
            })
        },
        _enlivenObjects: function(t, e, i) {
            t && 0 !== t.length ? fabric.util.enlivenObjects(t, function(t) {
                e && e(t)
            }, null, i) : e && e([])
        },
        _toDataURL: function(t, e) {
            this.clone(function(i) {
                e(i.toDataURL(t))
            })
        },
        _toDataURLWithMultiplier: function(t, e, i) {
            this.clone(function(r) {
                i(r.toDataURLWithMultiplier(t, e))
            })
        },
        clone: function(t, e) {
            var i = JSON.stringify(this.toJSON(e));
            this.cloneWithoutData(function(e) {
                e.loadFromJSON(i, function() {
                    t && t(e)
                })
            })
        },
        cloneWithoutData: function(t) {
            var e = fabric.document.createElement("canvas");
            e.width = this.width, e.height = this.height;
            var i = new fabric.Canvas(e);
            i.clipTo = this.clipTo, this.backgroundImage ? (i.setBackgroundImage(this.backgroundImage.src, function() {
                i.renderAll(), t && t(i)
            }), i.backgroundImageOpacity = this.backgroundImageOpacity, i.backgroundImageStretch = this.backgroundImageStretch) : t && t(i)
        }
    }),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend,
            r = e.util.object.clone,
            n = e.util.toFixed,
            s = e.util.string.capitalize,
            o = e.util.degreesToRadians,
            a = e.StaticCanvas.supports("setLineDash"),
            h = !e.isLikelyNode;
        e.Object || (e.Object = e.util.createClass(e.CommonMethods, {
            type: "object",
            originX: "left",
            originY: "top",
            top: 0,
            left: 0,
            width: 0,
            height: 0,
            scaleX: 1,
            scaleY: 1,
            flipX: !1,
            flipY: !1,
            opacity: 1,
            angle: 0,
            skewX: 0,
            skewY: 0,
            cornerSize: 13,
            transparentCorners: !0,
            hoverCursor: null,
            moveCursor: null,
            padding: 0,
            borderColor: "rgba(102,153,255,0.75)",
            borderDashArray: null,
            cornerColor: "rgba(102,153,255,0.5)",
            cornerStrokeColor: null,
            cornerStyle: "rect",
            cornerDashArray: null,
            centeredScaling: !1,
            centeredRotation: !0,
            fill: "rgb(0,0,0)",
            fillRule: "nonzero",
            globalCompositeOperation: "source-over",
            backgroundColor: "",
            selectionBackgroundColor: "",
            stroke: null,
            strokeWidth: 1,
            strokeDashArray: null,
            strokeLineCap: "butt",
            strokeLineJoin: "miter",
            strokeMiterLimit: 10,
            shadow: null,
            borderOpacityWhenMoving: .4,
            borderScaleFactor: 1,
            transformMatrix: null,
            minScaleLimit: 0,
            selectable: !0,
            evented: !0,
            visible: !0,
            hasControls: !0,
            hasBorders: !0,
            hasRotatingPoint: !0,
            rotatingPointOffset: 40,
            perPixelTargetFind: !1,
            includeDefaultValues: !0,
            clipTo: null,
            lockMovementX: !1,
            lockMovementY: !1,
            lockRotation: !1,
            lockScalingX: !1,
            lockScalingY: !1,
            lockUniScaling: !1,
            lockSkewingX: !1,
            lockSkewingY: !1,
            lockScalingFlip: !1,
            excludeFromExport: !1,
            objectCaching: h,
            statefullCache: !1,
            noScaleCache: !0,
            dirty: !0,
            __corner: 0,
            paintFirst: "fill",
            stateProperties: "top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeLineJoin strokeMiterLimit angle opacity fill globalCompositeOperation shadow clipTo visible backgroundColor skewX skewY fillRule paintFirst".split(" "),
            cacheProperties: "fill stroke strokeWidth strokeDashArray width height paintFirst strokeLineCap strokeLineJoin strokeMiterLimit backgroundColor".split(" "),
            initialize: function(t) {
                t && this.setOptions(t)
            },
            _createCacheCanvas: function() {
                this._cacheProperties = {}, this._cacheCanvas = e.document.createElement("canvas"), this._cacheContext = this._cacheCanvas.getContext("2d"), this._updateCacheCanvas()
            },
            _limitCacheSize: function(t) {
                var i = e.perfLimitSizeTotal,
                    r = t.width,
                    n = t.height,
                    s = e.maxCacheSideLimit,
                    o = e.minCacheSideLimit;
                if (r <= s && n <= s && r * n <= i) return r < o && (t.width = o), n < o && (t.height = o), t;
                var a = r / n,
                    h = e.util.limitDimsByArea(a, i),
                    c = e.util.capValue,
                    l = c(o, h.x, s),
                    u = c(o, h.y, s);
                return r > l && (t.zoomX /= r / l, t.width = l, t.capped = !0), n > u && (t.zoomY /= n / u, t.height = u, t.capped = !0), t
            },
            _getCacheCanvasDimensions: function() {
                var t = this.canvas && this.canvas.getZoom() || 1,
                    i = this.getObjectScaling(),
                    r = this.canvas && this.canvas._isRetinaScaling() ? e.devicePixelRatio : 1,
                    n = this._getNonTransformedDimensions(),
                    s = i.scaleX * t * r,
                    o = i.scaleY * t * r;
                return {
                    width: n.x * s + 2,
                    height: n.y * o + 2,
                    zoomX: s,
                    zoomY: o,
                    x: n.x,
                    y: n.y
                }
            },
            _updateCacheCanvas: function() {
                if (this.noScaleCache && this.canvas && this.canvas._currentTransform) {
                    var t = this.canvas._currentTransform.target,
                        i = this.canvas._currentTransform.action;
                    if (this === t && i.slice && "scale" === i.slice(0, 5)) return !1
                }
                var r, n, s = this._cacheCanvas,
                    o = this._limitCacheSize(this._getCacheCanvasDimensions()),
                    a = e.minCacheSideLimit,
                    h = o.width,
                    c = o.height,
                    l = o.zoomX,
                    u = o.zoomY,
                    f = h !== this.cacheWidth || c !== this.cacheHeight,
                    d = this.zoomX !== l || this.zoomY !== u,
                    g = f || d,
                    p = 0,
                    v = 0,
                    m = !1;
                if (f) {
                    var b = this._cacheCanvas.width,
                        _ = this._cacheCanvas.height,
                        y = h > b || c > _,
                        x = (h < .9 * b || c < .9 * _) && b > a && _ > a;
                    m = y || x, y && !o.capped && (h > a || c > a) && (p = .1 * h, v = .1 * c)
                }
                return !!g && (m ? (s.width = Math.ceil(h + p), s.height = Math.ceil(c + v)) : (this._cacheContext.setTransform(1, 0, 0, 1, 0, 0), this._cacheContext.clearRect(0, 0, s.width, s.height)), r = o.x * l / 2, n = o.y * u / 2, this.cacheTranslationX = Math.round(s.width / 2 - r) + r, this.cacheTranslationY = Math.round(s.height / 2 - n) + n, this.cacheWidth = h, this.cacheHeight = c, this._cacheContext.translate(this.cacheTranslationX, this.cacheTranslationY), this._cacheContext.scale(l, u), this.zoomX = l, this.zoomY = u, !0)
            },
            setOptions: function(t) {
                this._setOptions(t), this._initGradient(t.fill, "fill"), this._initGradient(t.stroke, "stroke"), this._initClipping(t), this._initPattern(t.fill, "fill"), this._initPattern(t.stroke, "stroke")
            },
            transform: function(t) {
                var e;
                e = this.group && !this.group._transformDone ? this.calcTransformMatrix() : this.calcOwnMatrix(), t.transform(e[0], e[1], e[2], e[3], e[4], e[5])
            },
            toObject: function(t) {
                var i = e.Object.NUM_FRACTION_DIGITS,
                    r = {
                        type: this.type,
                        version: e.version,
                        originX: this.originX,
                        originY: this.originY,
                        left: n(this.left, i),
                        top: n(this.top, i),
                        width: n(this.width, i),
                        height: n(this.height, i),
                        fill: this.fill && this.fill.toObject ? this.fill.toObject() : this.fill,
                        stroke: this.stroke && this.stroke.toObject ? this.stroke.toObject() : this.stroke,
                        strokeWidth: n(this.strokeWidth, i),
                        strokeDashArray: this.strokeDashArray ? this.strokeDashArray.concat() : this.strokeDashArray,
                        strokeLineCap: this.strokeLineCap,
                        strokeLineJoin: this.strokeLineJoin,
                        strokeMiterLimit: n(this.strokeMiterLimit, i),
                        scaleX: n(this.scaleX, i),
                        scaleY: n(this.scaleY, i),
                        angle: n(this.angle, i),
                        flipX: this.flipX,
                        flipY: this.flipY,
                        opacity: n(this.opacity, i),
                        shadow: this.shadow && this.shadow.toObject ? this.shadow.toObject() : this.shadow,
                        visible: this.visible,
                        clipTo: this.clipTo && String(this.clipTo),
                        backgroundColor: this.backgroundColor,
                        fillRule: this.fillRule,
                        paintFirst: this.paintFirst,
                        globalCompositeOperation: this.globalCompositeOperation,
                        transformMatrix: this.transformMatrix ? this.transformMatrix.concat() : null,
                        skewX: n(this.skewX, i),
                        skewY: n(this.skewY, i)
                    };
                return e.util.populateWithProperties(this, r, t), this.includeDefaultValues || (r = this._removeDefaultValues(r)), r
            },
            toDatalessObject: function(t) {
                return this.toObject(t)
            },
            _removeDefaultValues: function(t) {
                var i = e.util.getKlass(t.type).prototype;
                return i.stateProperties.forEach(function(e) {
                    t[e] === i[e] && delete t[e], "[object Array]" === Object.prototype.toString.call(t[e]) && "[object Array]" === Object.prototype.toString.call(i[e]) && 0 === t[e].length && 0 === i[e].length && delete t[e]
                }), t
            },
            toString: function() {
                return "#<fabric." + s(this.type) + ">"
            },
            getObjectScaling: function() {
                var t = this.scaleX,
                    e = this.scaleY;
                if (this.group) {
                    var i = this.group.getObjectScaling();
                    t *= i.scaleX, e *= i.scaleY
                }
                return {
                    scaleX: t,
                    scaleY: e
                }
            },
            getObjectOpacity: function() {
                var t = this.opacity;
                return this.group && (t *= this.group.getObjectOpacity()), t
            },
            _set: function(t, i) {
                var r = "scaleX" === t || "scaleY" === t,
                    n = this[t] !== i,
                    s = !1;
                return r && (i = this._constrainScale(i)), "scaleX" === t && i < 0 ? (this.flipX = !this.flipX, i *= -1) : "scaleY" === t && i < 0 ? (this.flipY = !this.flipY, i *= -1) : "shadow" !== t || !i || i instanceof e.Shadow ? "dirty" === t && this.group && this.group.set("dirty", i) : i = new e.Shadow(i), this[t] = i, n && (s = this.group && this.group.isOnACache(), this.cacheProperties.indexOf(t) > -1 ? (this.dirty = !0, s && this.group.set("dirty", !0)) : s && this.stateProperties.indexOf(t) > -1 && this.group.set("dirty", !0)), this
            },
            setOnGroup: function() {},
            getViewportTransform: function() {
                return this.canvas && this.canvas.viewportTransform ? this.canvas.viewportTransform : e.iMatrix.concat()
            },
            isNotVisible: function() {
                return 0 === this.opacity || 0 === this.width && 0 === this.height || !this.visible
            },
            render: function(t) {
                this.isNotVisible() || this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (t.save(), this._setupCompositeOperation(t), this.drawSelectionBackground(t), this.transform(t), this._setOpacity(t), this._setShadow(t, this), this.transformMatrix && t.transform.apply(t, this.transformMatrix), this.clipTo && e.util.clipContext(this, t), this.shouldCache() ? (this._cacheCanvas || this._createCacheCanvas(), this.isCacheDirty() && (this.statefullCache && this.saveState({
                    propertySet: "cacheProperties"
                }), this.drawObject(this._cacheContext), this.dirty = !1), this.drawCacheOnCanvas(t)) : (this._removeCacheCanvas(), this.dirty = !1, this.drawObject(t), this.objectCaching && this.statefullCache && this.saveState({
                    propertySet: "cacheProperties"
                })), this.clipTo && t.restore(), t.restore())
            },
            _removeCacheCanvas: function() {
                this._cacheCanvas = null, this.cacheWidth = 0, this.cacheHeight = 0
            },
            needsItsOwnCache: function() {
                return "stroke" === this.paintFirst && "object" == typeof this.shadow
            },
            shouldCache: function() {
                return this.ownCaching = this.objectCaching && (!this.group || this.needsItsOwnCache() || !this.group.isOnACache()), this.ownCaching
            },
            willDrawShadow: function() {
                return !!this.shadow && (0 !== this.shadow.offsetX || 0 !== this.shadow.offsetY)
            },
            drawObject: function(t) {
                this._renderBackground(t), this._setStrokeStyles(t, this), this._setFillStyles(t, this), this._render(t)
            },
            drawCacheOnCanvas: function(t) {
                t.scale(1 / this.zoomX, 1 / this.zoomY), t.drawImage(this._cacheCanvas, -this.cacheTranslationX, -this.cacheTranslationY)
            },
            isCacheDirty: function(t) {
                if (this.isNotVisible()) return !1;
                if (this._cacheCanvas && !t && this._updateCacheCanvas()) return !0;
                if (this.dirty || this.statefullCache && this.hasStateChanged("cacheProperties")) {
                    if (this._cacheCanvas && !t) {
                        var e = this.cacheWidth / this.zoomX,
                            i = this.cacheHeight / this.zoomY;
                        this._cacheContext.clearRect(-e / 2, -i / 2, e, i)
                    }
                    return !0
                }
                return !1
            },
            _renderBackground: function(t) {
                if (this.backgroundColor) {
                    var e = this._getNonTransformedDimensions();
                    t.fillStyle = this.backgroundColor, t.fillRect(-e.x / 2, -e.y / 2, e.x, e.y), this._removeShadow(t)
                }
            },
            _setOpacity: function(t) {
                this.group && !this.group._transformDone ? t.globalAlpha = this.getObjectOpacity() : t.globalAlpha *= this.opacity
            },
            _setStrokeStyles: function(t, e) {
                e.stroke && (t.lineWidth = e.strokeWidth, t.lineCap = e.strokeLineCap, t.lineJoin = e.strokeLineJoin, t.miterLimit = e.strokeMiterLimit, t.strokeStyle = e.stroke.toLive ? e.stroke.toLive(t, this) : e.stroke)
            },
            _setFillStyles: function(t, e) {
                e.fill && (t.fillStyle = e.fill.toLive ? e.fill.toLive(t, this) : e.fill)
            },
            _setLineDash: function(t, e, i) {
                e && (1 & e.length && e.push.apply(e, e), a ? t.setLineDash(e) : i && i(t))
            },
            _renderControls: function(t, i) {
                var r, n, s, a = this.getViewportTransform(),
                    h = this.calcTransformMatrix();
                n = void 0 !== (i = i || {}).hasBorders ? i.hasBorders : this.hasBorders, s = void 0 !== i.hasControls ? i.hasControls : this.hasControls, h = e.util.multiplyTransformMatrices(a, h), r = e.util.qrDecompose(h), t.save(), t.translate(r.translateX, r.translateY), t.lineWidth = 1 * this.borderScaleFactor, this.group || (t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1), i.forActiveSelection ? (t.rotate(o(r.angle)), n && this.drawBordersInGroup(t, r, i)) : (t.rotate(o(this.angle)), n && this.drawBorders(t, i)), s && this.drawControls(t, i), t.restore()
            },
            _setShadow: function(t) {
                if (this.shadow) {
                    var i = this.canvas && this.canvas.viewportTransform[0] || 1,
                        r = this.canvas && this.canvas.viewportTransform[3] || 1,
                        n = this.getObjectScaling();
                    this.canvas && this.canvas._isRetinaScaling() && (i *= e.devicePixelRatio, r *= e.devicePixelRatio), t.shadowColor = this.shadow.color, t.shadowBlur = this.shadow.blur * e.browserShadowBlurConstant * (i + r) * (n.scaleX + n.scaleY) / 4, t.shadowOffsetX = this.shadow.offsetX * i * n.scaleX, t.shadowOffsetY = this.shadow.offsetY * r * n.scaleY
                }
            },
            _removeShadow: function(t) {
                this.shadow && (t.shadowColor = "", t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0)
            },
            _applyPatternGradientTransform: function(t, e) {
                if (!e || !e.toLive) return {
                    offsetX: 0,
                    offsetY: 0
                };
                var i = e.gradientTransform || e.patternTransform,
                    r = -this.width / 2 + e.offsetX || 0,
                    n = -this.height / 2 + e.offsetY || 0;
                return t.translate(r, n), i && t.transform(i[0], i[1], i[2], i[3], i[4], i[5]), {
                    offsetX: r,
                    offsetY: n
                }
            },
            _renderPaintInOrder: function(t) {
                "stroke" === this.paintFirst ? (this._renderStroke(t), this._renderFill(t)) : (this._renderFill(t), this._renderStroke(t))
            },
            _renderFill: function(t) {
                this.fill && (t.save(), this._applyPatternGradientTransform(t, this.fill), "evenodd" === this.fillRule ? t.fill("evenodd") : t.fill(), t.restore())
            },
            _renderStroke: function(t) {
                this.stroke && 0 !== this.strokeWidth && (this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this._setLineDash(t, this.strokeDashArray, this._renderDashedStroke), this._applyPatternGradientTransform(t, this.stroke), t.stroke(), t.restore())
            },
            _findCenterFromElement: function() {
                return {
                    x: this.left + this.width / 2,
                    y: this.top + this.height / 2
                }
            },
            _assignTransformMatrixProps: function() {
                if (this.transformMatrix) {
                    var t = e.util.qrDecompose(this.transformMatrix);
                    this.flipX = !1, this.flipY = !1, this.set("scaleX", t.scaleX), this.set("scaleY", t.scaleY), this.angle = t.angle, this.skewX = t.skewX, this.skewY = 0
                }
            },
            _removeTransformMatrix: function(t) {
                var i = this._findCenterFromElement();
                this.transformMatrix && (this._assignTransformMatrixProps(), i = e.util.transformPoint(i, this.transformMatrix)), this.transformMatrix = null, t && (this.scaleX *= t.scaleX, this.scaleY *= t.scaleY, this.cropX = t.cropX, this.cropY = t.cropY, i.x += t.offsetLeft, i.y += t.offsetTop, this.width = t.width, this.height = t.height), this.setPositionByOrigin(i, "center", "center")
            },
            clone: function(t, i) {
                var r = this.toObject(i);
                this.constructor.fromObject ? this.constructor.fromObject(r, t) : e.Object._fromObject("Object", r, t)
            },
            cloneAsImage: function(t, i) {
                var r = this.toDataURL(i);
                return e.util.loadImage(r, function(i) {
                    t && t(new e.Image(i))
                }), this
            },
            toDataURL: function(t) {
                t || (t = {});
                var i = e.util.createCanvasElement(),
                    r = this.getBoundingRect();
                i.width = r.width, i.height = r.height, e.util.wrapElement(i, "div");
                var n = new e.StaticCanvas(i, {
                    enableRetinaScaling: t.enableRetinaScaling
                });
                "jpg" === t.format && (t.format = "jpeg"), "jpeg" === t.format && (n.backgroundColor = "#fff");
                var s = {
                    left: this.left,
                    top: this.top
                };
                this.setPositionByOrigin(new e.Point(n.width / 2, n.height / 2), "center", "center");
                var o = this.canvas;
                n.add(this);
                var a = n.toDataURL(t);
                return this.set(s).setCoords(), this.canvas = o, n.dispose(), n = null, a
            },
            isType: function(t) {
                return this.type === t
            },
            complexity: function() {
                return 1
            },
            toJSON: function(t) {
                return this.toObject(t)
            },
            setGradient: function(t, i) {
                i || (i = {});
                var r = {
                    colorStops: []
                };
                return r.type = i.type || (i.r1 || i.r2 ? "radial" : "linear"), r.coords = {
                    x1: i.x1,
                    y1: i.y1,
                    x2: i.x2,
                    y2: i.y2
                }, (i.r1 || i.r2) && (r.coords.r1 = i.r1, r.coords.r2 = i.r2), r.gradientTransform = i.gradientTransform, e.Gradient.prototype.addColorStop.call(r, i.colorStops), this.set(t, e.Gradient.forObject(this, r))
            },
            setPatternFill: function(t) {
                return this.set("fill", new e.Pattern(t))
            },
            setShadow: function(t) {
                return this.set("shadow", t ? new e.Shadow(t) : null)
            },
            setColor: function(t) {
                return this.set("fill", t), this
            },
            rotate: function(t) {
                var e = ("center" !== this.originX || "center" !== this.originY) && this.centeredRotation;
                return e && this._setOriginToCenter(), this.set("angle", t), e && this._resetOrigin(), this
            },
            centerH: function() {
                return this.canvas && this.canvas.centerObjectH(this), this
            },
            viewportCenterH: function() {
                return this.canvas && this.canvas.viewportCenterObjectH(this), this
            },
            centerV: function() {
                return this.canvas && this.canvas.centerObjectV(this), this
            },
            viewportCenterV: function() {
                return this.canvas && this.canvas.viewportCenterObjectV(this), this
            },
            center: function() {
                return this.canvas && this.canvas.centerObject(this), this
            },
            viewportCenter: function() {
                return this.canvas && this.canvas.viewportCenterObject(this), this
            },
            getLocalPointer: function(t, i) {
                i = i || this.canvas.getPointer(t);
                var r = new e.Point(i.x, i.y),
                    n = this._getLeftTopCoords();
                return this.angle && (r = e.util.rotatePoint(r, n, o(-this.angle))), {
                    x: r.x - n.x,
                    y: r.y - n.y
                }
            },
            _setupCompositeOperation: function(t) {
                this.globalCompositeOperation && (t.globalCompositeOperation = this.globalCompositeOperation)
            }
        }), e.util.createAccessors && e.util.createAccessors(e.Object), i(e.Object.prototype, e.Observable), e.Object.NUM_FRACTION_DIGITS = 2, e.Object._fromObject = function(t, i, n, s) {
            var o = e[t];
            i = r(i, !0), e.util.enlivenPatterns([i.fill, i.stroke], function(t) {
                void 0 !== t[0] && (i.fill = t[0]), void 0 !== t[1] && (i.stroke = t[1]);
                var e = s ? new o(i[s], i) : new o(i);
                n && n(e)
            })
        }, e.Object.__uid = 0)
    }("undefined" != typeof exports ? exports : this),
    function() {
        var t = fabric.util.degreesToRadians,
            e = {
                left: -.5,
                center: 0,
                right: .5
            },
            i = {
                top: -.5,
                center: 0,
                bottom: .5
            };
        fabric.util.object.extend(fabric.Object.prototype, {
            translateToGivenOrigin: function(t, r, n, s, o) {
                var a, h, c, l = t.x,
                    u = t.y;
                return "string" == typeof r ? r = e[r] : r -= .5, "string" == typeof s ? s = e[s] : s -= .5, a = s - r, "string" == typeof n ? n = i[n] : n -= .5, "string" == typeof o ? o = i[o] : o -= .5, h = o - n, (a || h) && (c = this._getTransformedDimensions(), l = t.x + a * c.x, u = t.y + h * c.y), new fabric.Point(l, u)
            },
            translateToCenterPoint: function(e, i, r) {
                var n = this.translateToGivenOrigin(e, i, r, "center", "center");
                return this.angle ? fabric.util.rotatePoint(n, e, t(this.angle)) : n
            },
            translateToOriginPoint: function(e, i, r) {
                var n = this.translateToGivenOrigin(e, "center", "center", i, r);
                return this.angle ? fabric.util.rotatePoint(n, e, t(this.angle)) : n
            },
            getCenterPoint: function() {
                var t = new fabric.Point(this.left, this.top);
                return this.translateToCenterPoint(t, this.originX, this.originY)
            },
            getPointByOrigin: function(t, e) {
                var i = this.getCenterPoint();
                return this.translateToOriginPoint(i, t, e)
            },
            toLocalPoint: function(e, i, r) {
                var n, s, o = this.getCenterPoint();
                return n = void 0 !== i && void 0 !== r ? this.translateToGivenOrigin(o, "center", "center", i, r) : new fabric.Point(this.left, this.top), s = new fabric.Point(e.x, e.y), this.angle && (s = fabric.util.rotatePoint(s, o, -t(this.angle))), s.subtractEquals(n)
            },
            setPositionByOrigin: function(t, e, i) {
                var r = this.translateToCenterPoint(t, e, i),
                    n = this.translateToOriginPoint(r, this.originX, this.originY);
                this.set("left", n.x), this.set("top", n.y)
            },
            adjustPosition: function(i) {
                var r, n, s = t(this.angle),
                    o = this.getScaledWidth(),
                    a = Math.cos(s) * o,
                    h = Math.sin(s) * o;
                r = "string" == typeof this.originX ? e[this.originX] : this.originX - .5, n = "string" == typeof i ? e[i] : i - .5, this.left += a * (n - r), this.top += h * (n - r), this.setCoords(), this.originX = i
            },
            _setOriginToCenter: function() {
                this._originalOriginX = this.originX, this._originalOriginY = this.originY;
                var t = this.getCenterPoint();
                this.originX = "center", this.originY = "center", this.left = t.x, this.top = t.y
            },
            _resetOrigin: function() {
                var t = this.translateToOriginPoint(this.getCenterPoint(), this._originalOriginX, this._originalOriginY);
                this.originX = this._originalOriginX, this.originY = this._originalOriginY, this.left = t.x, this.top = t.y, this._originalOriginX = null, this._originalOriginY = null
            },
            _getLeftTopCoords: function() {
                return this.translateToOriginPoint(this.getCenterPoint(), "left", "top")
            },
            onDeselect: function() {}
        })
    }(),
    function() {
        function t(t) {
            return [new fabric.Point(t.tl.x, t.tl.y), new fabric.Point(t.tr.x, t.tr.y), new fabric.Point(t.br.x, t.br.y), new fabric.Point(t.bl.x, t.bl.y)]
        }
        var e = fabric.util.degreesToRadians,
            i = fabric.util.multiplyTransformMatrices;
        fabric.util.object.extend(fabric.Object.prototype, {
            oCoords: null,
            aCoords: null,
            ownMatrixCache: null,
            matrixCache: null,
            getCoords: function(e, i) {
                this.oCoords || this.setCoords();
                var r = e ? this.aCoords : this.oCoords;
                return t(i ? this.calcCoords(e) : r)
            },
            intersectsWithRect: function(t, e, i, r) {
                var n = this.getCoords(i, r);
                return "Intersection" === fabric.Intersection.intersectPolygonRectangle(n, t, e).status
            },
            intersectsWithObject: function(t, e, i) {
                return "Intersection" === fabric.Intersection.intersectPolygonPolygon(this.getCoords(e, i), t.getCoords(e, i)).status || t.isContainedWithinObject(this, e, i) || this.isContainedWithinObject(t, e, i)
            },
            isContainedWithinObject: function(t, e, i) {
                for (var r = this.getCoords(e, i), n = 0, s = t._getImageLines(i ? t.calcCoords(e) : e ? t.aCoords : t.oCoords); n < 4; n++)
                    if (!t.containsPoint(r[n], s)) return !1;
                return !0
            },
            isContainedWithinRect: function(t, e, i, r) {
                var n = this.getBoundingRect(i, r);
                return n.left >= t.x && n.left + n.width <= e.x && n.top >= t.y && n.top + n.height <= e.y
            },
            containsPoint: function(t, e, i, r) {
                var e = e || this._getImageLines(r ? this.calcCoords(i) : i ? this.aCoords : this.oCoords),
                    n = this._findCrossPoints(t, e);
                return 0 !== n && n % 2 == 1
            },
            isOnScreen: function(t) {
                if (!this.canvas) return !1;
                for (var e, i = this.canvas.vptCoords.tl, r = this.canvas.vptCoords.br, n = this.getCoords(!0, t), s = 0; s < 4; s++)
                    if ((e = n[s]).x <= r.x && e.x >= i.x && e.y <= r.y && e.y >= i.y) return !0;
                if (this.intersectsWithRect(i, r, !0)) return !0;
                var o = {
                    x: (i.x + r.x) / 2,
                    y: (i.y + r.y) / 2
                };
                return !!this.containsPoint(o, null, !0)
            },
            _getImageLines: function(t) {
                return {
                    topline: {
                        o: t.tl,
                        d: t.tr
                    },
                    rightline: {
                        o: t.tr,
                        d: t.br
                    },
                    bottomline: {
                        o: t.br,
                        d: t.bl
                    },
                    leftline: {
                        o: t.bl,
                        d: t.tl
                    }
                }
            },
            _findCrossPoints: function(t, e) {
                var i, r, n, s, o = 0;
                for (var a in e)
                    if (!((s = e[a]).o.y < t.y && s.d.y < t.y || s.o.y >= t.y && s.d.y >= t.y || (s.o.x === s.d.x && s.o.x >= t.x ? n = s.o.x : (i = 0, r = (s.d.y - s.o.y) / (s.d.x - s.o.x), n = -(t.y - i * t.x - (s.o.y - r * s.o.x)) / (i - r)), n >= t.x && (o += 1), 2 !== o))) break;
                return o
            },
            getBoundingRect: function(t, e) {
                var i = this.getCoords(t, e);
                return fabric.util.makeBoundingBoxFromPoints(i)
            },
            getScaledWidth: function() {
                return this._getTransformedDimensions().x
            },
            getScaledHeight: function() {
                return this._getTransformedDimensions().y
            },
            _constrainScale: function(t) {
                return Math.abs(t) < this.minScaleLimit ? t < 0 ? -this.minScaleLimit : this.minScaleLimit : 0 === t ? 1e-4 : t
            },
            scale: function(t) {
                return this._set("scaleX", t), this._set("scaleY", t), this.setCoords()
            },
            scaleToWidth: function(t, e) {
                var i = this.getBoundingRect(e).width / this.getScaledWidth();
                return this.scale(t / this.width / i)
            },
            scaleToHeight: function(t, e) {
                var i = this.getBoundingRect(e).height / this.getScaledHeight();
                return this.scale(t / this.height / i)
            },
            calcCoords: function(t) {
                var i = e(this.angle),
                    r = this.getViewportTransform(),
                    n = t ? this._getTransformedDimensions() : this._calculateCurrentDimensions(),
                    s = n.x,
                    o = n.y,
                    a = i ? Math.sin(i) : 0,
                    h = i ? Math.cos(i) : 1,
                    c = s > 0 ? Math.atan(o / s) : 0,
                    l = s / Math.cos(c) / 2,
                    u = Math.cos(c + i) * l,
                    f = Math.sin(c + i) * l,
                    d = this.getCenterPoint(),
                    g = t ? d : fabric.util.transformPoint(d, r),
                    p = new fabric.Point(g.x - u, g.y - f),
                    v = new fabric.Point(p.x + s * h, p.y + s * a),
                    m = new fabric.Point(p.x - o * a, p.y + o * h),
                    b = new fabric.Point(g.x + u, g.y + f);
                if (!t) var _ = new fabric.Point((p.x + m.x) / 2, (p.y + m.y) / 2),
                    y = new fabric.Point((v.x + p.x) / 2, (v.y + p.y) / 2),
                    x = new fabric.Point((b.x + v.x) / 2, (b.y + v.y) / 2),
                    C = new fabric.Point((b.x + m.x) / 2, (b.y + m.y) / 2),
                    S = new fabric.Point(y.x + a * this.rotatingPointOffset, y.y - h * this.rotatingPointOffset);
                g = {
                    tl: p,
                    tr: v,
                    br: b,
                    bl: m
                };
                return t || (g.ml = _, g.mt = y, g.mr = x, g.mb = C, g.mtr = S), g
            },
            setCoords: function(t, e) {
                return this.oCoords = this.calcCoords(t), e || (this.aCoords = this.calcCoords(!0)), t || this._setCornerCoords && this._setCornerCoords(), this
            },
            _calcRotateMatrix: function() {
                if (this.angle) {
                    var t = e(this.angle),
                        i = Math.cos(t),
                        r = Math.sin(t);
                    return 6.123233995736766e-17 !== i && -1.8369701987210297e-16 !== i || (i = 0), [i, r, -r, i, 0, 0]
                }
                return fabric.iMatrix.concat()
            },
            transformMatrixKey: function(t) {
                var e = "";
                return !t && this.group && (e = this.group.transformMatrixKey(t) + "_"), e + this.top + "_" + this.left + "_" + this.scaleX + "_" + this.scaleY + "_" + this.skewX + "_" + this.skewY + "_" + this.angle + "_" + this.flipX + "_" + this.flipY + "_" + this.width + "_" + this.height
            },
            calcTransformMatrix: function(t) {
                if (t) return this.calcOwnMatrix();
                var e = this.transformMatrixKey(),
                    r = this.matrixCache || (this.matrixCache = {});
                if (r.key === e) return r.value;
                var n = this.calcOwnMatrix();
                return this.group && (n = i(this.group.calcTransformMatrix(), n)), r.key = e, r.value = n, n
            },
            calcOwnMatrix: function() {
                var t = this.transformMatrixKey(!0),
                    e = this.ownMatrixCache || (this.ownMatrixCache = {});
                if (e.key === t) return e.value;
                var r, n = this.getCenterPoint(),
                    s = [1, 0, 0, 1, n.x, n.y],
                    o = this._calcDimensionsTransformMatrix(this.skewX, this.skewY, !0);
                return this.angle && (r = this._calcRotateMatrix(), s = i(s, r)), s = i(s, o), e.key = t, e.value = s, s
            },
            _calcDimensionsTransformMatrix: function(t, r, n) {
                var s, o = [this.scaleX * (n && this.flipX ? -1 : 1), 0, 0, this.scaleY * (n && this.flipY ? -1 : 1), 0, 0];
                return t && (s = [1, 0, Math.tan(e(t)), 1], o = i(o, s, !0)), r && (s = [1, Math.tan(e(r)), 0, 1], o = i(o, s, !0)), o
            },
            _getNonTransformedDimensions: function() {
                var t = this.strokeWidth;
                return {
                    x: this.width + t,
                    y: this.height + t
                }
            },
            _getTransformedDimensions: function(t, e) {
                void 0 === t && (t = this.skewX), void 0 === e && (e = this.skewY);
                var i, r, n = this._getNonTransformedDimensions(),
                    s = n.x / 2,
                    o = n.y / 2,
                    a = [{
                        x: -s,
                        y: -o
                    }, {
                        x: s,
                        y: -o
                    }, {
                        x: -s,
                        y: o
                    }, {
                        x: s,
                        y: o
                    }],
                    h = this._calcDimensionsTransformMatrix(t, e, !1);
                for (i = 0; i < a.length; i++) a[i] = fabric.util.transformPoint(a[i], h);
                return r = fabric.util.makeBoundingBoxFromPoints(a), {
                    x: r.width,
                    y: r.height
                }
            },
            _calculateCurrentDimensions: function() {
                var t = this.getViewportTransform(),
                    e = this._getTransformedDimensions();
                return fabric.util.transformPoint(e, t, !0).scalarAdd(2 * this.padding)
            }
        })
    }(), fabric.util.object.extend(fabric.Object.prototype, {
        sendToBack: function() {
            return this.group ? fabric.StaticCanvas.prototype.sendToBack.call(this.group, this) : this.canvas.sendToBack(this), this
        },
        bringToFront: function() {
            return this.group ? fabric.StaticCanvas.prototype.bringToFront.call(this.group, this) : this.canvas.bringToFront(this), this
        },
        sendBackwards: function(t) {
            return this.group ? fabric.StaticCanvas.prototype.sendBackwards.call(this.group, this, t) : this.canvas.sendBackwards(this, t), this
        },
        bringForward: function(t) {
            return this.group ? fabric.StaticCanvas.prototype.bringForward.call(this.group, this, t) : this.canvas.bringForward(this, t), this
        },
        moveTo: function(t) {
            return this.group && "activeSelection" !== this.group.type ? fabric.StaticCanvas.prototype.moveTo.call(this.group, this, t) : this.canvas.moveTo(this, t), this
        }
    }),
    function() {
        function t(t, e) {
            if (e) {
                if (e.toLive) return t + ": url(#SVGID_" + e.id + "); ";
                var i = new fabric.Color(e),
                    r = t + ": " + i.toRgb() + "; ",
                    n = i.getAlpha();
                return 1 !== n && (r += t + "-opacity: " + n.toString() + "; "), r
            }
            return t + ": none; "
        }
        var e = fabric.Object.NUM_FRACTION_DIGITS,
            i = fabric.util.toFixed;
        fabric.util.object.extend(fabric.Object.prototype, {
            getSvgStyles: function(e) {
                var i = this.fillRule,
                    r = this.strokeWidth ? this.strokeWidth : "0",
                    n = this.strokeDashArray ? this.strokeDashArray.join(" ") : "none",
                    s = this.strokeLineCap ? this.strokeLineCap : "butt",
                    o = this.strokeLineJoin ? this.strokeLineJoin : "miter",
                    a = this.strokeMiterLimit ? this.strokeMiterLimit : "4",
                    h = void 0 !== this.opacity ? this.opacity : "1",
                    c = this.visible ? "" : " visibility: hidden;",
                    l = e ? "" : this.getSvgFilter(),
                    u = t("fill", this.fill);
                return [t("stroke", this.stroke), "stroke-width: ", r, "; ", "stroke-dasharray: ", n, "; ", "stroke-linecap: ", s, "; ", "stroke-linejoin: ", o, "; ", "stroke-miterlimit: ", a, "; ", u, "fill-rule: ", i, "; ", "opacity: ", h, ";", l, c].join("")
            },
            getSvgSpanStyles: function(e, i) {
                var r = e.strokeWidth ? "stroke-width: " + e.strokeWidth + "; " : "",
                    n = e.fontFamily ? "font-family: " + e.fontFamily.replace(/"/g, "'") + "; " : "",
                    s = e.fontSize ? "font-size: " + e.fontSize + "; " : "",
                    o = e.fontStyle ? "font-style: " + e.fontStyle + "; " : "",
                    a = e.fontWeight ? "font-weight: " + e.fontWeight + "; " : "",
                    h = e.fill ? t("fill", e.fill) : "",
                    c = e.stroke ? t("stroke", e.stroke) : "",
                    l = this.getSvgTextDecoration(e);
                return l && (l = "text-decoration: " + l + "; "), [c, r, n, s, o, a, l, h, i ? "white-space: pre; " : ""].join("")
            },
            getSvgTextDecoration: function(t) {
                return "overline" in t || "underline" in t || "linethrough" in t ? (t.overline ? "overline " : "") + (t.underline ? "underline " : "") + (t.linethrough ? "line-through " : "") : ""
            },
            getSvgFilter: function() {
                return this.shadow ? "filter: url(#SVGID_" + this.shadow.id + ");" : ""
            },
            getSvgId: function() {
                return this.id ? 'id="' + this.id + '" ' : ""
            },
            getSvgTransform: function() {
                var t = this.angle,
                    e = this.skewX % 360,
                    r = this.skewY % 360,
                    n = this.getCenterPoint(),
                    s = fabric.Object.NUM_FRACTION_DIGITS,
                    o = "translate(" + i(n.x, s) + " " + i(n.y, s) + ")",
                    a = 0 !== t ? " rotate(" + i(t, s) + ")" : "",
                    h = 1 === this.scaleX && 1 === this.scaleY ? "" : " scale(" + i(this.scaleX, s) + " " + i(this.scaleY, s) + ")",
                    c = 0 !== e ? " skewX(" + i(e, s) + ")" : "",
                    l = 0 !== r ? " skewY(" + i(r, s) + ")" : "";
                return [o, a, h, this.flipX ? " matrix(-1 0 0 1 0 0) " : "", this.flipY ? " matrix(1 0 0 -1 0 0)" : "", c, l].join("")
            },
            getSvgTransformMatrix: function() {
                return this.transformMatrix ? " matrix(" + this.transformMatrix.join(" ") + ") " : ""
            },
            _setSVGBg: function(t) {
                this.backgroundColor && t.push("\t\t<rect ", this._getFillAttributes(this.backgroundColor), ' x="', i(-this.width / 2, e), '" y="', i(-this.height / 2, e), '" width="', i(this.width, e), '" height="', i(this.height, e), '"></rect>\n')
            },
            _createBaseSVGMarkup: function() {
                var t = [];
                return this.fill && this.fill.toLive && t.push(this.fill.toSVG(this, !1)), this.stroke && this.stroke.toLive && t.push(this.stroke.toSVG(this, !1)), this.shadow && t.push(this.shadow.toSVG(this)), t
            },
            addPaintOrder: function() {
                return "fill" !== this.paintFirst ? ' paint-order="' + this.paintFirst + '" ' : ""
            }
        })
    }(),
    function() {
        function t(t, e, r) {
            var n = {};
            r.forEach(function(e) {
                n[e] = t[e]
            }), i(t[e], n, !0)
        }

        function e(t, i, r) {
            if (t === i) return !0;
            if (Array.isArray(t)) {
                if (t.length !== i.length) return !1;
                for (var n = 0, s = t.length; n < s; n++)
                    if (!e(t[n], i[n])) return !1;
                return !0
            }
            if (t && "object" == typeof t) {
                var o, a = Object.keys(t);
                if (!r && a.length !== Object.keys(i).length) return !1;
                for (var n = 0, s = a.length; n < s; n++)
                    if (o = a[n], !e(t[o], i[o])) return !1;
                return !0
            }
        }
        var i = fabric.util.object.extend;
        fabric.util.object.extend(fabric.Object.prototype, {
            hasStateChanged: function(t) {
                var i = "_" + (t = t || "stateProperties");
                return Object.keys(this[i]).length < this[t].length || !e(this[i], this, !0)
            },
            saveState: function(e) {
                var i = e && e.propertySet || "stateProperties",
                    r = "_" + i;
                return this[r] ? (t(this, r, this[i]), e && e.stateProperties && t(this, r, e.stateProperties), this) : this.setupState(e)
            },
            setupState: function(t) {
                var e = (t = t || {}).propertySet || "stateProperties";
                return t.propertySet = e, this["_" + e] = {}, this.saveState(t), this
            }
        })
    }(),
    function() {
        var t = fabric.util.degreesToRadians;
        fabric.util.object.extend(fabric.Object.prototype, {
            _controlsVisibility: null,
            _findTargetCorner: function(t) {
                if (!this.hasControls || this.group || !this.canvas || this.canvas._activeObject !== this) return !1;
                var e, i, r = t.x,
                    n = t.y;
                this.__corner = 0;
                for (var s in this.oCoords)
                    if (this.isControlVisible(s) && ("mtr" !== s || this.hasRotatingPoint) && (!this.get("lockUniScaling") || "mt" !== s && "mr" !== s && "mb" !== s && "ml" !== s) && (i = this._getImageLines(this.oCoords[s].corner), 0 !== (e = this._findCrossPoints({
                        x: r,
                        y: n
                    }, i)) && e % 2 == 1)) return this.__corner = s, s;
                return !1
            },
            _setCornerCoords: function() {
                var e, i, r = this.oCoords,
                    n = t(45 - this.angle),
                    s = .707106 * this.cornerSize,
                    o = s * Math.cos(n),
                    a = s * Math.sin(n);
                for (var h in r) e = r[h].x, i = r[h].y, r[h].corner = {
                    tl: {
                        x: e - a,
                        y: i - o
                    },
                    tr: {
                        x: e + o,
                        y: i - a
                    },
                    bl: {
                        x: e - o,
                        y: i + a
                    },
                    br: {
                        x: e + a,
                        y: i + o
                    }
                }
            },
            drawSelectionBackground: function(e) {
                if (!this.selectionBackgroundColor || this.canvas && !this.canvas.interactive || this.canvas && this.canvas._activeObject !== this) return this;
                e.save();
                var i = this.getCenterPoint(),
                    r = this._calculateCurrentDimensions(),
                    n = this.canvas.viewportTransform;
                return e.translate(i.x, i.y), e.scale(1 / n[0], 1 / n[3]), e.rotate(t(this.angle)), e.fillStyle = this.selectionBackgroundColor, e.fillRect(-r.x / 2, -r.y / 2, r.x, r.y), e.restore(), this
            },
            drawBorders: function(t, e) {
                e = e || {};
                var i = this._calculateCurrentDimensions(),
                    r = 1 / this.borderScaleFactor,
                    n = i.x + r,
                    s = i.y + r,
                    o = void 0 !== e.hasRotatingPoint ? e.hasRotatingPoint : this.hasRotatingPoint,
                    a = void 0 !== e.hasControls ? e.hasControls : this.hasControls,
                    h = void 0 !== e.rotatingPointOffset ? e.rotatingPointOffset : this.rotatingPointOffset;
                if (t.save(), t.strokeStyle = e.borderColor || this.borderColor, this._setLineDash(t, e.borderDashArray || this.borderDashArray, null), t.strokeRect(-n / 2, -s / 2, n, s), o && this.isControlVisible("mtr") && a) {
                    var c = -s / 2;
                    t.beginPath(), t.moveTo(0, c), t.lineTo(0, c - h), t.closePath(), t.stroke()
                }
                return t.restore(), this
            },
            drawBordersInGroup: function(t, e, i) {
                i = i || {};
                var r = this._getNonTransformedDimensions(),
                    n = fabric.util.customTransformMatrix(e.scaleX, e.scaleY, e.skewX),
                    s = fabric.util.transformPoint(r, n),
                    o = 1 / this.borderScaleFactor,
                    a = s.x + o,
                    h = s.y + o;
                return t.save(), this._setLineDash(t, i.borderDashArray || this.borderDashArray, null), t.strokeStyle = i.borderColor || this.borderColor, t.strokeRect(-a / 2, -h / 2, a, h), t.restore(), this
            },
            drawControls: function(t, e) {
                e = e || {};
                var i = this._calculateCurrentDimensions(),
                    r = i.x,
                    n = i.y,
                    s = e.cornerSize || this.cornerSize,
                    o = -(r + s) / 2,
                    a = -(n + s) / 2,
                    h = void 0 !== e.transparentCorners ? e.transparentCorners : this.transparentCorners,
                    c = void 0 !== e.hasRotatingPoint ? e.hasRotatingPoint : this.hasRotatingPoint,
                    l = h ? "stroke" : "fill";
                return t.save(), t.strokeStyle = t.fillStyle = e.cornerColor || this.cornerColor, this.transparentCorners || (t.strokeStyle = e.cornerStrokeColor || this.cornerStrokeColor), this._setLineDash(t, e.cornerDashArray || this.cornerDashArray, null), this._drawControl("tl", t, l, o, a, e), this._drawControl("tr", t, l, o + r, a, e), this._drawControl("bl", t, l, o, a + n, e), this._drawControl("br", t, l, o + r, a + n, e), this.get("lockUniScaling") || (this._drawControl("mt", t, l, o + r / 2, a, e), this._drawControl("mb", t, l, o + r / 2, a + n, e), this._drawControl("mr", t, l, o + r, a + n / 2, e), this._drawControl("ml", t, l, o, a + n / 2, e)), c && this._drawControl("mtr", t, l, o + r / 2, a - this.rotatingPointOffset, e), t.restore(), this
            },
            _drawControl: function(t, e, i, r, n, s) {
                if (s = s || {}, this.isControlVisible(t)) {
                    var o = this.cornerSize,
                        a = !this.transparentCorners && this.cornerStrokeColor;
                    switch (s.cornerStyle || this.cornerStyle) {
                        case "circle":
                            e.beginPath(), e.arc(r + o / 2, n + o / 2, o / 2, 0, 2 * Math.PI, !1), e[i](), a && e.stroke();
                            break;
                        default:
                            this.transparentCorners || e.clearRect(r, n, o, o), e[i + "Rect"](r, n, o, o), a && e.strokeRect(r, n, o, o)
                    }
                }
            },
            isControlVisible: function(t) {
                return this._getControlsVisibility()[t]
            },
            setControlVisible: function(t, e) {
                return this._getControlsVisibility()[t] = e, this
            },
            setControlsVisibility: function(t) {
                t || (t = {});
                for (var e in t) this.setControlVisible(e, t[e]);
                return this
            },
            _getControlsVisibility: function() {
                return this._controlsVisibility || (this._controlsVisibility = {
                    tl: !0,
                    tr: !0,
                    br: !0,
                    bl: !0,
                    ml: !0,
                    mt: !0,
                    mr: !0,
                    mb: !0,
                    mtr: !0
                }), this._controlsVisibility
            },
            onDeselect: function() {},
            onSelect: function() {}
        })
    }(), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
        FX_DURATION: 500,
        fxCenterObjectH: function(t, e) {
            var i = function() {},
                r = (e = e || {}).onComplete || i,
                n = e.onChange || i,
                s = this;
            return fabric.util.animate({
                startValue: t.left,
                endValue: this.getCenter().left,
                duration: this.FX_DURATION,
                onChange: function(e) {
                    t.set("left", e), s.requestRenderAll(), n()
                },
                onComplete: function() {
                    t.setCoords(), r()
                }
            }), this
        },
        fxCenterObjectV: function(t, e) {
            var i = function() {},
                r = (e = e || {}).onComplete || i,
                n = e.onChange || i,
                s = this;
            return fabric.util.animate({
                startValue: t.top,
                endValue: this.getCenter().top,
                duration: this.FX_DURATION,
                onChange: function(e) {
                    t.set("top", e), s.requestRenderAll(), n()
                },
                onComplete: function() {
                    t.setCoords(), r()
                }
            }), this
        },
        fxRemove: function(t, e) {
            var i = function() {},
                r = (e = e || {}).onComplete || i,
                n = e.onChange || i,
                s = this;
            return fabric.util.animate({
                startValue: t.opacity,
                endValue: 0,
                duration: this.FX_DURATION,
                onChange: function(e) {
                    t.set("opacity", e), s.requestRenderAll(), n()
                },
                onComplete: function() {
                    s.remove(t), r()
                }
            }), this
        }
    }), fabric.util.object.extend(fabric.Object.prototype, {
        animate: function() {
            if (arguments[0] && "object" == typeof arguments[0]) {
                var t, e, i = [];
                for (t in arguments[0]) i.push(t);
                for (var r = 0, n = i.length; r < n; r++) t = i[r], e = r !== n - 1, this._animate(t, arguments[0][t], arguments[1], e)
            } else this._animate.apply(this, arguments);
            return this
        },
        _animate: function(t, e, i, r) {
            var n, s = this;
            e = e.toString(), i = i ? fabric.util.object.clone(i) : {}, ~t.indexOf(".") && (n = t.split("."));
            var o = n ? this.get(n[0])[n[1]] : this.get(t);
            "from" in i || (i.from = o), e = ~e.indexOf("=") ? o + parseFloat(e.replace("=", "")) : parseFloat(e), fabric.util.animate({
                startValue: i.from,
                endValue: e,
                byValue: i.by,
                easing: i.easing,
                duration: i.duration,
                abort: i.abort && function() {
                    return i.abort.call(s)
                },
                onChange: function(e, o, a) {
                    n ? s[n[0]][n[1]] = e : s.set(t, e), r || i.onChange && i.onChange(e, o, a)
                },
                onComplete: function(t, e, n) {
                    r || (s.setCoords(), i.onComplete && i.onComplete(t, e, n))
                }
            })
        }
    }),
    function(t) {
        "use strict";

        function e(t, e) {
            var i = t.origin,
                r = t.axis1,
                n = t.axis2,
                s = t.dimension,
                o = e.nearest,
                a = e.center,
                h = e.farthest;
            return function() {
                switch (this.get(i)) {
                    case o:
                        return Math.min(this.get(r), this.get(n));
                    case a:
                        return Math.min(this.get(r), this.get(n)) + .5 * this.get(s);
                    case h:
                        return Math.max(this.get(r), this.get(n))
                }
            }
        }
        var i = t.fabric || (t.fabric = {}),
            r = i.util.object.extend,
            n = i.util.object.clone,
            s = {
                x1: 1,
                x2: 1,
                y1: 1,
                y2: 1
            },
            o = i.StaticCanvas.supports("setLineDash");
        i.Line ? i.warn("fabric.Line is already defined") : (i.Line = i.util.createClass(i.Object, {
            type: "line",
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 0,
            cacheProperties: i.Object.prototype.cacheProperties.concat("x1", "x2", "y1", "y2"),
            initialize: function(t, e) {
                t || (t = [0, 0, 0, 0]), this.callSuper("initialize", e), this.set("x1", t[0]), this.set("y1", t[1]), this.set("x2", t[2]), this.set("y2", t[3]), this._setWidthHeight(e)
            },
            _setWidthHeight: function(t) {
                t || (t = {}), this.width = Math.abs(this.x2 - this.x1), this.height = Math.abs(this.y2 - this.y1), this.left = "left" in t ? t.left : this._getLeftToOriginX(), this.top = "top" in t ? t.top : this._getTopToOriginY()
            },
            _set: function(t, e) {
                return this.callSuper("_set", t, e), void 0 !== s[t] && this._setWidthHeight(), this
            },
            _getLeftToOriginX: e({
                origin: "originX",
                axis1: "x1",
                axis2: "x2",
                dimension: "width"
            }, {
                nearest: "left",
                center: "center",
                farthest: "right"
            }),
            _getTopToOriginY: e({
                origin: "originY",
                axis1: "y1",
                axis2: "y2",
                dimension: "height"
            }, {
                nearest: "top",
                center: "center",
                farthest: "bottom"
            }),
            _render: function(t) {
                if (t.beginPath(), !this.strokeDashArray || this.strokeDashArray && o) {
                    var e = this.calcLinePoints();
                    t.moveTo(e.x1, e.y1), t.lineTo(e.x2, e.y2)
                }
                t.lineWidth = this.strokeWidth;
                var i = t.strokeStyle;
                t.strokeStyle = this.stroke || t.fillStyle, this.stroke && this._renderStroke(t), t.strokeStyle = i
            },
            _renderDashedStroke: function(t) {
                var e = this.calcLinePoints();
                t.beginPath(), i.util.drawDashedLine(t, e.x1, e.y1, e.x2, e.y2, this.strokeDashArray), t.closePath()
            },
            _findCenterFromElement: function() {
                return {
                    x: (this.x1 + this.x2) / 2,
                    y: (this.y1 + this.y2) / 2
                }
            },
            toObject: function(t) {
                return r(this.callSuper("toObject", t), this.calcLinePoints())
            },
            _getNonTransformedDimensions: function() {
                var t = this.callSuper("_getNonTransformedDimensions");
                return "butt" === this.strokeLineCap && (0 === this.width && (t.y -= this.strokeWidth), 0 === this.height && (t.x -= this.strokeWidth)), t
            },
            calcLinePoints: function() {
                var t = this.x1 <= this.x2 ? -1 : 1,
                    e = this.y1 <= this.y2 ? -1 : 1,
                    i = t * this.width * .5,
                    r = e * this.height * .5;
                return {
                    x1: i,
                    x2: t * this.width * -.5,
                    y1: r,
                    y2: e * this.height * -.5
                }
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup(),
                    i = this.calcLinePoints();
                return e.push("<line ", this.getSvgId(), 'x1="', i.x1, '" y1="', i.y1, '" x2="', i.x2, '" y2="', i.y2, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"/>\n'), t ? t(e.join("")) : e.join("")
            }
        }), i.Line.ATTRIBUTE_NAMES = i.SHARED_ATTRIBUTES.concat("x1 y1 x2 y2".split(" ")), i.Line.fromElement = function(t, e, n) {
            n = n || {};
            var s = i.parseAttributes(t, i.Line.ATTRIBUTE_NAMES),
                o = [s.x1 || 0, s.y1 || 0, s.x2 || 0, s.y2 || 0];
            e(new i.Line(o, r(s, n)))
        }, i.Line.fromObject = function(t, e) {
            var r = n(t, !0);
            r.points = [t.x1, t.y1, t.x2, t.y2], i.Object._fromObject("Line", r, function(t) {
                delete t.points, e && e(t)
            }, "points")
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";

        function e(t) {
            return "radius" in t && t.radius >= 0
        }
        var i = t.fabric || (t.fabric = {}),
            r = Math.PI,
            n = i.util.object.extend;
        i.Circle ? i.warn("fabric.Circle is already defined.") : (i.Circle = i.util.createClass(i.Object, {
            type: "circle",
            radius: 0,
            startAngle: 0,
            endAngle: 2 * r,
            cacheProperties: i.Object.prototype.cacheProperties.concat("radius"),
            initialize: function(t) {
                this.callSuper("initialize", t), this.set("radius", t && t.radius || 0)
            },
            _set: function(t, e) {
                return this.callSuper("_set", t, e), "radius" === t && this.setRadius(e), this
            },
            toObject: function(t) {
                return this.callSuper("toObject", ["radius", "startAngle", "endAngle"].concat(t))
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup(),
                    i = (this.endAngle - this.startAngle) % (2 * r);
                if (0 === i) e.push("<circle ", this.getSvgId(), 'cx="0" cy="0" ', 'r="', this.radius, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"', this.addPaintOrder(), "/>\n");
                else {
                    var n = Math.cos(this.startAngle) * this.radius,
                        s = Math.sin(this.startAngle) * this.radius,
                        o = Math.cos(this.endAngle) * this.radius,
                        a = Math.sin(this.endAngle) * this.radius,
                        h = i > r ? "1" : "0";
                    e.push('<path d="M ' + n + " " + s, " A " + this.radius + " " + this.radius, " 0 ", +h + " 1", " " + o + " " + a, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"', this.addPaintOrder(), '"/>\n')
                }
                return t ? t(e.join("")) : e.join("")
            },
            _render: function(t) {
                t.beginPath(), t.arc(0, 0, this.radius, this.startAngle, this.endAngle, !1), this._renderPaintInOrder(t)
            },
            getRadiusX: function() {
                return this.get("radius") * this.get("scaleX")
            },
            getRadiusY: function() {
                return this.get("radius") * this.get("scaleY")
            },
            setRadius: function(t) {
                return this.radius = t, this.set("width", 2 * t).set("height", 2 * t)
            }
        }), i.Circle.ATTRIBUTE_NAMES = i.SHARED_ATTRIBUTES.concat("cx cy r".split(" ")), i.Circle.fromElement = function(t, r, s) {
            s || (s = {});
            var o = i.parseAttributes(t, i.Circle.ATTRIBUTE_NAMES);
            if (!e(o)) throw new Error("value of `r` attribute is required and can not be negative");
            o.left = (o.left || 0) - o.radius, o.top = (o.top || 0) - o.radius, r(new i.Circle(n(o, s)))
        }, i.Circle.fromObject = function(t, e) {
            return i.Object._fromObject("Circle", t, e)
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {});
        e.Triangle ? e.warn("fabric.Triangle is already defined") : (e.Triangle = e.util.createClass(e.Object, {
            type: "triangle",
            initialize: function(t) {
                this.callSuper("initialize", t), this.set("width", t && t.width || 100).set("height", t && t.height || 100)
            },
            _render: function(t) {
                var e = this.width / 2,
                    i = this.height / 2;
                t.beginPath(), t.moveTo(-e, i), t.lineTo(0, -i), t.lineTo(e, i), t.closePath(), this._renderPaintInOrder(t)
            },
            _renderDashedStroke: function(t) {
                var i = this.width / 2,
                    r = this.height / 2;
                t.beginPath(), e.util.drawDashedLine(t, -i, r, 0, -r, this.strokeDashArray), e.util.drawDashedLine(t, 0, -r, i, r, this.strokeDashArray), e.util.drawDashedLine(t, i, r, -i, r, this.strokeDashArray), t.closePath()
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup(),
                    i = this.width / 2,
                    r = this.height / 2,
                    n = [-i + " " + r, "0 " + -r, i + " " + r].join(",");
                return e.push("<polygon ", this.getSvgId(), 'points="', n, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), '"', this.addPaintOrder(), "/>"), t ? t(e.join("")) : e.join("")
            }
        }), e.Triangle.fromObject = function(t, i) {
            return e.Object._fromObject("Triangle", t, i)
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = 2 * Math.PI,
            r = e.util.object.extend;
        e.Ellipse ? e.warn("fabric.Ellipse is already defined.") : (e.Ellipse = e.util.createClass(e.Object, {
            type: "ellipse",
            rx: 0,
            ry: 0,
            cacheProperties: e.Object.prototype.cacheProperties.concat("rx", "ry"),
            initialize: function(t) {
                this.callSuper("initialize", t), this.set("rx", t && t.rx || 0), this.set("ry", t && t.ry || 0)
            },
            _set: function(t, e) {
                switch (this.callSuper("_set", t, e), t) {
                    case "rx":
                        this.rx = e, this.set("width", 2 * e);
                        break;
                    case "ry":
                        this.ry = e, this.set("height", 2 * e)
                }
                return this
            },
            getRx: function() {
                return this.get("rx") * this.get("scaleX")
            },
            getRy: function() {
                return this.get("ry") * this.get("scaleY")
            },
            toObject: function(t) {
                return this.callSuper("toObject", ["rx", "ry"].concat(t))
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup();
                return e.push("<ellipse ", this.getSvgId(), 'cx="0" cy="0" ', 'rx="', this.rx, '" ry="', this.ry, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"', this.addPaintOrder(), "/>\n"), t ? t(e.join("")) : e.join("")
            },
            _render: function(t) {
                t.beginPath(), t.save(), t.transform(1, 0, 0, this.ry / this.rx, 0, 0), t.arc(0, 0, this.rx, 0, i, !1), t.restore(), this._renderPaintInOrder(t)
            }
        }), e.Ellipse.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat("cx cy rx ry".split(" ")), e.Ellipse.fromElement = function(t, i, n) {
            n || (n = {});
            var s = e.parseAttributes(t, e.Ellipse.ATTRIBUTE_NAMES);
            s.left = (s.left || 0) - s.rx, s.top = (s.top || 0) - s.ry, i(new e.Ellipse(r(s, n)))
        }, e.Ellipse.fromObject = function(t, i) {
            return e.Object._fromObject("Ellipse", t, i)
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend;
        e.Rect ? e.warn("fabric.Rect is already defined") : (e.Rect = e.util.createClass(e.Object, {
            stateProperties: e.Object.prototype.stateProperties.concat("rx", "ry"),
            type: "rect",
            rx: 0,
            ry: 0,
            cacheProperties: e.Object.prototype.cacheProperties.concat("rx", "ry"),
            initialize: function(t) {
                this.callSuper("initialize", t), this._initRxRy()
            },
            _initRxRy: function() {
                this.rx && !this.ry ? this.ry = this.rx : this.ry && !this.rx && (this.rx = this.ry)
            },
            _render: function(t) {
                if (1 !== this.width || 1 !== this.height) {
                    var e = this.rx ? Math.min(this.rx, this.width / 2) : 0,
                        i = this.ry ? Math.min(this.ry, this.height / 2) : 0,
                        r = this.width,
                        n = this.height,
                        s = -this.width / 2,
                        o = -this.height / 2,
                        a = 0 !== e || 0 !== i,
                        h = .4477152502;
                    t.beginPath(), t.moveTo(s + e, o), t.lineTo(s + r - e, o), a && t.bezierCurveTo(s + r - h * e, o, s + r, o + h * i, s + r, o + i), t.lineTo(s + r, o + n - i), a && t.bezierCurveTo(s + r, o + n - h * i, s + r - h * e, o + n, s + r - e, o + n), t.lineTo(s + e, o + n), a && t.bezierCurveTo(s + h * e, o + n, s, o + n - h * i, s, o + n - i), t.lineTo(s, o + i), a && t.bezierCurveTo(s, o + h * i, s + h * e, o, s + e, o), t.closePath(), this._renderPaintInOrder(t)
                } else t.fillRect(-.5, -.5, 1, 1)
            },
            _renderDashedStroke: function(t) {
                var i = -this.width / 2,
                    r = -this.height / 2,
                    n = this.width,
                    s = this.height;
                t.beginPath(), e.util.drawDashedLine(t, i, r, i + n, r, this.strokeDashArray), e.util.drawDashedLine(t, i + n, r, i + n, r + s, this.strokeDashArray), e.util.drawDashedLine(t, i + n, r + s, i, r + s, this.strokeDashArray), e.util.drawDashedLine(t, i, r + s, i, r, this.strokeDashArray), t.closePath()
            },
            toObject: function(t) {
                return this.callSuper("toObject", ["rx", "ry"].concat(t))
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup(),
                    i = -this.width / 2,
                    r = -this.height / 2;
                return e.push("<rect ", this.getSvgId(), 'x="', i, '" y="', r, '" rx="', this.get("rx"), '" ry="', this.get("ry"), '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"', this.addPaintOrder(), "/>\n"), t ? t(e.join("")) : e.join("")
            }
        }), e.Rect.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat("x y rx ry width height".split(" ")), e.Rect.fromElement = function(t, r, n) {
            if (!t) return r(null);
            n = n || {};
            var s = e.parseAttributes(t, e.Rect.ATTRIBUTE_NAMES);
            s.left = s.left || 0, s.top = s.top || 0;
            var o = new e.Rect(i(n ? e.util.object.clone(n) : {}, s));
            o.visible = o.visible && o.width > 0 && o.height > 0, r(o)
        }, e.Rect.fromObject = function(t, i) {
            return e.Object._fromObject("Rect", t, i)
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend,
            r = e.util.array.min,
            n = e.util.array.max,
            s = e.util.toFixed,
            o = e.Object.NUM_FRACTION_DIGITS;
        e.Polyline ? e.warn("fabric.Polyline is already defined") : (e.Polyline = e.util.createClass(e.Object, {
            type: "polyline",
            points: null,
            cacheProperties: e.Object.prototype.cacheProperties.concat("points"),
            initialize: function(t, e) {
                e = e || {}, this.points = t || [], this.callSuper("initialize", e);
                var i = this._calcDimensions();
                void 0 === e.left && (this.left = i.left), void 0 === e.top && (this.top = i.top), this.width = i.width, this.height = i.height, this.pathOffset = {
                    x: i.left + this.width / 2,
                    y: i.top + this.height / 2
                }
            },
            _calcDimensions: function() {
                var t = this.points,
                    e = r(t, "x") || 0,
                    i = r(t, "y") || 0;
                return {
                    left: e,
                    top: i,
                    width: (n(t, "x") || 0) - e,
                    height: (n(t, "y") || 0) - i
                }
            },
            toObject: function(t) {
                return i(this.callSuper("toObject", t), {
                    points: this.points.concat()
                })
            },
            toSVG: function(t) {
                for (var e = [], i = this.pathOffset.x, r = this.pathOffset.y, n = this._createBaseSVGMarkup(), a = 0, h = this.points.length; a < h; a++) e.push(s(this.points[a].x - i, o), ",", s(this.points[a].y - r, o), " ");
                return n.push("<", this.type, " ", this.getSvgId(), 'points="', e.join(""), '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), " ", this.getSvgTransformMatrix(), '"', this.addPaintOrder(), "/>\n"), t ? t(n.join("")) : n.join("")
            },
            commonRender: function(t) {
                var e, i = this.points.length,
                    r = this.pathOffset.x,
                    n = this.pathOffset.y;
                if (!i || isNaN(this.points[i - 1].y)) return !1;
                t.beginPath(), t.moveTo(this.points[0].x - r, this.points[0].y - n);
                for (var s = 0; s < i; s++) e = this.points[s], t.lineTo(e.x - r, e.y - n);
                return !0
            },
            _render: function(t) {
                this.commonRender(t) && this._renderPaintInOrder(t)
            },
            _renderDashedStroke: function(t) {
                var i, r;
                t.beginPath();
                for (var n = 0, s = this.points.length; n < s; n++) i = this.points[n], r = this.points[n + 1] || i, e.util.drawDashedLine(t, i.x, i.y, r.x, r.y, this.strokeDashArray)
            },
            complexity: function() {
                return this.get("points").length
            }
        }), e.Polyline.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(), e.Polyline.fromElement = function(t, i, r) {
            if (!t) return i(null);
            r || (r = {});
            var n = e.parsePointsAttribute(t.getAttribute("points")),
                s = e.parseAttributes(t, e.Polyline.ATTRIBUTE_NAMES);
            i(new e.Polyline(n, e.util.object.extend(s, r)))
        }, e.Polyline.fromObject = function(t, i) {
            return e.Object._fromObject("Polyline", t, i, "points")
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend;
        e.Polygon ? e.warn("fabric.Polygon is already defined") : (e.Polygon = e.util.createClass(e.Polyline, {
            type: "polygon",
            _render: function(t) {
                this.commonRender(t) && (t.closePath(), this._renderPaintInOrder(t))
            },
            _renderDashedStroke: function(t) {
                this.callSuper("_renderDashedStroke", t), t.closePath()
            }
        }), e.Polygon.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(), e.Polygon.fromElement = function(t, r, n) {
            if (!t) return r(null);
            n || (n = {});
            var s = e.parsePointsAttribute(t.getAttribute("points")),
                o = e.parseAttributes(t, e.Polygon.ATTRIBUTE_NAMES);
            r(new e.Polygon(s, i(o, n)))
        }, e.Polygon.fromObject = function(t, i) {
            return e.Object._fromObject("Polygon", t, i, "points")
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.array.min,
            r = e.util.array.max,
            n = e.util.object.extend,
            s = Object.prototype.toString,
            o = e.util.drawArc,
            a = {
                m: 2,
                l: 2,
                h: 1,
                v: 1,
                c: 6,
                s: 4,
                q: 4,
                t: 2,
                a: 7
            },
            h = {
                m: "l",
                M: "L"
            };
        e.Path ? e.warn("fabric.Path is already defined") : (e.Path = e.util.createClass(e.Object, {
            type: "path",
            path: null,
            cacheProperties: e.Object.prototype.cacheProperties.concat("path", "fillRule"),
            stateProperties: e.Object.prototype.stateProperties.concat("path"),
            initialize: function(t, e) {
                e = e || {}, this.callSuper("initialize", e), t || (t = []);
                var i = "[object Array]" === s.call(t);
                this.path = i ? t : t.match && t.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi), this.path && (i || (this.path = this._parsePath()), this._setPositionDimensions(e))
            },
            _setPositionDimensions: function(t) {
                var e = this._parseDimensions();
                this.width = e.width, this.height = e.height, void 0 === t.left && (this.left = e.left), void 0 === t.top && (this.top = e.top), this.pathOffset = this.pathOffset || {
                    x: e.left + this.width / 2,
                    y: e.top + this.height / 2
                }
            },
            _renderPathCommands: function(t) {
                var e, i, r, n = null,
                    s = 0,
                    a = 0,
                    h = 0,
                    c = 0,
                    l = 0,
                    u = 0,
                    f = -this.pathOffset.x,
                    d = -this.pathOffset.y;
                t.beginPath();
                for (var g = 0, p = this.path.length; g < p; ++g) {
                    switch ((e = this.path[g])[0]) {
                        case "l":
                            h += e[1], c += e[2], t.lineTo(h + f, c + d);
                            break;
                        case "L":
                            h = e[1], c = e[2], t.lineTo(h + f, c + d);
                            break;
                        case "h":
                            h += e[1], t.lineTo(h + f, c + d);
                            break;
                        case "H":
                            h = e[1], t.lineTo(h + f, c + d);
                            break;
                        case "v":
                            c += e[1], t.lineTo(h + f, c + d);
                            break;
                        case "V":
                            c = e[1], t.lineTo(h + f, c + d);
                            break;
                        case "m":
                            s = h += e[1], a = c += e[2], t.moveTo(h + f, c + d);
                            break;
                        case "M":
                            s = h = e[1], a = c = e[2], t.moveTo(h + f, c + d);
                            break;
                        case "c":
                            i = h + e[5], r = c + e[6], l = h + e[3], u = c + e[4], t.bezierCurveTo(h + e[1] + f, c + e[2] + d, l + f, u + d, i + f, r + d), h = i, c = r;
                            break;
                        case "C":
                            h = e[5], c = e[6], l = e[3], u = e[4], t.bezierCurveTo(e[1] + f, e[2] + d, l + f, u + d, h + f, c + d);
                            break;
                        case "s":
                            i = h + e[3], r = c + e[4], null === n[0].match(/[CcSs]/) ? (l = h, u = c) : (l = 2 * h - l, u = 2 * c - u), t.bezierCurveTo(l + f, u + d, h + e[1] + f, c + e[2] + d, i + f, r + d), l = h + e[1], u = c + e[2], h = i, c = r;
                            break;
                        case "S":
                            i = e[3], r = e[4], null === n[0].match(/[CcSs]/) ? (l = h, u = c) : (l = 2 * h - l, u = 2 * c - u), t.bezierCurveTo(l + f, u + d, e[1] + f, e[2] + d, i + f, r + d), h = i, c = r, l = e[1], u = e[2];
                            break;
                        case "q":
                            i = h + e[3], r = c + e[4], l = h + e[1], u = c + e[2], t.quadraticCurveTo(l + f, u + d, i + f, r + d), h = i, c = r;
                            break;
                        case "Q":
                            i = e[3], r = e[4], t.quadraticCurveTo(e[1] + f, e[2] + d, i + f, r + d), h = i, c = r, l = e[1], u = e[2];
                            break;
                        case "t":
                            i = h + e[1], r = c + e[2], null === n[0].match(/[QqTt]/) ? (l = h, u = c) : (l = 2 * h - l, u = 2 * c - u), t.quadraticCurveTo(l + f, u + d, i + f, r + d), h = i, c = r;
                            break;
                        case "T":
                            i = e[1], r = e[2], null === n[0].match(/[QqTt]/) ? (l = h, u = c) : (l = 2 * h - l, u = 2 * c - u), t.quadraticCurveTo(l + f, u + d, i + f, r + d), h = i, c = r;
                            break;
                        case "a":
                            o(t, h + f, c + d, [e[1], e[2], e[3], e[4], e[5], e[6] + h + f, e[7] + c + d]), h += e[6], c += e[7];
                            break;
                        case "A":
                            o(t, h + f, c + d, [e[1], e[2], e[3], e[4], e[5], e[6] + f, e[7] + d]), h = e[6], c = e[7];
                            break;
                        case "z":
                        case "Z":
                            h = s, c = a, t.closePath()
                    }
                    n = e
                }
            },
            _render: function(t) {
                this._renderPathCommands(t), this._renderPaintInOrder(t)
            },
            toString: function() {
                return "#<fabric.Path (" + this.complexity() + '): { "top": ' + this.top + ', "left": ' + this.left + " }>"
            },
            toObject: function(t) {
                return n(this.callSuper("toObject", t), {
                    path: this.path.map(function(t) {
                        return t.slice()
                    }),
                    top: this.top,
                    left: this.left
                })
            },
            toDatalessObject: function(t) {
                var e = this.toObject(["sourcePath"].concat(t));
                return e.sourcePath && delete e.path, e
            },
            toSVG: function(t) {
                for (var e = [], i = this._createBaseSVGMarkup(), r = "", n = 0, s = this.path.length; n < s; n++) e.push(this.path[n].join(" "));
                var o = e.join(" ");
                return r = " translate(" + -this.pathOffset.x + ", " + -this.pathOffset.y + ") ", i.push("<path ", this.getSvgId(), 'd="', o, '" style="', this.getSvgStyles(), '" transform="', this.getSvgTransform(), r, this.getSvgTransformMatrix(), '" stroke-linecap="round" ', this.addPaintOrder(), "/>\n"), t ? t(i.join("")) : i.join("")
            },
            complexity: function() {
                return this.path.length
            },
            _parsePath: function() {
                for (var t, e, i, r, n, s = [], o = [], c = /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:e[-+]?\d+)?)/gi, l = 0, u = this.path.length; l < u; l++) {
                    for (r = (t = this.path[l]).slice(1).trim(), o.length = 0; i = c.exec(r);) o.push(i[0]);
                    n = [t.charAt(0)];
                    for (var f = 0, d = o.length; f < d; f++) e = parseFloat(o[f]), isNaN(e) || n.push(e);
                    var g = n[0],
                        p = a[g.toLowerCase()],
                        v = h[g] || g;
                    if (n.length - 1 > p)
                        for (var m = 1, b = n.length; m < b; m += p) s.push([g].concat(n.slice(m, m + p))), g = v;
                    else s.push(n)
                }
                return s
            },
            _parseDimensions: function() {
                for (var t, n, s, o, a = [], h = [], c = null, l = 0, u = 0, f = 0, d = 0, g = 0, p = 0, v = 0, m = this.path.length; v < m; ++v) {
                    switch ((t = this.path[v])[0]) {
                        case "l":
                            f += t[1], d += t[2], o = [];
                            break;
                        case "L":
                            f = t[1], d = t[2], o = [];
                            break;
                        case "h":
                            f += t[1], o = [];
                            break;
                        case "H":
                            f = t[1], o = [];
                            break;
                        case "v":
                            d += t[1], o = [];
                            break;
                        case "V":
                            d = t[1], o = [];
                            break;
                        case "m":
                            l = f += t[1], u = d += t[2], o = [];
                            break;
                        case "M":
                            l = f = t[1], u = d = t[2], o = [];
                            break;
                        case "c":
                            n = f + t[5], s = d + t[6], g = f + t[3], p = d + t[4], o = e.util.getBoundsOfCurve(f, d, f + t[1], d + t[2], g, p, n, s), f = n, d = s;
                            break;
                        case "C":
                            g = t[3], p = t[4], o = e.util.getBoundsOfCurve(f, d, t[1], t[2], g, p, t[5], t[6]), f = t[5], d = t[6];
                            break;
                        case "s":
                            n = f + t[3], s = d + t[4], null === c[0].match(/[CcSs]/) ? (g = f, p = d) : (g = 2 * f - g, p = 2 * d - p), o = e.util.getBoundsOfCurve(f, d, g, p, f + t[1], d + t[2], n, s), g = f + t[1], p = d + t[2], f = n, d = s;
                            break;
                        case "S":
                            n = t[3], s = t[4], null === c[0].match(/[CcSs]/) ? (g = f, p = d) : (g = 2 * f - g, p = 2 * d - p), o = e.util.getBoundsOfCurve(f, d, g, p, t[1], t[2], n, s), f = n, d = s, g = t[1], p = t[2];
                            break;
                        case "q":
                            n = f + t[3], s = d + t[4], g = f + t[1], p = d + t[2], o = e.util.getBoundsOfCurve(f, d, g, p, g, p, n, s), f = n, d = s;
                            break;
                        case "Q":
                            g = t[1], p = t[2], o = e.util.getBoundsOfCurve(f, d, g, p, g, p, t[3], t[4]), f = t[3], d = t[4];
                            break;
                        case "t":
                            n = f + t[1], s = d + t[2], null === c[0].match(/[QqTt]/) ? (g = f, p = d) : (g = 2 * f - g, p = 2 * d - p), o = e.util.getBoundsOfCurve(f, d, g, p, g, p, n, s), f = n, d = s;
                            break;
                        case "T":
                            n = t[1], s = t[2], null === c[0].match(/[QqTt]/) ? (g = f, p = d) : (g = 2 * f - g, p = 2 * d - p), o = e.util.getBoundsOfCurve(f, d, g, p, g, p, n, s), f = n, d = s;
                            break;
                        case "a":
                            o = e.util.getBoundsOfArc(f, d, t[1], t[2], t[3], t[4], t[5], t[6] + f, t[7] + d), f += t[6], d += t[7];
                            break;
                        case "A":
                            o = e.util.getBoundsOfArc(f, d, t[1], t[2], t[3], t[4], t[5], t[6], t[7]), f = t[6], d = t[7];
                            break;
                        case "z":
                        case "Z":
                            f = l, d = u
                    }
                    c = t, o.forEach(function(t) {
                        a.push(t.x), h.push(t.y)
                    }), a.push(f), h.push(d)
                }
                var b = i(a) || 0,
                    _ = i(h) || 0;
                return {
                    left: b,
                    top: _,
                    width: (r(a) || 0) - b,
                    height: (r(h) || 0) - _
                }
            }
        }), e.Path.fromObject = function(t, i) {
            if ("string" == typeof t.sourcePath) {
                var r = t.sourcePath;
                e.loadSVGFromURL(r, function(e) {
                    var r = e[0];
                    r.setOptions(t), i && i(r)
                })
            } else e.Object._fromObject("Path", t, i, "path")
        }, e.Path.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(["d"]), e.Path.fromElement = function(t, i, r) {
            var s = e.parseAttributes(t, e.Path.ATTRIBUTE_NAMES);
            i(new e.Path(s.d, n(s, r)))
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend,
            r = e.util.array.min,
            n = e.util.array.max;
        e.Group || (e.Group = e.util.createClass(e.Object, e.Collection, {
            type: "group",
            strokeWidth: 0,
            subTargetCheck: !1,
            cacheProperties: [],
            useSetOnGroup: !1,
            initialize: function(t, e, i) {
                e = e || {}, this._objects = [], i && this.callSuper("initialize", e), this._objects = t || [];
                for (var r = this._objects.length; r--;) this._objects[r].group = this;
                if (e.originX && (this.originX = e.originX), e.originY && (this.originY = e.originY), i) this._updateObjectsACoords();
                else {
                    var n = e && e.centerPoint;
                    n || this._calcBounds(), this._updateObjectsCoords(n), delete e.centerPoint, this.callSuper("initialize", e)
                }
                this.setCoords()
            },
            _updateObjectsACoords: function() {
                for (var t = this._objects.length; t--;) this._objects[t].setCoords(!0, !0)
            },
            _updateObjectsCoords: function(t) {
                for (var t = t || this.getCenterPoint(), e = this._objects.length; e--;) this._updateObjectCoords(this._objects[e], t)
            },
            _updateObjectCoords: function(t, e) {
                var i = t.left,
                    r = t.top;
                t.set({
                    left: i - e.x,
                    top: r - e.y
                }), t.group = this, t.setCoords(!0, !0)
            },
            toString: function() {
                return "#<fabric.Group: (" + this.complexity() + ")>"
            },
            addWithUpdate: function(t) {
                return this._restoreObjectsState(), e.util.resetObjectTransform(this), t && (this._objects.push(t), t.group = this, t._set("canvas", this.canvas)), this._calcBounds(), this._updateObjectsCoords(), this.setCoords(), this.dirty = !0, this
            },
            removeWithUpdate: function(t) {
                return this._restoreObjectsState(), e.util.resetObjectTransform(this), this.remove(t), this._calcBounds(), this._updateObjectsCoords(), this.setCoords(), this.dirty = !0, this
            },
            _onObjectAdded: function(t) {
                this.dirty = !0, t.group = this, t._set("canvas", this.canvas)
            },
            _onObjectRemoved: function(t) {
                this.dirty = !0, delete t.group
            },
            _set: function(t, e) {
                var i = this._objects.length;
                if (this.useSetOnGroup)
                    for (; i--;) this._objects[i].setOnGroup(t, e);
                if ("canvas" === t)
                    for (i = this._objects.length; i--;) this._objects[i]._set(t, e);
                this.callSuper("_set", t, e)
            },
            toObject: function(t) {
                var e = this.getObjects().map(function(e) {
                    var i = e.includeDefaultValues;
                    e.includeDefaultValues = e.group.includeDefaultValues;
                    var r = e.toObject(t);
                    return e.includeDefaultValues = i, r
                });
                return i(this.callSuper("toObject", t), {
                    objects: e
                })
            },
            toDatalessObject: function(t) {
                var e, r = this.sourcePath;
                return e = r || this.getObjects().map(function(e) {
                    var i = e.includeDefaultValues;
                    e.includeDefaultValues = e.group.includeDefaultValues;
                    var r = e.toDatalessObject(t);
                    return e.includeDefaultValues = i, r
                }), i(this.callSuper("toDatalessObject", t), {
                    objects: e
                })
            },
            render: function(t) {
                this._transformDone = !0, this.callSuper("render", t), this._transformDone = !1
            },
            shouldCache: function() {
                var t = this.objectCaching && (!this.group || this.needsItsOwnCache() || !this.group.isOnACache());
                if (this.ownCaching = t, t)
                    for (var e = 0, i = this._objects.length; e < i; e++)
                        if (this._objects[e].willDrawShadow()) return this.ownCaching = !1, !1;
                return t
            },
            willDrawShadow: function() {
                if (this.shadow) return this.callSuper("willDrawShadow");
                for (var t = 0, e = this._objects.length; t < e; t++)
                    if (this._objects[t].willDrawShadow()) return !0;
                return !1
            },
            isOnACache: function() {
                return this.ownCaching || this.group && this.group.isOnACache()
            },
            drawObject: function(t) {
                for (var e = 0, i = this._objects.length; e < i; e++) this._objects[e].render(t)
            },
            isCacheDirty: function() {
                if (this.callSuper("isCacheDirty")) return !0;
                if (!this.statefullCache) return !1;
                for (var t = 0, e = this._objects.length; t < e; t++)
                    if (this._objects[t].isCacheDirty(!0)) {
                        if (this._cacheCanvas) {
                            var i = this.cacheWidth / this.zoomX,
                                r = this.cacheHeight / this.zoomY;
                            this._cacheContext.clearRect(-i / 2, -r / 2, i, r)
                        }
                        return !0
                    }
                return !1
            },
            _restoreObjectsState: function() {
                return this._objects.forEach(this._restoreObjectState, this), this
            },
            realizeTransform: function(t) {
                var i = t.calcTransformMatrix(),
                    r = e.util.qrDecompose(i),
                    n = new e.Point(r.translateX, r.translateY);
                return t.flipX = !1, t.flipY = !1, t.set("scaleX", r.scaleX), t.set("scaleY", r.scaleY), t.skewX = r.skewX, t.skewY = r.skewY, t.angle = r.angle, t.setPositionByOrigin(n, "center", "center"), t
            },
            _restoreObjectState: function(t) {
                return this.realizeTransform(t), t.setCoords(), delete t.group, this
            },
            destroy: function() {
                return this._objects.forEach(function(t) {
                    t.set("dirty", !0)
                }), this._restoreObjectsState()
            },
            toActiveSelection: function() {
                if (this.canvas) {
                    var t = this._objects,
                        i = this.canvas;
                    this._objects = [];
                    var r = this.toObject();
                    delete r.objects;
                    var n = new e.ActiveSelection([]);
                    return n.set(r), n.type = "activeSelection", i.remove(this), t.forEach(function(t) {
                        t.group = n, t.dirty = !0, i.add(t)
                    }), n.canvas = i, n._objects = t, i._activeObject = n, n.setCoords(), n
                }
            },
            ungroupOnCanvas: function() {
                return this._restoreObjectsState()
            },
            setObjectsCoords: function() {
                return this.forEachObject(function(t) {
                    t.setCoords(!0, !0)
                }), this
            },
            _calcBounds: function(t) {
                for (var e, i, r, n = [], s = [], o = ["tr", "br", "bl", "tl"], a = 0, h = this._objects.length, c = o.length; a < h; ++a)
                    for ((e = this._objects[a]).setCoords(!0), r = 0; r < c; r++) i = o[r], n.push(e.oCoords[i].x), s.push(e.oCoords[i].y);
                this.set(this._getBounds(n, s, t))
            },
            _getBounds: function(t, i, s) {
                var o = new e.Point(r(t), r(i)),
                    a = new e.Point(n(t), n(i)),
                    h = {
                        width: a.x - o.x || 0,
                        height: a.y - o.y || 0
                    };
                return s || (h.left = o.x || 0, h.top = o.y || 0, "center" === this.originX && (h.left += h.width / 2), "right" === this.originX && (h.left += h.width), "center" === this.originY && (h.top += h.height / 2), "bottom" === this.originY && (h.top += h.height)), h
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup();
                e.push("<g ", this.getSvgId(), 'transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '" style="', this.getSvgFilter(), '">\n');
                for (var i = 0, r = this._objects.length; i < r; i++) e.push("\t", this._objects[i].toSVG(t));
                return e.push("</g>\n"), t ? t(e.join("")) : e.join("")
            }
        }), e.Group.fromObject = function(t, i) {
            e.util.enlivenObjects(t.objects, function(r) {
                var n = e.util.object.clone(t, !0);
                delete n.objects, i && i(new e.Group(r, n, !0))
            })
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {});
        e.ActiveSelection || (e.ActiveSelection = e.util.createClass(e.Group, {
            type: "activeSelection",
            initialize: function(t, i) {
                i = i || {}, this._objects = t || [];
                for (var r = this._objects.length; r--;) this._objects[r].group = this;
                i.originX && (this.originX = i.originX), i.originY && (this.originY = i.originY), this._calcBounds(), this._updateObjectsCoords(), e.Object.prototype.initialize.call(this, i), this.setCoords()
            },
            toGroup: function() {
                var t = this._objects;
                this._objects = [];
                var i = this.toObject(),
                    r = new e.Group([]);
                if (delete i.objects, r.set(i), r.type = "group", t.forEach(function(t) {
                    t.group = r, t.canvas.remove(t)
                }), r._objects = t, !this.canvas) return r;
                var n = this.canvas;
                return n.add(r), n._activeObject = r, r.setCoords(), r
            },
            onDeselect: function() {
                return this.destroy(), !1
            },
            toString: function() {
                return "#<fabric.ActiveSelection: (" + this.complexity() + ")>"
            },
            _set: function(t, i) {
                var r = this._objects.length;
                if ("canvas" === t)
                    for (; r--;) this._objects[r].set(t, i);
                if (this.useSetOnGroup)
                    for (; r--;) this._objects[r].setOnGroup(t, i);
                e.Object.prototype._set.call(this, t, i)
            },
            shouldCache: function() {
                return !1
            },
            willDrawShadow: function() {
                if (this.shadow) return this.callSuper("willDrawShadow");
                for (var t = 0, e = this._objects.length; t < e; t++)
                    if (this._objects[t].willDrawShadow()) return !0;
                return !1
            },
            isOnACache: function() {
                return !1
            },
            _renderControls: function(t, e, i) {
                t.save(), t.globalAlpha = this.isMoving ? this.borderOpacityWhenMoving : 1, this.callSuper("_renderControls", t, e), void 0 === (i = i || {}).hasControls && (i.hasControls = !1), void 0 === i.hasRotatingPoint && (i.hasRotatingPoint = !1), i.forActiveSelection = !0;
                for (var r = 0, n = this._objects.length; r < n; r++) this._objects[r]._renderControls(t, i);
                t.restore()
            }
        }), e.ActiveSelection.fromObject = function(t, i) {
            e.util.enlivenObjects(t.objects, function(r) {
                delete t.objects, i && i(new e.ActiveSelection(r, t, !0))
            })
        })
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = fabric.util.object.extend;
        t.fabric || (t.fabric = {}), t.fabric.Image ? fabric.warn("fabric.Image is already defined.") : (fabric.Image = fabric.util.createClass(fabric.Object, {
            type: "image",
            crossOrigin: "",
            strokeWidth: 0,
            _lastScaleX: 1,
            _lastScaleY: 1,
            _filterScalingX: 1,
            _filterScalingY: 1,
            minimumScaleTrigger: .5,
            stateProperties: fabric.Object.prototype.stateProperties.concat("cropX", "cropY"),
            objectCaching: !1,
            cacheKey: "",
            cropX: 0,
            cropY: 0,
            initialize: function(t, e) {
                e || (e = {}), this.filters = [], this.callSuper("initialize", e), this._initElement(t, e), this.cacheKey = "texture" + fabric.Object.__uid++
            },
            getElement: function() {
                return this._element
            },
            setElement: function(t, e) {
                var i = fabric.filterBackend;
                return i && i.evictCachesForKey && (i.evictCachesForKey(this.cacheKey), i.evictCachesForKey(this.cacheKey + "_filtered")), this._element = t, this._originalElement = t, this._initConfig(e), this.resizeFilter && this.applyResizeFilters(), 0 !== this.filters.length && this.applyFilters(), this
            },
            setCrossOrigin: function(t) {
                return this.crossOrigin = t, this._element.crossOrigin = t, this
            },
            getOriginalSize: function() {
                var t = this.getElement();
                return {
                    width: t.width,
                    height: t.height
                }
            },
            _stroke: function(t) {
                if (this.stroke && 0 !== this.strokeWidth) {
                    var e = this.width / 2,
                        i = this.height / 2;
                    t.beginPath(), t.moveTo(-e, -i), t.lineTo(e, -i), t.lineTo(e, i), t.lineTo(-e, i), t.lineTo(-e, -i), t.closePath()
                }
            },
            _renderDashedStroke: function(t) {
                var e = -this.width / 2,
                    i = -this.height / 2,
                    r = this.width,
                    n = this.height;
                t.save(), this._setStrokeStyles(t, this), t.beginPath(), fabric.util.drawDashedLine(t, e, i, e + r, i, this.strokeDashArray), fabric.util.drawDashedLine(t, e + r, i, e + r, i + n, this.strokeDashArray), fabric.util.drawDashedLine(t, e + r, i + n, e, i + n, this.strokeDashArray), fabric.util.drawDashedLine(t, e, i + n, e, i, this.strokeDashArray), t.closePath(), t.restore()
            },
            toObject: function(t) {
                var i = [];
                this.filters.forEach(function(t) {
                    t && i.push(t.toObject())
                });
                var r = e(this.callSuper("toObject", ["crossOrigin", "cropX", "cropY"].concat(t)), {
                    src: this.getSrc(),
                    filters: i
                });
                return this.resizeFilter && (r.resizeFilter = this.resizeFilter.toObject()), r
            },
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup(),
                    i = -this.width / 2,
                    r = -this.height / 2;
                e.push('<g transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '">\n');
                var n = ["\t<image ", this.getSvgId(), 'xlink:href="', this.getSvgSrc(!0), '" x="', i, '" y="', r, '" style="', this.getSvgStyles(), '" width="', this.width, '" height="', this.height, '"></image>\n'];
                if ("fill" === this.paintFirst && Array.prototype.push.apply(e, n), this.stroke || this.strokeDashArray) {
                    var s = this.fill;
                    this.fill = null, e.push("\t<rect ", 'x="', i, '" y="', r, '" width="', this.width, '" height="', this.height, '" style="', this.getSvgStyles(), '"/>\n'), this.fill = s
                }
                return "fill" !== this.paintFirst && Array.prototype.push.apply(e, n), e.push("</g>\n"), t ? t(e.join("")) : e.join("")
            },
            getSrc: function(t) {
                var e = t ? this._element : this._originalElement;
                return e ? e.toDataURL ? e.toDataURL() : e.src : this.src || ""
            },
            setSrc: function(t, e, i) {
                return fabric.util.loadImage(t, function(t) {
                    this.setElement(t, i), e(this)
                }, this, i && i.crossOrigin), this
            },
            toString: function() {
                return '#<fabric.Image: { src: "' + this.getSrc() + '" }>'
            },
            applyResizeFilters: function() {
                var t = this.resizeFilter,
                    e = this.canvas ? this.canvas.getRetinaScaling() : 1,
                    i = this.minimumScaleTrigger,
                    r = this.scaleX * e,
                    n = this.scaleY * e,
                    s = this._filteredEl || this._originalElement;
                if (!t || r > i && n > i) return this._element = s, this._filterScalingX = 1, void(this._filterScalingY = 1);
                fabric.filterBackend || (fabric.filterBackend = fabric.initFilterBackend());
                var o = fabric.util.createCanvasElement(),
                    a = this._filteredEl ? this.cacheKey : this.cacheKey + "_filtered",
                    h = s.width,
                    c = s.height;
                o.width = h, o.height = c, this._element = o, t.scaleX = r, t.scaleY = n, fabric.filterBackend.applyFilters([t], s, h, c, this._element, a), this._filterScalingX = o.width / this._originalElement.width, this._filterScalingY = o.height / this._originalElement.height
            },
            applyFilters: function(t) {
                if (t = t || this.filters || [], 0 === (t = t.filter(function(t) {
                    return t
                })).length) return this._element = this._originalElement, this._filteredEl = null, this._filterScalingX = 1, this._filterScalingY = 1, this;
                var e = this._originalElement,
                    i = e.naturalWidth || e.width,
                    r = e.naturalHeight || e.height;
                if (this._element === this._originalElement) {
                    var n = fabric.util.createCanvasElement();
                    n.width = i, n.height = r, this._element = n, this._filteredEl = n
                } else this._element.getContext("2d").clearRect(0, 0, i, r);
                return fabric.filterBackend || (fabric.filterBackend = fabric.initFilterBackend()), fabric.filterBackend.applyFilters(t, this._originalElement, i, r, this._element, this.cacheKey), this._originalElement.width === this._element.width && this._originalElement.height === this._element.height || (this._filterScalingX = this._element.width / this._originalElement.width, this._filterScalingY = this._element.height / this._originalElement.height), this
            },
            _render: function(t) {
                !1 === this.isMoving && this.resizeFilter && this._needsResize() && (this._lastScaleX = this.scaleX, this._lastScaleY = this.scaleY, this.applyResizeFilters()), this._stroke(t), this._renderPaintInOrder(t)
            },
            _renderFill: function(t) {
                var e = this.width,
                    i = this.height,
                    r = e * this._filterScalingX,
                    n = i * this._filterScalingY,
                    s = -e / 2,
                    o = -i / 2,
                    a = this._element;
                a && t.drawImage(a, this.cropX * this._filterScalingX, this.cropY * this._filterScalingY, r, n, s, o, e, i)
            },
            _needsResize: function() {
                return this.scaleX !== this._lastScaleX || this.scaleY !== this._lastScaleY
            },
            _resetWidthHeight: function() {
                var t = this.getElement();
                this.set("width", t.width), this.set("height", t.height)
            },
            _initElement: function(t, e) {
                this.setElement(fabric.util.getById(t), e), fabric.util.addClass(this.getElement(), fabric.Image.CSS_CANVAS)
            },
            _initConfig: function(t) {
                t || (t = {}), this.setOptions(t), this._setWidthHeight(t), this._element && this.crossOrigin && (this._element.crossOrigin = this.crossOrigin)
            },
            _initFilters: function(t, e) {
                t && t.length ? fabric.util.enlivenObjects(t, function(t) {
                    e && e(t)
                }, "fabric.Image.filters") : e && e()
            },
            _setWidthHeight: function(t) {
                this.width = "width" in t ? t.width : this.getElement() ? this.getElement().width || 0 : 0, this.height = "height" in t ? t.height : this.getElement() ? this.getElement().height || 0 : 0
            },
            parsePreserveAspectRatioAttribute: function() {
                var t, e = fabric.util.parsePreserveAspectRatioAttribute(this.preserveAspectRatio || ""),
                    i = this._element.width,
                    r = this._element.height,
                    n = 1,
                    s = 1,
                    o = 0,
                    a = 0,
                    h = 0,
                    c = 0,
                    l = this.width,
                    u = this.height,
                    f = {
                        width: l,
                        height: u
                    };
                return !e || "none" === e.alignX && "none" === e.alignY ? (n = l / i, s = u / r) : ("meet" === e.meetOrSlice && (t = (l - i * (n = s = fabric.util.findScaleToFit(this._element, f))) / 2, "Min" === e.alignX && (o = -t), "Max" === e.alignX && (o = t), t = (u - r * s) / 2, "Min" === e.alignY && (a = -t), "Max" === e.alignY && (a = t)), "slice" === e.meetOrSlice && (t = i - l / (n = s = fabric.util.findScaleToCover(this._element, f)), "Mid" === e.alignX && (h = t / 2), "Max" === e.alignX && (h = t), t = r - u / s, "Mid" === e.alignY && (c = t / 2), "Max" === e.alignY && (c = t), i = l / n, r = u / s)), {
                    width: i,
                    height: r,
                    scaleX: n,
                    scaleY: s,
                    offsetLeft: o,
                    offsetTop: a,
                    cropX: h,
                    cropY: c
                }
            }
        }), fabric.Image.CSS_CANVAS = "canvas-img", fabric.Image.prototype.getSvgSrc = fabric.Image.prototype.getSrc, fabric.Image.fromObject = function(t, e) {
            fabric.util.loadImage(t.src, function(i, r) {
                r ? e && e(null, r) : fabric.Image.prototype._initFilters.call(t, t.filters, function(r) {
                    t.filters = r || [], fabric.Image.prototype._initFilters.call(t, [t.resizeFilter], function(r) {
                        t.resizeFilter = r[0];
                        var n = new fabric.Image(i, t);
                        e(n)
                    })
                })
            }, null, t.crossOrigin)
        }, fabric.Image.fromURL = function(t, e, i) {
            fabric.util.loadImage(t, function(t) {
                e && e(new fabric.Image(t, i))
            }, null, i && i.crossOrigin)
        }, fabric.Image.ATTRIBUTE_NAMES = fabric.SHARED_ATTRIBUTES.concat("x y width height preserveAspectRatio xlink:href crossOrigin".split(" ")), fabric.Image.fromElement = function(t, i, r) {
            var n = fabric.parseAttributes(t, fabric.Image.ATTRIBUTE_NAMES);
            fabric.Image.fromURL(n["xlink:href"], i, e(r ? fabric.util.object.clone(r) : {}, n))
        })
    }("undefined" != typeof exports ? exports : this), fabric.util.object.extend(fabric.Object.prototype, {
        _getAngleValueForStraighten: function() {
            var t = this.angle % 360;
            return t > 0 ? 90 * Math.round((t - 1) / 90) : 90 * Math.round(t / 90)
        },
        straighten: function() {
            return this.rotate(this._getAngleValueForStraighten()), this
        },
        fxStraighten: function(t) {
            var e = function() {},
                i = (t = t || {}).onComplete || e,
                r = t.onChange || e,
                n = this;
            return fabric.util.animate({
                startValue: this.get("angle"),
                endValue: this._getAngleValueForStraighten(),
                duration: this.FX_DURATION,
                onChange: function(t) {
                    n.rotate(t), r()
                },
                onComplete: function() {
                    n.setCoords(), i()
                }
            }), this
        }
    }), fabric.util.object.extend(fabric.StaticCanvas.prototype, {
        straightenObject: function(t) {
            return t.straighten(), this.requestRenderAll(), this
        },
        fxStraightenObject: function(t) {
            return t.fxStraighten({
                onChange: this.requestRenderAllBound
            }), this
        }
    }),
    function() {
        "use strict";

        function t(t, e) {
            var i = "precision " + e + " float;\nvoid main(){}",
                r = t.createShader(t.FRAGMENT_SHADER);
            return t.shaderSource(r, i), t.compileShader(r), !!t.getShaderParameter(r, t.COMPILE_STATUS)
        }

        function e(t) {
            t && t.tileSize && (this.tileSize = t.tileSize), this.setupGLContext(this.tileSize, this.tileSize), this.captureGPUInfo()
        }
        fabric.isWebglSupported = function(e) {
            if (fabric.isLikelyNode) return !1;
            e = e || fabric.WebglFilterBackend.prototype.tileSize;
            var i = document.createElement("canvas"),
                r = i.getContext("webgl") || i.getContext("experimental-webgl"),
                n = !1;
            if (r) {
                fabric.maxTextureSize = r.getParameter(r.MAX_TEXTURE_SIZE), n = fabric.maxTextureSize >= e;
                for (var s = ["highp", "mediump", "lowp"], o = 0; o < 3; o++)
                    if (t(r, s[o])) {
                        fabric.webGlPrecision = s[o];
                        break
                    }
            }
            return this.isSupported = n, n
        }, fabric.WebglFilterBackend = e, e.prototype = {
            tileSize: 2048,
            resources: {},
            setupGLContext: function(t, e) {
                this.dispose(), this.createWebGLCanvas(t, e), this.aPosition = new Float32Array([0, 0, 0, 1, 1, 0, 1, 1]), this.chooseFastestCopyGLTo2DMethod(t, e)
            },
            chooseFastestCopyGLTo2DMethod: function(t, e) {
                var i, r = void 0 !== window.performance;
                try {
                    new ImageData(1, 1), i = !0
                } catch (t) {
                    i = !1
                }
                var n = "undefined" != typeof ArrayBuffer,
                    s = "undefined" != typeof Uint8ClampedArray;
                if (r && i && n && s) {
                    var o, a, h = fabric.util.createCanvasElement(),
                        c = new ArrayBuffer(t * e * 4),
                        l = {
                            imageBuffer: c,
                            destinationWidth: t,
                            destinationHeight: e,
                            targetCanvas: h
                        };
                    h.width = t, h.height = e, o = window.performance.now(), copyGLTo2DDrawImage.call(l, this.gl, l), a = window.performance.now() - o, o = window.performance.now(), copyGLTo2DPutImageData.call(l, this.gl, l), a > window.performance.now() - o ? (this.imageBuffer = c, this.copyGLTo2D = copyGLTo2DPutImageData) : this.copyGLTo2D = copyGLTo2DDrawImage
                }
            },
            createWebGLCanvas: function(t, e) {
                var i = fabric.util.createCanvasElement();
                i.width = t, i.height = e;
                var r = {
                        premultipliedAlpha: !1
                    },
                    n = i.getContext("webgl", r);
                n || (n = i.getContext("experimental-webgl", r)), n && (n.clearColor(0, 0, 0, 0), this.canvas = i, this.gl = n)
            },
            applyFilters: function(t, e, i, r, n, s) {
                var o, a = this.gl;
                s && (o = this.getCachedTexture(s, e));
                var h = {
                        originalWidth: e.width || e.originalWidth,
                        originalHeight: e.height || e.originalHeight,
                        sourceWidth: i,
                        sourceHeight: r,
                        destinationWidth: i,
                        destinationHeight: r,
                        context: a,
                        sourceTexture: this.createTexture(a, i, r, !o && e),
                        targetTexture: this.createTexture(a, i, r),
                        originalTexture: o || this.createTexture(a, i, r, !o && e),
                        passes: t.length,
                        webgl: !0,
                        aPosition: this.aPosition,
                        programCache: this.programCache,
                        pass: 0,
                        filterBackend: this,
                        targetCanvas: n
                    },
                    c = a.createFramebuffer();
                return a.bindFramebuffer(a.FRAMEBUFFER, c), t.forEach(function(t) {
                    t && t.applyTo(h)
                }), resizeCanvasIfNeeded(h), this.copyGLTo2D(a, h), a.bindTexture(a.TEXTURE_2D, null), a.deleteTexture(h.sourceTexture), a.deleteTexture(h.targetTexture), a.deleteFramebuffer(c), n.getContext("2d").setTransform(1, 0, 0, 1, 0, 0), h
            },
            applyFiltersDebug: function(t, e, i, r, n, s) {
                var o = this.gl,
                    a = this.applyFilters(t, e, i, r, n, s),
                    h = o.getError();
                if (h !== o.NO_ERROR) {
                    var c = this.glErrorToString(o, h),
                        l = new Error("WebGL Error " + c);
                    throw l.glErrorCode = h, l
                }
                return a
            },
            glErrorToString: function(t, e) {
                if (!t) return "Context undefined for error code: " + e;
                if ("number" != typeof e) return "Error code is not a number";
                switch (e) {
                    case t.NO_ERROR:
                        return "NO_ERROR";
                    case t.INVALID_ENUM:
                        return "INVALID_ENUM";
                    case t.INVALID_VALUE:
                        return "INVALID_VALUE";
                    case t.INVALID_OPERATION:
                        return "INVALID_OPERATION";
                    case t.INVALID_FRAMEBUFFER_OPERATION:
                        return "INVALID_FRAMEBUFFER_OPERATION";
                    case t.OUT_OF_MEMORY:
                        return "OUT_OF_MEMORY";
                    case t.CONTEXT_LOST_WEBGL:
                        return "CONTEXT_LOST_WEBGL";
                    default:
                        return "UNKNOWN_ERROR"
                }
            },
            dispose: function() {
                this.canvas && (this.canvas = null, this.gl = null), this.clearWebGLCaches()
            },
            clearWebGLCaches: function() {
                this.programCache = {}, this.textureCache = {}
            },
            createTexture: function(t, e, i, r) {
                var n = t.createTexture();
                return t.bindTexture(t.TEXTURE_2D, n), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.NEAREST), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE), t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE), r ? t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, t.RGBA, t.UNSIGNED_BYTE, r) : t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, e, i, 0, t.RGBA, t.UNSIGNED_BYTE, null), n
            },
            getCachedTexture: function(t, e) {
                if (this.textureCache[t]) return this.textureCache[t];
                var i = this.createTexture(this.gl, e.width, e.height, e);
                return this.textureCache[t] = i, i
            },
            evictCachesForKey: function(t) {
                this.textureCache[t] && (this.gl.deleteTexture(this.textureCache[t]), delete this.textureCache[t])
            },
            copyGLTo2D: copyGLTo2DDrawImage,
            captureGPUInfo: function() {
                if (this.gpuInfo) return this.gpuInfo;
                var t = this.gl,
                    e = t.getExtension("WEBGL_debug_renderer_info"),
                    i = {
                        renderer: "",
                        vendor: ""
                    };
                if (e) {
                    var r = t.getParameter(e.UNMASKED_RENDERER_WEBGL),
                        n = t.getParameter(e.UNMASKED_VENDOR_WEBGL);
                    r && (i.renderer = r.toLowerCase()), n && (i.vendor = n.toLowerCase())
                }
                return this.gpuInfo = i, i
            }
        }
    }(),
    function() {
        "use strict";

        function t() {}
        var e = function() {};
        fabric.Canvas2dFilterBackend = t, t.prototype = {
            evictCachesForKey: e,
            dispose: e,
            clearWebGLCaches: e,
            resources: {},
            applyFilters: function(t, e, i, r, n) {
                var s = n.getContext("2d");
                s.drawImage(e, 0, 0, i, r);
                var o = {
                    sourceWidth: i,
                    sourceHeight: r,
                    imageData: s.getImageData(0, 0, i, r),
                    originalEl: e,
                    originalImageData: s.getImageData(0, 0, i, r),
                    canvasEl: n,
                    ctx: s,
                    filterBackend: this
                };
                return t.forEach(function(t) {
                    t.applyTo(o)
                }), o.imageData.width === i && o.imageData.height === r || (n.width = o.imageData.width, n.height = o.imageData.height), s.putImageData(o.imageData, 0, 0), o
            }
        }
    }(), fabric.Image.filters = fabric.Image.filters || {}, fabric.Image.filters.BaseFilter = fabric.util.createClass({
        type: "BaseFilter",
        vertexSource: "attribute vec2 aPosition;\nvarying vec2 vTexCoord;\nvoid main() {\nvTexCoord = aPosition;\ngl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);\n}",
        fragmentSource: "precision highp float;\nvarying vec2 vTexCoord;\nuniform sampler2D uTexture;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\n}",
        initialize: function(t) {
            t && this.setOptions(t)
        },
        setOptions: function(t) {
            for (var e in t) this[e] = t[e]
        },
        createProgram: function(t, e, i) {
            e = e || this.fragmentSource, i = i || this.vertexSource, "highp" !== fabric.webGlPrecision && (e = e.replace(/precision highp float/g, "precision " + fabric.webGlPrecision + " float"));
            var r = t.createShader(t.VERTEX_SHADER);
            if (t.shaderSource(r, i), t.compileShader(r), !t.getShaderParameter(r, t.COMPILE_STATUS)) throw new Error("Vertex shader compile error for " + this.type + ": " + t.getShaderInfoLog(r));
            var n = t.createShader(t.FRAGMENT_SHADER);
            if (t.shaderSource(n, e), t.compileShader(n), !t.getShaderParameter(n, t.COMPILE_STATUS)) throw new Error("Fragment shader compile error for " + this.type + ": " + t.getShaderInfoLog(n));
            var s = t.createProgram();
            if (t.attachShader(s, r), t.attachShader(s, n), t.linkProgram(s), !t.getProgramParameter(s, t.LINK_STATUS)) throw new Error('Shader link error for "${this.type}" ' + t.getProgramInfoLog(s));
            var o = this.getAttributeLocations(t, s),
                a = this.getUniformLocations(t, s) || {};
            return a.uStepW = t.getUniformLocation(s, "uStepW"), a.uStepH = t.getUniformLocation(s, "uStepH"), {
                program: s,
                attributeLocations: o,
                uniformLocations: a
            }
        },
        getAttributeLocations: function(t, e) {
            return {
                aPosition: t.getAttribLocation(e, "aPosition")
            }
        },
        getUniformLocations: function() {
            return {}
        },
        sendAttributeData: function(t, e, i) {
            var r = e.aPostion,
                n = t.createBuffer();
            t.bindBuffer(t.ARRAY_BUFFER, n), t.enableVertexAttribArray(r), t.vertexAttribPointer(r, 2, t.FLOAT, !1, 0, 0), t.bufferData(t.ARRAY_BUFFER, i, t.STATIC_DRAW)
        },
        _setupFrameBuffer: function(t) {
            var e, i, r = t.context;
            t.passes > 1 ? (e = t.destinationWidth, i = t.destinationHeight, t.sourceWidth === e && t.sourceHeight === i || (r.deleteTexture(t.targetTexture), t.targetTexture = t.filterBackend.createTexture(r, e, i)), r.framebufferTexture2D(r.FRAMEBUFFER, r.COLOR_ATTACHMENT0, r.TEXTURE_2D, t.targetTexture, 0)) : (r.bindFramebuffer(r.FRAMEBUFFER, null), r.finish())
        },
        _swapTextures: function(t) {
            t.passes--, t.pass++;
            var e = t.targetTexture;
            t.targetTexture = t.sourceTexture, t.sourceTexture = e
        },
        isNeutralState: function() {
            return !1
        },
        applyTo: function(t) {
            if (t.webgl) {
                if (t.passes > 1 && this.isNeutralState(t)) return;
                this._setupFrameBuffer(t), this.applyToWebGL(t), this._swapTextures(t)
            } else this.isNeutralState() || this.applyTo2d(t)
        },
        retrieveShader: function(t) {
            return t.programCache.hasOwnProperty(this.type) || (t.programCache[this.type] = this.createProgram(t.context)), t.programCache[this.type]
        },
        applyToWebGL: function(t) {
            var e = t.context,
                i = this.retrieveShader(t);
            0 === t.pass && t.originalTexture ? e.bindTexture(e.TEXTURE_2D, t.originalTexture) : e.bindTexture(e.TEXTURE_2D, t.sourceTexture), e.useProgram(i.program), this.sendAttributeData(e, i.attributeLocations, t.aPosition), e.uniform1f(i.uniformLocations.uStepW, 1 / t.sourceWidth), e.uniform1f(i.uniformLocations.uStepH, 1 / t.sourceHeight), this.sendUniformData(e, i.uniformLocations), e.viewport(0, 0, t.destinationWidth, t.destinationHeight), e.drawArrays(e.TRIANGLE_STRIP, 0, 4)
        },
        bindAdditionalTexture: function(t, e, i) {
            t.activeTexture(i), t.bindTexture(t.TEXTURE_2D, e), t.activeTexture(t.TEXTURE0)
        },
        unbindAdditionalTexture: function(t, e) {
            t.activeTexture(e), t.bindTexture(t.TEXTURE_2D, null), t.activeTexture(t.TEXTURE0)
        },
        getMainParameter: function() {
            return this[this.mainParameter]
        },
        setMainParameter: function(t) {
            this[this.mainParameter] = t
        },
        sendUniformData: function() {},
        createHelpLayer: function(t) {
            if (!t.helpLayer) {
                var e = document.createElement("canvas");
                e.width = t.sourceWidth, e.height = t.sourceHeight, t.helpLayer = e
            }
        },
        toObject: function() {
            var t = {
                    type: this.type
                },
                e = this.mainParameter;
            return e && (t[e] = this[e]), t
        },
        toJSON: function() {
            return this.toObject()
        }
    }), fabric.Image.filters.BaseFilter.fromObject = function(t, e) {
        var i = new fabric.Image.filters[t.type](t);
        return e && e(i), i
    },
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.ColorMatrix = r(i.BaseFilter, {
            type: "ColorMatrix",
            fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nvarying vec2 vTexCoord;\nuniform mat4 uColorMatrix;\nuniform vec4 uConstants;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor *= uColorMatrix;\ncolor += uConstants;\ngl_FragColor = color;\n}",
            matrix: [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
            mainParameter: "matrix",
            colorsOnly: !0,
            initialize: function(t) {
                this.callSuper("initialize", t), this.matrix = this.matrix.slice(0)
            },
            isNeutralState: function() {
                for (var t = i.ColorMatrix, e = 20; e--;)
                    if (this.matrix[e] !== t.prototype.matrix[e]) return !1;
                return !0
            },
            applyTo2d: function(t) {
                var e, i, r, n, s, o = t.imageData.data,
                    a = o.length,
                    h = this.matrix,
                    c = this.colorsOnly;
                for (s = 0; s < a; s += 4) e = o[s], i = o[s + 1], r = o[s + 2], c ? (o[s] = e * h[0] + i * h[1] + r * h[2] + 255 * h[4], o[s + 1] = e * h[5] + i * h[6] + r * h[7] + 255 * h[9], o[s + 2] = e * h[10] + i * h[11] + r * h[12] + 255 * h[14]) : (n = o[s + 3], o[s] = e * h[0] + i * h[1] + r * h[2] + n * h[3] + 255 * h[4], o[s + 1] = e * h[5] + i * h[6] + r * h[7] + n * h[8] + 255 * h[9], o[s + 2] = e * h[10] + i * h[11] + r * h[12] + n * h[13] + 255 * h[14], o[s + 3] = e * h[15] + i * h[16] + r * h[17] + n * h[18] + 255 * h[19])
            },
            getUniformLocations: function(t, e) {
                return {
                    uColorMatrix: t.getUniformLocation(e, "uColorMatrix"),
                    uConstants: t.getUniformLocation(e, "uConstants")
                }
            },
            sendUniformData: function(t, e) {
                var i = this.matrix,
                    r = [i[0], i[1], i[2], i[3], i[5], i[6], i[7], i[8], i[10], i[11], i[12], i[13], i[15], i[16], i[17], i[18]],
                    n = [i[4], i[9], i[14], i[19]];
                t.uniformMatrix4fv(e.uColorMatrix, !1, r), t.uniform4fv(e.uConstants, n)
            }
        }), e.Image.filters.ColorMatrix.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.Brightness = r(i.BaseFilter, {
            type: "Brightness",
            fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uBrightness;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb += uBrightness;\ngl_FragColor = color;\n}",
            brightness: 0,
            mainParameter: "brightness",
            applyTo2d: function(t) {
                if (0 !== this.brightness) {
                    var e, i = t.imageData.data,
                        r = i.length,
                        n = Math.round(255 * this.brightness);
                    for (e = 0; e < r; e += 4) i[e] = i[e] + n, i[e + 1] = i[e + 1] + n, i[e + 2] = i[e + 2] + n
                }
            },
            getUniformLocations: function(t, e) {
                return {
                    uBrightness: t.getUniformLocation(e, "uBrightness")
                }
            },
            sendUniformData: function(t, e) {
                t.uniform1f(e.uBrightness, this.brightness)
            }
        }), e.Image.filters.Brightness.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend,
            r = e.Image.filters,
            n = e.util.createClass;
        r.Convolute = n(r.BaseFilter, {
            type: "Convolute",
            opaque: !1,
            matrix: [0, 0, 0, 0, 1, 0, 0, 0, 0],
            fragmentSource: {
                Convolute_3_1: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[9];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 3.0; h+=1.0) {\nfor (float w = 0.0; w < 3.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 1), uStepH * (h - 1));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 3.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
                Convolute_3_0: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[9];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 3.0; h+=1.0) {\nfor (float w = 0.0; w < 3.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 1.0), uStepH * (h - 1.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 3.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",
                Convolute_5_1: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[25];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 5.0; h+=1.0) {\nfor (float w = 0.0; w < 5.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 5.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
                Convolute_5_0: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[25];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 5.0; h+=1.0) {\nfor (float w = 0.0; w < 5.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 5.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",
                Convolute_7_1: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[49];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 7.0; h+=1.0) {\nfor (float w = 0.0; w < 7.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 7.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
                Convolute_7_0: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[49];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 7.0; h+=1.0) {\nfor (float w = 0.0; w < 7.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 7.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",
                Convolute_9_1: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[81];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 9.0; h+=1.0) {\nfor (float w = 0.0; w < 9.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 9.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
                Convolute_9_0: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[81];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 9.0; h+=1.0) {\nfor (float w = 0.0; w < 9.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 9.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}"
            },
            retrieveShader: function(t) {
                var e = Math.sqrt(this.matrix.length),
                    i = this.type + "_" + e + "_" + (this.opaque ? 1 : 0),
                    r = this.fragmentSource[i];
                return t.programCache.hasOwnProperty(i) || (t.programCache[i] = this.createProgram(t.context, r)), t.programCache[i]
            },
            applyTo2d: function(t) {
                var e, i, r, n, s, o, a, h, c, l, u, f, d, g = t.imageData,
                    p = g.data,
                    v = this.matrix,
                    m = Math.round(Math.sqrt(v.length)),
                    b = Math.floor(m / 2),
                    _ = g.width,
                    y = g.height,
                    x = t.ctx.createImageData(_, y),
                    C = x.data,
                    S = this.opaque ? 1 : 0;
                for (u = 0; u < y; u++)
                    for (l = 0; l < _; l++) {
                        for (s = 4 * (u * _ + l), e = 0, i = 0, r = 0, n = 0, d = 0; d < m; d++)
                            for (f = 0; f < m; f++) o = l + f - b, (a = u + d - b) < 0 || a > y || o < 0 || o > _ || (h = 4 * (a * _ + o), c = v[d * m + f], e += p[h] * c, i += p[h + 1] * c, r += p[h + 2] * c, S || (n += p[h + 3] * c));
                        C[s] = e, C[s + 1] = i, C[s + 2] = r, C[s + 3] = S ? p[s + 3] : n
                    }
                t.imageData = x
            },
            getUniformLocations: function(t, e) {
                return {
                    uMatrix: t.getUniformLocation(e, "uMatrix"),
                    uOpaque: t.getUniformLocation(e, "uOpaque"),
                    uHalfSize: t.getUniformLocation(e, "uHalfSize"),
                    uSize: t.getUniformLocation(e, "uSize")
                }
            },
            sendUniformData: function(t, e) {
                t.uniform1fv(e.uMatrix, this.matrix)
            },
            toObject: function() {
                return i(this.callSuper("toObject"), {
                    opaque: this.opaque,
                    matrix: this.matrix
                })
            }
        }), e.Image.filters.Convolute.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.Grayscale = r(i.BaseFilter, {
            type: "Grayscale",
            fragmentSource: {
                average: "precision highp float;\nuniform sampler2D uTexture;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat average = (color.r + color.b + color.g) / 3.0;\ngl_FragColor = vec4(average, average, average, color.a);\n}",
                lightness: "precision highp float;\nuniform sampler2D uTexture;\nuniform int uMode;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 col = texture2D(uTexture, vTexCoord);\nfloat average = (max(max(col.r, col.g),col.b) + min(min(col.r, col.g),col.b)) / 2.0;\ngl_FragColor = vec4(average, average, average, col.a);\n}",
                luminosity: "precision highp float;\nuniform sampler2D uTexture;\nuniform int uMode;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 col = texture2D(uTexture, vTexCoord);\nfloat average = 0.21 * col.r + 0.72 * col.g + 0.07 * col.b;\ngl_FragColor = vec4(average, average, average, col.a);\n}"
            },
            mode: "average",
            mainParameter: "mode",
            applyTo2d: function(t) {
                var e, i, r = t.imageData.data,
                    n = r.length,
                    s = this.mode;
                for (e = 0; e < n; e += 4) "average" === s ? i = (r[e] + r[e + 1] + r[e + 2]) / 3 : "lightness" === s ? i = (Math.min(r[e], r[e + 1], r[e + 2]) + Math.max(r[e], r[e + 1], r[e + 2])) / 2 : "luminosity" === s && (i = .21 * r[e] + .72 * r[e + 1] + .07 * r[e + 2]), r[e] = i, r[e + 1] = i, r[e + 2] = i
            },
            retrieveShader: function(t) {
                var e = this.type + "_" + this.mode;
                if (!t.programCache.hasOwnProperty(e)) {
                    var i = this.fragmentSource[this.mode];
                    t.programCache[e] = this.createProgram(t.context, i)
                }
                return t.programCache[e]
            },
            getUniformLocations: function(t, e) {
                return {
                    uMode: t.getUniformLocation(e, "uMode")
                }
            },
            sendUniformData: function(t, e) {
                t.uniform1i(e.uMode, 1)
            }
        }), e.Image.filters.Grayscale.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.Invert = r(i.BaseFilter, {
            type: "Invert",
            fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform int uInvert;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nif (uInvert == 1) {\ngl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);\n} else {\ngl_FragColor = color;\n}\n}",
            invert: !0,
            mainParameter: "invert",
            applyTo2d: function(t) {
                if (this.invert) {
                    var e, i = t.imageData.data,
                        r = i.length;
                    for (e = 0; e < r; e += 4) i[e] = 255 - i[e], i[e + 1] = 255 - i[e + 1], i[e + 2] = 255 - i[e + 2]
                }
            },
            getUniformLocations: function(t, e) {
                return {
                    uInvert: t.getUniformLocation(e, "uInvert")
                }
            },
            sendUniformData: function(t, e) {
                t.uniform1i(e.uInvert, this.invert)
            }
        }), e.Image.filters.Invert.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend,
            r = e.Image.filters,
            n = e.util.createClass;
        r.Noise = n(r.BaseFilter, {
            type: "Noise",
            fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uStepH;\nuniform float uNoise;\nuniform float uSeed;\nvarying vec2 vTexCoord;\nfloat rand(vec2 co, float seed, float vScale) {\nreturn fract(sin(dot(co.xy * vScale ,vec2(12.9898 , 78.233))) * 43758.5453 * (seed + 0.01) / 2.0);\n}\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb += (0.5 - rand(vTexCoord, uSeed, 0.1 / uStepH)) * uNoise;\ngl_FragColor = color;\n}",
            mainParameter: "noise",
            noise: 0,
            applyTo2d: function(t) {
                if (0 !== this.noise) {
                    var e, i, r = t.imageData.data,
                        n = r.length,
                        s = this.noise;
                    for (e = 0, n = r.length; e < n; e += 4) i = (.5 - Math.random()) * s, r[e] += i, r[e + 1] += i, r[e + 2] += i
                }
            },
            getUniformLocations: function(t, e) {
                return {
                    uNoise: t.getUniformLocation(e, "uNoise"),
                    uSeed: t.getUniformLocation(e, "uSeed")
                }
            },
            sendUniformData: function(t, e) {
                t.uniform1f(e.uNoise, this.noise / 255), t.uniform1f(e.uSeed, Math.random())
            },
            toObject: function() {
                return i(this.callSuper("toObject"), {
                    noise: this.noise
                })
            }
        }), e.Image.filters.Noise.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.Pixelate = r(i.BaseFilter, {
            type: "Pixelate",
            blocksize: 4,
            mainParameter: "blocksize",
            fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uBlocksize;\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nfloat blockW = uBlocksize * uStepW;\nfloat blockH = uBlocksize * uStepW;\nint posX = int(vTexCoord.x / blockW);\nint posY = int(vTexCoord.y / blockH);\nfloat fposX = float(posX);\nfloat fposY = float(posY);\nvec2 squareCoords = vec2(fposX * blockW, fposY * blockH);\nvec4 color = texture2D(uTexture, squareCoords);\ngl_FragColor = color;\n}",
            applyTo2d: function(t) {
                if (1 !== this.blocksize) {
                    var e, i, r, n, s, o, a, h, c, l, u, f = t.imageData,
                        d = f.data,
                        g = f.height,
                        p = f.width;
                    for (i = 0; i < g; i += this.blocksize)
                        for (r = 0; r < p; r += this.blocksize)
                            for (n = d[e = 4 * i * p + 4 * r], s = d[e + 1], o = d[e + 2], a = d[e + 3], l = Math.min(i + this.blocksize, g), u = Math.min(r + this.blocksize, p), h = i; h < l; h++)
                                for (c = r; c < u; c++) d[e = 4 * h * p + 4 * c] = n, d[e + 1] = s, d[e + 2] = o, d[e + 3] = a
                }
            },
            isNeutralState: function() {
                return 1 === this.blocksize
            },
            getUniformLocations: function(t, e) {
                return {
                    uBlocksize: t.getUniformLocation(e, "uBlocksize"),
                    uStepW: t.getUniformLocation(e, "uStepW"),
                    uStepH: t.getUniformLocation(e, "uStepH")
                }
            },
            sendUniformData: function(t, e) {
                t.uniform1f(e.uBlocksize, this.blocksize)
            }
        }), e.Image.filters.Pixelate.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.extend,
            r = e.Image.filters,
            n = e.util.createClass;
        r.RemoveColor = n(r.BaseFilter, {
            type: "RemoveColor",
            color: "#FFFFFF",
            fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uLow;\nuniform vec4 uHigh;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\nif(all(greaterThan(gl_FragColor.rgb,uLow.rgb)) && all(greaterThan(uHigh.rgb,gl_FragColor.rgb))) {\ngl_FragColor.a = 0.0;\n}\n}",
            distance: .02,
            useAlpha: !1,
            applyTo2d: function(t) {
                var i, r, n, s, o = t.imageData.data,
                    a = 255 * this.distance,
                    h = new e.Color(this.color).getSource(),
                    c = [h[0] - a, h[1] - a, h[2] - a],
                    l = [h[0] + a, h[1] + a, h[2] + a];
                for (i = 0; i < o.length; i += 4) r = o[i], n = o[i + 1], s = o[i + 2], r > c[0] && n > c[1] && s > c[2] && r < l[0] && n < l[1] && s < l[2] && (o[i + 3] = 0)
            },
            getUniformLocations: function(t, e) {
                return {
                    uLow: t.getUniformLocation(e, "uLow"),
                    uHigh: t.getUniformLocation(e, "uHigh")
                }
            },
            sendUniformData: function(t, i) {
                var r = new e.Color(this.color).getSource(),
                    n = parseFloat(this.distance),
                    s = [0 + r[0] / 255 - n, 0 + r[1] / 255 - n, 0 + r[2] / 255 - n, 1],
                    o = [r[0] / 255 + n, r[1] / 255 + n, r[2] / 255 + n, 1];
                t.uniform4fv(i.uLow, s), t.uniform4fv(i.uHigh, o)
            },
            toObject: function() {
                return i(this.callSuper("toObject"), {
                    color: this.color,
                    distance: this.distance
                })
            }
        }), e.Image.filters.RemoveColor.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass,
            n = {
                Brownie: [.5997, .34553, -.27082, 0, .186, -.0377, .86095, .15059, 0, -.1449, .24113, -.07441, .44972, 0, -.02965, 0, 0, 0, 1, 0],
                Vintage: [.62793, .32021, -.03965, 0, .03784, .02578, .64411, .03259, 0, .02926, .0466, -.08512, .52416, 0, .02023, 0, 0, 0, 1, 0],
                Kodachrome: [1.12855, -.39673, -.03992, 0, .24991, -.16404, 1.08352, -.05498, 0, .09698, -.16786, -.56034, 1.60148, 0, .13972, 0, 0, 0, 1, 0],
                Technicolor: [1.91252, -.85453, -.09155, 0, .04624, -.30878, 1.76589, -.10601, 0, -.27589, -.2311, -.75018, 1.84759, 0, .12137, 0, 0, 0, 1, 0],
                Polaroid: [1.438, -.062, -.062, 0, 0, -.122, 1.378, -.122, 0, 0, -.016, -.016, 1.483, 0, 0, 0, 0, 0, 1, 0],
                Sepia: [.393, .769, .189, 0, 0, .349, .686, .168, 0, 0, .272, .534, .131, 0, 0, 0, 0, 0, 1, 0],
                BlackWhite: [1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 0, 0, 0, 1, 0]
            };
        for (var s in n) i[s] = r(i.ColorMatrix, {
            type: s,
            matrix: n[s],
            mainParameter: !1,
            colorsOnly: !0
        }), e.Image.filters[s].fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric,
            i = e.Image.filters,
            r = e.util.createClass;
        i.BlendColor = r(i.BaseFilter, {
            type: "BlendColor",
            color: "#F95C63",
            mode: "multiply",
            alpha: 1,
            fragmentSource: {
                multiply: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb *= uColor.rgb;\ngl_FragColor = color;\n}",
                screen: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb = 1.0 - (1.0 - color.rgb) * (1.0 - uColor.rgb);\ngl_FragColor = color;\n}",
                add: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb += uColor.rgb;\n}",
                diff: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb = abs(gl_FragColor.rgb - uColor.rgb);\n}",
                subtract: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb -= uColor.rgb;\n}",
                lighten: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb = max(gl_FragColor.rgb, uColor.rgb);\n}",
                darken: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb = min(gl_FragColor.rgb, uColor.rgb);\n}",
                exclusion: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb += uColor.rgb - 2.0 * (uColor.rgb * gl_FragColor.rgb);\n}",
                overlay: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\nif (uColor.r < 0.5) {\ngl_FragColor.r *= 2.0 * uColor.r;\n} else {\ngl_FragColor.r = 1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - uColor.r);\n}\nif (uColor.g < 0.5) {\ngl_FragColor.g *= 2.0 * uColor.g;\n} else {\ngl_FragColor.g = 1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - uColor.g);\n}\nif (uColor.b < 0.5) {\ngl_FragColor.b *= 2.0 * uColor.b;\n} else {\ngl_FragColor.b = 1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - uColor.b);\n}\n}",
                tint: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\ngl_FragColor.rgb *= (1.0 - uColor.a);\ngl_FragColor.rgb += uColor.rgb;\n}"
            },
            retrieveShader: function(t) {
                var e = this.type + "_" + this.mode,
                    i = this.fragmentSource[this.mode];
                return t.programCache.hasOwnProperty(e) || (t.programCache[e] = this.createProgram(t.context, i)), t.programCache[e]
            },
            applyTo2d: function(t) {
                var i, r, n, s, o, a, h, c = t.imageData.data,
                    l = c.length,
                    u = 1 - this.alpha;
                i = (h = new e.Color(this.color).getSource())[0] * this.alpha, r = h[1] * this.alpha, n = h[2] * this.alpha;
                for (var f = 0; f < l; f += 4) switch (s = c[f], o = c[f + 1], a = c[f + 2], this.mode) {
                    case "multiply":
                        c[f] = s * i / 255, c[f + 1] = o * r / 255, c[f + 2] = a * n / 255;
                        break;
                    case "screen":
                        c[f] = 255 - (255 - s) * (255 - i) / 255, c[f + 1] = 255 - (255 - o) * (255 - r) / 255, c[f + 2] = 255 - (255 - a) * (255 - n) / 255;
                        break;
                    case "add":
                        c[f] = s + i, c[f + 1] = o + r, c[f + 2] = a + n;
                        break;
                    case "diff":
                    case "difference":
                        c[f] = Math.abs(s - i), c[f + 1] = Math.abs(o - r), c[f + 2] = Math.abs(a - n);
                        break;
                    case "subtract":
                        c[f] = s - i, c[f + 1] = o - r, c[f + 2] = a - n;
                        break;
                    case "darken":
                        c[f] = Math.min(s, i), c[f + 1] = Math.min(o, r), c[f + 2] = Math.min(a, n);
                        break;
                    case "lighten":
                        c[f] = Math.max(s, i), c[f + 1] = Math.max(o, r), c[f + 2] = Math.max(a, n);
                        break;
                    case "overlay":
                        c[f] = i < 128 ? 2 * s * i / 255 : 255 - 2 * (255 - s) * (255 - i) / 255, c[f + 1] = r < 128 ? 2 * o * r / 255 : 255 - 2 * (255 - o) * (255 - r) / 255, c[f + 2] = n < 128 ? 2 * a * n / 255 : 255 - 2 * (255 - a) * (255 - n) / 255;
                        break;
                    case "exclusion":
                        c[f] = i + s - 2 * i * s / 255, c[f + 1] = r + o - 2 * r * o / 255, c[f + 2] = n + a - 2 * n * a / 255;
                        break;
                    case "tint":
                        c[f] = i + s * u, c[f + 1] = r + o * u, c[f + 2] = n + a * u
                }
            },
            getUniformLocations: function(t, e) {
                return {
                    uColor: t.getUniformLocation(e, "uColor")
                }
            },
            sendUniformData: function(t, i) {
                var r = new e.Color(this.color).getSource();
                r[0] = this.alpha * r[0] / 255, r[1] = this.alpha * r[1] / 255, r[2] = this.alpha * r[2] / 255, r[3] = this.alpha, t.uniform4fv(i.uColor, r)
            },
            toObject: function() {
                return {
                    type: this.type,
                    color: this.color,
                    mode: this.mode,
                    alpha: this.alpha
                }
            }
        }), e.Image.filters.BlendColor.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric,
            i = e.Image.filters,
            r = e.util.createClass;
        i.BlendImage = r(i.BaseFilter, {
            type: "BlendImage",
            image: null,
            mode: "multiply",
            alpha: 1,
            vertexSource: "attribute vec2 aPosition;\nattribute vec2 aTexCoord;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nuniform mat3 uTransformMatrix;\nvoid main() {\nvTexCoord = aTexCoord;\nvTexCoord2 = (uTransformMatrix * vec3(aTexCoord, 1.0)).xy;\ngl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);\n}",
            fragmentSource: {
                multiply: "precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uImage;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec4 color2 = texture2D(uImage, vTexCoord2);\ncolor.rgba *= color2.rgba;\ngl_FragColor = color;\n}",
                mask: "precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uImage;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec4 color2 = texture2D(uImage, vTexCoord2);\ncolor.a = color2.a;\ngl_FragColor = color;\n}"
            },
            retrieveShader: function(t) {
                var e = this.type + "_" + this.mode,
                    i = this.fragmentSource[this.mode];
                return t.programCache.hasOwnProperty(e) || (t.programCache[e] = this.createProgram(t.context, i)), t.programCache[e]
            },
            applyToWebGL: function(t) {
                var e = t.context,
                    i = this.createTexture(t.filterBackend, this.image);
                this.bindAdditionalTexture(e, i, e.TEXTURE1), this.callSuper("applyToWebGL", t), this.unbindAdditionalTexture(e, e.TEXTURE1)
            },
            createTexture: function(t, e) {
                return t.getCachedTexture(e.cacheKey, e._element)
            },
            calculateMatrix: function() {
                var t = this.image,
                    e = t._element.width,
                    i = t._element.height;
                return [1 / t.scaleX, 0, 0, 0, 1 / t.scaleY, 0, -t.left / e, -t.top / i, 1]
            },
            applyTo2d: function(t) {
                var e, i, r, n, s, o, a, h, c, l, u, f = t.imageData,
                    d = t.filterBackend.resources,
                    g = f.data,
                    p = g.length,
                    v = t.imageData.width,
                    m = t.imageData.height,
                    b = this.image;
                d.blendImage || (d.blendImage = document.createElement("canvas")), (c = d.blendImage).width === v && c.height === m || (c.width = v, c.height = m), (l = c.getContext("2d")).setTransform(b.scaleX, 0, 0, b.scaleY, b.left, b.top), l.drawImage(b._element, 0, 0, v, m), u = l.getImageData(0, 0, v, m).data;
                for (var _ = 0; _ < p; _ += 4) switch (s = g[_], o = g[_ + 1], a = g[_ + 2], h = g[_ + 3], e = u[_], i = u[_ + 1], r = u[_ + 2], n = u[_ + 3], this.mode) {
                    case "multiply":
                        g[_] = s * e / 255, g[_ + 1] = o * i / 255, g[_ + 2] = a * r / 255, g[_ + 3] = h * n / 255;
                        break;
                    case "mask":
                        g[_ + 3] = n
                }
            },
            getUniformLocations: function(t, e) {
                return {
                    uTransformMatrix: t.getUniformLocation(e, "uTransformMatrix"),
                    uImage: t.getUniformLocation(e, "uImage")
                }
            },
            sendUniformData: function(t, e) {
                var i = this.calculateMatrix();
                t.uniform1i(e.uImage, 1), t.uniformMatrix3fv(e.uTransformMatrix, !1, i)
            },
            toObject: function() {
                return {
                    type: this.type,
                    image: this.image && this.image.toObject(),
                    mode: this.mode,
                    alpha: this.alpha
                }
            }
        }), e.Image.filters.BlendImage.fromObject = function(t, i) {
            e.Image.fromObject(t.image, function(r) {
                var n = e.util.object.clone(t);
                n.image = r, i(new e.Image.filters.BlendImage(n))
            })
        }
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = Math.pow,
            r = Math.floor,
            n = Math.sqrt,
            s = Math.abs,
            o = Math.round,
            a = Math.sin,
            h = Math.ceil,
            c = e.Image.filters,
            l = e.util.createClass;
        c.Resize = l(c.BaseFilter, {
            type: "Resize",
            resizeType: "hermite",
            scaleX: 0,
            scaleY: 0,
            lanczosLobes: 3,
            getUniformLocations: function(t, e) {
                return {
                    uDelta: t.getUniformLocation(e, "uDelta"),
                    uTaps: t.getUniformLocation(e, "uTaps")
                }
            },
            sendUniformData: function(t, e) {
                t.uniform2fv(e.uDelta, this.horizontal ? [1 / this.width, 0] : [0, 1 / this.height]), t.uniform1fv(e.uTaps, this.taps)
            },
            retrieveShader: function(t) {
                var e = this.getFilterWindow(),
                    i = this.type + "_" + e;
                if (!t.programCache.hasOwnProperty(i)) {
                    var r = this.generateShader(e);
                    t.programCache[i] = this.createProgram(t.context, r)
                }
                return t.programCache[i]
            },
            getFilterWindow: function() {
                var t = this.tempScale;
                return Math.ceil(this.lanczosLobes / t)
            },
            getTaps: function() {
                for (var t = this.lanczosCreate(this.lanczosLobes), e = this.tempScale, i = this.getFilterWindow(), r = new Array(i), n = 1; n <= i; n++) r[n - 1] = t(n * e);
                return r
            },
            generateShader: function(t) {
                for (var t, e = new Array(t), i = this.fragmentSourceTOP, r = 1; r <= t; r++) e[r - 1] = r + ".0 * uDelta";
                return i += "uniform float uTaps[" + t + "];\n", i += "void main() {\n", i += "  vec4 color = texture2D(uTexture, vTexCoord);\n", i += "  float sum = 1.0;\n", e.forEach(function(t, e) {
                    i += "  color += texture2D(uTexture, vTexCoord + " + t + ") * uTaps[" + e + "];\n", i += "  color += texture2D(uTexture, vTexCoord - " + t + ") * uTaps[" + e + "];\n", i += "  sum += 2.0 * uTaps[" + e + "];\n"
                }), i += "  gl_FragColor = color / sum;\n", i += "}"
            },
            fragmentSourceTOP: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec2 uDelta;\nvarying vec2 vTexCoord;\n",
            applyTo: function(t) {
                if (t.webgl) {
                    if (t.passes > 1 && this.isNeutralState(t)) return;
                    t.passes++, this.width = t.sourceWidth, this.horizontal = !0, this.dW = Math.round(this.width * this.scaleX), this.dH = t.sourceHeight, this.tempScale = this.dW / this.width, this.taps = this.getTaps(), t.destinationWidth = this.dW, this._setupFrameBuffer(t), this.applyToWebGL(t), this._swapTextures(t), t.sourceWidth = t.destinationWidth, this.height = t.sourceHeight, this.horizontal = !1, this.dH = Math.round(this.height * this.scaleY), this.tempScale = this.dH / this.height, this.taps = this.getTaps(), t.destinationHeight = this.dH, this._setupFrameBuffer(t), this.applyToWebGL(t), this._swapTextures(t), t.sourceHeight = t.destinationHeight
                } else this.isNeutralState(t) || this.applyTo2d(t)
            },
            isNeutralState: function(t) {
                var e = t.scaleX || this.scaleX,
                    i = t.scaleY || this.scaleY;
                return 1 === e && 1 === i
            },
            lanczosCreate: function(t) {
                return function(e) {
                    if (e >= t || e <= -t) return 0;
                    if (e < 1.1920929e-7 && e > -1.1920929e-7) return 1;
                    var i = (e *= Math.PI) / t;
                    return a(e) / e * a(i) / i
                }
            },
            applyTo2d: function(t) {
                var e = t.imageData,
                    i = this.scaleX,
                    r = this.scaleY;
                this.rcpScaleX = 1 / i, this.rcpScaleY = 1 / r;
                var n, s = e.width,
                    a = e.height,
                    h = o(s * i),
                    c = o(a * r);
                "sliceHack" === this.resizeType ? n = this.sliceByTwo(t, s, a, h, c) : "hermite" === this.resizeType ? n = this.hermiteFastResize(t, s, a, h, c) : "bilinear" === this.resizeType ? n = this.bilinearFiltering(t, s, a, h, c) : "lanczos" === this.resizeType && (n = this.lanczosResize(t, s, a, h, c)), t.imageData = n
            },
            sliceByTwo: function(t, i, n, s, o) {
                var a, h, c = t.imageData,
                    l = !1,
                    u = !1,
                    f = .5 * i,
                    d = .5 * n,
                    g = e.filterBackend.resources,
                    p = 0,
                    v = 0,
                    m = i,
                    b = 0;
                for (g.sliceByTwo || (g.sliceByTwo = document.createElement("canvas")), ((a = g.sliceByTwo).width < 1.5 * i || a.height < n) && (a.width = 1.5 * i, a.height = n), (h = a.getContext("2d")).clearRect(0, 0, 1.5 * i, n), h.putImageData(c, 0, 0), s = r(s), o = r(o); !l || !u;) i = f, n = d, s < r(.5 * f) ? f = r(.5 * f) : (f = s, l = !0), o < r(.5 * d) ? d = r(.5 * d) : (d = o, u = !0), h.drawImage(a, p, v, i, n, m, b, f, d), p = m, v = b, b += d;
                return h.getImageData(p, v, s, o)
            },
            lanczosResize: function(t, e, o, a, c) {
                function l(t) {
                    var h, w, T, O, k, D, j, E, A, P, M;
                    for (C.x = (t + .5) * p, S.x = r(C.x), h = 0; h < c; h++) {
                        for (C.y = (h + .5) * v, S.y = r(C.y), k = 0, D = 0, j = 0, E = 0, A = 0, w = S.x - _; w <= S.x + _; w++)
                            if (!(w < 0 || w >= e)) {
                                P = r(1e3 * s(w - C.x)), x[P] || (x[P] = {});
                                for (var F = S.y - y; F <= S.y + y; F++) F < 0 || F >= o || (M = r(1e3 * s(F - C.y)), x[P][M] || (x[P][M] = g(n(i(P * m, 2) + i(M * b, 2)) / 1e3)), (T = x[P][M]) > 0 && (k += T, D += T * u[O = 4 * (F * e + w)], j += T * u[O + 1], E += T * u[O + 2], A += T * u[O + 3]))
                            }
                        d[O = 4 * (h * a + t)] = D / k, d[O + 1] = j / k, d[O + 2] = E / k, d[O + 3] = A / k
                    }
                    return ++t < a ? l(t) : f
                }
                var u = t.imageData.data,
                    f = t.ctx.createImageData(a, c),
                    d = f.data,
                    g = this.lanczosCreate(this.lanczosLobes),
                    p = this.rcpScaleX,
                    v = this.rcpScaleY,
                    m = 2 / this.rcpScaleX,
                    b = 2 / this.rcpScaleY,
                    _ = h(p * this.lanczosLobes / 2),
                    y = h(v * this.lanczosLobes / 2),
                    x = {},
                    C = {},
                    S = {};
                return l(0)
            },
            bilinearFiltering: function(t, e, i, n, s) {
                var o, a, h, c, l, u, f, d, g, p = 0,
                    v = this.rcpScaleX,
                    m = this.rcpScaleY,
                    b = 4 * (e - 1),
                    _ = t.imageData.data,
                    y = t.ctx.createImageData(n, s),
                    x = y.data;
                for (h = 0; h < s; h++)
                    for (c = 0; c < n; c++)
                        for (l = v * c - (o = r(v * c)), u = m * h - (a = r(m * h)), g = 4 * (a * e + o), f = 0; f < 4; f++) d = _[g + f] * (1 - l) * (1 - u) + _[g + 4 + f] * l * (1 - u) + _[g + b + f] * u * (1 - l) + _[g + b + 4 + f] * l * u, x[p++] = d;
                return y
            },
            hermiteFastResize: function(t, e, i, o, a) {
                for (var c = this.rcpScaleX, l = this.rcpScaleY, u = h(c / 2), f = h(l / 2), d = t.imageData.data, g = t.ctx.createImageData(o, a), p = g.data, v = 0; v < a; v++)
                    for (var m = 0; m < o; m++) {
                        for (var b = 4 * (m + v * o), _ = 0, y = 0, x = 0, C = 0, S = 0, w = 0, T = 0, O = (v + .5) * l, k = r(v * l); k < (v + 1) * l; k++)
                            for (var D = s(O - (k + .5)) / f, j = (m + .5) * c, E = D * D, A = r(m * c); A < (m + 1) * c; A++) {
                                var P = s(j - (A + .5)) / u,
                                    M = n(E + P * P);
                                M > 1 && M < -1 || (_ = 2 * M * M * M - 3 * M * M + 1) > 0 && (T += _ * d[(P = 4 * (A + k * e)) + 3], x += _, d[P + 3] < 255 && (_ = _ * d[P + 3] / 250), C += _ * d[P], S += _ * d[P + 1], w += _ * d[P + 2], y += _)
                            }
                        p[b] = C / y, p[b + 1] = S / y, p[b + 2] = w / y, p[b + 3] = T / x
                    }
                return g
            },
            toObject: function() {
                return {
                    type: this.type,
                    scaleX: this.scaleX,
                    scaleY: this.scaleY,
                    resizeType: this.resizeType,
                    lanczosLobes: this.lanczosLobes
                }
            }
        }), e.Image.filters.Resize.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.Contrast = r(i.BaseFilter, {
            type: "Contrast",
            fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uContrast;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));\ncolor.rgb = contrastF * (color.rgb - 0.5) + 0.5;\ngl_FragColor = color;\n}",
            contrast: 0,
            mainParameter: "contrast",
            applyTo2d: function(t) {
                if (0 !== this.contrast) {
                    var e, i = t.imageData.data,
                        r = i.length,
                        n = Math.floor(255 * this.contrast),
                        s = 259 * (n + 255) / (255 * (259 - n));
                    for (e = 0; e < r; e += 4) i[e] = s * (i[e] - 128) + 128, i[e + 1] = s * (i[e + 1] - 128) + 128, i[e + 2] = s * (i[e + 2] - 128) + 128
                }
            },
            getUniformLocations: function(t, e) {
                return {
                    uContrast: t.getUniformLocation(e, "uContrast")
                }
            },
            sendUniformData: function(t, e) {
                t.uniform1f(e.uContrast, this.contrast)
            }
        }), e.Image.filters.Contrast.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.Saturation = r(i.BaseFilter, {
            type: "Saturation",
            fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform float uSaturation;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat rgMax = max(color.r, color.g);\nfloat rgbMax = max(rgMax, color.b);\ncolor.r += rgbMax != color.r ? (rgbMax - color.r) * uSaturation : 0.00;\ncolor.g += rgbMax != color.g ? (rgbMax - color.g) * uSaturation : 0.00;\ncolor.b += rgbMax != color.b ? (rgbMax - color.b) * uSaturation : 0.00;\ngl_FragColor = color;\n}",
            saturation: 0,
            mainParameter: "saturation",
            applyTo2d: function(t) {
                if (0 !== this.saturation) {
                    var e, i, r = t.imageData.data,
                        n = r.length,
                        s = -this.saturation;
                    for (e = 0; e < n; e += 4) i = Math.max(r[e], r[e + 1], r[e + 2]), r[e] += i !== r[e] ? (i - r[e]) * s : 0, r[e + 1] += i !== r[e + 1] ? (i - r[e + 1]) * s : 0, r[e + 2] += i !== r[e + 2] ? (i - r[e + 2]) * s : 0
                }
            },
            getUniformLocations: function(t, e) {
                return {
                    uSaturation: t.getUniformLocation(e, "uSaturation")
                }
            },
            sendUniformData: function(t, e) {
                t.uniform1f(e.uSaturation, -this.saturation)
            }
        }), e.Image.filters.Saturation.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.Blur = r(i.BaseFilter, {
            type: "Blur",
            fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec2 uDelta;\nvarying vec2 vTexCoord;\nconst float nSamples = 15.0;\nvec3 v3offset = vec3(12.9898, 78.233, 151.7182);\nfloat random(vec3 scale) {\nreturn fract(sin(dot(gl_FragCoord.xyz, scale)) * 43758.5453);\n}\nvoid main() {\nvec4 color = vec4(0.0);\nfloat total = 0.0;\nfloat offset = random(v3offset);\nfor (float t = -nSamples; t <= nSamples; t++) {\nfloat percent = (t + offset - 0.5) / nSamples;\nfloat weight = 1.0 - abs(percent);\ncolor += texture2D(uTexture, vTexCoord + uDelta * percent) * weight;\ntotal += weight;\n}\ngl_FragColor = color / total;\n}",
            blur: 0,
            mainParameter: "blur",
            applyTo: function(t) {
                t.webgl ? (this.aspectRatio = t.sourceWidth / t.sourceHeight, t.passes++, this._setupFrameBuffer(t), this.horizontal = !0, this.applyToWebGL(t), this._swapTextures(t), this._setupFrameBuffer(t), this.horizontal = !1, this.applyToWebGL(t), this._swapTextures(t)) : this.applyTo2d(t)
            },
            applyTo2d: function(t) {
                t.imageData = this.simpleBlur(t)
            },
            simpleBlur: function(t) {
                var e, i, r = t.filterBackend.resources,
                    n = t.imageData.width,
                    s = t.imageData.height;
                r.blurLayer1 || (r.blurLayer1 = document.createElement("canvas"), r.blurLayer2 = document.createElement("canvas")), e = r.blurLayer1, i = r.blurLayer2, e.width === n && e.height === s || (i.width = e.width = n, i.height = e.height = s);
                var o, a, h, c, l = e.getContext("2d"),
                    u = i.getContext("2d"),
                    f = .06 * this.blur * .5;
                for (l.putImageData(t.imageData, 0, 0), u.clearRect(0, 0, n, s), c = -15; c <= 15; c++) h = f * (a = c / 15) * n + (o = (Math.random() - .5) / 4), u.globalAlpha = 1 - Math.abs(a), u.drawImage(e, h, o), l.drawImage(i, 0, 0), u.globalAlpha = 1, u.clearRect(0, 0, i.width, i.height);
                for (c = -15; c <= 15; c++) h = f * (a = c / 15) * s + (o = (Math.random() - .5) / 4), u.globalAlpha = 1 - Math.abs(a), u.drawImage(e, o, h), l.drawImage(i, 0, 0), u.globalAlpha = 1, u.clearRect(0, 0, i.width, i.height);
                t.ctx.drawImage(e, 0, 0);
                var d = t.ctx.getImageData(0, 0, e.width, e.height);
                return l.globalAlpha = 1, l.clearRect(0, 0, e.width, e.height), d
            },
            getUniformLocations: function(t, e) {
                return {
                    delta: t.getUniformLocation(e, "uDelta")
                }
            },
            sendUniformData: function(t, e) {
                var i = this.chooseRightDelta();
                t.uniform2fv(e.delta, i)
            },
            chooseRightDelta: function() {
                var t, e = 1,
                    i = [0, 0];
                return this.horizontal ? this.aspectRatio > 1 && (e = 1 / this.aspectRatio) : this.aspectRatio < 1 && (e = this.aspectRatio), t = e * this.blur * .12, this.horizontal ? i[0] = t : i[1] = t, i
            }
        }), i.Blur.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.Gamma = r(i.BaseFilter, {
            type: "Gamma",
            fragmentSource: "precision highp float;\nuniform sampler2D uTexture;\nuniform vec3 uGamma;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec3 correction = (1.0 / uGamma);\ncolor.r = pow(color.r, correction.r);\ncolor.g = pow(color.g, correction.g);\ncolor.b = pow(color.b, correction.b);\ngl_FragColor = color;\ngl_FragColor.rgb *= color.a;\n}",
            gamma: [1, 1, 1],
            mainParameter: "gamma",
            applyTo2d: function(t) {
                var e, i = t.imageData.data,
                    r = this.gamma,
                    n = i.length,
                    s = 1 / r[0],
                    o = 1 / r[1],
                    a = 1 / r[2];
                for (this.rVals || (this.rVals = new Uint8Array(256), this.gVals = new Uint8Array(256), this.bVals = new Uint8Array(256)), e = 0, n = 256; e < n; e++) this.rVals[e] = 255 * Math.pow(e / 255, s), this.gVals[e] = 255 * Math.pow(e / 255, o), this.bVals[e] = 255 * Math.pow(e / 255, a);
                for (e = 0, n = i.length; e < n; e += 4) i[e] = this.rVals[i[e]], i[e + 1] = this.gVals[i[e + 1]], i[e + 2] = this.bVals[i[e + 2]]
            },
            getUniformLocations: function(t, e) {
                return {
                    uGamma: t.getUniformLocation(e, "uGamma")
                }
            },
            sendUniformData: function(t, e) {
                t.uniform3fv(e.uGamma, this.gamma)
            }
        }), e.Image.filters.Gamma.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.Composed = r(i.BaseFilter, {
            type: "Composed",
            subFilters: [],
            initialize: function(t) {
                this.callSuper("initialize", t), this.subFilters = this.subFilters.slice(0)
            },
            applyTo: function(t) {
                t.passes += this.subFilters.length - 1, this.subFilters.forEach(function(e) {
                    e.applyTo(t)
                })
            },
            toObject: function() {
                return e.util.object.extend(this.callSuper("toObject"), {
                    subFilters: this.subFilters.map(function(t) {
                        return t.toObject()
                    })
                })
            }
        }), e.Image.filters.Composed.fromObject = function(t, i) {
            var r = (t.subFilters || []).map(function(t) {
                    return new e.Image.filters[t.type](t)
                }),
                n = new e.Image.filters.Composed({
                    subFilters: r
                });
            return i && i(n), n
        }
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.Image.filters,
            r = e.util.createClass;
        i.HueRotation = r(i.ColorMatrix, {
            type: "HueRotation",
            rotation: 0,
            mainParameter: "rotation",
            calculateMatrix: function() {
                var t = this.rotation * Math.PI,
                    e = Math.cos(t),
                    i = Math.sin(t),
                    r = Math.sqrt(1 / 3) * i,
                    n = 1 - e;
                this.matrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0], this.matrix[0] = e + n / 3, this.matrix[1] = 1 / 3 * n - r, this.matrix[2] = 1 / 3 * n + r, this.matrix[5] = 1 / 3 * n + r, this.matrix[6] = e + 1 / 3 * n, this.matrix[7] = 1 / 3 * n - r, this.matrix[10] = 1 / 3 * n - r, this.matrix[11] = 1 / 3 * n + r, this.matrix[12] = e + 1 / 3 * n
            },
            applyTo: function(t) {
                this.calculateMatrix(), e.Image.filters.BaseFilter.prototype.applyTo.call(this, t)
            }
        }), e.Image.filters.HueRotation.fromObject = e.Image.filters.BaseFilter.fromObject
    }("undefined" != typeof exports ? exports : this),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {}),
            i = e.util.object.clone;
        e.Text ? e.warn("fabric.Text is already defined") : (e.Text = e.util.createClass(e.Object, {
            _dimensionAffectingProps: ["fontSize", "fontWeight", "fontFamily", "fontStyle", "lineHeight", "text", "charSpacing", "textAlign", "styles"],
            _reNewline: /\r?\n/,
            _reSpacesAndTabs: /[ \t\r]/g,
            _reSpaceAndTab: /[ \t\r]/,
            _reWords: /\S+/g,
            type: "text",
            fontSize: 40,
            fontWeight: "normal",
            fontFamily: "Times New Roman",
            underline: !1,
            overline: !1,
            linethrough: !1,
            textAlign: "left",
            fontStyle: "normal",
            lineHeight: 1.16,
            textBackgroundColor: "",
            stateProperties: e.Object.prototype.stateProperties.concat("fontFamily", "fontWeight", "fontSize", "text", "underline", "overline", "linethrough", "textAlign", "fontStyle", "lineHeight", "textBackgroundColor", "charSpacing", "styles"),
            cacheProperties: e.Object.prototype.cacheProperties.concat("fontFamily", "fontWeight", "fontSize", "text", "underline", "overline", "linethrough", "textAlign", "fontStyle", "lineHeight", "textBackgroundColor", "charSpacing", "styles"),
            stroke: null,
            shadow: null,
            _fontSizeFraction: .222,
            offsets: {
                underline: .1,
                linethrough: -.315,
                overline: -.88
            },
            _fontSizeMult: 1.13,
            charSpacing: 0,
            styles: null,
            _measuringContext: null,
            _styleProperties: ["stroke", "strokeWidth", "fill", "fontFamily", "fontSize", "fontWeight", "fontStyle", "underline", "overline", "linethrough", "textBackgroundColor"],
            __charBounds: [],
            initialize: function(t, e) {
                this.styles = e ? e.styles || {} : {}, this.text = t, this.__skipDimension = !0, this.callSuper("initialize", e), this.__skipDimension = !1, this.initDimensions(), this.setCoords(), this.setupState({
                    propertySet: "_dimensionAffectingProps"
                })
            },
            getMeasuringContext: function() {
                return e._measuringContext || (e._measuringContext = this.canvas && this.canvas.contextCache || e.util.createCanvasElement().getContext("2d")), e._measuringContext
            },
            _splitText: function() {
                var t = this._splitTextIntoLines(this.text);
                return this.textLines = t.lines, this._textLines = t.graphemeLines, this._unwrappedTextLines = t._unwrappedLines, this._text = t.graphemeText, t
            },
            initDimensions: function() {
                this.__skipDimension || (this._splitText(), this._clearCache(), this.width = this.calcTextWidth() || this.cursorWidth || 2, -1 !== this.textAlign.indexOf("justify") && this.enlargeSpaces(), this.height = this.calcTextHeight(), this.saveState({
                    propertySet: "_dimensionAffectingProps"
                }))
            },
            enlargeSpaces: function() {
                for (var t, e, i, r, n, s, o, a = 0, h = this._textLines.length; a < h; a++)
                    if (("justify" === this.textAlign || a !== h - 1 && !this.isEndOfWrapping(a)) && (r = 0, n = this._textLines[a], (e = this.getLineWidth(a)) < this.width && (o = this.textLines[a].match(this._reSpacesAndTabs)))) {
                        i = o.length, t = (this.width - e) / i;
                        for (var c = 0, l = n.length; c <= l; c++) s = this.__charBounds[a][c], this._reSpaceAndTab.test(n[c]) ? (s.width += t, s.kernedWidth += t, s.left += r, r += t) : s.left += r
                    }
            },
            isEndOfWrapping: function(t) {
                return t === this._textLines.length - 1
            },
            toString: function() {
                return "#<fabric.Text (" + this.complexity() + '): { "text": "' + this.text + '", "fontFamily": "' + this.fontFamily + '" }>'
            },
            _getCacheCanvasDimensions: function() {
                var t = this.callSuper("_getCacheCanvasDimensions"),
                    e = this.fontSize;
                return t.width += e * t.zoomX, t.height += e * t.zoomY, t
            },
            _render: function(t) {
                this._setTextStyles(t), this._renderTextLinesBackground(t), this._renderTextDecoration(t, "underline"), this._renderText(t), this._renderTextDecoration(t, "overline"), this._renderTextDecoration(t, "linethrough")
            },
            _renderText: function(t) {
                "stroke" === this.paintFirst ? (this._renderTextStroke(t), this._renderTextFill(t)) : (this._renderTextFill(t), this._renderTextStroke(t))
            },
            _setTextStyles: function(t, e, i) {
                t.textBaseline = "alphabetic", t.font = this._getFontDeclaration(e, i)
            },
            calcTextWidth: function() {
                for (var t = this.getLineWidth(0), e = 1, i = this._textLines.length; e < i; e++) {
                    var r = this.getLineWidth(e);
                    r > t && (t = r)
                }
                return t
            },
            _renderTextLine: function(t, e, i, r, n, s) {
                this._renderChars(t, e, i, r, n, s)
            },
            _renderTextLinesBackground: function(t) {
                if (this.textBackgroundColor || this.styleHas("textBackgroundColor")) {
                    for (var e, i, r, n, s, o, a = 0, h = t.fillStyle, c = this._getLeftOffset(), l = this._getTopOffset(), u = 0, f = 0, d = 0, g = this._textLines.length; d < g; d++)
                        if (e = this.getHeightOfLine(d), this.textBackgroundColor || this.styleHas("textBackgroundColor", d)) {
                            r = this._textLines[d], i = this._getLineLeftOffset(d), f = 0, u = 0, n = this.getValueOfPropertyAt(d, 0, "textBackgroundColor");
                            for (var p = 0, v = r.length; p < v; p++) s = this.__charBounds[d][p], (o = this.getValueOfPropertyAt(d, p, "textBackgroundColor")) !== n ? (t.fillStyle = n, n && t.fillRect(c + i + u, l + a, f, e / this.lineHeight), u = s.left, f = s.width, n = o) : f += s.kernedWidth;
                            o && (t.fillStyle = o, t.fillRect(c + i + u, l + a, f, e / this.lineHeight)), a += e
                        } else a += e;
                    t.fillStyle = h, this._removeShadow(t)
                }
            },
            getFontCache: function(t) {
                var i = t.fontFamily.toLowerCase();
                e.charWidthsCache[i] || (e.charWidthsCache[i] = {});
                var r = e.charWidthsCache[i],
                    n = t.fontStyle.toLowerCase() + "_" + (t.fontWeight + "").toLowerCase();
                return r[n] || (r[n] = {}), r[n]
            },
            _applyCharStyles: function(t, e, i, r, n) {
                this._setFillStyles(e, n), this._setStrokeStyles(e, n), e.font = this._getFontDeclaration(n)
            },
            _measureChar: function(t, e, i, r) {
                var n, s, o, a, h = this.getFontCache(e),
                    c = i + t,
                    l = this._getFontDeclaration(e) === this._getFontDeclaration(r),
                    u = e.fontSize / 200;
                if (i && h[i] && (o = h[i]), h[t] && (a = n = h[t]), l && h[c] && (a = (s = h[c]) - o), !n || !o || !s) {
                    var f = this.getMeasuringContext();
                    this._setTextStyles(f, e, !0)
                }
                if (n || (a = n = f.measureText(t).width, h[t] = n), !o && l && i && (o = f.measureText(i).width, h[i] = o), l && !s && (s = f.measureText(c).width, h[c] = s, (a = s - o) > n)) {
                    var d = a - n;
                    h[t] = a, h[c] += d, n = a
                }
                return {
                    width: n * u,
                    kernedWidth: a * u
                }
            },
            getHeightOfChar: function(t, e) {
                return this.getValueOfPropertyAt(t, e, "fontSize")
            },
            measureLine: function(t) {
                var e = this._measureLine(t);
                return 0 !== this.charSpacing && (e.width -= this._getWidthOfCharSpacing()), e.width < 0 && (e.width = 0), e
            },
            _measureLine: function(t) {
                var e, i, r, n, s = 0,
                    o = this._textLines[t],
                    a = new Array(o.length);
                for (this.__charBounds[t] = a, e = 0; e < o.length; e++) i = o[e], n = this._getGraphemeBox(i, t, e, r), a[e] = n, s += n.kernedWidth, r = i;
                return a[e] = {
                    left: n ? n.left + n.width : 0,
                    width: 0,
                    kernedWidth: 0,
                    height: this.fontSize
                }, {
                    width: s,
                    numOfSpaces: 0
                }
            },
            _getGraphemeBox: function(t, e, i, r, n) {
                var s = this.getCompleteStyleDeclaration(e, i),
                    o = r ? this.getCompleteStyleDeclaration(e, i - 1) : {},
                    a = this._measureChar(t, s, r, o),
                    h = a.kernedWidth,
                    c = a.width;
                0 !== this.charSpacing && (c += this._getWidthOfCharSpacing(), h += this._getWidthOfCharSpacing());
                var l = {
                    width: c,
                    left: 0,
                    height: s.fontSize,
                    kernedWidth: h
                };
                if (i > 0 && !n) {
                    var u = this.__charBounds[e][i - 1];
                    l.left = u.left + u.width + a.kernedWidth - a.width
                }
                return l
            },
            getHeightOfLine: function(t) {
                if (this.__lineHeights[t]) return this.__lineHeights[t];
                for (var e = this._textLines[t], i = this.getHeightOfChar(t, 0), r = 1, n = e.length; r < n; r++) {
                    var s = this.getHeightOfChar(t, r);
                    s > i && (i = s)
                }
                return this.__lineHeights[t] = i * this.lineHeight * this._fontSizeMult, this.__lineHeights[t]
            },
            calcTextHeight: function() {
                for (var t, e = 0, i = 0, r = this._textLines.length; i < r; i++) t = this.getHeightOfLine(i), e += i === r - 1 ? t / this.lineHeight : t;
                return e
            },
            _getLeftOffset: function() {
                return -this.width / 2
            },
            _getTopOffset: function() {
                return -this.height / 2
            },
            _renderTextCommon: function(t, e) {
                t.save();
                for (var i = 0, r = this._getLeftOffset(), n = this._getTopOffset(), s = this._applyPatternGradientTransform(t, "fillText" === e ? this.fill : this.stroke), o = 0, a = this._textLines.length; o < a; o++) {
                    var h = this.getHeightOfLine(o),
                        c = h / this.lineHeight,
                        l = this._getLineLeftOffset(o);
                    this._renderTextLine(e, t, this._textLines[o], r + l - s.offsetX, n + i + c - s.offsetY, o), i += h
                }
                t.restore()
            },
            _renderTextFill: function(t) {
                (this.fill || this.styleHas("fill")) && this._renderTextCommon(t, "fillText")
            },
            _renderTextStroke: function(t) {
                (this.stroke && 0 !== this.strokeWidth || !this.isEmptyStyles()) && (this.shadow && !this.shadow.affectStroke && this._removeShadow(t), t.save(), this._setLineDash(t, this.strokeDashArray), t.beginPath(), this._renderTextCommon(t, "strokeText"), t.closePath(), t.restore())
            },
            _renderChars: function(t, e, i, r, n, s) {
                var o, a, h, c, l = this.getHeightOfLine(s),
                    u = -1 !== this.textAlign.indexOf("justify"),
                    f = "",
                    d = 0;
                e.save(), n -= l * this._fontSizeFraction / this.lineHeight;
                for (var g = 0, p = i.length - 1; g <= p; g++) c = g === p || this.charSpacing, f += i[g], h = this.__charBounds[s][g], 0 === d ? (r += h.kernedWidth - h.width, d += h.width) : d += h.kernedWidth, u && !c && this._reSpaceAndTab.test(i[g]) && (c = !0), c || (o = o || this.getCompleteStyleDeclaration(s, g), a = this.getCompleteStyleDeclaration(s, g + 1), c = this._hasStyleChanged(o, a)), c && (this._renderChar(t, e, s, g, f, r, n, l), f = "", o = a, r += d, d = 0);
                e.restore()
            },
            _renderChar: function(t, e, i, r, n, s, o) {
                var a = this._getStyleDeclaration(i, r),
                    h = this.getCompleteStyleDeclaration(i, r),
                    c = "fillText" === t && h.fill,
                    l = "strokeText" === t && h.stroke && h.strokeWidth;
                (l || c) && (a && e.save(), this._applyCharStyles(t, e, i, r, h), a && a.textBackgroundColor && this._removeShadow(e), c && e.fillText(n, s, o), l && e.strokeText(n, s, o), a && e.restore())
            },
            _hasStyleChanged: function(t, e) {
                return t.fill !== e.fill || t.stroke !== e.stroke || t.strokeWidth !== e.strokeWidth || t.fontSize !== e.fontSize || t.fontFamily !== e.fontFamily || t.fontWeight !== e.fontWeight || t.fontStyle !== e.fontStyle
            },
            _hasStyleChangedForSvg: function(t, e) {
                return this._hasStyleChanged(t, e) || t.overline !== e.overline || t.underline !== e.underline || t.linethrough !== e.linethrough
            },
            _getLineLeftOffset: function(t) {
                var e = this.getLineWidth(t);
                return "center" === this.textAlign ? (this.width - e) / 2 : "right" === this.textAlign ? this.width - e : "justify-center" === this.textAlign && this.isEndOfWrapping(t) ? (this.width - e) / 2 : "justify-right" === this.textAlign && this.isEndOfWrapping(t) ? this.width - e : 0
            },
            _clearCache: function() {
                this.__lineWidths = [], this.__lineHeights = [], this.__charBounds = []
            },
            _shouldClearDimensionCache: function() {
                var t = this._forceClearCache;
                return t || (t = this.hasStateChanged("_dimensionAffectingProps")), t && (this.dirty = !0, this._forceClearCache = !1), t
            },
            getLineWidth: function(t) {
                if (this.__lineWidths[t]) return this.__lineWidths[t];
                var e;
                return e = "" === this._textLines[t] ? 0 : this.measureLine(t).width, this.__lineWidths[t] = e, e
            },
            _getWidthOfCharSpacing: function() {
                return 0 !== this.charSpacing ? this.fontSize * this.charSpacing / 1e3 : 0
            },
            getValueOfPropertyAt: function(t, e, i) {
                var r = this._getStyleDeclaration(t, e);
                return r && void 0 !== r[i] ? r[i] : this[i]
            },
            _renderTextDecoration: function(t, e) {
                if (this[e] || this.styleHas(e)) {
                    for (var i, r, n, s, o, a, h, c, l, u, f, d = this._getLeftOffset(), g = this._getTopOffset(), p = 0, v = this._textLines.length; p < v; p++)
                        if (i = this.getHeightOfLine(p), this[e] || this.styleHas(e, p)) {
                            n = this._textLines[p], l = i / this.lineHeight, r = this._getLineLeftOffset(p), o = 0, a = 0, s = this.getValueOfPropertyAt(p, 0, e), f = this.getValueOfPropertyAt(p, 0, "fill");
                            for (var m = 0, b = n.length; m < b; m++) h = this.__charBounds[p][m], c = this.getValueOfPropertyAt(p, m, e), u = this.getValueOfPropertyAt(p, m, "fill"), (c !== s || u !== f) && a > 0 ? (t.fillStyle = f, s && f && t.fillRect(d + r + o, g + l * (1 - this._fontSizeFraction) + this.offsets[e] * this.fontSize, a, this.fontSize / 15), o = h.left, a = h.width, s = c, f = u) : a += h.kernedWidth;
                            t.fillStyle = u, c && u && t.fillRect(d + r + o, g + l * (1 - this._fontSizeFraction) + this.offsets[e] * this.fontSize, a, this.fontSize / 15), g += i
                        } else g += i;
                    this._removeShadow(t)
                }
            },
            _getFontDeclaration: function(t, i) {
                var r = t || this;
                return [e.isLikelyNode ? r.fontWeight : r.fontStyle, e.isLikelyNode ? r.fontStyle : r.fontWeight, i ? "200px" : r.fontSize + "px", e.isLikelyNode ? '"' + r.fontFamily + '"' : r.fontFamily].join(" ")
            },
            render: function(t) {
                this.visible && (this.canvas && this.canvas.skipOffscreen && !this.group && !this.isOnScreen() || (this._shouldClearDimensionCache() && this.initDimensions(), this.callSuper("render", t)))
            },
            _splitTextIntoLines: function(t) {
                for (var i = t.split(this._reNewline), r = new Array(i.length), n = ["\n"], s = [], o = 0; o < i.length; o++) r[o] = e.util.string.graphemeSplit(i[o]), s = s.concat(r[o], n);
                return s.pop(), {
                    _unwrappedLines: r,
                    lines: i,
                    graphemeText: s,
                    graphemeLines: r
                }
            },
            toObject: function(t) {
                var e = ["text", "fontSize", "fontWeight", "fontFamily", "fontStyle", "lineHeight", "underline", "overline", "linethrough", "textAlign", "textBackgroundColor", "charSpacing"].concat(t),
                    r = this.callSuper("toObject", e);
                return r.styles = i(this.styles, !0), r
            },
            set: function(t, e) {
                this.callSuper("set", t, e);
                var i = !1;
                if ("object" == typeof t)
                    for (var r in t) i = i || -1 !== this._dimensionAffectingProps.indexOf(r);
                else i = -1 !== this._dimensionAffectingProps.indexOf(t);
                return i && (this.initDimensions(), this.setCoords()), this
            },
            complexity: function() {
                return 1
            }
        }), e.Text.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat("x y dx dy font-family font-style font-weight font-size text-decoration text-anchor".split(" ")), e.Text.DEFAULT_SVG_FONT_SIZE = 16, e.Text.fromElement = function(t, r, n) {
            if (!t) return r(null);
            var s = e.parseAttributes(t, e.Text.ATTRIBUTE_NAMES),
                o = s.textAnchor || "left";
            if (n = e.util.object.extend(n ? i(n) : {}, s), n.top = n.top || 0, n.left = n.left || 0, s.textDecoration) {
                var a = s.textDecoration; - 1 !== a.indexOf("underline") && (n.underline = !0), -1 !== a.indexOf("overline") && (n.overline = !0), -1 !== a.indexOf("line-through") && (n.linethrough = !0), delete n.textDecoration
            }
            "dx" in s && (n.left += s.dx), "dy" in s && (n.top += s.dy), "fontSize" in n || (n.fontSize = e.Text.DEFAULT_SVG_FONT_SIZE);
            var h = "";
            "textContent" in t ? h = t.textContent : "firstChild" in t && null !== t.firstChild && "data" in t.firstChild && null !== t.firstChild.data && (h = t.firstChild.data), h = h.replace(/^\s+|\s+$|\n+/g, "").replace(/\s+/g, " ");
            var c = new e.Text(h, n),
                l = c.getScaledHeight() / c.height,
                u = ((c.height + c.strokeWidth) * c.lineHeight - c.height) * l,
                f = c.getScaledHeight() + u,
                d = 0;
            "center" === o && (d = c.getScaledWidth() / 2), "right" === o && (d = c.getScaledWidth()), c.set({
                left: c.left - d,
                top: c.top - (f - c.fontSize * (.18 + c._fontSizeFraction)) / c.lineHeight
            }), r(c)
        }, e.Text.fromObject = function(t, i) {
            return e.Object._fromObject("Text", t, i, "text")
        }, e.util.createAccessors && e.util.createAccessors(e.Text))
    }("undefined" != typeof exports ? exports : this), fabric.util.object.extend(fabric.Text.prototype, {
        isEmptyStyles: function(t) {
            if (!this.styles) return !0;
            if (void 0 !== t && !this.styles[t]) return !0;
            var e = void 0 === t ? this.styles : {
                line: this.styles[t]
            };
            for (var i in e)
                for (var r in e[i])
                    for (var n in e[i][r]) return !1;
            return !0
        },
        styleHas: function(t, e) {
            if (!this.styles || !t || "" === t) return !1;
            if (void 0 !== e && !this.styles[e]) return !1;
            var i = void 0 === e ? this.styles : {
                line: this.styles[e]
            };
            for (var r in i)
                for (var n in i[r])
                    if (void 0 !== i[r][n][t]) return !0;
            return !1
        },
        cleanStyle: function(t) {
            if (!this.styles || !t || "" === t) return !1;
            var e, i, r = this.styles,
                n = 0,
                s = !1,
                o = !0,
                a = 0;
            for (var h in r) {
                e = 0;
                for (var c in r[h]) n++, s ? r[h][c][t] !== i && (o = !1) : (i = r[h][c][t], s = !0), r[h][c][t] === this[t] && delete r[h][c][t], 0 !== Object.keys(r[h][c]).length ? e++ : delete r[h][c];
                0 === e && delete r[h]
            }
            for (var l = 0; l < this._textLines.length; l++) a += this._textLines[l].length;
            o && n === a && (this[t] = i, this.removeStyle(t))
        },
        removeStyle: function(t) {
            if (this.styles && t && "" !== t) {
                var e, i, r, n = this.styles;
                for (i in n) {
                    e = n[i];
                    for (r in e) delete e[r][t], 0 === Object.keys(e[r]).length && delete e[r];
                    0 === Object.keys(e).length && delete n[i]
                }
            }
        },
        _extendStyles: function(t, e) {
            var i = this.get2DCursorLocation(t);
            this._getLineStyle(i.lineIndex) || this._setLineStyle(i.lineIndex, {}), this._getStyleDeclaration(i.lineIndex, i.charIndex) || this._setStyleDeclaration(i.lineIndex, i.charIndex, {}), fabric.util.object.extend(this._getStyleDeclaration(i.lineIndex, i.charIndex), e)
        },
        get2DCursorLocation: function(t, e) {
            void 0 === t && (t = this.selectionStart);
            for (var i = e ? this._unwrappedTextLines : this._textLines, r = i.length, n = 0; n < r; n++) {
                if (t <= i[n].length) return {
                    lineIndex: n,
                    charIndex: t
                };
                t -= i[n].length + 1
            }
            return {
                lineIndex: n - 1,
                charIndex: i[n - 1].length < t ? i[n - 1].length : t
            }
        },
        getSelectionStyles: function(t, e, i) {
            void 0 === t && (t = this.selectionStart || 0), void 0 === e && (e = this.selectionEnd || t);
            for (var r = [], n = t; n < e; n++) r.push(this.getStyleAtPosition(n, i));
            return r
        },
        getStyleAtPosition: function(t, e) {
            var i = this.get2DCursorLocation(t);
            return (e ? this.getCompleteStyleDeclaration(i.lineIndex, i.charIndex) : this._getStyleDeclaration(i.lineIndex, i.charIndex)) || {}
        },
        setSelectionStyles: function(t, e, i) {
            void 0 === e && (e = this.selectionStart || 0), void 0 === i && (i = this.selectionEnd || e);
            for (var r = e; r < i; r++) this._extendStyles(r, t);
            return this._forceClearCache = !0, this
        },
        _getStyleDeclaration: function(t, e) {
            var i = this.styles && this.styles[t];
            return i ? i[e] : null
        },
        getCompleteStyleDeclaration: function(t, e) {
            for (var i, r = this._getStyleDeclaration(t, e) || {}, n = {}, s = 0; s < this._styleProperties.length; s++) n[i = this._styleProperties[s]] = void 0 === r[i] ? this[i] : r[i];
            return n
        },
        _setStyleDeclaration: function(t, e, i) {
            this.styles[t][e] = i
        },
        _deleteStyleDeclaration: function(t, e) {
            delete this.styles[t][e]
        },
        _getLineStyle: function(t) {
            return this.styles[t]
        },
        _setLineStyle: function(t, e) {
            this.styles[t] = e
        },
        _deleteLineStyle: function(t) {
            delete this.styles[t]
        }
    }),
    function() {
        function t(t) {
            t.textDecoration && (t.textDecoration.indexOf("underline") > -1 && (t.underline = !0), t.textDecoration.indexOf("line-through") > -1 && (t.linethrough = !0), t.textDecoration.indexOf("overline") > -1 && (t.overline = !0), delete t.textDecoration)
        }
        fabric.IText = fabric.util.createClass(fabric.Text, fabric.Observable, {
            type: "i-text",
            selectionStart: 0,
            selectionEnd: 0,
            selectionColor: "rgba(17,119,255,0.3)",
            isEditing: !1,
            editable: !0,
            editingBorderColor: "rgba(102,153,255,0.25)",
            cursorWidth: 2,
            cursorColor: "#333",
            cursorDelay: 1e3,
            cursorDuration: 600,
            caching: !0,
            _reSpace: /\s|\n/,
            _currentCursorOpacity: 0,
            _selectionDirection: null,
            _abortCursorAnimation: !1,
            __widthOfSpace: [],
            inCompositionMode: !1,
            initialize: function(t, e) {
                this.callSuper("initialize", t, e), this.initBehavior()
            },
            setSelectionStart: function(t) {
                t = Math.max(t, 0), this._updateAndFire("selectionStart", t)
            },
            setSelectionEnd: function(t) {
                t = Math.min(t, this.text.length), this._updateAndFire("selectionEnd", t)
            },
            _updateAndFire: function(t, e) {
                this[t] !== e && (this._fireSelectionChanged(), this[t] = e), this._updateTextarea()
            },
            _fireSelectionChanged: function() {
                this.fire("selection:changed"), this.canvas && this.canvas.fire("text:selection:changed", {
                    target: this
                })
            },
            initDimensions: function() {
                this.isEditing && this.initDelayedCursor(), this.clearContextTop(), this.callSuper("initDimensions")
            },
            render: function(t) {
                this.clearContextTop(), this.callSuper("render", t), this.cursorOffsetCache = {}, this.renderCursorOrSelection()
            },
            _render: function(t) {
                this.callSuper("_render", t)
            },
            clearContextTop: function(t) {
                if (this.isEditing && this.canvas && this.canvas.contextTop) {
                    var e = this.canvas.contextTop,
                        i = this.canvas.viewportTransform;
                    e.save(), e.transform(i[0], i[1], i[2], i[3], i[4], i[5]), this.transform(e), this.transformMatrix && e.transform.apply(e, this.transformMatrix), this._clearTextArea(e), t || e.restore()
                }
            },
            renderCursorOrSelection: function() {
                if (this.isEditing && this.canvas) {
                    var t, e = this._getCursorBoundaries();
                    this.canvas && this.canvas.contextTop ? (t = this.canvas.contextTop, this.clearContextTop(!0)) : (t = this.canvas.contextContainer).save(), this.selectionStart === this.selectionEnd ? this.renderCursor(e, t) : this.renderSelection(e, t), t.restore()
                }
            },
            _clearTextArea: function(t) {
                var e = this.width + 4,
                    i = this.height + 4;
                t.clearRect(-e / 2, -i / 2, e, i)
            },
            _getCursorBoundaries: function(t) {
                void 0 === t && (t = this.selectionStart);
                var e = this._getLeftOffset(),
                    i = this._getTopOffset(),
                    r = this._getCursorBoundariesOffsets(t);
                return {
                    left: e,
                    top: i,
                    leftOffset: r.left,
                    topOffset: r.top
                }
            },
            _getCursorBoundariesOffsets: function(t) {
                if (this.cursorOffsetCache && "top" in this.cursorOffsetCache) return this.cursorOffsetCache;
                for (var e, i, r = 0, n = 0, s = this.get2DCursorLocation(t), o = 0; o < s.lineIndex; o++) r += this.getHeightOfLine(o);
                e = this._getLineLeftOffset(s.lineIndex);
                var a = this.__charBounds[s.lineIndex][s.charIndex];
                return a && (n = a.left), 0 !== this.charSpacing && 0 === this._textLines[0].length && (n -= this._getWidthOfCharSpacing()), i = {
                    top: r,
                    left: e + (n > 0 ? n : 0)
                }, this.cursorOffsetCache = i, this.cursorOffsetCache
            },
            renderCursor: function(t, e) {
                var i = this.get2DCursorLocation(),
                    r = i.lineIndex,
                    n = i.charIndex > 0 ? i.charIndex - 1 : 0,
                    s = this.getValueOfPropertyAt(r, n, "fontSize"),
                    o = this.scaleX * this.canvas.getZoom(),
                    a = this.cursorWidth / o,
                    h = t.topOffset;
                h += (1 - this._fontSizeFraction) * this.getHeightOfLine(r) / this.lineHeight - s * (1 - this._fontSizeFraction), this.inCompositionMode && this.renderSelection(t, e), e.fillStyle = this.getValueOfPropertyAt(r, n, "fill"), e.globalAlpha = this.__isMousedown ? 1 : this._currentCursorOpacity, e.fillRect(t.left + t.leftOffset - a / 2, h + t.top, a, s)
            },
            renderSelection: function(t, e) {
                for (var i = this.inCompositionMode ? this.hiddenTextarea.selectionStart : this.selectionStart, r = this.inCompositionMode ? this.hiddenTextarea.selectionEnd : this.selectionEnd, n = -1 !== this.textAlign.indexOf("justify"), s = this.get2DCursorLocation(i), o = this.get2DCursorLocation(r), a = s.lineIndex, h = o.lineIndex, c = s.charIndex < 0 ? 0 : s.charIndex, l = o.charIndex < 0 ? 0 : o.charIndex, u = a; u <= h; u++) {
                    var f = this._getLineLeftOffset(u) || 0,
                        d = this.getHeightOfLine(u),
                        g = 0,
                        p = 0,
                        v = 0;
                    u === a && (p = this.__charBounds[a][c].left), u >= a && u < h ? v = n && !this.isEndOfWrapping(u) ? this.width : this.getLineWidth(u) || 5 : u === h && (v = 0 === l ? this.__charBounds[h][l].left : this.__charBounds[h][l - 1].left + this.__charBounds[h][l - 1].width), g = d, (this.lineHeight < 1 || u === h && this.lineHeight > 1) && (d /= this.lineHeight), this.inCompositionMode ? (e.fillStyle = this.compositionColor || "black", e.fillRect(t.left + f + p, t.top + t.topOffset + d, v - p, 1)) : (e.fillStyle = this.selectionColor, e.fillRect(t.left + f + p, t.top + t.topOffset, v - p, d)), t.topOffset += g
                }
            },
            getCurrentCharFontSize: function() {
                var t = this._getCurrentCharIndex();
                return this.getValueOfPropertyAt(t.l, t.c, "fontSize")
            },
            getCurrentCharColor: function() {
                var t = this._getCurrentCharIndex();
                return this.getValueOfPropertyAt(t.l, t.c, "fill")
            },
            _getCurrentCharIndex: function() {
                var t = this.get2DCursorLocation(this.selectionStart, !0),
                    e = t.charIndex > 0 ? t.charIndex - 1 : 0;
                return {
                    l: t.lineIndex,
                    c: e
                }
            }
        }), fabric.IText.fromObject = function(e, i) {
            if (t(e), e.styles)
                for (var r in e.styles)
                    for (var n in e.styles[r]) t(e.styles[r][n]);
            fabric.Object._fromObject("IText", e, i, "text")
        }
    }(),
    function() {
        var t = fabric.util.object.clone;
        fabric.util.object.extend(fabric.IText.prototype, {
            initBehavior: function() {
                this.initAddedHandler(), this.initRemovedHandler(), this.initCursorSelectionHandlers(), this.initDoubleClickSimulation(), this.mouseMoveHandler = this.mouseMoveHandler.bind(this)
            },
            onDeselect: function(t) {
                this.isEditing && this.exitEditing(), this.selected = !1, fabric.Object.prototype.onDeselect.call(this, t)
            },
            initAddedHandler: function() {
                var t = this;
                this.on("added", function() {
                    var e = t.canvas;
                    e && (e._hasITextHandlers || (e._hasITextHandlers = !0, t._initCanvasHandlers(e)), e._iTextInstances = e._iTextInstances || [], e._iTextInstances.push(t))
                })
            },
            initRemovedHandler: function() {
                var t = this;
                this.on("removed", function() {
                    var e = t.canvas;
                    e && (e._iTextInstances = e._iTextInstances || [], fabric.util.removeFromArray(e._iTextInstances, t), 0 === e._iTextInstances.length && (e._hasITextHandlers = !1, t._removeCanvasHandlers(e)))
                })
            },
            _initCanvasHandlers: function(t) {
                t._mouseUpITextHandler = function() {
                    t._iTextInstances && t._iTextInstances.forEach(function(t) {
                        t.__isMousedown = !1
                    })
                }.bind(this), t.on("mouse:up", t._mouseUpITextHandler)
            },
            _removeCanvasHandlers: function(t) {
                t.off("mouse:up", t._mouseUpITextHandler)
            },
            _tick: function() {
                this._currentTickState = this._animateCursor(this, 1, this.cursorDuration, "_onTickComplete")
            },
            _animateCursor: function(t, e, i, r) {
                var n;
                return n = {
                    isAborted: !1,
                    abort: function() {
                        this.isAborted = !0
                    }
                }, t.animate("_currentCursorOpacity", e, {
                    duration: i,
                    onComplete: function() {
                        n.isAborted || t[r]()
                    },
                    onChange: function() {
                        t.canvas && t.selectionStart === t.selectionEnd && t.renderCursorOrSelection()
                    },
                    abort: function() {
                        return n.isAborted
                    }
                }), n
            },
            _onTickComplete: function() {
                var t = this;
                this._cursorTimeout1 && clearTimeout(this._cursorTimeout1), this._cursorTimeout1 = setTimeout(function() {
                    t._currentTickCompleteState = t._animateCursor(t, 0, this.cursorDuration / 2, "_tick")
                }, 100)
            },
            initDelayedCursor: function(t) {
                var e = this,
                    i = t ? 0 : this.cursorDelay;
                this.abortCursorAnimation(), this._currentCursorOpacity = 1, this._cursorTimeout2 = setTimeout(function() {
                    e._tick()
                }, i)
            },
            abortCursorAnimation: function() {
                var t = this._currentTickState || this._currentTickCompleteState,
                    e = this.canvas;
                this._currentTickState && this._currentTickState.abort(), this._currentTickCompleteState && this._currentTickCompleteState.abort(), clearTimeout(this._cursorTimeout1), clearTimeout(this._cursorTimeout2), this._currentCursorOpacity = 0, t && e && e.clearContext(e.contextTop || e.contextContainer)
            },
            selectAll: function() {
                return this.selectionStart = 0, this.selectionEnd = this._text.length, this._fireSelectionChanged(), this._updateTextarea(), this
            },
            getSelectedText: function() {
                return this._text.slice(this.selectionStart, this.selectionEnd).join("")
            },
            findWordBoundaryLeft: function(t) {
                var e = 0,
                    i = t - 1;
                if (this._reSpace.test(this._text[i]))
                    for (; this._reSpace.test(this._text[i]);) e++, i--;
                for (;
                    /\S/.test(this._text[i]) && i > -1;) e++, i--;
                return t - e
            },
            findWordBoundaryRight: function(t) {
                var e = 0,
                    i = t;
                if (this._reSpace.test(this._text[i]))
                    for (; this._reSpace.test(this._text[i]);) e++, i++;
                for (;
                    /\S/.test(this._text[i]) && i < this.text.length;) e++, i++;
                return t + e
            },
            findLineBoundaryLeft: function(t) {
                for (var e = 0, i = t - 1; !/\n/.test(this._text[i]) && i > -1;) e++, i--;
                return t - e
            },
            findLineBoundaryRight: function(t) {
                for (var e = 0, i = t; !/\n/.test(this._text[i]) && i < this.text.length;) e++, i++;
                return t + e
            },
            searchWordBoundary: function(t, e) {
                for (var i = this._reSpace.test(this.text.charAt(t)) ? t - 1 : t, r = this.text.charAt(i), n = /[ \n\.,;!\?\-]/; !n.test(r) && i > 0 && i < this.text.length;) i += e, r = this.text.charAt(i);
                return n.test(r) && "\n" !== r && (i += 1 === e ? 0 : 1), i
            },
            selectWord: function(t) {
                t = t || this.selectionStart;
                var e = this.searchWordBoundary(t, -1),
                    i = this.searchWordBoundary(t, 1);
                this.selectionStart = e, this.selectionEnd = i, this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection()
            },
            selectLine: function(t) {
                t = t || this.selectionStart;
                var e = this.findLineBoundaryLeft(t),
                    i = this.findLineBoundaryRight(t);
                return this.selectionStart = e, this.selectionEnd = i, this._fireSelectionChanged(), this._updateTextarea(), this
            },
            enterEditing: function(t) {
                if (!this.isEditing && this.editable) return this.canvas && this.exitEditingOnOthers(this.canvas), this.isEditing = !0, this.initHiddenTextarea(t), this.hiddenTextarea.focus(), this.hiddenTextarea.value = this.text, this._updateTextarea(), this._saveEditingProps(), this._setEditingProps(), this._textBeforeEdit = this.text, this._tick(), this.fire("editing:entered"), this._fireSelectionChanged(), this.canvas ? (this.canvas.fire("text:editing:entered", {
                    target: this
                }), this.initMouseMoveHandler(), this.canvas.requestRenderAll(), this) : this
            },
            exitEditingOnOthers: function(t) {
                t._iTextInstances && t._iTextInstances.forEach(function(t) {
                    t.selected = !1, t.isEditing && t.exitEditing()
                })
            },
            initMouseMoveHandler: function() {
                this.canvas.on("mouse:move", this.mouseMoveHandler)
            },
            mouseMoveHandler: function(t) {
                if (this.__isMousedown && this.isEditing) {
                    var e = this.getSelectionStartFromPointer(t.e),
                        i = this.selectionStart,
                        r = this.selectionEnd;
                    (e === this.__selectionStartOnMouseDown && i !== r || i !== e && r !== e) && (e > this.__selectionStartOnMouseDown ? (this.selectionStart = this.__selectionStartOnMouseDown, this.selectionEnd = e) : (this.selectionStart = e, this.selectionEnd = this.__selectionStartOnMouseDown), this.selectionStart === i && this.selectionEnd === r || (this.restartCursorIfNeeded(), this._fireSelectionChanged(), this._updateTextarea(), this.renderCursorOrSelection()))
                }
            },
            _setEditingProps: function() {
                this.hoverCursor = "text", this.canvas && (this.canvas.defaultCursor = this.canvas.moveCursor = "text"), this.borderColor = this.editingBorderColor, this.hasControls = this.selectable = !1, this.lockMovementX = this.lockMovementY = !0
            },
            fromStringToGraphemeSelection: function(t, e, i) {
                var r = i.slice(0, t),
                    n = fabric.util.string.graphemeSplit(r).length;
                if (t === e) return {
                    selectionStart: n,
                    selectionEnd: n
                };
                var s = i.slice(t, e);
                return {
                    selectionStart: n,
                    selectionEnd: n + fabric.util.string.graphemeSplit(s).length
                }
            },
            fromGraphemeToStringSelection: function(t, e, i) {
                var r = i.slice(0, t).join("").length;
                return t === e ? {
                    selectionStart: r,
                    selectionEnd: r
                } : {
                    selectionStart: r,
                    selectionEnd: r + i.slice(t, e).join("").length
                }
            },
            _updateTextarea: function() {
                if (this.cursorOffsetCache = {}, this.hiddenTextarea) {
                    if (!this.inCompositionMode) {
                        var t = this.fromGraphemeToStringSelection(this.selectionStart, this.selectionEnd, this._text);
                        this.hiddenTextarea.selectionStart = t.selectionStart, this.hiddenTextarea.selectionEnd = t.selectionEnd
                    }
                    this.updateTextareaPosition()
                }
            },
            updateFromTextArea: function() {
                if (this.hiddenTextarea) {
                    this.cursorOffsetCache = {}, this.text = this.hiddenTextarea.value, this._shouldClearDimensionCache() && (this.initDimensions(), this.setCoords());
                    var t = this.fromStringToGraphemeSelection(this.hiddenTextarea.selectionStart, this.hiddenTextarea.selectionEnd, this.hiddenTextarea.value);
                    this.selectionEnd = this.selectionStart = t.selectionEnd, this.inCompositionMode || (this.selectionStart = t.selectionStart), this.updateTextareaPosition()
                }
            },
            updateTextareaPosition: function() {
                if (this.selectionStart === this.selectionEnd) {
                    var t = this._calcTextareaPosition();
                    this.hiddenTextarea.style.left = t.left, this.hiddenTextarea.style.top = t.top
                }
            },
            _calcTextareaPosition: function() {
                if (!this.canvas) return {
                    x: 1,
                    y: 1
                };
                var t = this.inCompositionMode ? this.compositionStart : this.selectionStart,
                    e = this._getCursorBoundaries(t),
                    i = this.get2DCursorLocation(t),
                    r = i.lineIndex,
                    n = i.charIndex,
                    s = this.getValueOfPropertyAt(r, n, "fontSize") * this.lineHeight,
                    o = e.leftOffset,
                    a = this.calcTransformMatrix(),
                    h = {
                        x: e.left + o,
                        y: e.top + e.topOffset + s
                    },
                    c = this.canvas.upperCanvasEl,
                    l = c.width - s,
                    u = c.height - s;
                return h = fabric.util.transformPoint(h, a), (h = fabric.util.transformPoint(h, this.canvas.viewportTransform)).x < 0 && (h.x = 0), h.x > l && (h.x = l), h.y < 0 && (h.y = 0), h.y > u && (h.y = u), h.x += this.canvas._offset.left, h.y += this.canvas._offset.top, {
                    left: h.x + "px",
                    top: h.y + "px",
                    fontSize: s + "px",
                    charHeight: s
                }
            },
            _saveEditingProps: function() {
                this._savedProps = {
                    hasControls: this.hasControls,
                    borderColor: this.borderColor,
                    lockMovementX: this.lockMovementX,
                    lockMovementY: this.lockMovementY,
                    hoverCursor: this.hoverCursor,
                    defaultCursor: this.canvas && this.canvas.defaultCursor,
                    moveCursor: this.canvas && this.canvas.moveCursor
                }
            },
            _restoreEditingProps: function() {
                this._savedProps && (this.hoverCursor = this._savedProps.hoverCursor, this.hasControls = this._savedProps.hasControls, this.borderColor = this._savedProps.borderColor, this.lockMovementX = this._savedProps.lockMovementX, this.lockMovementY = this._savedProps.lockMovementY, this.canvas && (this.canvas.defaultCursor = this._savedProps.defaultCursor, this.canvas.moveCursor = this._savedProps.moveCursor))
            },
            exitEditing: function() {
                var t = this._textBeforeEdit !== this.text;
                return this.selected = !1, this.isEditing = !1, this.selectable = !0, this.selectionEnd = this.selectionStart, this.hiddenTextarea && (this.hiddenTextarea.blur && this.hiddenTextarea.blur(), this.canvas && this.hiddenTextarea.parentNode.removeChild(this.hiddenTextarea), this.hiddenTextarea = null), this.abortCursorAnimation(), this._restoreEditingProps(), this._currentCursorOpacity = 0, this._shouldClearDimensionCache() && (this.initDimensions(), this.setCoords()), this.fire("editing:exited"), t && this.fire("modified"), this.canvas && (this.canvas.off("mouse:move", this.mouseMoveHandler), this.canvas.fire("text:editing:exited", {
                    target: this
                }), t && this.canvas.fire("object:modified", {
                    target: this
                })), this
            },
            _removeExtraneousStyles: function() {
                for (var t in this.styles) this._textLines[t] || delete this.styles[t]
            },
            removeStyleFromTo: function(t, e) {
                var i, r, n = this.get2DCursorLocation(t, !0),
                    s = this.get2DCursorLocation(e, !0),
                    o = n.lineIndex,
                    a = n.charIndex,
                    h = s.lineIndex,
                    c = s.charIndex;
                if (o !== h) {
                    if (this.styles[o])
                        for (i = a; i < this._textLines[o].length; i++) delete this.styles[o][i];
                    if (this.styles[h])
                        for (i = c; i < this._textLines[h].length; i++)(r = this.styles[h][i]) && (this.styles[o] || (this.styles[o] = {}), this.styles[o][a + i - c] = r);
                    for (i = o + 1; i <= h; i++) delete this.styles[i];
                    this.shiftLineStyles(h, o - h)
                } else if (this.styles[o]) {
                    r = this.styles[o];
                    var l, u, f = c - a;
                    for (i = a; i < c; i++) delete r[i];
                    for (u in this.styles[o])(l = parseInt(u, 10)) >= c && (r[l - f] = r[u], delete r[u])
                }
            },
            shiftLineStyles: function(e, i) {
                var r = t(this.styles);
                for (var n in this.styles) {
                    var s = parseInt(n, 10);
                    s > e && (this.styles[s + i] = r[s], r[s - i] || delete this.styles[s])
                }
            },
            restartCursorIfNeeded: function() {
                this._currentTickState && !this._currentTickState.isAborted && this._currentTickCompleteState && !this._currentTickCompleteState.isAborted || this.initDelayedCursor()
            },
            insertNewlineStyleObject: function(e, i, r, n) {
                var s, o = {},
                    a = !1;
                r || (r = 1), this.shiftLineStyles(e, r), this.styles[e] && (s = this.styles[e][0 === i ? i : i - 1]);
                for (var h in this.styles[e]) {
                    var c = parseInt(h, 10);
                    c >= i && (a = !0, o[c - i] = this.styles[e][h], delete this.styles[e][h])
                }
                for (a ? this.styles[e + r] = o : delete this.styles[e + r]; r > 1;) r--, n && n[r] ? this.styles[e + r] = {
                    0: t(n[r])
                } : s ? this.styles[e + r] = {
                    0: t(s)
                } : delete this.styles[e + r];
                this._forceClearCache = !0
            },
            insertCharStyleObject: function(e, i, r, n) {
                this.styles || (this.styles = {});
                var s = this.styles[e],
                    o = s ? t(s) : {};
                r || (r = 1);
                for (var a in o) {
                    var h = parseInt(a, 10);
                    h >= i && (s[h + r] = o[h], o[h - r] || delete s[h])
                }
                if (this._forceClearCache = !0, n)
                    for (; r--;) Object.keys(n[r]).length && (this.styles[e] || (this.styles[e] = {}), this.styles[e][i + r] = t(n[r]));
                else if (s)
                    for (var c = s[i ? i - 1 : 1]; c && r--;) this.styles[e][i + r] = t(c)
            },
            insertNewStyleBlock: function(t, e, i) {
                for (var r = this.get2DCursorLocation(e, !0), n = [0], s = 0, o = 0; o < t.length; o++) "\n" === t[o] ? n[++s] = 0 : n[s]++;
                n[0] > 0 && (this.insertCharStyleObject(r.lineIndex, r.charIndex, n[0], i), i = i && i.slice(n[0] + 1)), s && this.insertNewlineStyleObject(r.lineIndex, r.charIndex + n[0], s);
                for (o = 1; o < s; o++) this.insertCharStyleObject(r.lineIndex + o, 0, n[o], i), i = i && i.slice(n[o] + 1);
                n[o] > 0 && this.insertCharStyleObject(r.lineIndex + o, 0, n[o], i)
            },
            setSelectionStartEndWithShift: function(t, e, i) {
                i <= t ? (e === t ? this._selectionDirection = "left" : "right" === this._selectionDirection && (this._selectionDirection = "left", this.selectionEnd = t), this.selectionStart = i) : i > t && i < e ? "right" === this._selectionDirection ? this.selectionEnd = i : this.selectionStart = i : (e === t ? this._selectionDirection = "right" : "left" === this._selectionDirection && (this._selectionDirection = "right", this.selectionStart = e), this.selectionEnd = i)
            },
            setSelectionInBoundaries: function() {
                var t = this.text.length;
                this.selectionStart > t ? this.selectionStart = t : this.selectionStart < 0 && (this.selectionStart = 0), this.selectionEnd > t ? this.selectionEnd = t : this.selectionEnd < 0 && (this.selectionEnd = 0)
            }
        })
    }(), fabric.util.object.extend(fabric.IText.prototype, {
        initDoubleClickSimulation: function() {
            this.__lastClickTime = +new Date, this.__lastLastClickTime = +new Date, this.__lastPointer = {}, this.on("mousedown", this.onMouseDown.bind(this))
        },
        onMouseDown: function(t) {
            this.__newClickTime = +new Date;
            var e = this.canvas.getPointer(t.e);
            this.isTripleClick(e, t.e) && (this.fire("tripleclick", t), this._stopEvent(t.e)), this.__lastLastClickTime = this.__lastClickTime, this.__lastClickTime = this.__newClickTime, this.__lastPointer = e, this.__lastIsEditing = this.isEditing, this.__lastSelected = this.selected
        },
        isTripleClick: function(t) {
            return this.__newClickTime - this.__lastClickTime < 500 && this.__lastClickTime - this.__lastLastClickTime < 500 && this.__lastPointer.x === t.x && this.__lastPointer.y === t.y
        },
        _stopEvent: function(t) {
            t.preventDefault && t.preventDefault(), t.stopPropagation && t.stopPropagation()
        },
        initCursorSelectionHandlers: function() {
            this.initMousedownHandler(), this.initMouseupHandler(), this.initClicks()
        },
        initClicks: function() {
            this.on("mousedblclick", function(t) {
                this.selectWord(this.getSelectionStartFromPointer(t.e))
            }), this.on("tripleclick", function(t) {
                this.selectLine(this.getSelectionStartFromPointer(t.e))
            })
        },
        initMousedownHandler: function() {
            this.on("mousedown", function(t) {
                if (this.editable && (!t.e.button || 1 === t.e.button)) {
                    var e = this.canvas.getPointer(t.e);
                    this.__mousedownX = e.x, this.__mousedownY = e.y, this.__isMousedown = !0, this.selected && this.setCursorByClick(t.e), this.isEditing && (this.__selectionStartOnMouseDown = this.selectionStart, this.selectionStart === this.selectionEnd && this.abortCursorAnimation(), this.renderCursorOrSelection())
                }
            })
        },
        _isObjectMoved: function(t) {
            var e = this.canvas.getPointer(t);
            return this.__mousedownX !== e.x || this.__mousedownY !== e.y
        },
        initMouseupHandler: function() {
            this.on("mouseup", function(t) {
                this.__isMousedown = !1, !this.editable || this._isObjectMoved(t.e) || t.e.button && 1 !== t.e.button || (this.__lastSelected && !this.__corner && (this.enterEditing(t.e), this.selectionStart === this.selectionEnd ? this.initDelayedCursor(!0) : this.renderCursorOrSelection()), this.selected = !0)
            })
        },
        setCursorByClick: function(t) {
            var e = this.getSelectionStartFromPointer(t),
                i = this.selectionStart,
                r = this.selectionEnd;
            t.shiftKey ? this.setSelectionStartEndWithShift(i, r, e) : (this.selectionStart = e, this.selectionEnd = e), this.isEditing && (this._fireSelectionChanged(), this._updateTextarea())
        },
        getSelectionStartFromPointer: function(t) {
            for (var e, i = this.getLocalPointer(t), r = 0, n = 0, s = 0, o = 0, a = 0, h = 0, c = this._textLines.length; h < c && s <= i.y; h++) s += this.getHeightOfLine(h) * this.scaleY, a = h, h > 0 && (o += this._textLines[h - 1].length + 1);
            n = this._getLineLeftOffset(a) * this.scaleX;
            for (var l = 0, u = (e = this._textLines[a]).length; l < u && (r = n, (n += this.__charBounds[a][l].kernedWidth * this.scaleX) <= i.x); l++) o++;
            return this._getNewSelectionStartFromOffset(i, r, n, o, u)
        },
        _getNewSelectionStartFromOffset: function(t, e, i, r, n) {
            var s = t.x - e,
                o = i - t.x,
                a = r + (o > s || o < 0 ? 0 : 1);
            return this.flipX && (a = n - a), a > this._text.length && (a = this._text.length), a
        }
    }), fabric.util.object.extend(fabric.IText.prototype, {
        initHiddenTextarea: function() {
            this.hiddenTextarea = fabric.document.createElement("textarea"), this.hiddenTextarea.setAttribute("autocapitalize", "off"), this.hiddenTextarea.setAttribute("autocorrect", "off"), this.hiddenTextarea.setAttribute("autocomplete", "off"), this.hiddenTextarea.setAttribute("spellcheck", "false"), this.hiddenTextarea.setAttribute("data-fabric-hiddentextarea", ""), this.hiddenTextarea.setAttribute("wrap", "off");
            var t = this._calcTextareaPosition();
            this.hiddenTextarea.style.cssText = "position: absolute; top: " + t.top + "; left: " + t.left + "; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; line-height: 1px; padding??????top: " + t.fontSize + ";", fabric.document.body.appendChild(this.hiddenTextarea), fabric.util.addListener(this.hiddenTextarea, "keydown", this.onKeyDown.bind(this)), fabric.util.addListener(this.hiddenTextarea, "keyup", this.onKeyUp.bind(this)), fabric.util.addListener(this.hiddenTextarea, "input", this.onInput.bind(this)), fabric.util.addListener(this.hiddenTextarea, "copy", this.copy.bind(this)), fabric.util.addListener(this.hiddenTextarea, "cut", this.copy.bind(this)), fabric.util.addListener(this.hiddenTextarea, "paste", this.paste.bind(this)), fabric.util.addListener(this.hiddenTextarea, "compositionstart", this.onCompositionStart.bind(this)), fabric.util.addListener(this.hiddenTextarea, "compositionupdate", this.onCompositionUpdate.bind(this)), fabric.util.addListener(this.hiddenTextarea, "compositionend", this.onCompositionEnd.bind(this)), !this._clickHandlerInitialized && this.canvas && (fabric.util.addListener(this.canvas.upperCanvasEl, "click", this.onClick.bind(this)), this._clickHandlerInitialized = !0)
        },
        keysMap: {
            9: "exitEditing",
            27: "exitEditing",
            33: "moveCursorUp",
            34: "moveCursorDown",
            35: "moveCursorRight",
            36: "moveCursorLeft",
            37: "moveCursorLeft",
            38: "moveCursorUp",
            39: "moveCursorRight",
            40: "moveCursorDown"
        },
        ctrlKeysMapUp: {
            67: "copy",
            88: "cut"
        },
        ctrlKeysMapDown: {
            65: "selectAll"
        },
        onClick: function() {
            this.hiddenTextarea && this.hiddenTextarea.focus()
        },
        onKeyDown: function(t) {
            if (this.isEditing && !this.inCompositionMode) {
                if (t.keyCode in this.keysMap) this[this.keysMap[t.keyCode]](t);
                else {
                    if (!(t.keyCode in this.ctrlKeysMapDown && (t.ctrlKey || t.metaKey))) return;
                    this[this.ctrlKeysMapDown[t.keyCode]](t)
                }
                t.stopImmediatePropagation(), t.preventDefault(), t.keyCode >= 33 && t.keyCode <= 40 ? (this.clearContextTop(), this.renderCursorOrSelection()) : this.canvas && this.canvas.requestRenderAll()
            }
        },
        onKeyUp: function(t) {
            !this.isEditing || this._copyDone || this.inCompositionMode ? this._copyDone = !1 : t.keyCode in this.ctrlKeysMapUp && (t.ctrlKey || t.metaKey) && (this[this.ctrlKeysMapUp[t.keyCode]](t), t.stopImmediatePropagation(), t.preventDefault(), this.canvas && this.canvas.requestRenderAll())
        },
        onInput: function(t) {
            var e = this.fromPaste;
            if (this.fromPaste = !1, t && t.stopPropagation(), this.isEditing) {
                var i, r, n = this._splitTextIntoLines(this.hiddenTextarea.value).graphemeText,
                    s = this._text.length,
                    o = n.length,
                    a = o - s;
                if ("" === this.hiddenTextarea.value) return this.styles = {}, this.updateFromTextArea(), this.fire("changed"), void(this.canvas && (this.canvas.fire("text:changed", {
                    target: this
                }), this.canvas.requestRenderAll()));
                var h = this.fromStringToGraphemeSelection(this.hiddenTextarea.selectionStart, this.hiddenTextarea.selectionEnd, this.hiddenTextarea.value),
                    c = this.selectionStart > h.selectionStart;
                this.selectionStart !== this.selectionEnd ? (i = this._text.slice(this.selectionStart, this.selectionEnd), a += this.selectionEnd - this.selectionStart) : o < s && (i = c ? this._text.slice(this.selectionEnd + a, this.selectionEnd) : this._text.slice(this.selectionStart, this.selectionStart - a)), r = n.slice(h.selectionEnd - a, h.selectionEnd), i && i.length && (this.selectionStart !== this.selectionEnd ? this.removeStyleFromTo(this.selectionStart, this.selectionEnd) : c ? this.removeStyleFromTo(this.selectionEnd - i.length, this.selectionEnd) : this.removeStyleFromTo(this.selectionEnd, this.selectionEnd + i.length)), r.length && (e && r.join("") === fabric.copiedText ? this.insertNewStyleBlock(r, this.selectionStart, fabric.copiedTextStyle) : this.insertNewStyleBlock(r, this.selectionStart)), this.updateFromTextArea(), this.fire("changed"), this.canvas && (this.canvas.fire("text:changed", {
                    target: this
                }), this.canvas.requestRenderAll())
            }
        },
        onCompositionStart: function() {
            this.inCompositionMode = !0
        },
        onCompositionEnd: function() {
            this.inCompositionMode = !1
        },
        onCompositionUpdate: function(t) {
            this.compositionStart = t.target.selectionStart, this.compositionEnd = t.target.selectionEnd, this.updateTextareaPosition()
        },
        copy: function() {
            this.selectionStart !== this.selectionEnd && (fabric.copiedText = this.getSelectedText(), fabric.copiedTextStyle = this.getSelectionStyles(this.selectionStart, this.selectionEnd, !0), this._copyDone = !0)
        },
        paste: function() {
            this.fromPaste = !0
        },
        _getClipboardData: function(t) {
            return t && t.clipboardData || fabric.window.clipboardData
        },
        _getWidthBeforeCursor: function(t, e) {
            var i, r = this._getLineLeftOffset(t);
            return e > 0 && (r += (i = this.__charBounds[t][e - 1]).left + i.width), r
        },
        getDownCursorOffset: function(t, e) {
            var i = this._getSelectionForOffset(t, e),
                r = this.get2DCursorLocation(i),
                n = r.lineIndex;
            if (n === this._textLines.length - 1 || t.metaKey || 34 === t.keyCode) return this._text.length - i;
            var s = r.charIndex,
                o = this._getWidthBeforeCursor(n, s),
                a = this._getIndexOnLine(n + 1, o);
            return this._textLines[n].slice(s).length + a + 2
        },
        _getSelectionForOffset: function(t, e) {
            return t.shiftKey && this.selectionStart !== this.selectionEnd && e ? this.selectionEnd : this.selectionStart
        },
        getUpCursorOffset: function(t, e) {
            var i = this._getSelectionForOffset(t, e),
                r = this.get2DCursorLocation(i),
                n = r.lineIndex;
            if (0 === n || t.metaKey || 33 === t.keyCode) return -i;
            var s = r.charIndex,
                o = this._getWidthBeforeCursor(n, s),
                a = this._getIndexOnLine(n - 1, o),
                h = this._textLines[n].slice(0, s);
            return -this._textLines[n - 1].length + a - h.length
        },
        _getIndexOnLine: function(t, e) {
            for (var i, r, n = this._textLines[t], s = this._getLineLeftOffset(t), o = 0, a = 0, h = n.length; a < h; a++)
                if (i = this.__charBounds[t][a].width, (s += i) > e) {
                    r = !0;
                    var c = s - i,
                        l = s,
                        u = Math.abs(c - e);
                    o = Math.abs(l - e) < u ? a : a - 1;
                    break
                }
            return r || (o = n.length - 1), o
        },
        moveCursorDown: function(t) {
            this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorUpOrDown("Down", t)
        },
        moveCursorUp: function(t) {
            0 === this.selectionStart && 0 === this.selectionEnd || this._moveCursorUpOrDown("Up", t)
        },
        _moveCursorUpOrDown: function(t, e) {
            var i = this["get" + t + "CursorOffset"](e, "right" === this._selectionDirection);
            e.shiftKey ? this.moveCursorWithShift(i) : this.moveCursorWithoutShift(i), 0 !== i && (this.setSelectionInBoundaries(), this.abortCursorAnimation(), this._currentCursorOpacity = 1, this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea())
        },
        moveCursorWithShift: function(t) {
            var e = "left" === this._selectionDirection ? this.selectionStart + t : this.selectionEnd + t;
            return this.setSelectionStartEndWithShift(this.selectionStart, this.selectionEnd, e), 0 !== t
        },
        moveCursorWithoutShift: function(t) {
            return t < 0 ? (this.selectionStart += t, this.selectionEnd = this.selectionStart) : (this.selectionEnd += t, this.selectionStart = this.selectionEnd), 0 !== t
        },
        moveCursorLeft: function(t) {
            0 === this.selectionStart && 0 === this.selectionEnd || this._moveCursorLeftOrRight("Left", t)
        },
        _move: function(t, e, i) {
            var r;
            if (t.altKey) r = this["findWordBoundary" + i](this[e]);
            else {
                if (!t.metaKey && 35 !== t.keyCode && 36 !== t.keyCode) return this[e] += "Left" === i ? -1 : 1, !0;
                r = this["findLineBoundary" + i](this[e])
            } if (void 0 !== typeof r && this[e] !== r) return this[e] = r, !0
        },
        _moveLeft: function(t, e) {
            return this._move(t, e, "Left")
        },
        _moveRight: function(t, e) {
            return this._move(t, e, "Right")
        },
        moveCursorLeftWithoutShift: function(t) {
            var e = !0;
            return this._selectionDirection = "left", this.selectionEnd === this.selectionStart && 0 !== this.selectionStart && (e = this._moveLeft(t, "selectionStart")), this.selectionEnd = this.selectionStart, e
        },
        moveCursorLeftWithShift: function(t) {
            return "right" === this._selectionDirection && this.selectionStart !== this.selectionEnd ? this._moveLeft(t, "selectionEnd") : 0 !== this.selectionStart ? (this._selectionDirection = "left", this._moveLeft(t, "selectionStart")) : void 0
        },
        moveCursorRight: function(t) {
            this.selectionStart >= this._text.length && this.selectionEnd >= this._text.length || this._moveCursorLeftOrRight("Right", t)
        },
        _moveCursorLeftOrRight: function(t, e) {
            var i = "moveCursor" + t + "With";
            this._currentCursorOpacity = 1, e.shiftKey ? i += "Shift" : i += "outShift", this[i](e) && (this.abortCursorAnimation(), this.initDelayedCursor(), this._fireSelectionChanged(), this._updateTextarea())
        },
        moveCursorRightWithShift: function(t) {
            return "left" === this._selectionDirection && this.selectionStart !== this.selectionEnd ? this._moveRight(t, "selectionStart") : this.selectionEnd !== this._text.length ? (this._selectionDirection = "right", this._moveRight(t, "selectionEnd")) : void 0
        },
        moveCursorRightWithoutShift: function(t) {
            var e = !0;
            return this._selectionDirection = "right", this.selectionStart === this.selectionEnd ? (e = this._moveRight(t, "selectionStart"), this.selectionEnd = this.selectionStart) : this.selectionStart = this.selectionEnd, e
        },
        removeChars: function(t, e) {
            void 0 === e && (e = t + 1), this.removeStyleFromTo(t, e), this._text.splice(t, e - t), this.text = this._text.join(""), this.set("dirty", !0), this._removeExtraneousStyles(), this._shouldClearDimensionCache() && (this.initDimensions(), this.setCoords())
        }
    }),
    function() {
        var t = fabric.util.toFixed,
            e = fabric.Object.NUM_FRACTION_DIGITS;
        fabric.util.object.extend(fabric.Text.prototype, {
            toSVG: function(t) {
                var e = this._createBaseSVGMarkup(),
                    i = this._getSVGLeftTopOffsets(),
                    r = this._getSVGTextAndBg(i.textTop, i.textLeft);
                return this._wrapSVGTextAndBg(e, r), t ? t(e.join("")) : e.join("")
            },
            _getSVGLeftTopOffsets: function() {
                return {
                    textLeft: -this.width / 2,
                    textTop: -this.height / 2,
                    lineTop: this.getHeightOfLine(0)
                }
            },
            _wrapSVGTextAndBg: function(t, e) {
                var i = this.getSvgFilter(),
                    r = "" === i ? "" : ' style="' + i + '"',
                    n = this.getSvgTextDecoration(this);
                t.push("\t<g ", this.getSvgId(), 'transform="', this.getSvgTransform(), this.getSvgTransformMatrix(), '"', r, ">\n", e.textBgRects.join(""), '\t\t<text xml:space="preserve" ', this.fontFamily ? 'font-family="' + this.fontFamily.replace(/"/g, "'") + '" ' : "", this.fontSize ? 'font-size="' + this.fontSize + '" ' : "", this.fontStyle ? 'font-style="' + this.fontStyle + '" ' : "", this.fontWeight ? 'font-weight="' + this.fontWeight + '" ' : "", n ? 'text-decoration="' + n + '" ' : "", 'style="', this.getSvgStyles(!0), '"', this.addPaintOrder(), " >\n", e.textSpans.join(""), "\t\t</text>\n", "\t</g>\n")
            },
            _getSVGTextAndBg: function(t, e) {
                var i, r = [],
                    n = [],
                    s = t;
                this._setSVGBg(n);
                for (var o = 0, a = this._textLines.length; o < a; o++) i = this._getLineLeftOffset(o), (this.textBackgroundColor || this.styleHas("textBackgroundColor", o)) && this._setSVGTextLineBg(n, o, e + i, s), this._setSVGTextLineText(r, o, e + i, s), s += this.getHeightOfLine(o);
                return {
                    textSpans: r,
                    textBgRects: n
                }
            },
            _createTextCharSpan: function(i, r, n, s) {
                var o = this.getSvgSpanStyles(r, i !== i.trim()),
                    a = o ? 'style="' + o + '"' : "";
                return ['\t\t\t<tspan x="', t(n, e), '" y="', t(s, e), '" ', a, ">", fabric.util.string.escapeXml(i), "</tspan>\n"].join("")
            },
            _setSVGTextLineText: function(t, e, i, r) {
                var n, s, o, a, h, c = this.getHeightOfLine(e),
                    l = -1 !== this.textAlign.indexOf("justify"),
                    u = "",
                    f = 0,
                    d = this._textLines[e];
                r += c * (1 - this._fontSizeFraction) / this.lineHeight;
                for (var g = 0, p = d.length - 1; g <= p; g++) h = g === p || this.charSpacing, u += d[g], o = this.__charBounds[e][g], 0 === f ? (i += o.kernedWidth - o.width, f += o.width) : f += o.kernedWidth, l && !h && this._reSpaceAndTab.test(d[g]) && (h = !0), h || (n = n || this.getCompleteStyleDeclaration(e, g), s = this.getCompleteStyleDeclaration(e, g + 1), h = this._hasStyleChangedForSvg(n, s)), h && (a = this._getStyleDeclaration(e, g) || {}, t.push(this._createTextCharSpan(u, a, i, r)), u = "", n = s, i += f, f = 0)
            },
            _pushTextBgRect: function(i, r, n, s, o, a) {
                i.push("\t\t<rect ", this._getFillAttributes(r), ' x="', t(n, e), '" y="', t(s, e), '" width="', t(o, e), '" height="', t(a, e), '"></rect>\n')
            },
            _setSVGTextLineBg: function(t, e, i, r) {
                for (var n, s, o = this._textLines[e], a = this.getHeightOfLine(e) / this.lineHeight, h = 0, c = 0, l = this.getValueOfPropertyAt(e, 0, "textBackgroundColor"), u = 0, f = o.length; u < f; u++) n = this.__charBounds[e][u], (s = this.getValueOfPropertyAt(e, u, "textBackgroundColor")) !== l ? (l && this._pushTextBgRect(t, l, i + c, r, h, a), c = n.left, h = n.width, l = s) : h += n.kernedWidth;
                s && this._pushTextBgRect(t, s, i + c, r, h, a)
            },
            _getFillAttributes: function(t) {
                var e = t && "string" == typeof t ? new fabric.Color(t) : "";
                return e && e.getSource() && 1 !== e.getAlpha() ? 'opacity="' + e.getAlpha() + '" fill="' + e.setAlpha(1).toRgb() + '"' : 'fill="' + t + '"'
            },
            _getSVGLineTopOffset: function(t) {
                for (var e = 0, i = 0, r = 0; r < t; r++) e += this.getHeightOfLine(r);
                return i = this.getHeightOfLine(r), {
                    lineTop: e,
                    offset: (this._fontSizeMult - this._fontSizeFraction) * i / (this.lineHeight * this._fontSizeMult)
                }
            },
            getSvgStyles: function(t) {
                return fabric.Object.prototype.getSvgStyles.call(this, t) + " white-space: pre;"
            }
        })
    }(),
    function(t) {
        "use strict";
        var e = t.fabric || (t.fabric = {});
        e.Textbox = e.util.createClass(e.IText, e.Observable, {
            type: "textbox",
            minWidth: 20,
            dynamicMinWidth: 2,
            __cachedLines: null,
            lockScalingFlip: !0,
            noScaleCache: !1,
            _dimensionAffectingProps: e.Text.prototype._dimensionAffectingProps.concat("width"),
            initialize: function(t, e) {
                this.callSuper("initialize", t, e)
            },
            initDimensions: function() {
                this.__skipDimension || (this.isEditing && this.initDelayedCursor(), this.clearContextTop(), this._clearCache(), this.dynamicMinWidth = 0, this._styleMap = this._generateStyleMap(this._splitText()), this.dynamicMinWidth > this.width && this._set("width", this.dynamicMinWidth), -1 !== this.textAlign.indexOf("justify") && this.enlargeSpaces(), this.height = this.calcTextHeight(), this.saveState({
                    propertySet: "_dimensionAffectingProps"
                }))
            },
            _generateStyleMap: function(t) {
                for (var e = 0, i = 0, r = 0, n = {}, s = 0; s < t.graphemeLines.length; s++) "\n" === t.graphemeText[r] && s > 0 ? (i = 0, r++, e++) : this._reSpaceAndTab.test(t.graphemeText[r]) && s > 0 && (i++, r++), n[s] = {
                    line: e,
                    offset: i
                }, r += t.graphemeLines[s].length, i += t.graphemeLines[s].length;
                return n
            },
            styleHas: function(t, i) {
                if (this._styleMap && !this.isWrapping) {
                    var r = this._styleMap[i];
                    r && (i = r.line)
                }
                return e.Text.prototype.styleHas.call(this, t, i)
            },
            _getStyleDeclaration: function(t, e) {
                if (this._styleMap && !this.isWrapping) {
                    var i = this._styleMap[t];
                    if (!i) return null;
                    t = i.line, e = i.offset + e
                }
                return this.callSuper("_getStyleDeclaration", t, e)
            },
            _setStyleDeclaration: function(t, e, i) {
                var r = this._styleMap[t];
                t = r.line, e = r.offset + e, this.styles[t][e] = i
            },
            _deleteStyleDeclaration: function(t, e) {
                var i = this._styleMap[t];
                t = i.line, e = i.offset + e, delete this.styles[t][e]
            },
            _getLineStyle: function(t) {
                var e = this._styleMap[t];
                return this.styles[e.line]
            },
            _setLineStyle: function(t, e) {
                var i = this._styleMap[t];
                this.styles[i.line] = e
            },
            _deleteLineStyle: function(t) {
                var e = this._styleMap[t];
                delete this.styles[e.line]
            },
            _wrapText: function(t, e) {
                var i, r = [];
                for (this.isWrapping = !0, i = 0; i < t.length; i++) r = r.concat(this._wrapLine(t[i], i, e));
                return this.isWrapping = !1, r
            },
            _measureWord: function(t, e, i) {
                var r, n = 0;
                i = i || 0;
                for (var s = 0, o = t.length; s < o; s++) n += this._getGraphemeBox(t[s], e, s + i, r, !0).kernedWidth, r = t[s];
                return n
            },
            _wrapLine: function(t, i, r) {
                for (var n = 0, s = [], o = [], a = t.split(this._reSpaceAndTab), h = "", c = 0, l = 0, u = 0, f = 0, d = !0, g = this._getWidthOfCharSpacing(), p = 0; p < a.length; p++) h = e.util.string.graphemeSplit(a[p]), l = this._measureWord(h, i, c), c += h.length, (n += u + l - g) >= r && !d && (s.push(o), o = [], n = l, d = !0), d || o.push(" "), o = o.concat(h), u = this._measureWord([" "], i, c), c++, d = !1, l > f && (f = l);
                return p && s.push(o), f > this.dynamicMinWidth && (this.dynamicMinWidth = f - g), s
            },
            isEndOfWrapping: function(t) {
                return !this._styleMap[t + 1] || this._styleMap[t + 1].line !== this._styleMap[t].line
            },
            _splitTextIntoLines: function(t) {
                for (var i = e.Text.prototype._splitTextIntoLines.call(this, t), r = this._wrapText(i.lines, this.width), n = new Array(r.length), s = 0; s < r.length; s++) n[s] = r[s].join("");
                return i.lines = n, i.graphemeLines = r, i
            },
            getMinWidth: function() {
                return Math.max(this.minWidth, this.dynamicMinWidth)
            },
            toObject: function(t) {
                return this.callSuper("toObject", ["minWidth"].concat(t))
            }
        }), e.Textbox.fromObject = function(t, i) {
            return e.Object._fromObject("Textbox", t, i, "text")
        }
    }("undefined" != typeof exports ? exports : this),
    function() {
        var t = fabric.Canvas.prototype._setObjectScale;
        fabric.Canvas.prototype._setObjectScale = function(e, i, r, n, s, o, a) {
            var h = i.target;
            if (!("x" === s && h instanceof fabric.Textbox)) return t.call(fabric.Canvas.prototype, e, i, r, n, s, o, a);
            var c = h._getTransformedDimensions().x,
                l = h.width * (e.x / c);
            return l >= h.getMinWidth() ? (h.set("width", l), !0) : void 0
        }, fabric.util.object.extend(fabric.Textbox.prototype, {
            _removeExtraneousStyles: function() {
                for (var t in this._styleMap) this._textLines[t] || delete this.styles[this._styleMap[t].line]
            }
        })
    }();