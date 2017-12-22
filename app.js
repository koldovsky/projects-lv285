var app = angular.module('GroupApp', ['ngMaterial']);

// https://stackoverflow.com/a/16349631
app.directive('fallbackSrc', function () {
    var fallbackSrc = {
        link: function postLink(scope, iElement, iAttrs) {
            iElement.bind('error', function() {
                angular.element(this).attr("src", iAttrs.fallbackSrc);
            });
        }
    }
    return fallbackSrc;
});

app.controller('AppCtrl', ['$scope', '$mdSidenav', 'studentService', function ($scope, $mdSidenav, studentService) {
    var allStudents = [];


    $scope.subgroups = [1, 2];
    $scope.selectedsubgroups = [1, 2];
    $scope.isChosenOnly = false;
    //$scope.toggle = function (item, list) {
    //  var idx = list.indexOf(item);
    //  if (idx >-1) {
    //    list.splice(idx, 1);
    //  } else {
    //    list.push(item);
    //  }
    //};
    $scope.exists = function (item, list) {
        return list.indexOf(item) > -1;
    };
    $scope.toggleChosen = function (item) {
        $scope.isChosenOnly = !$scope.isChosenOnly;
    };
    //$scope.filterBySubgroup = function (student) {
    //  return $scope.exists(student.subgroup, $scope.selectedsubgroups);
    //};

    $scope.filterByChosen = function (student) {
        if ($scope.isChosenOnly) {
            if (student.isChosenProject) {
                console.log(student);
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    };

    $scope.filterByData = function (student) {
        if (!student.websiteUrl || !student.codeSourceUrl) {
            return false;
        }
        return true;
    }

    $scope.selected = null;
    $scope.students = allStudents;
    $scope.selectStudent = selectStudent;
    $scope.toggleSidenav = toggleSidenav;

    loadStudents();

    function loadStudents() {
        studentService.loadAll()
            .then(function (students) {
                allStudents = students;
                $scope.students = [].concat(students);
                $scope.selected = $scope.students[0];
            })
    }

    function toggleSidenav(name) {
        $mdSidenav(name).toggle();
    }

    function selectStudent(student) {
        $scope.selected = angular.isNumber(student) ? $scope.students[student] : student;
        $scope.toggleSidenav('left');
    }

    $scope.getPhotoUrl = function(student) {
        if (!student) return null;
        return student.photo || `images/students/${getLastName(student.name)}.jpg`;
    }

    function getLastName(fullName) {
        return fullName.trim().split(' ').pop().replace(/'+/g, '').toLowerCase();
    }

}]);

app.service('studentService', ['$q', function ($q) {

    //! http://www.convertcsv.com/csv-to-json.htm
    // http://www.csvjson.com/csv2json
    var students = [
        {
          "name": "Andrii Kokotko",
          "websiteUrl": "https://andriikokotko.github.io/andriikokoko1/",
          "codeSourceUrl": "https://github.com/andriiKokotko/andriikokoko1",
          "cvUrl": "https://www.linkedin.com/in/andrii-kokotko-00b784155/"
        },
        {
          "name": "Bogdan Lishchynskiy",
          "websiteUrl": "https://bogdan-lishchynskiy.github.io/mywebsite/",
          "codeSourceUrl": "https://github.com/Bogdan-Lishchynskiy/mywebsite",
          "cvUrl": ""
        },
        {
          "name": "Liubomyr Zakhidnyi",
          "websiteUrl": "https://lubomir22.github.io/website-06/index.html",
          "codeSourceUrl": "https://github.com/lubomir22/website-06",
          "cvUrl": ""
        },
        {
          "name": "Nazar Petriv",
          "websiteUrl": "https://petrivnm.github.io/my-peronal-website/",
          "codeSourceUrl": "https://github.com/petrivnm/my-peronal-website",
          "cvUrl": "https://www.linkedin.com/in/nazar-petriv-1b7b15153"
        },
        {
          "name": "Oleh Borkovs’kyi",
          "websiteUrl": "https://k1bork.github.io/borkovska/",
          "codeSourceUrl": "https://github.com/k1bork/borkovska",
          "cvUrl": "https://www.linkedin.com/in/oleg-borkovsky-213784155/",
          "photo": "images/students/borkovskyi.jpg"
        },
        {
          "name": "Oleh Petryk",
          "websiteUrl": "https://andeson25.github.io/mySite/",
          "codeSourceUrl": "https://github.com/Andeson25/mySite",
          "cvUrl": "https://www.linkedin.com/in/oleh-petryk-521782155/"
        },
        {
          "name": "Vitalii Shtypuk",
          "websiteUrl": "https://vitaliishtypuk.github.io/lv285-finish-website/",
          "codeSourceUrl": "https://github.com/vitaliishtypuk/lv285-finish-website",
          "cvUrl": "https://www.linkedin.com/in/vitalii-shtypuk-913925155/"
        },
        {
          "name": "Yaroslav Fedyna",
          "websiteUrl": "https://yarko9.github.io/pw5/",
          "codeSourceUrl": "https://github.com/yarko9/pw5",
          "cvUrl": "https://www.linkedin.com/in/yaroslav-fedyna-092651155/",
          "photo": "images/students/fedyna.png"
        },
        {
          "name": "Yuliia Sava",
          "websiteUrl": "https://liaevgenieva.github.io/home-html-03/",
          "codeSourceUrl": "https://github.com/LiaEvgenieva/home-html-03",
          "cvUrl": "https://www.linkedin.com/in/julifedorovich/"
        },
        {
          "name": "Yuriy Chupil’",
          "websiteUrl": "https://chupil.github.io/olia/",
          "codeSourceUrl": "https://github.com/chupil/olia",
          "cvUrl": "https://www.linkedin.com/in/yuriy-chupil-927b1a110/",
          "photo": "images/students/chupil.jpg"
        },
        {
          "name": "Yuriy Semesyuk",
          "websiteUrl": "",
          "codeSourceUrl": "",
          "cvUrl": ""
        },
        {
          "name": "Anastasiya Razumeika",
          "websiteUrl": "https://razumeyka.github.io/MissBonbon/index.html",
          "codeSourceUrl": "https://github.com/razumeyka/MissBonbon.git",
          "cvUrl": "https://www.linkedin.com/in/anastasiya-razumeyko-139655155/"
        },
        {
          "name": "Andrii Doronin",
          "websiteUrl": "https://dandrii.github.io/home-project/",
          "codeSourceUrl": "https://github.com/dandrii/home-project",
          "cvUrl": ""
        },
        {
          "name": "Hanna Kurdzel'",
          "websiteUrl": "https://ann1205.github.io/personal-website/",
          "codeSourceUrl": "https://github.com/ann1205/personal-website",
          "cvUrl": "https://www.linkedin.com/in/hanna-kurdzel-3b2924155/"
        },
        {
          "name": "Iryna Korman",
          "websiteUrl": "https://iraknopka.github.io/my-webpage.html/",
          "codeSourceUrl": "https://github.com/iraknopka/my-webpage.html",
          "cvUrl": ""
        },
        {
          "name": "Mariya Giy",
          "websiteUrl": "https://marichkagiy.github.io/marichkagiy/",
          "codeSourceUrl": "https://marichkagiy.github.io/marichkagiy/",
          "cvUrl": "https://www.linkedin.com/in/marichka-giy-a337a1155/"
        },
        {
          "name": "Taras Kachor",
          "websiteUrl": "https://tkachor.github.io/service/",
          "codeSourceUrl": "https://github.com/tkachor/service",
          "cvUrl": ""
        },
        {
          "name": "Viacheslav Barabash",
          "websiteUrl": "",
          "codeSourceUrl": "",
          "cvUrl": ""
        },
        {
          "name": "Andrii Borys",
          "websiteUrl": "https://borysandrew.github.io/mainproject/index.html",
          "codeSourceUrl": "https://github.com/borysandrew/mainproject",
          "cvUrl": ""
        },
        {
          "name": "Iryna Chebenyak",
          "websiteUrl": "https://irynachebeniak.github.io/kristinabtstr/",
          "codeSourceUrl": "https://github.com/irynachebeniak/kristinabtstr",
          "cvUrl": ""
        }          
    ];

    // Promise-based API
    return {
        loadAll: function () {
            // Simulate async nature of real remote calls
            return $q.when(students);
        }
    };
}]);
