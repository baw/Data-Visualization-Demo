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

        this.$("#totalCount").text(genderCount.female + genderCount.male || 0);
        this.$("#maleCount").text(genderCount.male || 0);
        this.$("#femaleCount").text(genderCount.female || 0);
    },
    
    updateWithDifferentData: function (data) {
        this.collection = data;
        
        this.updateCount();
    }
});