$(document).ready(function(){
//burger
  $('.burger').on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('open');
    var menu = $('.main-menu');

    if ($('.burger').hasClass('active')) {
      menu.slideUp('fast');
      $(this).removeClass('active');
    } else {
      menu.slideDown('fast');
      $(this).addClass('active');
    }
  });

  $(window).resize(function() {
    var menu = $('.main-menu');
    var w = $(window).width();
    if(w > 641) {
      menu.removeAttr('style');
      $('.burger').removeClass('open');
      $('.burger').removeClass('active');
    }
  });

//popup
  var popup = $(".call-back-popup");

  $(".js-popup").click(function(e){
    e.preventDefault();
    popup.addClass("active");
    $(".call-back-overlay").addClass("active");
  });

  $(".popup-close").click(function(e){
    $(".call-back-popup").removeClass("active");
    $(".thank-popup").removeClass("active");
    $(".call-back-overlay").removeClass("active");
  });

  $(".call-back-overlay").click(function(e){
    $(".call-back-popup").removeClass("active");
    $(".thank-popup").removeClass("active");
    $(this).removeClass("active");
  });

//validate
  $("form").each( function() {
    $(this).validate({
      rules: {
        name: {
          required: true,
          minlength: 3
        },
        tel: {
          required: true
        },
        popupName: {
          required: true,
          minlength: 3
        },
        popupTel: {
          required: true
        }
      }
    });
  });

  $("form").on("submit", function(e){
    e.preventDefault();
    if ($(this).valid()){
      var thisForm = $('form');
      var formSur = thisForm.serialize();
      var thankPopup = $(".thank-popup");
      var overlay = $(".call-back-overlay")
      console.log(formSur);
       $.ajax({
        url : thisForm.attr('action'),
        data: formSur,
        method:'POST',
        success : function(data){
          console.log(data);
            if ( data.trim() == 'true') {
                thisForm.trigger("reset");
                thankPopup.addClass("active");
                overlay.addClass("active");
            }
            else {
               thisForm.trigger('reset');
            }
          }
      });
    }
  })

  $(".tel").mask("(999) 999-9999");

//якоря
  $('a[href^="#"]').click(function(){
  var el = $(this).attr('href');
  $('body').animate({
    scrollTop: $(el).offset().top}, 2000);
    return false;
  });

//animation
  // $(function() {
  //   $('.effects-top-tittle, .pain-scale-item, .how-work-bottom-tittle, .simple-steps-item, .important-circle').on('inview', function(event, isInView) {
  //     if (isInView) {
  //       $(this).addClass('animated fadeInUp');
  //     }
  //   });

  //   $('.effects-bottom-tittle').on('inview', function(event, isInView) {
  //     if (isInView) {
  //       $(this).addClass('animated fadeInDown');
  //     }
  //   });

  //   $('.effects-item, .main-table tr, .warmer h2, .composition h3, .composition h2, .how-work h2').on('inview', function(event, isInView) {
  //     if (isInView) {
  //       $(this).addClass('animated zoomIn');
  //     }
  //   });

  //   $('.relieve-pain-title, .nano-tech h2, .nano-tech-text').on('inview', function(event, isInView) {
  //     if (isInView) {
  //       $(this).addClass('animated zoomInRight');
  //     }
  //   });

  //   $('.main-table th').on('inview', function(event, isInView) {
  //     if (isInView) {
  //       $(this).addClass('animated zoomInLeft');
  //     }
  //   });

  //   $('.pain-scale-tittle, .quality').on('inview', function(event, isInView) {
  //     if (isInView) {
  //       $(this).addClass('animated fadeInLeft');
  //     }
  //   });

  //   $('.warmer-item').on('inview', function(event, isInView) {
  //     if (isInView) {
  //       $(this).addClass('animated pulse');
  //     }
  //   });

  //   $('.composition-wrap img').on('inview', function(event, isInView) {
  //     if (isInView) {
  //       $(this).addClass('animated flipInY');
  //     }
  //   });

  //   $('.how-work-item').on('inview', function(event, isInView) {
  //     if (isInView) {
  //       $(this).addClass('animated flipInX');
  //     }
  //   });

  //   $('.tech-item, .technology h2, .technology h2, .expert h2, .expert-item, .reviews h2, .carrusel').on('inview', function(event, isInView) {
  //     if (isInView) {
  //       $(this).addClass('animated zoomIn');
  //     }
  //   });
  
  // });

//timer
  var end_day = new Date("30 August 2016 00:00");
  // January, February, March, April, May, June, July, August, September, October, November, December

  function mytimer() {
    var time_now = new Date(),
      time_delta = end_day - time_now;

    if (time_delta < 0) {
      time_delta = 0;
    }

    var time_day = Math.floor(time_delta / 86400000),
      time_ost = time_delta - Math.floor(time_delta / 86400000) * 86400000,
      time_hrs = Math.floor(time_ost / 3600000);
    time_ost = time_ost - Math.floor(time_ost / 3600000) * 3600000;
    var time_min = Math.floor(time_ost / 60000);
    time_ost = time_ost - Math.floor(time_ost / 60000) * 60000;
    var time_sec = Math.floor(time_ost / 1000);

    if (time_day < 10) {
      time_day = '0' + time_day;
    }
    if (time_hrs < 10) {
      time_hrs = '0' + time_hrs;
    }
    if (time_min < 10) {
      time_min = '0' + time_min;
    }
    if (time_sec < 10) {
      time_sec = '0' + time_sec;
    }
    $('.timer-content .sec strong').text(time_sec);
    $('.timer-content .hours strong').text(time_hrs);
    $('.timer-content .days strong').text(time_day);
    $('.timer-content .mins strong').text(time_min);   
    if (time_delta == 0) {
      clearInterval(stock_interval);
      alert('Акция кончилась');
    }
    var dney = time_day.toString().length;
    if (dney == 3) {
      $('.days strong').addClass('three');

    } else if (dney == 2) {
      $('.days strong').addClass('two')
    }

  }

  $(function () {
    // timer run
    var stock_interval = setInterval(mytimer, 1000);
  });

//slider
  $('.slider').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,

    responsive: [{
      breakpoint: 1024,
      settings: {
        arrows:false
      }
    }
    ]
  });

});

// $(window).load(function(){

// });

// $(window).resize(function(){

// });