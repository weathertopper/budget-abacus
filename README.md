# Piggy Banker

A better name for this would be `budget_tracker`, but that doesn't sound as cool. 

This will be a tool for better tracking our spending in relation to our budget goals. It will do this by analyzing transaction history exported as a CSV along with our decided budget goals. For simplicity, it'll be a we b-based application for easy cross-platform use. I should only need jQuery for easier DOM manipulation. Everything else I can do myself.

Instead of drawing the design, I'll write out what I want instead. I suck at drawing. 

## Access

All files should be kept in a single directory. A shortcut should be made for easier access to the main HTML page. 

## Layout

A single dynamic HTML page should suffice. Simply put, the page will be divided up into _Steps_. Each _Step_ is dynamically added once the previous _Steps_ are completed. Altering a previous _Step_ will require updating all subsequent _Steps_. 

Any default values used to populate tables will be saved in JSON format inside of a `defaults.json` file. This file will be updated when `Transaction Hosts` and `Category`s are added.

## Example CSV

Rough format (I'm not going to post an actual example)

| `Date`         | `Transaction Type`                                 | `Check Number`                                | `Description`      | `Amount`                              | `Daily Posted Balance`                           |
|--------------|--------------------------------------------------|---------------------------------------------|------------------|-------------------------------------|------------------------------------------------|
| `mm/dd/yyyy` | `POS` or `Debit` or `Credit` or `Check` or `Deposit` | only for Transaction Type `Check`, _(ignore)_ | Transaction Host | Debit : `($#.##)`, Credit : `$#.##` | only for last transaction of the day, `$#.##` |

## Steps

### Step One

**Select CSV from file system**

This is a simple browse button for selecting a CSV file. The CSV file is scanned for the possible errors.

Possible Errors: 
 - The file does not have the extension `.CSV`
 - The file does not contain the headings described above (`Date`, `Transaction Type`, `Check Number`, `Description`, `Amount`, `Daily Posted Balance`)
 - The column `Date` contains only date values in the format `mm/dd/yyyy`
 - The column `Transaction Type` contains only the values listed above (`POS`, `Debit`, `Credit`, `Check`, `Deposit`)


### Step Two

**Add/Update/Remove default `Categories` along with `Expected` cost amounts** 

This is a `div` of finite height that contains a `div` of dynamic height. Inside of the dynamic `div` is a dynamic `table` with the following structure:

| `Category` | `Expected Cost` |
|------------|-----------------|
| < String>   | #.##            |

While the value for `Category` is a `<String>` and the value for `Expected Cost` is a number, there are HTML `input` fields inside of the `td` elements. 

There is a button for adding new rows to the table and a button for removing existing rows to the table. 

There is an `Update` `button` that updates `defaults.json` with the appropriate `Catalog` and `Expected Cost` values. It is enabled whenever the table is changed. 

Possible Errors: 
 - `Category` must be a unique non-empty string
 - `Expected` must be dollar amount > 0

### Step Three

**Add/Update/Remove default `Transaction Host`s (i.e. any company/business/service)**

This is a `div` of finite height that contains a `div` of dynamic height. Inside of the dynamic `div` is a dynamic `table` with the following structure:

| `Transaction Host` | `Category` |
|------------|-----------------|
| < String>   | < Category>            |

While the value for `Transaction Host` is a `<String>` and the value for `Category` is a `<Category>`, there are HTML `input` fields for `Transaction Host`s and `dropdown`s for `Category`s.

The table comes pre-populated with values from `defaults.json`.

There is a button for adding new rows to the table and a button for removing existing rows to the table. 

There is an `Update` `button` that updates `defaults.json` with the appropriate `Catalog` and `Expected Cost` values. It is `enabled` whenever the table is changed. 

`Transaction Host`s do NOT have to be the entire string from the `Description` column of the CSV. For example, `Best Buy` would suffice for a `Transaction Host` when the `Description` column is `8675 BLUES NASHVILLE TN 08-02-12 BEST BUY 00 0123 DEBIT CARD PURCHASE-PIN`


Possible Errors: 
 - `Category` for `Transaction Host` from `defaults.json` might not exist anymore. If this is the case, the `dropdown` in the `Category` column will be set to the default `dropdown` value (which is not a legitimate `Category` value)
 - `Transaction Host` must be a unique non-empty string
 - `Category` must be selected from the dropdown

### Step Four

**Filter unknown `Transaction Host`s by `Category`**

The layout is very simiar to _Step Three_

This is a `div` of finite height that contains a `div` of dynamic height. Inside of the dynamic `div` is a dynamic `table` with the following structure:

| `Transaction Host` | `Category` |
|------------|-----------------|
| < String>   | < Category>            |

Only unknown `Transaction Host`s from the selected CSV file are in this table. `Transaction Host` is not editable. `Category` is still a `dropdown`.

**NOTE: To add `Transaction Host`s by default (see `Best Buy` example above), add `Transaction Host` to _Step Three_ and click the `Update` `button`. That will update the table in _Step Three_**

Possible Errors: 
 - `Category` must be selected from the dropdown
 - CSV file not selected in Step One

### Step Five

**Diagnosis and Download**

This gives a basic breakdown of `Expected` costs versus `Actual` costs by `Category`. I might expand it later to see where the largest costs come from, but I've got enough to do for now.

There is a div with an immutable table with the following structure: 

| Value | Dollar Amount |
|-------------|------|
| Start Total | #.## |
| End Total   | #.## |
| Expected    | #.## |
| Actual      | #.## |
| Delta       | #.## |

There is also a `Download` button that triggers the download of a CSV  file. The CSV file download will contain a breakdown of individual costs (by `Transaction Host` and `Category`) as well as the `Expected`/`Actual` results. 

That's the bulk of it. 

### NOTES ON HOW TO USE

It _should_ be pretty straight forward:
 - If amounts are bills / cost money, the amounts should be negative. If the amounts are paychecks / earn money, the amounts should be positive.
 - Transaction Hosts in Step 2 do not need to be the full names of the transaction hosts. Any unique substring will do. 
 - Always `Update` one step before moving on. 

### TO FIX
 - Be able to remove row from Step 4
 - Show amounts in Step 4
 - Angel's computer gets atob error (wth?)
 - Need to merge CC & Credit statements