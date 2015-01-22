DVD.Views.PieChartView = Backbone.View.extend({
    initialize: function () {
        this.listenTo(this.collection, "sync", this.createChart);
    },
    
    render: function () {
        this.createChart();
        
        return this;
    },
    
    createChart: function () {
        d3.select(this.el).select("svg").remove();
        
        var deviceCount = this.collection.deviceCount();
        var data = _(deviceCount).map(function convertObjectToArray(value, key) {
            return [key, value];
        });
        
        var margins = {
            "top": 20,
            "right": 20,
            "bottom": 20,
            "left": 20
        };
        this.width = this.$el.width() - margins.left - margins.right;
        this.height = this.$el.height() - margins.top - margins.bottom;
        this.radius = Math.min(this.width, this.height) / 2;
        
        var color = ["#98abc5", "#8a89a6", "#7b6888"];
        
        var arc = d3.svg.arc()
            .outerRadius(this.radius)
            .innerRadius(0);
        
        var pie = d3.layout.pie()
            .value(function (d) { return d[1]; });
        
        this.chart = d3.select(this.el).append("svg")
                .attr("width",  margins.left + this.width + margins.right)
                .attr("height", margins.top + this.height + margins.bottom)
            .append("g")
                .attr("transform",
                      "translate(" + (this.width / 2) + "," +
                                     (this.height / 2) + ")");
        
        var g = this.chart.selectAll(".arc")
            .data(pie(data))
            .enter().append("g")
                .attr("class", "arc");
        
        g.append("path")
            .attr("d", arc)
            .style("fill", function (d, i) { return color[i]; });
        
        g.append("text")
            .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })
            .attr("dy", ".35em")
            .style("text-anchor", "middle")
            .text(function (d) { return d.data[0]; });
    },
    
    updateWithDifferentData: function (data) {
        this.collection = data;
        
        this.createChart();
    }
});