(function () {
  const questionEl = document.getElementById('question');
  const subtitleEl = document.getElementById('subtitle');
  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const buttonsEl = document.getElementById('buttons');
  const cardEl = document.querySelector('.card');
  const successState = document.getElementById('successState');

  let noClickCount = 0;
  let yesHeight = 44;
  let yesWidth = 100;
  let usedIndices = new Set();

  // Unlimited prompts for the No button (cycle through or random; never run out)
  const noPrompts = [
    "No",
    "Are you sure?",
    "Really?",
    "Pookie please 😢",
    "Don't do this to me :(",
    "You're breaking my heart",
    "I'm gonna cry...",
    "Think again?",
    "Pretty please?",
    "With a cherry on top? 🍒",
    "Pretty please with sugar on top?",
    "Reconsider?",
    "Wait wait wait!",
    "One more chance?",
    "My heart can't take it",
    "Say yes already 😭",
    "I made you cookies (in my mind)",
    "I'll give you infinite high fives",
    "The cat said you should say yes",
    "Your mom said yes (I asked her in my dreams)",
    "What about maybe?",
    "Not even a small yes?",
    "I'll be sad forever (not really but still)",
    "Pwease? 🥺",
    "I'm on my knees (emotionally)",
    "My therapist said to ask again",
    "The stars say we're meant to be",
    "My dog voted yes",
    "Try the other button 👉",
    "That button's broken, use Yes",
    "No is just Yes in disguise",
    "You clicked the wrong one",
    "Let's pretend you meant Yes",
    "I'll write you a poem",
    "I'll learn to cook (anything)",
    "I'll watch your favorite show",
    "I'll stop leaving dishes in the sink (maybe)",
    "Reject me again I dare you",
    "My confidence is shaking",
    "Okay but what if I ask nicely?",
    "What if I said please 100 times?",
    "I have a coupon for one free yes",
    "The council of valentines says yes",
    "Your future self said yes",
    "I asked the universe, it said yes",
    "The wifi said yes (I asked)",
    "Siri said you should say yes",
    "Alexa agrees with me",
    "My plant said yes (it's very wise)",
    "One yes a day keeps the sadness away",
    "Yes is the new no",
    "I'm not giving up",
    "Stubbornness is my love language",
    "I can do this all day",
    "Still here, still asking",
    "Yes would look good on you",
    "You'd make a great Valentine",
    "I'll share my snacks (all of them)",
    "I'll laugh at your jokes (even the bad ones)",
    "I'll remember your birthday",
    "I'll like your posts (even the blurry ones)",
    "Come on, you know you want to",
    "The Yes button is feeling lonely",
    "Yes is just one click away",
    "Do it for the plot",
    "Do it for the memes",
    "Do it for me 🥹",
    "I believe in you (saying yes)",
    "You're so close to making my day",
    "Almost there... the other button",
    "Wrong button! Try the pink one",
    "The pink one. The pretty one. Yes.",
    "Yes is the way",
    "This is the way (to Yes)",
    "Y E S. That one.",
    "Your finger slipped, try again",
    "Muscle memory: click Yes",
    "The Yes button is bigger now (you're welcome)",
    "Look at how big and clickable Yes is",
    "Yes has more pixels. Just saying.",
    "Yes is calling your name",
    "The universe wants you to click Yes",
    "Destiny is the Yes button",
    "Fate. Yes. Click it.",
    "I'll name a star after you (if you say yes)",
    "I'll write a song about this moment",
    "I'll tell our grandkids you said yes",
    "History will remember this click",
    "Be a hero. Click Yes.",
    "Not all heroes wear capes (some click Yes)",
    "You're stronger than the No button",
    "Break free from No. Choose Yes.",
    "Yes is freedom. Yes is love.",
    "I'm running out of prompts (not really)",
    "I have 100+ more of these",
    "We can do this forever",
    "I've got all day",
    "I've got all year",
    "Time is an illusion, Yes is forever",
    "Yes now, regret never",
    "No regrets (if you say Yes)",
    "Yes = happiness (scientifically proven)",
    "Studies show Yes is good for you",
    "Doctors recommend saying Yes",
    "Yes is gluten-free and delicious",
    "Yes has no calories",
    "Yes is eco-friendly",
    "Yes supports local Valentines",
    "Say Yes for the environment",
    "The planet needs your Yes",
    "Be kind to the planet. Say Yes.",
    "Yes is the answer to everything",
    "42 is Yes in binary (it's not but say yes)",
    "Yes is the meaning of life",
    "Yes is always the answer",
    "When in doubt, say Yes",
    "Yes is the new black",
    "Yes is trending",
    "Yes went viral (say it)",
    "Everyone's saying Yes these days",
    "Join the Yes movement",
    "Yes squad assemble",
    "One of us. One of us. Yes.",
    "Welcome to the Yes side",
    "The Yes side has cookies",
    "We have cookies (on the Yes side)",
    "Yes has better snacks",
    "Yes has better wifi",
    "Yes has a better view",
    "The grass is greener on Yes",
    "Yes is where the heart is",
    "Home is where the Yes is",
    "Yes is the key",
    "Unlock happiness with Yes",
    "Yes: the final frontier",
    "To Yes, and beyond!",
    "Yes is infinite",
    "Yes is forever",
    "Yes is eternal",
    "Yes never gets old",
    "Yes is timeless",
    "Classic Yes. Never goes out of style.",
    "Vintage Yes. Very in right now.",
    "Yes is so in right now",
    "Yes is the vibe",
    "Yes is the energy",
    "Yes is the mood",
    "Yes is everything",
    "Just Yes.",
    "Simply Yes.",
    "Only Yes.",
    "Always Yes.",
    "Forever Yes.",
    "Yes 💕",
    "Yes 💖",
    "Yes 💗",
    "Yes 🥺",
    "Yes ✨",
    "Yes 🌟",
    "Yes 💫",
    "Yes 🎉",
    "Yes 🎊",
    "Yes 💝",
    "Yes.",
  ];

  function getNextPrompt() {
    if (usedIndices.size >= noPrompts.length) {
      usedIndices.clear();
    }
    let idx;
    do {
      idx = Math.floor(Math.random() * noPrompts.length);
    } while (usedIndices.has(idx) && usedIndices.size < noPrompts.length);
    usedIndices.add(idx);
    return noPrompts[idx];
  }

  function rectanglesOverlap(r1, r2) {
    return r1.left < r2.right && r1.right > r2.left && r1.top < r2.bottom && r1.bottom > r2.top;
  }

  function moveNoButton() {
    buttonsEl.classList.add('no-running');
    if (noBtn.parentElement !== cardEl) {
      cardEl.appendChild(noBtn);
    }
    noBtn.style.position = 'absolute';
    noBtn.classList.add('run');

    const padding = 16;
    const yesMargin = 12;
    const cardRect = cardEl.getBoundingClientRect();
    const noRect = noBtn.getBoundingClientRect();
    const noW = noRect.width;
    const noH = noRect.height;
    const yesRect = yesBtn.getBoundingClientRect();
    var cardLeft = cardRect.left;
    var cardTop = cardRect.top;
    const yesZone = {
      left: (yesRect.left - cardLeft) - yesMargin,
      right: (yesRect.right - cardLeft) + yesMargin,
      top: (yesRect.top - cardTop) - yesMargin,
      bottom: (yesRect.bottom - cardTop) + yesMargin
    };

    const cardW = cardRect.width;
    const cardH = cardRect.height;
    const minX = padding;
    const minY = padding;
    const maxX = cardW - noW - padding;
    const maxY = cardH - noH - padding;
    if (maxX <= minX || maxY <= minY) return;

    for (var tries = 0; tries < 40; tries++) {
      const x = minX + Math.random() * (maxX - minX);
      const y = minY + Math.random() * (maxY - minY);
      const noAt = { left: x, right: x + noW, top: y, bottom: y + noH };
      if (!rectanglesOverlap(noAt, yesZone)) {
        noBtn.style.left = x + 'px';
        noBtn.style.top = y + 'px';
        return;
      }
    }

    var fallbackX = minX;
    var fallbackY = minY;
    if (yesRect.left > cardLeft + cardW / 2) fallbackX = maxX;
    if (yesRect.top > cardTop + cardH / 2) fallbackY = maxY;
    noBtn.style.left = fallbackX + 'px';
    noBtn.style.top = fallbackY + 'px';
  }

  noBtn.addEventListener('click', function () {
    noClickCount++;
    noBtn.textContent = getNextPrompt();

    if (noClickCount <= 3) {
      buttonsEl.classList.remove('no-running');
      if (noBtn.parentElement === cardEl) {
        buttonsEl.appendChild(noBtn);
      }
      noBtn.style.position = '';
      noBtn.style.left = '';
      noBtn.style.top = '';
    } else {
      moveNoButton();
    }

    yesHeight += 12;
    yesWidth += 20;
    yesBtn.style.height = yesHeight + 'px';
    yesBtn.style.minWidth = yesWidth + 'px';
    yesBtn.style.fontSize = Math.min(14 + noClickCount * 2, 28) + 'px';
  });

  noBtn.addEventListener('mouseenter', function () {
    if (noClickCount > 2) {
      moveNoButton();
    }
  });

  yesBtn.addEventListener('click', function () {
    cardEl.hidden = true;
    successState.hidden = false;

    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#e11d48', '#fda4af', '#fce7f3', '#c9a227']
    });

    setTimeout(function () {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 200);

    const heartsContainer = document.getElementById('hearts');
    for (let i = 0; i < 12; i++) {
      const span = document.createElement('span');
      span.textContent = '💕';
      span.style.animationDelay = (i * 0.1) + 's';
      heartsContainer.appendChild(span);
    }
  });

  var dayMessages = [
    { title: 'Rose Day', emoji: '🌹', message: 'Like every rose has its thorns, every moment with you has its magic. This rose is for you — my first bloom of love this week. 🌹' },
    { title: 'Propose Day', emoji: '💍', message: 'I already said it when I asked you to be my Valentine — but today I say it again: will you stay by my side? You make my world complete. 💍' },
    { title: 'Chocolate Day', emoji: '🍫', message: 'You\'re sweeter than any chocolate. Life with you is the sweetest treat. Here\'s to us — may every day taste this good! 🍫' },
    { title: 'Teddy Day', emoji: '🧸', message: 'You\'re my favourite cuddle buddy. No teddy could ever replace the warmth of your hug. Sending you the biggest squeeze today! 🧸' },
    { title: 'Promise Day', emoji: '🤝', message: 'I promise to make you smile, to be there when you need me, and to choose us every single day. This promise is forever. 🤝' },
    { title: 'Hug Day', emoji: '🤗', message: 'One hug from you and everything feels right. Today and every day — here\'s to holding you close. 🤗' },
    { title: 'Kiss Day', emoji: '💋', message: 'Every kiss with you feels like the first. Here\'s to many more — you\'re my favourite hello and my hardest goodbye. 💋' },
    { title: 'Valentine\'s Day', emoji: '💕', message: 'Happy Valentine\'s Day! You said yes and you made my world. Thank you for being mine. I love you. 💕' }
  ];

  var dayModalOverlay = document.getElementById('dayModalOverlay');
  var dayModalClose = document.getElementById('dayModalClose');
  var dayModalEmoji = document.getElementById('dayModalEmoji');
  var dayModalTitle = document.getElementById('dayModalTitle');
  var dayModalMessage = document.getElementById('dayModalMessage');

  function showDayModal(dayIndex) {
    var d = dayMessages[dayIndex];
    if (!d) return;
    dayModalEmoji.textContent = d.emoji;
    dayModalTitle.textContent = d.title;
    dayModalMessage.textContent = d.message;
    dayModalOverlay.hidden = false;
    dayModalOverlay.setAttribute('aria-hidden', 'false');
  }

  function hideDayModal() {
    dayModalOverlay.hidden = true;
    dayModalOverlay.setAttribute('aria-hidden', 'true');
  }

  document.querySelectorAll('.day-click-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var dayIndex = parseInt(btn.getAttribute('data-day'), 10);
      showDayModal(dayIndex);
    });
  });

  if (dayModalClose) dayModalClose.addEventListener('click', hideDayModal);
  if (dayModalOverlay) {
    dayModalOverlay.addEventListener('click', function (e) {
      if (e.target === dayModalOverlay) hideDayModal();
    });
  }
})();
