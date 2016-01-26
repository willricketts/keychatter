(function() {
  var app = angular.module('keychatter', []);
  app.controller('ConnectionController', ['$scope', '$q', function($scope, $q) {

    this.user = user;
    
    $scope.setSelfBtcAddress = function() {
      user.name = $scope.name;
      user.email = $scope.email;
      user.pass = $scope.pass;
      user.selfBtcAddress = $scope.selfBtcAddress;
    }
    
    $scope.setTargetBtcAddress = function() {
      $scope.loading = true;
      user.targetBtcAddress = $scope.targetBtcAddress;
      generateKeys(user).then(function(keys) {
        user.pgpPubkey = keys.publicKey;
        user.pgpPrivkey = keys.privateKey;
        $scope.loading = false;
        
      });
    }
    
    function generateKeys(user) {
      return $q(function(fulfill, reject) {
        var opts = {
          numBits: 2048,
          userId: user.name + ' <' + user.email + '>',
          passphrase: user.pass
        };
        
        openpgp.generateKeyPair(opts).then(function(keypair) {
          fulfill({
            privateKey: keypair.privateKeyArmored,
            publicKey: keypair.privateKeyArmored
          });
        }).catch(function(err) {
          reject(err); 
        });
      });
    }
    
  }]);
  
    
  var user = {
    name: '',
    email: '',
    pass: '',
    selfBtcAddress: '',
    targetBtcAddress: '',
    pgpPubkey: '',
    pgpPrivkey: ''
  };
  
})();