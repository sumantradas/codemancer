var app = angular.module("myApp",[]);


app.controller("admin",function($scope,$http){
	 $scope.number = /^(\d{10})?$/; 
	$scope.submit = function(){

	     employeeData = {
	    	
			name : $scope.name,
			email : $scope.email, 
			password : $scope.password,
			contact :  $scope.contact,
			usertype : $scope.usertype,
			
		}

		$http.post('/login',employeeData)

			.then(function (response) {
				if(response.data.flag == 3){

					alert("employee data inserted successfully ");
					window.location.reload();
				}
				
			 });
			 
	}

	//registered users

		$http.get('/login').then(function(response){
			console.log("response",response);
			$scope.users = response.data.users ;
		})

/*
		$scope.shut = function(){

			$scope.name = "";
			$scope.email = "";
			$scope.password = "";
			$scope.contact = "";
			$scope.usertype = "";


		}*/
	
})