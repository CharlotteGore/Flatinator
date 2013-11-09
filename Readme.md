# Flatinator

## Introducing The Flatinator

[Component](http://github.com/Component) is a great package manager for client side modules. It's also got a pretty nifty community, too.

Sadly the build tool has a few quirks and issues but the most troubling is the size of the build files. One very large project I'm working on has over 50 components (a combination of local and remote). This, it turns out, generates **190kb** of calls to `require.alias()` and because most of those calls are very long strings this bulk remains in the minified version.

## Flatinator: A Blunt Instrument

Flatinator is a blunt instrument. It rips out the 'local require' stuff. Once a Component has been installed, e.g., `component install component/dom`, any Component can successfully `require("dom")`. It changes the internal names of modules from `component-dom/index.js` to `dom`. This greatly simplifies finding modules and means a smaller implementation of require. 

## Flatinator: It Does Post-Processing

Flatinator is a post-processing step for Component build. It takes the output of Component and gets rid of as much junk as it can by working at the AST level for maximum safety.

## Flatinator: IT MAY BREAK YOUR STUFF

Flatinator does not wish to break your stuff and it tries very hard not to. However, the downside of removing local require and aliases is that you lose the namespace stuff. Flatinator has made a compelling case that for most projects, you don't actually need namespacing. However, because it's a post-processing step if you ever need the Full Component Build experience you just stop using Flatinator. It'll make Flatinator cry, but frankly your code comes first. 

But here's some handy rules:

- All module names must be unique
- Seriously. All module names must be unique.

## Flatinator: IT MAY MAKE YOUR STUFF WORK!

One advantage of Flatinator is that by default you can access any module from anywhere - including from inline script tags. `<script>var $ = require('jquery')</script>` actually works. This is because after Flatinator has finished with your build, the jQuery module is called `jquery` instead of `components-jquery/jquery.js`, which means less 'omg I can't find that module!!' errors being thrown.

Of course if you use the `--app` option then your build gets wrapped in an anonymous function, stopping variables leaking into the global scope. A quick `window.require = require` inside a module will sort that out. 

## Flatinator: The Helpful Destroyer

As Flatinator purges the dreck from your build file, it tells you what it's doing and what it's done. It lets you know if it can't find a module for a particular call to `require`. It lets you know if a couple of modules are clashing. It tells you what unique name it's given each module. This should just be what you `require()` the module with.

## Flatinator Loves Applications

Component as a build tool is really about making a bunch of modules available to a web page. Lots of little chunks of functionality. That sort of thing. Flatinator feels that this is very cool but sometimes you just want to build a single screen app, you want to use Components and you want your build to be a self bootstrappin', global scope avoidin' bundle of awesomeness.


## Installing The Flatinator

Flatinator is installed through the magic of npm

```sh
$ npm install -g flatinator
```

## Wielding The Flatinator

### Default Enflattening.

Process build/build.js to build/rebuild.js. END!

```sh
$ component install && component build
$ flatinator
```

### Enflatten something in a strange location

The `-e` option lets you specify an input file. This example processes crazy-build-lcoation/ermahgod.js and dumps the output in build/rebuild.js.

```sh
$ flatinator -e crazy-build-location/ermahgod.js
```

### Put the Enflattened file in a strange location

The `-o` option lets you specify an output location. This example processes build/build.js and dumps the output in public/js/rebuild.js.

```sh
$ flatinator -o public/js
```

### Name The Enflattened

The `-n` option lets you specify a filename for your output file. You can set this to `-n build` if you just want it to overwrite the original file Component-build generated.

In this example, build/build.js is processed and the output goes to build/love-flatinator.js

```sh
$ flatinator -n love-flatinator
```

### Bootstrap The Enflattened

The `--app` option does two things:

- Wraps the output in a self executing anonymous function. You have to do `window.require = require` in some module if you want to be able to access modules from inline script tags. 
- Appends a call to a module of your choice. No need for an inline script tag to bootstrap your app.

```sh
$ flatinator -n love-flatinator --app love-flatinator
```
This would generate...
```js
(function(){
  // tiny require goes here..
  // the modules go here...
  require('love-flatinator')
}())
```

## Questions. Comments. 

Flatinator has no time for your questions or comments.
