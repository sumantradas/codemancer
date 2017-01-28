var app = angular.module("myApp",[]);

app.service('loginService',function($http){

	this.data = function(loginData){

		$http.post('/',loginData){
			headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
		}
		}
			.then(function (response) {	
				console.log(response);
				if(response.data.flag==0){

					alert("emailid or password is incorrect");
					window.location.reload();
				}

				else if(response.data.flag==1){

					window.location.href = '/admin'
				}

				else if(response.data.flag==2){

					window.location.href = '/employee'
				}


			 }),function(response){
				console.log("error")
			}

	}
})


app.controller("login",function($scope,loginService){


	$scope.submit = function(){

	    loginData = {
			email : $scope.email,
			password : $scope.password
		}

		//service called
		loginService.data(loginData);

			 
	}
	
})