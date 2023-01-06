<template>
  <div style="margin-top: 20px">
    <el-radio-group v-model="mode" size="small" @change="changeModel">
      <el-radio-button label="light">浅色</el-radio-button>
      <el-radio-button label="dark">暗黑</el-radio-button>
      <el-radio-button label="auto">跟随系统</el-radio-button>
    </el-radio-group>
  </div>
  <div>主题颜色: <el-color-picker v-model="themeColor" @change="changeTheme"/></div>
  <el-container>
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-container>
        <el-main class="main">Main</el-main>
        <el-footer class="footer">Footer</el-footer>
      </el-container>
    </el-container>
  </el-container>
  <el-row class="mb-4">
    <el-button>Default</el-button>
    <el-button type="primary">Primary</el-button>
    <el-button type="success">Success</el-button>
    <el-button type="info">Info</el-button>
    <el-button type="warning">Warning</el-button>
    <el-button type="danger">Danger</el-button>
  </el-row>
  <el-row>
    <el-col :sm="12" :lg="6">
      <el-result
        icon="success"
        title="Success Tip"
        sub-title="Please follow the instructions"
      >
        <template #extra>
          <el-button type="primary">Back</el-button>
        </template>
      </el-result>
    </el-col>
    <el-col :sm="12" :lg="6">
      <el-result
        icon="warning"
        title="Warning Tip"
        sub-title="Please follow the instructions"
      >
        <template #extra>
          <el-button type="primary">Back</el-button>
        </template>
      </el-result>
    </el-col>
    <el-col :sm="12" :lg="6">
      <el-result
        icon="error"
        title="Error Tip"
        sub-title="Please follow the instructions"
      >
        <template #extra>
          <el-button type="primary">Back</el-button>
        </template>
      </el-result>
    </el-col>
    <el-col :sm="12" :lg="6">
      <el-result icon="info" title="Info Tip">
        <template #sub-title>
          <p>Using slot as subtitle</p>
        </template>
        <template #extra>
          <el-button type="primary">Back</el-button>
        </template>
      </el-result>
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { ipcRenderer } from "electron";
import { onBeforeMount, ref } from "vue";
import { useElementPlusTheme } from "./hooks/useElementPlusTheme";
const mode = useColorMode({
  emitAuto: true,
  initialValue: "auto",
});
// 监听 Mode 改变
const changeModel = (mode: "light" | "dark" | "auto") => {
  // Electorn的主题模式 auto 为 system 所以需要转换
  ipcRenderer.invoke("dark-mode:change", mode === "auto" ? "system" : mode);
};
onBeforeMount(() => {
  // 通过 ipcRenderer 与主线程通信
  // 获取到App主题 同步到 useColorMode 中
  ipcRenderer.invoke("dark-mode").then((type: "light" | "dark" | "system") => {
    mode.value = type == "system" ? "auto" : type;
  });
});

const themeColor = ref("#409EFF");
const { changeTheme } = useElementPlusTheme(themeColor.value);
</script>

<style>
.header {
  background: var(--el-color-primary);
}
.aside {
  background: var(--el-bg-color-page);
}
.main {
  background: var(--el-bg-color);
}
.footer {
  background: var(--el-bg-color-page);
}
</style>
