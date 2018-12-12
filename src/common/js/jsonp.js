import originJSONP from 'jsonp'
export default function jsonp(url, paramObjecct, option) { //url, paramObjecct, option
  var params = processParams(paramObjecct);
  url += (url.indexOf('?') === -1 ? '?' : '&') + params;
  //console.log(url);
  return new Promise((resolve, reject) => {
    originJSONP(url, option, (err, data) => {
      if (!err)
        resolve(data);
      else
        reject(err);
    })
  })

}


function processParams(paramObjecct) {
  let urlParams = "";
  let value;
  for (var key in paramObjecct) {
    value = paramObjecct[key] ? paramObjecct[key] : '';
    urlParams += `&${key}=` + encodeURIComponent(value);
  }
  return urlParams.substring(1);
}


 