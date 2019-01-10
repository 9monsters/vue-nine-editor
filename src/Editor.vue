<template>
  <div class="editor">
    <slot name="toolbar"></slot>
    <div ref="editor"></div>
    <div id="nq-counter"></div>
  </div>
</template>

<script>
// require sources
import Quill from 'quill'

import merge from 'lodash.merge'
import defaultOptions from './options'

export default {
  name: 'NineEditor',
  data () {
    return {
      dataOptions: {},
      dataContent: '',
      defaultOptions
    }
  },
  props: {
    value: String,
    disabled: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      required: false,
      default: () => ({})
    },
    globalOptions: {
      type: Object,
      required: false,
      default: () => ({})
    }
  },
  mounted () {
    this.initialize()
  },
  beforeDestroy () {
    this.quill = null
    delete this.quill
  },
  methods: {
    // Init Quill instance
    initialize () {
      if (this.$el) {
        // Options
        this.dataOptions = merge({}, this.defaultOptions, this.globalOptions, this.options)
        // Instance
        this.quill = new Quill(this.$refs.editor, this.dataOptions)

        this.quill.enable(false)
        // Set editor content
        if (this.value || this.content) {
          this.quill.pasteHTML(this.value || this.content)
        }
        // Disabled editor
        if (!this.disabled) {
          this.quill.enable(true)
        }
        // Mark model as touched if editor lost focus
        this.quill.on('selection-change', range => {
          if (!range) {
            this.$emit('blur', this.quill)
          } else {
            this.$emit('focus', this.quill)
          }
        })
        // Update model if text changes
        this.quill.on('text-change', (delta, oldDelta, source) => {
          let html = this.$refs.editor.children[0].innerHTML
          const quill = this.quill
          const text = this.quill.getText()
          if (html === '<p><br></p>') html = ''
          this.dataContent = html
          this.$emit('input', this.dataContent)
          this.$emit('change', { html, text, quill })
        })
        // Emit ready event
        this.$emit('ready', this.quill)
      }
    }
  },
  watch: {
    // Watch content change
    value (newVal, oldVal) {
      if (this.quill) {
        if (newVal && newVal !== this.dataContent) {
          this.dataContent = newVal
          this.quill.pasteHTML(newVal)
        } else if (!newVal) {
          this.quill.setText('')
        }
      }
    },
    // Watch disabled change
    disabled (newVal, oldVal) {
      if (this.quill) {
        this.quill.enable(!newVal)
      }
    }
  }
}
</script>
<style lang="less">
  @import '~quill/dist/quill.core.css';
  @import '~quill/dist/quill.snow.css';
  @import '~quill/dist/quill.bubble.css';

  @import 'styles/color';

  .editor {
  }
  #nq-counter {
    border-bottom: 1px solid @sec_text_color;
    border-right: 1px solid @sec_text_color;
    border-left: 1px solid @sec_text_color;
    color: #aaa;
    padding: 5px 15px;
    text-align: right;
    font: icon;
  }
</style>
