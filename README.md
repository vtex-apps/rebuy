# rebuy
VTEX Rebuy app

This app shows the last order for the identified user, with a button to buy the same products again.

## Usage

For this to work, you need to create the `lastOrders` schema on the `orders` dataentity. [Docs](http://help.vtex.com/en/tutorial/master-data-v2)

If you have a schema with a different name, change the configuration for Rebuy in `https://{{account}}.myvtex.com/admin/apps`.

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
