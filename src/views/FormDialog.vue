<template>
  <el-dialog
    :title="dialogHandler.title"
    :model-value="dialogHandler.switchDialog"
    width="50%"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :show-close="false"
  >
    <slot name="content"></slot>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";

const props = defineProps({
  dialogHandler: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
