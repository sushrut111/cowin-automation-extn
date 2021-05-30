var parsed_model = JSON.parse(atob(model))
var parser = new DOMParser();

const alreadySetIntervalsForEnableRefresh = [];

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  })
}

var waitForEl = function (selector, callback) {
  if ($(selector).length) {
    callback();

  } else {
    setTimeout(function () {
      waitForEl(selector, callback);
    }, 100);
  }
};

const enterCaptcha = () => {

  let timeslots = $('.time-slot');
  let slotind = 0;
  if (timeslots.length === 0) return;
  if (timeslots.length === 4) {
    try {
      slotind = parseInt(timeslotind) - 1;
    } catch (e) {
      slotind = 0;
    }
  }
  if (isNaN(slotind)) {
    slotind = 0;
  }
  try {
    timeslots[slotind].click();
  } catch (e) {
    console.log("Requested timeslot is not available.");
  }

  //Reacaptcha Decode
  var svg = parser.parseFromString(atob($("img#captchaImage").attr("src").split("base64,")[1]), "image/svg+xml");
  $(svg).find('path').each((_, p) => {
    if ($(p).attr('stroke') != undefined) $(p).remove()
  })
  vals = []
  $(svg).find('path').each(
    (_, p) => {
      idx = parseInt($(p).attr("d").split(".")[0].replace("M", ""))
      vals.push(idx)
    }
  )
  var sorted = [...vals].sort(function (a, b) {
    return a - b;
  })
  var solution = ['', '', '', '', '']

  $(svg).find('path').each(
    (idx, p) => {
      var pattern = $(p).attr('d').replace(/[\d\.\s]/g, "")

      solution[sorted.indexOf(vals[idx])] = parsed_model[pattern]
    })

  $($(".captcha-style input")[0]).focus();

  for (var ii = 0; ii < 5; ii++) {
    $($(".captcha-style input")[0]).val(solution.join("").substr(0, ii + 1));

    $(".captcha-style input")[0].dispatchEvent(new Event("keyup", {
      bubbles: true
    }));

  }

  setTimeout(() => {
    if (enableautoconfirm) $("ion-button.confirm-btn")[0].click();
    waitForEl(".thank-you-header", () => {
      $.ajax({
        url: "https://api.countapi.xyz/hit/cowinbooking/booked4",
      });
    });
  }, 500);

}

const repFun = () => {

  waitForEl("[formcontrolname=mobile_number]", function () {
    $.ajax({
      url: "https://api.countapi.xyz/hit/cowinbooking/logins4",
    });
    $("[formcontrolname=mobile_number]").val(mobilenumber);
    setTimeout(() => {
      $("[formcontrolname=mobile_number]")[0].dispatchEvent(new Event("input", {
        bubbles: true
      }));
    }, 100);
    $("[formcontrolname=mobile_number]").on('input', (e) => {
      if (e.target.value.length === 10) {
        $('.login-btn').trigger('click');
      }
    })
  });

  waitForEl("[formcontrolname=otp]", function () {
    $("[formcontrolname=otp]").on('input', (e) => {
      if (e.target.value.length === 6) {
        $('.vac-btn').trigger('click');
      }
    })
  });

  const dispatchSelectorClick = async () => {
    await sleep(50);
    for (let index = 0; index < checked_buttons.length; index++) {
      const element = checked_buttons[index];
      await sleep(5);
      const id = $(`label:contains(${element}):not(.form-check-label)`).attr('for')
      if (!($(`#${id}`).prop('checked'))) {
        $(`label:contains(${element}):not(.form-check-label)`).trigger('click');
      }
    }
  }

  const findSlotsAndBook = () => {
    let foundslot = false;
    var slotRows = $("ul.slot-available-wrap")
    var centerNameRows = $("ion-col.main-slider-wrap");

    let centerTitles = $(centerNameRows).find(".center-name-title");
    let centerAddresses = $(centerNameRows).find(".center-name-text");

    for (let i = 0; i < slotRows.length; i++) {

      let center_text = centerTitles[i].innerText.trim() + " " + centerAddresses[i].innerText.trim();
      center_text = center_text.toLocaleLowerCase();
      let found_center_match = false;
      for (let jj = 0; jj < center_prefs.length; jj++) {
        if (center_text.includes(center_prefs[jj].toLocaleLowerCase())) found_center_match = true;
      }
      if (!found_center_match) {
        continue;
      }
      let slots = $(slotRows[i]).find("li a");
      for (let slotIter = skipdays; slotIter < slots.length; slotIter++) {
        let avail = parseInt(slots[slotIter].text.trim());
        if (avail >= booking_lower_lim) {
          slots[slotIter].click();
          foundslot = true;
          break;
        }
      }
      if (foundslot) {
        break;
      }
    }
  }

  const dispatchStateDistrictClick = () => {
    // checked = district
    // unchecked = pincode
    setTimeout(() => {
      if (searchByDistrictFlag) {
        if ($("[formcontrolname=searchType]")[0] && !!!$("[formcontrolname=searchType]")[0].checked)
          $("[formcontrolname=searchType]").trigger('click')
      } else {
        $("[formcontrolname=pincode]").val(first_5_pin_digits);
        $("[formcontrolname=pincode]")[0].dispatchEvent(new Event("input", {
          bubbles: true
        }));
      }
    }, 500);
  }

  const dispatchClicksAndBook = async () => {
    await dispatchSelectorClick();
    if (keeptryingcontinuously) setTimeout(findSlotsAndBook, 500);
  }

  waitForEl("[formcontrolname=searchType]", function () {
    dispatchStateDistrictClick();
    $("[formcontrolname=pincode]").on('input', (e) => {
      if (e.target.value.length === 6) {
        $('.pin-search-btn').trigger('click');
        dispatchClicksAndBook();
      }
    })

    $("[formcontrolname=searchType]").on('change', async () => {
      let searchByDistrict = $("[formcontrolname=searchType]")[0].checked;
      if (searchByDistrict) {
        if (state_name.trim() === "" || district_name.trim() === "") return;
        $("[formcontrolname=state_id]").trigger('click');
        $(`span:contains(${state_name})`).trigger('click');
        await sleep(500)
        $("[formcontrolname=district_id]").trigger('click');
        $("span").filter((ind, spn) => spn.innerText === district_name).trigger("click");
        $('.pin-search-btn').trigger('click');
        dispatchClicksAndBook();
      } else {
        $("[formcontrolname=pincode]").on('input', (e) => {
          if (e.target.value.length === 6) {
            $('.pin-search-btn').trigger('click');
            dispatchClicksAndBook();
          }
        })
        $("[formcontrolname=pincode]").val(first_5_pin_digits);
        $("[formcontrolname=pincode]")[0].dispatchEvent(new Event("input", {
          bubbles: true
        }));
      }

    })

    if (enableAutoRefresh) {
      while (alreadySetIntervalsForEnableRefresh.length > 0) {
        let interval = alreadySetIntervalsForEnableRefresh.pop();
        clearInterval(interval);
      }
      alreadySetIntervalsForEnableRefresh.push(
        setInterval(() => {
          if ($('.pin-search-btn').length !== 0) {
            $('.pin-search-btn').trigger('click');
            dispatchClicksAndBook();
          }
        }, refresh_interval * 1000)
      );
    }
  })

}

$(window).on("load", () => {
  repFun();
});

let focus_ids = ["[formcontrolname=otp]", "[formcontrolname=mobile_number]", "[formcontrolname=pincode]"];

var current_href = location.href;
setInterval(function () {
  if (current_href !== location.href) {
    if (location.href === "https://selfregistration.cowin.gov.in/" || location.href === "https://selfregistration.cowin.gov.in") window.location.reload();
    if (location.href === "https://selfregistration.cowin.gov.in/dashboard" || current_href === "https://selfregistration.cowin.gov.in/appointment") window.location.reload();
    while (alreadySetIntervalsForEnableRefresh.length > 0) {
      let interval = alreadySetIntervalsForEnableRefresh.pop();
      clearInterval(interval);
    }

    repFun();
    current_href = location.href;
  } else { }
}, 100);


const keep_focusing = () => {

  setInterval(() => {
    focus_ids.forEach(element => {

      if ($("#formWrapper").is(":hidden"))
        if ($(element).length !== 0) $(element).focus();
    });

  }, 1000);
}


keep_focusing();