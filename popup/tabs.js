$("#save").click(() => {
  saveToMemory();
});

$("#load").click(() => {
  loadFromMemory();
});
$("#open").click(() => {
  openFromMemory();
});

function saveToMemory() {
  browser.tabs.query({ currentWindow: true }).then(tabs => {
    urlsList = [];
    tabs.forEach(tab => {
      urlsList.push(tab.url);
    });

    browser.storage.local.set({ urlsList }).then(err => {
      if (err) {
        console.log(err);
      }

      console.log("Saved");
    });
    console.log(tabs);
  });
}

function display(urlsList) {
  list = document.getElementById("urllist");
  urlsList.forEach(listitem => {
    item = document.createElement("li");
    item.innerHTML = listitem;
    list.appendChild(item);
  });
}

function loadFromMemory() {
  return new Promise((resolve, reject) => {
    browser.storage.local.get("urlsList").then(urlsList => {
      console.log(urlsList);
      display(urlsList.urlsList);
      resolve(urlsList.urlsList);
    });
  });
}

function openFromMemory() {
  loadFromMemory().then(urlsList => {
    urlsList.forEach(url => {
      browser.tabs.create({
        url: url,
        active: false
      });
    });
  });
}
