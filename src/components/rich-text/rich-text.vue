<!-- CodeEditor.vue -->
<template>
  <div :class="{ fullscreen: isFullScreen }" class="rich-text" :style="{ 'height': height || '300px' }">
    <el-button v-if="!isFullScreen" @click="toggleFullScreen" class="fullscreen-btn" text type="primary">
      <el-icon>
        <FullScreen/>
      </el-icon>
    </el-button>
    <el-button v-else @click="toggleFullScreen" class="fullscreen-btn" plain type="primary">
      <el-icon>
        <Close/>
      </el-icon>
    </el-button>

    <Codemirror
        v-model="textContent"
        :extensions="extensions"
        :theme="oneDark"
    />
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref, watch} from 'vue'
import {Codemirror} from 'vue-codemirror'
import {oneDark} from '@codemirror/theme-one-dark'
import {java} from '@codemirror/lang-java'
import {markdown} from '@codemirror/lang-markdown'
import {yaml} from '@codemirror/lang-yaml'
import {EditorView} from "@codemirror/view";
import {json} from "@codemirror/lang-json";
import {FullScreen, Close} from '@element-plus/icons-vue'
import {linter, lintGutter} from "@codemirror/lint";

type TextType = 'java' | 'markdown' | 'yaml' | 'json'


const props = defineProps<{
  textType?: TextType,
  content: string,
  height?: string,
  lineWrapping?: boolean
  editable?: boolean
}>()

const textContent = ref('')
function jsonSyntaxLinter(view) {
  let diagnostics = []
  try {
    JSON.parse(view.state.doc.toString())
  } catch (e) {
    diagnostics.push({
      from: 0,
      to: view.state.doc.length,
      severity: "error",
      message: e.message,
      source: "json"
    })
  }
  return diagnostics
}

const jsonLinter = linter(jsonSyntaxLinter)

const extensions = computed(() => {
  const extensions = []
  switch (props.textType) {
    case 'java':
      extensions.push(java())
      break
    case 'markdown':
      extensions.push(markdown())
      break
    case 'yaml':
      extensions.push(yaml())
      break
    case 'json':
      extensions.push(json())
      extensions.push(jsonLinter)
      extensions.push(lintGutter())
      break
    default:
  }

  if (!props.editable) {
    extensions.push(EditorView.editable.of(false))
  }
  if (props.lineWrapping) {
    extensions.push(EditorView.lineWrapping)
  }

  return extensions
})

const isFullScreen = ref(false)

function toggleFullScreen() {
  isFullScreen.value = !isFullScreen.value
}

watch(
    () => props.content,
    (newContent) => textContent.value = newContent
)

defineExpose({textContent})

onMounted(() => {
  textContent.value = props.content
})
</script>

<style scoped>
select {
  padding: 4px 8px;
  font-size: 14px;
}

.rich-text {
  overflow: scroll;
  border: 1px solid var(--el-color-primary-light-7); /* 蓝色边框 */
  border-radius: 8px; /* 圆角 */
  box-shadow: 0 4px 8px var(--el-color-primary-light-9); /* 轻微蓝色阴影 */
  padding: 8px; /* 内边距 */
  transition: border-color 0.3s ease;

  position: relative;
}

/* CodeMirror 6 行号容器的 class */
:deep(.cm-scroller .cm-gutters) {
  display: none !important;
  width: 0 !important;
  min-width: 0 !important;
  padding: 0 !important;
  margin: 0 !important;
}


/* 全屏时样式 */
.fullscreen {
  position: fixed !important;
  top: 0;
  left: 0;
  width: 100vw !important;
  height: 100vh !important;
  z-index: 9999;
  background: var(--el-bg-color);
  color: var(--el-color-primary);
  padding: 16px !important;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
}

/* 全屏时，编辑器撑满容器 */
.fullscreen .cm-editor {
  flex-grow: 1;
  height: auto !important;
  min-height: 0 !important;
}

/* 按钮样式 */
.fullscreen-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  z-index: 1000;
  padding: 6px 12px;
}
</style>
