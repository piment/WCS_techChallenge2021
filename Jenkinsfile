pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        sh 'cp index.html /var/www/testSiteWithJenkins'
        dir(path: '/var/www/testSiteWithJenkins') {
          sh 'ls -lha'
        }

        sh 'ls -lah'
      }
    }

  }
}