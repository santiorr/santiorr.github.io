$(document).ready(function(){
    $('a[href^="#abt"]').click( function(){ // если в href начинается с #, то обрабатываем клик
 	var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href
 	if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
 		$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
 	}
 	return false; // выключаем стандартное действие
     });

	$('a[href^="#header"]').click( function(){ // если в href начинается с #, то обрабатываем клик
 	var scrolll_el = $(this).attr('href'); // возьмем содержимое атрибута href
 	if ($(scrolll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
 		$('html, body').animate({ scrollTop: $(scrolll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
 	}
 	return false; // выключаем стандартное действие
     });
 });
