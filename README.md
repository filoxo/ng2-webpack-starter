# ng2-webpack-starter

Angular2 (beta 17) starter using Webpack

## Easy install

**Pre-requisites:** Node must already be installed. 

Then:

- Fork this repo
- `git clone https://github.com/<your-username>/ng2-webpack-starter.git`
- `npm install`
- Keep going with the [Angular 2 Tutorial: Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/)

	or 

	Do your own thing :tada:

## Step-by-step Manual instructions

There's something to be said about not using boilerplate code without fully understanding what you're getting. Here are the individual steps you need to replicate this project. 

- Make a project directory

	`mkdir ng2-webpack-starter`

- Navigate into the project directory

	`cd ng2-webpack-starter`

- Store project data as npm project (follow prompts):  
	`npm init`
	- When prompted for **entry**, specify `dist/index.bundle.js`
		- Won't be used until you `npm run build` for production
- Install and save dependencies
    - `npm i angular2@2.0.0-beta.17 es6-shim reflect-metadata rxjs@5.0.0-beta.7 zone.js -S`
    - `npm i webpack webpack-dev-server typescript ts-loader typings -D`
- Create `tsconfig.json` file
	- This configures the TypeScript compiler. Copy in the sample code below.

			{
				"compilerOptions": {
					"target": "es5",
					"module": "system",
					"moduleResolution": "node",
					"sourceMap": true,
					"emitDecoratorMetadata": true,
					"experimentalDecorators": true,
					"removeComments": false,
					"noImplicitAny": false
				},
				"exclude": [
					"node_modules",
					"typings/main",
					"typings/main.d.ts"
				]
			}

- Create `typings.json` file
	- This allows us to import TypeScript definition files so that the tscompiler can recognize some third-party libraries

			{
				"ambientDependencies": {
					"es6-shim": "registry:dt/es6-shim#0.31.2+20160317120654",
					"jasmine": "registry:dt/jasmine#2.2.0+20160412134438",
					"webpack": "github:DefinitelyTyped/DefinitelyTyped/webpack/webpack.d.ts#95c02169ba8fa58ac1092422efbd2e3174a206f4"
				}
			}

	- The actual installation of these definition files will be in the `postinstall` npm script below
	- Alternatively, you could install these definitions using the `typings` package. You would not need to create `typings.json`; `typings` will do that. 

			typings install es6-shim jasmine webpack --ambient --save

		NOTE: The typings version of webpack definitions (`"webpack": "registry:dt/webpack#1.12.9+20160321060707"`) throw an error but still allow webpack to work correctly. The DefinitelyTyped version used above does not. 


- Edit `package.json` and copy the below code into the `scripts` key of your file
	
		"build": "webpack",
		"start": "webpack-dev-server",
		"typings": "typings",
		"postinstall": "typings install"

- Create `webpack.config.js`
	- This configures webpack (surprise!). Copy the below code into your file, then read and remove the comments.

			var webpack = require("webpack"); // Import webpack
			module.exports = {
				entry: {
					"vendor": "./src/vendor/vendor", // Vendor specific code bundle
					"app": "./src/main" // App specific code bundle
				},
				output: {
					path: __dirname + "/dist", // Bundles will be output to /dist in project root
					filename: "[name].bundle.js" // Bundle files will be named `[name].bundle.js`
				},
				resolve: {
					extensions: ['', '.webpack.js', '.web.js', '.ts', '.js'] // Include these matched file extensions
				},
				devtool: 'source-map', // Create source maps 
				devServer: { inline: true }, // Run webpack-dev-server with inline-mode
				module: {
					loaders: [
						{ test: /\.ts?$/, loader: 'ts-loader' } // Compile TypeScript files using ts-loader plugin
					]
				},
				plugins: [
					new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"./vendor.bundle.js") // Move modules required by multiple entry chunks into a commons chunk
				]
			};

- Run `npm run postinstall` to get the missing typings
	- Should create a new `typings/` directory

### Create components

Create the first components.

- Create the following directories 
	- `src/` : All uncompiled code will go here
		- `components/` : Component specific code goes here; create a new dir for each component
			- `app/` : The first component will be the main application
		- `vendor/` : Third-party libraries will be imported separately 
- Create the following files. Sample content is taken from the [Angular2 Quickstart](https://angular.io/docs/ts/latest/quickstart.html) project.
	- `src/components/app/app.component.ts`

			import { Component } from 'angular2/core';

			@Component({
			    selector: 'my-app',
			    template: '<h1>My First Angular 2 App</h1>'
			})
			export class AppComponent { }

	- `src/main.ts` 

			import { bootstrap }    from 'angular2/platform/browser';
			import { AppComponent } from './components/app/app.component.ts';

			bootstrap(AppComponent);

	- `src/vendor/vendor.ts`

			// Polyfills
			import 'es6-shim';
			import 'es6-promise';
			import 'reflect-metadata';
			import 'zone.js/dist/zone';

			// Angular 2
			import 'angular2/platform/browser';
			import 'angular2/platform/common_dom';
			import 'angular2/core';
			import 'angular2/router';
			import 'angular2/http';

			// RxJS
			import 'rxjs';

### Link to HTML page

- Create `index.html` in project root
	- In development, reference files from server root (no directory)
	- In production, reference built files in `dist/`	

			<html>
			<head>
			  <title>Ng2 Project</title>
			  <meta name="viewport" content="width=device-width, initial-scale=1">
			</head>
			<body>
			  <my-app>Loading...</my-app>

			  <!-- Use built files for Production -->
			  <!-- <script src="dist/vendor.bundle.js" type="text/javascript" ></script> -->
			  <!-- <script src="dist/app.bundle.js" type="text/javascript" ></script> -->

			  <!-- Use webpack-dev-server (in-memory) files -->
			  <script src="vendor.bundle.js" type="text/javascript" ></script>
			  <script src="app.bundle.js" type="text/javascript" ></script>  
			</body>
			</html>

### Run

- `npm start` to run the webpack-dev-server
- Open your browser to [http://localhost:8080](http://localhost:8080) or [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/)

Or 

- `npm run build` to create final asset bundles (inside `dist/`) for production