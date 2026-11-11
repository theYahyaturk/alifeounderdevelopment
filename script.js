/**
 * Alifeo Minimal "Cooking" Under Development Experience
 * Features:
 * - Animated Dynamic Typewriter Search Bar ("Something Great Is Cooking..." -> "Try Game 🎮")
 * - Interactive Tic-Tac-Toe (X / O) Game with AI opponent & scoreboard
 * - Form submission directly to alifeo.com@gmail.com
 */

const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/alifeo.com@gmail.com';

/* ==========================================================================
   1. TYPEWRITER ANIMATION IN SEARCH BAR
   ========================================================================== */
const searchTexts = [
  'Something Great Is Cooking...',
  'Tap to Try Game',
  'Play X / O while we cook!'
];

let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriterText');
const chipLabel = document.getElementById('chipLabel');

function typeEffect() {
  const currentFullText = searchTexts[textIndex];

  if (isDeleting) {
    typewriterEl.innerText = currentFullText.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.innerText = currentFullText.substring(0, charIndex + 1);
    charIndex++;
  }

  // Update chip text without any dot
  if (currentFullText.includes('Game') || currentFullText.includes('Play')) {
    if (chipLabel) chipLabel.innerText = 'Play Game';
  } else {
    if (chipLabel) chipLabel.innerText = 'Explore';
  }

  let typingSpeed = isDeleting ? 40 : 80;

  if (!isDeleting && charIndex === currentFullText.length) {
    typingSpeed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex = (textIndex + 1) % searchTexts.length;
    typingSpeed = 400;
  }

  setTimeout(typeEffect, typingSpeed);
}

/* ==========================================================================
   TICKET BANNER AUTO-CAROUSEL & DOTS
   ========================================================================== */
let currentSlide = 0;
const totalSlides = 2;
const carouselViewport = document.getElementById('ticketCarouselViewport');
let carouselInterval = null;

function getDots() {
  return document.querySelectorAll('.carousel-dot');
}

function updateCarouselUI(index) {
  currentSlide = index;
  if (carouselViewport) {
    const rect = carouselViewport.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
    const slideWidth = carouselViewport.clientWidth;
    if (slideWidth > 0 && isVisible) {
      carouselViewport.scrollTo({
        left: slideWidth * index,
        behavior: 'smooth'
      });
    } else if (slideWidth > 0) {
      carouselViewport.scrollLeft = slideWidth * index;
    }
  }
  getDots().forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

function goToSlide(index) {
  updateCarouselUI(index);
  resetCarouselTimer();
}

function startCarouselTimer() {
  if (carouselInterval) clearInterval(carouselInterval);
  carouselInterval = setInterval(() => {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarouselUI(currentSlide);
  }, 4500);
}

function resetCarouselTimer() {
  startCarouselTimer();
}

document.addEventListener('DOMContentLoaded', () => {
  if (typewriterEl) typeEffect();
  startCarouselTimer();
  
  if (carouselViewport) {
    carouselViewport.addEventListener('scroll', () => {
      const slideWidth = carouselViewport.offsetWidth;
      if (slideWidth > 0) {
        const activeIdx = Math.round(carouselViewport.scrollLeft / slideWidth);
        if (activeIdx !== currentSlide && activeIdx < totalSlides) {
          currentSlide = activeIdx;
          getDots().forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
          });
        }
      }
    }, { passive: true });
  }

  // In-House Product Ribbon Background parallax on scroll & interactive pot escape
  const inhouseRibbon1 = document.querySelector('.inhouse-ribbon-bg-1');
  const inhouseRibbon2 = document.querySelector('.inhouse-ribbon-bg-2');
  const escapePotWrapper = document.getElementById('escapePotWrapper');
  const stageProduct1 = document.getElementById('stageProduct1');
  const stageProduct2 = document.getElementById('stageProduct2');
  let hasEscaped = false;
  let hasWonReward = false;
  
  window.addEventListener('scroll', () => {
    // Ribbon 1 parallax calculation: driven by stageProduct1 visibility
    if (stageProduct1 && inhouseRibbon1) {
      const rect = stageProduct1.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only track when Product 1 is in view or approaching view
      if (rect.top < windowHeight && rect.bottom > 0) {
        // Calculate progress as stage moves from bottom of screen to upper-middle
        const progress1 = Math.min(Math.max((windowHeight - rect.top) / (windowHeight * 0.75), 0), 1);
        inhouseRibbon1.style.transform = `translateX(-${progress1 * 50}%)`;

        // When ribbon has moved ~70% (progress >= 0.70) and hasn't escaped yet:
        if (progress1 >= 0.70 && !hasEscaped && !hasWonReward && escapePotWrapper) {
          triggerPotEscape();
        }
      }
    }

    // Ribbon 2 parallax calculation: driven by stageProduct2 visibility
    if (stageProduct2 && inhouseRibbon2) {
      const rect2 = stageProduct2.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect2.top < windowHeight && rect2.bottom > 0) {
        const progress2 = Math.min(Math.max((windowHeight - rect2.top) / (windowHeight * 0.75), 0), 1);
        inhouseRibbon2.style.transform = `translateX(-${progress2 * 50}%)`;
      }
    }
  }, { passive: true });

  function getMobileBounds() {
    const mobileContainer = document.querySelector('.hero-container') || document.querySelector('.container') || document.body;
    const rect = mobileContainer.getBoundingClientRect();
    return {
      left: Math.max(0, rect.left),
      right: Math.min(window.innerWidth, rect.right),
      width: rect.width
    };
  }

  function triggerPotEscape() {
    if (hasEscaped || hasWonReward) return;
    hasEscaped = true;
    canCatch = false; // Alternating cycle starts: 1st touch will dodge/jump far away!
    escapePotWrapper.classList.add('floating-escaped');
    
    // Throw far away from the stage frame - fly way up towards the top fold/categories
    const bounds = getMobileBounds();
    const potWidth = escapePotWrapper.offsetWidth || 130;
    
    const launchTop = Math.max(85, Math.min(125, window.innerHeight * 0.16));
    const launchLeft = Math.random() > 0.5 
      ? Math.max(bounds.left + 24, bounds.left + bounds.width * 0.12)
      : Math.min(bounds.right - potWidth - 24, bounds.right - bounds.width * 0.12 - potWidth);

    escapePotWrapper.style.transition = 'all 0.65s cubic-bezier(0.18, 0.89, 0.32, 1.25)';
    escapePotWrapper.style.left = `${launchLeft}px`;
    escapePotWrapper.style.top = `${launchTop}px`;
    escapePotWrapper.classList.add('dodge-wiggle');

    // Smooth scroll up so user sees it launched far away from the frame
    window.scrollBy({ top: -160, behavior: 'smooth' });

    setTimeout(() => {
      escapePotWrapper.style.transition = '';
      escapePotWrapper.classList.remove('dodge-wiggle');
    }, 650);

    const catchBubble = document.getElementById('potCatchBubble');
    if (catchBubble) {
      catchBubble.innerHTML = `<i class="fa-solid fa-hand"></i> <span>Drag &amp; put me back in the frame! 🎯</span>`;
    }

    showToast('🚀 Planter broke loose! Catch & put it back in the frame!');
    initPotDragAndDrop();
  }

  // Alternating cycle: Jump -> Catch -> (if dropped outside) -> Jump -> Catch...
  let canCatch = false;
  let dragListenersAttached = false;

  function initPotDragAndDrop() {
    if (!escapePotWrapper || dragListenersAttached) return;
    dragListenersAttached = true;

    let isDragging = false;
    let startX, startY, initialLeft, initialTop;

    const onPointerDown = (e) => {
      if (!hasEscaped || hasWonReward) return;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      // ALTERNATING CYCLE - JUMP TURN (Odd attempts: 1st, 3rd, 5th...)
      if (!canCatch) {
        canCatch = true; // Next touch will successfully catch & drag!
        const bounds = getMobileBounds();
        const potWidth = escapePotWrapper.offsetWidth || 130;
        const currentLeft = escapePotWrapper.offsetLeft;
        const currentTop = escapePotWrapper.offsetTop;

        // Jump far away across to the other side & alternate height
        const jumpDir = currentLeft > (bounds.left + bounds.width / 2) ? -1 : 1;
        const jumpX = jumpDir * (bounds.width * 0.44);
        const targetTop = currentTop < 150 ? (currentTop + 130) : (currentTop - 110);
        const targetLeft = Math.max(bounds.left + 16, Math.min(currentLeft + jumpX, bounds.right - potWidth - 16));
        const clampedTop = Math.max(80, Math.min(targetTop, window.innerHeight - 200));

        escapePotWrapper.style.transition = 'all 0.5s cubic-bezier(0.22, 1, 0.36, 1)';
        escapePotWrapper.style.left = `${targetLeft}px`;
        escapePotWrapper.style.top = `${clampedTop}px`;
        escapePotWrapper.classList.add('dodge-wiggle');

        window.scrollBy({ top: (currentTop < 150 ? 60 : -90), behavior: 'smooth' });

        const catchBubble = document.getElementById('potCatchBubble');
        if (catchBubble) {
          catchBubble.innerHTML = `<i class="fa-solid fa-hand"></i> <span>😜 Missed! Catch &amp; put me in the frame! 🎯</span>`;
        }
        showToast('💨 Missed! Catch & put it back in the frame!');

        setTimeout(() => {
          escapePotWrapper.style.transition = '';
          escapePotWrapper.classList.remove('dodge-wiggle');
        }, 520);

        if (e.cancelable) e.preventDefault();
        return;
      }

      // ALTERNATING CYCLE - CATCH TURN (Even attempts: 2nd, 4th, 6th...)
      isDragging = true;
      startX = clientX;
      startY = clientY;
      initialLeft = escapePotWrapper.offsetLeft;
      initialTop = escapePotWrapper.offsetTop;
      escapePotWrapper.style.transition = '';
      escapePotWrapper.classList.add('is-dragging');

      const catchBubble = document.getElementById('potCatchBubble');
      if (catchBubble) {
        catchBubble.innerHTML = `<i class="fa-solid fa-hand"></i> <span>🏃 Got me! Put me back in the frame! 🎯</span>`;
      }

      if (e.cancelable) e.preventDefault();
    };

    const onPointerMove = (e) => {
      if (!isDragging) return;
      if (e.cancelable) e.preventDefault();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const dx = clientX - startX;
      const dy = clientY - startY;
      
      const bounds = getMobileBounds();
      const potWidth = escapePotWrapper.offsetWidth || 130;
      const potHeight = escapePotWrapper.offsetHeight || 140;

      let newLeft = initialLeft + dx;
      let newTop = initialTop + dy;

      // Auto-scroll screen smoothly when dragging near top or bottom edges
      if (clientY > window.innerHeight - 85) {
        window.scrollBy({ top: 7, behavior: 'auto' });
      } else if (clientY < 85) {
        window.scrollBy({ top: -7, behavior: 'auto' });
      }

      // CLAMP STRICTLY INSIDE MOBILE CONTAINER (NO HORIZONTAL OVERFLOW)
      newLeft = Math.max(bounds.left + 8, Math.min(newLeft, bounds.right - potWidth - 8));
      newTop = Math.max(40, Math.min(newTop, window.innerHeight - potHeight - 20));

      escapePotWrapper.style.left = `${newLeft}px`;
      escapePotWrapper.style.top = `${newTop}px`;

      // Check collision with the original stage frame
      if (stageProduct1) {
        const stageRect = stageProduct1.getBoundingClientRect();
        const potRect = escapePotWrapper.getBoundingClientRect();

        const overlaps = !(
          potRect.right < stageRect.left ||
          potRect.left > stageRect.right ||
          potRect.bottom < stageRect.top ||
          potRect.top > stageRect.bottom
        );

        const catchBubble = document.getElementById('potCatchBubble');

        if (overlaps) {
          stageProduct1.style.outline = '3px solid #075c37';
          stageProduct1.style.background = '#eaf6f0';
          if (catchBubble) {
            catchBubble.innerHTML = `<span>✨ Release now to lock me in! 🎯</span>`;
          }
        } else {
          stageProduct1.style.outline = '2px dashed #075c37';
          stageProduct1.style.background = '#ffffff';
          if (catchBubble) {
            catchBubble.innerHTML = `<span>🎯 Drag me into the frame below!</span>`;
          }
        }
      }
    };

    const onPointerUp = () => {
      if (!isDragging) return;
      isDragging = false;
      escapePotWrapper.classList.remove('is-dragging');

      if (stageProduct1) {
        const stageRect = stageProduct1.getBoundingClientRect();
        const potRect = escapePotWrapper.getBoundingClientRect();

        const overlaps = !(
          potRect.right < stageRect.left ||
          potRect.left > stageRect.right ||
          potRect.bottom < stageRect.top ||
          potRect.top > stageRect.bottom
        );

        stageProduct1.style.outline = '';
        stageProduct1.style.background = '';

        if (overlaps && !hasWonReward) {
          // FINAL VICTORY & ELASTIC SNAP INTO PLACE
          hasWonReward = true;
          hasEscaped = false;

          // Trigger Confetti Burst around pot
          triggerConfettiBurst(potRect.left + potRect.width / 2, potRect.top + potRect.height / 2);

          // Elastic snap animation & restore
          escapePotWrapper.classList.add('snapping-success');
          restorePotToFrame();
          
          setTimeout(() => {
            openRewardModal();
          }, 350);
        } else {
          // DROPPED OUTSIDE FRAME: Slipped away! Alternating cycle triggers jump again!
          canCatch = false; // Next touch will jump/dodge again!

          const bounds = getMobileBounds();
          const potWidth = escapePotWrapper.offsetWidth || 130;
          const currentLeft = escapePotWrapper.offsetLeft;
          const currentTop = escapePotWrapper.offsetTop;

          // Leap away playfully from drop position
          const jumpDir = currentLeft > (bounds.left + bounds.width / 2) ? -1 : 1;
          const jumpX = jumpDir * (bounds.width * 0.38);
          const jumpY = -110 - Math.random() * 40;

          const targetLeft = Math.max(bounds.left + 16, Math.min(currentLeft + jumpX, bounds.right - potWidth - 16));
          const targetTop = Math.max(80, Math.min(currentTop + jumpY, window.innerHeight - 200));

          escapePotWrapper.style.transition = 'all 0.48s cubic-bezier(0.22, 1, 0.36, 1)';
          escapePotWrapper.style.left = `${targetLeft}px`;
          escapePotWrapper.style.top = `${targetTop}px`;
          escapePotWrapper.classList.add('dodge-wiggle');

          const catchBubble = document.getElementById('potCatchBubble');
          if (catchBubble) {
            catchBubble.innerHTML = `<i class="fa-solid fa-hand"></i> <span>😜 Slipped away! Catch &amp; put me in the frame! 🎯</span>`;
          }

          showToast('💨 Slipped away! Catch & put it back in the frame!');

          setTimeout(() => {
            escapePotWrapper.style.transition = '';
            escapePotWrapper.classList.remove('dodge-wiggle');
          }, 500);
        }
      }
    };

    escapePotWrapper.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    escapePotWrapper.addEventListener('touchstart', onPointerDown, { passive: false });
    window.addEventListener('touchmove', onPointerMove, { passive: false });
    window.addEventListener('touchend', onPointerUp);
  }

  function triggerConfettiBurst(x, y) {
    const colors = ['#075c37', '#f5b014', '#25d366', '#3b82f6', '#ec4899'];
    for (let i = 0; i < 22; i++) {
      const p = document.createElement('div');
      p.className = 'confetti-particle';
      const angle = (Math.PI * 2 * i) / 22;
      const velocity = 35 + Math.random() * 50;
      const dx = Math.cos(angle) * velocity;
      const dy = Math.sin(angle) * velocity - 15;
      p.style.setProperty('--dx', `${dx}px`);
      p.style.setProperty('--dy', `${dy}px`);
      p.style.backgroundColor = colors[i % colors.length];
      p.style.left = `${x}px`;
      p.style.top = `${y}px`;
      document.body.appendChild(p);
      setTimeout(() => p.remove(), 1200);
    }
  }

  function restorePotToFrame() {
    escapePotWrapper.classList.remove('floating-escaped');
    escapePotWrapper.classList.remove('snapping-success');
    escapePotWrapper.style.position = '';
    escapePotWrapper.style.top = '';
    escapePotWrapper.style.left = '';
    escapePotWrapper.style.animation = '';
    showToast('🎉 Perfect! You caught the runaway planter!');
  }

  updateCartBadge();
});

/* ==========================================================================
   FREE MINI POT REWARD MODAL & SHARE
   ========================================================================== */
const winRewardModal = document.getElementById('winRewardModal');

function openRewardModal() {
  if (winRewardModal) {
    winRewardModal.classList.add('active');
  }
}

function closeRewardModal() {
  if (winRewardModal) {
    winRewardModal.classList.remove('active');
  }
}

if (winRewardModal) {
  winRewardModal.addEventListener('click', (e) => {
    if (e.target === winRewardModal) closeRewardModal();
  });
}

function copyVoucherCode() {
  const code = 'FREEMINIPOT';
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(code).then(() => {
      const label = document.getElementById('voucherCopyLabel');
      if (label) label.textContent = 'Copied!';
      showToast('🎉 Voucher FREEMINIPOT copied!');
      setTimeout(() => {
        if (label) label.textContent = 'Copy';
      }, 2500);
    }).catch(() => {
      showToast('🎉 Voucher code: FREEMINIPOT');
    });
  } else {
    showToast('🎉 Voucher code: FREEMINIPOT');
  }
}

function shareWithFriendsWhatsApp() {
  const shareText = encodeURIComponent(
    "Hey! Download Alifeo App on Google Play Store & get a chance to win a Free Mini Pot! 🪴✨\n\nDownload here: https://play.google.com/store/apps/details?id=com.alifeo.app&hl=en-US"
  );
  window.open(`https://wa.me/?text=${shareText}`, '_blank');
}

/* ==========================================================================
   CART & ORDER NOTICE SYSTEM (LOCAL STORAGE & FEEDBACK)
   ========================================================================== */
function getCartItems() {
  try {
    return JSON.parse(localStorage.getItem('alifeo_cart_items') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCartItems(items) {
  localStorage.setItem('alifeo_cart_items', JSON.stringify(items));
  updateCartBadge();
}

function updateCartBadge() {
  const badge = document.getElementById('navCartCount');
  if (badge) {
    const items = getCartItems();
    const count = items.reduce((acc, it) => acc + (it.qty || 1), 0);
    badge.innerText = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function addToCart(product) {
  const items = getCartItems();
  const existing = items.find(i => i.id === product.id);
  if (existing) {
    existing.qty = (existing.qty || 1) + 1;
  } else {
    items.push({ ...product, qty: 1 });
  }
  saveCartItems(items);
  showToast(`Added to cart! Total items: ${items.reduce((acc, it) => acc + it.qty, 0)}`);
}

function handleBuyNowClick(product) {
  const prod = product || { id: 'inhouse-planter-01', name: 'Handcrafted Floral Planter', price: 299, image: 'product-pot.png' };
  addToCart(prod);
  openOrderNoticeModal();
}

const orderNoticeModal = document.getElementById('orderNoticeModal');
function openOrderNoticeModal() {
  if (orderNoticeModal) {
    orderNoticeModal.classList.add('active');
  }
}

function closeOrderNoticeModal() {
  if (orderNoticeModal) {
    orderNoticeModal.classList.remove('active');
  }
}

if (orderNoticeModal) {
  orderNoticeModal.addEventListener('click', (e) => {
    if (e.target === orderNoticeModal) closeOrderNoticeModal();
  });
}

function handleSearchBarClick() {
  openGameModal();
}

/* ==========================================================================
   2. TIC-TAC-TOE (X / O) GAME LOGIC
   ========================================================================== */
let board = Array(9).fill(null);
let humanPlayer = 'X';
let aiPlayer = 'O';
let isGameOver = false;
let scores = { x: 0, ties: 0, o: 0 };

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

const gameModal = document.getElementById('gameModal');
const gameCells = document.querySelectorAll('.game-cell');
const statusText = document.getElementById('gameStatusText');
const scoreXEl = document.getElementById('scoreX');
const scoreTiesEl = document.getElementById('scoreTies');
const scoreOEl = document.getElementById('scoreO');

function openGameModal() {
  gameModal.classList.add('active');
  resetGameBoard();
}

function closeGameModal() {
  gameModal.classList.remove('active');
}

gameModal.addEventListener('click', (e) => {
  if (e.target === gameModal) closeGameModal();
});

gameCells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

function handleCellClick(e) {
  const index = e.target.getAttribute('data-index');
  if (board[index] || isGameOver) return;

  makeMove(index, humanPlayer);

  if (!checkGameEnd()) {
    statusText.innerHTML = `AI Bot is thinking...`;
    setTimeout(aiTurn, 350);
  }
}

function makeMove(index, player) {
  board[index] = player;
  const cell = document.querySelector(`.game-cell[data-index="${index}"]`);
  cell.innerText = player;
  cell.classList.add(player.toLowerCase());
  cell.disabled = true;
}

function aiTurn() {
  if (isGameOver) return;

  let bestMove = findWinningMove(aiPlayer);

  if (bestMove === null) {
    bestMove = findWinningMove(humanPlayer);
  }

  if (bestMove === null && !board[4]) {
    bestMove = 4;
  }

  if (bestMove === null) {
    const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null);
    if (emptyIndices.length > 0) {
      bestMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }
  }

  if (bestMove !== null) {
    makeMove(bestMove, aiPlayer);
    checkGameEnd();
  }
}

function findWinningMove(player) {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    const values = [board[a], board[b], board[c]];
    if (values.filter(v => v === player).length === 2 && values.includes(null)) {
      if (board[a] === null) return a;
      if (board[b] === null) return b;
      if (board[c] === null) return c;
    }
  }
  return null;
}

function checkGameEnd() {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      isGameOver = true;
      highlightWinningCells(combo);

      if (board[a] === humanPlayer) {
        statusText.innerHTML = `<strong style="color: #075c37;">You Won!</strong> Amazing move!`;
        scores.x++;
        scoreXEl.innerText = scores.x;
      } else {
        statusText.innerHTML = `<strong style="color: #f59e0b;">AI Won!</strong> Try again!`;
        scores.o++;
        scoreOEl.innerText = scores.o;
      }
      return true;
    }
  }

  if (!board.includes(null)) {
    isGameOver = true;
    statusText.innerHTML = `<strong>It's a Tie!</strong> Well played.`;
    scores.ties++;
    scoreTiesEl.innerText = scores.ties;
    return true;
  }

  statusText.innerHTML = `Your turn: <strong>Player (X)</strong>`;
  return false;
}

function highlightWinningCells(combo) {
  combo.forEach(idx => {
    const cell = document.querySelector(`.game-cell[data-index="${idx}"]`);
    cell.classList.add('winning-cell');
  });
}

function resetGameBoard() {
  board = Array(9).fill(null);
  isGameOver = false;
  statusText.innerHTML = `Your turn: <strong>Player (X)</strong>`;

  gameCells.forEach(cell => {
    cell.innerText = '';
    cell.disabled = false;
    cell.className = 'game-cell';
  });
}

/* ==========================================================================
   3. DETAILS ACCORDION & GENERAL UI
   ========================================================================== */
function toggleDetails() {
  const section = document.getElementById('detailsSection');
  const btn = document.getElementById('btnWantToKnow');
  const label = btn.querySelector('.btn-know-text');

  if (section.style.display === 'block') {
    section.style.display = 'none';
    btn.classList.remove('open');
    label.innerText = 'Want to Know More?';
  } else {
    section.style.display = 'block';
    btn.classList.add('open');
    label.innerText = 'Show Less';
    section.scrollIntoView({ behavior: 'smooth' });
  }
}

function copyCouponCode(code) {
  const codeVal = code || 'FIRSTORDER';
  const label = document.getElementById('copyBtnLabel');

  navigator.clipboard.writeText(codeVal).then(() => {
    if (label) label.innerText = 'Copied!';
    showToast(`Code "${codeVal}" copied!`);
    setTimeout(() => {
      if (label) label.innerText = 'Copy Code';
    }, 2000);
  }).catch(() => {
    showToast(`Code: ${codeVal}`);
  });
}

function dismissRibbon() {
  const ribbon = document.getElementById('ticketRibbon');
  if (ribbon) ribbon.style.display = 'none';
}

const yearSpan = document.getElementById('currentYear');
if (yearSpan) yearSpan.innerText = new Date().getFullYear();

/* ==========================================================================
   4. WAITLIST MODAL & EMAIL SUBMISSION (TO: alifeo.com@gmail.com)
   ========================================================================== */
const modal = document.getElementById('waitlistModal');
const modalRoleBadge = document.getElementById('modalRoleBadge');
const modalTitle = document.getElementById('modalTitle');
const modalSubtitle = document.getElementById('modalSubtitle');
const modalRoleInput = document.getElementById('modalRoleInput');

const roleConfigs = {
  rider: {
    badge: 'RIDER WAITLIST',
    title: 'Join Express Delivery',
    subtitle: 'Flexible hours, weekly payouts, and city-wide delivery opportunities.',
    role: 'Alifeo Rider'
  },
  seller: {
    badge: 'SELLER ONBOARDING',
    title: 'Sell On Marketplace',
    subtitle: 'Connect with local buyers and expand across India.',
    role: 'Alifeo Seller'
  },
  fbs: {
    badge: 'FBS PARTNER PROGRAM',
    title: 'Join FBS (Zero Stock)',
    subtitle: 'Sell brand products with zero upfront inventory purchase. Earn commissions.',
    role: 'Alifeo FBS Partner'
  },
  general: {
    badge: 'EARLY ACCESS WAITLIST',
    title: 'Be The First To Experience',
    subtitle: 'Get early bird benefits, vouchers and launch notifications.',
    role: 'Early Customer'
  }
};

function openWaitlistModal(type = 'general') {
  const conf = roleConfigs[type] || roleConfigs.general;
  modalRoleBadge.innerText = conf.badge;
  modalTitle.innerText = conf.title;
  modalSubtitle.innerText = conf.subtitle;
  modalRoleInput.value = conf.role;

  const feedback = document.getElementById('modalFeedback');
  if (feedback) {
    feedback.innerText = '';
    feedback.className = 'form-feedback-msg';
  }

  modal.classList.add('active');
}

function closeWaitlistModal() {
  modal.classList.remove('active');
}

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeWaitlistModal();
});

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> <span>${message}</span>`;
  toast.classList.add('active');
  setTimeout(() => {
    toast.classList.remove('active');
  }, 3000);
}

async function handleFormSubmit(event, formElement) {
  event.preventDefault();

  const submitBtn = formElement.querySelector('.btn-submit-action');
  const btnText = submitBtn.querySelector('.btn-text');
  const btnSpinner = submitBtn.querySelector('.btn-spinner');
  const feedbackEl = formElement.querySelector('.form-feedback-msg');

  const formData = new FormData(formElement);
  const data = Object.fromEntries(formData.entries());

  submitBtn.disabled = true;
  if (btnText) btnText.style.display = 'none';
  if (btnSpinner) btnSpinner.style.display = 'inline-block';
  if (feedbackEl) {
    feedbackEl.innerText = '';
    feedbackEl.className = 'form-feedback-msg';
  }

  const payload = {
    _subject: `New Waitlist Application: ${data.name} (${data.role})`,
    _template: 'table',
    _captcha: 'false',
    Name: data.name,
    Role_Interest: data.role,
    Phone: data.phone,
    Email: data.email,
    City: data.city || 'India',
    Submitted_At: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })
  };

  try {
    await fetch(FORMSUBMIT_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const list = JSON.parse(localStorage.getItem('alifeo_waitlist_leads') || '[]');
    list.push(payload);
    localStorage.setItem('alifeo_waitlist_leads', JSON.stringify(list));

    formElement.reset();
    const successMsg = `🎉 Thank you ${data.name}! Your application has been sent to alifeo.com@gmail.com.`;

    if (feedbackEl) {
      feedbackEl.innerText = successMsg;
      feedbackEl.className = 'form-feedback-msg success';
    }

    showToast(`Application forwarded to alifeo.com@gmail.com!`);

    setTimeout(() => {
      if (modal.classList.contains('active')) {
        closeWaitlistModal();
      }
    }, 2000);

  } catch (err) {
    console.error('Email dispatch error:', err);
    const list = JSON.parse(localStorage.getItem('alifeo_waitlist_leads') || '[]');
    list.push(payload);
    localStorage.setItem('alifeo_waitlist_leads', JSON.stringify(list));

    if (feedbackEl) {
      feedbackEl.innerText = `✅ Thank you ${data.name}! Your request has been recorded.`;
      feedbackEl.className = 'form-feedback-msg success';
    }
    showToast(`Saved! We will contact you at ${data.email}`);
  } finally {
    submitBtn.disabled = false;
    if (btnText) btnText.style.display = 'inline-block';
    if (btnSpinner) btnSpinner.style.display = 'none';
  }
}
