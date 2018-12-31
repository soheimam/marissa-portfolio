# Photography Portfolio

## Task
Create a scalable portfolio for a professional photographer. 

## Design goals

  - Create a portfolio that allows the work to take centre stage and compliments the photographers aesthetic.
 
## Design tools
* Figma
* Adobe Illustrator


### Tech

Dillinger uses a number of open source projects to work properly:

* [Barba.js](http://barbajs.org/) - for animated page transitions.
* [jQuery](https://jquery.com/) - animations and loader
* [Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/dev/Welcome.html) - For hosting and storage
* [Gulp](https://gulpjs.com/) - For compressing images/ compiling sass/ Development tools such as browser Sync



And of course Dillinger itself is open source with a [public repository][dill]
 on GitHub.

### Installation

This portfolio requires [Gulp.js](https://gulpjs.com/) to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd marissa-portfolio
$ npm install
$ gulp
```

### Development

This portfolio is built over three core pages:

1)	Introduction to the site -Index
2)	Home page that covers both the mantra for this project and the gallery
3)	Gallery page that uses query string parameters to find out which name the user has click and find the corresponding S3 Bucket. 



