pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'whoami'
                sh 'cp index.html /var/www/testSiteWithJenkins'
                dir('/var/www/testSiteWithJenkins') {
                    sh 'ls -lha'
                }
                sh 'ls -lah'
            }
        }
    }
}