v1.1.2
==================
* changed vis bower to ^

v1.1.1
==================
* removed cleanOnDetached

v1.1.0
==================
* upgraded to vis 1.1.0
* added canvas support for scatter (automatic when using renderToCanvas)
* progressive rendering now can be customized through progressiveRenderingPointsPerFrame (16000 by default for lines, 2000 byy default for scatter) and progressiveRenderingMinimumFrames. Increase progressiveRenderingPointsPerFrame for better performance and decrease for smoother drawing. When at the right value no performance cost incurs and drawing is smooth but if value is too small can incur a performance cost (i.e the drawing will take longer but will still start at the same time, also the UI won't be frozen)
* added cleanOnDetached to allow reuse of the chart after detaching it from the dom. This is aimed at applications creating charts dynamically so that they can keep a pool of charts (simple array of charts) when removing them from the dom and reusing them later on with new data and config, improving performance . Turning cleanOnDetached on will make sure the chart will clear everything needed so that it draws properly with any new config. If using this strategy one thing to keep in mind is making sure the chart is re-appended in the dom *before* changing its properties to their new values. In most cases it would work even if appending it after, but some edge cases scenarios might fail to clean some visual artifact (for example switching from canvas to svg while deleting a few series at the same time). When moving the chart around the dom do not turn it on for performance boost and making sure you don't need the chart to force redrawing. This can be changed dynamically
* added debounceResizeTiming to control the debounce timiong on auto resize, changed default from 50ms to 250ms

v1.0.0
==================
* changing ghp.sh to account for Alpha releases
* removed registerLocation in favor of hideRegister and registerConfig
* allowed to split out the config options into smaller objects: registerConfig, tooltipConfig, eventConfig
* renamed enableTooltip to showTooltip for framework consistency
* fixed bug where tooltipConfig wasn't applied
* added clip path to cursor
* added cursor config
* added layers
* added lowerSVG
* changed line to line-svg
* changed dataExtents
* added the ability to redraw one series on top of the others
* added the ability to pass a navigator config and configure navigator axis
* Updated register length to be dynamic based on if the navigator is included
* margin and marginNav can now be set at initialization as well (=as attributes) and dynamically adjusted
* added dynamic menus on registers
* added toolbar and advanced zooming
* defaultSeriesConfig now updates \_defaultSeriesConfig so defaultSeriesConfig doesnt have to have all defaults
* Multi-y axis
Post beta
==========
  * ensure chart navigator resizes properly

v0.6.7
===================
* Make default series values numbers

v0.6.6
===================
* Added new configurable demo

v0.6.5
==================
* Updated to cool grays

v0.6.4
==================
* Bump color design

v0.6.3
==================
* Hotfix for wrapper class lost when vulcanizing APM

v0.6.2
==================
* Themeable

v0.6.1
==================
* Update missed design dependencies

v0.6.0
==================
* Updated dependencies

v0.5.8
==================
* Ensure zoom button reposition on resize
* Ensure zoom is reset when changing chart data
* Zoom is now preserved when chart is resizing

v0.5.7
==================
* updating to vis 0.7.x
* adding clip path to cursor

v0.5.6
==================
* changing all devDeps to ^

v0.5.5
==================
* Merge image branch
* --Changed how image gets called in demo to match new image call with legend

v0.5.4
==================
* Update px-theme to 2.0.1 and update test fixtures

v0.5.3
==================
* update dependencies for dropdown

v0.5.2
==================
* removing px-theme style call

v0.5.1
==================
* changing Gruntfile.js to gulpfile.js

v0.5.0
==================
* moved axisConfigs to chart behavior
* added ability to set register and tooltip via configs

v0.4.7
==================
* bower updating px-demo-snippet


v0.4.6
==================
* added seriesKey to interaction space for no data scenarios

v0.4.5
==================
* added a second series to demo

v0.4.4
==================
* Update dependencies

v0.4.3
==================
* restamp on lines and scatter dom if

v0.4.2
==================
* make sure addition/removal of series to seriesConfig are correctly processed

v0.4.1
==================
* added clip path for canvas

v0.4.0
==================
* ensure muted series are muted in tooltip
* added hideGridlinesX and hideGridlinesY
* moved to px-vis 0.0.6

v0.3.6
==================
* added mute/unmute behavior
* fixed gridline issue

v0.3.5
==================
* Added width to axis

v0.3.4
==================
* Make sure zooming works when using scatter

v0.3.3
==================
* Upgrade to px-vis 0.5.0 and associated change to line

v0.3.1
==================
* polished the demo page a bit and included script Includes, linksIncludes and polygitIncludes in the demo snippet call

v0.2.5
==================
* added resolutions

v0.2.4
==================
* added axis type

v0.2.3
==================
* uses new tooltip

v0.2.2
==================
* added ability to disable navigator

v0.2.1
==================
* fixed test

v0.2.0
==================
* update to px-vis 2.0
* added axis configuration

v0.1.15
==================
* fixed demo page for IE

v0.1.14
==================
* updating for axis changes

v0.1.13
==================
* adding new png

v0.1.12
==================
* adding new demo pages

v0.1.11
==================
* adding property for prevent-resize

v0.1.10
==================
* adding support for exporting to images

v0.1.9
==================
* Allow px-rangepicker use to drive selection of time span

v0.1.8
==================
* font-awesome reference, repo screenshot and demo updates

v0.1.7
==================
* added automatic resize

v0.1.6
==================
* demo update

v0.1.5
==================
* Added vulcanize index and demo

v0.1.4
==================
* demo bug fix

v0.1.3
==================
* changed canvas demo

v0.1.1
==================
* merged and fixed conflicts

v0.1.0
==================
* Added canvas support
* Added precipitationPattern behavior

v0.0.4
==================
* fix tooltip for demo

v0.0.3
==================
* use relative path for demo data, fix units for demo, remove unused behavior

v0.0.2
==================
* moved demo data to dependencies in bower

v0.0.1
==================
* Initial release
