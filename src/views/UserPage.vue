<template>
  <el-form ref="search" :model="form" label-position="right">
    <el-row>
      <el-col :span="6">
        <el-form-item label="使用者ID" prop="id">
          <el-input v-model="form.id" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item label="使用者姓名" prop="username">
          <el-input v-model="form.username" clearable />
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
  <PageTable
    ref="pageTableRef"
    :tableBase="tableBase"
    @row-click="handleRowClick"
  />
</template>

<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import userAPI from "@/api/userAPI";
import qs from "qs";
import TableBase from "@/views/TableBase";
import PageTable from "@/views/PageTable.vue";

const form = reactive({
  id: "",
  name: "",
  sex: "",
});

const pageTableRef = ref();

// 傳入子元件的函式內只能調用父元件的方法
// 若要調用子元件內的方法要用ref.value的方式調用
const btns = [
  {
    type: "primary",
    name: "編輯",
    onClick: (row) => {
      console.log(row);
      test();
    },
  },
  {
    type: "danger",
    name: "刪除",
    onClick: (row) => {
      console.log(row);
    },
    disabled: (val) => (val.sex == "Female" ? true : false),
  },
];

function test() {
  console.log("我被調用了");
}

const handleRowClick = (val) => {
  console.log("父元件收到了", val);
};

const columns = [
  {
    label: "使用者ID",
    prop: "id",
    width: "200px",
    sortable: true,
  },
  {
    label: "使用者密碼",
    prop: "password",
    width: "200px",
    sortable: true,
  },
  {
    label: "使用者姓名",
    prop: "username",
    width: "200px",
    sortable: true,
  },
  {
    label: "性別",
    prop: "sex",
    width: "200px",
    sortable: true,
    render: (val) => {
      if (val && val == "male") {
        return "男";
      }
      if (val && val == "Female") {
        return "女";
      }
      return val;
    },
  },
  {
    label: "email",
    prop: "email",
    width: "200px",
    sortable: true,
  },
];

const tableBase = new TableBase(userAPI.queryUserPage, columns, btns, form, {
  stripe: false,
});

const searchUser = () => {
  pageTableRef.value.searchTable(form);
};
</script>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 20px;
}
</style>
