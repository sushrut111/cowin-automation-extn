/*
MIT License

Copyright (c) 2021 Sushrut Kasture

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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
let pincode = window.localStorage.getItem("pincode");
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

let booking_lower_lim = 1;
booking_lower_lim = parseInt(minavailability);
if (isNaN(booking_lower_lim)) {
    booking_lower_lim = 1;
}

refresh_interval = parseInt(autorefreshinterval);
if (isNaN(refresh_interval)) refresh_interval = 15;

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
    let pincodeinput = createInput(pincodeinputid, "", "number", pincode, 'form-control');
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

    let continuousretryid = "continuousretry";
    let continuousretryinput = createInput(continuousretryid, "", "checkbox", "", 'form-check-input');
    continuousretryinput.checked = keeptryingcontinuously;
    let continuousretrylabel = createLabel("continuousretrylabel", continuousretryid, "Attempt to book automatically ", textLabelStyles);
    let continuousretryWarn = createWarningText("First available slot in the centers which satisfy the center preference will be selected automatically.", warnLabelStyles);

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
        keeptryingcontinuously = document.getElementById("continuousretry").checked;
        enableAutoRefresh = document.getElementById("enableautorefresh").checked;
        enableautoconfirm = document.getElementById("enableautoconfirm").checked;
        let searchPreftext = document.getElementById("searchpref").value;
        pincode = document.getElementById("pincodeinput").value;
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
        window.localStorage.setItem("keeptryingcontinuously", keeptryingcontinuously);
        window.localStorage.setItem("autorefresh", enableAutoRefresh);
        window.localStorage.setItem("searchpref", searchPreftext);
        window.localStorage.setItem("pincode", pincode);
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