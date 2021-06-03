<a name="v4.1.2"></a>
# [Bug fix: Click auto confirm even when captcha unavailable (v4.1.2)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v4.1.2) - 03 Jun 2021

- Bug fixed: await inside non async method

[Changes][v4.1.2]


<a name="v4.1.1"></a>
# [Autoconfirm even if captcha fails [BUGGY] (v4.1.1)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v4.1.1) - 03 Jun 2021

- Cowin removed captcha
- Autoconfirm should work even if captcha fails because it is not available

[Changes][v4.1.1]


<a name="v4.1.0"></a>
# [Bugfix: Slot booking with skip days with multiple vaccines (v4.1.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v4.1.0) - 02 Jun 2021

- **Fix:** When a centre has multiple vaccines available, skip days wouldn't be calculated properly.
- Improvements from previous pre releases.

[Changes][v4.1.0]


<a name="v4.0.3"></a>
# [Added voice to notify session expiry (v4.0.3)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v4.0.3) - 31 May 2021

- Replaced beep with a voice saying "Session expired, please logout and login again"
- Play voice for only 10 seconds before and after expiry
- If voice fails, show alert

[Changes][v4.0.3]


<a name="v4.0.2"></a>
# [Refactored code: Separate modules for form and booking logic (v4.0.2)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v4.0.2) - 31 May 2021

- Separated form creation logic into form.js
- Remove unused and commented code
- Refactor a few variable names to mean what they do

[Changes][v4.0.2]


<a name="v4.0.1"></a>
# [Auto captcha in manual flow, lesser delays (v4.0.1)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v4.0.1) - 30 May 2021

- Allow auto captcha detection in manual flow as well
- Remove warning that captcha could be entered only in automatic flow
- Lesser delays
- Minor fixes

[Changes][v4.0.1]


<a name="v4.0.0"></a>
# [Lesser delays, smaller button, captcha fills even on manual click (v4.0.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v4.0.0) - 29 May 2021

- Allow captcha to be entered even if someone manually clicks a slot
- Button is smaller to not hide the logout link
- Less unnecessary delays


[Changes][v4.0.0]


<a name="v3.8.0"></a>
# [Optimizations for API calls (v3.8.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.8.0) - 28 May 2021

- Minimal API calls
- Remove unnecessary handlers by refreshing to reset
- Timer shown on button

[Changes][v3.8.0]


<a name="v3.7.0"></a>
# [TnCs & Better help texts (v3.7.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.7.0) - 27 May 2021

- Added terms and conditions
- Added better help texts
- Dates coming back on top of table
- Default refresh interval - 15 seconds

[Changes][v3.7.0]


<a name="v3.6.1"></a>
# [Fix: Incorrect vaccine selected sometimes (v3.6.1)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.6.1) - 26 May 2021

- Sometimes booking would be done with incorrect selectors
- Fix it by making sure selectors are not blindly toggled
- Synchronization in selectors and booking

[Changes][v3.6.1]


<a name="v3.5.1"></a>
# [Option to set value for skip days so that vaccine can be booked at a future date (v3.5.1)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.5.1) - 25 May 2021

- Option to set value for skip days so that vaccine can be booked at a future date

[Changes][v3.5.1]


<a name="v3.4.0"></a>
# [Option to set auto refresh interval (v3.4.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.4.0) - 24 May 2021

- Set auto refresh interval (To avoid throttling)

[Changes][v3.4.0]


<a name="v3.3.0-autorefresh"></a>
# [Autorefresh interval enabled (v3.3.0-autorefresh)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.3.0-autorefresh) - 23 May 2021

- Users can input refresh intervals and page keeps refreshing

[Changes][v3.3.0-autorefresh]


<a name="v3.3.0"></a>
# [Vaccine selectors along with costs (v3.3.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.3.0) - 23 May 2021

- Select desired vaccine-
- Select cost preference

[Changes][v3.3.0]


<a name="v3.2.0"></a>
# [Allow 10 digits for mobile and 6 digits for pin (v3.2.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.2.0) - 22 May 2021

- Enter 10 digit mobile number and get OTP directly
- Enter 6 digits of pincode automatically to allow search
- Enable auto refresh with pin code search

[Changes][v3.2.0]


<a name="v3.1.0-kiwi"></a>
# [Handle modal open issue in mobile browsers (v3.1.0-kiwi)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.1.0-kiwi) - 22 May 2021



[Changes][v3.1.0-kiwi]


<a name="v3.1.0"></a>
# [Option to enable auto book (v3.1.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.1.0) - 21 May 2021

- Option to not wait for confirmation after captcha entry
- Minor fixes in UI

[Changes][v3.1.0]


<a name="v3.0.0"></a>
# [Better user interface for the form (v3.0.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v3.0.0) - 21 May 2021

- Bootstrap css used for UI
- Added try/catch around timeslot button in case it fails

[Changes][v3.0.0]


<a name="v2.1.0"></a>
# [Center preference added (v2.1.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v2.1.0) - 21 May 2021

- You can now add preferred centers
- You can specify min slots available to look for in order to choose a center


[Changes][v2.1.0]


<a name="v2.0.6"></a>
# [Auto Refresh when searching by district (v2.0.6)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v2.0.6) - 20 May 2021

- Automatically keep refreshing every 2 seconds when searching is by district and keep trying is enabled
- Fix issue where Jaipur II was being selected even when Jaipur I was set as district

[Changes][v2.0.6]


<a name="v2.0.5"></a>
# [Bugfixes and better messages (v2.0.5)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v2.0.5) - 20 May 2021

- Fixed the bug: Slotind was NaN when input is empty.
- Better messages/warnings/instructions

[Changes][v2.0.5]


<a name="v2.0.4"></a>
# [Expand model's scope to have all characters (v2.0.4)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v2.0.4) - 18 May 2021

The previous model for decoding captcha did not have all the models.
Added codes for all alphabets (both cases) and 0-9

[Changes][v2.0.4]


<a name="v2.0.3"></a>
# [Default to slot 1 when input is invalid (v2.0.3)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v2.0.3) - 18 May 2021



[Changes][v2.0.3]


<a name="v2.0.2"></a>
# [Stable version before autoselect, captcha and minor fixes (v2.0.2)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v2.0.2) - 18 May 2021



[Changes][v2.0.2]


<a name="v2.0"></a>
# [Added autoselect and captcha (v2.0)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v2.0) - 17 May 2021

Added major features:
1. Whenever an available slot appears on the screen, the first one available is selected for booking and captcha page is shown
2. The time slot can be denoted in the autofill form and that timeslot will be preferred for booking
3. Captcha will be detected and entered in the input box.

[Changes][v2.0]


<a name="v1.4"></a>
# [Stable version before autoselect and captcha (v1.4)](https://github.com/sushrut111/cowin-automation-extn/releases/tag/v1.4) - 17 May 2021

The recent stable version before captcha detection was added

[Changes][v1.4]


[v4.1.2]: https://github.com/sushrut111/cowin-automation-extn/compare/v4.1.1...v4.1.2
[v4.1.1]: https://github.com/sushrut111/cowin-automation-extn/compare/v4.1.0...v4.1.1
[v4.1.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v4.0.3...v4.1.0
[v4.0.3]: https://github.com/sushrut111/cowin-automation-extn/compare/v4.0.2...v4.0.3
[v4.0.2]: https://github.com/sushrut111/cowin-automation-extn/compare/v4.0.1...v4.0.2
[v4.0.1]: https://github.com/sushrut111/cowin-automation-extn/compare/v4.0.0...v4.0.1
[v4.0.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.8.0...v4.0.0
[v3.8.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.7.0...v3.8.0
[v3.7.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.6.1...v3.7.0
[v3.6.1]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.5.1...v3.6.1
[v3.5.1]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.4.0...v3.5.1
[v3.4.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.3.0-autorefresh...v3.4.0
[v3.3.0-autorefresh]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.3.0...v3.3.0-autorefresh
[v3.3.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.2.0...v3.3.0
[v3.2.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.1.0-kiwi...v3.2.0
[v3.1.0-kiwi]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.1.0...v3.1.0-kiwi
[v3.1.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v3.0.0...v3.1.0
[v3.0.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v2.1.0...v3.0.0
[v2.1.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v2.0.6...v2.1.0
[v2.0.6]: https://github.com/sushrut111/cowin-automation-extn/compare/v2.0.5...v2.0.6
[v2.0.5]: https://github.com/sushrut111/cowin-automation-extn/compare/v2.0.4...v2.0.5
[v2.0.4]: https://github.com/sushrut111/cowin-automation-extn/compare/v2.0.3...v2.0.4
[v2.0.3]: https://github.com/sushrut111/cowin-automation-extn/compare/v2.0.2...v2.0.3
[v2.0.2]: https://github.com/sushrut111/cowin-automation-extn/compare/v2.0...v2.0.2
[v2.0]: https://github.com/sushrut111/cowin-automation-extn/compare/v1.4...v2.0
[v1.4]: https://github.com/sushrut111/cowin-automation-extn/tree/v1.4

 <!-- Generated by changelog-from-release -->
