<template>
  <div>
    <el-result
      icon="warning"
      title="404 Page Not Found"
      sub-title="頁面遺失了..."
    >
      <template #extra>
        <el-button type="primary" @click="$router.push('/')">回到首頁</el-button>
      </template>
    </el-result>
  </div>
</template>
