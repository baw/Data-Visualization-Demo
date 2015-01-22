// Trendline calculations from: http://bl.ocks.org/benvandyke/8459843

DVD.Views.LineChartView = Backbone.View.extend({
    events: {
        "click #trendlineToggle": "trendlineToggle"
    },
    template: JST["line_chart_view"],
    
    initialize: function () {
        this.listenTo(this.collection, "sync", this.createChart);
    },
    
    render: function () {
        var renderedContent = this.template();
        this.$el.html(renderedContent);
        
        this.createChart();
        
        return this;
    },
    
    _leastSquares: function (xSeries, ySeries) {
        var reduceSumFunc = function(prev, cur) { return prev + cur; };
        
        var xBar = _(xSeries).reduce(reduceSumFunc) * 1.0 / xSeries.length;
        var yBar = _(ySeries).reduce(reduceSumFunc) * 1.0 / ySeries.length;
        
        var ssXX = _(xSeries).map(function(d) { return Math.pow(d - xBar, 2); })
        ssXX = _(ssXX).reduce(reduceSumFunc);
        
        var ssYY = _(ySeries).map(function(d) { return Math.pow(d - yBar, 2); })
        ssYY = _(ssYY).reduce(reduceSumFunc);
        
        var ssXY = _(xSeries).map(function(d, i) { return (d - xBar) * (ySeries[i] - yBar); })
        ssXY = _(ssXY).reduce(reduceSumFunc);
        
        var slope = ssXY / ssXX;
        var intercept = yBar - (xBar * slope);
        var rSquare = Math.pow(ssXY, 2) / (ssXX * ssYY);
        
        return [slope, intercept, rSquare];
    },
    
    addTrendLine: function () {
        var data = this.collection.activityHourlyBreakdown();
        
        if (data.length === 0) return;
        
        var xSeries = d3.range(0, data.length);
        var ySeries = [];
        
        _(data).each(function (d) {
            ySeries.push(d[1]);
        });
        
        var leastSquaresCoeff = this._leastSquares(xSeries, ySeries);
        
        var x1 = xSeries[0];
        var y1 = leastSquaresCoeff[0] + leastSquaresCoeff[1];
        var x2 = xSeries[xSeries.length - 1];
        var y2 = (leastSquaresCoeff[0] * xSeries.length) + leastSquaresCoeff[1];
        
        var that = this;
        this.trendline = this.chart.append("line")
            .attr("class", "trend-line")
            .attr("x1", function () { return that.xScale(data[0][0]); })
            .attr("y1", function () { return that.yScale(y1); })
            .attr("x2", function () { return that.xScale(data[data.length - 1][0]); })
            .attr("y2", function () { return that.yScale(y2); })
            .attr("stroke", "black")
            .attr("stroke-width", 1)
            .style("color", "blue")
            .attr("transform", "translate(20, 0)");
        
        $("#trendlineToggle").text("Remove Trendline");
    },
    
    createChart: function () {
        d3.select(this.$("#chart").get(0)).select("svg").remove();
        
        var data = this.collection.activityHourlyBreakdown();
        
        var margins = {
            "top": 20,
            "right": 20,
            "bottom": 20,
            "left": 20
        };
        this.width = this.$el.width() - margins.left - margins.right;
        this.height = this.$el.height() - margins.top - margins.bottom;
        
        this.chart = d3.select(this.$("#chart").get(0)).append("svg")
                .attr("width",  margins.left + this.width + margins.right)
                .attr("height", margins.top + this.height + margins.bottom)
            .append("g")
                .attr("transform",
                      "translate(" + margins.left + "," + margins.top + ")");
        
        var dates = _(data).map(function (d) {
            return d[0];
        });
        
        this.xScale = d3.time.scale()
            .domain(d3.extent(dates))
            .range([0, this.width]);
        
        var xAxis = d3.svg.axis()
            .scale(this.xScale)
            .orient("bottom");
        
        this.yScale = d3.scale.linear()
            .domain([100, 0])
            .range([0, this.height]);
        
        var yAxis = d3.svg.axis()
            .scale(this.yScale)
            .orient("left");
        
        var that = this;
        this.line = d3.svg.line()
            .x(function (d) { return that.xScale(d[0]); })
            .y(function (d) { return that.yScale(d[1]); });
        
        this.chart.append("path")
            .datum(data)
            .attr("class", "mean-line line")
            .attr("transform", "translate(20, 0)")
            .attr("d", this.line);
        
        this.chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(20," + this.height + ")")
            .call(xAxis);
        
        this.chart.append("g")
            .attr("class", "y axis")
            .attr("transform", "translate(20, 0)")
            .call(yAxis);
    },
    
    removeTrendLine: function () {
        this.trendline.remove();
        
        this.trendline = undefined;
        
        $("#trendlineToggle").text("Add Trendline");
    },
    
    trendlineToggle: function () {
        if (this.trendline === undefined) {
            this.addTrendLine();
        } else {
            this.removeTrendLine();
        }
    },
    
    updateWithDifferentData: function (data) {
        this.collection = data;
        
        this.createChart();
        
        if (this.trendline !== undefined) {
            this.addTrendLine();
        }
    }
});