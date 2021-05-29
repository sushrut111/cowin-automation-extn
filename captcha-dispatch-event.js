$(document).on('click', 'ul.slot-available-wrap li a', async function (e) {
    await sleep(1000)
    waitForEl('.time-slot', enterCaptcha)
})