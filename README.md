# PRESENTA Toast Module

This module adds a little tip message to a scene.

## Installation

Please read the installation istructions for official plugins [here](https://lib.presenta.cc/extend/#install-an-official-plugin) using this unique identifier: `module-toast`

## Usage

This module require an external CSS dependency, [animate.css](https://animate.style/), that needs to be included in the HTML document.

To activate this module use this setting:

```js
{
    modules:{
      toast:true
    }
}
```

Then, in the scene you want to display the message:

```js
{
	blocks:[...],
	toast:{
		text: 'Some message'
	}
}
```


## Development

Run the watcher:

    npm start

and the local webserver

    npm run test



