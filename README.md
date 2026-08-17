# 七夕情侣纪念网页

这是一个为两个人定制的中文七夕情侣纪念网页。

页面使用淡紫天空、杏粉花枝、月亮、河面和鹊桥作为视觉主线，把相爱天数、恋爱时间线、照片回忆、隐藏情书和最终七夕惊喜串成一段适合手机浏览的纪念故事。

页面采用 PPT 风格的全屏垂直滑动转场，每次滚轮、触摸或键盘操作都会让上一页向上隐藏，下一页从底部向上滑入并覆盖；滑动完成后，标题、正文和卡片会依次淡入。情书区块内部仍通过信封翻盖动画展开正文。

项目使用 Vite + 原生 HTML、CSS 和 JavaScript，不依赖 UI 框架。姓名、日期、照片、时间线、情书内容、背景图和最终惊喜都集中在配置文件中，普通用户只需要修改配置即可完成个性化。

## 页面内容

网页从上到下依次包含六个区块：

1. 七夕封面
2. 恋爱天数实时计时器
3. 恋爱时间线
4. 情侣照片回忆
5. 点击打开的隐藏情书
6. 页内七夕惊喜

点击最后的“打开七夕惊喜”后，烟花、爱心和彩纸会在当前第六区块内播放，不跳转、不刷新，也不会创建新的结果页面。

## 主要功能

- 恋爱开始日期实时计时，显示天、小时、分钟和秒
- 六个区块使用同风格的独立竖屏背景图
- 时间线由配置动态生成
- 手机端两列不规则照片墙
- 照片点击后打开大图查看层
- 图片加载失败时显示暖白占位提示
- 六个故事区块支持 PPT 风格的全屏上下滑动
- 下一页从底部滑入并覆盖上一页
- 滑动完成后标题、正文和卡片渐进显示
- 情书正文默认隐藏，点击后以信封翻盖动画展开
- 亲吻计数和轻量粒子反馈
- 点击情侣姓名或头像显示提示
- 点击时间线项目显示记忆反馈
- 可选本地音乐控制
- 最终区块内播放烟花、爱心和彩纸
- 支持 `prefers-reduced-motion` 减少动态效果
- 适配手机刘海屏和安全区域

## 快速启动

确保本机已安装 Node.js，然后在项目目录执行：

```bash
npm install
npm run dev
```

浏览器打开：

```text
http://localhost:5173
```

也可以直接双击 `index.html` 查看静态页面。需要调试或多人访问时，建议使用 `npm run dev`。

## 修改个人信息

所有个性化内容集中在项目根目录的 [`config.js`](config.js)。

### 修改姓名和恋爱开始时间

```js
couple: {
  partnerName: '对方姓名',
  yourName: '你的姓名',
  partnerAvatar: 'bubu.svg',
  yourAvatar: 'dudu.svg',
  startDate: '2025-08-29T20:00:00+08:00'
}
```

`startDate` 使用 ISO 时间格式。`+08:00` 表示中国标准时间。如果填写的时间晚于当前时间，计时器会显示为 0，不会出现负数。

### 修改封面和计时器文案

```js
cover: {
  eyebrow: '七夕 · 给我们',
  title: '和你一起，慢慢变老',
  subtitle: '从相遇的那天起，每一秒都值得被记住'
},

timer: {
  label: '我们已经相爱',
  suffix: '每一秒，都还在继续'
}
```

### 修改时间线

```js
timeline: [
  {
    date: '2025.08.29',
    title: '我们第一次见面',
    description: '填写你们第一次相遇的故事'
  }
]
```

可以继续添加多个时间线项目。点击时间线项目后，会显示描述或配置中的记忆反馈。

### 添加情侣照片

建议在项目根目录创建 `photos` 文件夹：

```text
photos/
  first-meet.jpg
  sunset.jpg
```

然后在 `config.js` 中填写：

```js
photos: [
  {
    src: 'photos/first-meet.jpg',
    alt: '我们第一次见面的照片',
    date: '2025.08.29',
    caption: '故事从这一眼开始。'
  }
]
```

图片路径相对于 `index.html`。建议使用清晰的生活照，并为每张图片填写准确的 `alt` 描述。

### 修改隐藏情书

```js
letter: {
  buttonLabel: '点击拆开情书',
  closeButtonLabel: '收起情书',
  title: '写给最特别的你',
  hint: '有些话，还是想亲手交给你。',
  paragraphs: [
    '情书第一段',
    '情书第二段'
  ],
  signature: '永远爱你的某某'
}
```

情书正文在点击前不会显示，正文会通过安全的文本节点写入页面。

### 修改最终七夕惊喜

```js
surprise: {
  eyebrow: '七夕快乐',
  prompt: '最后，还有一份只属于你的小小惊喜。',
  buttonLabel: '打开七夕惊喜',
  replayButtonLabel: '再放一次烟花',
  title: '以后每个七夕，都和你一起',
  message: '愿我们一直拥有属于彼此的星河'
}
```

默认动效时序：

- `0.00` 秒：第一朵烟花绽放
- `0.45` 秒：第二朵烟花绽放
- `0.90` 秒：第三朵烟花和爱心粒子出现
- `1.20` 秒：最终标题和文案淡入
- `2–6` 秒：彩纸、爱心和微粒逐渐消散

动效参数可以在 `motion` 中调整：

```js
motion: {
  sectionRevealDuration: 600,
  fireworksDuration: 6200,
  fireworksCount: 3,
  reducedMotion: true
}
```

### 修改六个页面背景

背景图路径集中在 `config.js` 的 `backgrounds` 中：

```js
backgrounds: {
  cover: 'assets/qixi/cover.png',
  timer: 'assets/qixi/timer.png',
  timeline: 'assets/qixi/timeline.png',
  photos: 'assets/qixi/photos.png',
  letter: 'assets/qixi/letter.png',
  surprise: 'assets/qixi/surprise.png'
}
```

替换背景时，建议使用竖屏图片，不要在图片中嵌入姓名、按钮、日期或正文。图片加载失败时会自动回退到暖白或淡紫纸张背景。

### 配置音乐

默认没有音乐源，因此右上角音乐按钮会自动隐藏，也不会请求失效音频。

如果需要添加本地音乐：

```text
music/qixi.mp3
```

然后修改：

```js
music: {
  enabled: true,
  sources: ['music/qixi.mp3']
}
```

浏览器通常要求用户主动点击音乐按钮后才能播放声音，这是正常的自动播放限制。

## 项目结构

```text
love/
├─ index.html              页面结构
├─ styles.css              当前页面样式和响应式布局
├─ script.js               当前页面交互逻辑
├─ config.js               个人信息和页面内容配置
├─ config.example.js       配置示例
├─ SETUP.md                更详细的使用说明
├─ assets/qixi/            六个区块的背景图
├─ bubu.svg                示例头像
├─ dudu.svg                示例头像
├─ vite.config.mjs         构建时复制静态资源
└─ package.json            项目命令和依赖
```

仓库中保留了 `main.js`、`style.css`、`counter.js` 等旧文件，但它们不参与当前页面入口。当前入口是 `index.html`、`config.js`、`script.js` 和 `styles.css`。

## 手机测试

建议使用浏览器开发者工具模拟：

```text
390 × 844
```

重点检查：

- 首屏背景明亮，标题和姓名清晰
- 页面没有横向滚动
- 恋爱计时器每秒更新
- 时间线日期、标题和描述正常显示
- 照片加载失败时出现占位卡片
- 情书点击前看不到正文
- 最终按钮在第六区块内播放动效
- 动效结束后最终文案仍然保留
- 减少动态效果模式下仍能看到最终文案
- 未配置音乐时没有失效音频请求

## 构建检查

```bash
npm run build
git diff --check
```

## 许可证

本项目沿用 MIT License，详见 [`LICENSE`](LICENSE)。
