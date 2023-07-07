let index = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('Play');
let progressBar = document.getElementById('progress');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let infoElement = document.querySelector('.info');

let songs = [
    { songName: "I Ain't Worried", filePath: "./Audio/OneRepublic_-_I_Ain_t_Worried_[NaijaMusic.Ng].mp3", coverPath: "https://cdn.albumoftheyear.org/album/504280-i-aint-worried.jpg", duration:"2:34" },
    { songName: "Light Switch", filePath: "./Audio/Charlie_Puth_Light_Switch_(NaijaMusic.NG).mp3", coverPath: "https://i1.sndcdn.com/artworks-S5oz2upf83rqWN8i-EoDz5A-t500x500.jpg", duration:"3:24"  },
    { songName: "Sweet Child", filePath: "./Audio/guns-n-roses-sweet-child-o-mine-official-music-video-(mp3convert.org).mp3", coverPath: "http://24.media.tumblr.com/tumblr_lye6zq40SC1qjrbfio1_1280.jpg", duration:"5:02"  },
    { songName: "Shape Of You", filePath: "./Audio/Ed Sheeran - Shape Of You.mp3", coverPath: "http://headlineplanet.com/home/wp-content/uploads/2017/01/Shape-Of-You-Cover-e1485138467734.jpg", duration:"3:55"  },
    { songName: "Unstoppable", filePath: "./Audio/The_Score_-_Unstoppable_Lyric_Video.mp3", coverPath: "https://images.genius.com/092d52b360a9a1c59dec783976d94c98.1000x1000x1.jpg", duration:"3:11"  },
    { songName: "Bones", filePath: "./Audio/Bones_320(PaglaSongs).mp3", coverPath: "https://radiosound95.it/wp-content/uploads/2022/03/Imagine-Dragons-Bones-ISRC-USUM72203616.jpg", duration:"2:45"  },
    { songName: "Sunflower", filePath: "./Audio/Post Malone_ Swae Lee - Sunflower (Spider-Man_ Int(MP3_128K).mp3", coverPath: "https://www.sanity.com.au/media/Images/fullimage/488114/SDC_2408575_2018-07-12--00-15-10.jpg", duration:"2:41"  },
    { songName: "Holiday", filePath: "./Audio/Lil Nas X - HOLIDAY (Official Video).mp3", coverPath: "https://thatgrapejuice.net/wp-content/uploads/2020/11/lil-nas-x-holiday-tgj.jpeg", duration:"2:47"  },
    { songName: "No lie", filePath: "./Audio/No-Lie_320(PaglaSongs).mp3", coverPath: "https://images.genius.com/65f98823264a137c02f6555ec218bd6f.1000x1000x1.jpg", duration:"3:43"  },
    { songName: "Watermelon Sugar", filePath: "./Audio/Harry Styles - Watermelon Sugar.mp3", coverPath: "https://img.discogs.com/BJWFcL094VGWfMG4NyzMmTxCmAA=/fit-in/300x300/filters:strip_icc():format(jpeg):mode_rgb():quality(40)/discogs-images/R-14411523-1573993613-4770.jpeg.jpg", duration:"2:54"  },
    { songName: "Levitating", filePath: "./Audio/Dua-Lipa-Levitating-(HiphopKit.com).mp3", coverPath: "https://images.genius.com/617ca7190c3bf11ecc6121681e095fee.1000x1000x1.png", duration:"3:23"  },
    { songName: "Coast", filePath: "./Audio/Coast_320(PaglaSongs).mp3", coverPath: "https://tse2.mm.bing.net/th?id=OIP.T5PwMcnXxC_FgFd3X0Li7wHaHa&pid=Api&P=0&h=180", duration:"2:51"  },
    { songName: "Sunroof", filePath: "./Audio/Nicky_Youre_-_Sunroof_Ft_Dazy_CeeNaija.com_.mp3", coverPath: "https://i.scdn.co/image/ab67616d0000b27323178221df1f3f2d32cc825f", duration:"2:41"  },
    { songName: "Montero", filePath: "./Audio/Lil_Nas_X_-_MONTERO_Call_Me_By_Your_Name__(Naijay.com).mp3", coverPath: "https://ih1.redbubble.net/image.2331677011.8534/poster,504x498,f8f8f8-pad,600x600,f8f8f8.jpg", duration:"2:17"  },
    { songName: "Grafiti", filePath: "./Audio/Ed_Sheeran_-_Overpass_Graffiti_CeeNaija.com_.mp3", coverPath: "https://tse3.mm.bing.net/th?id=OIP.y6z6_M5UlzqI3F-a4yJYeQHaHa&pid=Api&P=0&h=180", duration:"4:46"  },
];

function playSong(index) {
    audioElement.src = songs[index].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    highlightSong(index);
    updateInfo(songs[index].songName);
  }
  
  function updateInfo(songName) {
    infoElement.textContent = songName;
  }
  
  function highlightSong(index) {
    songItems.forEach((item, i) => {
      if (i === index) {
        item.classList.add('playing'); 
      } else {
        item.classList.remove('playing');
      }
    });
  }
  
  masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
      playSong(index);
    } else {
      audioElement.pause();
      masterPlay.classList.remove('fa-pause-circle');
      masterPlay.classList.add('fa-play-circle');
    }
  });
  
  songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songTitle")[0].innerText = songs[i].songName;
    element.getElementsByClassName("duration")[0].innerText = songs[i].duration;
    element.getElementsByClassName("songlistplay")[0].addEventListener('click', () => {
      playSong(i);
    });
  });
  
  audioElement.addEventListener('timeupdate', () => {
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    progressBar.value = progress;
  });
  
  progressBar.addEventListener('input', () => {
    audioElement.currentTime = (progressBar.value / 100) * audioElement.duration;
  });
  
  document.getElementById('forward').addEventListener('click', () => {
    index = (index + 1) % songs.length;
    playSong(index);
  });
  
  document.getElementById('backward').addEventListener('click', () => {
    index = (index - 1 + songs.length) % songs.length;
    playSong(index);
  });
  
  audioElement.addEventListener('ended', () => {
    index = (index + 1) % songs.length;
    playSong(index);
  });

  document.addEventListener("DOMContentLoaded", function() {
   
    document.addEventListener("keydown", function(event) {
      var songItemContainer = document.querySelector(".songItemContainer");
      if (event.key === "ArrowUp") {
        songItemContainer.scrollTop -= 100; 
        event.preventDefault();
      } else if (event.key === "ArrowDown") {
        songItemContainer.scrollTop += 100; 
        event.preventDefault();
      }
    });
  });
  


  
