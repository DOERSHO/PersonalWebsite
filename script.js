$('#navigation a').on('click', function(e) {
  e.preventDefault();
  var hash = this.hash;
  $('html, body').animate({
    scrollTop: $(this.hash).offset().top
  }, 500);
});



$('.toggler, .nav-content a:not(#dropdown-link)').on('click', function(){
  $('.toggler').toggleClass('change');
  $('.nav-content').slideToggle();
  $('#dropdown-menu').slideUp();
  $('.menu-overlay').toggle();
});

$('.nav-content .dropdown').on('click', function(){
  $('#dropdown-menu').slideToggle();
});

$('.menu-overlay').on('click', function(){
  $('.toggler').removeClass('change');
  $('.nav-content').slideUp();
  $('#dropdown-menu').slideUp();
  $('.menu-overlay').hide();
});



document.addEventListener('DOMContentLoaded', function () {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".dx-fixed-background__media-wrapper", {
        scale: 0.55,
        scrollTrigger: {
            trigger: ".dx-fixed-background__media-wrapper",
            start: "top bottom",
            end: "center 75%",
            scrub: true
        }
    });
    gsap.from(".dx-fixed-background__media", {
        borderRadius: "300px",
        scrollTrigger: {
            trigger: ".dx-fixed-background__media-wrapper",
            start: "top bottom",
            end: "center 75%",
            scrub: true
        }
    });
});



$("#contact input, #contact textarea").on('focusout', function(){

  var text_val = $(this).val();
  if (text_val === "") {
    $(this).removeClass('has-value');
  } else {
    $(this).addClass('has-value');
  }

});


$(document).ready(function() {

    $('#menu').click(function() {
        $(this).toggleClass('fa-times');
        $('header').toggleClass('toggle');
    });

    $(window).on('scroll load', function() {

        $('#menu').removeClass('fa-times');
        $('header').removeClass('toggle');

        if ($(window).scrollTop() > 0) {
            $('.top').show();
        } else {
            $('.top').hide();
        }

    });

    // smooth scrolling 

    $('a[href*="#"]').on('click', function(e) {
      if ($(this).closest('#navigation').length) {
        return;
    }
        e.preventDefault();
        $('html, body').animate({
                scrollTop: $($(this).attr('href')).offset().top,
            },
            500,
            'linear'
        );

    });

});

$('.navTrigger').click(function () {
    $(this).toggleClass('active');
    console.log("Clicked menu");
    $("#mainListDiv").toggleClass("show_list");
    $("#mainListDiv").fadeIn();

});

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css);
};
window.onscroll = function() { myFunction() };

function myFunction() {

    if (document.documentElement.scrollTop > 100) {
        document.getElementById("about").className = "about animate__animated animate__backInUp ";
    } else {}
    if (document.documentElement.scrollTop > 1000) {
        document.getElementById("my_study_competition").className = "my_study_competition animate__animated animate__backInUp";
    } 
  else {

    }

    console.log(document.documentElement.scrollTop)
    if (document.documentElement.scrollTop > 1700) {
        document.getElementById("certification").className = "certification animate__animated animate__backInUp ";
    } else {}

    if (document.documentElement.scrollTop > 2600) {
        document.getElementById("contact").className = "contact animate__animated animate__backInUp ";
        document.getElementById("add_br").className = "hide";
    } else {}

}



$('#navigation a').on('click', function(e) {
  e.preventDefault();
  var hash = this.hash;
  $('html, body').animate({
    scrollTop: $(this.hash).offset().top
  }, 1000);
});




// time line

window.addEventListener("DOMContentLoaded",() => {
	const ctl = new CollapsibleTimeline("#timeline");
});

class CollapsibleTimeline {
	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.el?.addEventListener("click",this.itemAction.bind(this));
	}
	animateItemAction(button,ctrld,contentHeight,shouldCollapse) {
		const expandedClass = "timeline__item-body--expanded";
		const animOptions = {
			duration: 300,
			easing: "cubic-bezier(0.65,0,0.35,1)"
		};

		if (shouldCollapse) {
			button.ariaExpanded = "false";
			ctrld.ariaHidden = "true";
			ctrld.classList.remove(expandedClass);
			animOptions.duration *= 2;
			this.animation = ctrld.animate([
				{ height: `${contentHeight}px` },
				{ height: `${contentHeight}px` },
				{ height: "0px" }
			],animOptions);
		} else {
			button.ariaExpanded = "true";
			ctrld.ariaHidden = "false";
			ctrld.classList.add(expandedClass);
			this.animation = ctrld.animate([
				{ height: "0px" },
				{ height: `${contentHeight}px` }
			],animOptions);
		}
	}
	itemAction(e) {
		const { target } = e;
		const action = target?.getAttribute("data-action");
		const item = target?.getAttribute("data-item");

		if (action) {
			const targetExpanded = action === "expand" ? "false" : "true";
			const buttons = Array.from(this.el?.querySelectorAll(`[aria-expanded="${targetExpanded}"]`));
			const wasExpanded = action === "collapse";

			for (let button of buttons) {
				const buttonID = button.getAttribute("data-item");
				const ctrld = this.el?.querySelector(`#item${buttonID}-ctrld`);
				const contentHeight = ctrld.firstElementChild?.offsetHeight;

				this.animateItemAction(button,ctrld,contentHeight,wasExpanded);
			}

		} else if (item) {
			const button = this.el?.querySelector(`[data-item="${item}"]`);
			const expanded = button?.getAttribute("aria-expanded");

			if (!expanded) return;

			const wasExpanded = expanded === "true";
			const ctrld = this.el?.querySelector(`#item${item}-ctrld`);
			const contentHeight = ctrld.firstElementChild?.offsetHeight;

			this.animateItemAction(button,ctrld,contentHeight,wasExpanded);
		}
	}
}


document.addEventListener('DOMContentLoaded', function () {
  const rings = document.querySelectorAll('.sf-ring');

  rings.forEach((ring, index) => {
    const duration = 20 + index * 10;
    ring.style.animation = `rotate ${duration}s linear infinite`;
  });
});

const style = document.createElement('style');
style.textContent = `
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

document.head.appendChild(style);


// click function
document.querySelector(".collapsible-block-link").addEventListener("click", function() {
    var contentContainer = document.getElementById("content-container");
    if (contentContainer.style.display === "none" || contentContainer.style.display === "") {
        contentContainer.style.display = "block";
        this.innerText = "Congratulations! You fine the hidden content";
    } else {
        contentContainer.style.display = "none";
        this.innerText = "ummmm? try to click this? :)";
    }
});


// //skills
// $(document).ready(function () {
//   // Typing animation
//   (function ($) {
//     $.fn.writeText = function (content) {
//       var contentArray = content.split(""),
//         current = 0,
//         elem = this;
//       setInterval(function () {
//         if (current < contentArray.length) {
//           elem.text(elem.text() + contentArray[current++]);
//         }
//       }, 80);
//     };
//   })(jQuery);

//   // Input text for typing animation
//   $("#holder").writeText("WEB DESIGNER + FRONT-END DEVELOPER");

//   // Initialize wow.js
//   new WOW().init();

//   // Push the body and the nav over by 285px over
//   var main = function () {
//     $(".fa-bars").click(function () {
//       $(".nav-screen").animate(
//         {
//           right: "0px"
//         },
//         200
//       );

//       $("body").animate(
//         {
//           right: "285px"
//         },
//         200
//       );
//     });

//     // Then push them back
//     $(".fa-times").click(function () {
//       $(".nav-screen").animate(
//         {
//           right: "-285px"
//         },
//         200
//       );

//       $("body").animate(
//         {
//           right: "0px"
//         },
//         200
//       );
//     });

//     $(".nav-links a").click(function () {
//       $(".nav-screen").animate(
//         {
//           right: "-285px"
//         },
//         500
//       );

//       $("body").animate(
//         {
//           right: "0px"
//         },
//         500
//       );
//     });
//   };

//   $(document).ready(main);

//   // Trigger skill bars animation on page load
//   $(".skillbar").each(function () {
//     $(this)
//       .find(".skillbar-bar")
//       .animate(
//         {
//           width: $(this).attr("data-percent")
//         },
//         2500
//       );
//   });

//   // Smooth scrolling
//   $(function () {
//     $("a[href*=#]:not([href=#])").click(function () {
//       if (
//         location.pathname.replace(/^\//, "") ==
//           this.pathname.replace(/^\//, "") &&
//         location.hostname == this.hostname
//       ) {
//         var target = $(this.hash);
//         target = target.length
//           ? target
//           : $("[name=" + this.hash.slice(1) + "]");
//         if (target.length) {
//           $("html,body").animate(
//             {
//               scrollTop: target.offset().top
//             },
//             700
//           );
//           return false;
//         }
//       }
//     });
//   });

//   // Ajax form
//   $(function () {
//     // Get the form.
//     var form = $("#ajax-contact");

//     // Get the messages div.
//     var formMessages = $("#form-messages");

//     // Set up an event listener for the contact form.
//     $(form).submit(function (e) {
//       // Stop the browser from submitting the form.
//       e.preventDefault();

//       // Serialize the form data.
//       var formData = $(form).serialize();

//       // Submit the form using AJAX.
//       $.ajax({
//         type: "POST",
//         url: $(form).attr("action"),
//         data: formData
//       })
//         .done(function (response) {
//           // Make sure that the formMessages div has the 'success' class.
//           $(formMessages).removeClass("error");
//           $(formMessages).addClass("success");

//           // Set the message text.
//           $(formMessages).text(response);

//           // Clear the form.
//           $("#name").val("");
//           $("#email").val("");
//           $("#message").val("");
//         })
//         .fail(function (data) {
//           // Make sure that the formMessages div has the 'error' class.
//           $(formMessages).removeClass("success");
//           $(formMessages).addClass("error");

//           // Set the message text.
//           if (data.responseText !== "") {
//             $(formMessages).text(data.responseText);
//           } else {
//             $(formMessages).text(
//               "Oops! An error occured and your message could not be sent."
//             );
//           }
//         });
//     });
//   });
// });