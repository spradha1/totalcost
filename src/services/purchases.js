// fetch purchases' data
/*export async function getPurchases() {

  return await fetch('<API>', {
    method: 'GET',
    mode: 'cors'
  })
  .then(response => response.json())
  .then(function (data) {
    return {
      purchases: data.items
    };
  });
}*/


// calculate overview values: sum, average & total number of items
export function getOverview(purchases) {
  if (purchases.length) {
    const costs = purchases.map(purchase => parseFloat(purchase.net) + parseFloat(purchase.tax));
    const sumFunc = (accumulator, currentValue) => accumulator + currentValue;
    const sum = costs.reduce(sumFunc);
    const num = costs.length;
    const avg = sum / num;
    return {
      sum: sum.toFixed(2),
      avg: avg.toFixed(2),
      num: num
    };
  }
  else {
    return {};
  }
}
