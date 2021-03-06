(function (d) {
    "function" === typeof define && define.amd ? define(["jquery", "datatables.net"], function (i) {
        return d(i, window, document)
    }) : "object" === typeof exports ? module.exports = function (i, r) {
        i || (i = window);
        if (!r || !r.fn.dataTable) r = require("datatables.net")(i, r).$;
        return d(r, i, i.document)
    } : d(jQuery, window, document)
})(function (d, i, r, h) {
    function v(a) {
        a = a.context[0];
        return a.oInit.editor || a._editor
    }
    function A(a, b, c, e) {
        b || (b = {});
        b.buttons === h && (b.buttons = "_basic");
        b.title === h && (b.title = a.i18n[c].title);
        b.message === h && ("remove" === c ? (a = a.i18n[c].confirm, b.message = 1 !== e ? a._.replace(/%d/, e) : a["1"]) : b.message = "");
        return b
    }
    var t = d.fn.dataTable;
    if (!t || !t.versionCheck || !t.versionCheck("1.10.7")) throw "Editor requires DataTables 1.10.7 or newer";
    var f = function (a) {
        !this instanceof f && alert("DataTables Editor must be initialised as a 'new' instance'");
        this._constructor(a)
    };
    t.Editor = f;
    d.fn.DataTable.Editor = f;
    var u = function (a, b) {
        b === h && (b = r);
        return d('*[data-dte-e="' + a + '"]', b)
    },
		M = 0,
		y = function (a, b) {
		    var c = [];
		    d.each(a, function (a, d) {
		        c.push(d[b])
		    });
		    return c
		};
    f.Field = function (a, b, c) {
        var e = this,
			j = c.i18n.multi,
			a = d.extend(!0, {}, f.Field.defaults, a);
        if (!f.fieldTypes[a.type]) throw "Error adding field - unknown field type " + a.type;
        this.s = d.extend({}, f.Field.settings, {
            type: f.fieldTypes[a.type],
            name: a.name,
            classes: b,
            host: c,
            opts: a,
            multiValue: !1
        });
        a.id || (a.id = "DTE_Field_" + a.name);
        a.dataProp && (a.data = a.dataProp);
        "" === a.data && (a.data = a.name);
        var o = t.ext.oApi;
        this.valFromData = function (b) {
            return o._fnGetObjectDataFn(a.data)(b, "editor")
        };
        this.valToData = o._fnSetObjectDataFn(a.data);
        b = d('<div class="' + b.wrapper + " " + b.typePrefix + a.type + " " + b.namePrefix + a.name + " " + a.className + '"><label data-dte-e="label" class="' + b.label + '" for="' + a.id + '">' + a.label + '<div data-dte-e="msg-label" class="' + b["msg-label"] + '">' + a.labelInfo + '</div></label><div data-dte-e="input" class="' + b.input + '"><div data-dte-e="input-control" class="' + b.inputControl + '"/><div data-dte-e="multi-value" class="' + b.multiValue + '">' + j.title + '<span data-dte-e="multi-info" class="' + b.multiInfo + '">' + j.info + '</span></div><div data-dte-e="msg-multi" class="' + b.multiRestore + '">' + j.restore + '</div><div data-dte-e="msg-error" class="' + b["msg-error"] + '"></div><div data-dte-e="msg-message" class="' + b["msg-message"] + '"></div><div data-dte-e="msg-info" class="' + b["msg-info"] + '">' + a.fieldInfo + "</div></div></div>");
        c = this._typeFn("create", a);
        null !== c ? u("input-control", b).prepend(c) : b.css("display", "none");
        this.dom = d.extend(!0, {}, f.Field.models.dom, {
            container: b,
            inputControl: u("input-control", b),
            label: u("label", b),
            fieldInfo: u("msg-info", b),
            labelInfo: u("msg-label", b),
            fieldError: u("msg-error", b),
            fieldMessage: u("msg-message", b),
            multi: u("multi-value", b),
            multiReturn: u("msg-multi", b),
            multiInfo: u("multi-info", b)
        });
        this.dom.multi.on("click", function () {
            e.val("")
        });
        this.dom.multiReturn.on("click", function () {
            e.s.multiValue = true;
            e._multiValueCheck()
        });
        d.each(this.s.type, function (a, b) {
            typeof b === "function" && e[a] === h && (e[a] = function () {
                var b = Array.prototype.slice.call(arguments);
                b.unshift(a);
                b = e._typeFn.apply(e, b);
                return b === h ? e : b
            })
        })
    };
    f.Field.prototype = {
        def: function (a) {
            var b = this.s.opts;
            if (a === h) return a = b["default"] !== h ? b["default"] : b.def, d.isFunction(a) ? a() : a;
            b.def = a;
            return this
        },
        disable: function () {
            this._typeFn("disable");
            return this
        },
        displayed: function () {
            var a = this.dom.container;
            return a.parents("body").length && "none" != a.css("display") ? !0 : !1
        },
        enable: function () {
            this._typeFn("enable");
            return this
        },
        error: function (a, b) {
            var c = this.s.classes;
            a ? this.dom.container.addClass(c.error) : this.dom.container.removeClass(c.error);
            return this._msg(this.dom.fieldError, a, b)
        },
        isMultiValue: function () {
            return this.s.multiValue
        },
        inError: function () {
            return this.dom.container.hasClass(this.s.classes.error)
        },
        input: function () {
            return this.s.type.input ? this._typeFn("input") : d("input, select, textarea", this.dom.container)
        },
        focus: function () {
            this.s.type.focus ? this._typeFn("focus") : d("input, select, textarea", this.dom.container).focus();
            return this
        },
        get: function () {
            if (this.isMultiValue()) return h;
            var a = this._typeFn("get");
            return a !== h ? a : this.def()
        },
        hide: function (a) {
            var b = this.dom.container;
            a === h && (a = !0);
            this.s.host.display() && a ? b.slideUp() : b.css("display", "none");
            return this
        },
        label: function (a) {
            var b = this.dom.label;
            if (a === h) return b.html();
            b.html(a);
            return this
        },
        message: function (a, b) {
            return this._msg(this.dom.fieldMessage, a, b)
        },
        multiGet: function (a) {
            var b = this.s.multiValues,
				c = this.s.multiIds;
            if (a === h) for (var a = {}, e = 0; e < c.length; e++) a[c[e]] = this.isMultiValue() ? b[c[e]] : this.val();
            else a = this.isMultiValue() ? b[a] : this.val();
            return a
        },
        multiSet: function (a, b) {
            var c = this.s.multiValues,
				e = this.s.multiIds;
            b === h && (b = a, a = h);
            var j = function (a, b) {
                d.inArray(e) === -1 && e.push(a);
                c[a] = b
            };
            d.isPlainObject(b) && a === h ? d.each(b, function (a, b) {
                j(a, b)
            }) : a === h ? d.each(e, function (a, c) {
                j(c, b)
            }) : j(a, b);
            this.s.multiValue = !0;
            this._multiValueCheck();
            return this
        },
        name: function () {
            return this.s.opts.name
        },
        node: function () {
            return this.dom.container[0]
        },
        set: function (a) {
            this.s.multiValue = !1;
            var b = this.s.opts.entityDecode;
            if ((b === h || !0 === b) && "string" === typeof a) a = a.replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'");
            this._typeFn("set", a);
            this._multiValueCheck();
            return this
        },
        show: function (a) {
            var b = this.dom.container;
            a === h && (a = !0);
            this.s.host.display() && a ? b.slideDown() : b.css("display", "block");
            return this
        },
        val: function (a) {
            return a === h ? this.get() : this.set(a)
        },
        dataSrc: function () {
            return this.s.opts.data
        },
        destroy: function () {
            this.dom.container.remove();
            this._typeFn("destroy");
            return this
        },
        multiIds: function () {
            return this.s.multiIds
        },
        multiInfoShown: function (a) {
            this.dom.multiInfo.css({
                display: a ? "block" : "none"
            })
        },
        multiReset: function () {
            this.s.multiIds = [];
            this.s.multiValues = {}
        },
        valFromData: null,
        valToData: null,
        _errorNode: function () {
            return this.dom.fieldError
        },
        _msg: function (a, b, c) {
            if ("function" === typeof b) var e = this.s.host,
				b = b(e, new t.Api(e.s.table));
            a.parent().is(":visible") ? (a.html(b), b ? a.slideDown(c) : a.slideUp(c)) : (a.html(b || "").css("display", b ? "block" : "none"), c && c());
            return this
        },
        _multiValueCheck: function () {
            var a, b = this.s.multiIds,
				c = this.s.multiValues,
				e, d = !1;
            if (b) for (var o = 0; o < b.length; o++) {
                e = c[b[o]];
                if (0 < o && e !== a) {
                    d = !0;
                    break
                }
                a = e
            }
            d && this.s.multiValue ? (this.dom.inputControl.css({
                display: "none"
            }), this.dom.multi.css({
                display: "block"
            })) : (this.dom.inputControl.css({
                display: "block"
            }), this.dom.multi.css({
                display: "none"
            }), this.s.multiValue && this.val(a));
            b && 1 < b.length && this.dom.multiReturn.css({
                display: d && !this.s.multiValue ? "block" : "none"
            });
            this.s.host._multiInfo();
            return !0
        },
        _typeFn: function (a) {
            var b = Array.prototype.slice.call(arguments);
            b.shift();
            b.unshift(this.s.opts);
            var c = this.s.type[a];
            if (c) return c.apply(this.s.host, b)
        }
    };
    f.Field.models = {};
    f.Field.defaults = {
        className: "",
        data: "",
        def: "",
        fieldInfo: "",
        id: "",
        label: "",
        labelInfo: "",
        name: null,
        type: "text"
    };
    f.Field.models.settings = {
        type: null,
        name: null,
        classes: null,
        opts: null,
        host: null
    };
    f.Field.models.dom = {
        container: null,
        label: null,
        labelInfo: null,
        fieldInfo: null,
        fieldError: null,
        fieldMessage: null
    };
    f.models = {};
    f.models.displayController = {
        init: function () { },
        open: function () { },
        close: function () { }
    };
    f.models.fieldType = {
        create: function () { },
        get: function () { },
        set: function () { },
        enable: function () { },
        disable: function () { }
    };
    f.models.settings = {
        ajaxUrl: null,
        ajax: null,
        dataSource: null,
        domTable: null,
        opts: null,
        displayController: null,
        fields: {},
        order: [],
        id: -1,
        displayed: !1,
        processing: !1,
        modifier: null,
        action: null,
        idSrc: null
    };
    f.models.button = {
        label: null,
        fn: null,
        className: null
    };
    f.models.formOptions = {
        onReturn: "submit",
        onBlur: "close",
        onBackground: "blur",
        onComplete: "close",
        onEsc: "close",
        submit: "all",
        focus: 0,
        buttons: !0,
        title: !0,
        message: !0,
        drawType: !1
    };
    f.display = {};
    var q = jQuery,
		m;
    f.display.lightbox = q.extend(!0, {}, f.models.displayController, {
        init: function () {
            m._init();
            return m
        },
        open: function (a, b, c) {
            if (m._shown) c && c();
            else {
                m._dte = a;
                a = m._dom.content;
                a.children().detach();
                a.append(b).append(m._dom.close);
                m._shown = true;
                m._show(c)
            }
        },
        close: function (a, b) {
            if (m._shown) {
                m._dte = a;
                m._hide(b);
                m._shown = false
            } else b && b()
        },
        node: function () {
            return m._dom.wrapper[0]
        },
        _init: function () {
            if (!m._ready) {
                var a = m._dom;
                a.content = q("div.DTED_Lightbox_Content", m._dom.wrapper);
                a.wrapper.css("opacity", 0);
                a.background.css("opacity", 0)
            }
        },
        _show: function (a) {
            var b = m._dom;
            i.orientation !== h && q("body").addClass("DTED_Lightbox_Mobile");
            b.content.css("height", "auto");
            b.wrapper.css({
                top: -m.conf.offsetAni
            });
            q("body").append(m._dom.background).append(m._dom.wrapper);
            m._heightCalc();
            b.wrapper.stop().animate({
                opacity: 1,
                top: 0
            }, a);
            b.background.stop().animate({
                opacity: 1
            });
            b.close.bind("click.DTED_Lightbox", function () {
                m._dte.close()
            });
            b.background.bind("click.DTED_Lightbox", function () {
                m._dte.background()
            });
            q("div.DTED_Lightbox_Content_Wrapper", b.wrapper).bind("click.DTED_Lightbox", function (a) {
                q(a.target).hasClass("DTED_Lightbox_Content_Wrapper") && m._dte.background()
            });
            q(i).bind("resize.DTED_Lightbox", function () {
                m._heightCalc()
            });
            m._scrollTop = q("body").scrollTop();
            if (i.orientation !== h) {
                a = q("body").children().not(b.background).not(b.wrapper);
                q("body").append('<div class="DTED_Lightbox_Shown"/>');
                q("div.DTED_Lightbox_Shown").append(a)
            }
        },
        _heightCalc: function () {
            var a = m._dom,
				b = q(i).height() - m.conf.windowPadding * 2 - q("div.DTE_Header", a.wrapper).outerHeight() - q("div.DTE_Footer", a.wrapper).outerHeight();
            q("div.DTE_Body_Content", a.wrapper).css("maxHeight", b)
        },
        _hide: function (a) {
            var b = m._dom;
            a || (a = function () { });
            if (i.orientation !== h) {
                var c = q("div.DTED_Lightbox_Shown");
                c.children().appendTo("body");
                c.remove()
            }
            q("body").removeClass("DTED_Lightbox_Mobile").scrollTop(m._scrollTop);
            b.wrapper.stop().animate({
                opacity: 0,
                top: m.conf.offsetAni
            }, function () {
                q(this).detach();
                a()
            });
            b.background.stop().animate({
                opacity: 0
            }, function () {
                q(this).detach()
            });
            b.close.unbind("click.DTED_Lightbox");
            b.background.unbind("click.DTED_Lightbox");
            q("div.DTED_Lightbox_Content_Wrapper", b.wrapper).unbind("click.DTED_Lightbox");
            q(i).unbind("resize.DTED_Lightbox")
        },
        _dte: null,
        _ready: !1,
        _shown: !1,
        _dom: {
            wrapper: q('<div class="DTED DTED_Lightbox_Wrapper"><div class="DTED_Lightbox_Container"><div class="DTED_Lightbox_Content_Wrapper"><div class="DTED_Lightbox_Content"></div></div></div></div>'),
            background: q('<div class="DTED_Lightbox_Background"><div/></div>'),
            close: q('<div class="DTED_Lightbox_Close"></div>'),
            content: null
        }
    });
    m = f.display.lightbox;
    m.conf = {
        offsetAni: 25,
        windowPadding: 25
    };
    var l = jQuery,
		g;
    f.display.envelope = l.extend(!0, {}, f.models.displayController, {
        init: function (a) {
            g._dte = a;
            g._init();
            return g
        },
        open: function (a, b, c) {
            g._dte = a;
            l(g._dom.content).children().detach();
            g._dom.content.appendChild(b);
            g._dom.content.appendChild(g._dom.close);
            g._show(c)
        },
        close: function (a, b) {
            g._dte = a;
            g._hide(b)
        },
        node: function () {
            return g._dom.wrapper[0]
        },
        _init: function () {
            if (!g._ready) {
                g._dom.content = l("div.DTED_Envelope_Container", g._dom.wrapper)[0];
                r.body.appendChild(g._dom.background);
                r.body.appendChild(g._dom.wrapper);
                g._dom.background.style.visbility = "hidden";
                g._dom.background.style.display = "block";
                g._cssBackgroundOpacity = l(g._dom.background).css("opacity");
                g._dom.background.style.display = "none";
                g._dom.background.style.visbility = "visible"
            }
        },
        _show: function (a) {
            a || (a = function () { });
            g._dom.content.style.height = "auto";
            var b = g._dom.wrapper.style;
            b.opacity = 0;
            b.display = "block";
            var c = g._findAttachRow(),
				e = g._heightCalc(),
				d = c.offsetWidth;
            b.display = "none";
            b.opacity = 1;
            g._dom.wrapper.style.width = d + "px";
            g._dom.wrapper.style.marginLeft = -(d / 2) + "px";
            g._dom.wrapper.style.top = l(c).offset().top + c.offsetHeight + "px";
            g._dom.content.style.top = -1 * e - 20 + "px";
            g._dom.background.style.opacity = 0;
            g._dom.background.style.display = "block";
            l(g._dom.background).animate({
                opacity: g._cssBackgroundOpacity
            }, "normal");
            l(g._dom.wrapper).fadeIn();
            g.conf.windowScroll ? l("html,body").animate({
                scrollTop: l(c).offset().top + c.offsetHeight - g.conf.windowPadding
            }, function () {
                l(g._dom.content).animate({
                    top: 0
                }, 600, a)
            }) : l(g._dom.content).animate({
                top: 0
            }, 600, a);
            l(g._dom.close).bind("click.DTED_Envelope", function () {
                g._dte.close()
            });
            l(g._dom.background).bind("click.DTED_Envelope", function () {
                g._dte.background()
            });
            l("div.DTED_Lightbox_Content_Wrapper", g._dom.wrapper).bind("click.DTED_Envelope", function (a) {
                l(a.target).hasClass("DTED_Envelope_Content_Wrapper") && g._dte.background()
            });
            l(i).bind("resize.DTED_Envelope", function () {
                g._heightCalc()
            })
        },
        _heightCalc: function () {
            g.conf.heightCalc ? g.conf.heightCalc(g._dom.wrapper) : l(g._dom.content).children().height();
            var a = l(i).height() - g.conf.windowPadding * 2 - l("div.DTE_Header", g._dom.wrapper).outerHeight() - l("div.DTE_Footer", g._dom.wrapper).outerHeight();
            l("div.DTE_Body_Content", g._dom.wrapper).css("maxHeight", a);
            return l(g._dte.dom.wrapper).outerHeight()
        },
        _hide: function (a) {
            a || (a = function () { });
            l(g._dom.content).animate({
                top: -(g._dom.content.offsetHeight + 50)
            }, 600, function () {
                l([g._dom.wrapper, g._dom.background]).fadeOut("normal", a)
            });
            l(g._dom.close).unbind("click.DTED_Lightbox");
            l(g._dom.background).unbind("click.DTED_Lightbox");
            l("div.DTED_Lightbox_Content_Wrapper", g._dom.wrapper).unbind("click.DTED_Lightbox");
            l(i).unbind("resize.DTED_Lightbox")
        },
        _findAttachRow: function () {
            var a = l(g._dte.s.table).DataTable();
            return g.conf.attach === "head" ? a.table().header() : g._dte.s.action === "create" ? a.table().header() : a.row(g._dte.s.modifier).node()
        },
        _dte: null,
        _ready: !1,
        _cssBackgroundOpacity: 1,
        _dom: {
            wrapper: l('<div class="DTED DTED_Envelope_Wrapper"><div class="DTED_Envelope_ShadowLeft"></div><div class="DTED_Envelope_ShadowRight"></div><div class="DTED_Envelope_Container"></div></div>')[0],
            background: l('<div class="DTED_Envelope_Background"><div/></div>')[0],
            close: l('<div class="DTED_Envelope_Close">&times;</div>')[0],
            content: null
        }
    });
    g = f.display.envelope;
    g.conf = {
        windowPadding: 50,
        heightCalc: null,
        attach: "row",
        windowScroll: !0
    };
    f.prototype.add = function (a) {
        if (d.isArray(a)) for (var b = 0, c = a.length; b < c; b++) this.add(a[b]);
        else {
            b = a.name;
            if (b === h) throw "Error adding field. The field requires a `name` option";
            if (this.s.fields[b]) throw "Error adding field '" + b + "'. A field already exists with this name";
            this._dataSource("initField", a);
            this.s.fields[b] = new f.Field(a, this.classes.field, this);
            this.s.order.push(b)
        }
        this._displayReorder(this.order());
        return this
    };
    f.prototype.background = function () {
        var a = this.s.editOpts.onBackground;
        "blur" === a ? this.blur() : "close" === a ? this.close() : "submit" === a && this.submit();
        return this
    };
    f.prototype.blur = function () {
        this._blur();
        return this
    };
    f.prototype.bubble = function (a, b, c, e) {
        var j = this;
        if (this._tidy(function () {
            j.bubble(a, b, e)
        })) return this;
        d.isPlainObject(b) ? (e = b, b = h, c = !0) : "boolean" === typeof b && (c = b, e = b = h);
        d.isPlainObject(c) && (e = c, c = !0);
        c === h && (c = !0);
        var e = d.extend({}, this.s.formOptions.bubble, e),
			o = this._dataSource("individual", a, b);
        this._edit(a, o, "bubble");
        if (!this._preopen("bubble")) return this;
        var f = this._formOptions(e);
        d(i).on("resize." + f, function () {
            j.bubblePosition()
        });
        var k = [];
        this.s.bubbleNodes = k.concat.apply(k, y(o, "attach"));
        k = this.classes.bubble;
        o = d('<div class="' + k.bg + '"><div/></div>');
        k = d('<div class="' + k.wrapper + '"><div class="' + k.liner + '"><div class="' + k.table + '"><div class="' + k.close + '" /></div></div><div class="' + k.pointer + '" /></div>');
        c && (k.appendTo("body"), o.appendTo("body"));
        var c = k.children().eq(0),
			w = c.children(),
			g = w.children();
        c.append(this.dom.formError);
        w.prepend(this.dom.form);
        e.message && c.prepend(this.dom.formInfo);
        e.title && c.prepend(this.dom.header);
        e.buttons && w.append(this.dom.buttons);
        var z = d().add(k).add(o);
        this._closeReg(function () {
            z.animate({
                opacity: 0
            }, function () {
                z.detach();
                d(i).off("resize." + f);
                j._clearDynamicInfo()
            })
        });
        o.click(function () {
            j.blur()
        });
        g.click(function () {
            j._close()
        });
        this.bubblePosition();
        z.animate({
            opacity: 1
        });
        this._focus(this.s.includeFields, e.focus);
        this._postopen("bubble");
        return this
    };
    f.prototype.bubblePosition = function () {
        var a = d("div.DTE_Bubble"),
			b = d("div.DTE_Bubble_Liner"),
			c = this.s.bubbleNodes,
			e = 0,
			j = 0,
			o = 0,
			f = 0;
        d.each(c, function (a, b) {
            var c = d(b).offset();
            e += c.top;
            j += c.left;
            o += c.left + b.offsetWidth;
            f += c.top + b.offsetHeight
        });
        var e = e / c.length,
			j = j / c.length,
			o = o / c.length,
			f = f / c.length,
			c = e,
			k = (j + o) / 2,
			w = b.outerWidth(),
			g = k - w / 2,
			w = g + w,
			h = d(i).width();
        a.css({
            top: c,
            left: k
        });
        b.length && 0 > b.offset().top ? a.css("top", f).addClass("below") : a.removeClass("below");
        w + 15 > h ? b.css("left", 15 > g ? -(g - 15) : -(w - h + 15)) : b.css("left", 15 > g ? -(g - 15) : 0);
        return this
    };
    f.prototype.buttons = function (a) {
        var b = this;
        "_basic" === a ? a = [{
            label: this.i18n[this.s.action].submit,
            fn: function () {
                this.submit()
            }
        }] : d.isArray(a) || (a = [a]);
        d(this.dom.buttons).empty();
        d.each(a, function (a, e) {
            "string" === typeof e && (e = {
                label: e,
                fn: function () {
                    this.submit()
                }
            });
            d("<button/>", {
                "class": b.classes.form.button + (e.className ? " " + e.className : "")
            }).html("function" === typeof e.label ? e.label(b) : e.label || "").attr("tabindex", 0).on("keyup", function (a) {
                13 === a.keyCode && e.fn && e.fn.call(b)
            }).on("keypress", function (a) {
                13 === a.keyCode && a.preventDefault()
            }).on("click", function (a) {
                a.preventDefault();
                e.fn && e.fn.call(b)
            }).appendTo(b.dom.buttons)
        });
        return this
    };
    f.prototype.clear = function (a) {
        var b = this,
			c = this.s.fields;
        "string" === typeof a ? (c[a].destroy(), delete c[a], a = d.inArray(a, this.s.order), this.s.order.splice(a, 1)) : d.each(this._fieldNames(a), function (a, c) {
            b.clear(c)
        });
        return this
    };
    f.prototype.close = function () {
        this._close(!1);
        return this
    };
    f.prototype.create = function (a, b, c, e) {
        var j = this,
			o = this.s.fields,
			f = 1;
        if (this._tidy(function () {
            j.create(a, b, c, e)
        })) return this;
        "number" === typeof a && (f = a, a = b, b = c);
        this.s.editFields = {};
        for (var k = 0; k < f; k++) this.s.editFields[k] = {
            fields: this.s.fields
        };
        f = this._crudArgs(a, b, c, e);
        this.s.action = "create";
        this.s.modifier = null;
        this.dom.form.style.display = "block";
        this._actionClass();
        this._displayReorder(this.fields());
        d.each(o, function (a, b) {
            b.multiReset();
            b.set(b.def())
        });
        this._event("initCreate");
        this._assembleMain();
        this._formOptions(f.opts);
        f.maybeOpen();
        return this
    };
    f.prototype.dependent = function (a, b, c) {
        var e = this,
			j = this.field(a),
			o = {
			    type: "POST",
			    dataType: "json"
			},
			c = d.extend({
			    event: "change",
			    data: null,
			    preUpdate: null,
			    postUpdate: null
			}, c),
			f = function (a) {
			    c.preUpdate && c.preUpdate(a);
			    d.each({
			        labels: "label",
			        options: "update",
			        values: "val",
			        messages: "message",
			        errors: "error"
			    }, function (b, c) {
			        a[b] && d.each(a[b], function (a, b) {
			            e.field(a)[c](b)
			        })
			    });
			    d.each(["hide", "show", "enable", "disable"], function (b, c) {
			        if (a[c]) e[c](a[c])
			    });
			    c.postUpdate && c.postUpdate(a)
			};
        j.input().on(c.event, function () {
            var a = {};
            a.rows = e.s.editFields ? y(e.s.editFields, "data") : null;
            a.row = a.rows ? a.rows[0] : null;
            a.values = e.val();
            if (c.data) {
                var g = c.data(a);
                g && (c.data = g)
            }
            "function" === typeof b ? (a = b(j.val(), a, f)) && f(a) : (d.isPlainObject(b) ? d.extend(o, b) : o.url = b, d.ajax(d.extend(o, {
                url: b,
                data: a,
                success: f
            })))
        });
        return this
    };
    f.prototype.disable = function (a) {
        var b = this.s.fields;
        d.each(this._fieldNames(a), function (a, e) {
            b[e].disable()
        });
        return this
    };
    f.prototype.display = function (a) {
        return a === h ? this.s.displayed : this[a ? "open" : "close"]()
    };
    f.prototype.displayed = function () {
        return d.map(this.s.fields, function (a, b) {
            return a.displayed() ? b : null
        })
    };
    f.prototype.displayNode = function () {
        return this.s.displayController.node(this)
    };
    f.prototype.edit = function (a, b, c, e, d) {
        var f = this;
        if (this._tidy(function () {
            f.edit(a, b, c, e, d)
        })) return this;
        var n = this._crudArgs(b, c, e, d);
        this._edit(a, this._dataSource("fields", a), "main");
        this._assembleMain();
        this._formOptions(n.opts);
        n.maybeOpen();
        return this
    };
    f.prototype.enable = function (a) {
        var b = this.s.fields;
        d.each(this._fieldNames(a), function (a, e) {
            b[e].enable()
        });
        return this
    };
    f.prototype.error = function (a, b) {
        b === h ? this._message(this.dom.formError, a) : this.s.fields[a].error(b);
        return this
    };
    f.prototype.field = function (a) {
        return this.s.fields[a]
    };
    f.prototype.fields = function () {
        return d.map(this.s.fields, function (a, b) {
            return b
        })
    };
    f.prototype.get = function (a) {
        var b = this.s.fields;
        a || (a = this.fields());
        if (d.isArray(a)) {
            var c = {};
            d.each(a, function (a, d) {
                c[d] = b[d].get()
            });
            return c
        }
        return b[a].get()
    };
    f.prototype.hide = function (a, b) {
        var c = this.s.fields;
        d.each(this._fieldNames(a), function (a, d) {
            c[d].hide(b)
        });
        return this
    };
    f.prototype.inError = function (a) {
        if (d(this.dom.formError).is(":visible")) return !0;
        for (var b = this.s.fields, a = this._fieldNames(a), c = 0, e = a.length; c < e; c++) if (b[a[c]].inError()) return !0;
        return !1
    };
    f.prototype.inline = function (a, b, c) {
        var e = this;
        d.isPlainObject(b) && (c = b, b = h);
        var c = d.extend({}, this.s.formOptions.inline, c),
			j = this._dataSource("individual", a, b),
			f, n, k = 0,
			g, I = !1;
        d.each(j, function (a, b) {
            if (k > 0) throw "Cannot edit more than one row inline at a time";
            f = d(b.attach[0]);
            g = 0;
            d.each(b.displayFields, function (a, b) {
                if (g > 0) throw "Cannot edit more than one field inline at a time";
                n = b;
                g++
            });
            k++
        });
        if (d("div.DTE_Field", f).length || this._tidy(function () {
            e.inline(a, b, c)
        })) return this;
        this._edit(a, j, "inline");
        var z = this._formOptions(c);
        if (!this._preopen("inline")) return this;
        var N = f.contents().detach();
        f.append(d('<div class="DTE DTE_Inline"><div class="DTE_Inline_Field"/><div class="DTE_Inline_Buttons"/></div>'));
        f.find("div.DTE_Inline_Field").append(n.node());
        c.buttons && f.find("div.DTE_Inline_Buttons").append(this.dom.buttons);
        this._closeReg(function (a) {
            I = true;
            d(r).off("click" + z);
            if (!a) {
                f.contents().detach();
                f.append(N)
            }
            e._clearDynamicInfo()
        });
        setTimeout(function () {
            if (!I) d(r).on("click" + z, function (a) {
                var b = d.fn.addBack ? "addBack" : "andSelf";
                !n._typeFn("owns", a.target) && d.inArray(f[0], d(a.target).parents()[b]()) === -1 && e.blur()
            })
        }, 0);
        this._focus([n], c.focus);
        this._postopen("inline");
        return this
    };
    f.prototype.message = function (a, b) {
        b === h ? this._message(this.dom.formInfo, a) : this.s.fields[a].message(b);
        return this
    };
    f.prototype.mode = function () {
        return this.s.action
    };
    f.prototype.modifier = function () {
        return this.s.modifier
    };
    f.prototype.multiGet = function (a) {
        var b = this.s.fields;
        a === h && (a = this.fields());
        if (d.isArray(a)) {
            var c = {};
            d.each(a, function (a, d) {
                c[d] = b[d].multiGet()
            });
            return c
        }
        return b[a].multiGet()
    };
    f.prototype.multiSet = function (a, b) {
        var c = this.s.fields;
        d.isPlainObject(a) && b === h ? d.each(a, function (a, b) {
            c[a].multiSet(b)
        }) : c[a].multiSet(b);
        return this
    };
    f.prototype.node = function (a) {
        var b = this.s.fields;
        a || (a = this.order());
        return d.isArray(a) ? d.map(a, function (a) {
            return b[a].node()
        }) : b[a].node()
    };
    f.prototype.off = function (a, b) {
        d(this).off(this._eventName(a), b);
        return this
    };
    f.prototype.on = function (a, b) {
        d(this).on(this._eventName(a), b);
        return this
    };
    f.prototype.one = function (a, b) {
        d(this).one(this._eventName(a), b);
        return this
    };
    f.prototype.open = function () {
        var a = this;
        this._displayReorder();
        this._closeReg(function () {
            a.s.displayController.close(a, function () {
                a._clearDynamicInfo()
            })
        });
        if (!this._preopen("main")) return this;
        this.s.displayController.open(this, this.dom.wrapper);
        this._focus(d.map(this.s.order, function (b) {
            return a.s.fields[b]
        }), this.s.editOpts.focus);
        this._postopen("main");
        return this
    };
    f.prototype.order = function (a) {
        if (!a) return this.s.order;
        arguments.length && !d.isArray(a) && (a = Array.prototype.slice.call(arguments));
        if (this.s.order.slice().sort().join("-") !== a.slice().sort().join("-")) throw "All fields, and no additional fields, must be provided for ordering.";
        d.extend(this.s.order, a);
        this._displayReorder();
        return this
    };
    f.prototype.remove = function (a, b, c, e, j) {
        var f = this;
        if (this._tidy(function () {
            f.remove(a, b, c, e, j)
        })) return this;
        a.length === h && (a = [a]);
        var n = this._crudArgs(b, c, e, j),
			k = this._dataSource("fields", a);
        this.s.action = "remove";
        this.s.modifier = a;
        this.s.editFields = k;
        this.dom.form.style.display = "none";
        this._actionClass();
        this._event("initRemove", [y(k, "node"), y(k, "data"), a]);
        this._event("initMultiRemove", [k, a]);
        this._assembleMain();
        this._formOptions(n.opts);
        n.maybeOpen();
        n = this.s.editOpts;
        null !== n.focus && d("button", this.dom.buttons).eq(n.focus).focus();
        return this
    };
    f.prototype.set = function (a, b) {
        var c = this.s.fields;
        if (!d.isPlainObject(a)) {
            var e = {};
            e[a] = b;
            a = e
        }
        d.each(a, function (a, b) {
            c[a].set(b)
        });
        return this
    };
    f.prototype.show = function (a, b) {
        var c = this.s.fields;
        d.each(this._fieldNames(a), function (a, d) {
            c[d].show(b)
        });
        return this
    };
    f.prototype.submit = function (a, b, c, e) {
        var j = this,
			f = this.s.fields,
			n = [],
			k = 0,
			g = !1;
        if (this.s.processing || !this.s.action) return this;
        this._processing(!0);
        var h = function () {
            n.length !== k || g || (g = !0, j._submit(a, b, c, e))
        };
        this.error();
        d.each(f, function (a, b) {
            b.inError() && n.push(a)
        });
        d.each(n, function (a, b) {
            f[b].error("", function () {
                k++;
                h()
            })
        });
        h();
        return this
    };
    f.prototype.title = function (a) {
        var b = d(this.dom.header).children("div." + this.classes.header.content);
        if (a === h) return b.html();
        "function" === typeof a && (a = a(this, new t.Api(this.s.table)));
        b.html(a);
        return this
    };
    f.prototype.val = function (a, b) {
        return b === h ? this.get(a) : this.set(a, b)
    };
    var p = t.Api.register;
    p("editor()", function () {
        return v(this)
    });
    p("row.create()", function (a) {
        var b = v(this);
        b.create(A(b, a, "create"));
        return this
    });
    p("row().edit()", function (a) {
        var b = v(this);
        b.edit(this[0][0], A(b, a, "edit"));
        return this
    });
    p("rows().edit()", function (a) {
        var b = v(this);
        b.edit(this[0], A(b, a, "edit"));
        return this
    });
    p("row().delete()", function (a) {
        var b = v(this);
        b.remove(this[0][0], A(b, a, "remove", 1));
        return this
    });
    p("rows().delete()", function (a) {
        var b = v(this);
        b.remove(this[0], A(b, a, "remove", this[0].length));
        return this
    });
    p("cell().edit()", function (a, b) {
        a ? d.isPlainObject(a) && (b = a, a = "inline") : a = "inline";
        v(this)[a](this[0][0], b);
        return this
    });
    p("cells().edit()", function (a) {
        v(this).bubble(this[0], a);
        return this
    });
    p("file()", function (a, b) {
        return f.files[a][b]
    });
    p("files()", function (a, b) {
        if (!a) return f.files;
        if (!b) return f.files[a];
        f.files[a] = b;
        return this
    });
    d(r).on("xhr.dt", function (a, b, c) {
        "dt" === a.namespace && c && c.files && d.each(c.files, function (a, b) {
            f.files[a] = b
        })
    });
    f.error = function (a, b) {
        throw b ? a + " For more information, please refer to https://datatables.net/tn/" + b : a;
    };
    f.pairs = function (a, b, c) {
        var e, j, f, b = d.extend({
            label: "label",
            value: "value"
        }, b);
        if (d.isArray(a)) {
            e = 0;
            for (j = a.length; e < j; e++) f = a[e], d.isPlainObject(f) ? c(f[b.value] === h ? f[b.label] : f[b.value], f[b.label], e) : c(f, f, e)
        } else e = 0, d.each(a, function (a, b) {
            c(b, a, e);
            e++
        })
    };
    f.safeId = function (a) {
        return a.replace(/\./g, "-")
    };
    f.upload = function (a, b, c, e, j) {
        var o = new FileReader,
			n = 0,
			k = [];
        a.error(b.name, "");
        o.onload = function () {
            var g = new FormData,
				h;
            g.append("action", "upload");
            g.append("uploadField", b.name);
            g.append("upload", c[n]);
            b.ajaxData && b.ajaxData(g);
            if (b.ajax) h = b.ajax;
            else if ("string" === typeof a.s.ajax || d.isPlainObject(a.s.ajax)) h = a.s.ajax;
            if (!h) throw "No Ajax option specified for upload plug-in";
            "string" === typeof h && (h = {
                url: h
            });
            var z = !1;
            a.on("preSubmit.DTE_Upload", function () {
                z = !0;
                return !1
            });
            d.ajax(d.extend({}, h, {
                type: "post",
                data: g,
                dataType: "json",
                contentType: !1,
                processData: !1,
                xhr: function () {
                    var a = d.ajaxSettings.xhr();
                    a.upload && (a.upload.onprogress = function (a) {
                        a.lengthComputable && (a = (100 * (a.loaded / a.total)).toFixed(0) + "%", e(b, 1 === c.length ? a : n + ":" + c.length + " " + a))
                    }, a.upload.onloadend = function () {
                        e(b)
                    });
                    return a
                },
                success: function (b) {
                    a.off("preSubmit.DTE_Upload");
                    if (b.fieldErrors && b.fieldErrors.length) for (var b = b.fieldErrors, e = 0, g = b.length; e < g; e++) a.error(b[e].name, b[e].status);
                    else b.error ? a.error(b.error) : (b.files && d.each(b.files, function (a, b) {
                        f.files[a] = b
                    }), k.push(b.upload.id), n < c.length - 1 ? (n++, o.readAsDataURL(c[n])) : (j.call(a, k), z && a.submit()))
                }
            }))
        };
        o.readAsDataURL(c[0])
    };
    f.prototype._constructor = function (a) {
        a = d.extend(!0, {}, f.defaults, a);
        this.s = d.extend(!0, {}, f.models.settings, {
            table: a.domTable || a.table,
            dbTable: a.dbTable || null,
            ajaxUrl: a.ajaxUrl,
            ajax: a.ajax,
            idSrc: a.idSrc,
            dataSource: a.domTable || a.table ? f.dataSources.dataTable : f.dataSources.html,
            formOptions: a.formOptions,
            legacyAjax: a.legacyAjax
        });
        this.classes = d.extend(!0, {}, f.classes);
        this.i18n = a.i18n;
        var b = this,
			c = this.classes;
        this.dom = {
            wrapper: d('<div class="' + c.wrapper + '"><div data-dte-e="processing" class="' + c.processing.indicator + '"></div><div data-dte-e="body" class="' + c.body.wrapper + '"><div data-dte-e="body_content" class="' + c.body.content + '"/></div><div data-dte-e="foot" class="' + c.footer.wrapper + '"><div class="' + c.footer.content + '"/></div></div>')[0],
            form: d('<form data-dte-e="form" class="' + c.form.tag + '"><div data-dte-e="form_content" class="' + c.form.content + '"/></form>')[0],
            formError: d('<div data-dte-e="form_error" class="' + c.form.error + '"/>')[0],
            formInfo: d('<div data-dte-e="form_info" class="' + c.form.info + '"/>')[0],
            header: d('<div data-dte-e="head" class="' + c.header.wrapper + '"><div class="' + c.header.content + '"/></div>')[0],
            buttons: d('<div data-dte-e="form_buttons" class="' + c.form.buttons + '"/>')[0]
        };
        if (d.fn.dataTable.TableTools) {
            var e = d.fn.dataTable.TableTools.BUTTONS,
				j = this.i18n;
            d.each(["create", "edit", "remove"], function (a, b) {
                e["editor_" + b].sButtonText = j[b].button
            })
        }
        d.each(a.events, function (a, c) {
            b.on(a, function () {
                var a = Array.prototype.slice.call(arguments);
                a.shift();
                c.apply(b, a)
            })
        });
        var c = this.dom,
			o = c.wrapper;
        c.formContent = u("form_content", c.form)[0];
        c.footer = u("foot", o)[0];
        c.body = u("body", o)[0];
        c.bodyContent = u("body_content", o)[0];
        c.processing = u("processing", o)[0];
        a.fields && this.add(a.fields);
        d(r).on("init.dt.dte", function (a, c) {
            b.s.table && c.nTable === d(b.s.table).get(0) && (c._editor = b)
        }).on("xhr.dt", function (a, c, e) {
            e && (b.s.table && c.nTable === d(b.s.table).get(0)) && b._optionsUpdate(e)
        });
        this.s.displayController = f.display[a.display].init(this);
        this._event("initComplete", [])
    };
    f.prototype._actionClass = function () {
        var a = this.classes.actions,
			b = this.s.action,
			c = d(this.dom.wrapper);
        c.removeClass([a.create, a.edit, a.remove].join(" "));
        "create" === b ? c.addClass(a.create) : "edit" === b ? c.addClass(a.edit) : "remove" === b && c.addClass(a.remove)
    };
    f.prototype._ajax = function (a, b, c) {
        var e = {
            type: "POST",
            dataType: "json",
            data: null,
            error: c,
            success: function (a, c, e) {
                204 === e.status && (a = {});
                b(a)
            }
        },
			j;
        j = this.s.action;
        var f = this.s.ajax || this.s.ajaxUrl,
			n = "edit" === j || "remove" === j ? y(this.s.editFields, "idSrc") : null;
        d.isArray(n) && (n = n.join(","));
        d.isPlainObject(f) && f[j] && (f = f[j]);
        if (d.isFunction(f)) {
            var g = null,
				e = null;
            if (this.s.ajaxUrl) {
                var h = this.s.ajaxUrl;
                h.create && (g = h[j]); -1 !== g.indexOf(" ") && (j = g.split(" "), e = j[0], g = j[1]);
                g = g.replace(/_id_/, n)
            }
            f(e, g, a, b, c)
        } else "string" === typeof f ? -1 !== f.indexOf(" ") ? (j = f.split(" "), e.type = j[0], e.url = j[1]) : e.url = f : e = d.extend({}, e, f || {}), e.url = e.url.replace(/_id_/, n), e.data && (c = d.isFunction(e.data) ? e.data(a) : e.data, a = d.isFunction(e.data) && c ? c : d.extend(!0, a, c)), e.data = a, "DELETE" === e.type && (a = d.param(e.data), e.url += -1 === e.url.indexOf("?") ? "?" + a : "&" + a, delete e.data), d.ajax(e)
    };
    f.prototype._assembleMain = function () {
        var a = this.dom;
        d(a.wrapper).prepend(a.header);
        d(a.footer).append(a.formError).append(a.buttons);
        d(a.bodyContent).append(a.formInfo).append(a.form)
    };
    f.prototype._blur = function () {
        var a = this.s.editOpts;
        !1 !== this._event("preBlur") && ("submit" === a.onBlur ? this.submit() : "close" === a.onBlur && this._close())
    };
    f.prototype._clearDynamicInfo = function () {
        var a = this.classes.field.error,
			b = this.s.fields;
        d("div." + a, this.dom.wrapper).removeClass(a);
        d.each(b, function (a, b) {
            b.error("").message("")
        });
        this.error("").message("")
    };
    f.prototype._close = function (a) {
        !1 !== this._event("preClose") && (this.s.closeCb && (this.s.closeCb(a), this.s.closeCb = null), this.s.closeIcb && (this.s.closeIcb(), this.s.closeIcb = null), d("body").off("focus.editor-focus"), this.s.displayed = !1, this._event("close"))
    };
    f.prototype._closeReg = function (a) {
        this.s.closeCb = a
    };
    f.prototype._crudArgs = function (a, b, c, e) {
        var j = this,
			f, g, k;
        d.isPlainObject(a) || ("boolean" === typeof a ? (k = a, a = b) : (f = a, g = b, k = c, a = e));
        k === h && (k = !0);
        f && j.title(f);
        g && j.buttons(g);
        return {
            opts: d.extend({}, this.s.formOptions.main, a),
            maybeOpen: function () {
                k && j.open()
            }
        }
    };
    f.prototype._dataSource = function (a) {
        var b = Array.prototype.slice.call(arguments);
        b.shift();
        var c = this.s.dataSource[a];
        if (c) return c.apply(this, b)
    };
    f.prototype._displayReorder = function (a) {
        var b = d(this.dom.formContent),
			c = this.s.fields,
			e = this.s.order;
        a ? this.s.includeFields = a : a = this.s.includeFields;
        b.children().detach();
        d.each(e, function (e, o) {
            var g = o instanceof f.Field ? o.name() : o; -1 !== d.inArray(g, a) && b.append(c[g].node())
        });
        this._event("displayOrder", [this.s.displayed, this.s.action, b])
    };
    f.prototype._edit = function (a, b, c) {
        var e = this.s.fields,
			j = [],
			f;
        this.s.editFields = b;
        this.s.modifier = a;
        this.s.action = "edit";
        this.dom.form.style.display = "block";
        this._actionClass();
        d.each(e, function (a, c) {
            c.multiReset();
            f = !0;
            d.each(b, function (b, e) {
                if (e.fields[a]) {
                    var d = c.valFromData(e.data);
                    c.multiSet(b, d !== h ? d : c.def());
                    e.displayFields && !e.displayFields[a] && (f = !1)
                }
            });
            0 !== c.multiIds().length && f && j.push(a)
        });
        for (var e = this.order().slice(), g = e.length; 0 <= g; g--)-1 === d.inArray(e[g], j) && e.splice(g, 1);
        this._displayReorder(e);
        this.s.editData = this.multiGet();
        this._event("initEdit", [y(b, "node")[0], y(b, "data")[0], a, c]);
        this._event("initMultiEdit", [b, a, c])
    };
    f.prototype._event = function (a, b) {
        b || (b = []);
        if (d.isArray(a)) for (var c = 0, e = a.length; c < e; c++) this._event(a[c], b);
        else return c = d.Event(a), d(this).triggerHandler(c, b), c.result
    };
    f.prototype._eventName = function (a) {
        for (var b = a.split(" "), c = 0, e = b.length; c < e; c++) {
            var a = b[c],
				d = a.match(/^on([A-Z])/);
            d && (a = d[1].toLowerCase() + a.substring(3));
            b[c] = a
        }
        return b.join(" ")
    };
    f.prototype._fieldNames = function (a) {
        return a === h ? this.fields() : !d.isArray(a) ? [a] : a
    };
    f.prototype._focus = function (a, b) {
        var c = this,
			e, j = d.map(a, function (a) {
			    return "string" === typeof a ? c.s.fields[a] : a
			});
        "number" === typeof b ? e = j[b] : b && (e = 0 === b.indexOf("jq:") ? d("div.DTE " + b.replace(/^jq:/, "")) : this.s.fields[b]);
        (this.s.setFocus = e) && e.focus()
    };
    f.prototype._formOptions = function (a) {
        var b = this,
			c = M++,
			e = ".dteInline" + c;
        a.closeOnComplete !== h && (a.onComplete = a.closeOnComplete ? "close" : "none");
        a.submitOnBlur !== h && (a.onBlur = a.submitOnBlur ? "submit" : "close");
        a.submitOnReturn !== h && (a.onReturn = a.submitOnReturn ? "submit" : "none");
        a.blurOnBackground !== h && (a.onBackground = a.blurOnBackground ? "blur" : "none");
        this.s.editOpts = a;
        this.s.editCount = c;
        if ("string" === typeof a.title || "function" === typeof a.title) this.title(a.title), a.title = !0;
        if ("string" === typeof a.message || "function" === typeof a.message) this.message(a.message), a.message = !0;
        "boolean" !== typeof a.buttons && (this.buttons(a.buttons), a.buttons = !0);
        d(r).on("keydown" + e, function (c) {
            var e = d(r.activeElement),
				f = e.length ? e[0].nodeName.toLowerCase() : null;
            d(e).attr("type");
            if (b.s.displayed && a.onReturn === "submit" && c.keyCode === 13 && (f === "input" || f === "select")) {
                c.preventDefault();
                b.submit()
            } else if (c.keyCode === 27) {
                c.preventDefault();
                switch (a.onEsc) {
                    case "blur":
                        b.blur();
                        break;
                    case "close":
                        b.close();
                        break;
                    case "submit":
                        b.submit()
                }
            } else e.parents(".DTE_Form_Buttons").length && (c.keyCode === 37 ? e.prev("button").focus() : c.keyCode === 39 && e.next("button").focus())
        });
        this.s.closeIcb = function () {
            d(r).off("keydown" + e)
        };
        return e
    };
    f.prototype._legacyAjax = function (a, b, c) {
        if (this.s.legacyAjax) if ("send" === a) if ("create" === b || "edit" === b) {
            var e;
            d.each(c.data, function (a) {
                if (e !== h) throw "Editor: Multi-row editing is not supported by the legacy Ajax data format";
                e = a
            });
            c.data = c.data[e];
            "edit" === b && (c.id = e)
        } else c.id = d.map(c.data, function (a, b) {
            return b
        }), delete c.data;
        else c.data = !c.data && c.row ? [c.row] : []
    };
    f.prototype._optionsUpdate = function (a) {
        var b = this;
        a.options && d.each(this.s.fields, function (c) {
            if (a.options[c] !== h) {
                var e = b.field(c);
                e && e.update && e.update(a.options[c])
            }
        })
    };
    f.prototype._message = function (a, b) {
        "function" === typeof b && (b = b(this, new t.Api(this.s.table)));
        a = d(a);
        !b && this.s.displayed ? a.stop().fadeOut(function () {
            a.html("")
        }) : b ? this.s.displayed ? a.stop().html(b).fadeIn() : a.html(b).css("display", "block") : a.html("").css("display", "none")
    };
    f.prototype._multiInfo = function () {
        var a = this.s.fields,
			b = this.s.includeFields,
			c = !0;
        if (b) for (var e = 0, d = b.length; e < d; e++) a[b[e]].isMultiValue() && c ? (a[b[e]].multiInfoShown(c), c = !1) : a[b[e]].multiInfoShown(!1)
    };
    f.prototype._postopen = function (a) {
        var b = this,
			c = this.s.displayController.captureFocus;
        c === h && (c = !0);
        d(this.dom.form).off("submit.editor-internal").on("submit.editor-internal", function (a) {
            a.preventDefault()
        });
        if (c && ("main" === a || "bubble" === a)) d("body").on("focus.editor-focus", function () {
            0 === d(r.activeElement).parents(".DTE").length && 0 === d(r.activeElement).parents(".DTED").length && b.s.setFocus && b.s.setFocus.focus()
        });
        this._multiInfo();
        this._event("open", [a, this.s.action]);
        return !0
    };
    f.prototype._preopen = function (a) {
        if (!1 === this._event("preOpen", [a, this.s.action])) return !1;
        this.s.displayed = a;
        return !0
    };
    f.prototype._processing = function (a) {
        var b = d(this.dom.wrapper),
			c = this.dom.processing.style,
			e = this.classes.processing.active;
        a ? (c.display = "block", b.addClass(e), d("div.DTE").addClass(e)) : (c.display = "none", b.removeClass(e), d("div.DTE").removeClass(e));
        this.s.processing = a;
        this._event("processing", [a])
    };
    f.prototype._submit = function (a, b, c, e) {
        var f = this,
			g, n = !1,
			k = {},
			w = {},
			m = t.ext.oApi._fnSetObjectDataFn,
			l = this.s.fields,
			i = this.s.action,
			p = this.s.editCount,
			q = this.s.modifier,
			r = this.s.editFields,
			s = this.s.editData,
			u = this.s.editOpts,
			v = u.submit,
			x = {
			    action: this.s.action,
			    data: {}
			},
			y;
        this.s.dbTable && (x.table = this.s.dbTable);
        if ("create" === i || "edit" === i) if (d.each(r, function (a, b) {
            var c = {},
				e = {};
            d.each(l, function (f, j) {
                if (b.fields[f]) {
                    var g = j.multiGet(a),
						o = m(f),
						h = d.isArray(g) && f.indexOf("[]") !== -1 ? m(f.replace(/\[.*$/, "") + "-many-count") : null;
                    o(c, g);
                    h && h(c, g.length);
                    if (i === "edit" && g !== s[f][a]) {
                        o(e, g);
                        n = true;
                        h && h(e, g.length)
                    }
                }
            });
            d.isEmptyObject(c) || (k[a] = c);
            d.isEmptyObject(e) || (w[a] = e)
        }), "create" === i || "all" === v || "allIfChanged" === v && n) x.data = k;
        else if ("changed" === v && n) x.data = w;
        else {
            this.s.action = null;
            "close" === u.onComplete && (e === h || e) && this._close(!1);
            a && a.call(this);
            this._processing(!1);
            this._event("submitComplete");
            return
        } else "remove" === i && d.each(r, function (a, b) {
            x.data[a] = b.data
        });
        this._legacyAjax("send", i, x);
        y = d.extend(!0, {}, x);
        c && c(x);
        !1 === this._event("preSubmit", [x, i]) ? this._processing(!1) : this._ajax(x, function (c) {
            var n;
            f._legacyAjax("receive", i, c);
            f._event("postSubmit", [c, x, i]);
            if (!c.error) c.error = "";
            if (!c.fieldErrors) c.fieldErrors = [];
            if (c.error || c.fieldErrors.length) {
                f.error(c.error);
                d.each(c.fieldErrors, function (a, b) {
                    var c = l[b.name];
                    c.error(b.status || "Error");
                    if (a === 0) {
                        d(f.dom.bodyContent, f.s.wrapper).animate({
                            scrollTop: d(c.node()).position().top
                        }, 500);
                        c.focus()
                    }
                });
                b && b.call(f, c)
            } else {
                var k = {};
                f._dataSource("prep", i, q, y, c.data, k);
                if (i === "create" || i === "edit") for (g = 0; g < c.data.length; g++) {
                    n = c.data[g];
                    f._event("setData", [c, n, i]);
                    if (i === "create") {
                        f._event("preCreate", [c, n]);
                        f._dataSource("create", l, n, k);
                        f._event(["create", "postCreate"], [c, n])
                    } else if (i === "edit") {
                        f._event("preEdit", [c, n]);
                        f._dataSource("edit", q, l, n, k);
                        f._event(["edit", "postEdit"], [c, n])
                    }
                } else if (i === "remove") {
                    f._event("preRemove", [c]);
                    f._dataSource("remove", q, l, k);
                    f._event(["remove", "postRemove"], [c])
                }
                f._dataSource("commit", i, q, c.data, k);
                if (p === f.s.editCount) {
                    f.s.action = null;
                    u.onComplete === "close" && (e === h || e) && f._close(true)
                }
                a && a.call(f, c);
                f._event("submitSuccess", [c, n])
            }
            f._processing(false);
            f._event("submitComplete", [c, n])
        }, function (a, c, e) {
            f._event("postSubmit", [a, c, e, x]);
            f.error(f.i18n.error.system);
            f._processing(false);
            b && b.call(f, a, c, e);
            f._event(["submitError", "submitComplete"], [a, c, e, x])
        })
    };
    f.prototype._tidy = function (a) {
        if (this.s.processing) return this.one("submitComplete", a), !0;
        if ("inline" === this.display() || "bubble" === this.display()) {
            var b = this;
            this.one("close", function () {
                if (b.s.processing) b.one("submitComplete", function () {
                    var c = new d.fn.dataTable.Api(b.s.table);
                    if (b.s.table && c.settings()[0].oFeatures.bServerSide) c.one("draw", a);
                    else setTimeout(function () {
                        a()
                    }, 10)
                });
                else setTimeout(function () {
                    a()
                }, 10)
            }).blur();
            return !0
        }
        return !1
    };
    f.defaults = {
        table: null,
        ajaxUrl: null,
        fields: [],
        display: "lightbox",
        ajax: null,
        idSrc: "DT_RowId",
        events: {},
        i18n: {
            create: {
                button: "New",
                title: "Create new entry",
                submit: "Create"
            },
            edit: {
                button: "Edit",
                title: "Edit entry",
                submit: "Update"
            },
            remove: {
                button: "Delete",
                title: "Delete",
                submit: "Delete",
                confirm: {
                    _: "Are you sure you wish to delete %d rows?",
                    1: "Are you sure you wish to delete 1 row?"
                }
            },
            error: {
                system: 'A system error has occurred (<a target="_blank" href="//datatables.net/tn/12">More information</a>).'
            },
            multi: {
                title: "Multiple values",
                info: "The selected items contain different values for this input. To edit and set all items for this input to the same value, click or tap here, otherwise they will retain their individual values.",
                restore: "Undo changes"
            },
            datetime: {
                previous: "Previous",
                next: "Next",
                months: "January February March April May June July August September October November December".split(" "),
                weekdays: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
                amPm: ["am", "pm"],
                unknown: "-"
            }
        },
        formOptions: {
            bubble: d.extend({}, f.models.formOptions, {
                title: !1,
                message: !1,
                buttons: "_basic",
                submit: "changed"
            }),
            inline: d.extend({}, f.models.formOptions, {
                buttons: !1,
                submit: "changed"
            }),
            main: d.extend({}, f.models.formOptions)
        },
        legacyAjax: !1
    };
    var J = function (a, b, c) {
        d.each(c, function (e) {
            (e = b[e]) && C(a, e.dataSrc()).each(function () {
                for (; this.childNodes.length; ) this.removeChild(this.firstChild)
            }).html(e.valFromData(c))
        })
    },
		C = function (a, b) {
		    var c = "keyless" === a ? r : d('[data-editor-id="' + a + '"]');
		    return d('[data-editor-field="' + b + '"]', c)
		},
		D = f.dataSources = {},
		K = function (a) {
		    a = d(a);
		    setTimeout(function () {
		        a.addClass("highlight");
		        setTimeout(function () {
		            a.addClass("noHighlight").removeClass("highlight");
		            setTimeout(function () {
		                a.removeClass("noHighlight")
		            }, 550)
		        }, 500)
		    }, 20)
		},
		E = function (a, b, c, e, d) {
		    b.rows(c).indexes().each(function (c) {
		        var c = b.row(c),
					g = c.data(),
					k = d(g);
		        k === h && f.error("Unable to find row identifier", 14);
		        a[k] = {
		            idSrc: k,
		            data: g,
		            node: c.node(),
		            fields: e,
		            type: "row"
		        }
		    })
		},
		F = function (a, b, c, e, j, g) {
		    b.cells(c).indexes().each(function (c) {
		        var k = b.cell(c),
					i = b.row(c.row).data(),
					i = j(i),
					l;
		        if (!(l = g)) {
		            l = c.column;
		            l = b.settings()[0].aoColumns[l];
		            var m = l.editField !== h ? l.editField : l.mData,
						p = {};
		            d.each(e, function (a, b) {
		                if (d.isArray(m)) for (var c = 0; c < m.length; c++) {
		                    var e = b,
								f = m[c];
		                    e.dataSrc() === f && (p[e.name()] = e)
		                } else b.dataSrc() === m && (p[b.name()] = b)
		            });
		            d.isEmptyObject(p) && f.error("Unable to automatically determine field from source. Please specify the field name.", 11);
		            l = p
		        }
		        E(a, b, c.row, e, j);
		        a[i].attach = [k.node()];
		        a[i].displayFields = l
		    })
		};
    D.dataTable = {
        individual: function (a, b) {
            var c = t.ext.oApi._fnGetObjectDataFn(this.s.idSrc),
				e = d(this.s.table).DataTable(),
				f = this.s.fields,
				g = {},
				h, k;
            a.nodeName && d(a).hasClass("dtr-data") && (k = a, a = e.responsive.index(d(a).closest("li")));
            b && (d.isArray(b) || (b = [b]), h = {}, d.each(b, function (a, b) {
                h[b] = f[b]
            }));
            F(g, e, a, f, c, h);
            k && d.each(g, function (a, b) {
                b.attach = [k]
            });
            return g
        },
        fields: function (a) {
            var b = t.ext.oApi._fnGetObjectDataFn(this.s.idSrc),
				c = d(this.s.table).DataTable(),
				e = this.s.fields,
				f = {};
            d.isPlainObject(a) && (a.rows !== h || a.columns !== h || a.cells !== h) ? (a.rows !== h && E(f, c, a.rows, e, b), a.columns !== h && c.cells(null, a.columns).indexes().each(function (a) {
                F(f, c, a, e, b)
            }), a.cells !== h && F(f, c, a.cells, e, b)) : E(f, c, a, e, b);
            return f
        },
        create: function (a, b) {
            var c = d(this.s.table).DataTable();
            c.settings()[0].oFeatures.bServerSide || (c = c.row.add(b), K(c.node()))
        },
        edit: function (a, b, c, e) {
            a = d(this.s.table).DataTable();
            if (!a.settings()[0].oFeatures.bServerSide) {
                var f = t.ext.oApi._fnGetObjectDataFn(this.s.idSrc),
					g = f(c),
					b = a.row("#" + g);
                b.any() || (b = a.row(function (a, b) {
                    return g == f(b)
                }));
                b.any() && (b.data(c), K(b.node()), c = d.inArray(g, e.rowIds), e.rowIds.splice(c, 1))
            }
        },
        remove: function (a) {
            var b = d(this.s.table).DataTable();
            b.settings()[0].oFeatures.bServerSide || b.rows(a).remove()
        },
        prep: function (a, b, c, e, f) {
            "edit" === a && (f.rowIds = d.map(c.data, function (a, b) {
                if (!d.isEmptyObject(c.data[b])) return b
            }))
        },
        commit: function (a, b, c, e) {
            b = d(this.s.table).DataTable();
            if ("edit" === a && e.rowIds.length) for (var f = e.rowIds, g = t.ext.oApi._fnGetObjectDataFn(this.s.idSrc), h = 0, e = f.length; h < e; h++) a = b.row("#" + f[h]), a.any() || (a = b.row(function (a, b) {
                return f[h] === g(b)
            })), a.any() && a.remove();
            b.draw(this.s.editOpts.drawType)
        }
    };
    D.html = {
        initField: function (a) {
            var b = d('[data-editor-label="' + (a.data || a.name) + '"]');
            !a.label && b.length && (a.label = b.html())
        },
        individual: function (a, b) {
            if (a instanceof d || a.nodeName) b || (b = [d(a).attr("data-editor-field")]), a = d(a).parents("[data-editor-id]").data("editor-id");
            a || (a = "keyless");
            b && !d.isArray(b) && (b = [b]);
            if (!b || 0 === b.length) throw "Cannot automatically determine field name from data source";
            var c = D.html.fields.call(this, a),
				e = this.s.fields,
				f = {};
            d.each(b, function (a, b) {
                f[b] = e[b]
            });
            d.each(c, function (c, g) {
                g.type = "cell";
                for (var h = a, i = b, l = d(), m = 0, p = i.length; m < p; m++) l = l.add(C(h, i[m]));
                g.attach = l.toArray();
                g.fields = e;
                g.displayFields = f
            });
            return c
        },
        fields: function (a) {
            var b = {},
				c = {},
				e = this.s.fields;
            a || (a = "keyless");
            d.each(e, function (b, e) {
                var d = C(a, e.dataSrc()).html();
                e.valToData(c, null === d ? h : d)
            });
            b[a] = {
                idSrc: a,
                data: c,
                node: r,
                fields: e,
                type: "row"
            };
            return b
        },
        create: function (a, b) {
            if (b) {
                var c = t.ext.oApi._fnGetObjectDataFn(this.s.idSrc)(b);
                d('[data-editor-id="' + c + '"]').length && J(c, a, b)
            }
        },
        edit: function (a, b, c) {
            a = t.ext.oApi._fnGetObjectDataFn(this.s.idSrc)(c) || "keyless";
            J(a, b, c)
        },
        remove: function (a) {
            d('[data-editor-id="' + a + '"]').remove()
        }
    };
    f.classes = {
        wrapper: "DTE",
        processing: {
            indicator: "DTE_Processing_Indicator",
            active: "DTE_Processing"
        },
        header: {
            wrapper: "DTE_Header",
            content: "DTE_Header_Content"
        },
        body: {
            wrapper: "DTE_Body",
            content: "DTE_Body_Content"
        },
        footer: {
            wrapper: "DTE_Footer",
            content: "DTE_Footer_Content"
        },
        form: {
            wrapper: "DTE_Form",
            content: "DTE_Form_Content",
            tag: "",
            info: "DTE_Form_Info",
            error: "DTE_Form_Error",
            buttons: "DTE_Form_Buttons",
            button: "btn"
        },
        field: {
            wrapper: "DTE_Field",
            typePrefix: "DTE_Field_Type_",
            namePrefix: "DTE_Field_Name_",
            label: "DTE_Label",
            input: "DTE_Field_Input",
            inputControl: "DTE_Field_InputControl",
            error: "DTE_Field_StateError",
            "msg-label": "DTE_Label_Info",
            "msg-error": "DTE_Field_Error",
            "msg-message": "DTE_Field_Message",
            "msg-info": "DTE_Field_Info",
            multiValue: "multi-value",
            multiInfo: "multi-info",
            multiRestore: "multi-restore"
        },
        actions: {
            create: "DTE_Action_Create",
            edit: "DTE_Action_Edit",
            remove: "DTE_Action_Remove"
        },
        bubble: {
            wrapper: "DTE DTE_Bubble",
            liner: "DTE_Bubble_Liner",
            table: "DTE_Bubble_Table",
            close: "DTE_Bubble_Close",
            pointer: "DTE_Bubble_Triangle",
            bg: "DTE_Bubble_Background"
        }
    };
    if (t.TableTools) {
        var p = t.TableTools.BUTTONS,
			G = {
			    sButtonText: null,
			    editor: null,
			    formTitle: null
			};
        p.editor_create = d.extend(!0, p.text, G, {
            formButtons: [{
                label: null,
                fn: function () {
                    this.submit()
                }
            }],
            fnClick: function (a, b) {
                var c = b.editor,
					e = c.i18n.create,
					d = b.formButtons;
                if (!d[0].label) d[0].label = e.submit;
                c.create({
                    title: e.title,
                    buttons: d
                })
            }
        });
        p.editor_edit = d.extend(!0, p.select_single, G, {
            formButtons: [{
                label: null,
                fn: function () {
                    this.submit()
                }
            }],
            fnClick: function (a, b) {
                var c = this.fnGetSelectedIndexes();
                if (c.length === 1) {
                    var e = b.editor,
						d = e.i18n.edit,
						f = b.formButtons;
                    if (!f[0].label) f[0].label = d.submit;
                    e.edit(c[0], {
                        title: d.title,
                        buttons: f
                    })
                }
            }
        });
        p.editor_remove = d.extend(!0, p.select, G, {
            question: null,
            formButtons: [{
                label: null,
                fn: function () {
                    var a = this;
                    this.submit(function () {
                        d.fn.dataTable.TableTools.fnGetInstance(d(a.s.table).DataTable().table().node()).fnSelectNone()
                    })
                }
            }],
            fnClick: function (a, b) {
                var c = this.fnGetSelectedIndexes();
                if (c.length !== 0) {
                    var e = b.editor,
						d = e.i18n.remove,
						f = b.formButtons,
						g = typeof d.confirm === "string" ? d.confirm : d.confirm[c.length] ? d.confirm[c.length] : d.confirm._;
                    if (!f[0].label) f[0].label = d.submit;
                    e.remove(c, {
                        message: g.replace(/%d/g, c.length),
                        title: d.title,
                        buttons: f
                    })
                }
            }
        })
    }
    d.extend(t.ext.buttons, {
        create: {
            text: function (a, b, c) {
                return a.i18n("buttons.create", c.editor.i18n.create.button)
            },
            className: "buttons-create",
            editor: null,
            formButtons: {
                label: function (a) {
                    return a.i18n.create.submit
                },
                fn: function () {
                    this.submit()
                }
            },
            formMessage: null,
            formTitle: null,
            action: function (a, b, c, e) {
                a = e.editor;
                a.create({
                    buttons: e.formButtons,
                    message: e.formMessage,
                    title: e.formTitle || a.i18n.create.title
                })
            }
        },
        edit: {
            extend: "selected",
            text: function (a, b, c) {
                return a.i18n("buttons.edit", c.editor.i18n.edit.button)
            },
            className: "buttons-edit",
            editor: null,
            formButtons: {
                label: function (a) {
                    return a.i18n.edit.submit
                },
                fn: function () {
                    this.submit()
                }
            },
            formMessage: null,
            formTitle: null,
            action: function (a, b, c, e) {
                var a = e.editor,
					c = b.rows({
					    selected: !0
					}).indexes(),
					d = b.columns({
					    selected: !0
					}).indexes(),
					b = b.cells({
					    selected: !0
					}).indexes();
                a.edit(d.length || b.length ? {
                    rows: c,
                    columns: d,
                    cells: b
                } : c, {
                    message: e.formMessage,
                    buttons: e.formButtons,
                    title: e.formTitle || a.i18n.edit.title
                })
            }
        },
        remove: {
            extend: "selected",
            text: function (a, b, c) {
                return a.i18n("buttons.remove", c.editor.i18n.remove.button)
            },
            className: "buttons-remove",
            editor: null,
            formButtons: {
                label: function (a) {
                    return a.i18n.remove.submit
                },
                fn: function () {
                    this.submit()
                }
            },
            formMessage: function (a, b) {
                var c = b.rows({
                    selected: !0
                }).indexes(),
					e = a.i18n.remove;
                return ("string" === typeof e.confirm ? e.confirm : e.confirm[c.length] ? e.confirm[c.length] : e.confirm._).replace(/%d/g, c.length)
            },
            formTitle: null,
            action: function (a, b, c, e) {
                a = e.editor;
                a.remove(b.rows({
                    selected: !0
                }).indexes(), {
                    buttons: e.formButtons,
                    message: e.formMessage,
                    title: e.formTitle || a.i18n.remove.title
                })
            }
        }
    });
    f.fieldTypes = {};
    f.DateTime = function (a, b) {
        this.c = d.extend(!0, {}, f.DateTime.defaults, b);
        var c = this.c.classPrefix,
			e = this.c.i18n;
        if (!i.moment && "YYYY-MM-DD" !== this.c.format) throw "Editor datetime: Without momentjs only the format 'YYYY-MM-DD' can be used";
        var g = function (a) {
            return '<div class="' + c + '-timeblock"><div class="' + c + '-iconUp"><button>' + e.previous + '</button></div><div class="' + c + '-label"><span/><select class="' + c + "-" + a + '"/></div><div class="' + c + '-iconDown"><button>' + e.next + "</button></div></div>"
        },
			g = d('<div class="' + c + '"><div class="' + c + '-date"><div class="' + c + '-title"><div class="' + c + '-iconLeft"><button>' + e.previous + '</button></div><div class="' + c + '-iconRight"><button>' + e.next + '</button></div><div class="' + c + '-label"><span/><select class="' + c + '-month"/></div><div class="' + c + '-label"><span/><select class="' + c + '-year"/></div></div><div class="' + c + '-calendar"/></div><div class="' + c + '-time">' + g("hours") + "<span>:</span>" + g("minutes") + "<span>:</span>" + g("seconds") + g("ampm") + "</div></div>");
        this.dom = {
            container: g,
            date: g.find("." + c + "-date"),
            title: g.find("." + c + "-title"),
            calendar: g.find("." + c + "-calendar"),
            time: g.find("." + c + "-time"),
            input: d(a)
        };
        this.s = {
            d: null,
            display: null,
            namespace: "editor-dateime-" + f.DateTime._instance++,
            parts: {
                date: null !== this.c.format.match(/[YMD]/),
                time: null !== this.c.format.match(/[Hhm]/),
                seconds: -1 !== this.c.format.indexOf("s"),
                hours12: null !== this.c.format.match(/[haA]/)
            }
        };
        this.dom.container.append(this.dom.date).append(this.dom.time);
        this.dom.date.append(this.dom.title).append(this.dom.calendar);
        this._constructor()
    };
    d.extend(f.DateTime.prototype, {
        destroy: function () {
            this._hide();
            this.dom.container().off("").empty();
            this.dom.input.off(".editor-datetime")
        },
        max: function (a) {
            this.c.maxDate = a;
            this._optionsTitle();
            this._setCalander()
        },
        min: function (a) {
            this.c.minDate = a;
            this._optionsTitle();
            this._setCalander()
        },
        owns: function (a) {
            return 0 < d(a).parents().filter(this.dom.container).length
        },
        val: function (a, b) {
            if (a === h) return this.s.d;
            if (a instanceof Date) this.s.d = this._dateToUtc(a);
            else if (null === a || "" === a) this.s.d = null;
            else if ("string" === typeof a) if (i.moment) {
                var c = i.moment.utc(a, this.c.format, this.c.momentLocale, this.c.momentStrict);
                this.s.d = c.isValid() ? c.toDate() : null
            } else c = a.match(/(\d{4})\-(\d{2})\-(\d{2})/), this.s.d = c ? new Date(Date.UTC(c[1], c[2] - 1, c[3])) : null;
            if (b || b === h) this.s.d ? this._writeOutput() : this.dom.input.val(a);
            this.s.d || (this.s.d = this._dateToUtc(new Date));
            this.s.display = new Date(this.s.d.toString());
            this._setTitle();
            this._setCalander();
            this._setTime()
        },
        _constructor: function () {
            var a = this,
				b = this.c.classPrefix,
				c = this.c.i18n;
            this.s.parts.date || this.dom.date.css("display", "none");
            this.s.parts.time || this.dom.time.css("display", "none");
            this.s.parts.seconds || (this.dom.time.children("div.editor-datetime-timeblock").eq(2).remove(), this.dom.time.children("span").eq(1).remove());
            this.s.parts.hours12 || this.dom.time.children("div.editor-datetime-timeblock").last().remove();
            this._optionsTitle();
            this._optionsTime("hours", this.s.parts.hours12 ? 12 : 24, 1);
            this._optionsTime("minutes", 60, this.c.minutesIncrement);
            this._optionsTime("seconds", 60, this.c.secondsIncrement);
            this._options("ampm", ["am", "pm"], c.amPm);
            this.dom.input.on("focus.editor-datetime click.editor-datetime", function () {
                if (!a.dom.container.is(":visible") && !a.dom.input.is(":disabled")) {
                    a.val(a.dom.input.val(), false);
                    a._show()
                }
            }).on("keyup.editor-datetime", function () {
                a.dom.container.is(":visible") && a.val(a.dom.input.val(), false)
            });
            this.dom.container.on("change", "select", function () {
                var c = d(this),
					f = c.val();
                if (c.hasClass(b + "-month")) {
                    a.s.display.setUTCMonth(f);
                    a._setTitle();
                    a._setCalander()
                } else if (c.hasClass(b + "-year")) {
                    a.s.display.setFullYear(f);
                    a._setTitle();
                    a._setCalander()
                } else if (c.hasClass(b + "-hours") || c.hasClass(b + "-ampm")) {
                    if (a.s.parts.hours12) {
                        c = d(a.dom.container).find("." + b + "-hours").val() * 1;
                        f = d(a.dom.container).find("." + b + "-ampm").val() === "pm";
                        a.s.d.setUTCHours(c === 12 && !f ? 0 : f && c !== 12 ? c + 12 : c)
                    } else a.s.d.setUTCHours(f);
                    a._setTime();
                    a._writeOutput(true)
                } else if (c.hasClass(b + "-minutes")) {
                    a.s.d.setUTCMinutes(f);
                    a._setTime();
                    a._writeOutput(true)
                } else if (c.hasClass(b + "-seconds")) {
                    a.s.d.setSeconds(f);
                    a._setTime();
                    a._writeOutput(true)
                }
                a.dom.input.focus();
                a._position()
            }).on("click", function (c) {
                var f = c.target.nodeName.toLowerCase();
                if (f !== "select") {
                    c.stopPropagation();
                    if (f === "button") {
                        c = d(c.target);
                        f = c.parent();
                        if (!f.hasClass("disabled")) if (f.hasClass(b + "-iconLeft")) {
                            a.s.display.setUTCMonth(a.s.display.getUTCMonth() - 1);
                            a._setTitle();
                            a._setCalander();
                            a.dom.input.focus()
                        } else if (f.hasClass(b + "-iconRight")) {
                            a.s.display.setUTCMonth(a.s.display.getUTCMonth() + 1);
                            a._setTitle();
                            a._setCalander();
                            a.dom.input.focus()
                        } else if (f.hasClass(b + "-iconUp")) {
                            c = f.parent().find("select")[0];
                            c.selectedIndex = c.selectedIndex !== c.options.length - 1 ? c.selectedIndex + 1 : 0;
                            d(c).change()
                        } else if (f.hasClass(b + "-iconDown")) {
                            c = f.parent().find("select")[0];
                            c.selectedIndex = c.selectedIndex === 0 ? c.options.length - 1 : c.selectedIndex - 1;
                            d(c).change()
                        } else {
                            if (!a.s.d) a.s.d = a._dateToUtc(new Date);
                            a.s.d.setFullYear(c.data("year"));
                            a.s.d.setUTCMonth(c.data("month"));
                            a.s.d.setUTCDate(c.data("day"));
                            a._writeOutput(true);
                            setTimeout(function () {
                                a._hide()
                            }, 10)
                        }
                    } else a.dom.input.focus()
                }
            })
        },
        _compareDates: function (a, b) {
            return a.toDateString() === b.toDateString()
        },
        _daysInMonth: function (a, b) {
            return [31, 0 === a % 4 && (0 !== a % 100 || 0 === a % 400) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][b]
        },
        _dateToUtc: function (a) {
            return new Date(Date.UTC(a.getFullYear(), a.getMonth(), a.getDate(), a.getHours(), a.getMinutes(), a.getSeconds()))
        },
        _hide: function () {
            var a = this.s.namespace;
            this.dom.container.detach();
            d(i).off("." + a);
            d(r).off("keydown." + a);
            d("div.DTE_Body_Content").off("scroll." + a);
            d("body").off("click." + a)
        },
        _hours24To12: function (a) {
            return 0 === a ? 12 : 12 < a ? a - 12 : a
        },
        _htmlDay: function (a) {
            if (a.empty) return '<td class="empty"></td>';
            var b = ["day"],
				c = this.c.classPrefix;
            a.disabled && b.push("disabled");
            a.today && b.push("today");
            a.selected && b.push("selected");
            return '<td data-day="' + a.day + '" class="' + b.join(" ") + '"><button class="' + c + "-button " + c + '-day" type="button" data-year="' + a.year + '" data-month="' + a.month + '" data-day="' + a.day + '">' + a.day + "</button></td>"
        },
        _htmlMonth: function (a, b) {
            var c = new Date,
				e = this._daysInMonth(a, b),
				f = (new Date(Date.UTC(a, b, 1))).getUTCDay(),
				g = [],
				h = [];
            0 < this.c.firstDay && (f -= this.c.firstDay, 0 > f && (f += 7));
            for (var k = e + f, i = k; 7 < i; ) i -= 7;
            var k = k + (7 - i),
				i = this.c.minDate,
				l = this.c.maxDate;
            i && (i.setUTCHours(0), i.setUTCMinutes(0), i.setSeconds(0));
            l && (l.setUTCHours(23), l.setUTCMinutes(59), l.setSeconds(59));
            for (var m = 0, p = 0; m < k; m++) {
                var q = new Date(Date.UTC(a, b, 1 + (m - f))),
					r = this.s.d ? this._compareDates(q, this.s.d) : !1,
					s = this._compareDates(q, c),
					t = m < f || m >= e + f,
					u = i && q < i || l && q > l,
					v = this.c.disableDays;
                d.isArray(v) && -1 !== d.inArray(q.getUTCDay(), v) ? u = !0 : "function" === typeof v && !0 === v(q) && (u = !0);
                h.push(this._htmlDay({
                    day: 1 + (m - f),
                    month: b,
                    year: a,
                    selected: r,
                    today: s,
                    disabled: u,
                    empty: t
                }));
                7 === ++p && (this.c.showWeekNumber && h.unshift(this._htmlWeekOfYear(m - f, b, a)), g.push("<tr>" + h.join("") + "</tr>"), h = [], p = 0)
            }
            c = this.c.classPrefix + "-table";
            this.c.showWeekNumber && (c += " weekNumber");
            return '<table class="' + c + '"><thead>' + this._htmlMonthHead() + "</thead><tbody>" + g.join("") + "</tbody></table>"
        },
        _htmlMonthHead: function () {
            var a = [],
				b = this.c.firstDay,
				c = this.c.i18n,
				e = function (a) {
				    for (a += b; 7 <= a; ) a -= 7;
				    return c.weekdays[a]
				};
            this.c.showWeekNumber && a.push("<th></th>");
            for (var d = 0; 7 > d; d++) a.push("<th>" + e(d) + "</th>");
            return a.join("")
        },
        _htmlWeekOfYear: function (a, b, c) {
            var e = new Date(c, 0, 1),
				a = Math.ceil(((new Date(c, b, a) - e) / 864E5 + e.getUTCDay() + 1) / 7);
            return '<td class="' + this.c.classPrefix + '-week">' + a + "</td>"
        },
        _options: function (a, b, c) {
            c || (c = b);
            a = this.dom.container.find("select." + this.c.classPrefix + "-" + a);
            a.empty();
            for (var e = 0, d = b.length; e < d; e++) a.append('<option value="' + b[e] + '">' + c[e] + "</option>")
        },
        _optionSet: function (a, b) {
            var c = this.dom.container.find("select." + this.c.classPrefix + "-" + a),
				e = c.parent().children("span");
            c.val(b);
            c = c.find("option:selected");
            e.html(0 !== c.length ? c.text() : this.c.i18n.unknown)
        },
        _optionsTime: function (a, b, c) {
            var a = this.dom.container.find("select." + this.c.classPrefix + "-" + a),
				e = 0,
				d = b,
				f = 12 === b ?
			function (a) {
			    return a
			} : this._pad;
            12 === b && (e = 1, d = 13);
            for (b = e; b < d; b += c) a.append('<option value="' + b + '">' + f(b) + "</option>")
        },
        _optionsTitle: function () {
            var a = this.c.i18n,
				b = this.c.minDate,
				c = this.c.maxDate,
				b = b ? b.getFullYear() : null,
				c = c ? c.getFullYear() : null,
				b = null !== b ? b : (new Date).getFullYear() - this.c.yearRange,
				c = null !== c ? c : (new Date).getFullYear() + this.c.yearRange;
            this._options("month", this._range(0, 11), a.months);
            this._options("year", this._range(b, c))
        },
        _pad: function (a) {
            return 10 > a ? "0" + a : a
        },
        _position: function () {
            var a = this.dom.input.offset(),
				b = this.dom.container,
				c = this.dom.input.outerHeight();
            b.css({
                top: a.top + c,
                left: a.left
            }).appendTo("body");
            var e = b.outerHeight(),
				f = d("body").scrollTop();
            a.top + c + e - f > d(i).height() && (a = a.top - e, b.css("top", 0 > a ? 0 : a))
        },
        _range: function (a, b) {
            for (var c = [], e = a; e <= b; e++) c.push(e);
            return c
        },
        _setCalander: function () {
            this.dom.calendar.empty().append(this._htmlMonth(this.s.display.getFullYear(), this.s.display.getUTCMonth()))
        },
        _setTitle: function () {
            this._optionSet("month", this.s.display.getUTCMonth());
            this._optionSet("year", this.s.display.getFullYear())
        },
        _setTime: function () {
            var a = this.s.d,
				b = a ? a.getUTCHours() : 0;
            this.s.parts.hours12 ? (this._optionSet("hours", this._hours24To12(b)), this._optionSet("ampm", 12 > b ? "am" : "pm")) : this._optionSet("hours", b);
            this._optionSet("minutes", a ? a.getUTCMinutes() : 0);
            this._optionSet("seconds", a ? a.getSeconds() : 0)
        },
        _show: function () {
            var a = this,
				b = this.s.namespace;
            this._position();
            d(i).on("scroll." + b + " resize." + b, function () {
                a._position()
            });
            d("div.DTE_Body_Content").on("scroll." + b, function () {
                a._position()
            });
            d(r).on("keydown." + b, function (b) {
                (9 === b.keyCode || 27 === b.keyCode || 13 === b.keyCode) && a._hide()
            });
            setTimeout(function () {
                d("body").on("click." + b, function (b) {
                    !d(b.target).parents().filter(a.dom.container).length && b.target !== a.dom.input[0] && a._hide()
                })
            }, 10)
        },
        _writeOutput: function (a) {
            var b = this.s.d,
				b = i.moment ? i.moment.utc(b, h, this.c.momentLocale, this.c.momentStrict).format(this.c.format) : b.getUTCFullYear() + "-" + this._pad(b.getUTCMonth() + 1) + "-" + this._pad(b.getUTCDate());
            this.dom.input.val(b);
            a && this.dom.input.focus()
        }
    });
    f.DateTime._instance = 0;
    f.DateTime.defaults = {
        classPrefix: "editor-datetime",
        disableDays: null,
        firstDay: 1,
        format: "YYYY-MM-DD",
        i18n: f.defaults.i18n.datetime,
        maxDate: null,
        minDate: null,
        minutesIncrement: 1,
        momentStrict: !0,
        momentLocale: "en",
        secondsIncrement: 1,
        showWeekNumber: !1,
        yearRange: 10
    };
    var H = function (a, b) {
        if (null === b || b === h) b = a.uploadText || "Choose file...";
        a._input.find("div.upload button").text(b)
    },
		L = function (a, b, c) {
		    var e = a.classes.form.button,
				e = d('<div class="editor_upload"><div class="eu_table"><div class="row"><div class="cell upload"><button class="' + e + '" /><input type="file"/></div><div class="cell clearValue"><button class="' + e + '" /></div></div><div class="row second"><div class="cell"><div class="drop"><span/></div></div><div class="cell"><div class="rendered"/></div></div></div></div>');
		    b._input = e;
		    b._enabled = !0;
		    H(b);
		    if (i.FileReader && !1 !== b.dragDrop) {
		        e.find("div.drop span").text(b.dragDropText || "Drag and drop a file here to upload");
		        var g = e.find("div.drop");
		        g.on("drop", function (e) {
		            b._enabled && (f.upload(a, b, e.originalEvent.dataTransfer.files, H, c), g.removeClass("over"));
		            return !1
		        }).on("dragleave dragexit", function () {
		            b._enabled && g.removeClass("over");
		            return !1
		        }).on("dragover", function () {
		            b._enabled && g.addClass("over");
		            return !1
		        });
		        a.on("open", function () {
		            d("body").on("dragover.DTE_Upload drop.DTE_Upload", function () {
		                return !1
		            })
		        }).on("close", function () {
		            d("body").off("dragover.DTE_Upload drop.DTE_Upload")
		        })
		    } else e.addClass("noDrop"), e.append(e.find("div.rendered"));
		    e.find("div.clearValue button").on("click", function () {
		        f.fieldTypes.upload.set.call(a, b, "")
		    });
		    e.find("input[type=file]").on("change", function () {
		        f.upload(a, b, this.files, H, c)
		    });
		    return e
		},
		B = function (a) {
		    setTimeout(function () {
		        a.trigger("change", {
		            editorSet: !0
		        })
		    }, 0)
		},
		s = f.fieldTypes,
		p = d.extend(!0, {}, f.models.fieldType, {
		    get: function (a) {
		        return a._input.val()
		    },
		    set: function (a, b) {
		        a._input.val(b);
		        B(a._input)
		    },
		    enable: function (a) {
		        a._input.prop("disabled", false)
		    },
		    disable: function (a) {
		        a._input.prop("disabled", true)
		    }
		});
    s.hidden = {
        create: function (a) {
            a._val = a.value;
            return null
        },
        get: function (a) {
            return a._val
        },
        set: function (a, b) {
            a._val = b
        }
    };
    s.readonly = d.extend(!0, {}, p, {
        create: function (a) {
            a._input = d("<input/>").attr(d.extend({
                id: f.safeId(a.id),
                type: "text",
                readonly: "readonly"
            }, a.attr || {}));
            return a._input[0]
        }
    });
    s.text = d.extend(!0, {}, p, {
        create: function (a) {
            a._input = d("<input/>").attr(d.extend({
                id: f.safeId(a.id),
                type: "text"
            }, a.attr || {}));
            return a._input[0]
        }
    });
    s.password = d.extend(!0, {}, p, {
        create: function (a) {
            a._input = d("<input/>").attr(d.extend({
                id: f.safeId(a.id),
                type: "password"
            }, a.attr || {}));
            return a._input[0]
        }
    });
    s.textarea = d.extend(!0, {}, p, {
        create: function (a) {
            a._input = d("<textarea/>").attr(d.extend({
                id: f.safeId(a.id)
            }, a.attr || {}));
            return a._input[0]
        }
    });
    s.select = d.extend(!0, {}, p, {
        _addOptions: function (a, b) {
            var c = a._input[0].options,
				e = 0;
            c.length = 0;
            if (a.placeholder !== h) {
                e = e + 1;
                c[0] = new Option(a.placeholder, a.placeholderValue !== h ? a.placeholderValue : "");
                var d = a.placeholderDisabled !== h ? a.placeholderDisabled : true;
                c[0].hidden = d;
                c[0].disabled = d
            }
            b && f.pairs(b, a.optionsPair, function (a, b, d) {
                c[d + e] = new Option(b, a);
                c[d + e]._editor_val = a
            })
        },
        create: function (a) {
            a._input = d("<select/>").attr(d.extend({
                id: f.safeId(a.id),
                multiple: a.multiple === true
            }, a.attr || {}));
            s.select._addOptions(a, a.options || a.ipOpts);
            return a._input[0]
        },
        update: function (a, b) {
            var c = s.select.get(a),
				e = a._lastSet;
            s.select._addOptions(a, b);
            !s.select.set(a, c, true) && e && s.select.set(a, e, true)
        },
        get: function (a) {
            var b = a._input.find("option:selected").map(function () {
                return this._editor_val
            }).toArray();
            return a.multiple ? a.separator ? b.join(a.separator) : b : b.length ? b[0] : null
        },
        set: function (a, b, c) {
            if (!c) a._lastSet = b;
            var b = a.multiple && a.separator && !d.isArray(b) ? b.split(a.separator) : [b],
				e, f = b.length,
				g, h = false,
				c = a._input.find("option");
            a._input.find("option").each(function () {
                g = false;
                for (e = 0; e < f; e++) if (this._editor_val == b[e]) {
                    h = g = true;
                    break
                }
                this.selected = g
            });
            if (a.placeholder && !h && !a.multiple && c.length) c[0].selected = true;
            B(a._input);
            return h
        }
    });
    s.checkbox = d.extend(!0, {}, p, {
        _addOptions: function (a, b) {
            var c = a._input.empty();
            b && f.pairs(b, a.optionsPair, function (b, g, h) {
                c.append('<div><input id="' + f.safeId(a.id) + "_" + h + '" type="checkbox" /><label for="' + f.safeId(a.id) + "_" + h + '">' + g + "</label></div>");
                d("input:last", c).attr("value", b)[0]._editor_val = b
            })
        },
        create: function (a) {
            a._input = d("<div />");
            s.checkbox._addOptions(a, a.options || a.ipOpts);
            return a._input[0]
        },
        get: function (a) {
            var b = [];
            a._input.find("input:checked").each(function () {
                b.push(this._editor_val)
            });
            return !a.separator ? b : b.length === 1 ? b[0] : b.join(a.separator)
        },
        set: function (a, b) {
            var c = a._input.find("input");
            !d.isArray(b) && typeof b === "string" ? b = b.split(a.separator || "|") : d.isArray(b) || (b = [b]);
            var e, f = b.length,
				g;
            c.each(function () {
                g = false;
                for (e = 0; e < f; e++) if (this._editor_val == b[e]) {
                    g = true;
                    break
                }
                this.checked = g
            });
            B(c)
        },
        enable: function (a) {
            a._input.find("input").prop("disabled", false)
        },
        disable: function (a) {
            a._input.find("input").prop("disabled", true)
        },
        update: function (a, b) {
            var c = s.checkbox,
				e = c.get(a);
            c._addOptions(a, b);
            c.set(a, e)
        }
    });
    s.radio = d.extend(!0, {}, p, {
        _addOptions: function (a, b) {
            var c = a._input.empty();
            b && f.pairs(b, a.optionsPair, function (b, g, h) {
                c.append('<div><input id="' + f.safeId(a.id) + "_" + h + '" type="radio" name="' + a.name + '" /><label for="' + f.safeId(a.id) + "_" + h + '">' + g + "</label></div>");
                d("input:last", c).attr("value", b)[0]._editor_val = b
            })
        },
        create: function (a) {
            a._input = d("<div />");
            s.radio._addOptions(a, a.options || a.ipOpts);
            this.on("open", function () {
                a._input.find("input").each(function () {
                    if (this._preChecked) this.checked = true
                })
            });
            return a._input[0]
        },
        get: function (a) {
            a = a._input.find("input:checked");
            return a.length ? a[0]._editor_val : h
        },
        set: function (a, b) {
            a._input.find("input").each(function () {
                this._preChecked = false;
                if (this._editor_val == b) this._preChecked = this.checked = true;
                else this._preChecked = this.checked = false
            });
            B(a._input.find("input:checked"))
        },
        enable: function (a) {
            a._input.find("input").prop("disabled", false)
        },
        disable: function (a) {
            a._input.find("input").prop("disabled", true)
        },
        update: function (a, b) {
            var c = s.radio,
				e = c.get(a);
            c._addOptions(a, b);
            var d = a._input.find("input");
            c.set(a, d.filter('[value="' + e + '"]').length ? e : d.eq(0).attr("value"))
        }
    });
    s.date = d.extend(!0, {}, p, {
        create: function (a) {
            a._input = d("<input />").attr(d.extend({
                id: f.safeId(a.id),
                type: "text"
            }, a.attr));
            if (d.datepicker) {
                a._input.addClass("jqueryui");
                if (!a.dateFormat) a.dateFormat = d.datepicker.RFC_2822;
                if (a.dateImage === h) a.dateImage = "../../images/calender.png";
                setTimeout(function () {
                    d(a._input).datepicker(d.extend({
                        showOn: "both",
                        dateFormat: a.dateFormat,
                        buttonImage: a.dateImage,
                        buttonImageOnly: true
                    }, a.opts));
                    d("#ui-datepicker-div").css("display", "none")
                }, 10)
            } else a._input.attr("type", "date");
            return a._input[0]
        },
        set: function (a, b) {
            d.datepicker && a._input.hasClass("hasDatepicker") ? a._input.datepicker("setDate", b).change() : d(a._input).val(b)
        },
        enable: function (a) {
            d.datepicker ? a._input.datepicker("enable") : d(a._input).prop("disabled", false)
        },
        disable: function (a) {
            d.datepicker ? a._input.datepicker("disable") : d(a._input).prop("disabled", true)
        },
        owns: function (a, b) {
            return d(b).parents("div.ui-datepicker").length || d(b).parents("div.ui-datepicker-header").length ? true : false
        }
    });
    s.datetime = d.extend(!0, {}, p, {
        create: function (a) {
            a._input = d("<input />").attr(d.extend(true, {
                id: f.safeId(a.id),
                type: "text"
            }, a.attr));
            a._picker = new f.DateTime(a._input, d.extend({
                format: a.format,
                i18n: this.i18n.datetime
            }, a.opts));
            return a._input[0]
        },
        set: function (a, b) {
            a._picker.val(b);
            B(a._input)
        },
        owns: function (a, b) {
            a._picker.owns(b)
        },
        destroy: function (a) {
            a._picker.destroy()
        },
        minDate: function (a, b) {
            a._picker.min(b)
        },
        maxDate: function (a, b) {
            a._picker.max(b)
        }
    });
    s.upload = d.extend(!0, {}, p, {
        create: function (a) {
            var b = this;
            return L(b, a, function (c) {
                f.fieldTypes.upload.set.call(b, a, c[0])
            })
        },
        get: function (a) {
            return a._val
        },
        set: function (a, b) {
            a._val = b;
            var c = a._input;
            if (a.display) {
                var d = c.find("div.rendered");
                a._val ? d.html(a.display(a._val)) : d.empty().append("<span>" + (a.noFileText || "No file") + "</span>")
            }
            d = c.find("div.clearValue button");
            if (b && a.clearText) {
                d.html(a.clearText);
                c.removeClass("noClear")
            } else c.addClass("noClear");
            a._input.find("input").triggerHandler("upload.editor", [a._val])
        },
        enable: function (a) {
            a._input.find("input").prop("disabled", false);
            a._enabled = true
        },
        disable: function (a) {
            a._input.find("input").prop("disabled", true);
            a._enabled = false
        }
    });
    s.uploadMany = d.extend(!0, {}, p, {
        create: function (a) {
            var b = this,
				c = L(b, a, function (c) {
				    a._val = a._val.concat(c);
				    f.fieldTypes.uploadMany.set.call(b, a, a._val)
				});
            c.addClass("multi").on("click", "button.remove", function (c) {
                c.stopPropagation();
                c = d(this).data("idx");
                a._val.splice(c, 1);
                f.fieldTypes.uploadMany.set.call(b, a, a._val)
            });
            return c
        },
        get: function (a) {
            return a._val
        },
        set: function (a, b) {
            b || (b = []);
            if (!d.isArray(b)) throw "Upload collections must have an array as a value";
            a._val = b;
            var c = this,
				e = a._input;
            if (a.display) {
                e = e.find("div.rendered").empty();
                if (b.length) {
                    var f = d("<ul/>").appendTo(e);
                    d.each(b, function (b, d) {
                        f.append("<li>" + a.display(d, b) + ' <button class="' + c.classes.form.button + ' remove" data-idx="' + b + '">&times;</button></li>')
                    })
                } else e.append("<span>" + (a.noFileText || "No files") + "</span>")
            }
            a._input.find("input").triggerHandler("upload.editor", [a._val])
        },
        enable: function (a) {
            a._input.find("input").prop("disabled", false);
            a._enabled = true
        },
        disable: function (a) {
            a._input.find("input").prop("disabled", true);
            a._enabled = false
        }
    });
    t.ext.editorFields && d.extend(f.fieldTypes, t.ext.editorFields);
    t.ext.editorFields = f.fieldTypes;
    f.files = {};
    f.prototype.CLASS = "Editor";
    f.version = "1.5.5-dev";
    return f
});