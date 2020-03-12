# rebuy
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
VTEX Rebuy app

This app shows the last order for the identified user, with a button to buy the same products again.

## Usage

For this to work, you need to create the `lastOrders` schema on the `orders` dataentity. [Docs](http://help.vtex.com/en/tutorial/master-data-v2)

```json
{
  "properties": {
    "clientProfileData": {
      "type": "object",
      "properties": {
        "email": {
          "type": "string",
          "format": "email"
        }
      }
    }
  },
  "v-default-fields": ["items", "value"],
  "v-security": {
    "allowGetAll": false,
    "publicRead": ["items", "value"],
    "publicFilter": ["clientProfileData"]
  },
  "v-indexed": ["clientProfileData"]
}
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!