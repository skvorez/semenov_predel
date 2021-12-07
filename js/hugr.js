let btnPlay = document.querySelector("#coverVideo--logo");
let video = document.getElementById("coverVideo");
let pocik = document.getElementById('trofei'), pocikAudio = document.getElementById('pocikAudo');

document.getElementById('coverVideo').addEventListener('ended', myHandler, false);
document.getElementById('pocikAudo').addEventListener('ended', fPlayer, false);
pocik.addEventListener('click', fPlay, false);
pocikAudio.volume = 0.3;

window.onload = function () {
	// В фокус body на старте
	document.getElementById("main").focus()
}

btnPlay.addEventListener("click", function() {
	// Запуск видео по нажатию на кнопку
	video.play()
});

function myHandler(e) {
	// Ряд действий по завершению видео (показать шапку, скрыть видео-контейнер, удалить кнопку)
	magnify("myimage", 3);
	document.getElementById('hat').classList.add('hat-active');
	document.getElementById('coverVideo').classList.add('cover-animation-finish');
	document.getElementById('coverVideo--logo').remove();
}

function fPlay() {
	// Проиграть звук
	pocikAudio.play();
	// Заблокировать меню, когда играет
	if (pocikAudio.duration > 0 && !pocikAudio.paused) {
		document.getElementById('trofei').classList.add('hat-notActive')
	}
}

function fPlayer(e) {
	// Удалить класс, когда проиграл звук
	document.getElementById('trofei').classList.remove('hat-notActive')
}



const anchors = document.querySelectorAll('a.scroll-to')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()
    
    const blockID = anchor.getAttribute('href')
    
    document.querySelector(blockID).scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  })
}



function magnify(imgID, zoom) {

	var img, glass, w, h, bw;
	img = document.getElementById(imgID);

	/* Создать увеличительное стекло: */
	glass = document.createElement("DIV");
	glass.setAttribute("class", "img-magnifier-glass");

	/* Вставить увеличительное стекло: */
	img.parentElement.insertBefore(glass, img);

	window.addEventListener('resize', function () {
		/* Установите свойства фона для стекла лупы: */
		glass.style.backgroundImage = "url('" + img.src + "')";
		glass.style.backgroundRepeat = "no-repeat";
		glass.style.backgroundSize = (img.width * zoom) + "px " + (img.height * zoom) + "px";
		bw = 3;
		w = glass.offsetWidth / 2;
		h = glass.offsetHeight / 2;

	});

	if (typeof(Event) === 'function') {
		// modern browsers
		window.dispatchEvent(new Event('resize'));
	} else {
		// for IE and other old browsers
		// causes deprecation warning on modern browsers
		var evt = window.document.createEvent('UIEvents');
		evt.initUIEvent('resize', true, false, window, 0);
		window.dispatchEvent(evt);
	}

	/* Выполните функцию, когда кто-то перемещает лупу по изображению: */
	glass.addEventListener("mousemove", moveMagnifier);
	img.addEventListener("mousemove", moveMagnifier);

	/* а также для сенсорных экранов: */
	glass.addEventListener("touchmove", moveMagnifier);
	img.addEventListener("touchmove", moveMagnifier);
    

	function moveMagnifier(e) {
		var pos, x, y;
		/* Предотвратите любые другие действия, которые могут возникнуть при перемещении по изображению */
		e.preventDefault();
		/* Получить позиции курсора x и y: */
		pos = getCursorPos(e);
		x = pos.x;
		y = pos.y;
		/* Не допускайте, чтобы лупа находилась вне изображения: */
		if (x > img.width - (w / zoom)) {x = img.width - (w / zoom);}
		if (x < w / zoom) {x = w / zoom;}
		if (y > img.height - (h / zoom)) {y = img.height - (h / zoom);}
		if (y < h / zoom) {y = h / zoom;}
		/* Установите положение стекла лупы: */
		glass.style.left = (x - w) + "px";
		glass.style.top = (y - h) + "px";
		/* Покажите, что такое увеличительное стекло "смотреть": */
		glass.style.backgroundPosition = "-" + ((x * zoom) - w + bw) + "px -" + ((y * zoom) - h + bw) + "px";
	}

	function getCursorPos(e) {
		var a, x = 0, y = 0;
		e = e || window.event;
		/* Получить x и y позиции изображения: */
		a = img.getBoundingClientRect();
		/* Вычислите координаты курсора x и y относительно изображения: */
		x = e.pageX - a.left;
		y = e.pageY - a.top;
		/* Consider any page scrolling: */
		x = x - window.pageXOffset;
		y = y - window.pageYOffset;
		return {x : x, y : y};
	}
}


function pop (e) {

	let amount = 30;

	switch (e.target.dataset.type) {

		case 'shadow':
		case 'line':
		amount = 60;
		break;
	}

	if (e.clientX === 0 && e.clientY === 0) {

		const bbox = e.target.getBoundingClientRect();
		const x = bbox.left + bbox.width / 2;
		const y = bbox.top + bbox.height / 2;

		for (let i = 0; i < 30; i++) {
			createParticle(x, y, e.target.dataset.type);
		}

	} else {

		for (let i = 0; i < amount; i++) {
			createParticle(e.clientX, e.clientY, e.target.dataset.type);
		}

	}
}

function createParticle (x, y, type) {

	const particle = document.createElement('particle');
	document.body.appendChild(particle);
	let width = Math.floor(Math.random() * 30 + 8);
	let height = width;
	let destinationX = (Math.random() - 0.5) * 300;
	let destinationY = (Math.random() - 0.5) * 300;
	let rotation = Math.random() * 520;
	let delay = Math.random() * 200;

	switch (type) {

		case 'square':
		particle.style.background = `hsl(${Math.random() * 50 + 200}, 70%, 60%)`;
		particle.style.border = '1px solid white';
		break;

		case 'symbol':
		particle.innerHTML = ['&#128162;', '&#128165;', '&#128162;', '&#128165;', '&#128162;', '&#128165;', '&#128162;'][Math.floor(Math.random() * 7)];
		particle.style.color = `hsl(${Math.random() * 50 + 200}, 70%, 60%)`;
		particle.style.fontSize = `${Math.random() * 24 + 10}px`;
		width = height = 'auto';
		break;

		case 'logo':
		particle.style.backgroundImage = 'url(https://atuin.ru/images/favicon.png)';
		break;

		case 'shadow':
		var color = `hsl(${Math.random() * 50 + 200}, 70%, 50%)`;
		particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`;
		particle.style.background = color;
		particle.style.borderRadius = '50%';
		width = height = Math.random() * 5 + 4;
		break;

		case 'line':
		particle.style.background = `hsl(${Math.random() * 50 + 200}, 70%, 50%)`;
		height = 1;
		rotation += 1000;
		delay = Math.random() * 1000;
		break;
	}

	particle.style.width = `${width}px`;
	particle.style.height = `${height}px`;
	const animation = particle.animate([
		{
			transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
			opacity: 1
		},
		{
			transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
			opacity: 0
		}
		], {
			duration: Math.random() * 1000 + 5000,
			easing: 'cubic-bezier(0, .9, .57, 1)',
			delay: delay
		});

	animation.onfinish = removeParticle;
}

function removeParticle (e) {
	e.srcElement.effect.target.remove();
}

if (document.body.animate) {
	document.querySelectorAll('div').forEach(div => div.addEventListener('click', pop));
}