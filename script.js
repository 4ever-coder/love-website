// 七夕情侣纪念网页交互逻辑
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const source = window.CONFIG || {};
    const config = normalizeConfig(source);
    const elements = collectElements();
    document.body.classList.add('js-ready');
    const reducedMotion = config.motion.reducedMotion !== false
      && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let kissCount = 0;
    let toastTimer = null;
    let timerId = null;
    let letterOpen = false;
    let currentPhoto = null;
    let celebrationFrame = null;
    let celebrationParticles = [];
    let celebrationTimers = [];

    renderStaticContent();
    renderTimeline();
    renderPhotos();
    setupBackgrounds();
    setupSectionReveal();
    createAmbientMotifs();
    setupTimer();
    setupLetter();
    setupKisses();
    setupPersonCards();
    setupPhotoDialog();
    setupMusic();
    setupSurprise();
    setupCanvas();

    function collectElements() {
      return {
        coverEyebrow: document.getElementById('coverEyebrow'),
        coverTitle: document.getElementById('coverTitle'),
        coverSubtitle: document.getElementById('coverSubtitle'),
        partnerName: document.getElementById('partnerName'),
        yourName: document.getElementById('yourName'),
        partnerRole: document.getElementById('partnerRole'),
        yourRole: document.getElementById('yourRole'),
        partnerAvatar: document.getElementById('partnerAvatar'),
        yourAvatar: document.getElementById('yourAvatar'),
        scrollHint: document.getElementById('scrollHint'),
        timerHeading: document.getElementById('timerHeading'),
        timerSuffix: document.getElementById('timerSuffix'),
        daysValue: document.getElementById('daysValue'),
        hoursValue: document.getElementById('hoursValue'),
        minutesValue: document.getElementById('minutesValue'),
        secondsValue: document.getElementById('secondsValue'),
        kissCount: document.getElementById('kissCount'),
        kissLabel: document.getElementById('kissLabel'),
        kissHint: document.getElementById('kissHint'),
        kissButton: document.getElementById('kissButton'),
        timelineTitle: document.getElementById('timelineTitle'),
        timelineIntro: document.getElementById('timelineIntro'),
        timelineList: document.getElementById('timelineList'),
        photosTitle: document.getElementById('photosTitle'),
        photosIntro: document.getElementById('photosIntro'),
        photoGrid: document.getElementById('photoGrid'),
        letterEyebrow: document.getElementById('letterEyebrow'),
        letterHint: document.getElementById('letterHint'),
        letterCard: document.getElementById('letterCard'),
        letterContent: document.getElementById('letterContent'),
        letterTitle: document.getElementById('letterTitle'),
        letterBody: document.getElementById('letterBody'),
        letterSignature: document.getElementById('letterSignature'),
        letterToggle: document.getElementById('letterToggle'),
        letterButtonText: document.getElementById('letterButtonText'),
        surpriseEyebrow: document.getElementById('surpriseEyebrow'),
        surprisePrompt: document.getElementById('surprisePrompt'),
        surpriseButton: document.getElementById('surpriseButton'),
        surpriseReveal: document.getElementById('surpriseReveal'),
        surpriseHeading: document.getElementById('surpriseHeading'),
        surpriseMessage: document.getElementById('surpriseMessage'),
        toast: document.getElementById('toast'),
        ambientLayer: document.querySelector('.ambient-layer'),
        musicControl: document.getElementById('musicControl'),
        musicToggle: document.getElementById('musicToggle'),
        musicIcon: document.getElementById('musicIcon'),
        musicLabel: document.getElementById('musicLabel'),
        bgMusic: document.getElementById('bgMusic'),
        photoDialog: document.getElementById('photoDialog'),
        photoDialogClose: document.getElementById('photoDialogClose'),
        photoDialogImage: document.getElementById('photoDialogImage'),
        photoDialogDate: document.getElementById('photoDialogDate'),
        photoDialogCaption: document.getElementById('photoDialogCaption'),
        surpriseSection: document.getElementById('surprise'),
        celebrationCanvas: document.getElementById('celebrationCanvas')
      };
    }

    function normalizeConfig(raw) {
      const legacyMessages = raw.messages || {};
      const legacyMemories = raw.memories || {};
      const legacyCharacters = raw.characters || {};
      const couple = raw.couple || {};
      const ui = raw.ui || {};

      const legacyTimeline = [
        { title: '深夜长谈', description: legacyMemories.lateNight, memoryKey: 'lateNight' },
        { title: '第一次见面', description: legacyMemories.firstMeeting, memoryKey: 'firstMeeting' },
        { title: '你的温柔', description: legacyMemories.care, memoryKey: 'care' }
      ].filter(function (item) {
        return item.description;
      });

      return {
        couple: {
          partnerName: couple.partnerName || raw.partnerName || '对方',
          yourName: couple.yourName || raw.yourName || '我',
          partnerAvatar: couple.partnerAvatar || 'bubu.svg',
          yourAvatar: couple.yourAvatar || 'dudu.svg',
          startDate: couple.startDate || raw.startDate || ''
        },
        cover: Object.assign({
          eyebrow: '七夕 · 给我们',
          title: '和你一起，慢慢变老',
          subtitle: legacyMessages.subtitle || '从相遇的那天起，每一秒都值得被记住'
        }, raw.cover || {}),
        timer: Object.assign({
          label: '我们已经相爱',
          suffix: '每一秒，都还在继续'
        }, raw.timer || {}),
        backgrounds: Object.assign({
          cover: 'assets/qixi/cover.png',
          timer: 'assets/qixi/timer.png',
          timeline: 'assets/qixi/timeline.png',
          photos: 'assets/qixi/photos.png',
          letter: 'assets/qixi/letter.png',
          surprise: 'assets/qixi/surprise.png'
        }, raw.backgrounds || {}),
        timeline: Array.isArray(raw.timeline) ? raw.timeline : legacyTimeline,
        photos: Array.isArray(raw.photos) ? raw.photos : [],
        letter: Object.assign({
          buttonLabel: '点击拆开情书',
          closeButtonLabel: '收起情书',
          title: '写给最特别的你',
          hint: '有些话，还是想亲手交给你。',
          paragraphs: [legacyMessages.loveNote || ''],
          signature: legacyMessages.signature || ''
        }, raw.letter || {}),
        surprise: Object.assign({
          eyebrow: '七夕快乐',
          prompt: '最后，还有一份只属于你的小小惊喜。',
          buttonLabel: '打开七夕惊喜',
          replayButtonLabel: '再放一次烟花',
          title: legacyMessages.specialMessage || '以后每个七夕，都和你一起',
          message: legacyMessages.specialMessage2 || ''
        }, raw.surprise || {}),
        motion: Object.assign({
          sectionRevealDuration: 600,
          fireworksDuration: 6200,
          fireworksCount: 3,
          reducedMotion: true
        }, raw.motion || {}),
        music: Object.assign({ enabled: false, sources: [] }, raw.music || {}),
        kissMessages: raw.kissMessages || {},
        characterMessages: raw.characterMessages || {
          partner: legacyCharacters.partner || '',
          you: legacyCharacters.you || ''
        },
        memoryMessages: raw.memoryMessages || {},
        ui: Object.assign({
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
        }, ui)
      };
    }

    function setText(element, value) {
      if (element) {
        element.textContent = value == null ? '' : String(value);
      }
    }

    function renderStaticContent() {
      setText(elements.coverEyebrow, config.cover.eyebrow);
      setText(elements.coverTitle, config.cover.title);
      setText(elements.coverSubtitle, config.cover.subtitle);
      setText(elements.partnerName, config.couple.partnerName);
      setText(elements.yourName, config.couple.yourName);
      setText(elements.partnerRole, config.couple.partnerRole || '我的月亮');
      setText(elements.yourRole, config.couple.yourRole || '你的星河');
      setText(elements.scrollHint, config.ui.scrollHint);
      setText(elements.timerHeading, config.timer.label);
      setText(elements.timerSuffix, config.timer.suffix);
      setText(elements.kissLabel, config.ui.kissLabel);
      setText(elements.kissHint, config.ui.kissHint);
      setText(elements.kissButton, config.ui.kissButton);
      setText(elements.timelineTitle, config.ui.timelineTitle);
      setText(elements.timelineIntro, config.ui.timelineIntro);
      setText(elements.photosTitle, config.ui.photosTitle);
      setText(elements.photosIntro, config.ui.photosIntro);
      setText(elements.letterEyebrow, config.ui.letterEyebrow);
      setText(elements.letterHint, config.letter.hint);
      setText(elements.letterTitle, config.letter.title);
      setText(elements.letterSignature, config.letter.signature);
      setText(elements.letterButtonText, config.letter.buttonLabel);
      setText(elements.surpriseEyebrow, config.surprise.eyebrow);
      setText(elements.surprisePrompt, config.surprise.prompt);
      setText(elements.surpriseButton, config.surprise.buttonLabel);
      setText(elements.surpriseHeading, config.surprise.title);
      setText(elements.surpriseMessage, config.surprise.message);
      elements.photoDialogClose.setAttribute('aria-label', config.ui.close);
      elements.photoDialogClose.title = config.ui.close;

      configureAvatar(elements.partnerAvatar, config.couple.partnerAvatar, config.couple.partnerName);
      configureAvatar(elements.yourAvatar, config.couple.yourAvatar, config.couple.yourName);
    }

    function configureAvatar(image, sourcePath, name) {
      if (!image) {
        return;
      }

      const holder = image.parentElement;
      const initial = String(name || '·').trim().charAt(0) || '·';
      holder.dataset.initial = initial;
      image.alt = name ? name + '的头像' : '情侣头像';

      if (!sourcePath) {
        image.hidden = true;
        holder.classList.add('is-empty');
        return;
      }

      image.hidden = false;
      holder.classList.remove('is-empty');
      image.src = sourcePath;
      image.addEventListener('error', function () {
        image.hidden = true;
        holder.classList.add('is-empty');
      }, { once: true });
    }

    function setupBackgrounds() {
      const sections = Array.from(document.querySelectorAll('[data-background-key]'));
      const loadBackground = function (section) {
        if (section.dataset.backgroundLoaded === 'true') {
          return;
        }

        section.dataset.backgroundLoaded = 'true';
        const layer = section.querySelector('.section-background');
        const sourcePath = config.backgrounds[section.dataset.backgroundKey];

        if (!layer || !sourcePath) {
          section.classList.add('background-fallback');
          return;
        }

        const probe = new Image();
        probe.onload = function () {
          layer.style.backgroundImage = 'url("' + String(sourcePath).replace(/"/g, '\\"') + '")';
          section.classList.add('has-background');
        };
        probe.onerror = function () {
          section.classList.add('background-fallback');
          layer.removeAttribute('style');
        };
        probe.src = sourcePath;
      };

      const cover = document.getElementById('cover');
      if (cover) {
        loadBackground(cover);
      }

      if (!('IntersectionObserver' in window)) {
        sections.forEach(loadBackground);
        return;
      }

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            loadBackground(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '180px 0px' });

      sections.forEach(function (section) {
        if (section !== cover) {
          observer.observe(section);
        }
      });
    }

    function setupSectionReveal() {
      const duration = Math.max(250, Number(config.motion.sectionRevealDuration) || 600);
      document.documentElement.style.setProperty('--section-reveal-duration', duration + 'ms');

      const sections = Array.from(document.querySelectorAll('.section, .hero'));
      const revealSection = function (section) {
        section.classList.add('is-visible');
        section.querySelectorAll('.reveal-item').forEach(function (item, index) {
          item.style.setProperty('--reveal-delay', (index * 70) + 'ms');
          item.classList.add('is-in-view');
        });
      };

      const cover = document.getElementById('cover');
      if (cover) {
        revealSection(cover);
      }

      if (!('IntersectionObserver' in window)) {
        sections.forEach(revealSection);
        return;
      }

      const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            revealSection(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

      sections.forEach(function (section) {
        if (section !== cover) {
          observer.observe(section);
        }
      });
    }

    function renderTimeline() {
      const list = elements.timelineList;
      list.replaceChildren();

      if (!config.timeline.length) {
        const empty = document.createElement('li');
        empty.className = 'empty-state';
        setText(empty, config.ui.emptyTimeline);
        list.appendChild(empty);
        return;
      }

      config.timeline.forEach(function (entry, index) {
        const item = document.createElement('li');
        item.className = 'timeline-item';

        const button = document.createElement('button');
        button.className = 'timeline-card';
        button.type = 'button';
        button.setAttribute('aria-label', [entry.date, entry.title].filter(Boolean).join(' · '));

        const marker = document.createElement('span');
        marker.className = 'timeline-marker';
        marker.setAttribute('aria-hidden', 'true');

        const date = document.createElement('time');
        date.className = 'timeline-date';
        date.dateTime = entry.date || '';
        setText(date, entry.date || '');

        const title = document.createElement('strong');
        title.className = 'timeline-card-title';
        setText(title, entry.title || '');

        const description = document.createElement('span');
        description.className = 'timeline-card-description';
        setText(description, entry.description || '');

        const copy = document.createElement('span');
        copy.className = 'timeline-card-copy';
        copy.append(date, title, description);
        button.append(marker, copy);
        item.appendChild(button);
        list.appendChild(item);

        button.addEventListener('click', function () {
          button.classList.toggle('is-active');
          const feedback = entry.feedback || config.memoryMessages[entry.memoryKey] || entry.description;
          if (feedback) {
            showToast(feedback);
          }
          if (!reducedMotion) {
            spawnSoftParticles('✦', 5);
          }
        });

        button.style.setProperty('--timeline-delay', (index * 70) + 'ms');
      });
    }

    function renderPhotos() {
      const grid = elements.photoGrid;
      grid.replaceChildren();

      if (!config.photos.length) {
        const empty = document.createElement('p');
        empty.className = 'empty-state';
        setText(empty, config.ui.emptyPhotos);
        grid.appendChild(empty);
        return;
      }

      config.photos.forEach(function (photo, index) {
        const card = document.createElement('button');
        card.className = 'photo-card';
        card.type = 'button';
        card.style.setProperty('--photo-delay', (index * 60) + 'ms');
        card.setAttribute('aria-label', [photo.date, photo.caption].filter(Boolean).join(' · ') || '查看照片');

        const media = document.createElement('span');
        media.className = 'photo-media';

        const image = document.createElement('img');
        image.loading = 'lazy';
        image.alt = photo.alt || photo.caption || '我们的回忆';

        const fallback = document.createElement('span');
        fallback.className = 'photo-placeholder';
        fallback.hidden = Boolean(photo.src);

        const fallbackTitle = document.createElement('strong');
        setText(fallbackTitle, config.ui.photoFallbackTitle);
        const fallbackText = document.createElement('small');
        setText(fallbackText, config.ui.photoFallbackText);
        fallback.append(fallbackTitle, fallbackText);

        image.addEventListener('error', function () {
          image.hidden = true;
          fallback.hidden = false;
          card.classList.add('is-broken');
        }, { once: true });

        if (photo.src) {
          image.src = photo.src;
        } else {
          image.hidden = true;
        }

        media.append(image, fallback);

        const caption = document.createElement('span');
        caption.className = 'photo-caption';
        const date = document.createElement('time');
        date.className = 'photo-date';
        date.dateTime = photo.date || '';
        setText(date, photo.date || '');
        const text = document.createElement('span');
        setText(text, photo.caption || '');
        caption.append(date, text);

        card.append(media, caption);
        grid.appendChild(card);

        card.addEventListener('click', function () {
          openPhotoDialog(photo);
        });
      });
    }

    function setupTimer() {
      updateTimer();
      timerId = window.setInterval(updateTimer, 1000);
    }

    function updateTimer() {
      const start = Date.parse(config.couple.startDate);
      const elapsed = Number.isFinite(start) ? Math.max(0, Date.now() - start) : 0;
      const totalSeconds = Math.floor(elapsed / 1000);
      const days = Math.floor(totalSeconds / 86400);
      const hours = Math.floor((totalSeconds % 86400) / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      setText(elements.daysValue, days);
      setText(elements.hoursValue, padNumber(hours));
      setText(elements.minutesValue, padNumber(minutes));
      setText(elements.secondsValue, padNumber(seconds));
    }

    function padNumber(value) {
      return String(value).padStart(2, '0');
    }

    function setupLetter() {
      elements.letterToggle.addEventListener('click', function () {
        letterOpen = !letterOpen;
        elements.letterCard.classList.toggle('is-open', letterOpen);
        elements.letterContent.hidden = !letterOpen;
        elements.letterToggle.setAttribute('aria-expanded', String(letterOpen));
        setText(elements.letterButtonText, letterOpen ? config.letter.closeButtonLabel : config.letter.buttonLabel);

        if (letterOpen) {
          renderLetterBody();
          if (!reducedMotion) {
            spawnSoftParticles('❋', 8);
          }
        }
      });
    }

    function renderLetterBody() {
      elements.letterBody.replaceChildren();
      const paragraphs = Array.isArray(config.letter.paragraphs) ? config.letter.paragraphs : [];

      paragraphs.forEach(function (paragraph) {
        const p = document.createElement('p');
        setText(p, paragraph);
        elements.letterBody.appendChild(p);
      });
    }

    function setupKisses() {
      elements.kissButton.addEventListener('click', function () {
        kissCount += 1;
        setText(elements.kissCount, kissCount);
        spawnSoftParticles('♡', 6);

        const message = config.kissMessages[kissCount];
        if (message) {
          showToast(message);
        }
      });
    }

    function setupPersonCards() {
      document.querySelectorAll('.person-card').forEach(function (card) {
        card.addEventListener('click', function () {
          const type = card.dataset.person;
          const name = type === 'partner' ? config.couple.partnerName : config.couple.yourName;
          const message = config.characterMessages[type] || '';
          showToast([name, message].filter(Boolean).join(' · '));
          spawnSoftParticles(type === 'partner' ? '✦' : '♡', 5);
        });
      });
    }

    function setupPhotoDialog() {
      elements.photoDialogClose.addEventListener('click', closePhotoDialog);
      elements.photoDialog.addEventListener('click', function (event) {
        if (event.target === elements.photoDialog) {
          closePhotoDialog();
        }
      });
      elements.photoDialog.addEventListener('cancel', function (event) {
        event.preventDefault();
        closePhotoDialog();
      });
    }

    function openPhotoDialog(photo) {
      currentPhoto = photo;
      elements.photoDialogImage.src = photo.src || '';
      elements.photoDialogImage.alt = photo.alt || photo.caption || '我们的回忆';
      setText(elements.photoDialogDate, photo.date || '');
      setText(elements.photoDialogCaption, photo.caption || '');

      if (typeof elements.photoDialog.showModal === 'function') {
        elements.photoDialog.showModal();
      } else {
        elements.photoDialog.setAttribute('open', '');
      }
    }

    function closePhotoDialog() {
      currentPhoto = null;
      if (typeof elements.photoDialog.close === 'function' && elements.photoDialog.open) {
        elements.photoDialog.close();
      } else {
        elements.photoDialog.removeAttribute('open');
      }
    }

    function setupMusic() {
      const music = config.music || {};
      const sources = Array.isArray(music.sources) ? music.sources.filter(Boolean) : [];

      if (!music.enabled || !sources.length) {
        elements.musicControl.hidden = true;
        return;
      }

      sources.forEach(function (source) {
        const sourceElement = document.createElement('source');
        if (typeof source === 'string') {
          sourceElement.src = source;
        } else {
          sourceElement.src = source.src || '';
          if (source.type) {
            sourceElement.type = source.type;
          }
        }
        elements.bgMusic.appendChild(sourceElement);
      });

      elements.musicControl.hidden = false;
      setMusicButton(false);
      elements.musicToggle.addEventListener('click', function () {
        if (elements.bgMusic.paused) {
          elements.bgMusic.play().then(function () {
            setMusicButton(true);
          }).catch(function () {
            setMusicButton(false);
            showToast(config.ui.musicUnavailable);
          });
        } else {
          elements.bgMusic.pause();
          setMusicButton(false);
        }
      });
    }

    function setMusicButton(isPlaying) {
      const label = isPlaying ? config.ui.musicPause : config.ui.musicPlay;
      setText(elements.musicIcon, isPlaying ? 'Ⅱ' : '♪');
      setText(elements.musicLabel, label);
      elements.musicToggle.setAttribute('aria-label', label);
      elements.musicToggle.title = label;
      elements.musicToggle.classList.toggle('is-playing', isPlaying);
    }

    function setupSurprise() {
      elements.surpriseButton.addEventListener('click', function () {
        elements.surpriseSection.classList.add('is-revealed');
        elements.surpriseButton.classList.add('is-complete');
        setText(elements.surpriseButton, config.surprise.replayButtonLabel);
        if (typeof window.playQixiCelebration === 'function') {
          window.playQixiCelebration();
        } else {
          elements.surpriseReveal.hidden = false;
          elements.surpriseReveal.classList.add('is-animated');
        }
      });
    }

    function createAmbientMotifs() {
      if (!elements.ambientLayer) {
        return;
      }

      const motifs = ['✦', '·', '❋', '♡', '·', '✧', '·', '❋'];
      motifs.forEach(function (motif, index) {
        const item = document.createElement('span');
        item.className = 'ambient-motif';
        item.textContent = motif;
        item.style.setProperty('--motif-left', (8 + ((index * 17) % 86)) + '%');
        item.style.setProperty('--motif-top', (12 + ((index * 23) % 76)) + '%');
        item.style.setProperty('--motif-delay', (index * -0.8) + 's');
        item.style.setProperty('--motif-size', (index % 3 === 0 ? 1.1 : 0.75) + 'rem');
        elements.ambientLayer.appendChild(item);
      });
    }

    function spawnSoftParticles(symbol, count) {
      if (!elements.ambientLayer || reducedMotion) {
        return;
      }

      for (let index = 0; index < count; index += 1) {
        const particle = document.createElement('span');
        particle.className = 'transient-particle';
        particle.textContent = symbol;
        particle.style.setProperty('--particle-left', (32 + Math.random() * 36) + '%');
        particle.style.setProperty('--particle-top', (42 + Math.random() * 18) + '%');
        particle.style.setProperty('--particle-x', ((Math.random() - 0.5) * 120) + 'px');
        particle.style.setProperty('--particle-y', (-70 - Math.random() * 80) + 'px');
        particle.style.setProperty('--particle-delay', (index * 45) + 'ms');
        elements.ambientLayer.appendChild(particle);
        window.setTimeout(function () {
          particle.remove();
        }, 1600 + index * 45);
      }
    }

    function showToast(message) {
      if (!message) {
        return;
      }

      setText(elements.toast, message);
      elements.toast.classList.add('is-visible');
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(function () {
        elements.toast.classList.remove('is-visible');
      }, 2800);
    }

    function setupCanvas() {
      const canvas = elements.celebrationCanvas;
      const context = canvas.getContext('2d');
      const section = elements.surpriseSection;
      if (!context || !section) {
        return;
      }

      let sectionWidth = 0;
      let sectionHeight = 0;
      const fireworksDuration = Math.max(3000, Number(config.motion.fireworksDuration) || 6200);
      const fireworksCount = Math.max(1, Math.floor(Number(config.motion.fireworksCount) || 3));

      function resizeCanvas() {
        const rect = section.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        sectionWidth = Math.max(1, rect.width);
        sectionHeight = Math.max(1, rect.height);
        canvas.width = Math.floor(sectionWidth * dpr);
        canvas.height = Math.floor(sectionHeight * dpr);
        canvas.style.width = sectionWidth + 'px';
        canvas.style.height = sectionHeight + 'px';
        context.setTransform(dpr, 0, 0, dpr, 0, 0);
      }

      function showSurpriseContent() {
        elements.surpriseReveal.hidden = false;
        elements.surpriseReveal.classList.remove('is-animated');
        void elements.surpriseReveal.offsetWidth;
        elements.surpriseReveal.classList.add('is-animated');
      }

      function hideSurpriseContent() {
        elements.surpriseReveal.hidden = true;
        elements.surpriseReveal.classList.remove('is-animated');
      }

      window.addEventListener('resize', resizeCanvas, { passive: true });
      resizeCanvas();

      window.playQixiCelebration = function () {
        playCelebration();
      };

      function playCelebration() {
        cancelCelebration();
        section.classList.add('is-revealed');

        if (reducedMotion) {
          showSurpriseContent();
          return;
        }

        hideSurpriseContent();
        canvas.classList.add('is-active');
        resizeCanvas();
        celebrationParticles = [];

        const fireworkTimes = [0, 450, 900];
        for (let index = 0; index < fireworksCount; index += 1) {
          const delay = fireworkTimes[index] == null
            ? 900 + ((index - 2) * 450)
            : fireworkTimes[index];
          celebrationTimers.push(window.setTimeout(function () {
            launchFirework(
              sectionWidth * (0.2 + Math.random() * 0.6),
              sectionHeight * (0.16 + Math.random() * 0.28)
            );
          }, delay));
        }

        celebrationTimers.push(window.setTimeout(launchHearts, 900));
        celebrationTimers.push(window.setTimeout(function () {
          launchConfetti();
          showSurpriseContent();
        }, 1200));

        const startedAt = performance.now();
        let lastTime = startedAt;
        function animate(now) {
          const elapsed = now - startedAt;
          const delta = Math.min((now - lastTime) / 1000, 0.04);
          lastTime = now;
          context.clearRect(0, 0, sectionWidth, sectionHeight);
          updateParticles(delta, context);

          if (elapsed < fireworksDuration || celebrationParticles.length) {
            celebrationFrame = window.requestAnimationFrame(animate);
          } else {
            cancelCelebration();
          }
        }

        celebrationFrame = window.requestAnimationFrame(animate);
      }

      function cancelCelebration() {
        if (celebrationFrame) {
          window.cancelAnimationFrame(celebrationFrame);
          celebrationFrame = null;
        }
        celebrationTimers.forEach(window.clearTimeout);
        celebrationTimers = [];
        celebrationParticles = [];
        context.clearRect(0, 0, sectionWidth, sectionHeight);
        canvas.classList.remove('is-active');
      }

      function launchFirework(x, y) {
        const palette = ['#b49466', '#b87878', '#766580', '#fff8f1'];
        const color = palette[Math.floor(Math.random() * palette.length)];
        for (let index = 0; index < 42; index += 1) {
          const angle = (Math.PI * 2 * index) / 42;
          const speed = 70 + Math.random() * 100;
          celebrationParticles.push({
            type: 'spark',
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            life: 1.1 + Math.random() * 0.5,
            maxLife: 1.6,
            gravity: 38,
            size: 1.2 + Math.random() * 1.8,
            color: color
          });
        }
      }

      function launchConfetti() {
        const palette = ['#b49466', '#b87878', '#766580', '#f5e8e5'];
        for (let index = 0; index < 32; index += 1) {
          celebrationParticles.push({
            type: 'confetti',
            x: Math.random() * sectionWidth,
            y: -20 - Math.random() * 120,
            vx: (Math.random() - 0.5) * 28,
            vy: 45 + Math.random() * 80,
            life: 3.8 + Math.random() * 1.2,
            maxLife: 5,
            gravity: 8,
            size: 4 + Math.random() * 5,
            rotation: Math.random() * Math.PI,
            rotationSpeed: (Math.random() - 0.5) * 4,
            color: palette[index % palette.length]
          });
        }
      }

      function launchHearts() {
        for (let index = 0; index < 14; index += 1) {
          celebrationParticles.push({
            type: 'heart',
            x: sectionWidth * (0.28 + Math.random() * 0.44),
            y: sectionHeight * (0.72 + Math.random() * 0.14),
            vx: (Math.random() - 0.5) * 55,
            vy: -45 - Math.random() * 55,
            life: 3.6 + Math.random() * 1.2,
            maxLife: 4.8,
            gravity: -2,
            size: 5 + Math.random() * 6,
            rotation: (Math.random() - 0.5) * 0.4,
            color: index % 2 === 0 ? '#b87878' : '#b49466'
          });
        }
      }

      function updateParticles(delta, ctx) {
        celebrationParticles = celebrationParticles.filter(function (particle) {
          particle.life -= delta;
          particle.x += particle.vx * delta;
          particle.y += particle.vy * delta;
          particle.vy += particle.gravity * delta;
          if (particle.rotation != null) {
            particle.rotation += (particle.rotationSpeed || 0) * delta;
          }

          const opacity = Math.max(0, Math.min(1, particle.life / particle.maxLife));
          ctx.save();
          ctx.globalAlpha = opacity;
          ctx.fillStyle = particle.color;

          if (particle.type === 'confetti') {
            ctx.translate(particle.x, particle.y);
            ctx.rotate(particle.rotation || 0);
            ctx.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size * 0.55);
          } else if (particle.type === 'heart') {
            drawHeart(ctx, particle.x, particle.y, particle.size, particle.color, particle.rotation || 0);
          } else {
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
          return particle.life > 0;
        });
      }

      function drawHeart(ctx, x, y, size, color, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);
        ctx.scale(size / 10, size / 10);
        ctx.beginPath();
        ctx.moveTo(0, 4);
        ctx.bezierCurveTo(-8, -2, -8, -8, -4, -9);
        ctx.bezierCurveTo(-2, -10, 0, -8, 0, -5);
        ctx.bezierCurveTo(0, -8, 2, -10, 4, -9);
        ctx.bezierCurveTo(8, -8, 8, -2, 0, 4);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.restore();
      }
    }

    window.addEventListener('beforeunload', function () {
      if (timerId) {
        window.clearInterval(timerId);
      }
    });
  });
})();
