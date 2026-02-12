google.maps.__gjsload__('search_impl', function(_) {
    var nAb = function(a, b) {
            _.Xi(a.Gg, 1, b)
        },
        oAb = function(a, b) {
            _.Xi(a.Gg, 3, b)
        },
        qAb = function(a) {
            if (_.gn[15]) {
                var b = a.Pl;
                const c = a.Pl = a.getMap();
                b && a.Eg && (a.Hg ? (b = b.__gm.ik, b.set(b.get().Wn(a.Eg))) : a.Eg && _.$_a(a.Eg, b) && ((a.Fg || []).forEach(_.Dk), a.Fg = null));
                if (c) {
                    b = new _.Vw;
                    const d = a.get("layerId").split("|");
                    b.layerId = d[0];
                    for (let e = 1; e < d.length; ++e) {
                        const [f, ...g] = d[e].split(":");
                        b.parameters[f] = g.join(":")
                    }
                    a.get("spotlightDescription") && (b.spotlightDescription = new _.$v(a.get("spotlightDescription")));
                    a.get("paintExperimentIds") &&
                    (b.paintExperimentIds = a.get("paintExperimentIds").slice(0));
                    a.get("styler") && (b.styler = new _.Pv(a.get("styler")));
                    a.get("roadmapStyler") && (b.roadmapStyler = new _.Pv(a.get("roadmapStyler")));
                    a.get("travelMapRequest") && (b.travelMapRequest = new _.Jqa(a.get("travelMapRequest")));
                    a.get("mapsApiLayer") && (b.mapsApiLayer = new _.aw(a.get("mapsApiLayer")));
                    a.get("mapFeatures") && (b.mapFeatures = a.get("mapFeatures"));
                    a.get("clickableCities") && (b.clickableCities = a.get("clickableCities"));
                    a.get("searchPipeMetadata") &&
                    (b.searchPipeMetadata = new _.Px(a.get("searchPipeMetadata")));
                    a.get("gmmContextPipeMetadata") && (b.gmmContextPipeMetadata = new _.Eoa(a.get("gmmContextPipeMetadata")));
                    a.get("overlayLayer") && (b.overlayLayer = new _.bw(a.get("overlayLayer")));
                    a.get("caseExperimentIds") && (b.caseExperimentIds = a.get("caseExperimentIds").slice(0));
                    a.get("boostMapExperimentIds") && (b.boostMapExperimentIds = a.get("boostMapExperimentIds").slice(0));
                    a.get("airQualityPipeMetadata") && (b.airQualityPipeMetadata = new _.qqa(a.get("airQualityPipeMetadata")));
                    a.get("directionsPipeParameters") && (b.directionsPipeParameters = new _.oqa(a.get("directionsPipeParameters")));
                    a.get("clientSignalPipeMetadata") && (b.clientSignalPipeMetadata = new _.loa(a.get("clientSignalPipeMetadata")));
                    b.darkLaunch = !!a.get("darkLaunch");
                    a.Eg = b;
                    a.Hg = a.get("renderOnBaseMap");
                    a.Hg ? (a = c.__gm.ik, a.set(_.pr(a.get(), b))) : pAb(a, c, b);
                    _.xl(c, "Lg");
                    _.M(c, 148282)
                }
            }
        },
        pAb = function(a, b, c) {
            var d = new rAb;
            d = _.yG(d);
            c.Hg = d.load.bind(d);
            c.clickable = a.get("clickable") !== !1;
            _.y_a(c, _.kQ(b));
            b = [];
            b.push(_.Bk(c,
            "click", sAb.bind(null, a)));
            for (const e of ["mouseover", "mouseout", "mousemove"])
                b.push(_.Bk(c, e, tAb.bind(null, a, e)));
            b.push(_.Bk(a, "clickable_changed", () => {
                a.Eg.clickable = a.get("clickable") !== !1
            }));
            a.Fg = b
        },
        sAb = function(a, b, c, d, e) {
            let f = null;
            if (e && (f = {
                status: e.getStatus()
            }, e.getStatus() === 0)) {
                f.location = _.Y(e.Gg, 2) ? new _.nk(_.Vs(_.I(e.Gg, 2, _.at).Gg, 1), _.Vs(_.I(e.Gg, 2, _.at).Gg, 2)) : null;
                const g = {};
                f.fields = g;
                const h = _.Ai(e.Gg, 3);
                for (let k = 0; k < h; ++k) {
                    const m = _.$q(e.Gg, 3, _.uQ, k);
                    g[m.getKey()] = m.getValue()
                }
            }
            _.Nk(a,
            "click", b, c, d, f)
        },
        tAb = function(a, b, c, d, e, f, g) {
            let h = null;
            f && (h = {
                title: f[1].title,
                snippet: f[1].snippet
            });
            _.Nk(a, b, c, d, e, h, g)
        },
        uAb = class {}
        ,
        vAb = class  extends _.V{
            constructor()
            {
                super()
            }
            gj()
            {
                return _.L(this.Gg, 2)
            }
        }
        ,
        wAb = [_.N, , , _.Uo, _.P0a];
    var xAb = class  extends _.V{
        constructor(a)
        {
            super(a)
        }
        getStatus()
        {
            return _.G(this.Gg, 1, -1)
        }
        getLocation()
        {
            return _.Mi(this.Gg, 2, _.at)
        }
    }
    ;
    var rAb = class {
        constructor()
        {
            var a = _.po,
                b = _.oo;
            this.Eg = _.Yi;
            this.fetch = _.nx.bind(uAb, a, _.jy + "/maps/api/js/LayersService.GetFeature", b)
        }
        load(a, b)
        {
            function c(e) {
                b(new xAb(e))
            }
            const d = new vAb;
            nAb(d, a.layerId.split("|")[0]);
            _.Xi(d.Gg, 2, a.featureId);
            oAb(d, this.Eg.Eg().Eg());
            for (const e in a.parameters) {
                const f = _.Ti(d.Gg, 4, _.uQ);
                _.Xi(f.Gg, 1, e);
                _.Xi(f.Gg, 2, a.parameters[e])
            }
            a = _.tn(d, wAb);
            this.fetch(a, c, c);
            return a
        }
        cancel()
        {
            throw Error("Not implemented");
        }
    }
    ;
    var yAb = class {
        constructor()
        {
            this.DG = qAb
        }
    }
    ;
    _.sj("search_impl", new yAb);
});
