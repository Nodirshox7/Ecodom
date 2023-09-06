
class Player {
    constructor(selector) {
        this.player = document.querySelector(selector);
        this.video = this.player.querySelector('video');
        this.hidePanel = true;
        this.timer;
        this.playVideo();
    }

    playVideo() {
        this.video.addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.play').addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.play-circle').addEventListener('click', this.toggleVideo.bind(this));
        this.player.querySelector('.fullscreen').addEventListener('click', this.toggleFullscreen.bind(this));
        this.video.addEventListener('dblclick', this.toggleFullscreen.bind(this));
        this.player.querySelector('.mute').addEventListener('click', this.toggleVolume.bind(this));
        this.player.querySelector('.volume-slider').addEventListener('input', this.setVolume.bind(this));
        this.player.querySelector('.video-speed').addEventListener('input', this.setSpeed.bind(this));
        this.video.addEventListener('loadedmetadata', this.setVideoTime.bind(this));
        this.video.addEventListener('timeupdate', this.timeUpdate.bind(this));
        this.player.querySelector('.panel-line').addEventListener('click', this.setVideoLine.bind(this));


    }

    toggleVideo() {
        this.playing = !this.playing
        const playIcon = this.player.querySelector('.play .fas');
        const playCircle = this.player.querySelector('.play-circle');

        playIcon.classList.toggle('fa-play', !this.playing)
        playIcon.classList.toggle('fa-pause', this.playing)

        if (this.playing) {
            this.video.play();
            playCircle.style.display = 'none'
        } else {
            this.video.pause();
            playCircle.style.display = 'block'
        }
    }

    toggleFullscreen() {
        const full = document.fullscreenElement;
        const fullIcon = this.player.querySelector('.fullscreen .fas');
        fullIcon.classList.toggle('fa-expand', full);
        fullIcon.classList.toggle('fa-compress', !full);

        if (!full) {
            this.player.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    toggleVolume() {
        this.sounding = !this.sounding;
        const volumeIcon = this.player.querySelector('.mute .fas');
        const volumeSlider = this.player.querySelector('.volume-slider');
        volumeIcon.classList.toggle('fa-volume-up', !this.sounding);
        volumeIcon.classList.toggle('fa-volume-mute', this.sounding);

        if (this.sounding) {
            this.video.muted = true;
            volumeSlider.setAttribute('data-volume', volumeSlider.value);
            volumeSlider.value = 0;
        } else {
            this.video.muted = false;
            volumeSlider.value = volumeSlider.getAttribute('data-volume');
        }
    }

    setVolume() {
        this.video.volume = this.player.querySelector('.volume-slider').value / 100;
    }

    setSpeed() {
        this.video.playbackRate = this.player.querySelector('.video-speed').value;
    }

    setVideoTime() {
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.time-duration').innerHTML = ` ${Math.floor(duration / 60)}:${Math.floor(duration % 60)}`;
    }

    timeUpdate() {
        const duration = Math.floor(this.video.duration);
        const current = Math.floor(this.video.currentTime);
        let seconds;

        if (current % 60 < 10) {
            seconds = `0${current % 60}`;
        } else {
            seconds = `${current % 60}`;
        }


        this.player.querySelector('.time-current').innerHTML = `${Math.floor(current / 60)}:${seconds}`;
        this.player.querySelector('.panel-line-current').style.width = `${current / duration * 100}%`;

        if (this.hidePanel) {
            this.hidePanel = false;
            this.timer = setTimeout(() => {
                this.player.querySelector('.panel').style.bottom = '-68px';
            }, 2000)
        }
        this.video.addEventListener('mousemove', this.hide.bind(this));
    }


    hide() {
        this.hidePanel = true;
        clearTimeout(this.timer);
        document.querySelector('.panel').style.bottom = '0';
    }


    setVideoLine(event) {
        const lineWidth = this.player.querySelector('.panel-line').clientWidth;
        const position = event.offsetX;
        const duration = Math.floor(this.video.duration);
        this.player.querySelector('.panel-line-current').style.width = `${position / lineWidth * 100}%`;
        this.video.currentTime = position / lineWidth * duration;
    }
}

let player = new Player('.player')



// modal akno


var modal = document.querySelector('.modal');
var closeModal = document.querySelector('.close');
var overlay = document.querySelector('.overlay');
var showModal = document.querySelector('.show-modal');
var header_left_btn = document.querySelector(".header_left-btn")
var cockroach_content_btn = document.querySelector(".cockroach_content-right-btn")

cockroach_content_btn.addEventListener('click' ,function () {
    overlay.style.display = 'block';
    modal.classList.add('show')
})


header_left_btn.addEventListener('click' , function () {
    overlay.style.display = 'block';
    modal.classList.add('show')
})

showModal.addEventListener('click', function () {
    overlay.style.display = 'block';
    modal.classList.add('show')
})

closeModal.addEventListener('click', function () {
    overlay.style.display = 'none';
    modal.classList.remove('show')
})


// code for two buttons
const btn_1 = document.querySelector('.success_article_btn-one');
const btn_2 = document.querySelector('.success_article_btn-two');

const success_one = document.querySelector('.success_content-one');
const success_two = document.querySelector('.success_content-two');

const background_image = document.querySelector('.main-section-three')



btn_1.addEventListener('click', () => {
    btn_1.classList.add('active');
    btn_2.classList.remove('active');

    background_image.style.background = 'url("img/background_logo_4_2.png")'
    background_image.style.height = '1600px'


    success_one.classList.remove('active');
    success_two.classList.add('active');
});


btn_2.addEventListener('click', () => {
    btn_2.classList.add('active');
    btn_1.classList.remove('active');
    background_image.style.background = 'url("img/background_logo_4.png")'
    background_image.style.height = '1335px'


    success_one.classList.add('active');
    success_two.classList.remove('active');
});

// token


const form_message = document.getElementById('dataForm');

form_message.addEventListener("submit", (e) => {
    e.preventDefault();
    const message_name = document.getElementById('message_name').value;
    const message_number = document.getElementById('message_number').value;
    const message_address = document.getElementById('message_address').value;

    let bot_token = "6557000807:AAGQdo-mvbnUu6IsCv6bKExNspRMCGdg_ls";
    let channel_token = "-1001631658392";

    let my_message = `Ma'lumotlar:\n Ism: ${message_name}\n
     Tel: ${message_number}\n
      Address: ${message_address}`;

    let telegram_url = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${channel_token}&text=${my_message}`;

    let api = new XMLHttpRequest();
    api.open("GET", telegram_url, true);
    api.send();
});



const mainForm = document.getElementById('mainForm');

mainForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const message_name = document.getElementById('main_message').value;
    const message_number = document.getElementById('main_number').value;
    const message_address = document.getElementById('main_address').value;

    let bot_token = "6557000807:AAGQdo-mvbnUu6IsCv6bKExNspRMCGdg_ls";
    let channel_token = "-1001631658392";

    let my_message = `Ma'lumotlar:\n Ism: ${message_name}\n
     Tel: ${message_number}\n
      Address: ${message_address}`;

    let telegram_url = `https://api.telegram.org/bot${bot_token}/sendMessage?chat_id=${channel_token}&text=${my_message}`;

    let api = new XMLHttpRequest();
    api.open("GET", telegram_url, true);
    api.send();
    console.log("Muvvafaqiyatli jo'natildi");
});