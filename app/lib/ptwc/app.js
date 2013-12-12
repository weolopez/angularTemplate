
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
	$scope.group = [
	{
		"no": "1", 
		"time": "12/06 17:00", 
		"venue": "Sao Paulo ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1047/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43924/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_bra\" title=\"Brazil\"> </span>", 
		"homeTeamName": "Brazil", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43938/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_cro\" title=\"Croatia\"> </span>", 
		"awayTeamName": "Croatia"
	}, 
	{
		"no": "2", 
		"time": "13/06 13:00", 
		"venue": "Natal ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=21518/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43911/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_mex\" title=\"Mexico\"> </span>", 
		"homeTeamName": "Mexico", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43849/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_cmr\" title=\"Cameroon\"> </span>", 
		"awayTeamName": "Cameroon"
	}, 
	{
		"no": "17", 
		"time": "17/06 16:00", 
		"venue": "Fortaleza ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=11693/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43924/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_bra\" title=\"Brazil\"> </span>", 
		"homeTeamName": "Brazil", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43911/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_mex\" title=\"Mexico\"> </span>", 
		"awayTeamName": "Mexico"
	}, 
	{
		"no": "18", 
		"time": "18/06 18:00", 
		"venue": "Manaus ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=2037/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43849/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_cmr\" title=\"Cameroon\"> </span>", 
		"homeTeamName": "Cameroon", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43938/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_cro\" title=\"Croatia\"> </span>", 
		"awayTeamName": "Croatia"
	}, 
	{
		"no": "33", 
		"time": "23/06 17:00", 
		"venue": "Brasilia ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1143/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43849/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_cmr\" title=\"Cameroon\"> </span>", 
		"homeTeamName": "Cameroon", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43924/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_bra\" title=\"Brazil\"> </span>", 
		"awayTeamName": "Brazil"
	}, 
	{
		"no": "34", 
		"time": "23/06 17:00", 
		"venue": "Recife ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6099/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43938/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_cro\" title=\"Croatia\"> </span>", 
		"homeTeamName": "Croatia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43911/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_mex\" title=\"Mexico\"> </span>", 
		"awayTeamName": "Mexico"
	}, 
	{
		"no": "3", 
		"time": "13/06 16:00", 
		"venue": "Salvador", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50071/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43969/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_esp\" title=\"Spain\"> </span>", 
		"homeTeamName": "Spain", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43960/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_ned\" title=\"Netherlands\"> </span>", 
		"awayTeamName": "Netherlands"
	}, 
	{
		"no": "4", 
		"time": "13/06 18:00", 
		"venue": "Cuiaba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50053/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43925/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_chi\" title=\"Chile\"> </span>", 
		"homeTeamName": "Chile", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43976/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_aus\" title=\"Australia\"> </span>", 
		"awayTeamName": "Australia"
	}, 
	{
		"no": "19", 
		"time": "18/06 16:00", 
		"venue": "Rio De Janeiro ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1141/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43969/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_esp\" title=\"Spain\"> </span>", 
		"homeTeamName": "Spain", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43925/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_chi\" title=\"Chile\"> </span>", 
		"awayTeamName": "Chile"
	}, 
	{
		"no": "20", 
		"time": "18/06 13:00", 
		"venue": "Porto Alegre ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1140/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43976/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_aus\" title=\"Australia\"> </span>", 
		"homeTeamName": "Australia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43960/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_ned\" title=\"Netherlands\"> </span>", 
		"awayTeamName": "Netherlands"
	}, 
	{
		"no": "35", 
		"time": "23/06 13:00", 
		"venue": "Curitiba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=35400/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43976/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_aus\" title=\"Australia\"> </span>", 
		"homeTeamName": "Australia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43969/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_esp\" title=\"Spain\"> </span>", 
		"awayTeamName": "Spain"
	}, 
	{
		"no": "36", 
		"time": "23/06 13:00", 
		"venue": "Sao Paulo ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1047/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43960/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_ned\" title=\"Netherlands\"> </span>", 
		"homeTeamName": "Netherlands", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43925/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_chi\" title=\"Chile\"> </span>", 
		"awayTeamName": "Chile"
	}, 
	{
		"no": "5", 
		"time": "14/06 13:00", 
		"venue": "Belo Horizonte ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6783/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43926/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_col\" title=\"Colombia\"> </span>", 
		"homeTeamName": "Colombia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43949/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_gre\" title=\"Greece\"> </span>", 
		"awayTeamName": "Greece"
	}, 
	{
		"no": "6", 
		"time": "14/06 22:00", 
		"venue": "Recife ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6099/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43854/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_civ\" title=\"Côte d'Ivoire\"> </span>", 
		"homeTeamName": "Côte d'Ivoire", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43819/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_jpn\" title=\"Japan\"> </span>", 
		"awayTeamName": "Japan"
	}, 
	{
		"no": "21", 
		"time": "19/06 13:00", 
		"venue": "Brasilia ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1143/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43926/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_col\" title=\"Colombia\"> </span>", 
		"homeTeamName": "Colombia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43854/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_civ\" title=\"Côte d'Ivoire\"> </span>", 
		"awayTeamName": "Côte d'Ivoire"
	}, 
	{
		"no": "22", 
		"time": "19/06 19:00", 
		"venue": "Natal ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=21518/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43819/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_jpn\" title=\"Japan\"> </span>", 
		"homeTeamName": "Japan", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43949/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_gre\" title=\"Greece\"> </span>", 
		"awayTeamName": "Greece"
	}, 
	{
		"no": "37", 
		"time": "24/06 16:00", 
		"venue": "Cuiaba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50053/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43819/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_jpn\" title=\"Japan\"> </span>", 
		"homeTeamName": "Japan", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43926/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_col\" title=\"Colombia\"> </span>", 
		"awayTeamName": "Colombia"
	}, 
	{
		"no": "38", 
		"time": "24/06 17:00", 
		"venue": "Fortaleza ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=11693/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43949/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_gre\" title=\"Greece\"> </span>", 
		"homeTeamName": "Greece", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43854/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_civ\" title=\"Côte d'Ivoire\"> </span>", 
		"awayTeamName": "Côte d'Ivoire"
	}, 
	{
		"no": "7", 
		"time": "14/06 16:00", 
		"venue": "Fortaleza ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=11693/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43930/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_uru\" title=\"Uruguay\"> </span>", 
		"homeTeamName": "Uruguay", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43901/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_crc\" title=\"Costa Rica\"> </span>", 
		"awayTeamName": "Costa Rica"
	}, 
	{
		"no": "8", 
		"time": "14/06 18:00", 
		"venue": "Manaus ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=2037/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43942/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_eng\" title=\"England\"> </span>", 
		"homeTeamName": "England", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43954/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_ita\" title=\"Italy\"> </span>", 
		"awayTeamName": "Italy"
	}, 
	{
		"no": "23", 
		"time": "19/06 16:00", 
		"venue": "Sao Paulo ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1047/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43930/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_uru\" title=\"Uruguay\"> </span>", 
		"homeTeamName": "Uruguay", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43942/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_eng\" title=\"England\"> </span>", 
		"awayTeamName": "England"
	}, 
	{
		"no": "24", 
		"time": "20/06 13:00", 
		"venue": "Recife ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6099/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43954/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_ita\" title=\"Italy\"> </span>", 
		"homeTeamName": "Italy", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43901/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_crc\" title=\"Costa Rica\"> </span>", 
		"awayTeamName": "Costa Rica"
	}, 
	{
		"no": "39", 
		"time": "24/06 13:00", 
		"venue": "Natal ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=21518/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43954/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_ita\" title=\"Italy\"> </span>", 
		"homeTeamName": "Italy", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43930/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_uru\" title=\"Uruguay\"> </span>", 
		"awayTeamName": "Uruguay"
	}, 
	{
		"no": "40", 
		"time": "24/06 13:00", 
		"venue": "Belo Horizonte ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6783/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43901/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_crc\" title=\"Costa Rica\"> </span>", 
		"homeTeamName": "Costa Rica", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43942/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_eng\" title=\"England\"> </span>", 
		"awayTeamName": "England"
	}, 
	{
		"no": "9", 
		"time": "15/06 13:00", 
		"venue": "Brasilia ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1143/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43971/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_sui\" title=\"Switzerland\"> </span>", 
		"homeTeamName": "Switzerland", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43927/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_ecu\" title=\"Ecuador\"> </span>", 
		"awayTeamName": "Ecuador"
	}, 
	{
		"no": "10", 
		"time": "15/06 16:00", 
		"venue": "Porto Alegre ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1140/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43946/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_fra\" title=\"France\"> </span>", 
		"homeTeamName": "France", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43909/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_hon\" title=\"Honduras\"> </span>", 
		"awayTeamName": "Honduras"
	}, 
	{
		"no": "25", 
		"time": "20/06 16:00", 
		"venue": "Salvador", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50071/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43971/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_sui\" title=\"Switzerland\"> </span>", 
		"homeTeamName": "Switzerland", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43946/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_fra\" title=\"France\"> </span>", 
		"awayTeamName": "France"
	}, 
	{
		"no": "26", 
		"time": "20/06 19:00", 
		"venue": "Curitiba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=35400/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43909/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_hon\" title=\"Honduras\"> </span>", 
		"homeTeamName": "Honduras", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43927/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_ecu\" title=\"Ecuador\"> </span>", 
		"awayTeamName": "Ecuador"
	}, 
	{
		"no": "41", 
		"time": "25/06 16:00", 
		"venue": "Manaus ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=2037/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43909/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_hon\" title=\"Honduras\"> </span>", 
		"homeTeamName": "Honduras", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43971/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_sui\" title=\"Switzerland\"> </span>", 
		"awayTeamName": "Switzerland"
	}, 
	{
		"no": "42", 
		"time": "25/06 17:00", 
		"venue": "Rio De Janeiro ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1141/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43927/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_ecu\" title=\"Ecuador\"> </span>", 
		"homeTeamName": "Ecuador", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43946/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_fra\" title=\"France\"> </span>", 
		"awayTeamName": "France"
	}, 
	{
		"no": "11", 
		"time": "15/06 19:00", 
		"venue": "Rio De Janeiro ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1141/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43922/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_arg\" title=\"Argentina\"> </span>", 
		"homeTeamName": "Argentina", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=44037/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_bih\" title=\"Bosnia-Herzegovina\"> </span>", 
		"awayTeamName": "Bosnia-Herzegovina"
	}, 
	{
		"no": "12", 
		"time": "16/06 16:00", 
		"venue": "Curitiba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=35400/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43817/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_irn\" title=\"Iran\"> </span>", 
		"homeTeamName": "Iran", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43876/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_nga\" title=\"Nigeria\"> </span>", 
		"awayTeamName": "Nigeria"
	}, 
	{
		"no": "27", 
		"time": "21/06 13:00", 
		"venue": "Belo Horizonte ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6783/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43922/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_arg\" title=\"Argentina\"> </span>", 
		"homeTeamName": "Argentina", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43817/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_irn\" title=\"Iran\"> </span>", 
		"awayTeamName": "Iran"
	}, 
	{
		"no": "28", 
		"time": "21/06 18:00", 
		"venue": "Cuiaba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50053/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43876/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_nga\" title=\"Nigeria\"> </span>", 
		"homeTeamName": "Nigeria", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=44037/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_bih\" title=\"Bosnia-Herzegovina\"> </span>", 
		"awayTeamName": "Bosnia-Herzegovina"
	}, 
	{
		"no": "43", 
		"time": "25/06 13:00", 
		"venue": "Porto Alegre ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1140/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43876/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_nga\" title=\"Nigeria\"> </span>", 
		"homeTeamName": "Nigeria", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43922/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_arg\" title=\"Argentina\"> </span>", 
		"awayTeamName": "Argentina"
	}, 
	{
		"no": "44", 
		"time": "25/06 13:00", 
		"venue": "Salvador", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50071/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=44037/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_bih\" title=\"Bosnia-Herzegovina\"> </span>", 
		"homeTeamName": "Bosnia-Herzegovina", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43817/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_irn\" title=\"Iran\"> </span>", 
		"awayTeamName": "Iran"
	}, 
	{
		"no": "13", 
		"time": "16/06 13:00", 
		"venue": "Salvador", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50071/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43948/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_ger\" title=\"Germany\"> </span>", 
		"homeTeamName": "Germany", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43963/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_por\" title=\"Portugal\"> </span>", 
		"awayTeamName": "Portugal"
	}, 
	{
		"no": "14", 
		"time": "16/06 19:00", 
		"venue": "Natal ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=21518/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43860/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_gha\" title=\"Ghana\"> </span>", 
		"homeTeamName": "Ghana", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43921/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_usa\" title=\"USA\"> </span>", 
		"awayTeamName": "USA"
	}, 
	{
		"no": "29", 
		"time": "21/06 16:00", 
		"venue": "Fortaleza ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=11693/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43948/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_ger\" title=\"Germany\"> </span>", 
		"homeTeamName": "Germany", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43860/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_gha\" title=\"Ghana\"> </span>", 
		"awayTeamName": "Ghana"
	}, 
	{
		"no": "30", 
		"time": "22/06 18:00", 
		"venue": "Manaus ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=2037/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43921/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_usa\" title=\"USA\"> </span>", 
		"homeTeamName": "USA", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43963/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_por\" title=\"Portugal\"> </span>", 
		"awayTeamName": "Portugal"
	}, 
	{
		"no": "45", 
		"time": "26/06 13:00", 
		"venue": "Recife ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6099/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43921/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_usa\" title=\"USA\"> </span>", 
		"homeTeamName": "USA", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43948/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_ger\" title=\"Germany\"> </span>", 
		"awayTeamName": "Germany"
	}, 
	{
		"no": "46", 
		"time": "26/06 13:00", 
		"venue": "Brasilia ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1143/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43963/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_por\" title=\"Portugal\"> </span>", 
		"homeTeamName": "Portugal", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43860/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_gha\" title=\"Ghana\"> </span>", 
		"awayTeamName": "Ghana"
	}, 
	{
		"no": "15", 
		"time": "17/06 13:00", 
		"venue": "Belo Horizonte ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=6783/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43935/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_bel\" title=\"Belgium\"> </span>", 
		"homeTeamName": "Belgium", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43843/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_alg\" title=\"Algeria\"> </span>", 
		"awayTeamName": "Algeria"
	}, 
	{
		"no": "16", 
		"time": "17/06 18:00", 
		"venue": "Cuiaba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=50053/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43965/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_rus\" title=\"Russia\"> </span>", 
		"homeTeamName": "Russia", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43822/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_kor\" title=\"Korea Republic\"> </span>", 
		"awayTeamName": "Korea Republic"
	}, 
	{
		"no": "31", 
		"time": "22/06 13:00", 
		"venue": "Rio De Janeiro ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1141/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43935/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_bel\" title=\"Belgium\"> </span>", 
		"homeTeamName": "Belgium", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43965/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_rus\" title=\"Russia\"> </span>", 
		"awayTeamName": "Russia"
	}, 
	{
		"no": "32", 
		"time": "22/06 16:00", 
		"venue": "Porto Alegre ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1140/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43822/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_kor\" title=\"Korea Republic\"> </span>", 
		"homeTeamName": "Korea Republic", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43843/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_alg\" title=\"Algeria\"> </span>", 
		"awayTeamName": "Algeria"
	}, 
	{
		"no": "47", 
		"time": "26/06 17:00", 
		"venue": "Sao Paulo ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=1047/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43822/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_kor\" title=\"Korea Republic\"> </span>", 
		"homeTeamName": "Korea Republic", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43935/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_bel\" title=\"Belgium\"> </span>", 
		"awayTeamName": "Belgium"
	}, 
	{
		"no": "48", 
		"time": "26/06 17:00", 
		"venue": "Curitiba ", 
		"venue_link": "http://www.fifa.com/worldcup/destination/cities/city=35400/index.html", 
		"homeTeamLink": "http://www.fifa.com/worldcup/teams/team=43843/index.html", 
		"homeTeamIcon": "<span class=\"flagsp flagsp_alg\" title=\"Algeria\"> </span>", 
		"homeTeamName": "Algeria", 
		"awayTeamLink": "http://www.fifa.com/worldcup/teams/team=43965/index.html", 
		"awayTeamIcon": "<span class=\"flagsp flagsp_rus\" title=\"Russia\"> </span>", 
		"awayTeamName": "Russia"
	}
]
});