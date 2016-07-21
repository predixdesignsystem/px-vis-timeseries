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
      assert.equal(margin.margin.top, 40);
      assert.equal(margin.margin.right, 10);
      assert.equal(margin.margin.bottom, 10);
      assert.equal(margin.margin.left, 50);
    });
    test('margin calcMargin set the marginNav', function() {
      assert.equal(margin.marginNav.top, 5);
      assert.equal(margin.marginNav.right, 10);
      assert.equal(margin.marginNav.bottom, 20);
      assert.equal(margin.marginNav.left, 50);
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
      assert.equal(margin.margin.top, 25);
      assert.equal(margin.margin.right, 40);
      assert.equal(margin.margin.bottom, 40);
      assert.equal(margin.margin.left, 10);
    });
    test('margin calcMargin set the marginNav', function() {
      assert.equal(margin.marginNav.top, 5);
      assert.equal(margin.marginNav.right, 40);
      assert.equal(margin.marginNav.bottom, 20);
      assert.equal(margin.marginNav.left, 10);
    });
  });

};
