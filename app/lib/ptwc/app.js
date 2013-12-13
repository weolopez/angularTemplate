
var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'AppsDirective']);

app.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/view1', {template: '<div><button ng-click="sayHello()">ENTER</button>This is {{templateName}}</div>', controller: 'MyCtrl1'});
		$routeProvider.when('/view2', {template: '<div></div>.', controller: 'MyCtrl2'});
		$routeProvider.when('/group', {templateUrl: 'group.html', controller: 'GroupCtrl'});
		$routeProvider.otherwise({redirectTo: '/view1'});
	}]);

app.controller('myController', function($scope, $timeout, $location) {
	$scope.sayHello = function() {
		$location.path('/view2' === $location.path() ? '/' : '/view2');
	}

	$scope.$watch('testValue', function(newValue, oldValue) {
		if (newValue === 'hello') {
			alert('before apply called!');
			$timeout(function() {
				alert('after apply called!');
			})
		}
	});
	$scope.types = [
		{
			"name": "Home",
			"icon": "icon-home",
			"type": "nav",
			"appType": "home",
			"path": "home"
		},
		{
			"name": "Group",
			"icon": "icon-heart",
			"type": "marker",
			"appType": "app",
			"path": "Crowd"
		},
		{
			"name": "Quarters",
			"icon": "icon-heart",
			"type": "background",
		},
		{
			"name": "Semi",
			"icon": "icon-heart",
			"type": "background"
		},
		{
			"name": "Final",
			"icon": "icon-heart",
			"type": "background"
		}
	]
});
app.controller('MyCtrl1', function($scope) {
	$scope.templateName = 'template for view 1 in controler MyCtrl1';
});
app.controller('MyCtrl2', function($scope) {
});
app.controller('GroupCtrl', function($scope) {
        $scope.filterClass = function(icon) {
            return icon.substr(icon.indexOf('class')+3,icon.indexOf('title')-3);
        };
        
	$scope.group = [
	{
		"no": "1", 
		"time": "12/06 17:00", 
		"venue": "Sao Paulo ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1047/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43924/index.html", 
		"homeTeamIcon": "flagsp flagsp_bra", 
		"homeTeamName": "Brazil", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43938/index.html", 
		"awayTeamIcon": "flagsp flagsp_cro", 
		"awayTeamName": "Croatia"
	}, 
	{
		"no": "2", 
		"time": "13/06 13:00", 
		"venue": "Natal ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=21518/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43911/index.html", 
		"homeTeamIcon": "flagsp flagsp_mex", 
		"homeTeamName": "Mexico", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43849/index.html", 
		"awayTeamIcon": "flagsp flagsp_cmr", 
		"awayTeamName": "Cameroon"
	}, 
	{
		"no": "17", 
		"time": "17/06 16:00", 
		"venue": "Fortaleza ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=11693/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43924/index.html", 
		"homeTeamIcon": "flagsp flagsp_bra", 
		"homeTeamName": "Brazil", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43911/index.html", 
		"awayTeamIcon": "flagsp flagsp_mex", 
		"awayTeamName": "Mexico"
	}, 
	{
		"no": "18", 
		"time": "18/06 18:00", 
		"venue": "Manaus ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=2037/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43849/index.html", 
		"homeTeamIcon": "flagsp flagsp_cmr", 
		"homeTeamName": "Cameroon", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43938/index.html", 
		"awayTeamIcon": "flagsp flagsp_cro", 
		"awayTeamName": "Croatia"
	}, 
	{
		"no": "33", 
		"time": "23/06 17:00", 
		"venue": "Brasilia ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1143/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43849/index.html", 
		"homeTeamIcon": "flagsp flagsp_cmr", 
		"homeTeamName": "Cameroon", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43924/index.html", 
		"awayTeamIcon": "flagsp flagsp_bra", 
		"awayTeamName": "Brazil"
	}, 
	{
		"no": "34", 
		"time": "23/06 17:00", 
		"venue": "Recife ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6099/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43938/index.html", 
		"homeTeamIcon": "flagsp flagsp_cro", 
		"homeTeamName": "Croatia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43911/index.html", 
		"awayTeamIcon": "flagsp flagsp_mex", 
		"awayTeamName": "Mexico"
	}, 
	{
		"no": "3", 
		"time": "13/06 16:00", 
		"venue": "Salvador", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50071/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43969/index.html", 
		"homeTeamIcon": "flagsp flagsp_esp", 
		"homeTeamName": "Spain", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43960/index.html", 
		"awayTeamIcon": "flagsp flagsp_ned", 
		"awayTeamName": "Netherlands"
	}, 
	{
		"no": "4", 
		"time": "13/06 18:00", 
		"venue": "Cuiaba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50053/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43925/index.html", 
		"homeTeamIcon": "flagsp flagsp_chi", 
		"homeTeamName": "Chile", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43976/index.html", 
		"awayTeamIcon": "flagsp flagsp_aus", 
		"awayTeamName": "Australia"
	}, 
	{
		"no": "19", 
		"time": "18/06 16:00", 
		"venue": "Rio De Janeiro ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1141/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43969/index.html", 
		"homeTeamIcon": "flagsp flagsp_esp", 
		"homeTeamName": "Spain", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43925/index.html", 
		"awayTeamIcon": "flagsp flagsp_chi", 
		"awayTeamName": "Chile"
	}, 
	{
		"no": "20", 
		"time": "18/06 13:00", 
		"venue": "Porto Alegre ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1140/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43976/index.html", 
		"homeTeamIcon": "flagsp flagsp_aus", 
		"homeTeamName": "Australia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43960/index.html", 
		"awayTeamIcon": "flagsp flagsp_ned", 
		"awayTeamName": "Netherlands"
	}, 
	{
		"no": "35", 
		"time": "23/06 13:00", 
		"venue": "Curitiba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=35400/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43976/index.html", 
		"homeTeamIcon": "flagsp flagsp_aus", 
		"homeTeamName": "Australia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43969/index.html", 
		"awayTeamIcon": "flagsp flagsp_esp", 
		"awayTeamName": "Spain"
	}, 
	{
		"no": "36", 
		"time": "23/06 13:00", 
		"venue": "Sao Paulo ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1047/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43960/index.html", 
		"homeTeamIcon": "flagsp flagsp_ned", 
		"homeTeamName": "Netherlands", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43925/index.html", 
		"awayTeamIcon": "flagsp flagsp_chi", 
		"awayTeamName": "Chile"
	}, 
	{
		"no": "5", 
		"time": "14/06 13:00", 
		"venue": "Belo Horizonte ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6783/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43926/index.html", 
		"homeTeamIcon": "flagsp flagsp_col", 
		"homeTeamName": "Colombia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43949/index.html", 
		"awayTeamIcon": "flagsp flagsp_gre", 
		"awayTeamName": "Greece"
	}, 
	{
		"no": "6", 
		"time": "14/06 22:00", 
		"venue": "Recife ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6099/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43854/index.html", 
		"homeTeamIcon": "flagsp flagsp_civ", 
		"homeTeamName": "Côte d'Ivoire", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43819/index.html", 
		"awayTeamIcon": "flagsp flagsp_jpn", 
		"awayTeamName": "Japan"
	}, 
	{
		"no": "21", 
		"time": "19/06 13:00", 
		"venue": "Brasilia ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1143/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43926/index.html", 
		"homeTeamIcon": "flagsp flagsp_col", 
		"homeTeamName": "Colombia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43854/index.html", 
		"awayTeamIcon": "flagsp flagsp_civ", 
		"awayTeamName": "Côte d'Ivoire"
	}, 
	{
		"no": "22", 
		"time": "19/06 19:00", 
		"venue": "Natal ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=21518/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43819/index.html", 
		"homeTeamIcon": "flagsp flagsp_jpn", 
		"homeTeamName": "Japan", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43949/index.html", 
		"awayTeamIcon": "flagsp flagsp_gre", 
		"awayTeamName": "Greece"
	}, 
	{
		"no": "37", 
		"time": "24/06 16:00", 
		"venue": "Cuiaba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50053/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43819/index.html", 
		"homeTeamIcon": "flagsp flagsp_jpn", 
		"homeTeamName": "Japan", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43926/index.html", 
		"awayTeamIcon": "flagsp flagsp_col", 
		"awayTeamName": "Colombia"
	}, 
	{
		"no": "38", 
		"time": "24/06 17:00", 
		"venue": "Fortaleza ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=11693/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43949/index.html", 
		"homeTeamIcon": "flagsp flagsp_gre", 
		"homeTeamName": "Greece", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43854/index.html", 
		"awayTeamIcon": "flagsp flagsp_civ", 
		"awayTeamName": "Côte d'Ivoire"
	}, 
	{
		"no": "7", 
		"time": "14/06 16:00", 
		"venue": "Fortaleza ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=11693/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43930/index.html", 
		"homeTeamIcon": "flagsp flagsp_uru", 
		"homeTeamName": "Uruguay", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43901/index.html", 
		"awayTeamIcon": "flagsp flagsp_crc", 
		"awayTeamName": "Costa Rica"
	}, 
	{
		"no": "8", 
		"time": "14/06 18:00", 
		"venue": "Manaus ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=2037/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43942/index.html", 
		"homeTeamIcon": "flagsp flagsp_eng", 
		"homeTeamName": "England", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43954/index.html", 
		"awayTeamIcon": "flagsp flagsp_ita", 
		"awayTeamName": "Italy"
	}, 
	{
		"no": "23", 
		"time": "19/06 16:00", 
		"venue": "Sao Paulo ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1047/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43930/index.html", 
		"homeTeamIcon": "flagsp flagsp_uru", 
		"homeTeamName": "Uruguay", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43942/index.html", 
		"awayTeamIcon": "flagsp flagsp_eng", 
		"awayTeamName": "England"
	}, 
	{
		"no": "24", 
		"time": "20/06 13:00", 
		"venue": "Recife ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6099/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43954/index.html", 
		"homeTeamIcon": "flagsp flagsp_ita", 
		"homeTeamName": "Italy", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43901/index.html", 
		"awayTeamIcon": "flagsp flagsp_crc", 
		"awayTeamName": "Costa Rica"
	}, 
	{
		"no": "39", 
		"time": "24/06 13:00", 
		"venue": "Natal ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=21518/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43954/index.html", 
		"homeTeamIcon": "flagsp flagsp_ita", 
		"homeTeamName": "Italy", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43930/index.html", 
		"awayTeamIcon": "flagsp flagsp_uru", 
		"awayTeamName": "Uruguay"
	}, 
	{
		"no": "40", 
		"time": "24/06 13:00", 
		"venue": "Belo Horizonte ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6783/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43901/index.html", 
		"homeTeamIcon": "flagsp flagsp_crc", 
		"homeTeamName": "Costa Rica", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43942/index.html", 
		"awayTeamIcon": "flagsp flagsp_eng", 
		"awayTeamName": "England"
	}, 
	{
		"no": "9", 
		"time": "15/06 13:00", 
		"venue": "Brasilia ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1143/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43971/index.html", 
		"homeTeamIcon": "flagsp flagsp_sui", 
		"homeTeamName": "Switzerland", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43927/index.html", 
		"awayTeamIcon": "flagsp flagsp_ecu", 
		"awayTeamName": "Ecuador"
	}, 
	{
		"no": "10", 
		"time": "15/06 16:00", 
		"venue": "Porto Alegre ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1140/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43946/index.html", 
		"homeTeamIcon": "flagsp flagsp_fra", 
		"homeTeamName": "France", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43909/index.html", 
		"awayTeamIcon": "flagsp flagsp_hon", 
		"awayTeamName": "Honduras"
	}, 
	{
		"no": "25", 
		"time": "20/06 16:00", 
		"venue": "Salvador", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50071/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43971/index.html", 
		"homeTeamIcon": "flagsp flagsp_sui", 
		"homeTeamName": "Switzerland", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43946/index.html", 
		"awayTeamIcon": "flagsp flagsp_fra", 
		"awayTeamName": "France"
	}, 
	{
		"no": "26", 
		"time": "20/06 19:00", 
		"venue": "Curitiba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=35400/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43909/index.html", 
		"homeTeamIcon": "flagsp flagsp_hon", 
		"homeTeamName": "Honduras", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43927/index.html", 
		"awayTeamIcon": "flagsp flagsp_ecu", 
		"awayTeamName": "Ecuador"
	}, 
	{
		"no": "41", 
		"time": "25/06 16:00", 
		"venue": "Manaus ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=2037/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43909/index.html", 
		"homeTeamIcon": "flagsp flagsp_hon", 
		"homeTeamName": "Honduras", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43971/index.html", 
		"awayTeamIcon": "flagsp flagsp_sui", 
		"awayTeamName": "Switzerland"
	}, 
	{
		"no": "42", 
		"time": "25/06 17:00", 
		"venue": "Rio De Janeiro ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1141/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43927/index.html", 
		"homeTeamIcon": "flagsp flagsp_ecu", 
		"homeTeamName": "Ecuador", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43946/index.html", 
		"awayTeamIcon": "flagsp flagsp_fra", 
		"awayTeamName": "France"
	}, 
	{
		"no": "11", 
		"time": "15/06 19:00", 
		"venue": "Rio De Janeiro ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1141/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43922/index.html", 
		"homeTeamIcon": "flagsp flagsp_arg", 
		"homeTeamName": "Argentina", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=44037/index.html", 
		"awayTeamIcon": "flagsp flagsp_bih", 
		"awayTeamName": "Bosnia-Herzegovina"
	}, 
	{
		"no": "12", 
		"time": "16/06 16:00", 
		"venue": "Curitiba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=35400/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43817/index.html", 
		"homeTeamIcon": "flagsp flagsp_irn", 
		"homeTeamName": "Iran", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43876/index.html", 
		"awayTeamIcon": "flagsp flagsp_nga", 
		"awayTeamName": "Nigeria"
	}, 
	{
		"no": "27", 
		"time": "21/06 13:00", 
		"venue": "Belo Horizonte ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6783/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43922/index.html", 
		"homeTeamIcon": "flagsp flagsp_arg", 
		"homeTeamName": "Argentina", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43817/index.html", 
		"awayTeamIcon": "flagsp flagsp_irn", 
		"awayTeamName": "Iran"
	}, 
	{
		"no": "28", 
		"time": "21/06 18:00", 
		"venue": "Cuiaba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50053/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43876/index.html", 
		"homeTeamIcon": "flagsp flagsp_nga", 
		"homeTeamName": "Nigeria", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=44037/index.html", 
		"awayTeamIcon": "flagsp flagsp_bih", 
		"awayTeamName": "Bosnia-Herzegovina"
	}, 
	{
		"no": "43", 
		"time": "25/06 13:00", 
		"venue": "Porto Alegre ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1140/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43876/index.html", 
		"homeTeamIcon": "flagsp flagsp_nga", 
		"homeTeamName": "Nigeria", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43922/index.html", 
		"awayTeamIcon": "flagsp flagsp_arg", 
		"awayTeamName": "Argentina"
	}, 
	{
		"no": "44", 
		"time": "25/06 13:00", 
		"venue": "Salvador", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50071/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=44037/index.html", 
		"homeTeamIcon": "flagsp flagsp_bih", 
		"homeTeamName": "Bosnia-Herzegovina", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43817/index.html", 
		"awayTeamIcon": "flagsp flagsp_irn", 
		"awayTeamName": "Iran"
	}, 
	{
		"no": "13", 
		"time": "16/06 13:00", 
		"venue": "Salvador", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50071/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43948/index.html", 
		"homeTeamIcon": "flagsp flagsp_ger", 
		"homeTeamName": "Germany", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43963/index.html", 
		"awayTeamIcon": "flagsp flagsp_por", 
		"awayTeamName": "Portugal"
	}, 
	{
		"no": "14", 
		"time": "16/06 19:00", 
		"venue": "Natal ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=21518/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43860/index.html", 
		"homeTeamIcon": "flagsp flagsp_gha", 
		"homeTeamName": "Ghana", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43921/index.html", 
		"awayTeamIcon": "flagsp flagsp_usa", 
		"awayTeamName": "USA"
	}, 
	{
		"no": "29", 
		"time": "21/06 16:00", 
		"venue": "Fortaleza ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=11693/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43948/index.html", 
		"homeTeamIcon": "flagsp flagsp_ger", 
		"homeTeamName": "Germany", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43860/index.html", 
		"awayTeamIcon": "flagsp flagsp_gha", 
		"awayTeamName": "Ghana"
	}, 
	{
		"no": "30", 
		"time": "22/06 18:00", 
		"venue": "Manaus ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=2037/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43921/index.html", 
		"homeTeamIcon": "flagsp flagsp_usa", 
		"homeTeamName": "USA", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43963/index.html", 
		"awayTeamIcon": "flagsp flagsp_por", 
		"awayTeamName": "Portugal"
	}, 
	{
		"no": "45", 
		"time": "26/06 13:00", 
		"venue": "Recife ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6099/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43921/index.html", 
		"homeTeamIcon": "flagsp flagsp_usa", 
		"homeTeamName": "USA", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43948/index.html", 
		"awayTeamIcon": "flagsp flagsp_ger", 
		"awayTeamName": "Germany"
	}, 
	{
		"no": "46", 
		"time": "26/06 13:00", 
		"venue": "Brasilia ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1143/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43963/index.html", 
		"homeTeamIcon": "flagsp flagsp_por", 
		"homeTeamName": "Portugal", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43860/index.html", 
		"awayTeamIcon": "flagsp flagsp_gha", 
		"awayTeamName": "Ghana"
	}, 
	{
		"no": "15", 
		"time": "17/06 13:00", 
		"venue": "Belo Horizonte ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6783/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43935/index.html", 
		"homeTeamIcon": "flagsp flagsp_bel", 
		"homeTeamName": "Belgium", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43843/index.html", 
		"awayTeamIcon": "flagsp flagsp_alg", 
		"awayTeamName": "Algeria"
	}, 
	{
		"no": "16", 
		"time": "17/06 18:00", 
		"venue": "Cuiaba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50053/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43965/index.html", 
		"homeTeamIcon": "flagsp flagsp_rus", 
		"homeTeamName": "Russia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43822/index.html", 
		"awayTeamIcon": "flagsp flagsp_kor", 
		"awayTeamName": "Korea Republic"
	}, 
	{
		"no": "31", 
		"time": "22/06 13:00", 
		"venue": "Rio De Janeiro ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1141/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43935/index.html", 
		"homeTeamIcon": "flagsp flagsp_bel", 
		"homeTeamName": "Belgium", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43965/index.html", 
		"awayTeamIcon": "flagsp flagsp_rus", 
		"awayTeamName": "Russia"
	}, 
	{
		"no": "32", 
		"time": "22/06 16:00", 
		"venue": "Porto Alegre ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1140/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43822/index.html", 
		"homeTeamIcon": "flagsp flagsp_kor", 
		"homeTeamName": "Korea Republic", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43843/index.html", 
		"awayTeamIcon": "flagsp flagsp_alg", 
		"awayTeamName": "Algeria"
	}, 
	{
		"no": "47", 
		"time": "26/06 17:00", 
		"venue": "Sao Paulo ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1047/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43822/index.html", 
		"homeTeamIcon": "flagsp flagsp_kor", 
		"homeTeamName": "Korea Republic", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43935/index.html", 
		"awayTeamIcon": "flagsp flagsp_bel", 
		"awayTeamName": "Belgium"
	}, 
	{
		"no": "48", 
		"time": "26/06 17:00", 
		"venue": "Curitiba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=35400/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43843/index.html", 
		"homeTeamIcon": "flagsp flagsp_alg", 
		"homeTeamName": "Algeria", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43965/index.html", 
		"awayTeamIcon": "flagsp flagsp_rus", 
		"awayTeamName": "Russia"
	}
]
});