$(document).ready(function (event) {

  var FadeTransition = Barba.BaseTransition.extend({
    start: function () {
      /**
       * This function is automatically called as soon the Transition starts
       * this.newContainerLoading is a Promise for the loading of the new container
       * (Barba.js also comes with an handy Promise polyfill!)
       */

      // As soon the loading is finished and the old page is faded out, let's fade the new page
      Promise
        .all([this.newContainerLoading, this.fadeOut()])
        .then(this.fadeIn.bind(this));
    },

    fadeOut: function () {
      /**
       * this.oldContainer is the HTMLElement of the old Container
       */

      return $(this.oldContainer).animate({
        opacity: 0
      }).promise();
    },

    fadeIn: function () {
      /**
       * this.newContainer is the HTMLElement of the new Container
       * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
       * Please note, newContainer is available just after newContainerLoading is resolved!
       */

      var _this = this;
      var $el = $(this.newContainer);

      $(this.oldContainer).hide();

      $el.css({
        visibility: 'visible',
        opacity: 0
      });

      $el.animate({
        opacity: 1
      }, 400, function () {
        /**
         * Do not forget to call .done() as soon your transition is finished!
         * .done() will automatically remove from the DOM the old Container
         */

        _this.done();
      });
    }
  });

  /**
   * Next step, you have to tell Barba to use the new Transition
   */

  Barba.Pjax.getTransition = function () {
    /**
     * Here you can use your own logic!
     * For example you can use different Transition based on the current page or link...
     */

    return FadeTransition;
  };
  Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
    navigation(currentStatus, oldStatus)
    const person = urlName(currentStatus)
    console.log(person)
    switch (person) {
      case '':
      console.log(' i have entered index switch')
      setTimeout(() => {
        console.log('i am running')
        $("div.loader").fadeOut(2500)
        $(".st0").fadeOut(1000)
      }, 2500)
        break;
      case 'intro':
      $('.view-btn').on('click',()=>{
        $('.text-hidden').hide()
        $('.link-area').fadeIn(600)
      })
        break
      case 'home':
      console.log(currentStatus)
     
        $('.text-hidden').hide()
        $('.link-area').show()
 
        break;

      default:
        // Get the Element
        var item = 1
        $("#image").attr("src", `https://s3.eu-west-3.amazonaws.com/marissa-photography/img/${person}/${item}.jpg`);
        $("#image").on('click', (event) => {
          item++

          fetch(`https://s3.eu-west-3.amazonaws.com/marissa-photography/img/${person}/${item}.jpg`)
            .then(data => {
              if (data.status !== 200) {
                item = 1
                $("#image").attr("src", `https://s3.eu-west-3.amazonaws.com/marissa-photography/img/${person}/${item}.jpg`);
              } else {
                $("#image").attr("src", `https://s3.eu-west-3.amazonaws.com/marissa-photography/img/${person}/${item}.jpg`);
              }
            })
            .catch(err => {
              item = 1
              $("#image").attr("src", `https://s3.eu-west-3.amazonaws.com/marissa-photography/img/${person}/${item}.jpg`);
            })
        })
    }
  });

  Barba.Pjax.start();
});

// write a function that checks to see if the user is going
// from the gallery back to the homepage
// if they are... take them there then select the intro class and .hide()

function urlTrimmer(currentStatus){
  
  try {
    return currentStatus.url.split('/')[3].split('.')[0]
  } catch (error) {
    return null
  }
}

function navigation(currentStatus, oldStatus){
  const currentUrl = urlTrimmer(currentStatus)
  const oldUrl = urlTrimmer(oldStatus)

  if (currentUrl === 'home' && oldUrl === 'gallery'){
    window.location = '/home.html'
  }
}

function urlName(currentStatus) {
  if(currentStatus.url.includes('?')){
    return currentStatus.url.split('?')[1].split('=')[1]
  }
  return urlTrimmer(currentStatus)
  // look at url to see who was clicked
  // take the value
  // split it on the name - its just a string
  // determine who was clicked
  // return that name from this func 
}