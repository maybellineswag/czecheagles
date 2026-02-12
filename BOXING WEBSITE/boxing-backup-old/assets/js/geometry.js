google.maps.__gjsload__('geometry', function(_) {
    var ora = function(a, b) {
            return Math.abs(_.Ej(b - a, -180, 180))
        },
        pra = function(a, b, c, d, e) {
            if (!d) {
                c = ora(a.lng(), c) / ora(a.lng(), b.lng());
                if (!e)
                    return e = Math.sin(_.ej(a.lat())), e = Math.log((1 + e) / (1 - e)) / 2, b = Math.sin(_.ej(b.lat())), _.fj(2 * Math.atan(Math.exp(e + c * (Math.log((1 + b) / (1 - b)) / 2 - e))) - Math.PI / 2);
                a = e.fromLatLngToPoint(a);
                b = e.fromLatLngToPoint(b);
                return e.fromPointToLatLng(new _.Dl(a.x + c * (b.x - a.x), a.y + c * (b.y - a.y))).lat()
            }
            e = _.ej(a.lat());
            a = _.ej(a.lng());
            d = _.ej(b.lat());
            b = _.ej(b.lng());
            c = _.ej(c);
            return _.Ej(_.fj(Math.atan2(Math.sin(e) *
            Math.cos(d) * Math.sin(c - b) - Math.sin(d) * Math.cos(e) * Math.sin(c - a), Math.cos(e) * Math.cos(d) * Math.sin(a - b))), -90, 90)
        },
        qra = function(a, b) {
            a = new _.nk(a, !1);
            b = new _.nk(b, !1);
            return a.equals(b)
        },
        rra = function(a, b, c) {
            a = _.rk(a);
            c = c || 1E-9;
            const d = _.Ej(a.lng(), -180, 180),
                e = b instanceof _.Vn,
                f = !!b.get("geodesic"),
                g = b.get("latLngs");
            b = b.get("map");
            b = !f && b ? b.getProjection() : null;
            for (let t = 0, v = g.getLength(); t < v; ++t) {
                const w = g.getAt(t),
                    y = w.getLength(),
                    z = e ? y : y - 1;
                for (let B = 0; B < z; ++B) {
                    var h = w.getAt(B);
                    const D = w.getAt((B +
                    1) % y);
                    if (qra(h, a) || qra(D, a))
                        return !0;
                    var k = _.Ej(h.lng(), -180, 180),
                        m = _.Ej(D.lng(), -180, 180);
                    const H = Math.max(k, m),
                        J = Math.min(k, m);
                    if (k = Math.abs(_.Ej(k - m, -180, 180)) <= 1E-9 && (Math.abs(_.Ej(k - d, -180, 180)) <= c || Math.abs(_.Ej(m - d, -180, 180)) <= c)) {
                        k = a.lat();
                        m = Math.min(h.lat(), D.lat()) - c;
                        var p = Math.max(h.lat(), D.lat()) + c;
                        k = k >= m && k <= p
                    }
                    if (k)
                        return !0;
                    if (H - J > 180 ? d + c >= H || d - c <= J : d + c >= J && d - c <= H)
                        if (h = pra(h, D, d, f, b), Math.abs(h - a.lat()) < c)
                            return !0
                }
            }
            return !1
        },
        tra = function(a, b) {
            const c = [];
            let d = [0, 0],
                e;
            for (let f = 0, g = _.Aj(a); f <
            g; ++f)
                e = b ? b(a[f]) : [a[f].lat(), a[f].lng()],
                sra(e[0] - d[0], c),
                sra(e[1] - d[1], c),
                d = e;
            return c.join("")
        },
        sra = function(a, b) {
            for (a = a < 0 ? ~(a << 1) : a << 1; a >= 32;)
                b.push(String.fromCharCode((32 | a & 31) + 63)),
                a >>= 5;
            b.push(String.fromCharCode(a + 63))
        },
        jz = class {}
        ;
    jz.isLocationOnEdge = rra;
    jz.containsLocation = function(a, b) {
        a = _.rk(a);
        const c = _.Ej(a.lng(), -180, 180),
            d = !!b.get("geodesic"),
            e = b.get("latLngs");
        var f = b.get("map");
        f = !d && f ? f.getProjection() : null;
        let g = !1;
        for (let k = 0, m = e.getLength(); k < m; ++k) {
            const p = e.getAt(k);
            for (let t = 0, v = p.getLength(); t < v; ++t) {
                const w = p.getAt(t),
                    y = p.getAt((t + 1) % v);
                var h = _.Ej(w.lng(), -180, 180);
                const z = _.Ej(y.lng(), -180, 180),
                    B = Math.max(h, z);
                h = Math.min(h, z);
                (B - h > 180 ? c >= B || c < h : c < B && c >= h) && pra(w, y, c, d, f) < a.lat() && (g = !g)
            }
        }
        return g || rra(a, b)
    };
    var kz = class {}
    ;
    kz.encodePath = function(a) {
        a instanceof _.tm && (a = a.getArray());
        a = (0, _.Vk)(a);
        return tra(a, function(b) {
            return [Math.round(b.lat() * 1E5), Math.round(b.lng() * 1E5)]
        })
    };
    kz.decodePath = function(a) {
        const b = _.Aj(a),
            c = Array(Math.floor(a.length / 2));
        let d = 0,
            e = 0,
            f = 0,
            g;
        for (g = 0; d < b; ++g) {
            let h = 1,
                k = 0,
                m;
            do m = a.charCodeAt(d++) - 63 - 1,
            h += m << k,
            k += 5;
            while (m >= 31);
            e += h & 1 ? ~(h >> 1) : h >> 1;
            h = 1;
            k = 0;
            do m = a.charCodeAt(d++) - 63 - 1,
            h += m << k,
            k += 5;
            while (m >= 31);
            f += h & 1 ? ~(h >> 1) : h >> 1;
            c[g] = new _.nk(e * 1E-5, f * 1E-5, !0)
        }
        c.length = g;
        return c
    };
    var ura = {
        encoding: kz,
        spherical: _.jq,
        poly: jz
    };
    _.ra.google.maps.geometry = ura;
    _.sj("geometry", ura);
});
