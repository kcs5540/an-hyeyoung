/**
 * MAIN INTERACTION ENGINE - 안혜영 FP PERSONAL BRANDING LANDING PAGE
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. MOBILE NAVIGATION DRAWER & HAMBURGER TOGGLE
     -------------------------------------------------------------------------- */
  const mobileToggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileCloseBtn = document.getElementById('mobile-menu-close');
  const mobileNavOverlay = document.getElementById('mobile-nav-overlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-link');

  function openMobileMenu() {
    if (mobileNavOverlay && mobileToggleBtn) {
      mobileNavOverlay.classList.add('active');
      mobileNavOverlay.setAttribute('aria-hidden', 'false');
      mobileToggleBtn.classList.add('active');
      document.body.classList.add('no-scroll');
    }
  }

  function closeMobileMenu() {
    if (mobileNavOverlay && mobileToggleBtn) {
      mobileNavOverlay.classList.remove('active');
      mobileNavOverlay.setAttribute('aria-hidden', 'true');
      mobileToggleBtn.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', () => {
      if (mobileNavOverlay.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileCloseBtn) {
    mobileCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', (e) => {
      if (e.target === mobileNavOverlay) {
        closeMobileMenu();
      }
    });
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  /* --------------------------------------------------------------------------
     2. INSURANCE PARTNERS DATA (FROM BUSINESS CARD BACK-SIDE)
     -------------------------------------------------------------------------- */
  const lifeInsuranceList = [
    { name: '한화생명', phone: '1588-6363', isHanwha: true },
    { name: '교보생명', phone: '1588-1001' },
    { name: '삼성생명', phone: '1588-3114' },
    { name: '신한라이프', phone: '1588-5580' },
    { name: '동양생명', phone: '1577-1004' },
    { name: 'AIA생명', phone: '1588-9898' },
    { name: '미래에셋생명', phone: '1588-0220' },
    { name: 'CHUBB라이프', phone: '1599-4600' },
    { name: '흥국생명', phone: '1588-2288' },
    { name: 'KDB생명', phone: '1588-4040' },
    { name: 'MetLife', phone: '1588-9600' },
    { name: 'DB생명', phone: '1588-3131' },
    { name: '라이나생명', phone: '1588-0058' },
    { name: '현대라이프', phone: '1577-3311' },
    { name: 'ABL생명', phone: '1588-6500' },
    { name: 'NH농협생명', phone: '1544-4000' }
  ];

  const nonLifeInsuranceList = [
    { name: '한화손해보험', phone: '1566-8000', isHanwha: true },
    { name: '현대해상', phone: '1588-5656' },
    { name: 'DB손해보험', phone: '1588-0100' },
    { name: 'KB손해보험', phone: '1544-0114' },
    { name: '삼성화재', phone: '1588-5114' },
    { name: 'NH농협손해보험', phone: '1644-9000' },
    { name: 'KB생명', phone: '1588-9922' },
    { name: '롯데손해보험', phone: '1588-3344' },
    { name: '메리츠화재', phone: '1566-7711' },
    { name: '흥국화재', phone: '1688-1688' },
    { name: 'MG손해보험', phone: '1588-5959' }
  ];

  /* --------------------------------------------------------------------------
     3. RENDER INSURANCE GRID CARDS
     -------------------------------------------------------------------------- */
  const lifeWrap = document.getElementById('life-cards');
  const nonlifeWrap = document.getElementById('nonlife-cards');

  function createCardHTML(item) {
    const rawPhone = item.phone.replace(/-/g, '');
    const hanwhaClass = item.isHanwha ? 'hanwha-highlight' : '';
    const hanwhaTag = item.isHanwha ? '<span class="hanwha-tag">한화 파트너</span>' : '';

    return `
      <div class="insurance-card ${hanwhaClass}" data-name="${item.name}" data-phone="${item.phone}">
        <div class="company-name">
          <span>${item.name}</span>
          ${hanwhaTag}
        </div>
        <div class="phone-number-wrap">
          <a href="tel:${rawPhone}" class="phone-link" aria-label="${item.name} 전화걸기">
            <i class="fa-solid fa-phone"></i>
            <span>${item.phone}</span>
          </a>
          <button type="button" class="btn-copy-num" data-phone="${item.phone}">
            <i class="fa-regular fa-copy"></i> 복사
          </button>
        </div>
      </div>
    `;
  }

  function renderGrid() {
    if (lifeWrap) {
      lifeWrap.innerHTML = lifeInsuranceList.map(createCardHTML).join('');
    }
    if (nonlifeWrap) {
      nonlifeWrap.innerHTML = nonLifeInsuranceList.map(createCardHTML).join('');
    }
  }

  renderGrid();

  /* --------------------------------------------------------------------------
     4. SEARCH & CATEGORY FILTER ENGINE
     -------------------------------------------------------------------------- */
  const searchInput = document.getElementById('insurance-search');
  const btnClear = document.getElementById('btn-clear');
  const tabBtns = document.querySelectorAll('.tab-btn');
  const categoryGroups = document.querySelectorAll('.insurance-category-group');

  function filterInsuranceCards() {
    const query = searchInput.value.trim().toLowerCase();
    const activeTab = document.querySelector('.tab-btn.active').dataset.category;

    categoryGroups.forEach(group => {
      const categoryType = group.dataset.group;
      if (activeTab === 'all' || activeTab === categoryType) {
        group.style.display = 'flex';
      } else {
        group.style.display = 'none';
      }
    });

    const cards = document.querySelectorAll('.insurance-card');
    cards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      const phone = card.dataset.phone.replace(/-/g, '');
      const match = name.includes(query) || phone.includes(query);

      if (match) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', filterInsuranceCards);
  }

  if (btnClear) {
    btnClear.addEventListener('click', () => {
      searchInput.value = '';
      filterInsuranceCards();
      searchInput.focus();
    });
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterInsuranceCards();
    });
  });

  // Delegate Copy Phone Number
  document.addEventListener('click', (e) => {
    const copyBtn = e.target.closest('.btn-copy-num');
    if (copyBtn) {
      const phone = copyBtn.dataset.phone;
      navigator.clipboard.writeText(phone).then(() => {
        showToast(`${phone} 번호가 복사되었습니다.`);
      });
    }
  });

  /* --------------------------------------------------------------------------
     5. COPY ADDRESS BUTTON & TOAST NOTIFICATION
     -------------------------------------------------------------------------- */
  const btnCopyAddr = document.getElementById('btn-copy-addr');
  if (btnCopyAddr) {
    btnCopyAddr.addEventListener('click', () => {
      const address = "제주시 동광로 30 (이도이동) 한화생명 제주사옥 8층";
      navigator.clipboard.writeText(address).then(() => {
        showToast("주소가 클립보드에 복사되었습니다!");
      });
    });
  }

  function showToast(message) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        left: 50%;
        transform: translateX(-50%) translateY(100px);
        padding: 0.9rem 1.8rem;
        background: rgba(10, 25, 47, 0.94);
        color: #FFF;
        font-weight: 700;
        font-size: 0.9rem;
        border-radius: 999px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.25);
        z-index: 3000;
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease;
        opacity: 0;
        backdrop-filter: blur(12px);
        display: flex;
        align-items: center;
        gap: 0.5rem;
      `;
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:#F37321;"></i> ${message}`;
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(-50%) translateY(100px)';
    }, 2800);
  }

  /* --------------------------------------------------------------------------
     6. 3D TILT EFFECT ON CARDS (DESKTOP ONLY)
     -------------------------------------------------------------------------- */
  if (window.innerWidth > 768) {
    const tiltCards = document.querySelectorAll('.tilt-card');
    tiltCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = ((y - centerY) / centerY) * -6;
        const rotateY = ((x - centerX) / centerX) * 6;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)`;
      });
    });
  }

  /* --------------------------------------------------------------------------
     7. SOLUTION CARD TRIGGER TO FORM
     -------------------------------------------------------------------------- */
  const solutionTriggers = document.querySelectorAll('.btn-solution-trigger');
  const inquirySelect = document.getElementById('inquiry-type');

  solutionTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const solutionName = btn.dataset.solution;
      if (inquirySelect && solutionName) {
        for (let option of inquirySelect.options) {
          if (option.value.includes(solutionName.split('/')[0])) {
            option.selected = true;
            break;
          }
        }
      }
    });
  });

  /* --------------------------------------------------------------------------
     8. FORM HANDLING & REAL SMS DIRECT LINK (010-8914-3810)
     -------------------------------------------------------------------------- */
  const phoneInput = document.getElementById('user-phone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      let val = e.target.value.replace(/[^0-9]/g, '');
      if (val.length > 3 && val.length <= 7) {
        val = val.slice(0, 3) + '-' + val.slice(3);
      } else if (val.length > 7) {
        val = val.slice(0, 3) + '-' + val.slice(3, 7) + '-' + val.slice(7, 11);
      }
      e.target.value = val;
    });
  }

  const leadForm = document.getElementById('lead-form');

  if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('user-name').value.trim();
      const phone = document.getElementById('user-phone').value.trim();
      const inquirySelect = document.getElementById('inquiry-type');
      const type = inquirySelect ? inquirySelect.value : '종합 보장분석 & 리모델링';
      const messageInput = document.getElementById('user-message');
      const message = messageInput ? messageInput.value.trim() : '';
      const privacy = document.getElementById('privacy-agree').checked;

      if (!name) {
        showToast("성함을 입력해 주세요.");
        document.getElementById('user-name').focus();
        return;
      }
      if (!phone || phone.length < 12) {
        showToast("올바른 연락처 번호를 입력해 주세요.");
        document.getElementById('user-phone').focus();
        return;
      }
      if (!privacy) {
        showToast("개인정보 수집 및 이용에 동의해 주세요.");
        return;
      }

      // Exact SMS format requested
      const smsBody = `[안혜영 FP 홈페이지 상담신청]
- 성함: ${name}
- 연락처: ${phone}
- 신청 분야: ${type}
- 요청 내용: ${message || '없음'}`;

      const targetPhoneNumber = '01089143810';
      const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
      const delimiter = isIOS ? '&' : '?';
      const smsUrl = `sms:${targetPhoneNumber}${delimiter}body=${encodeURIComponent(smsBody)}`;

      showToast("문자 앱으로 이동합니다. 전송 버튼을 눌러주세요!");

      setTimeout(() => {
        window.location.href = smsUrl;
      }, 400);
    });
  }

  /* --------------------------------------------------------------------------
     9. GSAP SCROLL TRIGGER REVEALS & NAVBAR ACTIVE STATE
     -------------------------------------------------------------------------- */
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.utils.toArray('section').forEach(section => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          toggleActions: 'play none none reverse'
        },
        opacity: 0,
        y: 25,
        duration: 0.8,
        ease: 'power3.out'
      });
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        const top = sec.offsetTop - 120;
        const height = sec.offsetHeight;
        if (window.scrollY >= top && window.scrollY < top + height) {
          current = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }

});
