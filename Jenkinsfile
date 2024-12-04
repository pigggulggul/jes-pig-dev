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

        stage('Cleanup Existing Containers and Networks') {
            steps {
                sh '''
		# Jenkins 컨테이너가 아닌 서비스 종료
                docker-compose down -v --remove-orphans || true
                if docker ps -a --filter "name=mysql-container" --format "{{.ID}}" | grep -q .; then
			docker rm -f mysql-container
		fi
		if docker ps -a --filter "name=nginx-container" --format "{{.ID}}" | grep -q .; then
			docker rm -f nginx-container
		fi
		docker network prune -f || true
                '''
            }
        }

        stage('Deploy with Docker Compose') {
            steps {
                // Docker Compose로 전체 애플리케이션을 빌드 및 배포
       		sh '''
		export COMPOSE_PROJECT_NAME=pipeline_${BUILD_NUMBER}
		docker-compose ps -a
		docker-compose up -d --build
		'''
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

