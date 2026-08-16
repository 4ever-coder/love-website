// 七夕情侣纪念网页配置示例
// 将本文件中的内容复制或参考到 config.js 中，再替换成你们自己的故事。

const CONFIG = {
  couple: {
    partnerName: '对方姓名',
    yourName: '你的姓名',
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
      description: '填写你们第一次相遇的故事'
    }
  ],

  photos: [
    {
      src: 'photos/photo-01.jpg',
      alt: '我们的回忆',
      date: '2025.09.01',
      caption: '填写照片说明'
    }
  ],

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
  },

  surprise: {
    eyebrow: '七夕快乐',
    prompt: '最后，还有一份只属于你的小小惊喜。',
    buttonLabel: '打开七夕惊喜',
    replayButtonLabel: '再放一次烟花',
    title: '以后每个七夕，都和你一起',
    message: '愿我们一直拥有属于彼此的星河'
  },

  motion: {
    sectionRevealDuration: 600,
    fireworksDuration: 6200,
    fireworksCount: 3,
    reducedMotion: true
  },

  music: {
    enabled: false,
    // 支持本地音频，例如：['music/qixi.mp3']
    sources: []
  },

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

window.CONFIG = CONFIG;
