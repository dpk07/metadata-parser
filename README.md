# metadata-parser
A web backend to scrape metadata.
## Running Metadata Parser locally
Metadata Parser is a Node Js application.


```
git clone https://github.com/dpk07/metadata-parser.git
cd metadata-parser
npm install
npm start
```


## Working with Metadata Parser in your IDE

### Prerequisites
The following items should be installed in your system:
* Node 10 or newer.
* git command line tool (https://help.github.com/articles/set-up-git)

### Steps:

1) On the command line
    ```
    git clone https://github.com/dpk07/metadata-parser.git
    ```
2) Inside VS Code
    ```
    File -> Open Folder -> metadata-parser
    ```

    Run the application by running `npm start` in the console.

### Run Unit Tests:

1) On the command line
    ```
    npm run test
    ```


### Code coverage:

1) On the command line
    ```
    npm run coverage
    ```



## Looking for something in particular?

| Important files | Link                                                                            |
| --------------- | ------------------------------------------------------------------------------- |
| The App.js File | [app](https://github.com/dpk07/metadata-parser/blob/main/app.js)                |
| Dependencies    | [package.json](https://github.com/dpk07/metadata-parser/blob/main/package.json) |
| Unit Tests      | [Tests](https://github.com/dpk07/metadata-parser/tree/main/tests)               |
| Supported Tags  | [tags.js](https://github.com/dpk07/metadata-parser/blob/main/tags.js)           |



## Try it out

### Postman
### Steps:

1) Open Postman

2) Do a post request to
    ```
    http://localhost:3000/scrape
    ```
3) Pass a json object in the body with the following structure. For example:
   
   ```{url:"https://ogp.me"} ```
4) Response will have all the scraped tags.

   ```
   {
    "title": "Open Graph protocol",
    "type": "website",
    "url": "https://ogp.me/",
    "description": "The Open Graph protocol    enables any web page to become a rich object in a social graph.",
    "image": {
        "type": "image/png",
        "width": "300",
        "height": "300",
        "alt": "The Open Graph logo",
        "url": "https://ogp.me/logo.png"
      }
    } 
    ```
    
