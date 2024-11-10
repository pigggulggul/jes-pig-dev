pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // GitHub에서 최신 코드 가져오기
                git url: 'https://github.com/pigggulggul/jes-pig-dev.git', branch: 'master'
            }
        }

        stage('Create backend .env File') {
            steps {
                sh '''
                echo "NODE_ENV=$NODE_ENV" > backend/.env
                echo "PORT=$PORT" >> backend/.env
                echo "DB_HOST=$DB_HOST" >> backend/.env
                echo "DB_USER=$DB_USER" >> backend/.env
                echo "DB_PASSWORD=$DB_PASSWORD" >> backend/.env
                echo "DB_DATABASE=$DB_DATABASE" >> backend/.env
                echo "MYSQL_ROOT_PASSWORD=$MYSQL_ROOT_PASSWORD" >> backend/.env
                echo "MYSQL_DATABASE=$MYSQL_DATABASE" >> backend/.env
                echo "MYSQL_USER=$MYSQL_USER" >> backend/.env
                echo "MYSQL_PASSWORD=$MYSQL_PASSWORD" >> backend/.env
                echo "JWT_SECRET=$JWT_SECRET" >> backend/.env
                '''
            }
        }

        stage('Create frontend .env.production File') {
            steps {
                sh '''
                echo "VITE_REACT_API_URL=$VITE_REACT_API_URL" > frontend/.env.production
                '''
            }
        }


        stage('Force Remove Existing Containers') {
            steps {
                // mysql-container가 이미 존재하면 강제 제거
                sh '''
                if [ $(docker ps -a -q -f name=mysql-container) ]; then
                    docker rm -f mysql-container
                fi
                if [ $(docker ps -a -q -f name=jenkins) ]; then
                    docker rm -f jenkins
                fi
                if [ $(docker ps -a -q -f name=nginx-container) ]; then
                    docker rm -f nginx-container
                fi
                '''
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                // Docker Compose로 전체 애플리케이션을 빌드 및 배포
		sh 'docker-compose down'
        sh 'sleep 5' // 모든 컨테이너가 종료될 때까지 대기
		sh 'docker-compose up -d --build'
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

