## figlet-console-webpack-plugin

A application version output in the console with figlet + webpack plugin


### Install

Use npm or yarn install this webpack plugin, but it's not yet published.

```js
 npm install figlet-console-webpack-plugin --save-dev 
```


### Usage

Example

Set this in the webpack config file

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


