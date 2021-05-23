var mp3_url = 'https://media.geeksforgeeks.org/wp-content/uploads/20190531135120/beep.mp3';


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
    if(expd - curr < 10000){
      try{
        (new Audio(mp3_url)).play();
      } catch (e) {
        alert("session is expiring");
      }
    }
  }
  
  setInterval(expirationUpdate, 5000);
  