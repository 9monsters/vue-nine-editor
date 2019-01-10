export default (quill, options) => {
  var container = document.querySelector('#nq-counter')
  quill.on('text-change', () => {
    var text = quill.getText().trim()
    console.log(text)
    if (options.unit === 'word') {
      container.innerText = text.split(/\s+/).length + ' 个字'
    } else {
      container.innerText = text.length + ' 个字符'
    }
  })
}
