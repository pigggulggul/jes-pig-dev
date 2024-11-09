pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // GitHub에서 최신 코드 가져오기
                git url: 'https://github.com/pigggulggul/jes-pig-dev.git', branch: 'master'
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                // Docker Compose로 전체 애플리케이션을 빌드 및 배포
                sh 'docker compose down'
                sh 'docker compose up -d --build'
            }
        }
    }
    
    post {
        success {
            echo 'Deployment succeeded!'
        }
        failure {
            echo 'Deployment failed!'
        }
    }
}

