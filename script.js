console.log("Welcome to Spotify!");

// Initialize Variables
let songIndex = 0;
let audioelement = new Audio("/songs/Leke Prabhu Ka Naam.mp3");
let masterPlay = document.getElementById("masterplay");
let progressBar = document.getElementById("seek-bar");
let cardPlay = document.getElementsByClassName("play-song");
let songItem = Array.from(document.getElementsByClassName("card"));
let musicName = document.getElementById("music-title");
let musicImage = document.getElementById("music-img");
let musicInfo = document.getElementById("music-info");
let shuffle = document.getElementById("remix");
let like = document.getElementById("like");
let initialTime = document.getElementById("cur-time");
let finalTime = document.getElementById("duration");
let musicIndex = 0;

// Array for songs list
let songs = [
  {
    songName: "Top Global",
    songAbout: "Your daily updates...",
    filePath: "/songs/Leke Prabhu Ka Naam.mp3",
    coverPath: "images/card1.jpeg",
  },
  {
    songName: "Mahiye Jinna So...",
    songAbout: "Darshan Raval",
    filePath: "/songs/Mahiye Jinna Sohna.mp3",
    coverPath: "images/card2.jpeg",
  },
  {
    songName: "Kalaastar",
    songAbout: "Honey Singh",
    filePath: "/songs/Kalaastar.mp3",
    coverPath: "images/card3.jpeg",
  },
  {
    songName: "Chaleya",
    songAbout: "Jawan",
    filePath: "/songs/Chaleya.mp3",
    coverPath: "images/card4.jpeg",
  },
  {
    songName: "Saari Duniya Ja...",
    songAbout: "Animal",
    filePath: "/songs/Saari Duniya Jala Denge.mp3",
    coverPath: "images/card5.jpeg",
  },
  {
    songName: "Arjan Vailly",
    songAbout: "Animal",
    filePath: "/songs/Arjan Vailly.mp3",
    coverPath: "images/card6.jpeg",
  },
  {
    songName: "Badass",
    songAbout: "Leo",
    filePath: "/songs/Badass Leo.mp3",
    coverPath: "images/card7.jpeg",
  },
  {
    songName: "Naa Ready",
    songAbout: "Leo",
    filePath: "/songs/Naa Ready.mp3",
    coverPath: "images/card8.jpeg",
  },
  {
    songName: "Best of Arijit Sin...",
    songAbout: "Bollywood essentials",
    filePath: "/songs/Heeriye.mp3",
    coverPath: "images/card9.png",
  },
  {
    songName: "This is Pritam",
    songAbout: "This is Pritam. The b...",
    filePath: "/songs/KHAIRIYAT.mp3",
    coverPath: "images/card10.png",
  },
  {
    songName: "Best of Honey Si...",
    songAbout: "This is Honey Singh",
    filePath: "/songs/Brown Rang.mp3",
    coverPath: "images/card11.jpeg",
  },
  {
    songName: "Top Songs - India",
    songAbout: "Phir aur kya chahiye",
    filePath: "/songs/Phir Aur Kya Chahiye.mp3",
    coverPath: "images/card12.jpeg",
  },
  {
    songName: "Top Songs- Global",
    songAbout: "Mocking Bird",
    filePath: "/songs/Mockingbird.mp3",
    coverPath: "images/card13.jpeg",
  },
];

function songUpdate() {
  audioelement.src = songs[songIndex].filePath;
  musicImage.src = songs[songIndex].coverPath;
  musicName.innerText = songs[songIndex].songName;
  musicInfo.innerText = songs[songIndex].songAbout;
  audioelement.currentTime = 0;
  audioelement.play();
  masterPlay.src = "/images/pause_icon.png";
}

// Accessing song name and info
songItem.forEach((element, i) => {
  element.getElementsByClassName("card-img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("card-title")[0].innerText = songs[i].songName;
  element.getElementsByClassName("card-info")[0].innerText = songs[i].songAbout;
});

// Handle Pause/Play
masterPlay.addEventListener("click", () => {
  if (audioelement.paused || audioelement.currentTime <= 0) {
    audioelement.play();
    masterPlay.src = "/images/pause_icon.png";
    let cardLoad = document.getElementById(musicIndex);
    cardLoad.src = "/images/pause_icon.png";
    cardLoad.classList.add("show");
  } else {
    audioelement.pause();
    masterPlay.src = "/images/play_icon.png";
    let cardLoad = document.getElementById(musicIndex);
    cardLoad.src = "/images/play_icon.png";
    cardLoad.classList.remove("show");
  }
});

// Listen to Events

audioelement.addEventListener("timeupdate", () => {
  // Update Seek Bar
  progress = parseInt((audioelement.currentTime / audioelement.duration) * 100);
  progressBar.value = progress;

  // Update duration
  totalMin = Math.floor(audioelement.duration / 60);
  totalSec = Math.floor(audioelement.duration % 60);
  function digit(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }
  document.getElementById("min").innerText = totalMin;
  document.getElementById("sec").innerText = digit(totalSec);

  // Update Time
  curMin = Math.floor(audioelement.currentTime / 60);
  curSec = Math.floor(audioelement.currentTime % 60);
  document.getElementById("c-min").innerText = curMin;
  document.getElementById("c-sec").innerText = digit(curSec);
});

// Sync song to seek bar
progressBar.addEventListener("change", () => {
  audioelement.currentTime = (progressBar.value * audioelement.duration) / 100;
});

// Make all pause to play icons
const makeAllPlays = () => {
  Array.from(cardPlay).forEach((element) => {
    element.src = "/images/play_musicbar.png";
    element.classList.remove("show");
  });
};

// Play selected song
Array.from(cardPlay).forEach((element, index) => {
  element.addEventListener("click", (e) => {
    if (!audioelement.paused && musicIndex === index) {
      audioelement.pause();
      element.src = "images/play_icon.png";
      masterPlay.src = "/images/play_icon.png";
      element.classList.remove("show");
    } else {
      makeAllPlays();
      // songIndex = parseInt(e.target.id); // alternate
      songIndex = index;
      element.src = "images/pause_icon.png";
      songUpdate();
      element.classList.add("show");
      musicIndex = index;
    }
  });
});

// Play Next
document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 12) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  songUpdate();
});

// Play Previous
document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 12;
  } else {
    songIndex -= 1;
  }
  songUpdate();
});

// Play next after ending
audioelement.addEventListener("ended", () => {
  if (songIndex >= 12) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  songUpdate();
});

// Shuffle - Random Play
shuffle.addEventListener("click", () => {
  random = Math.floor(Math.random() * 13);
  songIndex = random;
  songUpdate();
});

// Like the song
like.addEventListener("click", () => {
  if (like.classList[2] == "fa-solid") {
    like.classList.remove("fa-solid");
    like.classList.add("fa-regular");
    alert("Removed from Favourite Songs!");
  } else {
    like.classList.remove("fa-regular");
    like.classList.add("fa-solid");
    alert("Added to Favourite Songs!");
  }
});
