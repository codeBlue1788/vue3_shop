<template>
  <span>
    <h1>Menu管理</h1>
  </span>
  <br />
  <span> {{ user.id }} - {{ user.username }} </span>
  <hr />
  <br />
  <el-button type="primary" @click="handleDialog(true, false)"
    >新增Menu</el-button
  >
  <br />
  <el-table
    :data="tableData"
    :border="parentBorder"
    style="width: 70%"
    @row-click="handleRowClick"
  >
    <el-table-column type="expand">
      <template #default="props">
        <el-table
          :data="props.row.subMenus"
          :border="childBorder"
          @row-click="handleRowClick"
        >
          <el-table-column label="MenuName" prop="name" />
          <el-table-column label="Menu名稱" prop="title" />
          <el-table-column label="Menu路徑" prop="path" />
          <el-table-column label="啟用" prop="enable" />
        </el-table>
      </template>
    </el-table-column>
    <el-table-column label="MenuName" prop="name" />
    <el-table-column label="Menu名稱" prop="title" />
    <el-table-column label="啟用" prop="enable" />
  </el-table>

  <MenuDialog
    ref="menuDialogRef"
    @submitFormData="submitFormData"
    @handleDialog="handleDialog"
    :parentSelectors="parentSelectors"
    :menuData="menuData"
    :controller="controller"
  />
</template>

<script setup>
import MenuDialog from "@/views/MenuDialog.vue";
import { reactive, computed, ref, onMounted } from "vue";
import { userStore } from "@/store/userStore";
import { storeToRefs } from "pinia";
import menuAPI from "@/api/menuAPI";


const parentBorder = ref(false);
const childBorder = ref(false);

const parentSelectors = reactive([]);
const tableData = reactive([]);

onMounted(async () => {
  const selecotrResult = await menuAPI.getParents();
  const menusResult = await menuAPI.getMenus();
  selecotrResult.restData.forEach((e) => {
    parentSelectors.push(e);
  });
  menusResult.restData.forEach((e) => {
    tableData.push(e);
  });
});

const store = userStore();
const { user } = storeToRefs(store);

// 通過ref獲取DOM
const menuDialogRef = ref();

let controller = reactive({
  isEdit: false,
  isOpen: false,
});

let menuData = reactive({});
const handleRowClick = (row) => {
  Object.assign(menuData, row);
  handleDialog(true, true);
};

// 調用子組件方法
// 打開dialog
function handleDialog(isOpen, isEdit) {
  // menuDialogRef.value.openDialog();
  controller.isOpen = isOpen;
  controller.isEdit = isEdit;
  if (!isEdit) {
    Object.assign(menuData, {
      name: "",
      path: "",
      parent: "",
      parentSelect: "",
      title: "",
      enable: false,
      type: "",
    });
  }
}

// 提交表單
async function submitFormData(formData) {
  await menuAPI.saveMenu(formData);
}
</script>
<style scoped></style>
