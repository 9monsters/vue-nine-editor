<template>
<div class="main">
  <NineEditor ref="myTextEditor"
                v-model="content"
                :options="editorOption"
              :uploadConfig="uploadConfig"
                @blur="onEditorBlur($event)"
                @focus="onEditorFocus($event)"
                @ready="onEditorReady($event)">
  </NineEditor>
</div>
</template>

<script>
import NineEditor from '@/Editor.vue'

export default {
  name: 'App',
  components: {
    NineEditor
  },
  data () {
    return {
      content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
      editorOption: {
        debug: 'error',
        modules: {
          toolbar: [

          ]
        }
      },
      uploadConfig: {
        action: '112233'
      }
    }
  },
  methods: {
    onEditorBlur (editor) {
      console.log('editor blur!', editor)
    },
    onEditorFocus (editor) {
      console.log('editor focus!', editor)
    },
    onEditorReady (editor) {
      console.log('editor ready!', editor)
    }
  },
  computed: {
    editor () {
      return this.$refs.myTextEditor.quill
    }
  },
  mounted () {
    console.log('this is my editor', this.editor)
    setTimeout(() => {
      this.content = `<h1 class="ql-align-center"></h1>`
    }, 1300)
  }
}
</script>

<style scoped>

</style>
