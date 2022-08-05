<template>
  <el-table
    ref="pageTable"
    :data="tableData.datas"
    :style="tableBase.tableControl.style"
    :stripe="tableBase.tableControl.stripe"
    :highlight-current-row="tableBase.tableControl.highlightCurrentRow"
    @sort-change="handleSortChange"
    @row-click="handleRowClick"
  >
    <el-table-column
      v-for="(column, index) in tableBase.columns"
      :key="index"
      :label="column.label"
      :prop="column.prop"
      :width="column.width"
      :sortable="column.sortable"
      :show-overflow-tooltip="
        column.showOverflowTooltip != null ? column.showOverflowTooltip : false
      "
    >
      <template #default="scope">
        <span v-if="column.render">{{
          column.render(scope.row[column.prop])
        }}</span>
        <span v-else>{{ scope.row[column.prop] }}</span>
      </template>
    </el-table-column>
    <el-table-column align="right">
      <template v-if="tableBase.tableControl.showHeader" #header>
        <el-input
          v-model="searchForm.name"
          size="small"
          placeholder="Type to search"
        />
      </template>
      <template v-if="tableBase.btns" #default="scope">
        <el-button
          v-for="(btn, index) in tableBase.btns"
          :key="index"
          :size="btn.size"
          :type="btn.type"
          :disabled="btn.disabled ? btn.disabled(scope.row) : false"
          @click.stop="btn.onClick(scope.row)"
          >{{ btn.name }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-col style="text-align: center">
    <el-pagination
      v-model:currentPage="currentPageVal"
      :page-size="pageSize"
      :pager-count="pagerCount"
      :total="tableData.total"
      background
      layout="prev, pager, next"
      text-align="center"
      @current-change="handleCurrentChange($event)"
    />
  </el-col>
</template>

<script setup>
import { computed, reactive, ref, onMounted } from "vue";
import { userStore } from "@/store/userStore";
import { storeToRefs } from "pinia";

import qs from "qs";

// defineProp 接收tableBase
const props = defineProps({
  tableBase: {
    type: Object,
    required: true,
  },
});

//
const tableData = reactive({
  total: 0,
  datas: [],
});

// 初始化PageTable
onMounted(async () => {
  const result = await getData(
    props.tableBase.api,
    1,
    pageSize,
    props.tableBase.searchModel
  );
  resetTableData(result);
});

const searchForm = reactive({
  name: "",
});

const handleSortChange = (sortObject) => {
  console.log(sortObject);
};

const emit = defineEmits(["row-click"]);
const handleRowClick = (row, column, event) => {
  emit("row-click", row, column, event);
};

// EL-Pagination
/**
 * 從store取得
 */
const store = userStore();
const { userPrefer } = storeToRefs(store);

const currentPageVal = ref(1);
const pagerCount = userPrefer.value.pagerCount;
const pageSize = userPrefer.value.pageSize;
const handleCurrentChange = async (currentPage) => {
  const result = await getData(
    props.tableBase.api,
    currentPage,
    pageSize,
    props.tableBase.searchModel
  );
  resetTableData(result);
};

const getData = async (api, page, pageSize, model, sort) => {
  const conditions = addAllCondition(model);
  const queryObject = getQueryObject(page, pageSize, conditions, sort);
  const queryString = parseQueryString(queryObject);
  const result = await api(queryString);
  return parseResult(result);
};

const addAllCondition = (model) => {
  const conditions = [];
  const keys = Object.keys(model);
  keys.forEach((key) => {
    let value = null;
    if (model[key] instanceof Date) {
      value = moment(model[key]).format("YYYY-MM-DD HH:mm:ss.SSS");
    } else {
      value = model[key];
    }

    if (key != null && value != null) {
      conditions.push({ key, value });
    }
  });
  return conditions;
};

const parseQueryString = (queryObject) => {
  const qStr = qs.stringify(queryObject, { encodeValuesOnly: true });
  return qStr.replace(/\[[0-9*]\]/g, "");
};

const parseResult = (result) => {
  return {
    data: result.restData.content,
    total: result.restData.totalElements,
  };
};

const getQueryObject = (currentPage, size, conditions, sort) => {
  const queryObject = {
    page: currentPage - 1,
    size,
    sort: "",
  };
  conditions.forEach((condition) => {
    queryObject[condition.key] = condition.value;
  });
  if (sort != null) {
    const direction = sort.order === "descending" ? "DESC" : "ASC";
    queryObject.sort = `${sort.prop},${direction}`;
  }
  return queryObject;
};

const resetTableData = (result) => {
  tableData.datas.splice(0);
  result.data.forEach((e) => {
    tableData.datas.push(e);
  });
  tableData.total = result.total;
};

const searchTable = async (searchModel) => {
  Object.assign(props.tableBase.searchModel, searchModel);
  const result = await getData(
    props.tableBase.api,
    1,
    pageSize,
    props.tableBase.searchModel
  );
  resetTableData(result);
  currentPageVal.value = 1;
};

// 對外暴露父元件可以直接調用PageTable的方法
defineExpose({ searchTable });
</script>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 20px;
}
</style>
