var mp3_url = "https://github.com/sushrut111/cowin-automation-extn/blob/gh-pages/sessionexpired.mp3?raw=true";
let aud = new Audio(mp3_url);
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
    let time_left_min = get_mins((expd - curr)/1000)
    document.title = time_left_min;
    $("#cb-timer").html(`Time left: ${time_left_min}`);
    if(Math.abs(expd - curr) < 10000){
      aud.play().catch(e=>{alert("Session expired! Please logout and login again")});
    }
  }
  
  setInterval(expirationUpdate, 5000);
  
