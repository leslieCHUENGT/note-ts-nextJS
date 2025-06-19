# 使用 Node.js 基础镜像
FROM node:22.15.0

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json 到工作目录
COPY pnpm-lock.yaml package.json ./

# 安装 pnpm
RUN npm install -g pnpm

# 安装项目依赖
RUN pnpm install

# 复制项目文件到工作目录
COPY . .

# 构建 Next.js 应用
RUN pnpm run build

# 暴露应用运行的端口
EXPOSE 3000

# 启动 Next.js 应用
CMD ["pnpm", "start"]