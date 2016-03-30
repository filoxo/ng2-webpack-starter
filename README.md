# ng2-webpack-starter
Angular2 Starter using Webpack

## Easy install

**Pre-requisites:** Node must already be installed. 

Then:

- `git clone https://github.com/filoxo/ng2-webpack-starter.git`
- `npm install`
- Create more components

## Step-by-step Manual instructions

- Make a project directory

	`mkdir ng2-webpack-starter`
- Navigate into the project directory

	`cd ng2-webpack-starter`
- Store project data as npm project (follow prompts):  
	`npm init`
	- When prompted for 'entry', specify `index.bundle.js`
- Install and save dependencies
    - `npm i angular2@2.0.0-beta.12 es6-shim reflect-metadata rxjs@5.0.0-beta.2 zone.js -S`
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
					"es6-shim": "github:DefinitelyTyped/DefinitelyTyped/es6-shim/es6-shim.d.ts#7de6c3dd94feaeb21f20054b9f30d5dabc5efabd",
					"jasmine": "github:DefinitelyTyped/DefinitelyTyped/jasmine/jasmine.d.ts#7de6c3dd94feaeb21f20054b9f30d5dabc5efabd"
				}
			}

	- The actual installation of these definition files will be in the `postinstall` npm script below
- Edit `package.json` and copy the below code into the `scripts` key of your file
	
		"build": "webpack", //
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
- Create the following files. Sample content is taken from the Angular2 Quickstart project.
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