<template>
  <el-table
    ref="pageTable"
    :data="tableData.datas"
    style="width: 100%"
    @sort-change="handleSortChange"
  >
    <el-table-column
      v-for="(column, index) in tableBase.columns"
      :key="index"
      :label="column.label"
      :prop="column.prop"
      :width="column.width"
      :show-overflow-tooltip="
        column.showOverflowTooltip != null ? column.showOverflowTooltip : false
      "
      @row-click="handleRowClick"
    >
      <template #default="scope">
        <span>{{ scope.row[column.prop] }}</span>
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
          @click.stop="btn.onClick(scope.row)"
          >{{ btn.name }}</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <el-col style="text-align: center">
    <el-pagination
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
import qs from "qs";

// defineProp
const props = defineProps({
  tableBase: {
    type: Object,
    required: true,
  },
});
console.log(props.tableBase);
const tableData = reactive({
  total: 0,
  datas: [],
});
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
const pagerCount = 5;
const pageSize = 5;
const handleCurrentChange = async (currentPage) => {
  const result = await getData(
    tableBase.api,
    currentPage,
    pageSize,
    searchModel
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
</script>

<style scoped>
.el-pagination {
  justify-content: center;
  margin-top: 20px;
}
</style>
