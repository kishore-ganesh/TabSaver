$("#save").click(() => {
  saveToMemory();
});

$("#load").click(() => {
  loadFromMemory();
});
$("#open").click(() => {
  openFromMemory();
});

$("#clear").click(()=>{
  clearMemory();
})

$("#loadselected").click(()=>{

  $(".check").each((i,box)=>{
    //console.log(this);
    console.log(box);
    if($(box).prop('checked')){
      console.log($(box).parent().find("span"));
      
      browser.tabs.create({
        url: $(box).parent().find("span").html(),
        active: false
      })
    }
  })
  


})

function saveToMemory() {
  browser.tabs.query({ currentWindow: true }).then(tabs => {
    urlsList = [];
    tabs.forEach(tab => {
      if (tab.url != "about:newtab"&&tab.url!="about:blank") {
        urlsList.push(tab.url);
      }
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
  //  list = document.getElementById("urllist");
  list = $("#urllist");
  list.html("");
  urlsList.forEach(listitem => {
    list.append(
      $("<li>", {
        class: "urllistitem"
      }).html("<span>"+listitem+"</span>").append(
        $("<input>", {
          type: "checkbox",
          class: "check"
        })
      )
    );
  });
}

function loadFromMemory() {
  return new Promise((resolve, reject) => {
    browser.storage.local.get("urlsList").then(urlsList => {
      //console.log(urlsList);
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

function clearMemory() {
  browser.storage.local.clear();

}
