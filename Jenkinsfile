pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'whoami'
                sh 'cp index.html /home/debian/testSiteWithJenkins'
                dir('/home/debian/testSiteWithJenkins') {
                    sh 'ls -lha'
                }
                sh'ls -lha'
            }
        }
    }
}