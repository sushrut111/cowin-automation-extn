$(document).on('click', 'div.slots-box:not(.no-available)', async function (e) {
    await sleep(1000);
    waitForEl('.appoint-success', () => {
        try {
            enterCaptcha();
        } catch (e) {
            console.log("Unable to enter captcha");
        }
    });
});