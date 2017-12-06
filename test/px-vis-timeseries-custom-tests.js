document.addEventListener("WebComponentsReady", function() {
  runCustomTests();
});

function runCustomTests() {

  suite('px-vis-timeseries margin sets properties with top and left axis locations', function() {
    var margin = document.getElementById('margin');

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
        ];

      var  counter = 0;
      var rendered = function() {
        counter += 1;

        if(counter === 4) {
          margin.removeEventListener('px-vis-line-svg-rendering-ended', rendered);
          done();
        }, 500);

      }
    };

    IASChart.addEventListener('px-vis-line-svg-rendering-ended', rendered);

    IASChart.set('width',500);
    IASChart.set('height',400);
    IASChart.set('margin',m);
    IASChart.set('chartData',d);

  });

  test('IASChart fixture is created', function() {
    assert.isTrue(IASChart !== null);
  });

  test('IASChart completeSeriesConfig', function() {
    assert.isObject(IASChart.completeSeriesConfig.y);
    assert.equal(IASChart.completeSeriesConfig.y.color, IASChart.seriesColorList[0]);
    assert.equal(IASChart.completeSeriesConfig.y.name, 'y');
    assert.deepEqual(IASChart.completeSeriesConfig.y.x, 'x');
    assert.deepEqual(IASChart.completeSeriesConfig.y.y, 'y');

    assert.isObject(IASChart.completeSeriesConfig.y1);
    assert.equal(IASChart.completeSeriesConfig.y1.color, IASChart.seriesColorList[1]);
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
    assert.equal(IASChart.canvasContext.canvas.width, 500);
    assert.equal(IASChart.canvasContext.canvas.height, 400);
  });

    });

    test('IASChart _seriesKeys', function() {
      assert.deepEqual(IASChart._seriesKeys, ['y','y1']);
    });

    test('IASChart seriesClipPath', function() {
      var cp =  IASChart.svg.node().getElementsByTagName('clipPath');
      assert.equal(cp[1].id, IASChart.seriesClipPath);
    });

    test('IASChart clipPath', function() {
      var cp =  IASChart.svg.node().getElementsByTagName('clipPath');
      assert.equal(cp[0].id, IASChart.clipPath);
    });
  }); //suite

  suite('px-vis-timeseries config setup works', function() {
    var configChart = document.getElementById('configChart');

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
        },
        'config2': {
          "name": "Series 2",
          "x": "x",
          "y": "y1"
        }
      },
      toolbar = {
        advancedZoom: true,
        pan: true,
        tooltip: true,
        stripe: true
      }

    var  counter = 0;
    var rendered = function() {
      counter += 1;

      if(counter === 4) {
        configChart.removeEventListener('px-vis-line-svg-rendering-ended', rendered);
        done();
      }
    };

    configChart.addEventListener('px-vis-line-svg-rendering-ended', rendered);

    configChart.set('width',500);
    configChart.set('height',400);
    configChart.set('margin',m);
    configChart.set('seriesConfig',config);
    configChart.set('chartData',d);
  });

  test('configChart fixture is created', function() {
    assert.isTrue(configChart !== null);
  });

  test('configChart completeSeriesConfig', function() {
    assert.isObject(configChart.completeSeriesConfig.config1);
    assert.equal(configChart.completeSeriesConfig.config1.color, configChart.seriesColorList[0]);
    assert.equal(configChart.completeSeriesConfig.config1.name, 'Series 1');
    assert.deepEqual(configChart.completeSeriesConfig.config1.x, 'x');
    assert.deepEqual(configChart.completeSeriesConfig.config1.y, 'y');

    assert.isObject(configChart.completeSeriesConfig.config2);
    assert.equal(configChart.completeSeriesConfig.config2.color, configChart.seriesColorList[1]);
    assert.equal(configChart.completeSeriesConfig.config2.name, 'Series 2');
    assert.deepEqual(configChart.completeSeriesConfig.config2.x, 'x');
    assert.deepEqual(configChart.completeSeriesConfig.config2.y, 'y1');
  });

    test('configChart seriesClipPath', function() {
      var cp =  configChart.svg.node().getElementsByTagName('clipPath');
      assert.equal(cp[1].id, configChart.seriesClipPath);
    });

    test('configChart clipPath', function() {
      var cp =  configChart.svg.node().getElementsByTagName('clipPath');
      assert.equal(cp[0].id, configChart.clipPath);
    });
  }); //suite

  test('configChart canvasContext', function() {
    assert.deepEqual(configChart.canvasContext._translation, [50,10]);
    assert.equal(configChart.canvasContext.canvas.width, 500);
    assert.equal(configChart.canvasContext.canvas.height, 400);
  });

  test('configChart x', function() {
    assert.deepEqual(configChart.x.range(), [0,440]);
    assert.equal(Number(configChart.x.domain()[0]), 1397102460000);
    assert.equal(Number(configChart.x.domain()[1]), 1397219100000);
  });

  test('configChart y', function() {
    assert.deepEqual(configChart.y["defaultAxis"].range(), [380,0]);
    assert.deepEqual(configChart.y["defaultAxis"].domain(), [1,20]);
  });

  test('configChart mutedSeries', function() {
    assert.deepEqual(configChart.mutedSeries, {});
  });

  test('configChart tooltipData', function() {
    var ttD = {
      "mouse": null,
      "time": null,
      "timeSeriesKey":null,
      "hidden": true,
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

    //selectedDomain can be empty or have the actual X domain
    if(configChart.selectedDomain.x.length > 0) {
      assert.equal(JSON.stringify(configChart.selectedDomain), '{"x":["2014-04-10T04:01:00.000Z","2014-04-11T12:25:00.000Z"],"y":[]}');
    } else {
      assert.deepEqual(configChart.selectedDomain, {"x":[],"y":[]});
    }
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
