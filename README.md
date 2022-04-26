
# StudyroomMonorepo

这个项目包括自习室前端及无服务器架构的后端代码。

项目为monorepo,使用Nx作为脚手架，使用Nx社区插件@ns3/nx-serverless作为serverless项目运行的插件，但我对其生成项目进行了一些修改，原因如下：

项目后端部署在Aliyun云函数上，而由于serverless offline我电脑上运行有奇怪的问题，同时没有找到更改其API网关事件源的方法，因此我只有自己模拟Aliyun API网关发送事件的流程，因此我存放后端云函数代码的项目被命名为serverless-studyroom-mocker（后文简称mocker），这是一个模拟云函数运行的环境的项目。

由于mocker项目实际是一个Express项目，因此我将该项目的project.json文件进行了修改，把serverless项目的一部分Nx Command逻辑整合到了一起，因此可以在mocker项目中使用serve运行模拟环境，也可以用deploy指令使用sls进行云函数项目部署。

同时由于后端使用Prisma作为ORM，而Prisma在阿里云云函数容器环境（debian系统为基础的容器）下的Engine有30MB，而阿里云提供的serverless框架插件对于上传超时设置的比较短，因此进行部署时在上传未完成前就超时了，因此需要对插件中超时的配置进行修改，详细修改方法在我的博客上。

## 目标

创建一个自习室平台，用户可以自建自习室，在自习室内实时讨论问题。同时通过插件系统安装不同的插件（例如待完成事项ToDo插件）以满足不同的学习目的。

## 架构

项目前端使用React框架，后端使用云函数作为业务代码载体，前后端之间主要使用GraphQL进行通讯，鉴权使用阿里云API网关提供的JWT验证。

### 前端

项目前端使用了以下框架及库：

- React
- Chakra-UI UI库（类似TailwindCSS，但Chakara-UI我认为更加友好，就是Code IntelliSense比较慢）
- Framer Motion 动画
- avataar 头像库（该库使用的React版本较低后面需要重构一下源码，不然一直报错）
- React Router 路由
- Apollo Client  GraphQL React客户端
- React Icon 图标

### 后端

项目后端需要部署到阿里云云函数服务上，使用serverless作为部署工具。
后端使用了一下框架及库：

- Apollo Server Lambda & Apollo Server Cache Redis （GraphQL服务端）
- Prisma （type-safe ORM框架）
- dotEnv  加载.env文件
- ioredis Redis 客户端

项目后端代码仅为apps/serverless-studyroom-mocker项目src/handlers文件夹下的各个handler，具体的部署配置参考serverless-studyroom-mocker项目下serverless.yml文件中对于函数部署的配置。

#### Mysql数据库

数据库中表的创建及修改由Prisma Cli掌握控制权，如果需要对表改动，则直接在serverless-studyroom-mocker项目下的schema.prisma文件中进行改动，在配置好.env后执行以下命令：

```Typescript
  npx prisma db push
```

而后Prisma就会自动将schema转换为对应的数据库指令，对目标数据库进行修改。

#### Redis

Redis用于对在线用户及活跃房间等热数据进行缓存，同时作为Apollo的数据缓存。

## faker项目

faker项目用于生成简单的随机数据并填充到数据库中，没有任何的优化和设置。
