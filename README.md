## figlet-console-webpack-plugin

A application version output in the console with figlet + webpack plugin


### Install

Use npm or yarn install this webpack plugin

```js
 npm install figlet-console-webpack-plugin --save-dev 
```


### Usage

Example
```js

new FigletConsoleWebpackPlugin({
  name: 'console',
  content: 'version 0.0.1',
  options: {
    mark: '#'
  }
})

```

That should print out:

```
##################################################
                                        _        
   ___    ___    _ __    ___    ___   | |   ___ 
  / __|  / _ \  | '_ \  / __|  / _ \  | |  / _ \
 | (__  | (_) | | | | | \__ \ | (_) | | | |  __/
  \___|  \___/  |_| |_| |___/  \___/  |_|  \___|
                                                
##################################################
                  version 0.0.1                  
```


### Reference

https://github.com/patorjk/figlet.js
