function image (quill, uploadConfig) {
  let self = quill

  let fileInput = quill.container.querySelector('input.ql-image[type=file]')
  if (fileInput === null) {
    fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    // 设置图片参数名
    if (uploadConfig.name) {
      fileInput.setAttribute('name', uploadConfig.name)
    }
    // 可设置上传图片的格式
    fileInput.setAttribute('accept', uploadConfig.accept)
    fileInput.classList.add('ql-image')
    // 监听选择文件
    fileInput.addEventListener('change', function () {
      // 如果图片限制大小
      if (uploadConfig.size && fileInput.files[0].size >= uploadConfig.size * 1024) {
        fileInput.value = ''
        return
      }
      // 创建formData
      let formData = new FormData()
      formData.append(uploadConfig.name, fileInput.files[0])
      // 如果需要token且存在token
      if (uploadConfig.token) {
        formData.append('token', uploadConfig.token)
      }
      // 图片上传
      let xhr = new XMLHttpRequest()
      xhr.open(uploadConfig.methods, uploadConfig.action, true)
      // 上传数据成功，会触发
      xhr.onload = function (e) {
        if (xhr.status === 200) {
          let res = JSON.parse(xhr.responseText)
          // console.log(res)
          let length = self.quill.getSelection(true).index
          self.quill.insertEmbed(length, 'image', res.info)
          self.quill.setSelection(length + 1)
        }
        fileInput.value = ''
      }
      // 开始上传数据
      xhr.upload.onloadstart = function (e) {
        fileInput.value = ''
        // console.log('开始上传')
      }
      // 当发生网络异常的时候会触发，如果上传数据的过程还未结束
      xhr.upload.onerror = function (e) {
      }
      // 上传数据完成（成功或者失败）时会触发
      xhr.upload.onloadend = function (e) {
        // console.log('上传结束')
      }
      xhr.send(formData)
    })
    quill.container.appendChild(fileInput)
  }
  fileInput.click()
}

export default image
