<template>
  <div>
    <el-dialog
      :model-value="controller.isOpen"
      title="新增Lunch"
      width="50%"
      @close="closeDialog"
    >
      <span>
        <h1>新增Lunch</h1>
      </span>
      <br />
      <hr />
      <br />
      <el-form ref="formData" :rules="rules" :model="form" label-position="top">
        <el-row>
          <el-col :span="8">
            <el-form-item label="餐廳名稱" prop="name">
              <el-input v-model="form.name" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="評分" prop="rate">
              <el-rate
                v-model="form.rate"
                :texts="['oops', 'disappointed', 'normal', 'good', 'great']"
                show-text
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="類型" prop="type">
              <el-select v-model="form.type" placeholder="選擇類型" clearable>
                <el-option
                  v-for="(item, index) in typeSelector"
                  :key="index"
                  :label="item.name"
                  :value="item.name"
                />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row style="margin-top: 20px">
          <el-col :span="8">
            <el-form-item label="備註" prop="memo">
              <el-input v-model="form.memo" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="名單所有人" prop="owner">
              <el-select v-model="form.owner" placeholder="選擇名單所有人">
                <el-option label="JieJie" value="JieJie" />
                <el-option label="強尼" value="johnny" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
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
  lunchData: Object,
  controller: Object,
});

const typeSelector = [{ name: "早餐" }, { name: "麵" }];

// do not use same name with ref
const form = reactive({
  name: "",
  rate: 0,
  type: "",
  memo: "",
  owner: "",
});

watchEffect(() => {
  // 只能監聽到屬性，不能監聽物件的變化
  console.log(form.rate);
});

// 可以監聽整個物件 當發生變化會callback
// watch(props.menuData, (newVal) => {
//   Object.assign(form, newVal);
// });

// 表單驗證
const formData = ref();
const rules = reactive({
  name: [{ required: true, message: "請輸入routerName", trigger: "change" }],
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
};

// 關閉dialog
const closeDialog = () => {
  emit("handleDialog", false);
  clear();
};
// 對外暴露子組件
defineExpose({ clear });
</script>

<style scoped></style>
