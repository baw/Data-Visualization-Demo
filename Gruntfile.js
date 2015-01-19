module.exports = function (grunt) {
    grunt.initConfig({
        jst: {
            compile: {
                options: {
                    processName: function (filePath) {
                       return filePath.replace("js/templates/", "").replace(".jst", ""); 
                    }
                },
                files: {
                    "js/templates.js" : ["js/templates/*.jst"]
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-jst");

    grunt.registerTask("precompile", ["jst"]);
};
