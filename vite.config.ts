import path from "path"
import fs from "fs"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import type { Plugin } from 'vite'

// 自定义插件，用于在构建结束后将 index.html 重命名为 popup.html
const renameHtmlPlugin = (): Plugin => {
  return {
    name: 'rename-html',
    apply: 'build',
    closeBundle() {
      const outputDir = path.resolve(__dirname, "dist")
      const oldPath = path.join(outputDir, "index.html")
      const newPath = path.join(outputDir, "popup.html")
      if (fs.existsSync(oldPath)) {
        fs.renameSync(oldPath, newPath)
        console.log("已将 index.html 重命名为 popup.html")
      }
    }
  }
}

// 递归拷贝文件夹函数：将 source 文件夹下的所有内容复制到 target 文件夹中
function copyFolderRecursiveSync(source: string, target: string) {
  // 如果目标文件夹不存在，则创建
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }
  
  // 判断源文件夹是否存在
  if (!fs.existsSync(source)) {
    console.log(`源文件夹 ${source} 不存在`)
    return;
  }
  
  const files = fs.readdirSync(source);
  files.forEach(file => {
    const curSource = path.join(source, file);
    const curTarget = path.join(target, file);
    if (fs.statSync(curSource).isDirectory()) {
      // 如果是目录，则递归调用
      copyFolderRecursiveSync(curSource, curTarget);
    } else {
      // 如果是文件，则直接复制
      fs.copyFileSync(curSource, curTarget);
    }
  });
}

// 自定义插件，用于在构建结束后将 plugin 目录中的所有文件拷贝到 dist
const copyPluginFilesPlugin = (): Plugin => {
  return {
    name: 'copy-plugin-files',
    apply: 'build',
    closeBundle() {
      const sourceDir = path.resolve(__dirname, "plugin")
      const destDir = path.resolve(__dirname, "dist")
      if (fs.existsSync(sourceDir)) {
        copyFolderRecursiveSync(sourceDir, destDir)
        console.log("已将 plugin 目录下的所有文件拷贝到 dist 目录")
      } else {
        console.log("plugin 目录不存在")
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    renameHtmlPlugin(), // 重命名 index.html 为 popup.html
    copyPluginFilesPlugin() // 拷贝 plugin 目录下的所有文件到 dist
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
