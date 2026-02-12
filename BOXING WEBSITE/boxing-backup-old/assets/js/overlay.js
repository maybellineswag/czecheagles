google.maps.__gjsload__('overlay', function(_) {
    var qya = function() {},
        HB = function(a) {
            a.MA = a.MA || new qya;
            return a.MA
        },
        rya = function(a) {
            this.Eg = new _.Um(() => {
                const b = a.MA;
                if (a.getPanes()) {
                    if (a.getProjection()) {
                        if (!b.Hg && a.onAdd)
                            a.onAdd();
                        b.Hg = !0;
                        a.draw()
                    }
                } else {
                    if (b.Hg)
                        if (a.onRemove)
                            a.onRemove();
                        else
                            a.remove();
                    b.Hg = !1
                }
            }, 0)
        },
        tya = function(a, b) {
            const c = HB(a);
            let d = c.Fg;
            d || (d = c.Fg = new rya(a));
            _.gc(c.Eg || [], _.Dk);
            var e = c.Ig = c.Ig || new _.mra;
            const f = b.__gm;
            e.bindTo("zoom", f);
            e.bindTo("offset", f);
            e.bindTo("center", f, "projectionCenterQ");
            e.bindTo("projection",
            b);
            e.bindTo("projectionTopLeft", f);
            e = c.Kg = c.Kg || new sya(e);
            e.bindTo("zoom", f);
            e.bindTo("offset", f);
            e.bindTo("projection", b);
            e.bindTo("projectionTopLeft", f);
            a.bindTo("projection", e, "outProjection");
            a.bindTo("panes", f);
            e = () => _.Vm(d.Eg);
            c.Eg = [_.Bk(a, "panes_changed", e), _.Bk(f, "zoom_changed", e), _.Bk(f, "offset_changed", e), _.Bk(b, "projection_changed", e), _.Bk(f, "projectioncenterq_changed", e)];
            _.Vm(d.Eg);
            b instanceof _.il ? (_.xl(b, "Ox"), _.M(b, 148440)) : b instanceof _.Ol && (_.xl(b, "Oxs"), _.M(b, 181451))
        },
        uya = function(a) {
            const b =
            HB(a);
            var c = b.Ig;
            c && c.unbindAll();
            (c = b.Kg) && c.unbindAll();
            a.unbindAll();
            a.set("panes", null);
            a.set("projection", null);
            b.Eg && b.Eg.forEach(d => {
                _.Dk(d)
            });
            b.Eg = null;
            b.Fg && (_.Wm(b.Fg.Eg), b.Fg = null)
        },
        zya = function(a) {
            if (a) {
                var b = a.getMap();
                if (vya(a) !== b && b && b instanceof _.il) {
                    const c = b.__gm;
                    c.overlayLayer ? a.__gmop = new wya(b, a, c.overlayLayer) : c.Fg.then(({ah: d}) => {
                        const e = new xya(b, d);
                        d.Ii(e);
                        c.overlayLayer = e;
                        yya(a);
                        zya(a)
                    })
                }
            }
        },
        yya = function(a) {
            if (a) {
                var b = a.__gmop;
                b && (a.__gmop = null, b.Eg.unbindAll(), b.Eg.set("panes",
                null), b.Eg.set("projection", null), b.Hg.Tl(b), b.Fg && (b.Fg = !1, b.Eg.onRemove ? b.Eg.onRemove() : b.Eg.remove()))
            }
        },
        vya = function(a) {
            return (a = a.__gmop) ? a.map : null
        },
        Aya = function(a, b) {
            a.Eg.get("projection") != b && (a.Eg.bindTo("panes", a.map.__gm), a.Eg.set("projection", b))
        },
        sya = class  extends _.Qk{
            constructor(a)
            {
                super();
                this.projection = a
            }
            changed(a)
            {
                a !== "outProjection" && (a = !!(this.get("offset") && this.get("projectionTopLeft") && this.get("projection") && _.Gj(this.get("zoom"))), a === !this.get("outProjection") && this.set("outProjection",
                a ? this.projection : null))
            }
        }
        ;
    var IB = {};
    _.Ja(rya, _.Qk);
    IB.Xl = function(a) {
        if (a) {
            var b = a.getMap();
            (HB(a).Jg || null) !== b && (b && tya(a, b), HB(a).Jg = b)
        }
    };
    IB.Tl = function(a) {
        uya(a);
        delete HB(a).Jg
    };
    IB.iN = qya;
    var JB = {},
        wya = class {
            constructor(a, b, c)
            {
                this.map = a;
                this.Eg = b;
                this.Hg = c;
                this.Fg = !1;
                _.xl(this.map, "Ox");
                _.M(this.map, 148440);
                c.Xl(this)
            }
            draw()
            {
                this.Fg || (this.Fg = !0, this.Eg.onAdd && this.Eg.onAdd());
                this.Eg.draw && this.Eg.draw()
            }
        }
        ,
        xya = class {
            constructor(a, b)
            {
                this.Ig = a;
                this.Hg = b;
                this.Eg = null;
                this.Fg = []
            }
            dispose() {}
            Wh(a, b, c, d, e, f, g, h)
            {
                const k = this.Eg = this.Eg || new _.oy(this.Ig, this.Hg, () => {});
                k.Wh(a, b, c, d, e, f, g, h);
                for (const m of this.Fg)
                    Aya(m, k),
                    m.draw()
            }
            Xl(a)
            {
                this.Fg.push(a);
                this.Eg && Aya(a, this.Eg);
                this.Hg.refresh()
            }
            Tl(a)
            {
                _.mc(this.Fg,
                a)
            }
        }
        ;
    JB.Xl = zya;
    JB.Tl = yya;
    _.sj("overlay", {
        vC: function(a) {
            if (a) {
                (0, IB.Tl)(a);
                (0, JB.Tl)(a);
                var b = a.getMap();
                b && (b instanceof _.il ? (0, JB.Xl)(a) : (0, IB.Xl)(a))
            }
        },
        preventMapHitsFrom: a => {
            _.lu(a, {
                Ql: ({event: b}) => {
                    _.ls(b.Eg)
                },
                lk: b => _.Xt(b),
                Iq: b => _.Yt(b),
                tl: b => _.Yt(b),
                Fk: b => _.Zt(b)
            }).ss(!0)
        },
        preventMapHitsAndGesturesFrom: a => {
            a.addEventListener("click", _.zk);
            a.addEventListener("contextmenu", _.zk);
            a.addEventListener("dblclick", _.zk);
            a.addEventListener("mousedown", _.zk);
            a.addEventListener("mousemove", _.zk);
            a.addEventListener("MSPointerDown",
            _.zk);
            a.addEventListener("pointerdown", _.zk);
            a.addEventListener("touchstart", _.zk);
            a.addEventListener("wheel", _.zk)
        }
    });
});
