# combo-finder
Find combo in a list of combo

## Documentation
### `function findCombo(comboList: string, checkDupe: boolean = false): ComboResult`

* comboList: the list of combo in a format of username:password

Return: 
return an object containg the number of combo found and the combo found. here's
a example of what it return 

```js
{
  NumberOfCombo: 1,
  ComboArray: [
    {
      Username: "username@gmail.org",
      Password: "password"
    }
  ]
}
```

## Example:
```js
const { findCombo } = require("combo-finder")

const result = findCombo("username@gmail.org:password");
console.log(`I found ${result.NumberOfCombo}! Here are the combo found:`);
console.log(result.ComboArray)
```