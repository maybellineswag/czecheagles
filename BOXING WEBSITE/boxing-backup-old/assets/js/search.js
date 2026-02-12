google.maps.__gjsload__('search', function(_) {
    var Mua = function() {},
        aB = function(a) {
            this.setValues(a);
            _.rj("search_impl")
        },
        Oua = function(a) {
            let b = _.Rl,
                c = -1;
            a.tiles.forEach(e => {
                e.zoom > c && (b = e.mi, c = e.zoom)
            });
            if (c === -1)
                return [];
            const d = [];
            a.Mu().forEach(e => {
                e.a && e.a.length >= 2 && d.push(new Nua(e, b, c))
            });
            return d
        },
        Pua = function(a) {
            const b = [];
            a.data.forEach(c => {
                b.push(...Oua(c))
            });
            return b
        };
    _.Ja(Mua, _.Qk);
    var Qua = {
            ["1"]: {}
        },
        Nua = class {
            constructor(a, b, c)
            {
                this.pn = b;
                this.zoom = c;
                this.bounds = this.anchor = null;
                this.Eg = Qua;
                this.source = a;
                this.featureId = this.source.id || "0";
                this.infoWindowOffset = (this.source.io || []).length === 2 ? new google.maps.Point(this.source.io[0], this.source.io[1]) : null
            }
            getAnchor()
            {
                if (!this.anchor) {
                    const a = 1 << this.zoom;
                    this.anchor = _.rm(new _.Dm((this.pn.x * 256 + this.source.a[0]) / a, (this.pn.y * 256 + this.source.a[1]) / a)).toJSON()
                }
                return this.anchor
            }
            getCompleteBounds()
            {
                return this.getBounds().reduce((a,
                b) => {
                    a.extendByBounds(b);
                    return a
                }, _.vm(0, 0, 0, 0))
            }
            getBounds()
            {
                if (this.bounds === null) {
                    this.bounds = [];
                    const a = this.source.bb || [];
                    if (a.length % 4 === 0)
                        for (let b = 0; b < a.length; b += 4) {
                            const c = this.bounds[this.bounds.length - 1],
                                d = _.vm(a[b], a[b + 1], a[b + 2], a[b + 3]);
                            c && c.equals(d) || this.bounds.push(d)
                        }
                }
                return [...this.bounds]
            }
            getExtendedContent(a)
            {
                if (this.Eg === Qua)
                    try {
                        this.Eg = this.source.c ? JSON.parse(this.source.c) : {}
                    } catch (b) {
                        this.Eg = {}
                    }
                return this.Eg[a] ?? {}
            }
            getFeatureName()
            {
                return this.getExtendedContent("1")?.title ??
                    null
            }
            isTransitStation()
            {
                return this.getExtendedContent("1")?.is_transit_station ?? !1
            }
        }
        ;
    var Rua = new WeakSet;
    _.Ja(aB, Mua);
    aB.prototype.changed = function() {
        const a = this;
        var b = this.get("map");
        let c = null;
        b && (c = b.__gm, b = c.get("blockingLayerCount") || 0, c.set("blockingLayerCount", b + 1), c.set("disableLabelingHysteresis", this.get("disableLabelingHysteresis")), c.set("tilePrefetchEnabled", this.get("tilePrefetchEnabled")));
        _.rj("search_impl").then(d => {
            d.DG(a);
            c && (d = c.get("blockingLayerCount") || 0, c.set("blockingLayerCount", d - 1))
        })
    };
    aB.enableFeatureMapEventsRasterOnly = function(a) {
        if (_.gn[15]) {
            var b = a.__gm.Xg;
            if (!Rua.has(a)) {
                Rua.add(a);
                var c = [],
                    d = (f, g) => {
                        f = Oua(f);
                        f.length && _.Nk(a, g, f)
                    },
                    e = () => {
                        for (; c.length > 0;)
                            c.pop().remove();
                        b.forEach(f => {
                            if (f = f.data)
                                c.push(_.Bk(f, "insert", g => d(g, "addfeatures"))),
                                c.push(_.Bk(f, "remove", g => d(g, "removefeatures")))
                        })
                    };
                b.addListener("insert_at", e);
                b.addListener("remove_at", e);
                b.addListener("set_at", e);
                e()
            }
            (() => {
                const f = [];
                b.forEach(g => {
                    f.push(...Pua(g))
                });
                f.length && _.Nk(a, "addfeatures", f)
            })()
        }
    };
    _.Ha("module$contents$mapsapi$onionLayers$search$googleLayer_GoogleLayer.enableFeatureMapEventsRasterOnly", aB.enableFeatureMapEventsRasterOnly);
    _.tl(aB.prototype, {
        map: _.lp
    });
    _.ra.google.maps.search = {
        GoogleLayer: aB
    };
    _.sj("search", {});
});
