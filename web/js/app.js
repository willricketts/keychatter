(function() {
  var app = angular.module('keychatter', []);
  app.controller('ConnectionController', ['$scope', '$q', function($scope, $q) {

    this.user = user;
    
    $scope.loading = false;
    $scope.keypairGenerated = false;
    $scope.peerIdSet = false;
    $scope.connectingToTarget = false;
    
    $scope.setSelfBtcAddress = function() {
      user.name = $scope.name;
      user.email = $scope.email;
      user.pass = $scope.pass;
      user.selfBtcAddress = $scope.selfBtcAddress;
      user.peerObj = setPeerId();
    }
    
    $scope.setTargetBtcAddress = function() {
      $scope.loading = true;
      user.targetBtcAddress = $scope.targetBtcAddress;
      generateKeys(user).then(function(keys) {
        user.pgpPubkey = keys.publicKey;
        user.pgpPrivkey = keys.privateKey;
        $scope.keypairGenerated = true;
        establishConnection(user);
      });
        //$scope.loading = false;
    }
    
    function establishConnection(user) {
      console.log(user.peerObj);
      $scope.connectingToTarget = true;
      $scope.connectedToTarget = true;
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
    
    function setPeerId() {
      var x = new Peer(user.selfBtcAddress, {host: 'evening-waters-43284.herokuapp.com', port: 80, path: '/'});
      $scope.peerIdSet = true;
      return x;
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