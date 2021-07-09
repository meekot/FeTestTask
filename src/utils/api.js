
export const fetchProductList = function () {
  return fetch('https://raw.githubusercontent.com/makedonmax/test_data/master/data.txt')
    .then(response => response.json())
    .then(data=> { return data;})
}