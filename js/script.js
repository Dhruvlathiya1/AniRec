let rec = document.getElementById("rec");
let head = document.getElementById("head");
let poster = document.getElementById("poster");
let title = document.getElementById("title");
let japtitle = document.getElementById("japtitle");
let engtitle = document.getElementById("engtitle");
let ratings = document.getElementById("ratings");
let Episodes = document.getElementById("Episodes");
let Synopsis = document.getElementById("Synopsis");
let genre = document.getElementById("genre");
let Studios = document.getElementById("Studios");
let watch = document.getElementById("watch");
let yt = document.getElementById("yt");
let trailer = document.getElementById("trailer");

head.classList.add("d-none");

const url = "https://api.jikan.moe/v4/random/anime";

async function getanime() {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch data", error);
  }
}

async function getinformation() {
  let animedata = await getanime();
  if (animedata) {
   
    title.textContent = animedata.data.title;

    if (animedata.data.title_japanese == null) {
      japtitle.textContent = "japanese title not available";
    } else {
      japtitle.textContent = animedata.data.title_japanese;
    }

    if (animedata.data.title_english == null) {
      engtitle.textContent = "English title not available";
    } else {
      engtitle.textContent = animedata.data.title_english;
    }

    if (animedata.data.score == null) {
      ratings.textContent = "Rating not available";
    } else {
      ratings.textContent = animedata.data.score;
    }

    if (animedata.data.episodes == null) {
      Episodes.textContent = "Episodes no not available";
    } else {
      Episodes.textContent = animedata.data.episodes;
    }

    if (animedata.data.synopsis == null) {
      Synopsis.textContent = "synopsis not available ";
    } else {
      Synopsis.textContent = animedata.data.synopsis;
    }

    if (animedata.data.genres.length === 0) {
      genre.textContent = "Genre not available";
    } else {
      genre.textContent = animedata.data.genres
        .map((genre) => genre.name)
        .join(", ");
    }

    if (animedata.data.studios.length === 0) {
      Studios.textContent = "Studio not available";
    } else {
      Studios.textContent = animedata.data.studios
        .map((studio) => studio.name)
        .join(", ");
    }

    poster.src = animedata.data.images.jpg.large_image_url;
    watch.href = animedata.data.url;
    watch.target = "_blank";
    if (animedata.data.trailer.embed_url != null) {
      trailer.classList.remove("visually-hidden");
      yt.src = animedata.data.trailer.embed_url;
    } else {
      trailer.classList.add("visually-hidden");
    }
  }
}
watch.addEventListener("click", (event) => {
  if (!watch.href || watch.href === "") {
    event.preventDefault();
  }
});

rec.addEventListener("click", function () {
  event.preventDefault();
  head.classList.remove("d-none");

  getinformation();
});
