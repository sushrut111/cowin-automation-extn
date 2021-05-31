var mp3_url = 'https://github.com/sushrut111/cowin-automation-extn/blob/gh-pages/sessionexpired.mp3?raw=true';

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
  
  const playAudio=async()=>{  //made it async so that the audio is played before the alert is issued.
    try{
      await (new Audio(mp3_url)).play();
    } catch (e) {
      alert("session is expiring");
    }
  }

  const expirationUpdate = async() => {
    console.log(localStorage.getItem("redirect"));
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
    let time_left_min = get_mins((expd - curr)/1000)
    document.title = time_left_min;
    $("#cb-timer").html(`Time left: ${time_left_min}`);

    if(expd - curr < 10000){
      if(localStorage.getItem("notification")==1)
      {
        await playAudio();
      }
    }

    if(expd - curr < 10000 && expd-curr>0){
      if (localStorage.getItem("redirect")==1)
      {
        document.location='https://selfregistration.cowin.gov.in/';
      }
      else
      {
        if(confirm("Session has expired! Redirect to homepage?"))
        {
          document.location='https://selfregistration.cowin.gov.in/';
        }
      }
    }
  }
  
  setInterval(expirationUpdate, 10000);
  