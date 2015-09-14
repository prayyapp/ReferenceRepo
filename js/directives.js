app.directive('userBlast', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      blast: '='
    },
    templateUrl: 'blast.html'
  };
});

app.directive('adBlast', function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      ad: '='
    },
    templateUrl: 'ad.html'
  };
});

app.directive('scrollArrow', function() {
  return {
    restrict: 'E',
    replace: true,
    templateUrl: 'scroll-arrow.html',
    compile: function(ele, attr) {
      if (attr.down != undefined) {
        $(ele).addClass('down-arrow');
      } else {
        $(ele).addClass('up-arrow');
      }
    }
  };
});

app.directive('blastList', function() {
  return {
    restrict: 'E',
    scope: {
      blasts: '='
    },
    templateUrl: 'blast-list.html',
    link: function(scope) {
      var displayLength = 5,
        currentIndex = 0;
      scope.visibleBlasts = [];

      scope.scroll = function(amount) {
        //clear visible list
        scope.visibleBlasts.length = 0;
        //update current index, keeping range between 0 and total size of the blasts list (minus the visible window size)
        currentIndex = Math.min(Math.max(currentIndex + amount, 0), scope.blasts.length - 1 - displayLength);
        //merge the slice of the blasts chosen into the visibleBlasts scope variable
        $.merge(scope.visibleBlasts, scope.blasts.slice(currentIndex, currentIndex + displayLength));
      };

      scope.$watch('blasts', function(newValue, oldValue) {
        if (newValue) {
          scope.scroll(0);
        }
      });
    }
  };
});