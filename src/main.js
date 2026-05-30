import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './style.css'

gsap.registerPlugin(ScrollTrigger)

// ============================================================
// DOM REFS
// ============================================================
const $ = (sel, ctx = document) => ctx.querySelector(sel)
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)]

const html = document.documentElement
const navbar = $('#navbar')
const navToggle = $('#navToggle')
const mobileMenu = $('#mobileMenu')
const themeToggle = $('#themeToggle')
const moonIcon = $('#moonIcon')
const sunIcon = $('#sunIcon')
const typewriterEl = $('#typewriter')
const backBtn = $('#backToTop')
const yearEl = $('#year')
const visitorEl = $('#visitorCount')
const lightbox = $('#lightbox')
const lightboxImg = $('#lightboxImg')
const lightboxLink = $('#lightboxLink')
const lightboxOverlay = $('#lightboxOverlay')
const lightboxClose = $('#lightboxClose')
const contactForm = $('#contactForm')
const toast = $('#toast')
const toastMessage = $('#toastMessage')
const toastIcon = $('#toastIcon')

// ============================================================
// 1. DARK / LIGHT MODE
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('theme') || 'dark'
  html.setAttribute('data-theme', saved)
  updateThemeUI(saved)
}

function updateThemeUI(theme) {
  if (!moonIcon || !sunIcon) return
  if (theme === 'dark') {
    moonIcon.classList.remove('hidden')
    sunIcon.classList.add('hidden')
  } else {
    moonIcon.classList.add('hidden')
    sunIcon.classList.remove('hidden')
  }
}

function toggleTheme() {
  const cur = html.getAttribute('data-theme')
  const next = cur === 'dark' ? 'light' : 'dark'
  html.setAttribute('data-theme', next)
  localStorage.setItem('theme', next)
  updateThemeUI(next)
}

themeToggle?.addEventListener('click', toggleTheme)
initTheme()

// ============================================================
// 2. NAVBAR
// ============================================================
let lastScroll = 0

function onNavScroll() {
  const sy = window.scrollY
  navbar?.classList.toggle('shadow-sm', sy > 20)
  // hide/show on scroll direction
  if (sy > lastScroll && sy > 200) {
    navbar.style.transform = 'translateY(-100%)'
  } else {
    navbar.style.transform = 'translateY(0)'
  }
  lastScroll = sy
}

window.addEventListener('scroll', onNavScroll, { passive: true })

// Mobile menu
navToggle?.addEventListener('click', () => {
  const open = mobileMenu?.classList.toggle('hidden')
  navToggle.setAttribute('aria-expanded', !open)
  // Swap icons
  const menuIcon = $('#menuIcon', navToggle)
  const closeIcon = $('#closeIcon', navToggle)
  menuIcon?.classList.toggle('hidden')
  closeIcon?.classList.toggle('hidden')
})

// Close mobile menu on link click
mobileMenu?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden')
    navToggle.setAttribute('aria-expanded', 'false')
    const menuIcon = $('#menuIcon', navToggle)
    const closeIcon = $('#closeIcon', navToggle)
    menuIcon?.classList.remove('hidden')
    closeIcon?.classList.add('hidden')
  })
})

// Close on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('#navbar')) {
    mobileMenu?.classList.add('hidden')
    navToggle?.setAttribute('aria-expanded', 'false')
    const menuIcon = $('#menuIcon', navToggle)
    const closeIcon = $('#closeIcon', navToggle)
    menuIcon?.classList.remove('hidden')
    closeIcon?.classList.add('hidden')
  }
})

// Scroll spy
const sections = $$('section[id]')
const navLinks = $$('.nav-link')

function updateActiveLink() {
  const scrollPos = window.scrollY + 140
  let current = ''
  sections.forEach(s => {
    const top = s.offsetTop
    const h = s.offsetHeight
    if (scrollPos >= top && scrollPos < top + h) current = s.getAttribute('id')
  })
  navLinks.forEach(link => {
    link.classList.toggle('text-text-primary', link.getAttribute('href') === '#' + current)
    link.classList.toggle('text-text-secondary', link.getAttribute('href') !== '#' + current)
  })
}

window.addEventListener('scroll', updateActiveLink, { passive: true })
updateActiveLink()

// ============================================================
// 3. TYPEWRITER
// ============================================================
function initTypewriter() {
  if (!typewriterEl) return
  const titles = [
    'Ingénieur DevOps Passionné',
    'Cloud & Infrastructure',
    'CI/CD Specialist',
    'Automatisation & Scalabilité',
  ]
  let charIdx = 0
  let titleIdx = 0
  let deleting = false

  function type() {
    const cur = titles[titleIdx]
    if (!deleting) {
      typewriterEl.textContent = cur.substring(0, charIdx + 1)
      charIdx++
      if (charIdx === cur.length) {
        setTimeout(() => { deleting = true; type() }, 2200)
        return
      }
      setTimeout(type, 70 + Math.random() * 50)
    } else {
      typewriterEl.textContent = cur.substring(0, charIdx)
      charIdx--
      if (charIdx === 0) {
        deleting = false
        titleIdx = (titleIdx + 1) % titles.length
        setTimeout(type, 400)
        return
      }
      setTimeout(type, 35 + Math.random() * 30)
    }
  }

  setTimeout(type, 600)
}

initTypewriter()

// ============================================================
// 4. HERO PARTICLES (lightweight)
// ============================================================
function initParticles() {
  const container = $('#heroParticles')
  if (!container) return
  const frag = document.createDocumentFragment()
  for (let i = 0; i < 40; i++) {
    const dot = document.createElement('div')
    dot.className = 'hero-particle'
    const size = 1.5 + Math.random() * 2
    dot.style.width = size + 'px'
    dot.style.height = size + 'px'
    dot.style.left = Math.random() * 100 + '%'
    dot.style.top = Math.random() * 100 + '%'
    dot.style.animationDelay = Math.random() * 8 + 's'
    dot.style.animationDuration = 4 + Math.random() * 6 + 's'
    dot.style.opacity = 0.08 + Math.random() * 0.12
    // subtle float
    dot.animate(
      [
        { transform: 'translateY(0)' },
        { transform: `translateY(${-8 - Math.random() * 12}px)` },
      ],
      { duration: 3000 + Math.random() * 4000, direction: 'alternate', iterations: Infinity, easing: 'ease-in-out', delay: Math.random() * 2000 }
    )
    frag.appendChild(dot)
  }
  container.appendChild(frag)
}
initParticles()

// ============================================================
// 5. STATS COUNTER (GSAP)
// ============================================================
function animateCounters() {
  const stats = $$('.stat-number')
  if (!stats.length) return
  stats.forEach(el => {
    const target = parseInt(el.dataset.target, 10)
    const obj = { val: 0 }
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el.closest('.stat-item'),
        start: 'top 85%',
      },
      onUpdate: () => { el.textContent = Math.floor(obj.val) },
      onComplete: () => { el.textContent = target },
    })
  })
}
animateCounters()

// ============================================================
// 6. GITHUB LIVE STATS
// ============================================================
function fetchGitHubStats() {
  const reposEl = $$('.github-stat-number')[0]
  const starsEl = $$('.github-stat-number')[1]
  const followersEl = $$('.github-stat-number')[2]
  if (!reposEl) return

  let observed = false
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !observed) {
        observed = true
        fetch('https://api.github.com/users/mahdibenkhider')
          .then(r => r.json())
          .then(data => {
            const repos = data.public_repos || 0
            const followers = data.followers || 0
            gsap.to({ val: 0 }, { val: repos, duration: 1.5, ease: 'power3.out', onUpdate: function () { reposEl.textContent = Math.floor(this.targets()[0].val) } })
            gsap.to({ val: 0 }, { val: followers, duration: 1.5, ease: 'power3.out', onUpdate: function () { followersEl.textContent = Math.floor(this.targets()[0].val) } })
          })
          .catch(() => {})
        fetch('https://api.github.com/users/mahdibenkhider/repos?per_page=100')
          .then(r => r.json())
          .then(repos => {
            let stars = 0
            if (Array.isArray(repos)) repos.forEach(r => { stars += r.stargazers_count || 0 })
            gsap.to({ val: 0 }, { val: stars, duration: 1.5, ease: 'power3.out', onUpdate: function () { starsEl.textContent = Math.floor(this.targets()[0].val) } })
          })
          .catch(() => {})
        obs.unobserve(entry.target)
      }
    })
  }, { threshold: 0.5 })
  const container = $('#githubStats')
  if (container) obs.observe(container)
}
fetchGitHubStats()

// ============================================================
// 7. GSAP SCROLL REVEALS
// ============================================================
// Timeline items stagger reveal
gsap.utils.toArray('.timeline-item').forEach((item, i) => {
  const d = item.querySelector('.timeline-dot')
  const card = item.querySelector('.bg-card')
  gsap.set([d, card], { opacity: 0, y: 40 })
  ScrollTrigger.create({
    trigger: item,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(d, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: i * 0.08 })
      gsap.to(card, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.08 + 0.1 })
    },
    once: true,
  })
})

// Skill cards staggered
gsap.utils.toArray('.skill-card').forEach((card, i) => {
  gsap.set(card, { opacity: 0, y: 30, scale: 0.9 })
  ScrollTrigger.create({
    trigger: card,
    start: 'top 88%',
    onEnter: () => {
      gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: 'back.out(1.7)', delay: (i % 5) * 0.06 })
    },
    once: true,
  })
})

// Project cards staggered
gsap.utils.toArray('.project-card').forEach((card, i) => {
  gsap.set(card, { opacity: 0, y: 40 })
  ScrollTrigger.create({
    trigger: card,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(card, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: i * 0.08 })
    },
    once: true,
  })
})

// Cert cards staggered
gsap.utils.toArray('.cert-card').forEach((card, i) => {
  gsap.set(card, { opacity: 0, y: 30, scale: 0.95 })
  ScrollTrigger.create({
    trigger: card,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(card, { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power2.out', delay: i * 0.1 })
    },
    once: true,
  })
})

// Contact cards stagger
gsap.utils.toArray('#contact .bg-card').forEach((card, i) => {
  gsap.set(card, { opacity: 0, x: -30 })
  ScrollTrigger.create({
    trigger: card,
    start: 'top 85%',
    onEnter: () => {
      gsap.to(card, { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out', delay: i * 0.08 })
    },
    once: true,
  })
})

// Section titles subtle entrance
gsap.utils.toArray('.section-title, #about h2, #about .text-xs').forEach((el) => {
  if (el.closest('.sticky')) return
  gsap.set(el, { opacity: 0, y: 30 })
  ScrollTrigger.create({
    trigger: el,
    start: 'top 80%',
    onEnter: () => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' })
    },
    once: true,
  })
})

// ============================================================
// 8. TILT 3D ON PROJECT CARDS
// ============================================================
$$('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) scale3d(1.02,1.02,1.02)`
    // image parallax inside
    const img = card.querySelector('img')
    if (img) img.style.transform = `scale(1.12) translate(${-x * 6}px, ${-y * 6}px)`
  })
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)'
    const img = card.querySelector('img')
    if (img) img.style.transform = 'scale(1) translate(0,0)'
  })
})

// ============================================================
// 9. CERTIFICATION LIGHTBOX
// ============================================================
function initLightbox() {
  $$('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const src = card.dataset.img
      const url = card.dataset.url
      if (lightboxImg) lightboxImg.src = src
      if (lightboxLink) lightboxLink.href = url
      lightbox?.classList.remove('opacity-0', 'invisible')
      lightbox?.classList.add('opacity-100', 'visible')
      document.body.style.overflow = 'hidden'
    })
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') card.click()
    })
  })

  function closeLightbox() {
    lightbox?.classList.add('opacity-0', 'invisible')
    lightbox?.classList.remove('opacity-100', 'visible')
    document.body.style.overflow = ''
  }

  lightboxOverlay?.addEventListener('click', closeLightbox)
  lightboxClose?.addEventListener('click', closeLightbox)
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox() })
}
initLightbox()

// ============================================================
// 10. TESTIMONIAL CAROUSEL
// ============================================================
function initCarousel() {
  const track = $('#carouselTrack')
  const dotContainer = $('#carouselDots')
  if (!track || !dotContainer) return
  const slides = $$('.carousel-slide', track)
  if (slides.length <= 1) return

  let current = 0
  let interval
  let isDragging = false
  let startX = 0
  let moveX = 0

  // Create dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button')
    dot.className = `w-2.5 h-2.5 rounded-full border border-accent bg-transparent cursor-pointer transition-all duration-300 ${i === 0 ? 'bg-accent scale-125' : ''}`
    dot.setAttribute('aria-label', `Témoignage ${i + 1}`)
    dot.addEventListener('click', () => goTo(i))
    dotContainer.appendChild(dot)
  })
  const dots = $$('button', dotContainer)

  function goTo(index) {
    current = index
    track.style.transform = `translateX(-${index * 100}%)`
    dots.forEach((d, i) => {
      d.classList.toggle('bg-accent', i === index)
      d.classList.toggle('scale-125', i === index)
      d.classList.toggle('bg-transparent', i !== index)
    })
  }

  function next() { goTo((current + 1) % slides.length) }
  function start() { interval = setInterval(next, 5000) }
  function stop() { clearInterval(interval) }

  // Touch / drag
  track.addEventListener('mousedown', (e) => { isDragging = true; startX = e.clientX; stop() })
  track.addEventListener('touchstart', (e) => { isDragging = true; startX = e.touches[0].clientX; stop() }, { passive: true })
  document.addEventListener('mousemove', (e) => { if (isDragging) moveX = e.clientX - startX })
  document.addEventListener('touchmove', (e) => { if (isDragging) moveX = e.touches[0].clientX - startX }, { passive: true })
  document.addEventListener('mouseup', () => {
    if (!isDragging) return
    isDragging = false
    if (Math.abs(moveX) > 60) {
      if (moveX < 0) next()
      else goTo((current - 1 + slides.length) % slides.length)
    }
    start()
  })
  document.addEventListener('touchend', () => {
    if (!isDragging) return
    isDragging = false
    if (Math.abs(moveX) > 60) {
      if (moveX < 0) next()
      else goTo((current - 1 + slides.length) % slides.length)
    }
    start()
  })

  track.addEventListener('mouseenter', stop)
  track.addEventListener('mouseleave', start)
  start()
}
initCarousel()

// ============================================================
// 11. CONTACT FORM
// ============================================================
function initContactForm() {
  if (!contactForm) return
  const name = $('#formName')
  const email = $('#formEmail')
  const message = $('#formMessage')
  const nameErr = $('#formNameError')
  const emailErr = $('#formEmailError')
  const msgErr = $('#formMessageError')
  const submitBtn = $('#formSubmit')

  const validators = {
    name: (v) => v.trim().length < 2 ? 'Minimum 2 caractères' : '',
    email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Email invalide',
    message: (v) => v.trim().length < 10 ? 'Minimum 10 caractères' : '',
  }

  function validate(input, errorEl, fn) {
    const err = fn(input.value)
    if (err) {
      input.classList.add('border-error', 'border-opacity-50')
      if (errorEl) { errorEl.textContent = err; errorEl.classList.remove('hidden') }
      return false
    }
    input.classList.remove('border-error', 'border-opacity-50')
    if (errorEl) { errorEl.textContent = ''; errorEl.classList.add('hidden') }
    return true
  }

  name?.addEventListener('blur', () => validate(name, nameErr, validators.name))
  email?.addEventListener('blur', () => validate(email, emailErr, validators.email))
  message?.addEventListener('blur', () => validate(message, msgErr, validators.message))

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const nOk = validate(name, nameErr, validators.name)
    const eOk = validate(email, emailErr, validators.email)
    const mOk = validate(message, msgErr, validators.message)
    if (!nOk || !eOk || !mOk) return

    if (submitBtn) {
      submitBtn.disabled = true
      submitBtn.innerHTML = '<span>Envoi en cours...</span><svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>'
    }

    fetch('https://formspree.io/f/maqkzowe', {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { Accept: 'application/json' },
    })
      .then(r => r.json())
      .then(() => {
        showToast('Message envoyé avec succès !', 'success')
        contactForm.reset()
      })
      .catch(() => {
        showToast("Erreur lors de l'envoi. Réessaie plus tard.", 'error')
      })
      .finally(() => {
        if (submitBtn) {
          submitBtn.disabled = false
          submitBtn.innerHTML = '<span>Envoyer le message</span><svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>'
        }
      })
  })
}
initContactForm()

// ============================================================
// 12. TOAST
// ============================================================
let toastTimeout

function showToast(message, type = 'info') {
  if (!toast || !toastMessage || !toastIcon) return
  clearTimeout(toastTimeout)
  toastMessage.textContent = message
  // Set icon
  const paths = {
    success: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    error: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
    info: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  }
  toastIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" d="${paths[type] || paths.info}"/>`
  const colors = { success: 'text-success', error: 'text-error', info: 'text-accent' }
  toastIcon.classList.remove('text-success', 'text-error', 'text-accent')
  toastIcon.classList.add(colors[type] || 'text-accent')

  toast.classList.add('visible')
  toastTimeout = setTimeout(() => toast.classList.remove('visible'), 4000)
}

// ============================================================
// 13. BACK TO TOP + YEAR
// ============================================================
window.addEventListener('scroll', () => {
  if (!backBtn) return
  backBtn.classList.toggle('opacity-100', window.scrollY > 400)
  backBtn.classList.toggle('visible', window.scrollY > 400)
  backBtn.classList.toggle('opacity-0', window.scrollY <= 400)
  backBtn.classList.toggle('invisible', window.scrollY <= 400)
  backBtn.classList.toggle('translate-y-4', window.scrollY <= 400)
  backBtn.classList.toggle('translate-y-0', window.scrollY > 400)
}, { passive: true })

backBtn?.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }))

// Year
if (yearEl) yearEl.textContent = String(new Date().getFullYear())

// ============================================================
// 14. VISITOR COUNTER
// ============================================================
if (visitorEl) {
  fetch('https://api.countapi.xyz/hit/mahdibenkhider/portfolio')
    .then(r => r.json())
    .then(d => { visitorEl.textContent = d.value.toLocaleString('fr') })
    .catch(() => { visitorEl.textContent = '—' })
}

// ============================================================
// 15. CURSOR GLOW FOLLOWER
// ============================================================
const cursorGlow = $('#cursorGlow')
if (cursorGlow) {
  let mx = 0, my = 0, cx = 0, cy = 0
  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY })
  function animateGlow() {
    cx += (mx - cx) * 0.08
    cy += (my - cy) * 0.08
    cursorGlow.style.transform = `translate(${cx - 160}px, ${cy - 160}px)`
    requestAnimationFrame(animateGlow)
  }
  animateGlow()
  // Increase glow on interactive elements
  $$('a, button, .project-card, .cert-card, .skill-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursorGlow.style.opacity = '1' })
    el.addEventListener('mouseleave', () => { cursorGlow.style.opacity = '0.6' })
  })
}

// ============================================================
// 16. REFRESH SCROLLTRIGGER ON LOAD
// ============================================================
window.addEventListener('load', () => {
  ScrollTrigger.refresh()
})
