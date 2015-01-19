DVD.Views.SegmentsView = Backbone.View.extend({
    template: JST["segments"],
    
    initialize: function () {
        this.listenTo(this.collection, "sync", this.updateCount);
    },
    
    render: function () {
        var renderedContent = this.template();
        
        this.$el.html(renderedContent);
        
        this.updateCount();
        
        return this;
    },
    
    updateCount: function () {
        var genderCount = this.collection.genderCount();

        this.$("#totalCount").text(genderCount.female + genderCount.male);
        this.$("#maleCount").text(genderCount.male);
        this.$("#femaleCount").text(genderCount.female);
    },
    
    updateWithDifferentData: function (data) {
        this.collection = data;
        
        this.updateCount();
    }
});