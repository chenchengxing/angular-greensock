angular.module('app', [])
  .directive('rock', function ($document) {
    return {
      scope: {
        ngModel: '='
      },
      link: function (scope, element, attrs) {
        var zoom;
        var flag = false;
        var width = element[0].offsetWidth;
        var height = element[0].offsetHeight;
        var all = new TimelineMax({paused:true, onComplete: completeHandler, onReverseComplete: reverseCompleteHandler });
        function completeHandler () {
          scope.ngModel.show = true;
          scope.$apply();
        }
        function reverseCompleteHandler () {
          scope.ngModel.show = false;
          scope.$apply();
        }
        zoom = new TimelineMax().to(element, 1, {
            width: ( width * 2) + 'px',
            height: ( height * 2) + 'px',
            ease: Expo.easeOut
          });
        zoom.to(element, 1, {
          width: '+=300px',
          left: '-=150px'
        });
        var rotateToCenter = new TimelineMax();
        rotateToCenter.to(element, 0.5, {
          rotation: 360,
          left: '300px',
          top: '200px'
        });
        all.add(rotateToCenter);
        all.add(zoom);
        element.on('click', function (e) {
          e.preventDefault();
          if (flag) {
            return;
          }
          flag = true;
          all.play();
          $document.bind('click', reverse);
        });
        var reverse = function (e) {
          if ( flag && e.target !== element[0] ) {
            $document.unbind('click', reverse);
            flag = false;
            all.reverse();
            
          }
        }
      }
    };
  })
  .controller('Ctrl', function($scope) {
    $scope.list = [
      {
        name: 'calendar',
        desc: 'this is our nice calendar made of gold!! -_-'
      },
      {
        name: 'tooltip'
      },
      {
        name: 'focusOnce'
      }
    ];
    var x = -150;
    angular.forEach($scope.list, function (item) {
      item.left = (x = x + 150) + 'px';
    });
  })