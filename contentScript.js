var parsed_model = JSON.parse(atob(model))
var parser = new DOMParser();

const buttonCheckboxMapping = {
  age18checkbox: {
    labelId: "age18checkboxlabel",
    label: "Age 18+",
    checked: false
  },
  age45checkbox: {
    labelId: "age45checkboxlabel",
    label: "Age 45+",
    checked: false
  },
  covishieldcheckbox: {
    labelId: "covishieldcheckboxlabel",
    label: "Covishield",
    checked: false
  },
  covaxincheckbox: {
    labelId: "covaxincheckboxlabel",
    label: "Covaxin",
    checked: false
  },
  sputnikcheckbox: {
    labelId: "sputnikcheckboxlabel",
    label: "Sputnik V",
    checked: false
  },
  freecheckbox: {
    labelId: "freecheckboxlabel",
    label: "Free",
    checked: false
  },
  paidcheckbox: {
    labelId: "paidcheckboxlabel",
    label: "Paid",
    checked: false
  }
}

let mobilenumber = window.localStorage.getItem("mobile");
let state_name = window.localStorage.getItem("state");
let district_name = window.localStorage.getItem("district");
let first_5_pin_digits = window.localStorage.getItem("pincode");
let allow_multiple = window.localStorage.getItem("allow_multiple") === "true" ? true : false;
let searchByDistrictFlag = window.localStorage.getItem("searchpref") === "district" ? true : false;
let keeptryingcontinuously = window.localStorage.getItem("keeptryingcontinuously") === "true" ? true : false;
let timeslotind = window.localStorage.getItem("timeslot");
let enableAutoRefresh = window.localStorage.getItem("autorefresh") === "true" ? true : false;
let enableautoconfirm = window.localStorage.getItem("autoconfirm") === "true" ? true : false;
let minavailability = window.localStorage.getItem("minavailability");
let selected_button_checkbox = window.localStorage.getItem("selectedbuttoncheckboxes")
let center_prefs_string = window.localStorage.getItem("centerprefs");
let center_prefs_dirty = center_prefs_string ? center_prefs_string.split(",") : "";
let autorefreshinterval = window.localStorage.getItem("autorefreshinterval");
let skipdays = window.localStorage.getItem("skipdays");

const sleep = (delay) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, delay);
  })
}

if (isNaN(parseInt(skipdays))) {
  skipdays = 0;
} else {
  skipdays = parseInt(skipdays);
}
let center_prefs = [];
for (let i = 0; i < center_prefs_dirty.length; i++) {
  let t = center_prefs_dirty[i].trim();
  if (t !== "") {
    center_prefs.push(t);
  }
}
if (center_prefs.length === 0) {
  center_prefs = [""];
}

let checked_buttons = [];

const setCheckedButtons = (selected_button_checkbox) => {
  checked_buttons = [];
  for (let i = 0; i < selected_button_checkbox.length; i++) {
    if (buttonCheckboxMapping[selected_button_checkbox[i]]) {
      buttonCheckboxMapping[selected_button_checkbox[i]].checked = true;
      checked_buttons.push(buttonCheckboxMapping[selected_button_checkbox[i]].label)
    }
  }
}

try {
  selected_button_checkbox = JSON.parse(selected_button_checkbox)
  setCheckedButtons(selected_button_checkbox)
} catch (error) {
  console.log('There was an error setting the filter checkboxes')
}

const alreadySetIntervalsForEnableRefresh = [];

let booking_lower_lim = 1;
booking_lower_lim = parseInt(minavailability);
if (isNaN(booking_lower_lim)) {
  booking_lower_lim = 1;
}

refresh_interval = parseInt(autorefreshinterval);
if (isNaN(refresh_interval)) refresh_interval = 15;

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

  var svg = parser.parseFromString(atob($("img#captchaImage").attr("src").split("base64,")[1]), "image/svg+xml");
  $(svg).find('path').each((_, p) => { if ($(p).attr('stroke') != undefined) $(p).remove() })
  vals = []
  $(svg).find('path').each(
    (_, p) => {
      idx = parseInt($(p).attr("d").split(".")[0].replace("M", ""))
      vals.push(idx)
    }
  )
  var sorted = [...vals].sort(function (a, b) { return a - b; })
  var solution = ['', '', '', '', '']

  $(svg).find('path').each(
    (idx, p) => {
      var pattern = $(p).attr('d').replace(/[\d\.\s]/g, "")

      solution[sorted.indexOf(vals[idx])] = parsed_model[pattern]
    })

  $($(".captcha-style input")[0]).focus();

  for (var ii = 0; ii < 5; ii++) {
    $($(".captcha-style input")[0]).val(solution.join("").substr(0, ii + 1));

    $(".captcha-style input")[0].dispatchEvent(new Event("keyup", { bubbles: true }));

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
      $("[formcontrolname=mobile_number]")[0].dispatchEvent(new Event("input", { bubbles: true }));
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

  // waitForEl(".register-btn", () => {
  //   if(!!!allow_multiple) $('.register-btn').trigger('click');
  // })

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
        $("[formcontrolname=pincode]")[0].dispatchEvent(new Event("input", { bubbles: true }));
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
      if (searchByDistrict && state_name.trim() !== "" && district_name.trim() !== "") {
        $("[formcontrolname=state_id]").trigger('click');
        $(`span:contains(${state_name})`).trigger('click');
        await sleep(500)
        $("[formcontrolname=district_id]").trigger('click');
        $("span").filter((ind, spn) => spn.innerText === district_name).trigger("click");
        $('.pin-search-btn').trigger('click');
        dispatchClicksAndBook();
      } else {
        $("[formcontrolname=pincode]").val(first_5_pin_digits);
        $("[formcontrolname=pincode]").on('input', (e) => {
          if (e.target.value.length === 6) {
            $('.pin-search-btn').trigger('click');
            dispatchClicksAndBook();
          }
        })

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
  } else {
  }
}, 100);


const keep_focusing = () => {

  setInterval(() => {
    focus_ids.forEach(element => {

      if ($("#formWrapper").is(":hidden")) if ($(element).length !== 0) $(element).focus();
    });

  }, 1000);
}


keep_focusing();

const createInput = (id, style, type, value, className) => {
  let retel = document.createElement("input");
  retel.id = id;
  retel.type = type;
  retel.style = style;
  retel.value = value;
  retel.className = className
  return retel;
}

const createLabel = (id, forid, labelText, style, className = "form-label") => {
  let retel = document.createElement("label");
  retel.id = id;
  retel.setAttribute("for", forid);
  retel.appendChild(document.createTextNode(labelText));
  retel.style = style;
  retel.className = className
  return retel;
}

const createWarningText = (warningtext, style) => {
  let retel = document.createElement('div');
  retel.className = "form-text"
  retel.appendChild(document.createTextNode(warningtext));
  retel.style = style;
  return retel;
}

const createSelectInput = (id, style, value) => {
  let retel = document.createElement("select");
  retel.style = style;
  retel.id = id;
  retel.value = value;
  retel.className = 'form-select';
  return retel;
}

const createSelectOptions = (id, text, value, selected) => {
  let retel = document.createElement("option");
  retel.id = id;
  retel.value = value;
  retel.appendChild(document.createTextNode(text));
  if (selected) retel.selected = true;
  return retel;
}

const createHrSeparator = () => {
  let retel = document.createElement("hr");
  retel.style = "background-color: black";
  return retel;
}
const createForm = () => {

  // basic styles : reused
  let textLabelStyles = "color: black";
  let warnLabelStyles = "color: red";

  // parent div for form
  let wrapperDiv = document.createElement("div");
  wrapperDiv.id = "formWrapper";

  // mobile number input field
  let mobileinputid = "data-mob";
  let mobileInput = createInput(mobileinputid, "", "number", mobilenumber, 'form-control');
  let mobileLabel = createLabel("mobileinputlabel", mobileinputid, "Mobile number", textLabelStyles);
  let mobileNumberWarn = createWarningText(
    "You will have to enter the 10th digit in the actual website form to proceed with automation.",
    warnLabelStyles
  )

  // pin code field
  let pincodeinputid = "pincodeinput";
  let pincodeinput = createInput(pincodeinputid, "", "number", first_5_pin_digits, 'form-control');
  let pincodelabel = createLabel("pincodeinputlabel", pincodeinputid, "PIN Code", textLabelStyles);
  let pincodewarn = createWarningText("You will have to enter the 6th digit in the actual website form manually to proceed with automation.", warnLabelStyles);

  let autorefreshintervalid = "autorefreshintervalinput";
  let autorefreshintervalinput = createInput(autorefreshintervalid, "", "number", autorefreshinterval, 'form-control');
  let autorefreshintervallabel = createLabel("autorefreshintervallabel", autorefreshintervalid, "Refresh interval (seconds)", textLabelStyles);
  let autorefreshintervalinputwarn = createWarningText("Setting this value to a very low number may cause too many refreshes in short time span leading to 'Something Went Wrong Errors'. Default = 15", warnLabelStyles);
  autorefreshintervalinput.min = 1;


  let centerprefinputid = "centerprefinput";
  let centerprefinput = createInput(centerprefinputid, "", "text", center_prefs_string, 'form-control');
  let centerprefinputlabel = createLabel("centerprefinputlabel", centerprefinputid, "Comma separated center preferences: ", textLabelStyles);
  let centerprefinputwarn = createWarningText("Only those centers will be considered for booking, which have at least one of the comma separated words given in this box, in their names or addresses (case insensitive)", warnLabelStyles);

  // state name input field
  let stateinputid = "data-state";
  let stateInput = createInput(stateinputid, "", "text", state_name, 'form-control');
  let stateLabel = createLabel("stateinputlabel", stateinputid, "Name of the state: ", textLabelStyles)

  // district name input field
  let districtinputid = "data-district";
  let districInput = createInput(districtinputid, "", "text", district_name, 'form-control');
  let districLabel = createLabel("districtinputlabel", districtinputid, "District name: ", textLabelStyles);

  // multiple members allow checkbox
  // let allowMultipleid = "allowMultiple";
  // let allowMultipleInput = createInput(allowMultipleid, "", "checkbox", "");
  // allowMultipleInput.checked = allow_multiple;
  // let allowMultipleInputLabel = createLabel("multipleinputlabel", allowMultipleid, "Allow multiple members ", textLabelStyles);
  // let allowMultipleWarn = createWarningText("This will prevent automatic click on the Schedule Now button", warnLabelStyles);

  let continuousretryid = "continuousretry";
  let continuousretryinput = createInput(continuousretryid, "", "checkbox", "", 'form-check-input');
  continuousretryinput.checked = keeptryingcontinuously;
  let continuousretrylabel = createLabel("continuousretrylabel", continuousretryid, "Attempt to book automatically ", textLabelStyles);
  let continuousretryWarn = createWarningText("First available slot in the centers which satisfy the center preference will be selected automatically. Captcha will be filled ONLY if this is selected.", warnLabelStyles);

  let enableautorefreshid = "enableautorefresh";
  let enableautorefreshinput = createInput(enableautorefreshid, "", "checkbox", "", 'form-check-input');
  enableautorefreshinput.checked = enableAutoRefresh;
  let enableautorefreshlabel = createLabel("enableautorefreshlabel", enableautorefreshid, "Enable Auto Refresh ", textLabelStyles);
  let enableautorefreshWarn = createWarningText("Keep refreshing the search results at an interval input in 'Refresh Interval' till a slot is found.", warnLabelStyles);

  let enableautoconfirmid = "enableautoconfirm";
  let enableautoconfirminput = createInput(enableautoconfirmid, "", "checkbox", "", 'form-check-input');
  enableautoconfirminput.checked = enableautoconfirm;
  let enableautoconfirmlabel = createLabel("enableautoconfirmlabel", enableautoconfirmid, "Confirm booking automatically on captcha page ", textLabelStyles);
  let enableautoconfirmWarn = createWarningText("With this selected, you will NOT have to press Confirm button after captcha gets entered automatically.", warnLabelStyles);


  let timeslotinputid = "timeslotinput";
  let timeSlotSelector = createSelectInput(timeslotinputid, "", timeslotind)
  let one = createSelectOptions("timeSlot-1", "Slot 1: 9:00 am to 11:00 am", '1', timeslotind === '1')
  let two = createSelectOptions("timeSlot-2", "Slot 2: 11:00 am to 1:00 pm", '2', timeslotind === '2')
  let three = createSelectOptions("timeSlot-3", "Slot 3: 1:00 pm to 3:00 pm", '3', timeslotind === '3')
  let four = createSelectOptions("timeSlot-4", "Slot 4: 3:00 pm to 5:00 pm", '4', timeslotind === '4')
  timeSlotSelector.appendChild(one)
  timeSlotSelector.appendChild(two)
  timeSlotSelector.appendChild(three)
  timeSlotSelector.appendChild(four)
  let timeslotlabel = createLabel("timeslotinputlabel", timeslotinputid, "Enter time slot preference: ", textLabelStyles);
  let timeslotwarn = createWarningText("If the preferred slot is not available, first slot will be selected automatically.", warnLabelStyles);

  let minavailabilityinputid = "minavailabilityinput";
  let minavailabilityinput = createInput(minavailabilityinputid, "", "number", minavailability, 'form-control');
  let minavailabilityinputlabel = createLabel("minavailabilityinputlabel", minavailabilityinputid, "Select only if number of available slots is more than: ", textLabelStyles);
  let minavailabilityinputwarn = createWarningText("Write a number here. If you leave this empty, any center with min 1 available can be selected.", warnLabelStyles);

  let skipdaysinputid = "skipdaysinput";
  let skipdaysinput = createInput(skipdaysinputid, "", "number", skipdays, 'form-control');
  let skipdaysinputlabel = createLabel("skipdaysinputlabel", skipdaysinputid, "Skip days", textLabelStyles);
  let skipdaysinputwarn = createWarningText("0 skip days means search slots starting today. 1 skip days means search slots from tomorrow. Leave this empty to search slots including today.", warnLabelStyles);
  skipdaysinput.min = 0;
  skipdaysinput.max = 5;

  // search preferrance
  let searchprefid = "searchpref";
  let searchPrefSelector = createSelectInput(searchprefid, "", searchByDistrictFlag ? "district" : "pincode");
  let districtoption = createSelectOptions("districtoption", "District", "district", searchByDistrictFlag);
  let pincodeoption = createSelectOptions("pincodeoption", "PIN code", "pincode", !!!searchByDistrictFlag);
  searchPrefSelector.appendChild(districtoption);
  searchPrefSelector.appendChild(pincodeoption);
  let searchPrefLabel = createLabel("searchpreflabel", searchprefid, "Search by: ", textLabelStyles);

  let buttonCheckBoxes = []
  for (const key in buttonCheckboxMapping) {
    //wrapInDivWithClassName([wrapInDivWithClassName([age18CheckboxButton, age18CheckboxLabel], 'form-check')], 'col')
    let button = createInput(key, "", "checkbox", "", "form-check-input");
    button.checked = buttonCheckboxMapping[key].checked;
    let label = createLabel(buttonCheckboxMapping[key].labelId, key, buttonCheckboxMapping[key].label, textLabelStyles, "form-check-label")
    buttonCheckBoxes.push(wrapInDivWithClassName([wrapInDivWithClassName([button, label], 'form-check')], 'col'))
  }
  let buttonCheckboxLabel = createLabel("", "", "Select Filters", textLabelStyles)

  // add components to wrapper div

  wrapperDiv.appendChild(wrapInDivWithClassName(
    [
      wrapInDivWithClassName([mobileLabel, mobileInput], "col"),
      wrapInDivWithClassName([pincodelabel, pincodeinput], "col")
    ], 'row mb-3'))

  wrapperDiv.appendChild(wrapInDivWithClassName(
    [
      wrapInDivWithClassName([stateLabel, stateInput], 'col'),
      wrapInDivWithClassName([districLabel, districInput], 'col')
    ], 'row mb-3'))

  wrapperDiv.appendChild(wrapInDivWithClassName(
    [
      wrapInDivWithClassName([timeslotlabel, timeSlotSelector, timeslotwarn], "col"),
      wrapInDivWithClassName([searchPrefLabel, searchPrefSelector], 'col'),
      wrapInDivWithClassName([autorefreshintervallabel, autorefreshintervalinput, autorefreshintervalinputwarn], 'col')
    ], 'row mb-3'))

  wrapperDiv.appendChild(wrapInDivWithClassName(
    [
      wrapInDivWithClassName([centerprefinputlabel, centerprefinput, centerprefinputwarn], "col"),
      wrapInDivWithClassName([minavailabilityinputlabel, minavailabilityinput, minavailabilityinputwarn], "col"),
      wrapInDivWithClassName([skipdaysinputlabel, skipdaysinput, skipdaysinputwarn], "col")
    ], 'row mb-3'))

  wrapperDiv.appendChild(wrapInDivWithClassName([buttonCheckboxLabel].concat(buttonCheckBoxes), 'row mb-3'))

  wrapperDiv.appendChild(wrapInDivWithClassName(
    [
      wrapInDivWithClassName([wrapInDivWithClassName([continuousretryinput, continuousretrylabel, continuousretryWarn], 'form-check')], "col"),
      wrapInDivWithClassName([wrapInDivWithClassName([enableautorefreshinput, enableautorefreshlabel, enableautorefreshWarn], 'form-check')], "col"),
      wrapInDivWithClassName([wrapInDivWithClassName([enableautoconfirminput, enableautoconfirmlabel, enableautoconfirmWarn], 'form-check')], "col")
    ], 'row mb-3'))

  // wrapperDiv.appendChild(allowMultipleInputLabel);
  // wrapperDiv.appendChild(allowMultipleInput);
  // wrapperDiv.appendChild(document.createElement('br'));
  // wrapperDiv.appendChild(allowMultipleWarn);
  // wrapperDiv.appendChild(createHrSeparator());

  // add form
  document.getElementById('form-modal-body').appendChild(wrapperDiv)
}

const wrapInDivWithClassName = (children, className) => {
  let divWrapper = document.createElement('div')
  divWrapper.className = className;
  for (var i = 0; i < children.length; i++) divWrapper.appendChild(children[i])
  return divWrapper;
}

const createHideShowButton = () => {
  $("#formWrapper").hide();
  let formShowHide = document.createElement("button");
  formShowHide.id = "formshowhidebutton";
  formShowHide.appendChild(document.createTextNode("click to edit the autofill inputs"));
  formShowHide.style = "background: red; position: sticky; top:0; left: 0; font-size: 32px; border-radius: 20px;";
  document.body.appendChild(formShowHide);
  $('#formshowhidebutton').on('click', () => {
    $("#formWrapper").toggle();
  })
}

const bindSubmitButtonToSaveInfo = () => {
  let submitbtn = document.getElementById("data-submit");
  submitbtn.addEventListener("click", () => {
    mobilenumber = document.getElementById("data-mob").value;
    state_name = document.getElementById("data-state").value;
    district_name = document.getElementById("data-district").value;
    // allow_multiple = document.getElementById("allowMultiple").checked;
    keeptryingcontinuously = document.getElementById("continuousretry").checked;
    enableAutoRefresh = document.getElementById("enableautorefresh").checked;
    enableautoconfirm = document.getElementById("enableautoconfirm").checked;
    let searchPreftext = document.getElementById("searchpref").value;
    first_5_pin_digits = document.getElementById("pincodeinput").value;
    timeslotind = document.getElementById("timeslotinput").value;
    center_prefs_string = document.getElementById("centerprefinput").value;
    minavailability = document.getElementById("minavailabilityinput").value;
    autorefreshinterval = document.getElementById("autorefreshintervalinput").value;
    skipdays = document.getElementById("skipdaysinput").value;
    selected_button_checkbox = []
    for (const key in buttonCheckboxMapping) {
      let button_checkbox = document.getElementById(key);
      buttonCheckboxMapping[key].checked = button_checkbox.checked;
      if (button_checkbox.checked) {
        selected_button_checkbox.push(key)
      }
    }
    window.localStorage.setItem("mobile", mobilenumber);
    window.localStorage.setItem("state", state_name);
    window.localStorage.setItem("district", district_name);
    // window.localStorage.setItem("allow_multiple", allow_multiple);
    window.localStorage.setItem("keeptryingcontinuously", keeptryingcontinuously);
    window.localStorage.setItem("autorefresh", enableAutoRefresh);
    window.localStorage.setItem("searchpref", searchPreftext);
    window.localStorage.setItem("pincode", first_5_pin_digits);
    window.localStorage.setItem("timeslot", timeslotind);
    window.localStorage.setItem("centerprefs", center_prefs_string);
    window.localStorage.setItem("minavailability", minavailability);
    window.localStorage.setItem("autoconfirm", enableautoconfirm);
    window.localStorage.setItem("selectedbuttoncheckboxes", JSON.stringify(selected_button_checkbox))
    window.localStorage.setItem("autorefreshinterval", autorefreshinterval);
    window.localStorage.setItem("skipdays", skipdays);
    window.location.reload();
  })
}

const createModal = () => {
  let wrapperDiv = document.createElement("div");
  wrapperDiv.className = "modal fade";
  wrapperDiv.id = 'form-modal'
  let modal = `
  <div class="modal-dialog modal-dialog-centered modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        
        <div clsss="row">
          <div class="col">
            <h5 class="modal-title">Autofill Input Form</h5>
            <span style="font-size: xx-small;">BY USING THIS CHROME EXTENSION TO BOOK VACCINE SLOTS YOU AGREE TO THE <a href="https://github.com/sushrut111/cowin-automation-extn/wiki/Terms-of-use" target="_blank">TERMS OF SERVICE MENTIONED ON THIS PAGE (Click to view)</a></span>
          </div>
          
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div class="modal-body" id="form-modal-body">
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" id="data-submit" data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
  `
  wrapperDiv.innerHTML = modal;

  document.body.appendChild(wrapperDiv);
}

const createModalHideShowButton = () => {
  let wrapperDiv = document.createElement("div");
  let button = `
  <button type="button" class="btn btn-danger btn-lg" style="position:absolute; top:2%; left: 2%;" data-bs-toggle="modal" data-bs-target="#form-modal"><span class="row"><span id="cb-btn-title">Edit Auto Fill Inputs</span><span id="cb-timer"></span></span></button>`
  wrapperDiv.innerHTML = button;
  document.body.appendChild(wrapperDiv);
}


const createFormAndOthers = () => {
  createModal();
  createModalHideShowButton();
  createForm();
  bindSubmitButtonToSaveInfo();
}

createFormAndOthers();
