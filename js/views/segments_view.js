DVD.Views.SegmentsView = Backbone.View.extend({
    template: JST["segments"],
    
    render: function () {
        var genderCount = this.collection.genderCount();
        
        var renderedContent = this.template({
            totalCount: (genderCount.male + genderCount.femaleCount),
            maleCount: genderCount.male,
            femaleCount: genderCount.female
        });
        
        this.$el.html(renderedContent);
        
        return this;
    }
});