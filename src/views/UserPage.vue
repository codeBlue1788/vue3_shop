<template>
  <el-form ref="search" :model="form" label-position="right">
    <el-row>
      <el-col :span="6">
        <el-form-item :label="$t('user.userId')" prop="id">
          <el-input v-model="form.id" clearable />
        </el-form-item>
      </el-col>
      <el-col :span="6">
        <el-form-item :label="$t('user.userName')" prop="username">
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
    <el-row>
      <el-col :span="6">
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action=""
          multiple
          :http-request="handlePreview"
          :limit="3"
          :on-exceed="handleExceed"
        >
          <el-button type="primary">Click to upload</el-button>
          <template #tip>
            <div class="el-upload__tip">
              jpg/png files with a size less than 500KB.
            </div>
          </template>
        </el-upload>
      </el-col>
    </el-row>
  </el-form>
  <PageTable
    ref="pageTableRef"
    :tableBase="tableBase"
    @row-click="handleRowClick"
  />
  <FormDialog ref="formDialog" :dialogHandler="dialogHandler">
    <template #content>
      <el-form ref="formData" :model="formModel" label-position="top">
        <el-row>
          <el-col :span="8">
            <el-form-item label="名稱" prop="name">
              <el-input v-model="formModel.name" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </template>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submit">送出</el-button>
        <el-button @click="closeDialog">關閉</el-button>
      </span>
    </template>
  </FormDialog>
</template>

<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import userAPI from "@/api/userAPI";
import qs from "qs";
import TableBase from "@/views/TableBase";
import PageTable from "@/views/PageTable.vue";
import FormDialog from "@/views/FormDialog.vue";
import FileUtils from "@/utils/FileUtils";
import * as XLSX from "xlsx";

const dialogHandler = reactive({
  title: "This is Test",
  switchDialog: false,
});

const fileList = reactive([]);
const handlePreview = async (file) => {
  // 解析檔案內容
  const getFile = await FileUtils.getArrayBufferData(file.file);
  // 將檔案轉換成可閱讀的格式
  const workbook = XLSX.read(getFile.fileData, {
    type: "array",
  });
  const sheetname = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetname];
  const rowData = XLSX.utils.sheet_to_json(sheet);
};
const handleExceed = () => {};

const form = reactive({
  id: "",
  name: "",
  sex: "",
});

const formModel = reactive({
  name: "",
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
      openDialog(row);
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

function openDialog(row) {
  console.log(row);
  dialogHandler.switchDialog = true;
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

const submit = () => {};
const closeDialog = () => {
  console.log(formModel.name);
  dialogHandler.switchDialog = false;
};
</script>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 20px;
}
</style>
