// This is the wrapper for custom tests, called upon web components ready state
function runCustomTests() {
  // Place any setup steps like variable declaration and initialization here

  // This is the placeholder suite to place custom tests in
  // Use testCase(options) for a more convenient setup of the test cases
  suite('px-vis-timeseries configFile sets properties', function() {
    var configFile = document.getElementById('configFile');
    var options = {
        "width": "1000",
        "height": "500",
        "registerLocation":"both",
        "eventConfig": {
          "Recalibrate":{
            "color": "blue",
            "icon": "fa-camera",
            "type": "fa",
            "offset":[0,0]
          },
          "Fan start":{
            "color": "green",
            "icon": "\uf015",
            "type": "unicode",
            "offset":[1,0]
          },
          "Fan stop":{
            "icon": "ge_logo.png",
            "type": "image",
            "offset":[0,-20],
            "size":"20"
          }
        },
        "navSeriesLimit":0,
        "includeAllSeries": true
      };
    suiteSetup(function(done){
      configFile.set('options',options);
      setTimeout(function(){ done(); },100);
    });

    test('configFile fixture is created', function() {
      assert.isTrue(configFile !== null);
    });

    test('configFile setConfig set the options', function() {
      assert.equal(configFile.width, options.width);
      assert.equal(configFile.height, options.height);
      assert.equal(configFile.registerLocation, options.registerLocation);
      assert.deepEqual(configFile.eventConfig, options.eventConfig);
      assert.deepEqual(configFile.navSeriesLimit, options.navSeriesLimit);
      assert.equal(configFile.includeAllSeries, options.includeAllSeries);
    });
  });

  suite('px-vis-timeseries margin sets properties with top and left axis locations', function() {
    var margin = document.getElementById('margin');

    suiteSetup(function(done){
      margin.set('xAxisLocation','top');
      margin.set('yAxisLocation','left');
      margin._calcMargins();
      setTimeout(function(){ done(); },100);
    });

    test('margin fixture is created', function() {
      assert.isTrue(margin !== null);
    });

    test('margin calcMargin set the margin', function() {
      assert.equal(margin._internalMargin.top, 40);
      assert.equal(margin._internalMargin.right, 10);
      assert.equal(margin._internalMargin.bottom, 10);
      assert.equal(margin._internalMargin.left, 50);
    });
    test('margin calcMargin set the marginNav', function() {
      assert.equal(margin._internalMarginNav.top, 5);
      assert.equal(margin._internalMarginNav.right, 10);
      assert.equal(margin._internalMarginNav.bottom, 20);
      assert.equal(margin._internalMarginNav.left, 50);
    });
  });

  suite('px-vis-timeseries margin sets properties with bottom and right axis locations', function() {
    var margin = document.getElementById('margin');

    suiteSetup(function(done){
      margin.set('xAxisLocation','bottom');
      margin.set('yAxisLocation','right');
      margin._calcMargins();
      setTimeout(function(){ done(); },100);
    });

    test('margin fixture is created', function() {
      assert.isTrue(margin !== null);
    });

    test('margin calcMargin set the margin', function() {
      assert.equal(margin._internalMargin.top, 25);
      assert.equal(margin._internalMargin.right, 40);
      assert.equal(margin._internalMargin.bottom, 40);
      assert.equal(margin._internalMargin.left, 10);
    });
    test('margin calcMargin set the marginNav', function() {
      assert.equal(margin._internalMarginNav.top, 5);
      assert.equal(margin._internalMarginNav.right, 40);
      assert.equal(margin._internalMarginNav.bottom, 20);
      assert.equal(margin._internalMarginNav.left, 10);
    });
  });


  suite('px-vis-timeseries includeAllSeries setup works', function() {
    var IASChart = document.getElementById('IASChart');
    var colors = baseColors.properties.colors.value;
    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20
          }
        ],
        m = {
          "top": 10,
          "bottom": 10,
          "left": 50,
          "right": 10
        }

      IASChart.set('width',500);
      IASChart.set('height',400);
      IASChart.set('margin',m);
      IASChart.set('chartData',d);

      setTimeout(function(){done()}, 500);
    });

    test('IASChart fixture is created', function() {
      assert.isTrue(IASChart !== null);
    });

    test('IASChart completeSeriesConfig', function() {
      assert.isObject(IASChart.completeSeriesConfig.y);
      assert.equal(IASChart.completeSeriesConfig.y.color, colorSet[colorOrder[0]]);
      assert.equal(IASChart.completeSeriesConfig.y.name, 'y');
      assert.deepEqual(IASChart.completeSeriesConfig.y.x, 'x');
      assert.deepEqual(IASChart.completeSeriesConfig.y.y, 'y');

      assert.isObject(IASChart.completeSeriesConfig.y1);
      assert.equal(IASChart.completeSeriesConfig.y1.color, colorSet[colorOrder[1]]);
      assert.equal(IASChart.completeSeriesConfig.y1.name, 'y1');
      assert.deepEqual(IASChart.completeSeriesConfig.y1.x, 'x');
      assert.deepEqual(IASChart.completeSeriesConfig.y1.y, 'y1');
    });

    test('IASChart svg', function() {
      var re = /translate\((\d+)\s?,?(\d*)\)/,
          translate = re.exec(IASChart.svg.attr('transform'));

      assert.equal(IASChart.svg.node().tagName, 'g');
      assert.equal(translate[1], 50);
      assert.equal(translate[2], 10);
    });

    test('IASChart pxSvgElem', function() {
      assert.equal(IASChart.pxSvgElem.tagName, 'svg');
      assert.equal(IASChart.pxSvgElem.width.baseVal.value, 500);
      assert.equal(IASChart.pxSvgElem.height.baseVal.value, 400);
    });

    test('IASChart canvasContext', function() {
      assert.deepEqual(IASChart.canvasContext._translation, [50,10]);
      assert.equal(IASChart.canvasContext._pxLinesRedraw, 0);
      assert.equal(IASChart.canvasContext._pxLinesTotal, 0);
      assert.deepEqual(IASChart.canvasContext._pxLinesSeries, {});
      assert.equal(IASChart.canvasContext.canvas.width, 500);
      assert.equal(IASChart.canvasContext.canvas.height, 400);
    });

    test('IASChart x', function() {
      assert.deepEqual(IASChart.x.range(), [0,440]);
      assert.equal(Number(IASChart.x.domain()[0]), 1397102460000);
      assert.equal(Number(IASChart.x.domain()[1]), 1397219100000);
    });

    test('IASChart y', function() {
      assert.deepEqual(IASChart.y.range(), [380,0]);
      assert.deepEqual(IASChart.y.domain(), [0,20]);
    });

    test('IASChart mutedSeries', function() {
      assert.deepEqual(IASChart.mutedSeries, {});
    });

    test('IASChart tooltipData', function() {
      var ttD = {
        "mouse": null,
        "time": null,
        "xArr": null,
        "yArr": null,
        "series": [{
          "name": "y",
          "value": null
        },{
          "name": "y1",
          "value": null
        }]
      }
      assert.deepEqual(IASChart.tooltipData, ttD);
    });

    test('IASChart extentsData', function() {
      assert.isUndefined(IASChart.extentsData);
    });

    test('IASChart selectedDomain', function() {
      assert.deepEqual(IASChart.selectedDomain, {"x":IASChart.currentDomainX,"y":[]});
    });

    test('IASChart _seriesKeys', function() {
      assert.deepEqual(IASChart._seriesKeys, ['y','y1']);
    });

    test('IASChart seriesClipPath', function() {
      var cp = document.getElementById(IASChart.seriesClipPath);
      assert.equal(cp.tagName, "clipPath");
    });

    test('IASChart clipPath', function() {
      var cp = document.getElementById(IASChart.clipPath);
      assert.equal(cp.tagName, "clipPath");
    });
  }); //suite

  suite('px-vis-timeseries config setup works', function() {
    var configChart = document.getElementById('configChart');
    var colors = baseColors.properties.colors.value;
    var colorOrder = dataVisColors.properties.seriesColorOrder.value;
    var colorSet = dataVisColors.properties.dataVisColors.value;

    suiteSetup(function(done){
      var d = [{
            "x": 1397102460000,
            "y": 1,
            "y1": 1
          },{
            "x": 1397131620000,
            "y": 6,
            "y1": 15
          },{
            "x": 1397160780000,
            "y": 10,
            "y1": 8
          },{
            "x": 1397189940000,
            "y": 4,
            "y1": 10
          },{
            "x": 1397219100000,
            "y": 6,
            "y1": 20
          }
        ],
        m = {
          "top": 10,
          "bottom": 10,
          "left": 50,
          "right": 10
        },
        config = {
          'config1': {
            "name": "Series 1",
            "x": "x",
            "y": "y"
          },
          'config2': {
            "name": "Series 2",
            "x": "x",
            "y": "y1"
          }
        }

      configChart.set('width',500);
      configChart.set('height',400);
      configChart.set('margin',m);
      configChart.set('seriesConfig',config);
      configChart.set('chartData',d);

      setTimeout(function(){done()}, 500);
    });

    test('configChart fixture is created', function() {
      assert.isTrue(configChart !== null);
    });

    test('configChart completeSeriesConfig', function() {
      assert.isObject(configChart.completeSeriesConfig.config1);
      assert.equal(configChart.completeSeriesConfig.config1.color, colorSet[colorOrder[0]]);
      assert.equal(configChart.completeSeriesConfig.config1.name, 'Series 1');
      assert.deepEqual(configChart.completeSeriesConfig.config1.x, 'x');
      assert.deepEqual(configChart.completeSeriesConfig.config1.y, 'y');

      assert.isObject(configChart.completeSeriesConfig.config2);
      assert.equal(configChart.completeSeriesConfig.config2.color, colorSet[colorOrder[1]]);
      assert.equal(configChart.completeSeriesConfig.config2.name, 'Series 2');
      assert.deepEqual(configChart.completeSeriesConfig.config2.x, 'x');
      assert.deepEqual(configChart.completeSeriesConfig.config2.y, 'y1');
    });

    test('configChart svg', function() {
      var re = /translate\((\d+)\s?,?(\d*)\)/,
          translate = re.exec(configChart.svg.attr('transform'));

      assert.equal(configChart.svg.node().tagName, 'g');
      assert.equal(translate[1], 50);
      assert.equal(translate[2], 10);
    });

    test('configChart pxSvgElem', function() {
      assert.equal(configChart.pxSvgElem.tagName, 'svg');
      assert.equal(configChart.pxSvgElem.width.baseVal.value, 500);
      assert.equal(configChart.pxSvgElem.height.baseVal.value, 400);
    });

    test('configChart canvasContext', function() {
      assert.deepEqual(configChart.canvasContext._translation, [50,10]);
      assert.equal(configChart.canvasContext._pxLinesRedraw, 0);
      assert.equal(configChart.canvasContext._pxLinesTotal, 0);
      assert.deepEqual(configChart.canvasContext._pxLinesSeries, {});
      assert.equal(configChart.canvasContext.canvas.width, 500);
      assert.equal(configChart.canvasContext.canvas.height, 400);
    });

    test('configChart x', function() {
      assert.deepEqual(configChart.x.range(), [0,440]);
      assert.equal(Number(configChart.x.domain()[0]), 1397102460000);
      assert.equal(Number(configChart.x.domain()[1]), 1397219100000);
    });

    test('configChart y', function() {
      assert.deepEqual(configChart.y.range(), [380,0]);
      assert.deepEqual(configChart.y.domain(), [0,20]);
    });

    test('configChart mutedSeries', function() {
      assert.deepEqual(configChart.mutedSeries, {});
    });

    test('configChart tooltipData', function() {
      var ttD = {
        "mouse": null,
        "time": null,
        "xArr": null,
        "yArr": null,
        "series": [{
          "name": "config1",
          "value": null
        },{
          "name": "config2",
          "value": null
        }]
      }
      assert.deepEqual(configChart.tooltipData, ttD);
    });

    test('configChart extentsData', function() {
      assert.isUndefined(configChart.extentsData);
    });

    test('configChart selectedDomain', function() {
      assert.deepEqual(configChart.selectedDomain, {"x":configChart.currentDomainX,"y":[]});
    });

    test('configChart _seriesKeys', function() {
      assert.deepEqual(configChart._seriesKeys, ['config1','config2']);
    });

    test('configChart seriesClipPath', function() {
      var cp = document.getElementById(configChart.seriesClipPath);
      assert.equal(cp.tagName, "clipPath");
    });

    test('configChart clipPath', function() {
      var cp = document.getElementById(configChart.clipPath);
      assert.equal(cp.tagName, "clipPath");
    });
  }); //suite

};
