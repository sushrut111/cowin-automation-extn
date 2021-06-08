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
const handleBookingErrorAndGoBack = () => {
    waitForEl(".ng-star-inserted.ng-trigger.ng-trigger-flyInOut.ngx-toastr.toast-error", async() => {
        await sleep(1000);
        window.location.reload();
    });
}
$(document).on('click', 'div.slots-box:not(.no-available)', async function (e) {
    await sleep(1000);
    waitForEl('.appoint-success', () => {
        try {
            enterCaptcha();
        } catch (e) {
            console.log("Unable to enter captcha");
        } finally {
            if (enableautoconfirm) {
                handleBookingErrorAndGoBack();
                $("ion-button.confirm-btn")[0].click();
            }
        }
    });
});
