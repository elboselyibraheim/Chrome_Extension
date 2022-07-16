chrome.runtime.onMessage.addListener(function (msg, sender, response) {
  if (mes.name === "get-settings") {
    const datastr = new Data().toISOString().slice(0, 10);
    const apiCall = "https://api.quran.sutanlab.id/surah";
    console.log(apiCall);

    fetch(apiCall).then(function (res) {
      if (res.status !== 200) {
        response({
          surahsContainer: "error",
          ayahAr: "error",
          ayahEn: "error",
        });
        return;
      }
      res
        .json()
        .then(function (data) {
          response({
            surahsContainer: "error",
            ayahAr: "error",
            ayahEn: "error",
          });
        })
        .catch(function (err) {
          response({
            surahsContainer: "error",
            ayahAr: "error",
            ayahEn: "error",
          });
        });
    });
  }
  return true;
});
