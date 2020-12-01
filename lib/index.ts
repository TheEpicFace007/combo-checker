import { readFileSync, ReadStream } from "fs";
import isEqual from "lodash.isequal"
const combo_regex = /(?<email>\w+(@\w+\.\w+)?):(?<password>.+)/gm;

type Combo =
{
  /**
   * The combo username
   */
  Username: string;
  /**
   * The combo password
   */
  Password: string;
}

interface ComboResult
{
  /**
   * The number of combo found
   */
  NumberOfCombo: number;
  /**
   * The list of the combo found
   */
  ComboArray: Array<Combo>;
}

/**
 * Find the combo in a username:password format
 * @param comboList The list of combo in a username:password format 
 * @returns return the interface ComboResult
 * @example const foundCombo = findCombo(fs.readFileSync("combo.txt", { encoding: "utf8" }))
 */
export function findCombo(comboList: string): ComboResult
{
  let m: RegExpExecArray
  let comboResult: ComboResult = {
    NumberOfCombo: 0,
    ComboArray: []
  }
  while ((m = combo_regex.exec(comboList)) !== null)
  {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === combo_regex.lastIndex)
    {
      combo_regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match: string) => 
    {
      const combo: Combo = {
        Username: m.groups.email,
        Password: m.groups.password
      };

      // Check if the the combo is a dupe
      for (const comboOfComboResult of comboResult.ComboArray)
      {
        if (isEqual(combo, comboOfComboResult))
          return;
      }
      
      comboResult.NumberOfCombo++;
      comboResult.ComboArray.push(combo);
    });
  }

  return comboResult;
}
