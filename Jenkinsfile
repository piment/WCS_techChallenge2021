pipeline {
  agent any
  stages {
    stage('Build') {
      parallel {
        stage('Build') {
          steps {
            sh 'cd /home/debian'
            sh 'ls -lah'
          }
        }

        stage('Test') {
          steps {
            echo 'Starting Test Stage 2'
            dir(path: '/home/debian') {
              sh '''ls -lha\'
'''
            }

          }
        }

      }
    }

  }
}