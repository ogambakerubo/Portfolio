/* Preloader */
function preloaderFadeOut() {
  $('.preloader').fadeOut('slow');
}
// Window load function
jQuery(window).on('load', function () {
  (function ($) {
    preloaderFadeOut();
    navBar();
    sectionViewport();
  })(jQuery);
});
/* eof Preloader */

/** Sticky NavBar */
function navBar() {
  var scrollDistance = $(window).scrollTop();

  $('header').toggleClass('sticky', scrollDistance > 0);
}

$(window).scroll(function () {
  navBar();
});

/**
 * Set new active element
 * @param {Object} buttons List of options
 * @param {Object} targetButton Target element
 */
function setActive(buttons, targetButton) {
  buttons.removeClass('active');
  targetButton.target.parentElement.classList.add('active');
}

let $menuButtons = $('header ul li a');
let $activeMenu = $('header ul li');

$menuButtons.click(function (e) {
  setActive($activeMenu, e);
});

// Responsive NavBar
function toggleMenu() {
  $('.toggle').toggleClass('active_menu');
  $('.main_menu').toggleClass('active_menu');
  $('header').toggleClass('active_menu');
}

$('.toggle').click(function () {
  toggleMenu();
});

$('header ul li a').click(function () {
  toggleMenu();
});
/** eof Sticky NavBar */

/** Testimonials */
/** eof Testimonials */

/** Project Sort */
let $sortButtons = $('#projects .projects_container .projects_sort ul li a');
let $activeButtons = $('#projects .projects_container .projects_sort ul li');

$sortButtons.click(function (e) {
  setActive($activeButtons, e);

  return false;
});

// Filterizr
let $fltr = $('.filtr_container');
if ($fltr.length > 0) {
  $(function () {
    $fltr.filterizr();
  });
}

/** eof Project Sort */

/** Blog */
// Owl Carousel
$(document).ready(function () {
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
        nav: true,
      },
      1000: {
        items: 2,
        nav: false,
      },
      1300: {
        items: 3,
        nav: true,
        loop: false,
      },
    },
  });
});
/** eof Blog */

/** Viewport */
// Get Section Currently in Viewport
$.fn.isInViewport = function () {
  var menuHeight = $('header').outerHeight();
  var gap = menuHeight * 1.8;

  var elementTop = $(this).offset().top - gap;
  var elementBottom = elementTop + $(this).outerHeight();

  var viewportTop = $(window).scrollTop();
  var viewportBottom = viewportTop + $(window).innerHeight();

  // Hide fab
  hideFab(viewportTop, menuHeight);

  if (elementBottom > viewportTop && elementTop < viewportBottom) {
    return viewportTop >= elementTop;
  }
};

// Highlight Menu on Current Section
function sectionViewport() {
  $('section').each(function () {
    var activeSection = $(this).attr('id');

    if ($(this).isInViewport()) {
      var $targetMenu = $('a[href="#' + activeSection + '"]');

      $activeMenu.removeClass('active');
      $targetMenu.parent().addClass('active');
    }
  });
}

// Hide Floating Action Button
function hideFab(viewportTop, menuHeight) {
  // Hide fab
  if (viewportTop < menuHeight) {
    $('#fab').fadeOut(300);
  } else {
    $('#fab').fadeIn(300);
  }
}

$(window).on('resize scroll', function () {
  sectionViewport();
});
/** eof Viewport */

/** Smooth Scroll */
$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function (event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') ==
        this.pathname.replace(/^\//, '') &&
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        var menuHeight = $('header').outerHeight();

        $('html, body').animate(
          {
            scrollTop: target.offset().top - menuHeight,
          },
          800,
          function () {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(':focus')) {
              // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            }
          }
        );
      }
    }
  });
/** eof Smooth Scroll */
