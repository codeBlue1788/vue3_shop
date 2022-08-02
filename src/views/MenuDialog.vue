<template>
  <div>
    <el-dialog
      :model-value="controller.isOpen"
      title="新增Menu"
      width="50%"
      @close="closeDialog"
    >
      <span>
        <h1>Menu管理</h1>
      </span>
      <br />
      <hr />
      <br />
      <el-form ref="formData" :rules="rules" :model="form" label-position="top">
        <el-row>
          <el-col :span="8">
            <el-form-item label="Menu router name" prop="name">
              <el-input v-model="form.name" :disabled="controller.isEdit" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Menu路徑" prop="path">
              <el-input v-model="form.path" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Menu母路徑" prop="parent">
              <el-input
                v-model="form.parent"
                clearable
                :disabled="parentController == 1 ? true : false"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item prop="parentSelect">
              <el-select
                v-model="form.parentSelect"
                placeholder="選擇母路徑"
                :disabled="parentController == 2 ? true : false"
                clearable
              >
                <el-option
                  v-for="(item, index) in props.parentSelectors"
                  :key="index"
                  :label="item.title"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="8">
            <el-form-item label="Menu名稱" prop="title">
              <el-input v-model="form.title" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="Menu類型" prop="type">
              <el-select v-model="form.type" placeholder="選擇類型">
                <el-option label="母路徑" value="menu" />
                <el-option label="子路徑" value="subMenu" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item :label="enableTitle" prop="enable">
          <el-switch v-model="form.enable" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="onSubmit">送出</el-button>
          <el-button @click="clear">清除</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { reactive, computed, ref, watchEffect, watch } from "vue";

const props = defineProps({
  parentSelectors: Array,
  menuData: Object,
  controller: Object,
});
const menuData = reactive(props.menuData);

watchEffect(() => {
  // 只能監聽到屬性，不能監聽物件的變化
});

// 可以監聽整個物件 當發生變化會callback
watch(props.menuData, (newVal) => {
  Object.assign(form, newVal);
});

// 表單驗證
const formData = ref();
const rules = reactive({
  name: [{ required: true, message: "請輸入routerName", trigger: "change" }],
});

const enableTitle = computed(() => {
  return form.enable ? "啟用" : "停用";
});

const parentController = computed(() => {
  if (form.parent && form.parent.trim() !== "") {
    return 2;
  } else if (form.parentSelect && form.parentSelect.trim() !== "") {
    return 1;
  } else {
    return 0;
  }
});

// do not use same name with ref
const form = reactive({
  name: "",
  path: "",
  parent: "",
  parentSelect: "",
  title: "",
  enable: false,
  type: "",
});

const emit = defineEmits(["submitFormData", "handleDialog"]);

const onSubmit = async () => {
  //驗證
  let isValid = false;
  await formData.value.validate((valid) => {
    if (valid) {
      isValid = true;
    }
  });
  if (isValid) {
    // 回傳父元件打API送出
    if(form.parentSelect && form.parentSelect.trim() !== ""){
      form.parent = form.parentSelect;
    }
    emit("submitFormData", form);
    // 清除表單數據
    clear();
    // 關閉Dialog
    closeDialog();
  }
};

const clear = () => {
  // 清除校驗
  formData.value.resetFields();
  console.log(props.controller.isEdit);
  if (!props.controller.isEdit) {
    form.name = "";
  }
  form.path = "";
  form.parent = "";
  form.parentSelect = "";
  form.title = "";
  form.enable = false;
  form.type = "";
};

// 關閉dialog
const closeDialog = () => {
  emit("handleDialog", false, false);
  clear();
};
// 對外暴露子組件
defineExpose({ clear });
</script>

<style scoped></style>
