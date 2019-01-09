<template>
<div class="editor">
  <NineEditor :content="content"></NineEditor>
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
      content: '<span>aaa</span>'
    }
  }
}
</script>

<style scoped>

</style>
