export const debounce = (func, t = 300) => {
  let timer
  return function (...args)  {
    clearTimeout(timer)
    timer = setTimeout(() => {func.apply(this,args)}, t)
  }
}

export const download = (content, fileName, contentType) => {
  const a = document.createElement('a'),
        file = new Blob([content], {type: contentType})
  a.href = URL.createObjectURL(file)
  a.download = fileName
  a.click()
}