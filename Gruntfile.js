/*
 * grunt-gettext
 * https://github.com/arendjr/grunt-gettext
 *
 * Copyright (c) 2013 Arend van Beelen, Speakap BV
 * Licensed under the MIT license.
 */

"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        jshint: {
            all: [
                "Gruntfile.js",
                "tasks/*.js"
            ],
            options: {
                jshintrc: ".jshintrc",
            }
        },

        /**
         * Scans source files and extracts translatable messages from them.
         */
        xgettext: {
            default_options: {
                options: {
                    /**
                     * The function name that marks translatable messages.
                     */
                    functionName: "tr",

                    /**
                     * The .pot file that is generated by this task (the output
                     * file).
                     *
                     * Warning: This file is overwritten every time you run
                     * this.
                     */
                    potFile: "messages.pot",

                    /**
                     * Custom function that will process every extracted message
                     * before it's included in the PO file. This may come in
                     * handy, for example, if you want to simplify whitespace.
                     */
                    //processMessage: function(message) { ... }
                },

                files: {
                    /**
                     * Handlebars files to scan for translatable messages.
                     *
                     * Assuming the default functionName is used, translatable
                     * messages look like this:
                     *
                     * {{tr "Some translatable message"}}
                     * {{tr "You have %1 followers" numFollowers}}
                     *
                     * In either case, the first string argument is extracted as
                     * a translatable message.
                     */
                    handlebars: [],

                    /**
                     * JavaScript files to scan for translatable texts.
                     *
                     * Assuming the default functionName is used, translatable
                     * messages look like this:
                     *
                     * tr("Some translatable messages")
                     * tr("You have %1 follower", "You have %1 followers")
                     *                                       .arg(numFollowers)
                     *
                     * In both cases, all string arguments inside the tr()
                     * function call are extracted as translatable messages.
                     */
                    javascript: []
                }
            }
        },

        /**
         * Converts translated PO files to JSON resources.
         */
        po2json: {
            default_options: {
                options: {
                    /**
                     * If set to true, the JSON resource is wrapped in an
                     * anonymouse Require.js definition.
                     */
                    requireJs: false
                },

                /**
                 * PO files to process.
                 *
                 * The keys in this object are the paths of the JSON resources
                 * to produce, the values are the PO files to process.
                 */
                files: {
                }
            }
        }

    });

    grunt.loadTasks("tasks");

    grunt.loadNpmTasks("grunt-contrib-jshint");

    grunt.registerTask("default", ["gettext"]);

};
