<template>
  <el-row style="width: 100%; height: 100%">
    <el-col :span="24" style="width: 100%; min-height: 100%">
      <el-menu
        active-text-color="#ffd04b"
        background-color="#545c64"
        class="el-menu-vertical-trader"
        default-active="2"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :router="true"
      >
        <template v-for="(menu, index) in menus" :key="index">
          <el-sub-menu :index="`${index}`">
          <template #title>
            <el-icon><setting /></el-icon>
            <span>{{menu.title}}</span>
          </template>
          <template v-for="(menu, subIndex) in menu.subMenus" :key="subIndex">
            <el-menu-item :index="menu.path">{{menu.title}}</el-menu-item>
          </template>
          </el-sub-menu>
        </template>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import { reactive, toRefs, ref, onMounted } from "vue";
import menuAPI from "@/api/menuAPI";



let menus = reactive([]);

onMounted(async () => {
  const result = await menuAPI.getMenus();
  result.restData.forEach(e => menus.push(e))
});

function handleOpen(key, keyPath) {
}
function handleClose(key, keyPath) {
}
</script>

<style scoped>
.el-menu-vertical-trader {
  background-color: #545c64;
  height: 100vh;
  overflow-y: auto;
  color: #fff;
}
</style>
