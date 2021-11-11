pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'mkdir /var/www/testSiteWithJenkins'
                sh 'cp index.html /var/www/testSiteWithJenkins'
                dir('/var/www/testSiteWithJenkins') {
                    sh 'ls -lha'
                }
                sh 'ls -lah'
            }
        }
    }
}