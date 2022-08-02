<template>
  <el-table
    :data="filterTableData"
    style="width: 100%"
    @row-click="hadleRowClick"
  >
    <el-table-column label="Date" prop="date"></el-table-column>
    <el-table-column label="Name" prop="name"></el-table-column>
    <el-table-column align="right">
      <template #header>
        <el-input v-model="search" size="small" placeholder="Type to search" />
      </template>
      <template #default="scope">
        <el-button
          size="small"
          @click.stop="handleClick(scope.$index, scope.row)"
          >Edit</el-button
        >
        <el-button
          size="small"
          type="danger"
          @click.stop="hadleDelete(scope.$index, scope.row)"
          >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <span>{{ result }}</span>
</template>

<script setup>
import { reactive, ref, computed, getCurrentInstance, onMounted } from "vue";
import httpService from "@/service/httpService";
import { Loading } from "@/utils/loading";
import { useRoute } from "vue-router";
const { proxy } = getCurrentInstance();

let result = reactive({})
const route = useRoute();
if (route.params.result) {
  const data = JSON.parse(route.params.result);
  result = reactive(data);
}
// 搜尋框
const search = ref("");

const filterTableData = computed(() => {
  return tableData.filter(
    (data) =>
      !search.value ||
      data.name.toLowerCase().includes(search.value.toLowerCase())
  );
});

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
  },
  {
    date: "2017-05-12",
    name: "Apple",
  },
  {
    date: "2018-06-02",
    name: "Bob",
  },
];

const handleClick = (index, row) => {
  row.name = "dog";
  console.log("edit", row);
  Loading();

  setTimeout(() => {
    Loading().close();
  }, 2000);
};
const hadleDelete = (index, row) => {
  console.log("delete", row);
};

const hadleRowClick = (row) => {
  result.id = "xxx";
  console.log(result);
  console.log(row);
  // row.name = "Cat"
};
</script>
