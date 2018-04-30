/**
 * @license
 * Copyright (c) 2018, General Electric
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

suite('px-vis-timeseries configFile sets individual properties', function() {
  let configFile;
  let options;

  suiteSetup(function(done){
    options = {
        "width": "1000",
        "height": "500",
        "registerLocation":"both",
        "eventConfig": {
          "Recalibrate":{
            "color": "blue",
            "icon": "px-fea:deployments",
            "type": "fa",
            "offset":[0,0]
          },
          "Fan start":{
            "color": "green",
            "icon": "px-fea:bug",
            "type": "px",
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
    configFile = document.getElementById('configFile');
    configFile.set('options', options);
    done();
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
  let margin;

  suiteSetup(function(done){
    margin = document.getElementById('margin');
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
      }
    };

    margin.addEventListener('px-vis-line-svg-rendering-ended', rendered);


    margin.set('xAxisLocation','top');
    margin.set('yAxisLocation','left');
    margin.set('width', 500);
    margin.set('height', 400);
    margin.set('chartData', d);

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
  let margin;

  suiteSetup(function(done){
    margin = document.getElementById('margin');
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
      }
    };

    margin.addEventListener('px-vis-line-svg-rendering-ended', rendered);

    margin.set('chartData', d);
    margin.set('xAxisLocation','bottom');
    margin.set('yAxisLocation','right');

    margin._calcMargins();

  });

  test('margin fixture is created', function() {
    assert.isTrue(margin !== null);
  });

  test('margin calcMargin set the margin', function() {
    assert.equal(margin._internalMargin.top, 25);
    assert.equal(margin._internalMargin.right, 50);
    assert.equal(margin._internalMargin.bottom, 40);
    assert.equal(margin._internalMargin.left, 50);
  });
  test('margin calcMargin set the marginNav', function() {
    assert.equal(margin._internalMarginNav.top, 5);
    assert.equal(margin._internalMarginNav.right, 50);
    assert.equal(margin._internalMarginNav.bottom, 20);
    assert.equal(margin._internalMarginNav.left, 50);
  });
});
