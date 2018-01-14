# Redux Shopping Cart Example + purescript

This project is me following along with Hardy Jones' talk at
LambdaConf 2017 "Integrating Purescript and Halogen into Javascript Apps",
which is available on youtube as a 6-part series of roughly 50-minute
videos.

I pulled in the initial codebase by directly copying `examples/shopping-cart`
from the `redux` repository.

The first commit is well into the
[fourth video](https://www.youtube.com/watch?v=-OyXVezw9WQ), at around
40 minutes. At this point, we've done several things:
  - Added a "Reset Cart" button and an "Add All Items" button to the
    redux app, to familiarize ourselves with redux (and in my case,
    hit a bunch of type errors that were extra motivation for learning
    purescript / elm!)
  - Added bower, purescript, and pulp to the project and get the
    pulp-repl running
  - Created our first purescript module and call into it from
    `src/components/Product.js` so that we can see how purescript builds
    work and how purescript functions / data constructors expose themselves
    to the javascript world.

Below, the readme is in several sections:
  - The first section discusses the configuration, mechanics, and directory
    layout that we deal with when adding purescript to a javascript app.
  - The second section is the original readme from the shopping cart
    example.

# How to add purescript to the existing project

### Part 1: Get to where you can add a repl

First add bower and pulp and such:
```
npm install -D purescript pulp bower
npm install  # might not be needed
```

Then, add some scripts to package.json:
```
"bower": "bower",
"pulp-repl": "pulp repl",
```

Then pull in more stuff via bower:
```
npm run bower -- init
npm run bower -- install -S purescript-prelude purescript-console purescript-psci-support
```

Just a general note: purescript packages, when exposed via bower (which is a
more general javascript tool) have a `purescript-` prefix. So for example if
something complains that you need the `psci-support` package, the way to solve
it is to run ` npm run bower -- install -S purescript-psci-support`.

### Part 2: including purescrpt in the build

Add this to the scripts in package.json:
```
"pulp-build": "pulp --watch build --build-path src/purs"
```
This tells `purs` to build your `.purs` files, (it searches using the glob
`src/**/*.purs`) and put all of the output json into `src/purs`. The default
behavior of `purs` would be to build into a `/target` directory of some sort,
but when adding purescript to a javascript app you need the generated source
to be included in the app source tree so that the normal javascript build
tooling can see it.

The normal javascript build tooling ignores non-`.js` files, so the presence
of `.purs` files in our directory tree won't cause any problems.

The purescript module system is independent of the npm module system, so
what winds up happening is that:
  - You get a bower_components directory with the source code of all of
    your purescript dependencies (remember that the package name in bower
    is `purescript-<package_name_in_purescript>`). This code is mostly
    purescript code, although often there are javascript files for modules
    that use the FFI.
  - Inside `src/purs` you get the output of not only all of your own modules,
    but also the compiled form of all your dependencies (so there will be
    quite a lot of output). Since, from npm's point of view, this code is all
    source code you can import it from javascript using the normal ecmascript
    module system.

### Part 3: making changes to the purescript side of the code

If we want to install additional packages, we use `npm run bower -- install`,
e.g. in the initial bit of code we ran
```
npm run bower -- install -S purescript-maybe
```
to get the `Data.Maybe` module and
```
npm run bower -- install -S purescript-functions
```
to get the `Data.Function.Uncurried` module

# Original README: Redux Shopping Cart Example

This project template was built with [Create React App](https://github.com/facebookincubator/create-react-app), which provides a simple way to start React projects with no build configuration needed.

Projects built with Create-React-App include support for ES6 syntax, as well as several unofficial / not-yet-final forms of Javascript syntax such as Class Properties and JSX.  See the list of [language features and polyfills supported by Create-React-App](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#supported-language-features-and-polyfills) for more information.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

