import {test} from '../fixtures/base';

const temperatureTestCases = [
  // {value: 12},
  {value: 13},
  {value: 14},
  {value: 15},
  {value: 16},
  {value: 17},
  {value: 18},
  {value: 19},
  {value: 20},
  {value: 21},
  {value: 22},
  {value: 23},
  {value: 24},
  {value: 25},
  {value: 26},
  {value: 27},
  {value: 28},
  {value: 29},
  // {value: 30},
];

const humidityTestCases = [
  // {value: 0},
  // {value: 10},
  // {value: 20},
  // {value: 30},
  // {value: 40},
  {value: 50},
  // {value: 60},
  // {value: 70},
  // {value: 80},
  // {value: 90},
  // {value: 100},
];

temperatureTestCases.forEach(({value}) => {
  test(`Should set and verify temperature to ${value} degrees`, async ({temperaturePage}) => {
    await temperaturePage.setTemperature(value)
    await temperaturePage.checkTemperature(value);
  });
})

humidityTestCases.forEach(({value}) => {
  test(`Should set and verify humidity to ${value} percent`, async ({humidityPage}) => {
    await humidityPage.setHumidity(value)
    await humidityPage.checkHumidity(value);
  });
})
