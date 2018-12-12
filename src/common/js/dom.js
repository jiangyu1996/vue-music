export function hasClass(obj, className) {
  let reg = new RegExp('(^|\\s)' + className + '(&|\\s)');
  return reg.test(obj.className)
}

export function addClass(obj, className) {
  if (hasClass(obj, className))
    return;
  else {
    let classNameList = obj.className.split(' ');
    classNameList.push(className);
    obj.className = classNameList.join(' ');
  }
}

export function getData(obj, attr, value) {
  const prefix = 'data-'
  if (value) {
    return obj.setAttribute(prefix + attr, value)
  } else {
    return obj.getAttribute(prefix + attr)
  }
}


let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}