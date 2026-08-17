// 七夕情侣纪念网页配置
// 只需要修改这个文件，就可以替换页面中的姓名、日期、照片和文字。

const CONFIG = {
  couple: {
    partnerName: '月汐',
    yourName: '江屿',
    partnerAvatar: 'bubu.svg',
    yourAvatar: 'dudu.svg',
    startDate: '2025-08-29T20:00:00+08:00'
  },

  cover: {
    eyebrow: '七夕 · 给我们',
    title: '和你一起，慢慢变老',
    subtitle: '从相遇的那天起，每一秒都值得被记住'
  },

  backgrounds: {
    cover: 'assets/qixi/cover.png',
    timer: 'assets/qixi/timer.png',
    timeline: 'assets/qixi/timeline.png',
    photos: 'assets/qixi/photos.png',
    letter: 'assets/qixi/letter.png',
    surprise: 'assets/qixi/surprise.png'
  },

  timer: {
    label: '我们已经相爱',
    suffix: '每一秒，都还在继续'
  },

  timeline: [
    {
      date: '2025.08.29',
      title: '我们第一次见面',
      description: '那天的风很轻，而我们的故事刚好开始。'
    },
    {
      date: '2025.09.01',
      title: '第一次并肩看晚霞',
      description: '从此以后，平凡的风景也有了值得分享的人。'
    },
    {
      date: '2026.02.14',
      title: '把日子过成了纪念日',
      description: '谢谢你一直在身边，让每个普通日子都变得温柔。'
    },
    // 以下为测试页面内部纵向滚动效果的占位数据，可按需删除。
    {
      date: '2026.03.08',
      title: '[占位] 一起散步回家',
      description: '占位内容：把普通的晚风和脚步，也认真记录下来。'
    },
    {
      date: '2026.04.18',
      title: '[占位] 第一次短途旅行',
      description: '占位内容：换一个城市看看，故事也多了一页。'
    },
    {
      date: '2026.05.20',
      title: '[占位] 分享一顿晚餐',
      description: '占位内容：好好吃饭，好好聊天，就是很幸福的日常。'
    },
    {
      date: '2026.06.01',
      title: '[占位] 给彼此准备小惊喜',
      description: '占位内容：偷偷准备的心意，最后变成了共同的笑声。'
    },
    {
      date: '2026.07.07',
      title: '[占位] 又一起迎来七夕',
      description: '占位内容：时间继续向前，而我们还在并肩走着。'
    }
  ],

  photos: [
    {
      src: 'bubu.svg',
      alt: '我们的第一张回忆照片',
      date: '2025.08.29',
      caption: '故事从这一眼开始。'
    },
    {
      src: 'dudu.svg',
      alt: '一起度过的温柔时光',
      date: '2025.09.01',
      caption: '晚风、月色，还有你。'
    },
    {
      src: 'bubu.svg',
      alt: '我们一起收藏的回忆',
      date: '2026.02.14',
      caption: '日子很长，我们慢慢记录。'
    },
    {
      src: 'dudu.svg',
      alt: '属于我们的七夕回忆',
      date: '2026.08.19',
      caption: '愿每一次回望，都有你在。'
    },
    // 以下为测试页面内部纵向滚动效果的占位数据，可按需删除。
    {
      src: 'bubu.svg',
      alt: '[占位] 一起散步的回忆图片',
      date: '2026.03.08',
      caption: '[占位回忆] 晚风里的散步。'
    },
    {
      src: 'dudu.svg',
      alt: '[占位] 短途旅行的回忆图片',
      date: '2026.04.18',
      caption: '[占位回忆] 去新的地方，看新的风景。'
    },
    {
      src: 'bubu.svg',
      alt: '[占位] 分享晚餐的回忆图片',
      date: '2026.05.20',
      caption: '[占位回忆] 一顿认真吃完的晚餐。'
    },
    {
      src: 'dudu.svg',
      alt: '[占位] 七夕的回忆图片',
      date: '2026.07.07',
      caption: '[占位回忆] 先用这张占位图，等你换成真实照片。'
    }
  ],

  letter: {
    buttonLabel: '点击拆开情书',
    closeButtonLabel: '收起情书',
    title: '写给最特别的你',
    hint: '有些话，还是想亲手交给你。',
    paragraphs: [
      '月汐，见到你之后，我开始相信，日子可以因为一个人而变得有光。',
      '谢谢你把温柔分给我，也谢谢你愿意和我一起，把每一个平常的瞬间过得认真。',
      '往后的七夕、四季和漫长岁月，我都想和你并肩走过。'
    ],
    signature: '永远爱你的 江屿'
  },

  surprise: {
    eyebrow: '七夕快乐',
    prompt: '最后，还有一份只属于你的小小惊喜。',
    buttonLabel: '打开七夕惊喜',
    replayButtonLabel: '再放一次烟花',
    title: '以后每个七夕，都和你一起',
    message: '愿我们一直拥有属于彼此的星河，也愿每一次回头，都能看见对方。'
  },

  motion: {
    sectionRevealDuration: 600,
    fireworksDuration: 6200,
    fireworksCount: 3,
    reducedMotion: true
  },

  music: {
    enabled: true,
    autoplay: true,
    sources: [
      {
        src: 'music/juggshots-lunxian.mp3',
        type: 'audio/mpeg'
      }
    ]
  },

  // 下面这些字段用于保留原项目的互动配置能力。
  kissMessages: {
    10: '十个吻，收到了。',
    50: '五十个吻，今天也很喜欢你。',
    100: '一百个吻，爱意已经满格。'
  },

  characterMessages: {
    partner: '你是我想认真珍藏的人。',
    you: '很幸运，故事里有你。'
  },

  memoryMessages: {
    lateNight: '那些聊到深夜的时光，是我很喜欢的回忆。',
    firstMeeting: '从那天开始，我们有了共同的故事。',
    care: '谢谢你的细心照顾，也谢谢你的每一次回应。'
  },

  ui: {
    scrollHint: '向下探索我们的故事',
    timelineTitle: '我们的时间线',
    timelineIntro: '一些被认真记住的日子，串起了我们走过的路。',
    photosTitle: '把回忆留在这里',
    photosIntro: '每一张照片，都是我们共同生活过的证据。',
    letterEyebrow: '一封未寄出的信',
    surpriseTitle: '给你的七夕礼物',
    kissLabel: '已经送出',
    kissHint: '轻轻点击，送出一枚心意',
    kissButton: '送你一枚吻',
    photoFallbackTitle: '照片暂未加载',
    photoFallbackText: '请检查 config.js 中的图片路径',
    close: '关闭',
    musicPlay: '播放音乐',
    musicPause: '暂停音乐',
    musicUnavailable: '音乐暂时无法播放',
    emptyTimeline: '还没有写下时间线，去 config.js 记录一段故事吧。',
    emptyPhotos: '还没有添加照片，去 config.js 放入你们的回忆吧。'
  }
};

// 保持旧页面的全局配置使用方式。
window.CONFIG = CONFIG;
