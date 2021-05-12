let mobilenumber = window.localStorage.getItem("mobile");
let state_name = window.localStorage.getItem("state");
let district_name = window.localStorage.getItem("district");
let first_5_pin_digits = "";
let allow_multiple = window.localStorage.getItem("allow_multiple")==="true"?true:false;
let ageSelectorText = window.localStorage.getItem("age");
console.log(typeof(allow_multiple));

var waitForEl = function(selector, callback) {
  if ($(selector).length) {
    callback();
    
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};

var waitForElAgain = function(selector, callback) {
  if ($(selector).length) {
    callback();
    waitForElAgain(selector, callback);
  } else {
    setTimeout(function() {
      waitForEl(selector, callback);
    }, 100);
  }
};

const repFun = () => {
  waitForEl("[formcontrolname=mobile_number]", function() {
    $("[formcontrolname=mobile_number]").val(mobilenumber);
    $("[formcontrolname=mobile_number]").on('input', (e) => {
      if(e.target.value.length===10){
        $('.login-btn').trigger('click');
      }
    })
  });
  
  waitForEl("[formcontrolname=otp]", function() {
    $("[formcontrolname=otp]").on('input', (e) => {
      if(e.target.value.length===6){
        $('.vac-btn').trigger('click');
      }
    })
  });
  
  waitForEl(".register-btn", () => {
    if(!!!allow_multiple) $('.register-btn').trigger('click');
  })

  waitForEl("[formcontrolname=searchType]", function() {
    setTimeout(()=>$("[formcontrolname=searchType]").trigger('click'), 500);
    $("[formcontrolname=pincode]").on('input', (e) => {
      if(e.target.value.length===6){
        $('.pin-search-btn').trigger('click');
      }
    })
    
    $("[formcontrolname=searchType]").on('change', () => {
      let searchByDistrict = $("[formcontrolname=searchType]")[0].checked;
      if(searchByDistrict){
        $("[formcontrolname=state_id]").trigger('click');
        $(`span:contains(${state_name})`).trigger('click');
        setTimeout(()=>{
          $("[formcontrolname=district_id]").trigger('click');
          $(`span:contains(${district_name})`).trigger('click');
          setTimeout(()=>{
            $('.pin-search-btn').trigger('click');
          }, 500);
          setTimeout(()=>{
            $(`label:contains(${ageSelectorText})`).trigger('click');
          }, 500);
        }, 500);
      } else {
        $("[formcontrolname=pincode]").val(first_5_pin_digits);
        $("[formcontrolname=pincode]").on('input', (e) => {
          if(e.target.value.length===6){
            $('.pin-search-btn').trigger('click');
            setTimeout(()=>{
              $(`label:contains(${ageSelectorText})`).trigger('click');
            }, 500);
          }
        })
      
      }
  
    })
  })

}

$(window).on("load", () => {
  console.log("loaded");
  repFun();
});

let focus_ids = ["[formcontrolname=otp]", "[formcontrolname=mobile_number]", "[formcontrolname=pincode]"];

if (window.location.hash) {
  $(window).trigger('hashchange')
}
const parseJwt = (token) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const get_mins = (tm) => {
  let mins = Math.floor(tm/60);
  let secs = Math.floor(tm - mins * 60);
  return `${mins}:${secs}`
}

const expirationUpdate = () => {
  let token = window.sessionStorage["userToken"];
  if(token===undefined){
    return;
  }
  let parsed = parseJwt(token);
  if(!!!parsed){
    return;
  }
  let exp = parsed.exp;
  let curr = new Date();
  let expd = new Date(0);
  expd.setUTCSeconds(exp);
  document.title = get_mins((expd - curr)/1000);
}

setInterval(expirationUpdate, 5000);


var current_href = location.href;
setInterval(function(){
    if(current_href !== location.href){
        repFun();
        current_href = location.href;
    }else{
    }
},100);


const keep_focusing = () => {

  setInterval(()=>{
    focus_ids.forEach(element => {
      
      if($("#formWrapper").is(":hidden")) if($(element).length!==0) $(element).focus();
    });
    
  }, 1000);  
}


keep_focusing();

const createForm = () => {
  // basic styles : reused
  let textLabelStyles = "color: black;";
  let inputStyles = "color: black; background: white;";
  let warnLabelStyles = "color: red;";

  // parent div for form
  let wrapperDiv = document.createElement("div");
  wrapperDiv.id = "formWrapper";
  wrapperDiv.style = "position: fixed; background: white; top: 12.5%; width: 75%; left: 12.5%; border: 3px solid #73AD21;"

  // mobile number input field
  let mobileInput = document.createElement("input");
  mobileInput.style = inputStyles;
  mobileInput.id = "data-mob";
  mobileInput.type = "number";
  mobileInput.value = mobilenumber;

  let mobileLabel = document.createElement("p");
  mobileLabel.appendChild(document.createTextNode("Mobile number (first 9 digits): "));
  mobileLabel.style = textLabelStyles;

  let mobileNumberWarn = document.createElement('p');
  mobileNumberWarn.appendChild(document.createTextNode("You will have to enter the 10th digit in the input box to proceed with automation."));
  mobileNumberWarn.style = warnLabelStyles;

  // state name input field
  let stateInput = document.createElement("input");
  stateInput.style = inputStyles;
  stateInput.id = "data-state";
  stateInput.value = state_name;

  let stateLabel = document.createElement("p");
  stateLabel.appendChild(document.createTextNode("Name of the state: "));
  stateLabel.style = textLabelStyles;

  // district name input field
  let districInput = document.createElement("input");
  districInput.style = inputStyles;
  districInput.id = "data-district";
  districInput.value = district_name;

  let districLabel = document.createElement("p");
  districLabel.appendChild(document.createTextNode("District name: "));
  districLabel.style = textLabelStyles;

  let ageSelector = document.createElement("select");
  ageSelector.style = inputStyles;
  ageSelector.id = "ageselect";
  ageSelector.value = ageSelectorText;
  let age18 = document.createElement("option");
  age18.id = "age18";
  age18.value = "Age 18+";
  age18.appendChild(document.createTextNode("Age 18+"));
  let age45 = document.createElement("option");
  age45.id = "age45";
  age45.value = "Age 45+";
  age45.appendChild(document.createTextNode("Age 45+"));

  ageSelector.appendChild(age18);
  ageSelector.appendChild(age45);

  if(ageSelectorText === "Age 18+"){
    age18.selected = true;
  } else {
    age45.selected = true;
  }


  let AgeSelectLabel = document.createElement("span");
  AgeSelectLabel.appendChild(document.createTextNode("Age group: "));
  AgeSelectLabel.style = textLabelStyles;


  // multiple members allow checkbox
  let allowMultipleInput = document.createElement("input");
  allowMultipleInput.type = "checkbox";
  allowMultipleInput.id = "allowMultiple";
  allowMultipleInput.style = inputStyles;
  allowMultipleInput.checked = allow_multiple;

  let allowMultipleInputLabel = document.createElement('span');
  allowMultipleInputLabel.appendChild(document.createTextNode("Allow multiple members"));
  allowMultipleInputLabel.style = textLabelStyles;

  let allowMultipleWarn = document.createElement('p');
  allowMultipleWarn.appendChild(document.createTextNode("This will prevent automatic click on the Schedule Now button"));
  allowMultipleWarn.style = warnLabelStyles;

  // submit button
  let submitButton = document.createElement("button");
  submitButton.appendChild(document.createTextNode("Save inputs"));
  submitButton.id = "data-submit";
  submitButton.style = "color: black; background: #c2d6d6; font-size:20px; border-radius: 10px;"

  // cancel button
  let cancelbutton = document.createElement("button");
  cancelbutton.id = "cancelbutton";
  cancelbutton.appendChild(document.createTextNode("Cancel"));
  cancelbutton.style = "color: white; background: black; font-size:20px; border-radius: 10px;";

  // add components to wrapper div
  wrapperDiv.appendChild(mobileLabel);
  wrapperDiv.appendChild(mobileInput);
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(mobileNumberWarn);
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(stateLabel);
  wrapperDiv.appendChild(stateInput);
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(districLabel);
  wrapperDiv.appendChild(districInput);
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(AgeSelectLabel);
  wrapperDiv.appendChild(document.createTextNode( '\u00A0' ));
  wrapperDiv.appendChild(ageSelector);
  wrapperDiv.appendChild(document.createElement('br'));

  wrapperDiv.appendChild(allowMultipleInputLabel);
  wrapperDiv.appendChild(document.createTextNode( '\u00A0' ));
  wrapperDiv.appendChild(allowMultipleInput);
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(allowMultipleWarn);
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(submitButton);
  wrapperDiv.appendChild(cancelbutton)
  wrapperDiv.appendChild(document.createElement('br'));
  wrapperDiv.appendChild(document.createElement('br'));

  // add form
  document.body.appendChild(wrapperDiv);
}

const createHideShowButton = () => {
  $("#formWrapper").hide();
  let formShowHide = document.createElement("button");
  formShowHide.id = "formshowhidebutton";
  formShowHide.appendChild(document.createTextNode("click to edit the autofill inputs"));
  formShowHide.style = "background: red; position: sticky; top:0; left: 0; font-size: 32px; border-radius: 20px;";
  document.body.appendChild(formShowHide);
  $('#formshowhidebutton').on('click', ()=>{
    $("#formWrapper").toggle();
  })
}

const bindSubmitButtonToSaveInfo = () => {
  let submitbtn = document.getElementById("data-submit");
  let cancelbutton = document.getElementById("cancelbutton");
  cancelbutton.addEventListener("click", () => {
    $("#formWrapper").toggle();
  });
  submitbtn.addEventListener("click", () => {
    mobilenumber = document.getElementById("data-mob").value;
    state_name = document.getElementById("data-state").value;
    district_name = document.getElementById("data-district").value;
    allow_multiple = document.getElementById("allowMultiple").checked;
    ageSelectorText = document.getElementById("ageselect").value;
    console.log(allow_multiple);
    $("#formWrapper").hide();
    window.localStorage.setItem("mobile", mobilenumber);
    window.localStorage.setItem("state", state_name);
    window.localStorage.setItem("district", district_name);
    window.localStorage.setItem("allow_multiple", allow_multiple);
    window.localStorage.setItem("age", ageSelectorText);
    window.location.reload();
  })
}

const createFormAndOthers = () => {
  createForm();
  createHideShowButton();
  bindSubmitButtonToSaveInfo();
}

createFormAndOthers();
