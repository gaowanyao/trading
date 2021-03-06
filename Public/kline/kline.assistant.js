function Kline() {}
Kline.prototype = {
    browerState: 0,
    klineWebsocket: null ,
    klineTradeInit: false,
    tradeDate: new Date(),
    tradesLimit: 100,
    lastDepth: null ,
    depthShowSize: 15,
    priceDecimalDigits: 6,
    amountDecimalDigits: 4,
    symbol: null ,
    curPrice: null ,
    title: "",
    reset: function(a) {
        this.refreshUrl(a);
        $("#markettop li a").removeClass("selected");
        $("#markettop li." + a + " a").addClass("selected");
        this.symbol = a;
        this.lastDepth = null ;
        this.curPrice = null ;
        this.klineTradeInit = false;
        $("#trades .trades_list").empty();
        $("#gasks .table").empty();
        $("#gbids .table").empty();
        $("#asks .table").empty();
        $("#bids .table").empty();
        this.websocketRedister(a)
    },
    setTitle: function() {

        // 页面标题
        // document.title = (this.curPrice == null  ? "" : this.curPrice + "") + this.title;
        document.title = (this.curPrice == null  ? "Market" : this.curPrice + "") ;
        // setMate(this.title)
    },
    dateFormatTf: function(a) {
        return (a < 10 ? "0" : "") + a
    },
    dateFormat: function(a) {
        return a.getFullYear() + "-" + this.dateFormatTf(a.getMonth() + 1) + "-" + this.dateFormatTf(a.getDate()) + " " + this.dateFormatTf(a.getHours()) + ":" + this.dateFormatTf(a.getMinutes()) + ":" + this.dateFormatTf(a.getSeconds())
    },
    dateInit: function(b) {
        var a = new Date();
        if (b) {
            a.setTime(b)
        }
        $(".m_rightbot").text(this.dateFormat(a));
        var c = this;
        setInterval(function() {
            a.setTime(a.getTime() + 1000);
            $(".m_rightbot").text(c.dateFormat(a))
        }, 1000)
    },
    websocketRedister: function(symbol) {
        var $this = this;
        $.get('/Home/Orders/depth?coin=' + symbol + '&v=' + Math.random(), function(result) {
                // $.get('/market/depths?depth=' + symbol + '&v=' + Math.random(), function(result) {


            // result = {"asks":[[94.50000000, 123.53900000],[94.46000000, 2.00000000],[94.30000000, 17.00000000],[94.23000000, 13.17000000],[94.20000000, 10.00000000],[94.00000000, 101.00000000],[93.58000000, 8.00000000],[93.50000000, 19.26000000],[93.45000000, 3.00000000],[93.33000000, 50.00000000],[93.21000000, 15.02000000],[93.00000000, 349.98000000],[92.25000000, 23.00000000],[92.20000000, 50.00000000],[92.00000000, 135.89000000],[91.88000000, 1.35000000],[91.69000000, 11.02000000],[91.60000000, 5.00000000],[91.52000000, 38.00000000],[91.00000000, 42.00000000],[90.90000000, 160.00000000],[90.30000000, 172.00000000],[90.08000000, 10.00000000],[90.00000000, 1183.61810000],[89.99000000, 63.38140000],[89.98000000, 10.00000000],[89.80000000, 6.24000000],[89.77000000, 108.36400000],[89.70000000, 100.32000000],[89.68000000, 100.00000000],[89.15000000, 10.00000000],[89.01000000, 99.72000000],[89.00000000, 1139.29730000],[88.88000000, 121.00000000],[88.82000000, 2.99000000],[88.60000000, 130.84000000],[88.35000000, 20.00000000],[88.23000000, 10.00000000],[88.14000000, 80.47000000],[88.00000000, 706.17290000],[87.99000000, 25.00000000],[87.90000000, 128.00000000],[87.69000000, 10.00000000],[87.45000000, 36.10000000],[87.33000000, 10.00000000],[87.00000000, 196.65880000],[86.60000000, 100.00000000],[86.48000000, 10.00000000],[86.20000000, 10.00000000],[86.00000000, 651.87000000],[85.88000000, 19.13000000],[85.80000000, 504.00000000],[85.66000000, 100.00000000],[85.60000000, 56.20000000],[85.55000000, 1.00000000],[85.33000000, 10.00000000],[85.00000000, 1551.03270000],[84.90000000, 108.00000000],[84.88000000, 4.14000000],[84.80000000, 4.00000000],[84.50000000, 797.99000000],[84.40000000, 86.00000000],[84.30000000, 9.65000000],[84.25000000, 20.00000000],[84.20000000, 69.53010000],[84.00000000, 233.02760000],[83.52000000, 50.00000000],[83.33000000, 10.00000000],[83.00000000, 532.27000000],[82.99000000, 14.38810000],[82.98000000, 259.68000000],[82.94000000, 99.80100000],[82.80000000, 15.08790000],[82.79000000, 53.23000000],[82.50000000, 40.00000000],[82.45000000, 26.87000000],[82.00000000, 205.70000000],[81.88000000, 1.00000000],[81.86000000, 13.39640000],[81.79000000, 1.00000000],[81.75000000, 4.00000000],[81.70000000, 1.00000000],[81.60000000, 70.00000000],[81.30000000, 155.92720000],[81.00000000, 330.00000000],[80.99000000, 180.00000000],[80.80000000, 100.00000000],[80.66000000, 10.76090000],[80.50000000, 111.79480000],[80.40000000, 100.00000000],[80.00000000, 279.79460000],[79.98000000, 20.00000000],[79.50000000, 129.50000000],[79.40000000, 100.00000000],[79.22000000, 20.00000000],[79.00000000, 78.55000000],[78.99000000, 10.00000000],[78.39000000, 22.90000000],[78.02000000, 29.96000000],[78.00000000, 10.00000000]],"bids":[[77.99000000, 100.60000000],[77.54000000, 5.20410000],[77.53000000, 10.00000000],[77.52000000, 20.00000000],[77.51000000, 18.09000000],[77.50000000, 365.47790000],[77.10000000, 201.00000000],[77.05000000, 353.79000000],[77.00000000, 44.50000000],[76.80000000, 123.43000000],[76.68000000, 10.00000000],[76.59000000, 50.00000000],[76.50000000, 107.48000000],[76.01000000, 107.50000000],[76.00000000, 189.27000000],[75.60000000, 89.85000000],[75.56000000, 20.00000000],[75.50000000, 7.00000000],[75.30000000, 60.00000000],[75.11000000, 100.00000000],[75.10000000, 100.00000000],[75.01000000, 20.00000000],[75.00000000, 1718.44770000],[74.80000000, 50.00000000],[74.59000000, 269.16760000],[74.12000000, 10.00000000],[74.01000000, 21.03220000],[74.00000000, 106.13000000],[73.88000000, 10.00000000],[73.81000000, 50.00000000],[73.60000000, 70.84000000],[73.55000000, 20.00000000],[73.50000000, 207.93000000],[73.45000000, 30.00000000],[73.38000000, 146.52000000],[73.33000000, 50.00000000],[73.12000000, 16.42500000],[73.00000000, 538.69000000],[72.99000000, 30.00000000],[72.96000000, 50.00000000],[72.88000000, 150.00000000],[72.61000000, 60.00000000],[72.50000000, 13.00000000],[72.36000000, 20.00000000],[72.00000000, 938.81000000],[71.96000000, 50.00000000],[71.90000000, 1195.94660000],[71.88000000, 150.00000000],[71.56000000, 20.00000000],[71.50000000, 440.00000000],[71.30000000, 28.53000000],[71.10000000, 100.00000000],[71.01000000, 2.00000000],[71.00000000, 571.39400000],[70.50000000, 65.00000000],[70.29000000, 20.00000000],[70.23000000, 60.00000000],[70.20000000, 70.38000000],[70.19000000, 56.99000000],[70.10000000, 45.00000000],[70.01000000, 10.00000000],[70.00000000, 1249.74700000],[69.80000000, 30.00000000],[69.50000000, 0.76130000],[69.00000000, 14.63000000],[68.85000000, 7.53720000],[68.50000000, 216.65000000],[68.10000000, 9.48000000],[68.00000000, 1321.90000000],[67.80000000, 10.00000000],[67.50000000, 65.00000000],[67.01000000, 10.00000000],[67.00000000, 324.59390000],[66.88000000, 3.00000000],[66.66000000, 100.00000000],[66.58000000, 60.00000000],[66.20000000, 152.00000000],[66.18000000, 42.05000000],[66.01000000, 155.00000000],[66.00000000, 781.86000000],[65.80000000, 56.26100000],[65.70000000, 2.76000000],[65.66000000, 157.39000000],[65.62000000, 11.64000000],[65.58000000, 156.00000000],[65.52000000, 156.00000000],[65.50000000, 5.00000000],[65.05000000, 555.00000000],[65.01000000, 10.00000000],[65.00000000, 814.91470000],[64.50000000, 178.12000000],[64.20000000, 356.24000000],[64.00000000, 47.00000000],[63.82000000, 29.86800000],[63.20000000, 376.64270000],[63.01000000, 7.00000000],[63.00000000, 7.00000000],[62.80000000, 10.00000000],[62.00000000, 3.00000000],[61.80000000, 810.52000000]],"date":1503287741}

            console.log(result);
		      $this.updateDepth(result);
		});

        setInterval(function() {
            $.get('/Home/Orders/depth?coin=' + symbol + '&v=' + Math.random(), function(result) {
                // $.get('/market/depths?depth=' + symbol + '&v=' + Math.random(), function(result) {

                // console.log(result);
                // result = {"asks":[[94.50000000, 123.53900000],[94.46000000, 2.00000000],[94.30000000, 17.00000000],[94.23000000, 13.17000000],[94.20000000, 10.00000000],[94.00000000, 101.00000000],[93.58000000, 8.00000000],[93.50000000, 19.26000000],[93.45000000, 3.00000000],[93.33000000, 50.00000000],[93.21000000, 15.02000000],[93.00000000, 349.98000000],[92.25000000, 23.00000000],[92.20000000, 50.00000000],[92.00000000, 135.89000000],[91.88000000, 1.35000000],[91.69000000, 11.02000000],[91.60000000, 5.00000000],[91.52000000, 38.00000000],[91.00000000, 42.00000000],[90.90000000, 160.00000000],[90.30000000, 172.00000000],[90.08000000, 10.00000000],[90.00000000, 1183.61810000],[89.99000000, 63.38140000],[89.98000000, 10.00000000],[89.80000000, 6.24000000],[89.77000000, 108.36400000],[89.70000000, 100.32000000],[89.68000000, 100.00000000],[89.15000000, 10.00000000],[89.01000000, 99.72000000],[89.00000000, 1139.29730000],[88.88000000, 121.00000000],[88.82000000, 2.99000000],[88.60000000, 130.84000000],[88.35000000, 20.00000000],[88.23000000, 10.00000000],[88.14000000, 80.47000000],[88.00000000, 706.17290000],[87.99000000, 25.00000000],[87.90000000, 128.00000000],[87.69000000, 10.00000000],[87.45000000, 36.10000000],[87.33000000, 10.00000000],[87.00000000, 196.65880000],[86.60000000, 100.00000000],[86.48000000, 10.00000000],[86.20000000, 10.00000000],[86.00000000, 651.87000000],[85.88000000, 19.13000000],[85.80000000, 504.00000000],[85.66000000, 100.00000000],[85.60000000, 56.20000000],[85.55000000, 1.00000000],[85.33000000, 10.00000000],[85.00000000, 1551.03270000],[84.90000000, 108.00000000],[84.88000000, 4.14000000],[84.80000000, 4.00000000],[84.50000000, 797.99000000],[84.40000000, 86.00000000],[84.30000000, 9.65000000],[84.25000000, 20.00000000],[84.20000000, 69.53010000],[84.00000000, 233.02760000],[83.52000000, 50.00000000],[83.33000000, 10.00000000],[83.00000000, 532.27000000],[82.99000000, 14.38810000],[82.98000000, 259.68000000],[82.94000000, 99.80100000],[82.80000000, 15.08790000],[82.79000000, 53.23000000],[82.50000000, 40.00000000],[82.45000000, 26.87000000],[82.00000000, 205.70000000],[81.88000000, 1.00000000],[81.86000000, 13.39640000],[81.79000000, 1.00000000],[81.75000000, 4.00000000],[81.70000000, 1.00000000],[81.60000000, 70.00000000],[81.30000000, 155.92720000],[81.00000000, 330.00000000],[80.99000000, 180.00000000],[80.80000000, 100.00000000],[80.66000000, 10.76090000],[80.50000000, 111.79480000],[80.40000000, 100.00000000],[80.00000000, 279.79460000],[79.98000000, 20.00000000],[79.50000000, 129.50000000],[79.40000000, 100.00000000],[79.22000000, 20.00000000],[79.00000000, 78.55000000],[78.99000000, 10.00000000],[78.39000000, 22.90000000],[78.02000000, 29.96000000],[78.00000000, 10.00000000]],"bids":[[77.99000000, 100.60000000],[77.54000000, 5.20410000],[77.53000000, 10.00000000],[77.52000000, 20.00000000],[77.51000000, 18.09000000],[77.50000000, 365.47790000],[77.10000000, 201.00000000],[77.05000000, 353.79000000],[77.00000000, 44.50000000],[76.80000000, 123.43000000],[76.68000000, 10.00000000],[76.59000000, 50.00000000],[76.50000000, 107.48000000],[76.01000000, 107.50000000],[76.00000000, 189.27000000],[75.60000000, 89.85000000],[75.56000000, 20.00000000],[75.50000000, 7.00000000],[75.30000000, 60.00000000],[75.11000000, 100.00000000],[75.10000000, 100.00000000],[75.01000000, 20.00000000],[75.00000000, 1718.44770000],[74.80000000, 50.00000000],[74.59000000, 269.16760000],[74.12000000, 10.00000000],[74.01000000, 21.03220000],[74.00000000, 106.13000000],[73.88000000, 10.00000000],[73.81000000, 50.00000000],[73.60000000, 70.84000000],[73.55000000, 20.00000000],[73.50000000, 207.93000000],[73.45000000, 30.00000000],[73.38000000, 146.52000000],[73.33000000, 50.00000000],[73.12000000, 16.42500000],[73.00000000, 538.69000000],[72.99000000, 30.00000000],[72.96000000, 50.00000000],[72.88000000, 150.00000000],[72.61000000, 60.00000000],[72.50000000, 13.00000000],[72.36000000, 20.00000000],[72.00000000, 938.81000000],[71.96000000, 50.00000000],[71.90000000, 1195.94660000],[71.88000000, 150.00000000],[71.56000000, 20.00000000],[71.50000000, 440.00000000],[71.30000000, 28.53000000],[71.10000000, 100.00000000],[71.01000000, 2.00000000],[71.00000000, 571.39400000],[70.50000000, 65.00000000],[70.29000000, 20.00000000],[70.23000000, 60.00000000],[70.20000000, 70.38000000],[70.19000000, 56.99000000],[70.10000000, 45.00000000],[70.01000000, 10.00000000],[70.00000000, 1249.74700000],[69.80000000, 30.00000000],[69.50000000, 0.76130000],[69.00000000, 14.63000000],[68.85000000, 7.53720000],[68.50000000, 216.65000000],[68.10000000, 9.48000000],[68.00000000, 1321.90000000],[67.80000000, 10.00000000],[67.50000000, 65.00000000],[67.01000000, 10.00000000],[67.00000000, 324.59390000],[66.88000000, 3.00000000],[66.66000000, 100.00000000],[66.58000000, 60.00000000],[66.20000000, 152.00000000],[66.18000000, 42.05000000],[66.01000000, 155.00000000],[66.00000000, 781.86000000],[65.80000000, 56.26100000],[65.70000000, 2.76000000],[65.66000000, 157.39000000],[65.62000000, 11.64000000],[65.58000000, 156.00000000],[65.52000000, 156.00000000],[65.50000000, 5.00000000],[65.05000000, 555.00000000],[65.01000000, 10.00000000],[65.00000000, 814.91470000],[64.50000000, 178.12000000],[64.20000000, 356.24000000],[64.00000000, 47.00000000],[63.82000000, 29.86800000],[63.20000000, 376.64270000],[63.01000000, 7.00000000],[63.00000000, 7.00000000],[62.80000000, 10.00000000],[62.00000000, 3.00000000],[61.80000000, 810.52000000]],"date":1503287741}

                $this.updateDepth(result);
            });
        }, 30000);
		return false;
    },
    pushTrades: function(k) {
        var g = $("#trades .trades_list");
        var a = "";
        for (var d = 0; d < k.length; d++) {
            var l = k[d];
            if (d >= k.length - this.tradesLimit) {
                this.tradeDate.setTime(l.time * 1000);
                var b = this.dateFormatTf(this.tradeDate.getHours()) + ":" + this.dateFormatTf(this.tradeDate.getMinutes()) + ":" + this.dateFormatTf(this.tradeDate.getSeconds());
                var e = (l.amount + "").split(".");
                if (this.klineTradeInit) {
                    a = "<ul class='newul'><li class='tm'>" + b + "</li><li class='pr-" + (l.type == "buy" ? "green" : "red") + "'>" + l.price + "</li><li class='vl'>" + e[0] + "<g>" + (e.length > 1 ? "." + e[1] : "") + "</g></li></ul>" + a
                } else {
                    a = "<ul><li class='tm'>" + b + "</li><li class='pr-" + (l.type == "buy" ? "green" : "red") + "'>" + l.price + "</li><li class='vl'>" + e[0] + "<g>" + (e.length > 1 ? "." + e[1] : "") + "</g></li></ul>" + a
                }
            }
        }
        var c = 0;
        var h = this;
        if (this.klineTradeInit) {
            clearInterval(f);
            var f = setInterval(function() {
                var i = k[c];
                h.curPrice = (i.price).toFixed(2);
                h.setTitle();
                $("div#price").attr("class", i.type == "buy" ? "green" : "red").text(h.curPrice);
                c++;
                if (c >= k.length) {
                    clearInterval(f)
                }
            }, 100)
        } else {
            if (k.length > 0) {
                this.curPrice = k[k.length - 1].price.toFixed(2);
                this.setTitle();
                $("div#price").attr("class", k[k.length - 1].type == "buy" ? "green" : "red").text(this.curPrice)
            }
        }
        if (this.klineTradeInit) {
            g.prepend(a)
        } else {
            g.append(a)
        }
        a = null ;
        g.find("ul.newul").slideDown(1000, function() {
            $(this).removeClass("newul")
        });
        g.find("ul:gt(" + (this.tradesLimit - 1) + ")").remove()
    },
    updateDepth: function(e) {
        window._set_current_depth(e);
        if (!e) {
            return
        }
        console.log(e);



        $("#gasks .table").html(this.getgview(this.getgasks(e.asks)));
        $("#gbids .table").html(this.getgview(this.getgbids(e.bids)));
        if (this.lastDepth == null ) {
            this.lastDepth = {};
            this.lastDepth.asks = this.getAsks(e.asks, this.depthShowSize);
            this.depthInit(this.lastDepth.asks, $("#asks .table"));
            this.lastDepth.bids = this.getBids(e.bids, this.depthShowSize);
            this.depthInit(this.lastDepth.bids, $("#bids .table"))
        } else {
            var b = $("#asks .table");
            b.find("div.remove").remove();
            b.find("div.add").removeClass("add");
            var f = this.getAsks(e.asks, this.depthShowSize);
            var a = this.lastDepth.asks;
            this.lastDepth.asks = f;
            this.asksAndBids(f.slice(0), a, b);
            var d = $("#bids .table");
            d.find("div.remove").remove();
            d.find("div.add").removeClass("add");
            var g = this.getBids(e.bids, this.depthShowSize);
            var c = this.lastDepth.bids;
            this.lastDepth.bids = g;
            this.asksAndBids(g.slice(0), c, $("#bids .table"))
        }
    },
    depthInit: function(f, h) {
        h.empty();
        if (f && f.length > 0) {
            var g, b = "";
            for (var e = 0; e < f.length; e++) {
                var a = (f[e][0] + "").split(".");
                var d = this.getPrice(a, g);
                g = a[0];
                a = (f[e][1] + "").split(".");
                var c = this.getAmount(a);
                b += "<div class='row'><span class='price'>" + d[0] + "<g>" + d[1] + "</g></span> <span class='amount'>" + c[0] + "<g>" + c[1] + "</g></span></div>"
            }
            h.append(b);
            b = null
        }
    },
    asksAndBids: function(b, c, l) {
        for (var f = 0; f < c.length; f++) {
            var n = false;
            for (var d = 0; d < b.length; d++) {
                if (c[f][0] == b[d][0]) {
                    n = true;
                    if (c[f][1] != b[d][1]) {
                        var a = l.find("div:eq(" + f + ") .amount");
                        a.addClass(c[f][1] > b[d][1] ? "red" : "green");
                        var g = this.getAmount((b[d][1] + "").split("."));
                        setTimeout((function(j, i) {
                            return function() {
                                j.html(i[0] + "<g>" + i[1] + "</g>");
                                j.removeClass("red").removeClass("green");
                                j = null ;
                                i = null
                            }
                        })(a, g), 500)
                    }
                    b.splice(d, 1);
                    break
                }
            }
            if (!n) {
                l.find("div:eq(" + f + ")").addClass("remove");
                c[f][2] = -1
            }
        }
        for (var d = 0; d < c.length; d++) {
            for (var f = 0; f < b.length; f++) {
                if (b[f][0] > c[d][0]) {
                    var k = (b[f][1] + "").split(".");
                    var g = this.getAmount(k);
                    l.find("div:eq(" + d + ")").before("<div class='row add'><span class='price'></span> <span class='amount'>" + g[0] + "<g>" + g[1] + "</g></span></div>");
                    c.splice(d, 0, b[f]);
                    b.splice(f, 1);
                    break
                }
            }
        }
        var h = "";
        for (var f = 0; f < b.length; f++) {
            c.push(b[f]);
            var k = (b[f][1] + "").split(".");
            var g = this.getAmount(k);
            h += "<div class='row add'><span class='price'></span> <span class='amount'>" + g[0] + "<g>" + g[1] + "</g></span></div>"
        }
        if (h.length > 0) {
            l.append(h)
        }
        h = null ;
        var m;
        for (var f = 0; f < c.length; f++) {
            var o = l.find("div:eq(" + f + ")");
            if (!(c[f].length >= 3 && c[f][2] == -1)) {
                var k = (c[f][0] + "").split(".");
                var e = this.getPrice(k, m);
                m = k[0];
                o.find(".price").html(e[0] + "<g>" + e[1] + "</g>")
            }
        }
        b = null ;
        c = null ;
        l.find("div.add").slideDown(800);
        setTimeout((function(i, j) {
            return function() {
                i.slideUp(500, function() {
                    $(this).remove()
                });
                j.removeClass("add")
            }
        })(l.find("div.remove"), l.find("div.add")), 1000)
    },
    getAsks: function(b, a) {
        if (b.length > a) {
            b.splice(0, b.length - a)
        }
        return b
    },
    getBids: function(b, a) {
        if (b.length > a) {
            b.splice(a, b.length - 1)
        }
        return b
    },
    getgview: function(c) {
        var d = "";
        var e;
        for (var b = 0; b < c.length; b++) {
            var a = c[b][0].split(".");
            if (a.length == 1 || a[0] != e) {
                d += "<div class='row'><span class='price'>" + c[b][0] + "</span> <span class='amount'>" + c[b][1] + "</span></div>";
                e = a[0]
            } else {
                d += "<div class='row'><span class='price'><h>" + a[0] + ".</h>" + a[1] + "</span> <span class='amount'>" + c[b][1] + "</span></div>"
            }
        }
        return d
    },
    getgasks: function(j) {

        console.log(j);
        console.log(j);

        var k = j[j.length - 1][0];
        var e = j[0][0];
        var a = e - k;
        console.log(a);
        console.log(typeof (a));
        console.log(e);
        console.log(k);
        console.log(j.length);
        console.log(j.length);



        var d = this.getBlock(a, 100);

        console.log("223232");
        console.log(d);

        var b = Math.abs(Number(Math.log(d) / Math.log(10))).toFixed(0);
        if (a / d < 2) {
            d = d / 2;
            b++
        }
        if (d >= 1) {
            (b = 0)
        }
        k = parseInt(k / d) * d;
        e = parseInt(e / d) * d;
        var h = [];
        var g = 0;
        for (var f = j.length - 1; f >= 0; f--) {
            if (j[f][0] > k) {
                var c = parseInt(g, 10);
                if (c > 0) {
                    h.unshift([Number(k).toFixed(b), c])
                }
                if (k >= e) {
                    break
                }
                k += d
            }
            g += j[f][1]
        }
        return h
    },
    getgbids: function(j) {
        var k = j[j.length - 1][0];
        var e = j[0][0];
        var a = e - k;


        var d = this.getBlock(a, 100);
        var b = Math.abs(Number(Math.log(d) / Math.log(10))).toFixed(0);
        if (a / d < 2) {
            d = d / 2;
            b++
        }
        if (d >= 1) {
            (b = 0)
        }
        k = parseInt(k / d) * d;
        e = parseInt(e / d) * d;
        var h = [];
        var g = 0;
        for (var f = 0; f < j.length; f++) {
            if (j[f][0] < e) {
                var c = parseInt(g, 10);
                if (c > 0) {
                    h.push([Number(e).toFixed(b), c])
                }
                if (e <= k) {
                    break
                }
                e -= d
            }
            g += j[f][1]
        }
        return h
    },
    getBlock: function(a, c) {

        if (a > c) {
            return c
        } else {
            c = c / 10;
            return c
            // return this.getBlock(a, c)
        }
    },
    getZeros: function(b) {
        var a = "";
        while (b > 0) {
            b--;
            a += "0"
        }
        return a
    },
    getPrice: function(a, d) {
        var c = a[0];
        if (d == c) {
            c = "<h>" + c + ".</h>"
        } else {
            c += "."
        }
        var b = "";
        if (a.length == 1) {
            c += "0";
            b = this.getZeros(this.priceDecimalDigits - 1)
        } else {
            c += a[1];
            b = this.getZeros(this.priceDecimalDigits - a[1].length)
        }
        return [c, b]
    },
    getAmount: function(a) {
        var c = a[0];
        var b = "";
        var d = this.amountDecimalDigits - c.length + 1;
        if (d > 0) {
            b = ".";
            if (a.length == 1) {
                b += this.getZeros(d)
            } else {
                if (d > a[1].length) {
                    b += a[1] + this.getZeros(d - a[1].length)
                } else {
                    if (d == a[1].length) {
                        b += a[1]
                    } else {
                        b += a[1].substring(0, d)
                    }
                }
            }
        }
        return [c, b]
    },
    setTopTickers: function(c) {
        if (!c) {
            return
        }
        for (var a = 0; a < c.length; a++) {
            var b = c[a];
            if (b.moneyType == 0 && b.exeByRate == 1) {
                $("#markettop li." + b.symbol).find("span").text(b.ticker.dollar)
            } else {
                $("#markettop li." + b.symbol).find("span").text(b.ticker.last)
            }
        }
    },
    setMarketShow: function(e, b, d, c) {
        var a = e + "  " + (b + "/" + d).toUpperCase();
        $("#market a:eq(0)").attr("href", c).attr("title", a).text(a);
        if (this.isBtc123()) {
            $("#markettop li.order_info a").hide();
            $("#markettop li.depth_info a").hide()
        } else {
            $("#markettop li.order_info a").show().attr("href", "http://www.btc123.com/order?symbol=" + this.symbol);
            $("#markettop li.depth_info a").show().attr("href", "http://www.btc123.com/order/order?symbol=" + this.symbol)
        }
    },
    refreshPage: function(a) {

        // console.log(a);


        if (a) {
            // console.log(123000);
            // window.location.href = this.basePath + "/market?symbol=" + a
            window.location.href = "/Home/Orders/market?symbol=" + a
        } else {
            // console.log(66788);

            // window.location.href = this.basePath + "/market"
            // window.location.href = "/Home/Orders/market"
        }
    },
    refreshUrl: function(a) {
        try {
            this.browerState++;
            $("#countView").find("iframe").attr("src", "https://www.btc123.com/kline/marketCount/" + a + "?symbol=" + a);
            History.pushState({
                state: this.browerState
            }, this.title, "?symbol=" + a)
        } catch (b) {}
    },
    isBtc123: function() {
        if (this.symbol.indexOf("btc123") >= 0) {
            return true
        } else {
            return false
        }
    }
};

/*function keepalive(a) {
    var b = new Date().getTime();
    if (a.bufferedAmount == 0) {
        a.send("{time:" + b + "}")
    }
};*/

function getQueryString(name)
{

    // console.log(name);
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
    // console.log(r);

    if(r!=null)return  unescape(r[2]); return null;
}
