(function ($, root, undefined) {$(function () {'use strict'; // on ready start
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////
//        general
///////////////////////////////////////

  // css tricks snippet - http://css-tricks.com/snippets/jquery/smooth-scrolling/
  $(function() {
    $('a[href*=#]:not([href=#])').click(function() {
      if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
        if (target.length) {
          $('html,body').animate({
            scrollTop: target.offset().top
          }, 500);
          return false;
        }
      }
    });
  });

  // inserts current year
  $('.js-year').html(new Date().getFullYear());

  // detects touch device
  if ("ontouchstart" in document.documentElement){
    $('html').addClass('touch');
  }


///////////////////////////////////////
//        Navigation
///////////////////////////////////////

  // mobile nav open
  $('.js-mobile-menu-open').on('click', function(e) {
    e.preventDefault();
    $(this).addClass('mobile-icon__menu--open');
    $('.mobile-menu').toggleClass('mobile-menu--open');
  });

  // mobile nav close
  $('.js-mobile-menu-close').on('click', function(e) {
    e.preventDefault();
    $('.js-mobile-menu-open').removeClass('mobile-icon__menu--open');
    $('.mobile-menu').toggleClass('mobile-menu--open');
  });

  // current section nav highlight
  var currentSection = $('body').data('current-section');
  $('.microsite-nav__item--' + currentSection).addClass('microsite-nav__item--current');


///////////////////////////////////////
//      SVG image swap
///////////////////////////////////////

  // finds image with class and swaps .png with .svg in img source string
  if (Modernizr.svgasimg) {
    var svgSwap = $('img.js-svg-swap');
    svgSwap.each( function() {
      var currentSrc = $(this).attr('src'),
          newSrc = currentSrc.replace('.png', '.svg');
      $(this).attr('src', newSrc);
    });
  }


///////////////////////////////////////
//      Collapsed anchor link
///////////////////////////////////////

  // hides collapsed section
  $('.js-expand-section-collapsed').hide();
  var collapsedLink = $('.js-expand-section').attr('href');

  // expands collapsed section and scrolls to anchor
  $('.js-expand-section').on('click', function(e) {
    e.preventDefault();
    $('.js-expand-section-collapsed').slideDown(function() {
      location.hash = collapsedLink;
    });
  });



///////////////////////////////////////
//      Modal
///////////////////////////////////////

  var modal         = $('.js-modal'),
      modalContent  = $('.js-modal__content'),
      modalClose    = $('.js-modal__close');

  // EVENT - launch modal & populate with content
  $('.js-launch-modal').on('click', function(e) {

    e.preventDefault();

    // launch modal
    modal.removeClass('is-closed').addClass('is-open').fadeIn();
    $('body').css('overflow', 'hidden');

  });


  function closeModal(e) {
    e.on('click', function() {
      modal.removeClass('is-open').addClass('is-closed').fadeOut();
      $('body').css('overflow', 'auto');
    });
  }

  $(document).keyup(function(e) {
     if (e.keyCode == 27) { // escape key maps to keycode `27`
       modal.removeClass('is-open').addClass('is-closed').fadeOut();
       $('body').css('overflow', 'auto');
      }
  });

  // close modal on icon and bg click
  closeModal(modalClose);
  // closeModal(modal);



///////////////////////////////////////////////////////////////////////////////
});})(jQuery, this); // on ready end