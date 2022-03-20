# msme-sharing-button

A styleable sharing button that uses the [Web Share API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Share_API).

[![npm Version](https://img.shields.io/npm/v/msme-sharing-button.svg?style=for-the-badge)](https://www.npmjs.com/package/msme-sharing-button)

## Installation

`npm i msme-sharing-button --save` and load the file in your HTML.

## Usage

All attributes except `data-sharing-url` are optional.

```html
<msme-sharing-button
  data-buttontext="share this page"
  data-buttonclass="button"
  data-sharing-url="https://martinschneider.me"
  data-sharing-title="martinschneider.me"
  data-sharing-text="Martins Website"
></msme-sharing-button>
```
