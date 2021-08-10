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
        net: '100',
        tax: '15'
      },
      {
        name: 'B',
        net: '23',
        tax: '5'
      },
      {
        name: 'C',
        net: '35',
        tax: '5'
      }
    ]
  });

  test('overview is calculated correctly for non-empty purchase list', () => {
    expect(getOverview(purchases_sample)).toStrictEqual(
      {
        sum: "183.00",
        avg: "61.00",
        num: 3
      }
    );
  });

  test('overview is calculated correctly for empty purchase list', () => {
    expect(getOverview([])).toStrictEqual({});
  });

});