import _Quill from 'quill'
import quillEditor from './Editor.vue'

const Quill = window.Quill || _Quill
const install = (Vue, globalOptions) => {
  if (globalOptions) {
    quillEditor.props.globalOptions.default = () => globalOptions
  }
  Vue.component(quillEditor.name, quillEditor)
}

const NineEditor = { Quill, quillEditor, install }

export default NineEditor
export { Quill, quillEditor, install }
