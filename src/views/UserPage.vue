<template>
  <el-form ref="search" :model="form" label-position="right">
    <el-row>
      <el-col :span="6">
        <el-form-item label="使用者ID" prop="id">
          <el-input v-model="form.id" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="使用者姓名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="性別" prop="sex">
          <el-select v-model="form.sex" placeholder="選擇性別" clearable>
            <el-option label="男" value="male" />
            <el-option label="女" value="female" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="searchUser">Search</el-button>
      </el-col>
    </el-row>
  </el-form>
  <PageTable ref="pageTable" :tableBase="tableBase" />
</template>

<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import userAPI from "@/api/userAPI";
import qs from "qs";
import TableBase from "@/views/TableBase";
import PageTable from "@/views/PageTable.vue";

const btns = [
  {
    type: "primary",
    width: "10px",
    name:"編輯",
    onClick: (row) => {
      console.log(row);
    },
  },
];

const tableBase = new TableBase(
  userAPI.queryUserPage,
  [],
  btns,
  {},
  { stripe: false }
);

const form = reactive({
  id: "",
  name: "",
  sex: "",
});
const searchUser = () => {};
// const seachUser = async () => {
//   const conditions = addAllCondition(form);
//   const result = await getData(userAPI.queryUserPage, 1, pageSize, form);
//   resetTableData(result);
// };

// onMounted(async () => {
//   const result = await getData(userAPI.queryUserPage, 1, pageSize, form);
//   resetTableData(result);
// });

// const handleEdit = (index, row) => {
//   console.log(index, row);
// };
// const handleDelete = (index, row) => {
//   console.log(index, row);
// };

// const tableData = reactive({
//   total: 0,
//   datas: [],
// });
// const pageSize = 5;
// const handleCurrentChange = async (currentPage) => {
//   const result = await getData(
//     userAPI.queryUserPage,
//     currentPage,
//     pageSize,
//     form
//   );
//   resetTableData(result);
// };

// const resetTableData = (result) => {
//   tableData.datas.splice(0);
//   result.data.forEach((e) => {
//     tableData.datas.push(e);
//   });
//   tableData.total = result.total;
// };

// const getData = async (api, page, pageSize, model, sort) => {
//   const conditions = addAllCondition(model);
//   const queryObject = getQueryObject(page, pageSize, conditions, sort);
//   const queryString = parseQueryString(queryObject);
//   const result = await api(queryString);
//   return parseResult(result);
// };

// const addAllCondition = (model) => {
//   const conditions = [];
//   const keys = Object.keys(model);
//   keys.forEach((key) => {
//     let value = null;
//     if (model[key] instanceof Date) {
//       value = moment(model[key]).format("YYYY-MM-DD HH:mm:ss.SSS");
//     } else {
//       value = model[key];
//     }

//     if (key != null && value != null) {
//       conditions.push({ key, value });
//     }
//   });
//   return conditions;
// };

// const parseQueryString = (queryObject) => {
//   const qStr = qs.stringify(queryObject, { encodeValuesOnly: true });
//   return qStr.replace(/\[[0-9*]\]/g, "");
// };

// const parseResult = (result) => {
//   return {
//     data: result.restData.content,
//     total: result.restData.totalElements,
//   };
// };

// const getQueryObject = (currentPage, size, conditions, sort) => {
//   const queryObject = {
//     page: currentPage - 1,
//     size,
//   };
//   conditions.forEach((condition) => {
//     queryObject[condition.key] = condition.value;
//   });
//   if (sort != null) {
//     const direction = sort.order === "descending" ? "DESC" : "ASC";
//     queryObject.sort = `${sort.prop},${direction}`;
//   }
//   return queryObject;
// };
</script>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 20px;
}
</style>
