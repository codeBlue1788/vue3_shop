<template>
  <div style="width: 100%; height: 100%">
    <el-button type="primary" @click="openDialog">新增午餐選項</el-button>
    <el-calendar>
      <template #dateCell="{ data }">
        <div
          class="calendar-item"
          style="width: 100%; height: 100%"
          @click="checkDate(data.day)"
        >
          <div class="calendar-time">
            {{ data.day.split("-").slice(2).join("") }}
          </div>
          <div>
            <span
              class="remark-text calendar-time"
              v-for="(item, index) in dealMyDate(data.day)"
              :key="index"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </template>
    </el-calendar>
  </div>
  <lunch-dialog :controller="controller" @handleDialog="handleDialog" />
</template>

<script setup>
import { get, set } from "lodash";
import { reactive, ref } from "vue";
import LunchDialog from "@/views/LunchDialog.vue";

let controller = reactive({ isOpen:false });
const openDialog = ()=>{
  controller.isOpen = true;
}

const resDate = reactive([
  { date: "2022-07-30", content: "自助餐" },
  { date: "2022-08-02", content: "涼麵" },
  { date: "2022-07-02", content: "早餐店" },
  { date: "2022-07-24", content: "便當" },
  { date: "2022-07-25", content: "拉麵" },
  { date: "2022-07-26", content: "水餃" },
  { date: "2022-07-27", content: "牛肉麵" },
  { date: "2022-07-28", content: "火鍋" },
]);
const dealMyDate = (v) => {
  let res = "";
  for (let index = 0; index < resDate.length; index++) {
    if (resDate[index].date == v) {
      res = resDate[index].content;
      break;
    }
  }
  return res;
};

function checkDate(val) {
  const data = resDate.find((e) => e.date == val);
  console.log(data.content);
}

function handleDialog(isOpen){
  controller.isOpen = isOpen
}
</script>

<style>
.remark-text {
  font-size: 15px;
  font-family: "Times New Roman", Times, serif;
  color: tomato;
}
.calendar-item {
  flex-direction: column;
}
.calendar-time {
  height: 16px;
  line-height: 16px;
}
</style>
