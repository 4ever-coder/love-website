# 七夕情侣纪念网页使用说明

这是一个基于 Vite + 原生 HTML/CSS/JavaScript 的静态纪念网页。页面采用 PPT 风格的全屏垂直滑动转场，上一页向上隐藏，下一页从底部向上滑入并覆盖；滑动完成后文字和卡片会渐进显示。情书区块点击后会以信封翻盖动画展开。姓名、日期、照片、时间线、情书和最终惊喜文案都集中在 `config.js` 中，不需要修改页面代码。

## 1. 修改情侣信息

打开项目根目录的 `config.js`，修改：

```js
couple: {
  partnerName: '对方姓名',
  yourName: '你的姓名',
  partnerAvatar: 'bubu.svg',
  yourAvatar: 'dudu.svg',
  startDate: '2025-08-29T20:00:00+08:00'
}
```

`startDate` 使用 ISO 时间格式。示例中的 `+08:00` 表示中国标准时间，计时器会根据这个时间实时计算相爱天数、小时、分钟和秒数。

如果开始时间晚于当前时间，计时器会显示 0，不会出现负数。

## 2. 修改六个页面背景

六个内容区的背景统一在 `config.js` 的 `backgrounds` 中配置：

```js
backgrounds: {
  cover: 'assets/qixi/cover.webp',
  timer: 'assets/qixi/timer.webp',
  timeline: 'assets/qixi/timeline.webp',
  photos: 'assets/qixi/photos.webp',
  letter: 'assets/qixi/letter.webp',
  surprise: 'assets/qixi/surprise.webp'
}
```

替换图片时，把新图片放入对应路径，建议使用竖屏比例、不要在图片中写入姓名或按钮文字。图片加载失败时会自动回退到暖白/淡紫纸张背景。

## 3. 添加情侣照片

推荐在项目根目录新建 `photos` 文件夹，把照片放进去，例如：

```text
photos/
  first-meet.jpg
  sunset.jpg
```

然后在 `config.js` 的 `photos` 数组中填写：

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

路径相对于 `index.html` 所在目录。页面会使用本地照片，不依赖随机外链图片。图片无法加载时会显示占位提示，不会破坏布局。

## 4. 修改时间线

编辑 `config.js` 的 `timeline` 数组：

```js
timeline: [
  {
    date: '2025.08.29',
    title: '我们第一次见面',
    description: '填写你们第一次相遇的故事'
  }
]
```

每一项都会生成一个时间线节点。点击节点会显示轻提示和轻微高亮效果。

## 5. 修改情书

编辑 `letter`：

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

情书正文默认不会出现在页面中，只有点击按钮后才会通过信封翻盖动画展开；再次点击会收起情书。

## 6. 修改七夕惊喜

编辑 `surprise`：

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

点击按钮后会显示最终文案，并播放烟花、爱心和彩纸动画。再次点击可以重新播放。开启系统“减少动态效果”后，动画会减少，但最终文案仍然会显示。

最终惊喜只发生在最后一个区块内：按钮按下后，0.00 秒第一朵烟花、0.45 秒第二朵、0.90 秒第三朵和爱心出现、1.20 秒标题与文案淡入，随后彩纸、爱心和微粒在约 2–6 秒内逐渐消散。页面不会跳转，也不会打开新的结果页。

如需调整动效时长或数量，修改 `motion`：

```js
motion: {
  sectionRevealDuration: 600,
  fireworksDuration: 6200,
  fireworksCount: 3,
  reducedMotion: true
}
```

## 7. 配置音乐

默认没有音乐源，因此音乐按钮会自动隐藏，也不会请求失效的远程音频。

如果需要音乐，建议使用项目内的本地文件：

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

浏览器通常要求用户先点击音乐按钮后才能播放声音，这是正常的自动播放限制。

## 8. 启动项目

在项目目录执行：

```bash
npm install
npm run dev
```

然后打开：

```text
http://localhost:5173
```

也可以直接双击 `index.html` 查看静态页面。

## 9. 手机尺寸测试

在浏览器开发者工具中选择手机设备，建议测试：

```text
390 × 844
```

重点检查：

- 页面没有横向滚动。
- 鼠标滚轮、触摸滑动和键盘分页时，上一页向上隐藏，下一页从底部向上滑入并覆盖。
- 滑动完成后，标题、正文、时间线和照片卡片会依次渐显。
- 内容超过一屏时可以在当前故事页内部继续阅读。
- 六个区块都显示对应背景图，文字和照片仍然清晰可读。
- 计时器每秒更新。
- 情书点击前看不到正文，点击后出现信封翻盖动画，再次点击可以收起。
- 图片错误时有占位提示。
- 最终按钮在当前第六区块内播放烟花、爱心和彩纸并显示文案，不改变 URL。
- 音乐未配置时不会出现失效资源请求。

## 10. 构建检查

```bash
npm run build
git diff --check
```

页面会继续保留浮动装饰、音乐开关、隐藏情书、亲吻计数、双方姓名点击提示和记忆项目点击反馈等原有互动能力。
