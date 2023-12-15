
$(document).ready(function() {
	
	//
	var movevalue = '100%';
	var hashid = window.location.hash.replace(/^#!/, '');
	
	if (hashid == '' || (hashid != 'start' && hashid != 'skills' && hashid != 'experiences' && hashid != 'certificate' && hashid != 'history' && hashid != 'contact')) hashid = 'start';	
	
	$('#nav_'+hashid).addClass('active');
	$('section.'+hashid).fadeIn().css({'z-index':'6'});
	
	//
	$('.navbars').click(function(){
		$('nav').slideToggle('slow', 'swing', function(){
			if ($('nav').is(':visible')) $('.navbars').addClass('nb_active');
			else $('.navbars').removeClass('nb_active');
		});
	});
	
	//
	$("[id^='nav_']").click(function(){
		
		if ($('.navbars').is(':visible')) {
			movevalue = '150%';
			$('nav').slideToggle();
			$('.navbars').removeClass('nb_active');
		}
		
		var aid = $(this).attr('id').substr(4);
		window.history.pushState(null,'','#!'+aid);
		
		if (aid == 'experiences') {
			$("[id^='exptype_']").each(function(){
				$(this).removeClass('exptypetop');
				$(this).removeClass('exptypebottom');
			});
			$("[id^='explist_']").each(function(){
				$(this).slideUp();
			});
		}
		
		if (hashid == aid) {
			$('section.'+aid).addClass('shake');
			setTimeout(function(){$('section.'+aid).removeClass('shake');}, 1000);
			
		} else {
		
			$('section').each(function(){
				var secid = $(this).attr('class');
				if (secid != hashid && secid != aid) $(this).css({'display':'none'});
			});
			
			$('section.'+aid).fadeIn('fast').css({transition: "0.5s", left: movevalue, transform: 'rotate(30deg)'});
			setTimeout(function(){
				$('section.'+hashid).css({'z-index':'20'});
				$('section.'+aid).css({'z-index':'25', transition: "0.5s", left: '0', transform: 'rotate(0)'});
				$("[id^='nav_']").removeClass('active');
				$('#nav_'+aid).addClass('active');
				hashid = aid;
			}, 500);
		}
	});
	
	//
	$(window).on('popstate', function() {
		if (hashid == 'start') {
			window.history.pushState(null,'','#!start');
			if ($('.navbars').is(':visible')) {
				$('.navbars').addClass('shake');
				setTimeout(function(){$('.navbars').removeClass('shake');}, 1000);
			} else {
				$('section.start').addClass('shake');
				setTimeout(function(){$('section.start').removeClass('shake');}, 1000);
			}
		} else {
			window.history.pushState(null,'','#!start');
			$('section').css({'z-index':'20'});
			$('section.start').fadeIn('fast').css({transition: "0.5s", left: movevalue, transform: 'rotate(30deg)'});
			setTimeout(function(){
				$('section.start').css({'z-index':'25', transition: "0.5s", left: '0', transform: 'rotate(0)'});
				$('nav a').removeClass('active');
				$('nav a#start').addClass('active');
				hashid = 'start';
			}, 500);
		}
	});
	
	//
	$("[id^='skill_']").click(function(){
		var skillid = $(this).attr('id');
		$('#'+skillid+' h5').slideToggle('slow', function() {
			$('#'+skillid+' span').slideToggle();
		});
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
		} else {
			$(this).addClass('active');
			setTimeout(function(){
				if ($('#'+skillid).hasClass('active')) {
					$('#'+skillid).removeClass('active');
					$('#'+skillid+' h5').slideToggle('slow', function() {
						$('#'+skillid+' span').slideToggle();
					});
				}
			}, 5000);
		}
	});
	
	//
	$("[id^='exptype_']").click(function(){
		
		var exptype = $(this).attr('id');
		var explist = 'explist_' + exptype.substr(8);
		
		$("[id^='explist_']").each(function(){
			var selectid = $(this).attr('id');
			if (selectid != explist) $(this).slideUp();
		});
		
		$("[id^='exptype_']").each(function(){
			var selectid = $(this).attr('id');
			if (selectid != exptype) {
				$(this).addClass('exptypebottom');
				$(this).removeClass('exptypetop');
			}
			else $(this).removeClass('exptypebottom');
		});
		
		if ($('#'+explist).is(':visible')) {
			$('#'+explist).slideUp().promise().done(function(){
				$("[id^='exptype_']").each(function(){
					$(this).removeClass('exptypetop');
					$(this).removeClass('exptypebottom');
				});
			});
		} else {
			$("#"+exptype).removeClass('exptypetop').promise().done(function(){
				$("[id^='expitem_']").each(function(){
					var expitemid = '#'+$(this).attr('id');
					$(expitemid+' p').removeClass('active');
					$(expitemid+' a').html('<u> » </u> more');
				}).promise().done(function(){
					$("#"+exptype).addClass('exptypetop');
					$('#'+explist).slideDown();
				});
			});
		}		
	});
	
	//
	$("[id^='expitem_']").click(function(){
		var expitemid = '#'+$(this).attr('id');
		$(expitemid+' p').toggleClass('active').promise().done(function(){
			if ($(expitemid+' p').hasClass('active')) {
				$(expitemid+' a').animate({'font-size': 0}).promise().done(function(){
					$(expitemid+' a').html('<u> x </u> close').promise().done(function(){
						$(expitemid+' a').animate({'font-size': '18px'});
					});
				});
			} else {
				$(expitemid+' a').animate({'font-size': 0}).promise().done(function(){
					$(expitemid+' a').html('<u> » </u> more').promise().done(function(){
						$(expitemid+' a').animate({'font-size': '18px'});
					});
				});
			}
		});
	});
	
	//
	var startimg_width = $('.start img').height();
	if (startimg_width <= 200) $('.start img').hide();
});

function expYear() {
	let currentYear = new Date().getFullYear();
	document.write(currentYear - 2011);
}
