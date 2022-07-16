let audio = document.querySelector(".audio"),
  surahsContainer = document.querySelector(".surahs"),
  ayahAr = document.querySelector(".ayah-ar"),
  ayahEn = document.querySelector(".ayah-en"),
  surahName = document.querySelector("surah-name");

/* ---------------  Start loadT rack --------------- */

getData();dfc
function getData() {
  fetch("https://api.quran.sutanlab.id/surah")
    .then((response) => response.json())
    .then((data) => {
      for (let surah in data.data) {
        surahsContainer.innerHTML += `
        <div>
        <p>${data.data[surah].name.long}</p>
        <p>${data.data[surah].name.transliteration.en}</p>
        </div>
        `;
      }
      let allSurahs = document.querySelectorAll(".surahs div"),
        ayahsAudios,
        ayahsTextAra,
        ayahsTextEn;
      allSurahs.forEach((surah, index) => {
        surah.addEventListener("click", () => {
          fetch(`https://api.quran.sutanlab.id/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              let verses = data.data.verses;
              ayahsAudios = [];
              ayahsTextAra = [];
              ayahsTextEn = [];
              verses.forEach((verse) => {
                ayahsAudios.push(verse.audio.primary);
                ayahsTextAra.push(verse.text.arab);
                ayahsTextEn.push(verse.text.transliteration.en);
              });

              let ayahIndex = 0;
              changeAyah(ayahIndex);
              audio.addEventListener("ended", () => {
                ayahIndex++;
                if (ayahIndex < ayahsAudios.length) {
                  changeAyah(ayahIndex);
                } else {
                  ayahIndex = 0;
                  changeAyah(ayahIndex);
                  audio.pause();
                }
              });

              function changeAyah(index) {
                audio.src = ayahsAudios[index];
                ayahAr.innerHTML = ayahsTextAra[index];
                ayahEn.innerHTML = ayahsTextEn[index];
                audio.play();
              }
            });
        });
      });
    });
}
