import _Quill from 'quill'
import nineEditor from './Editor.vue'

const Quill = window.Quill || _Quill
const install = (Vue, globalOptions) => {
  if (globalOptions) {
    nineEditor.props.globalOptions.default = () => globalOptions
  }
  Vue.component(nineEditor.name, nineEditor)
}

const NineEditor = { Quill, nineEditor, install }

export default NineEditor
export { Quill, nineEditor, install }
