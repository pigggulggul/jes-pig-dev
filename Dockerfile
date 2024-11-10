FROM jenkins/jenkins:lts

# 루트 사용자로 전환하여 Docker CLI와 Docker Compose 설치
USER root

# Docker CLI 설치
RUN apt-get update && \
    apt-get install -y docker.io && \
    rm -rf /var/lib/apt/lists/*

# Docker Compose 설치
RUN curl -L "https://github.com/docker/compose/releases/download/$(curl -s https://api.github.com/repos/docker/compose/releases/latest | grep -Po '"tag_name": "\K[^"]*')/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose && \
    chmod +x /usr/local/bin/docker-compose

# Docker 그룹에 Jenkins 사용자 추가하여 Docker 소켓 접근 권한 부여
RUN usermod -aG docker jenkins

# Jenkins 기본 사용자로 돌아가기
USER jenkins