<template>
  <div class="full-height-width">
    <el-container class="full-height-width">
      <el-container class="body-container">
        <el-aside :class="{ collapse: false }" class="el-aside-custom">
          <c-menu :is-collapse="false"></c-menu>
        </el-aside>
        <el-container class="content-container">
          <el-main class="el-main-custom">
            <router-view />
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import cMenu from '@/views/TheMenu.vue'

export default {
    components:{
        cMenu
    }
}
</script>