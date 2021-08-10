import { getOverview } from "./purchases";


// describe('getPurchases function', () => {

//   test('the purchases data is retrieved from API', async () => {
//     const data = await getPurchases();
//     expect(data).not.toBe(null);
//   });

// });

describe('getOverview function', () => {

  let purchases_sample = [];

  beforeEach(() => {
    purchases_sample = [
      {
        name: 'A',
        net: '100.5',
        tax: 't1'
      },
      {
        name: 'B',
        net: '20.5',
        tax: 't2'
      },
      {
        name: 'C',
        net: '30.5',
        tax: 't3'
      }
    ]
  });

  test('overview is calculated correctly for non-empty purchase list', () => {
    expect(getOverview(purchases_sample)).toStrictEqual(
      {
        sum: "151.50",
        avg: "50.50",
        num: 3
      }
    );
  });

  test('overview is calculated correctly for empty purchase list', () => {
    expect(getOverview([])).toStrictEqual({});
  });

});