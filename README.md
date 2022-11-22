# About
This app calculates the Twitter rate of the user and detects fake users using Twitter API.
It includes two projects, Express (Back-end) and React (Front-end), which are related to each other.

# Notes
- Unfortunately, Twitter API may not work in Iran, so it is necessary to use a proxy. Set your proxy in the terminal before running the project.
Run these commands on your terminal to set the proxy:
	```
	export http_proxy=http://ip:port/
	
	export https_proxy=http://ip:port/
	```
- you can go to the following link and register your request to receive the twitter token, .
https://developer.twitter.com/en/apply-for-access
- Make sure you have proper access to the API as some APIs are premium.
- The Twitter API does not support CORS so I implemented Express project to call APIs of twitter for getting data.


# Requirements
You should install node js and npm.
https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

# Installation
You should run these commands on your terminal to run express project:
```
npm install -g yarn
cd server
yarn install
yarn start
```
then, in another terminal run these commands to start react project:
```
cd client
yarn install
yarn start
```