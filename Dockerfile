# # 使用 Node.js 基础镜像
# FROM node:22.15.0

# # 设置工作目录
# WORKDIR /app

# # 复制 package.json 和 package-lock.json 到工作目录
# COPY pnpm-lock.yaml package.json ./

# # 安装 pnpm
# RUN npm install -g pnpm

# # 安装项目依赖
# RUN pnpm install

# # 复制项目文件到工作目录
# COPY . .

# # 构建 Next.js 应用
# RUN pnpm run build

# # 暴露应用运行的端口
# EXPOSE 3000

# # 启动 Next.js 应用
# CMD ["pnpm", "start"]


# 构建阶段
FROM node:22.15.0 AS builder

# 安装 pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# 安装所有依赖（包括开发依赖）
RUN pnpm install

COPY . .

# 构建应用
RUN pnpm run build

# 生产阶段
FROM node:22.15.0-slim

# 安装 pnpm
RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

# 只安装生产依赖
RUN pnpm install --prod

# 从构建阶段复制构建结果
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

EXPOSE 3000

CMD ["pnpm", "start"]
