/**
 * SCRIPT.JS — Tiago Amaral Blog
 * Interações leves: menu mobile, scroll suave, animações ao scroll, dark mode
 */

(function () {
  'use strict';

  /* ==========================================================
     DARK MODE TOGGLE
     ========================================================== */
  function initThemeToggle() {
    const toggle = document.querySelector('.header__theme');
    if (!toggle) return;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      updateToggleLabel(toggle, savedTheme);
    }

    toggle.addEventListener('click', function () {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      updateToggleLabel(toggle, next);
    });
  }

  function updateToggleLabel(btn, theme) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
    btn.setAttribute('aria-label', theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro');
  }

  /* ==========================================================
     MOBILE MENU
     ========================================================== */
  function initMobileMenu() {
    const menuBtn = document.querySelector('.header__menu-btn');
    const nav = document.querySelector('.header__nav');
    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('header__nav--open');
      menuBtn.classList.toggle('active');
      menuBtn.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar menu ao clicar em um link
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('header__nav--open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Fechar ao clicar fora
    document.addEventListener('click', function (e) {
      if (!nav.contains(e.target) && !menuBtn.contains(e.target)) {
        nav.classList.remove('header__nav--open');
        menuBtn.classList.remove('active');
        menuBtn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  /* ==========================================================
     HEADER SHRINK ON SCROLL
     ========================================================== */
  function initHeaderScroll() {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;

    window.addEventListener('scroll', function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 80) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      lastScroll = currentScroll;
    }, { passive: true });
  }

  /* ==========================================================
     SCROLL SUAVE PARA ÂNCORAS
     ========================================================== */
  function initSmoothScroll() {
    document.addEventListener('click', function (e) {
      const link = e.target.closest('a[href^="#"]');
      if (!link) return;

      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  }

  /* ==========================================================
     ANIMAÇÕES AO SCROLL (Intersection Observer)
     ========================================================== */
  function initScrollReveal() {
    const elements = document.querySelectorAll(
      '.about__grid, .highlight-card, .post-card, .section__header, .cta__card'
    );

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal--visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(function (el) {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /* ==========================================================
     INICIALIZAÇÃO
     ========================================================== */
  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle();
    initMobileMenu();
    initHeaderScroll();
    initSmoothScroll();
    initScrollReveal();
  });

})();
