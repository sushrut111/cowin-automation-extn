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
  
