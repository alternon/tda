
{
	
	const extend = function(a, b) {
		for( let key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	};

	
	const getMousePos = function(ev) {
		let posx = 0;
		let posy = 0;
		if (!ev) ev = window.event;
		if (ev.pageX || ev.pageY) 	{
			posx = ev.pageX;
			posy = ev.pageY;
		}
		else if (ev.clientX || ev.clientY) 	{
			posx = ev.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = ev.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}
		return { x : posx, y : posy };
	};

	const TiltObj = function(el, options) {
		this.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		this.DOM = {};
		this.DOM.img = this.el.querySelector('.content__img');
		this.DOM.title = this.el.querySelector('.content__title');
		this._initEvents();
	};

	TiltObj.prototype.options = {
		movement: {
			img : { translation : {x: -10, y: -10} },
			title : { translation : {x: 25, y: 25} },
		}
	};

	TiltObj.prototype._initEvents = function() {
		this.mouseenterFn = (ev) => {
			anime.remove(this.DOM.img);
			anime.remove(this.DOM.title);
		};
		
		this.mousemoveFn = (ev) => {
			requestAnimationFrame(() => this._layout(ev));
		};
		
		this.mouseleaveFn = (ev) => {
			requestAnimationFrame(() => {
				anime({
					targets: [this.DOM.img, this.DOM.title],
					duration: 1500,
					easing: 'easeOutElastic',
					elasticity: 400,
					translateX: 0,
					translateY: 0
				});
			});
		};

		this.el.addEventListener('mousemove', this.mousemoveFn);
		this.el.addEventListener('mouseleave', this.mouseleaveFn);
		this.el.addEventListener('mouseenter', this.mouseenterFn);
	};

	TiltObj.prototype._layout = function(ev) {
		
		const mousepos = getMousePos(ev);
		
		const docScrolls = {left : document.body.scrollLeft + document.documentElement.scrollLeft, top : document.body.scrollTop + document.documentElement.scrollTop};
		const bounds = this.el.getBoundingClientRect();
		
		const relmousepos = { x : mousepos.x - bounds.left - docScrolls.left, y : mousepos.y - bounds.top - docScrolls.top };

		
		const t = {
			img: this.options.movement.img.translation,
			title: this.options.movement.title.translation,
		};
			
		const transforms = {
			img : {
				x: (-1*t.img.x - t.img.x)/bounds.width*relmousepos.x + t.img.x,
				y: (-1*t.img.y - t.img.y)/bounds.height*relmousepos.y + t.img.y
			},
			title : {
				x: (-1*t.title.x - t.title.x)/bounds.width*relmousepos.x + t.title.x,
				y: (-1*t.title.y - t.title.y)/bounds.height*relmousepos.y + t.title.y
			}
		};
		this.DOM.img.style.WebkitTransform = this.DOM.img.style.transform = 'translateX(' + transforms.img.x + 'px) translateY(' + transforms.img.y + 'px)';
		this.DOM.title.style.WebkitTransform = this.DOM.title.style.transform = 'translateX(' + transforms.title.x + 'px) translateY(' + transforms.title.y + 'px)';
	};

	const DOM = {};

	// DOM.svg = document.querySelector('.morph');
	// DOM.shapeEl = DOM.svg.querySelector('path');

	DOM.svg0 = document.querySelector('.morph0');
	DOM.svg1 = document.querySelector('.morph1');
	DOM.svg2 = document.querySelector('.morph2');
	DOM.svg3 = document.querySelector('.morph3');
	DOM.shapeEl0 = DOM.svg0.querySelector('path');
	DOM.shapeEl1 = DOM.svg1.querySelector('path');
	DOM.shapeEl2 = DOM.svg2.querySelector('path');
	DOM.shapeEl3 = DOM.svg3.querySelector('path');

	DOM.contentElems = Array.from(document.querySelectorAll('.content-wrap'));
	DOM.contentLinks = Array.from(document.querySelectorAll('.content__link'));
	DOM.footer = document.querySelector('.content--footer');
	const contentElemsTotal = DOM.contentElems.length;
	const shapes = [
		{
			path: "m1399.38464,769.66892l0,-769.66892l-929.31744,0c-64.31917,80.55143 -84.35631,130.49332 -60.11144,149.82566c36.36733,28.99852 336.25684,80.95419 353.28251,122.03542c17.02566,41.08123 -42.04253,118.4106 -87.4443,231.98812c-45.40177,113.57752 81.76908,173.99109 179.66664,206.61442c97.89756,32.62333 261.06017,-55.58049 364.63295,-39.87296c69.04853,10.47169 128.81222,43.49777 179.29109,99.07826z",
			pathAlt: "m1400,767.83805l0,-767.83805l-981.46797,0c-28.96953,73.93103 -23.97478,135.00449 14.98424,183.22038c58.43856,72.32383 184.30621,81.96701 202.28731,122.95052c17.98108,40.98351 47.94958,83.17241 0,196.47975c-47.94959,113.30734 -56.94013,183.22038 47.94958,232.64167c104.88969,49.42129 331.15178,-42.1889 440.53675,-26.51874c72.92332,10.44678 164.82669,30.13493 275.71009,59.06447z",
			scaleX: 1,
			scaleY: 1,
			rotate: 0,
			tx: 0,
			ty: 0,
			fill: {
				color: '#eeeeee',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 3000,
					easing: 'easeOutElastic',
					elasticity: 600
				},
				svg: {
					duration: 2000,
					easing: 'easeOutElastic'
				}
			}
		},
		{
			path: 'm0,766c49.36509,-30.66667 83.05342,-53.66667 101.06501,-69c27.01737,-23 48.03089,-48 168.10813,-100c120.07723,-52 163.10491,-26 156.1004,-168c-7.00451,-142 -147.09461,-106 -212.63677,-225c-43.69477,-79.33333 -114.57369,-147.33333 -212.63677,-204l0,766z',
			pathAlt: "m0,766c6,-10 39.66667,-33 101,-69c92,-54 -28,-101 92,-153c120,-52 292,55 285,-87c-7,-142 -173.5,-195 -239,-314c-43.66667,-79.33333 -123.33333,-127 -239,-143l0,766z",
			scaleX: 1,
			scaleY: 1,
			rotate: 0,
			tx: 0,
			ty: 0,
			fill: {
				color: '#eeeeee',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 2000,
					easing: 'easeOutElastic',
					elasticity: 600
				},
				svg: {
					duration: 2000,
					easing: 'easeOutElastic'
				}
			}
		},
		{
			path: "m1398.14809,1019.50149l0,-1016.91347c-865.43206,-14.66542 -1298.14809,32.99719 -1298.14809,142.98783c0,164.98596 1033.1913,173.98519 1033.1913,308.97371c0,134.98851 -937.86293,133.9886 -971.50824,273.97669c-33.64531,139.98809 957.48936,142.98783 1006.55543,207.9823c49.06607,64.99447 -51.86985,47.99592 -35.04719,82.99294c11.2151,23.33135 99.53403,23.33135 264.95679,0z",
			pathAlt: "m1398.2222,1062.3009l0,-1010.31277c-865.48147,-75.88985 -1298.2222,-59.19642 -1298.2222,50.08028c0,163.91505 1043.69524,264.8353 1043.69524,398.94762c0,134.11231 -697.59243,132.53452 -729.91331,271.61395c-32.32088,139.07944 716.44628,142.64408 763.5809,207.21668c47.13462,64.5726 -49.82803,47.68438 -33.66759,82.45424c10.77363,23.1799 95.61595,23.1799 254.52697,0z",
			scaleX: 1,
			scaleY: 1,
			rotate: 0,
			tx: 0,
			ty: 0,
			fill: {
				color: '#eeeeee',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 3000,
					easing: 'easeOutElastic',
					elasticity: 600
				},
				svg: {
					duration: 2500,
					easing: 'easeOutElastic'
				}
			}
		},
		{
			path: "m1400.00001,687.36217l0,-582.9799c-47.44221,-25.19756 -112.89489,-12.98056 -196.35805,36.651c-125.19473,74.44735 -210.85428,139.73193 -462.56158,146.60399c-251.7073,6.87206 -177.9083,263.42902 -38.21734,349.3298c139.69096,85.90077 309.69222,132.85986 479.69349,125.9878c113.33418,-4.58137 185.81533,-29.77893 217.44348,-75.59268z",
			pathAlt: "m1400.00001,661.59957l0,-573.17838c-58.37738,-12.84658 -127.69359,5.12867 -207.94863,53.92579c-120.38255,73.19567 -234.42918,243.36122 -476.46147,250.11775c-242.03229,6.75652 -171.06994,259.00005 -36.74836,343.45659c134.32158,84.45654 368.8811,-67.56523 532.34793,-74.32175c108.97789,-4.50435 171.91474,-4.50435 188.81053,0z",
			scaleX: 1,
			scaleY: 1,
			rotate: 0,
			tx: 0,
			ty: 0,
			fill: {
				color: '#eeeeee',
				duration: 500,
				easing: 'linear'
			},
			animation: {
				path: {
					duration: 3000,
					easing: 'easeOutQuad',
					elasticity: 600
				},
				svg: {
					duration: 3000,
					easing: 'easeOutElastic'
				}
			}
		}
	];
	let step;

	const initShapeLoop0 = function() {
		// pos = pos || 0;
		anime({
			targets: DOM.shapeEl0,
			easing: 'linear',
			d: [{value: shapes[0].pathAlt, duration:20000}, {value: shapes[0].path, duration:20000}],
			loop: true,
			fill: {
				value: shapes[0].fill.color,
				duration: shapes[0].fill.duration,
				easing: shapes[0].fill.easing
			},
			direction: 'alternate'
		});
	};

	const initShapeEl0 = function() {
		anime({
			targets: DOM.svg0,
			duration: 1,
			easing: 'linear',
			scaleX: shapes[0].scaleX,
			scaleY: shapes[0].scaleY,
			translateX: shapes[0].tx+'px',
			translateY: shapes[0].ty+'px',
			rotate: shapes[0].rotate+'deg'
		});

		initShapeLoop0();
	};

	const initShapeLoop1 = function() {
		// pos = pos || 0;
		anime({
			targets: DOM.shapeEl1,
			easing: 'linear',
			d: [{value: shapes[1].pathAlt, duration:25000}, {value: shapes[1].path, duration:25000}],
			loop: true,
			fill: {
				value: shapes[1].fill.color,
				duration: shapes[1].fill.duration,
				easing: shapes[1].fill.easing
			},
			direction: 'alternate'
		});
	};

	const initShapeEl1 = function() {
		anime({
			targets: DOM.svg1,
			duration: 1,
			easing: 'linear',
			scaleX: shapes[1].scaleX,
			scaleY: shapes[1].scaleY,
			translateX: shapes[1].tx+'px',
			translateY: shapes[1].ty+'px',
			rotate: shapes[1].rotate+'deg'
		});

		initShapeLoop1();
	};

	const initShapeLoop2 = function() {
		// pos = pos || 0;
		anime({
			targets: DOM.shapeEl2,
			easing: 'linear',
			d: [{value: shapes[2].pathAlt, duration:22500}, {value: shapes[2].path, duration:22500}],
			loop: true,
			fill: {
				value: shapes[2].fill.color,
				duration: shapes[2].fill.duration,
				easing: shapes[2].fill.easing
			},
			direction: 'alternate'
		});
	};

	const initShapeEl2 = function() {
		anime({
			targets: DOM.svg2,
			duration: 1,
			easing: 'linear',
			scaleX: shapes[2].scaleX,
			scaleY: shapes[2].scaleY,
			translateX: shapes[2].tx+'px',
			translateY: shapes[2].ty+'px',
			rotate: shapes[2].rotate+'deg'
		});

		initShapeLoop2();
	};

	const initShapeLoop3 = function() {
		// pos = pos || 0;
		anime({
			targets: DOM.shapeEl3,
			easing: 'linear',
			d: [{value: shapes[3].pathAlt, duration:27500}, {value: shapes[3].path, duration:27500}],
			loop: true,
			fill: {
				value: shapes[3].fill.color,
				duration: shapes[3].fill.duration,
				easing: shapes[3].fill.easing
			},
			direction: 'alternate'
		});
	};

	const initShapeEl3 = function() {
		anime({
			targets: DOM.svg3,
			duration: 1,
			easing: 'linear',
			scaleX: shapes[3].scaleX,
			scaleY: shapes[3].scaleY,
			translateX: shapes[3].tx+'px',
			translateY: shapes[3].ty+'px',
			rotate: shapes[3].rotate+'deg'
		});

		initShapeLoop3();
	};


	const init = function() {
		imagesLoaded(document.body, () => {

			initShapeEl0();
			initShapeEl1();
			initShapeEl2();
			initShapeEl3();
			// initShapeEl(1);
			// createScrollWatchers();
			Array.from(document.querySelectorAll('.content--layout')).forEach(el => new TiltObj(el));
			// Remove loading class from body
			// document.body.classList.remove('loading');
			setTimeout(function(){
				$(".loading").fadeOut("slow", function() {
				});
			}, 100);
		});
	}


	init();
};

var marker;

function initMap() {
	var tech = {lat: 19.36339048, lng: -99.12267276};
	var image = 'img/cara-tec.svg';
	var map = new google.maps.Map(
		document.getElementById('mapa'), {zoom: 18, center: tech});
	marker = new google.maps.Marker({
		position: tech,
		map: map,
		icon: image,
		animation: google.maps.Animation.DROP
	});
	marker.addListener('click', toggleBounce);
}

function toggleBounce() {
	if (marker.getAnimation() !== null) {
		marker.setAnimation(null);
	} else {
		marker.setAnimation(google.maps.Animation.BOUNCE);
	}
}

$(function() {
			
	var $window = $(window);
	$window.on('scroll', revealOnScroll);
	function revealOnScroll() {
		var scrolled = $window.scrollTop(),
			win_height_padded = $window.height() * 1;


		$("#hola").each(function () {
			var $this     = $(this),
				offsetTop = $this.offset().top,
				height_div = $this.height();
				// console.log("win_1: "+scrolled);
				// console.log("height_1: "+height_div);
				// console.log("offset_1: "+offsetTop);
			if (scrolled + height_div > offsetTop) {
				$(".demos a").removeClass("demo--current");
				$(".demos a:nth-child(1)").addClass("demo--current");
				// $(".cd-primary-nav li a").removeClass("demo--current");
				// $(".cd-primary-nav li:nth-child(1) a").addClass("demo--current");
			}
		});
		$("#clientes").each(function () {
			var $this     = $(this),
				offsetTop = $this.offset().top,
				height_div = $this.height();
			// console.log("win_2: "+scrolled);
			// console.log("height_2: "+height_div);
			// console.log("offset_2: "+offsetTop);
			if (scrolled + height_div > offsetTop) {
				$(".demos a").removeClass("demo--current");
				$(".demos a:nth-child(2)").addClass("demo--current");
				// $(".cd-primary-nav li a").removeClass("demo--current");
				// $(".cd-primary-nav li:nth-child(2) a").addClass("demo--current");
			}
		});
		$("#como").each(function () {
			var $this     = $(this),
				offsetTop = $this.offset().top,
				height_div = $this.height();
				// console.log("win_3: "+scrolled);
				// console.log("height_3: "+height_div);
				// console.log("offset_3: "+offsetTop);
			if (scrolled + height_div > offsetTop * 1.5) {
				$(".demos a").removeClass("demo--current");
				$(".demos a:nth-child(3)").addClass("demo--current");
				// $(".cd-primary-nav li a").removeClass("demo--current");
				// $(".cd-primary-nav li:nth-child(3) a").addClass("demo--current");
			}
		});
		$("#equipo").each(function () {
			var $this     = $(this),
				offsetTop = $this.offset().top,
				height_div = $this.height();
			// console.log(scrolled);
			// console.log(win_height_padded);
			// console.log(offsetTop);
			if (scrolled + height_div > offsetTop) {
				$(".demos a").removeClass("demo--current");
				$(".demos a:nth-child(4)").addClass("demo--current");
				// $(".cd-primary-nav li a").removeClass("demo--current");
				// $(".cd-primary-nav li:nth-child(4) a").addClass("demo--current");
			}
		});
		$("#adios").each(function () {
			var $this     = $(this),
				offsetTop = $this.offset().top,
				height_div = $this.height();
			// console.log(scrolled);
			// console.log(win_height_padded);
			// console.log(offsetTop);
			if (scrolled + height_div > offsetTop) {
				$(".demos a").removeClass("demo--current");
				$(".demos a:nth-child(5)").addClass("demo--current");
				// $(".cd-primary-nav li a").removeClass("demo--current");
				// $(".cd-primary-nav li:nth-child(5) a").addClass("demo--current");
			}
		});
		$(".revealOnScroll:not(.animated)").each(function () {
			var $this     = $(this),
				offsetTop = $this.offset().top;

			if (scrolled + win_height_padded > offsetTop) {
				if ($this.data('timeout')) {
					window.setTimeout(function(){
						$this.addClass('animated ' + $this.data('animation'));
						// $this.addClass('start');
						setTimeout(function(){
							$this.addClass('start');
						}, 2000);
					}, parseInt($this.data('timeout'),10));
				} else {
					$this.addClass('animated ' + $this.data('animation'));
					setTimeout(function(){
						$this.addClass('start');
					}, 2000);
				}
			}
		});

		$(".revealOnScroll.animated").each(function (index) {
			var $this     = $(this),
				offsetTop = $this.offset().top;
				
			if (scrolled + win_height_padded < offsetTop) {
				$(this).removeClass('animated fadeInUp fadeIn flipInX slideInRight slideInLeft lightSpeedIn');
				$this.removeClass('start');
			}
		});
	}
	revealOnScroll();
	
	$('.btn-charla').click(function(event){       
		event.preventDefault();
		$('html,body').animate({scrollTop:$('#adios').offset().top}, 1000);
	});

	var overlayNav = $('.cd-overlay-nav'),
		overlayContent = $('.cd-overlay-content'),
		navigation = $('.cd-primary-nav'),
		toggleNav = $('.cd-nav-trigger,.nav-trigger');

	//inizialize navigation and content layers
	layerInit();
	$(window).on('resize', function(){
		window.requestAnimationFrame(layerInit);
	});

	//open/close the menu and cover layers
	toggleNav.on('click', function(){
		if(!toggleNav.hasClass('close-nav')) {
			//it means navigation is not visible yet - open it and animate navigation layer
			toggleNav.addClass('close-nav');
			
			overlayNav.children('span').velocity({
				translateZ: 0,
				scaleX: 1,
				scaleY: 1,
			}, 500, 'easeInCubic', function(){
				navigation.addClass('fade-in');
			});
		} else {
			//navigation is open - close it and remove navigation layer
			toggleNav.removeClass('close-nav');
			
			overlayContent.children('span').velocity({
				translateZ: 0,
				scaleX: 1,
				scaleY: 1,
			}, 500, 'easeInCubic', function(){
				navigation.removeClass('fade-in');
				
				overlayNav.children('span').velocity({
					translateZ: 0,
					scaleX: 0,
					scaleY: 0,
				}, 0);
				
				overlayContent.addClass('is-hidden').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
					overlayContent.children('span').velocity({
						translateZ: 0,
						scaleX: 0,
						scaleY: 0,
					}, 0, function(){overlayContent.removeClass('is-hidden')});
				});
				if($('html').hasClass('no-csstransitions')) {
					overlayContent.children('span').velocity({
						translateZ: 0,
						scaleX: 0,
						scaleY: 0,
					}, 0, function(){overlayContent.removeClass('is-hidden')});
				}
			});
		}
	});

	function layerInit(){
		var diameterValue = (Math.sqrt( Math.pow($(window).height(), 2) + Math.pow($(window).width(), 2))*2);
		overlayNav.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height : diameterValue+'px',
			width : diameterValue+'px',
			top : -(diameterValue/2)+'px',
			left : -(diameterValue/2)+'px',
		}, 0);

		overlayContent.children('span').velocity({
			scaleX: 0,
			scaleY: 0,
			translateZ: 0,
		}, 50).velocity({
			height : diameterValue+'px',
			width : diameterValue+'px',
			top : -(diameterValue/2)+'px',
			left : -(diameterValue/2)+'px',
		}, 0);
	}

});



$('.menu').click(function(event) {
	
	$('#nav-first').removeClass('demo--current');
	$('#nav-first-mobile').removeClass('demo--current');

    if (
    	location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
    && 
    	location.hostname == this.hostname
    ) {

    var target = $(this.hash);
    target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

    if (target.length) {

        event.preventDefault();
        $('html, body').animate({
        	scrollTop: target.offset().top-75
        }, 1000, function() {
        });
    	}
    }
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
	var wide= $(window).width();

	if(wide > 1024) {
		if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
			$(".content--fixed").css("padding", "0");
			$(".logoTech").css("width", "9rem");
		} else {
			$(".content--fixed").css("padding", "1.5rem");
			$(".logoTech").css("width", "12.7rem");
		}
	} else {
		$(".content--fixed").css("padding", "1.5rem");
		$(".logoTech").css("width", "12.7rem");
	}
}


var x, i, j, selElmnt, a, b, c;

x = document.getElementsByClassName("custom-select");
for (i = 0; i < x.length; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];

  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);

  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < selElmnt.length; j++) {

    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {

        var y, i, k, s, h;
        s = this.parentNode.parentNode.getElementsByTagName("select")[0];
        h = this.parentNode.previousSibling;
        for (i = 0; i < s.length; i++) {
          if (s.options[i].innerHTML == this.innerHTML) {
            s.selectedIndex = i;
            h.innerHTML = this.innerHTML;
            y = this.parentNode.getElementsByClassName("same-as-selected");
            for (k = 0; k < y.length; k++) {
              y[k].removeAttribute("class");
            }
            this.setAttribute("class", "same-as-selected");
            break;
          }
        }
        h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function(e) {

      e.stopPropagation();
      closeAllSelect(this);
      this.nextSibling.classList.toggle("select-hide");
      this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {

  var x, y, i, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  for (i = 0; i < y.length; i++) {
    if (elmnt == y[i]) {
	  arrNo.push(i)
	  $(".select-selected").css("color", "#010101");
    } else {
	  y[i].classList.remove("select-arrow-active");
	  
    }
  }
  for (i = 0; i < x.length; i++) {
    if (arrNo.indexOf(i)) {
	  x[i].classList.add("select-hide");
	  
    }
  }
}

document.addEventListener("click", closeAllSelect);
